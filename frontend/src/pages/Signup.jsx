import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  { id: 'length',  label: 'At least 8 characters',       test: (p) => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter (A–Z)',   test: (p) => /[A-Z]/.test(p) },
  { id: 'number',  label: 'One number (0–9)',             test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$)', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

export default function Signup() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', companyName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const passedRules = rules.filter(r => r.test(form.password))
  const allRulesPassed = passedRules.length === rules.length

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!allRulesPassed) {
      setError('Password does not meet all requirements')
      return
    }

    setLoading(true)
    const { error } = await signUp(form.email, form.password, form.fullName, form.companyName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setGoogleLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Check your email</h2>
          <p className="text-[#6B7280] mb-6">
            We've sent a confirmation link to <strong>{form.email}</strong>.
            Click the link to activate your account.
          </p>
          <Link to="/login" className="text-[#0066FF] hover:underline text-sm font-medium">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A0A0A] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
            <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
            <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
          </div>
          <span className="font-semibold text-[17px] tracking-tight text-white">StratifyAI</span>
        </Link>
        <div>
          <p className="text-[#6B7280] text-sm font-mono uppercase tracking-widest mb-4">JOIN STRATIFYAI</p>
          <h2 className="text-white text-4xl font-semibold tracking-tight leading-tight mb-8">
            Deploy your first<br />AI agent in<br />under 10 minutes.
          </h2>
          <div className="flex flex-col gap-4">
            {[
              'No technical setup required',
              'Agents start working immediately',
              'Cancel anytime, no contracts',
              'Dedicated onboarding support',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00D4AA]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#00D4AA]" />
                </div>
                <span className="text-[#D1D5DB] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[#4B5563] text-sm">© 2026 StratifyAI. All rights reserved.</p>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
              <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight">StratifyAI</span>
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight mb-2">Create your account</h1>
          <p className="text-[#6B7280] mb-8">Start with a free demo. No credit card required.</p>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-xl py-3 px-4 text-sm font-medium text-[#0A0A0A] hover:bg-[#F9FAFB] transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading
              ? <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
              : <GoogleIcon />
            }
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-xs text-[#9CA3AF]">or sign up with email</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Full name</label>
                <input type="text" value={form.fullName} onChange={update('fullName')}
                  placeholder="Alex Johnson" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Company</label>
                <input type="text" value={form.companyName} onChange={update('companyName')}
                  placeholder="Acme Store" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Work email</label>
              <input type="email" value={form.email} onChange={update('email')}
                placeholder="you@company.com" required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password} onChange={update('password')}
                  placeholder="Min 8 characters" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password rules checklist */}
              {form.password.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {rules.map((rule) => {
                    const passed = rule.test(form.password)
                    return (
                      <div key={rule.id} className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          passed ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                        }`}>
                          {passed && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs transition-colors ${passed ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`}>
                          {rule.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <button type="submit" disabled={loading || !allRulesPassed}
              className="w-full bg-[#0A0A0A] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <>Create account <ArrowRight className="w-4 h-4" /></>
              }
            </button>

            <p className="text-center text-xs text-[#9CA3AF]">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-[#6B7280] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-[#6B7280] hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0066FF] hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
