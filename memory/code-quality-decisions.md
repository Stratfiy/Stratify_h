# Code-Quality Decisions Log

This file documents linter / code-review recommendations we **intentionally did not apply**, with the reasoning. It exists so the next engineer (or the next linter run) doesn't re-litigate settled decisions.

If you disagree with anything below, open a discussion before changing it — every entry was a conscious tradeoff.

---

## React Hooks — "missing useEffect / useMemo dependencies"

**Examples flagged:** `Contact.jsx`, `KaiDashboard.jsx`, `CookieBanner.jsx`, `Nav.jsx`, `CountUp.jsx`, `RoiCalculator.jsx`, `FeedbackWidget.jsx`, `use-toast.js`.

**Decision:** Skip. The flagged "dependencies" are one of:
1. **Local variables declared inside the effect body** (e.g. `cancelled`, `dur`, `eased`, `p`). Adding these is nonsensical — they aren't closures over outer scope, they are local to the effect.
2. **Module-scope constants or imports** (e.g. `STEPS`, `KEY`, `API`, `axios`, `localStorage`). These are referentially stable for the lifetime of the module. Adding them adds noise without changing behavior.
3. **`useState` setters** (`setRating`, `setDone`, `setOpen`, etc.). React **guarantees** these are referentially stable. The official `react-hooks/exhaustive-deps` rule explicitly does **not** require them.
4. **`alive` cleanup-flag variables** — these are the canonical "ignore late responses" pattern. They are mutated inside the cleanup function; they shouldn't be in deps.

If you really need the lint to be silent, prefer `// eslint-disable-next-line react-hooks/exhaustive-deps` on the offending line over distorting the dependency array. The poorly-tuned linter we use over-reports here.

---

## "localStorage stores sensitive data" — CookieBanner consent flag

**Decision:** Skip. The cookie consent banner stores a single string: `"accept"` or `"reject"`. This is **the least sensitive data possible**: a UI preference. Recommending httpOnly cookies (which require a server round-trip and break in offline modes) for a banner state is overengineering.

If we ever store actual user data (auth tokens, PII) we revisit this — but for the consent flag, localStorage is correct.

---

## "Component is too long, split it" — Home.jsx, Healthcare.jsx, Ecommerce.jsx, KaiDashboard.jsx

**Decision:** Skip arbitrary splits. Marketing pages are **content-heavy by nature**. Splitting `Home.jsx` into 11 sub-files purely to satisfy a 300-line metric trades clarity (one place to read the whole homepage in one scroll) for navigational tax (jumping between 11 files to make a wording tweak). We split components when:
- The same JSX repeats across files (we did this for `PricingCard`, deduped from 3 files).
- A subtree has its own state machine (we did this for Contact's `FormPanel` / `PausedCard` / `SuccessCard`).
- A subtree is genuinely reused.

We do **not** split for line counts alone.

---

## "Don't use `is True / is False` in Python tests"

**Decision:** Apply, but the linter's recommended fix (`== True`) is itself wrong per PEP 8. We use truthy assertions (`assert d.get("ok")`) instead. This is the Pythonic answer.

---

## ErrorBoundary `console.warn` calls

**Decision:** Keep. They're already gated behind `process.env.NODE_ENV !== "production"`, so they will not run in production builds. Removing them would lose a useful dev-time diagnostic. We added explicit `// eslint-disable-next-line no-console` comments to silence the linter without changing behavior.

---

## `craco.config.js` `console.warn` for missing visual-edits package

**Decision:** Keep. It's a build-time dev message that fires in a `catch` block when an optional Emergent plugin isn't installed. Removing it makes a useful diagnostic silent and would surprise a future engineer wondering why visual editing doesn't work.

---

## shadcn-ui vendored files (`use-toast.js`, etc.)

**Decision:** Don't modify. These are vendored from the shadcn CLI. Modifying them blocks future `npx shadcn add` updates and creates a drift our team has to maintain.

---

## "Inline animation objects cause re-renders"

**Decision:** Applied where it matters (`Motion.jsx` variants are now module-scope constants). Skipped where the inline object is on an `AnimatePresence` child whose parent already re-renders on the same trigger — extracting buys nothing measurable and hurts colocation.

---

## When to add a new entry to this file

If you decide to skip a code-review or linter recommendation, add a short entry here:

```md
## [Tool name] — [Recommendation]
**Decision:** Skip / Apply differently.
**Reason:** ...
```

This costs 30 seconds and saves the next person a doom loop.
