import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight, Mail, CheckCircle } from 'lucide-react'

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

  if (sent) return (
    <div style={{ minHeight:'100vh', background:'#F7F7FA', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"-apple-system,sans-serif" }}>
      <div style={{ maxWidth:420, width:'100%', background:'white', borderRadius:24, padding:40, textAlign:'center', boxShadow:'0 4px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'#E9F9EE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <CheckCircle style={{ width:32, height:32, color:'#30A46C' }} />
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:'#1A1A2E', marginBottom:8 }}>Check your email</h2>
        <p style={{ fontSize:14, color:'#6B7280', marginBottom:6 }}>We sent a password reset link to</p>
        <p style={{ fontSize:14, fontWeight:700, color:'#1A1A2E', marginBottom:24 }}>{email}</p>
        <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:28 }}>
          Click the link in your email to set a new password. Didn't get it?{' '}
          <button onClick={() => setSent(false)} style={{ color:'#5B5BD6', fontWeight:700, background:'none', border:'none', cursor:'pointer', fontSize:12 }}>Try again</button>
        </p>
        <Link to="/login" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'#6B7280', textDecoration:'none' }}>
          <ArrowLeft style={{ width:14, height:14 }} /> Back to sign in
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#F7F7FA', display:'flex', fontFamily:"-apple-system,sans-serif" }}>
      <div className="hidden lg:flex" style={{ width:'45%', background:'linear-gradient(135deg,#5B5BD6,#7C3AED)', flexDirection:'column', justifyContent:'space-between', padding:48, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.07)' }} />
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', position:'relative', zIndex:2 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontWeight:900, fontSize:13 }}>SA</span>
          </div>
          <span style={{ color:'white', fontWeight:900, fontSize:16 }}>StratifyAI</span>
        </Link>
        <div style={{ position:'relative', zIndex:2 }}>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, marginBottom:16 }}>ACCOUNT RECOVERY</p>
          <h2 style={{ color:'white', fontSize:36, fontWeight:900, lineHeight:1.2, letterSpacing:-0.8, marginBottom:16 }}>Happens to<br />the best of us.</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.7 }}>Enter your email and we'll send a secure link to reset your password.</p>
        </div>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12, position:'relative', zIndex:2 }}>© 2026 StratifyAI</p>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
        <div style={{ maxWidth:420, width:'100%' }}>
          <div style={{ width:48, height:48, borderRadius:14, background:'#EEEEFF', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
            <Mail style={{ width:22, height:22, color:'#5B5BD6' }} />
          </div>
          <h1 style={{ fontSize:28, fontWeight:900, color:'#1A1A2E', letterSpacing:-0.6, marginBottom:8 }}>Reset your password</h1>
          <p style={{ fontSize:14, color:'#6B7280', marginBottom:28 }}>Enter the email you signed up with and we'll send you a reset link.</p>

          {error && <div style={{ background:'#FFF0EE', border:'1px solid #FCA5A5', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:13, color:'#E54D2E' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#374151', marginBottom:6 }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required
                style={{ width:'100%', padding:'13px 16px', borderRadius:12, border:'1.5px solid #E5E7EB', fontSize:14, outline:'none', color:'#1A1A2E', boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor='#5B5BD6'} onBlur={e => e.target.style.borderColor='#E5E7EB'} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none', background:'linear-gradient(135deg,#5B5BD6,#7C3AED)', color:'white', fontSize:14, fontWeight:800, cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 4px 16px rgba(91,91,214,0.3)' }}>
              {loading ? <div style={{ width:18, height:18, border:'2px solid white', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.6s linear infinite' }} />
                : <><span>Send reset link</span><ArrowRight style={{ width:16, height:16 }} /></>}
            </button>
          </form>
          <Link to="/login" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:20, fontSize:13, fontWeight:700, color:'#6B7280', textDecoration:'none' }}>
            <ArrowLeft style={{ width:14, height:14 }} /> Back to sign in
          </Link>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
