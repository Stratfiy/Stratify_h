import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Eye, EyeOff, Check, AlertCircle, Lock } from 'lucide-react'

const rules = [
  { id:'length',  label:'8+ characters',      test: p => p.length >= 8 },
  { id:'upper',   label:'Uppercase (A–Z)',    test: p => /[A-Z]/.test(p) },
  { id:'number',  label:'Number (0–9)',       test: p => /[0-9]/.test(p) },
  { id:'special', label:'Special char',       test: p => /[^A-Za-z0-9]/.test(p) },
]

// --- MOVE THIS OUTSIDE THE MAIN COMPONENT ---
const PageShell = ({ children }) => (
  <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
    <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
    <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#4FB8EE]/10 blur-3xl pointer-events-none" />
    <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 h-16 border-b border-[#F3F4F6] bg-white/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
          <span className="text-white font-semibold text-[12px] tracking-tight">NL</span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4FB8EE] border border-white" />
        </div>
        <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#0A0A0A]">NAutomation Labs</span>
      </Link>
    </nav>
    <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  </div>
)

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setSessionReady(true); setChecking(false)
      }
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true)
      setChecking(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const passedRules = rules.filter(r => r.test(password))
  const allRulesPassed = passedRules.length === rules.length
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!allRulesPassed) { setError('Password does not meet all requirements'); return }
    if (!passwordsMatch) { setError('Passwords do not match'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false) }
    else { setSuccess(true); await supabase.auth.signOut(); setTimeout(() => navigate('/login'), 2500) }
  }

  // --- REMOVED PageShell FROM HERE ---

  if (checking) return (
    <PageShell>
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#1E9BE0] border-t-transparent rounded-full animate-spin" />
      </div>
    </PageShell>
  )

  if (!sessionReady) return (
    <PageShell>
      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-6">
        <AlertCircle className="w-5 h-5 text-red-600" />
      </div>
      <div className="eyebrow flex items-center gap-2.5 mb-4">
        <span className="agent-dot" />
        Link expired
      </div>
      <h1 className="text-[36px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
        This link has<br /><span className="text-red-500">expired.</span>
      </h1>
      <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
        Reset links expire after 1 hour. Request a new one below.
      </p>
      <Link to="/forgot-password" className="btn-primary">
        Request new link <ArrowRight className="w-4 h-4" />
      </Link>
    </PageShell>
  )

  if (success) return (
    <PageShell>
      <div className="w-12 h-12 rounded-2xl bg-[#1E9BE0]/10 border border-[#1E9BE0]/20 flex items-center justify-center mb-6">
        <Check className="w-5 h-5 text-[#1E9BE0]" />
      </div>
      <div className="eyebrow flex items-center gap-2.5 mb-4">
        <span className="agent-dot" />
        Password updated
      </div>
      <h1 className="text-[36px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
        You're all<br /><span className="text-[#1E9BE0]">set.</span>
      </h1>
      <p className="text-[16px] text-[#4B5563] leading-relaxed">Redirecting you to sign in...</p>
    </PageShell>
  )

  return (
    <PageShell>
      <div className="w-12 h-12 rounded-2xl bg-[#1E9BE0]/10 border border-[#1E9BE0]/20 flex items-center justify-center mb-6">
        <Lock className="w-5 h-5 text-[#1E9BE0]" />
      </div>

      <div className="eyebrow flex items-center gap-2.5 mb-4">
        <span className="agent-dot" />
        Set new password
      </div>

      <h1 className="text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
        Choose something<br />
        <span className="text-[#1E9BE0]">strong.</span>
      </h1>
      <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
        8+ characters with uppercase, number, and special character.
      </p>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-[14px] text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">New password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 characters" required
              className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10 transition-all bg-white" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {rules.map(rule => {
                const passed = rule.test(password)
                return (
                  <div key={rule.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${passed ? 'bg-[#1E9BE0]' : 'bg-[#F3F4F6]'}`}>
                      {passed && <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span className={`text-[12px] transition-colors ${passed ? 'text-[#1E9BE0]' : 'text-[#9CA3AF]'}`}>{rule.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Confirm password</label>
          <div className="relative">
            <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password" required
              className={`w-full px-4 py-3 pr-11 rounded-xl border text-[15px] text-[#0A0A0A] outline-none transition-all bg-white ${
                confirmPassword.length > 0
                  ? passwordsMatch ? 'border-[#1E9BE0] ring-2 ring-[#1E9BE0]/10' : 'border-red-400 ring-2 ring-red-400/10'
                  : 'border-[#E5E7EB] focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10'
              }`} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <p className={`text-[12px] mt-2 font-medium ${passwordsMatch ? 'text-[#1E9BE0]' : 'text-red-500'}`}>
              {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
            </p>
          )}
        </div>

        <button type="submit" disabled={loading || !allRulesPassed || !passwordsMatch}
          className="btn-primary mt-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
          {loading
            ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <><span>Update password</span><ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </PageShell>
  )
}
