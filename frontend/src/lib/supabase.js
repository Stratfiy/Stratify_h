import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fall back to harmless placeholders so the public marketing site still renders
// if auth env vars are absent. Auth actions will no-op until real keys are set.
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseAnonKey || 'public-anon-placeholder'

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — auth disabled.')
}

export const supabase = createClient(url, key)
