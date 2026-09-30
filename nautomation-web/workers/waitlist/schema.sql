-- D1 schema for the waitlist. Apply with: wrangler d1 execute nautomation-waitlist --file=schema.sql
CREATE TABLE IF NOT EXISTS waitlist (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT,
  company       TEXT,
  job_family    TEXT,
  country       TEXT,
  source        TEXT DEFAULT 'website',
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  ref_code      TEXT NOT NULL UNIQUE,
  referred_by   TEXT,
  position      INTEGER NOT NULL,
  confirm_token TEXT,
  confirmed_at  TEXT,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS waitlist_position ON waitlist(position);
CREATE INDEX IF NOT EXISTS waitlist_referred_by ON waitlist(referred_by);
