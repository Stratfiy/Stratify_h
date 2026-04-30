import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
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
          <p className="text-[#6B7280] text-sm font-mono uppercase tracking-widest mb-4">YOUR AI OPERATIONS LAYER</p>
          <h2 className="text-white text-4xl font-semibold tracking-tight leading-tight mb-6">
            Your agents are<br />working while<br />you sleep.
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { agent: 'Kai', status: 'Created 3 ad creatives', time: '2m ago', color: '#0066FF' },
              { agent: 'Remy', status: 'Recovered 2 abandoned carts', time: '14m ago', color: '#00D4AA' },
              { agent: 'Echo', status: 'Collected 8 new reviews', time: '1h ago', color: '#F59E0B' },
            ].map((item) => (
              <div key={item.agent} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: item.color + '20', border: `1px solid ${item.color}40` }}>
                  {item.agent[0]}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.agent}</p>
                  <p className="text-[#6B7280] text-xs">{item.status}</p>
                </div>
                <span className="text-[#6B7280] text-xs">{item.time}</span>
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

          <h1 className="text-3xl font-semibold tracking-tight mb-2">Welcome back</h1>
          <p className="text-[#6B7280] mb-8">Sign in to your dashboard to manage your agents.</p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#0A0A0A]">Password</label>
                <Link to="/forgot-password" className="text-sm text-[#0066FF] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#0066FF] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
