import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', companyName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const passwordStrength = () => {
    const p = form.password
    if (p.length === 0) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', '#EF4444', '#F59E0B', '#10B981', '#0066FF']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    const { error } = await signUp(form.email, form.password, form.fullName, form.companyName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
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
            Click the link to activate your account and access your dashboard.
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
      {/* Left — branding */}
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

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
              <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight">StratifyAI</span>
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight mb-2">Create your account</h1>
          <p className="text-[#6B7280] mb-8">Start with a free demo. No credit card required.</p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={update('fullName')}
                  placeholder="Alex Johnson"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Company</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={update('companyName')}
                  placeholder="Acme Store"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Work email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Min 8 characters"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all"
                        style={{ backgroundColor: i <= passwordStrength() ? strengthColor[passwordStrength()] : '#E5E7EB' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColor[passwordStrength()] }}>
                    {strengthLabel[passwordStrength()]}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Create account <ArrowRight className="w-4 h-4" /></>
              )}
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
            <Link to="/login" className="text-[#0066FF] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
