import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { ArrowRight, ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Check your email</h2>
          <p className="text-[#6B7280] mb-2">
            We've sent a password reset link to
          </p>
          <p className="font-medium text-[#0A0A0A] mb-6">{email}</p>
          <p className="text-sm text-[#9CA3AF] mb-8">
            Didn't receive it? Check your spam folder or{' '}
            <button
              onClick={() => setSent(false)}
              className="text-[#0066FF] hover:underline"
            >
              try again
            </button>
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
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
          <p className="text-[#6B7280] text-sm font-mono uppercase tracking-widest mb-4">ACCOUNT RECOVERY</p>
          <h2 className="text-white text-4xl font-semibold tracking-tight leading-tight mb-6">
            Happens to<br />the best of us.
          </h2>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Enter your email and we'll send you a secure link to reset your password.
            The link expires in 1 hour.
          </p>
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

          <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-6">
            <Mail className="w-6 h-6 text-[#0A0A0A]" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mb-2">Reset your password</h1>
          <p className="text-[#6B7280] mb-8">
            Enter the email associated with your account and we'll send a reset link.
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Send reset link <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors mt-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
