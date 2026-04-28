"""
Quick-and-honest load test for /api/leads.
Usage:
    python /app/scripts/load_test.py --concurrent 50 --total 500
Defaults sized for a marketing site (no need for k6 unless we add a real product API).
"""
import argparse
import asyncio
import os
import random
import string
import sys
import time

import httpx


def rand_str(n: int) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=n))


def fake_payload(prefix: str = "LOADTEST") -> dict:
    return {
        "full_name": f"{prefix} {rand_str(6)}",
        "work_email": f"{prefix.lower()}+{rand_str(8)}@example.com",
        "company_name": f"{prefix} Co {rand_str(4)}",
        "industry": random.choice(["E-commerce", "Healthcare", "Other"]),
        "monthly_revenue": random.choice(["< $100K", "$100K – $1M", "$1M – $10M", "$10M+"]),
        "challenge": "Load test entry — safe to delete.",
        "referral_source": "loadtest",
    }


async def hit(client: httpx.AsyncClient, url: str, results: list):
    t0 = time.perf_counter()
    try:
        r = await client.post(url, json=fake_payload(), timeout=15)
        ok = r.status_code in (201, 429)  # 429 expected once rate-limit hits
        results.append((ok, r.status_code, time.perf_counter() - t0))
    except Exception as e:
        results.append((False, str(e)[:80], time.perf_counter() - t0))


async def run(base_url: str, concurrent: int, total: int):
    url = f"{base_url.rstrip('/')}/api/leads"
    print(f"→ POST {url}  concurrent={concurrent}  total={total}")
    results: list = []
    sem = asyncio.Semaphore(concurrent)

    async def worker():
        async with sem:
            await hit(client, url, results)

    async with httpx.AsyncClient() as client:
        t0 = time.perf_counter()
        await asyncio.gather(*[worker() for _ in range(total)])
        wall = time.perf_counter() - t0

    ok = sum(1 for r in results if r[0])
    fail = total - ok
    statuses: dict = {}
    for r in results:
        statuses[str(r[1])] = statuses.get(str(r[1]), 0) + 1
    latencies = sorted(r[2] for r in results if isinstance(r[2], float))
    p50 = latencies[len(latencies) // 2] if latencies else 0
    p95 = latencies[int(len(latencies) * 0.95) - 1] if latencies else 0

    print("")
    print(f"  wall:        {wall:.2f}s  ({total / wall:.1f} req/s)")
    print(f"  success:     {ok}/{total}")
    print(f"  failed:      {fail}")
    print(f"  status mix:  {statuses}")
    print(f"  p50 latency: {p50 * 1000:.0f} ms")
    print(f"  p95 latency: {p95 * 1000:.0f} ms")
    print("")
    print("Tip: 201s = accepted, 429s = rate-limited (expected once threshold hits).")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default=os.environ.get("BASE_URL", "http://localhost:8001"))
    ap.add_argument("--concurrent", type=int, default=20)
    ap.add_argument("--total", type=int, default=100)
    args = ap.parse_args()
    asyncio.run(run(args.url, args.concurrent, args.total))


if __name__ == "__main__":
    main()
