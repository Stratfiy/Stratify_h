import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

const rules = [
  { id:'length',  label:'8+ characters',     test: p => p.length >= 8 },
  { id:'upper',   label:'Uppercase (A–Z)',    test: p => /[A-Z]/.test(p) },
  { id:'number',  label:'Number (0–9)',       test: p => /[0-9]/.test(p) },
  { id:'special', label:'Special char',      test: p => /[^A-Za-z0-9]/.test(p) },
]

export default function Signup() {
  const { signUp, signInWithGoogle } = useAuth()
  const [form, setForm] = useState({ fullName:'', companyName:'', email:'', password:'' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const update = field => e => setForm({ ...form, [field]: e.target.value })
  const passedRules = rules.filter(r => r.test(form.password))
  const allRulesPassed = passedRules.length === rules.length

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!allRulesPassed) { setError('Password does not meet all requirements'); return }
    setLoading(true)
    const { error } = await signUp(form.email, form.password, form.fullName, form.companyName)
    if (error) { setError(error.message); setLoading(false) }
    else { setSuccess(true); setLoading(false) }
  }

  const handleGoogle = async () => {
    setError('')
    setGoogleLoading(true)
    const { error } = await signInWithGoogle()
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  if (success) return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#1E9BE0]/10 border border-[#1E9BE0]/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-[#1E9BE0]" />
        </div>
        <div className="eyebrow flex items-center justify-center gap-2 mb-4">
          <span className="agent-dot" />
          Account created
        </div>
        <h2 className="text-[36px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-4">Check your email.</h2>
        <p className="text-[16px] text-[#4B5563] leading-relaxed mb-2">We sent a confirmation link to</p>
        <p className="text-[16px] font-medium text-[#0A0A0A] mb-8">{form.email}</p>
        <Link to="/login" className="btn-ghost">← Back to sign in</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#4FB8EE]/10 blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 h-16 border-b border-[#F3F4F6] bg-white/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-white font-semibold text-[12px] tracking-tight">NL</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4FB8EE] border border-white" />
          </div>
          <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#0A0A0A]">NAutomation Labs</span>
        </Link>
        <p className="text-[13px] text-[#6B7280]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1E9BE0] font-medium hover:underline">Sign in</Link>
        </p>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">

          <div className="eyebrow flex items-center gap-2.5 mb-6">
            <span className="agent-dot" />
            Start for free
          </div>

          <h1 className="text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
            Deploy your first<br />
            <span className="text-[#1E9BE0]">AI agent today.</span>
          </h1>
          <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
            No credit card required. Agents start working in under 10 minutes.
          </p>

          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-full border border-[#E5E7EB] bg-white text-[15px] font-medium text-[#0A0A0A] hover:bg-[#F9FAFB] transition-colors mb-4 disabled:opacity-60">
            {googleLoading
              ? <div className="w-4 h-4 border-2 border-[#1E9BE0] border-t-transparent rounded-full animate-spin" />
              : <GoogleIcon />}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF]">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-[14px] text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Full name</label>
                <input type="text" value={form.fullName} onChange={update('fullName')} placeholder="Alex Johnson" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10 transition-all bg-white" />
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Company</label>
                <input type="text" value={form.companyName} onChange={update('companyName')} placeholder="Acme Inc." required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10 transition-all bg-white" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Work email</label>
              <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10 transition-all bg-white" />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="Min 8 characters" required
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#1E9BE0] focus:ring-2 focus:ring-[#1E9BE0]/10 transition-all bg-white" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {form.password.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {rules.map(rule => {
                    const passed = rule.test(form.password)
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

            <button type="submit" disabled={loading || !allRulesPassed}
              className="btn-primary mt-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>}
            </button>

            <p className="text-center text-[12px] text-[#9CA3AF]">
              By signing up you agree to our{' '}
              <Link to="/terms" className="hover:text-[#6B7280]">Terms</Link> and{' '}
              <Link to="/privacy" className="hover:text-[#6B7280]">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
