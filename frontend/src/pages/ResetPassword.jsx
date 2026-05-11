import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle, Lock } from 'lucide-react'

const rules = [
  { id:'length',  label:'At least 8 characters',       test: p => p.length >= 8 },
  { id:'upper',   label:'One uppercase letter (A–Z)',   test: p => /[A-Z]/.test(p) },
  { id:'number',  label:'One number (0–9)',             test: p => /[0-9]/.test(p) },
  { id:'special', label:'One special character (!@#$)', test: p => /[^A-Za-z0-9]/.test(p) },
]

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
        setSessionReady(true)
        setChecking(false)
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
    else {
      setSuccess(true)
      await supabase.auth.signOut()
      setTimeout(() => navigate('/login'), 2500)
    }
  }

  if (checking) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F7F7FA' }}>
      <div style={{ width:24, height:24, border:'3px solid #5B5BD6', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.6s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!sessionReady) return (
    <div style={{ minHeight:'100vh', background:'#F7F7FA', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"-apple-system,sans-serif" }}>
      <div style={{ maxWidth:420, width:'100%', background:'white', borderRadius:24, padding:40, textAlign:'center', boxShadow:'0 4px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'#FFF0EE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <AlertCircle style={{ width:32, height:32, color:'#E54D2E' }} />
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:'#1A1A2E', marginBottom:8 }}>Link expired or invalid</h2>
        <p style={{ fontSize:14, color:'#6B7280', marginBottom:28, lineHeight:1.6 }}>This reset link has expired or already been used. Request a new one.</p>
        <Link to="/forgot-password" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#5B5BD6,#7C3AED)', color:'white', textDecoration:'none', padding:'12px 24px', borderRadius:12, fontWeight:800, fontSize:14 }}>
          Request new link <ArrowRight style={{ width:16, height:16 }} />
        </Link>
      </div>
    </div>
  )

  if (success) return (
    <div style={{ minHeight:'100vh', background:'#F7F7FA', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"-apple-system,sans-serif" }}>
      <div style={{ maxWidth:420, width:'100%', background:'white', borderRadius:24, padding:40, textAlign:'center', boxShadow:'0 4px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'#E9F9EE', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <CheckCircle style={{ width:32, height:32, color:'#30A46C' }} />
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:'#1A1A2E', marginBottom:8 }}>Password updated!</h2>
        <p style={{ fontSize:14, color:'#6B7280' }}>Redirecting you to sign in with your new password...</p>
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
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, marginBottom:16 }}>SET NEW PASSWORD</p>
          <h2 style={{ color:'white', fontSize:36, fontWeight:900, lineHeight:1.2, letterSpacing:-0.8, marginBottom:16 }}>Choose something<br />strong.</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.7 }}>Must be 8+ characters with uppercase, number, and special character.</p>
        </div>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12, position:'relative', zIndex:2 }}>© 2026 StratifyAI</p>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
        <div style={{ maxWidth:420, width:'100%' }}>
          <div style={{ width:48, height:48, borderRadius:14, background:'#EEEEFF', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
            <Lock style={{ width:22, height:22, color:'#5B5BD6' }} />
          </div>
          <h1 style={{ fontSize:28, fontWeight:900, color:'#1A1A2E', letterSpacing:-0.6, marginBottom:8 }}>Set new password</h1>
          <p style={{ fontSize:14, color:'#6B7280', marginBottom:28 }}>Enter and confirm your new password below.</p>

          {error && <div style={{ background:'#FFF0EE', border:'1px solid #FCA5A5', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:13, color:'#E54D2E' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#374151', marginBottom:6 }}>New password</label>
              <div style={{ position:'relative' }}>
                <input type={showPassword?'text':'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required
                  style={{ width:'100%', padding:'13px 44px 13px 16px', borderRadius:12, border:'1.5px solid #E5E7EB', fontSize:14, outline:'none', color:'#1A1A2E', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#5B5BD6'} onBlur={e => e.target.style.borderColor='#E5E7EB'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF', display:'flex' }}>
                  {showPassword ? <EyeOff style={{ width:16, height:16 }} /> : <Eye style={{ width:16, height:16 }} />}
                </button>
              </div>
              {password.length > 0 && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:10 }}>
                  {rules.map(rule => {
                    const passed = rule.test(password)
                    return (
                      <div key={rule.id} style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:16, height:16, borderRadius:'50%', background:passed?'#30A46C':'#E5E7EB', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {passed && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                        <span style={{ fontSize:11, color:passed?'#30A46C':'#9CA3AF', fontWeight:passed?600:400 }}>{rule.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#374151', marginBottom:6 }}>Confirm password</label>
              <div style={{ position:'relative' }}>
                <input type={showConfirm?'text':'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required
                  style={{ width:'100%', padding:'13px 44px 13px 16px', borderRadius:12, border:`1.5px solid ${confirmPassword.length>0?(passwordsMatch?'#30A46C':'#EF4444'):'#E5E7EB'}`, fontSize:14, outline:'none', color:'#1A1A2E', boxSizing:'border-box' }} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF', display:'flex' }}>
                  {showConfirm ? <EyeOff style={{ width:16, height:16 }} /> : <Eye style={{ width:16, height:16 }} />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p style={{ fontSize:12, marginTop:5, color:passwordsMatch?'#30A46C':'#EF4444', fontWeight:600 }}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <button type="submit" disabled={loading || !allRulesPassed || !passwordsMatch}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none', background:allRulesPassed&&passwordsMatch?'linear-gradient(135deg,#5B5BD6,#7C3AED)':'#E5E7EB', color:allRulesPassed&&passwordsMatch?'white':'#9CA3AF', fontSize:14, fontWeight:800, cursor:loading||!allRulesPassed||!passwordsMatch?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:allRulesPassed&&passwordsMatch?'0 4px 16px rgba(91,91,214,0.3)':'none' }}>
              {loading ? <div style={{ width:18, height:18, border:'2px solid white', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.6s linear infinite' }} />
                : <><span>Update password</span><ArrowRight style={{ width:16, height:16 }} /></>}
            </button>
          </form>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
