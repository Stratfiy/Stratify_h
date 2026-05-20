import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft, Mail, Check } from 'lucide-react'

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
    if (error) { setError(error.message); setLoading(false) }
    else { setSent(true); setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#00D4AA]/10 blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 h-16 border-b border-[#F3F4F6] bg-white/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-white font-semibold text-[12px] tracking-tight">NL</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00D4AA] border border-white" />
          </div>
          <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#0A0A0A]">NAutomation Labs</span>
        </Link>
        <Link to="/login" className="btn-ghost text-[14px]">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">

          {!sent ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-6">
                <Mail className="w-5 h-5 text-[#0066FF]" />
              </div>

              <div className="eyebrow flex items-center gap-2.5 mb-4">
                <span className="agent-dot" />
                Account recovery
              </div>

              <h1 className="text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
                Reset your<br />
                <span className="text-[#0066FF]">password.</span>
              </h1>
              <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
                Enter the email you signed up with. We'll send a secure reset link — expires in 1 hour.
              </p>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-[14px] text-red-700">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-2">Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com" required
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[15px] text-[#0A0A0A] outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all bg-white" />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none">
                  {loading
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><span>Send reset link</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-6">
                <Check className="w-5 h-5 text-[#0066FF]" />
              </div>

              <div className="eyebrow flex items-center gap-2.5 mb-4">
                <span className="agent-dot" />
                Email sent
              </div>

              <h1 className="text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] font-medium text-[#0A0A0A] mb-3">
                Check your<br />
                <span className="text-[#0066FF]">inbox.</span>
              </h1>
              <p className="text-[16px] text-[#4B5563] leading-relaxed mb-2">
                We sent a reset link to
              </p>
              <p className="text-[16px] font-medium text-[#0A0A0A] mb-6">{email}</p>
              <p className="text-[14px] text-[#9CA3AF] mb-8">
                Didn't get it?{' '}
                <button onClick={() => setSent(false)} className="text-[#0066FF] font-medium hover:underline">Try again</button>
              </p>
              <Link to="/login" className="btn-ghost">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
