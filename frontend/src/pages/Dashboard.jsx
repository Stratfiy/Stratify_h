import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { AGENTS } from '@/lib/site-data'
import Onboarding from '@/components/Onboarding'
import {
  LayoutDashboard, Zap, Settings, LogOut, Lock,
  ArrowRight, Bell, Users, ShoppingCart, Star,
  HeadphonesIcon, LineChart, Sparkles, AlertCircle,
  Clock, Menu, X, ChevronRight, TrendingUp, Search,
  BarChart3, Play, CheckCircle
} from 'lucide-react'

const PLAN_AGENTS = {
  starter: ['Kai', 'Remy', 'Echo'],
  growth: ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
  scale: ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
}

const AGENT_CFG = {
  Kai:   { color: '#5B5BD6', bg: '#EEEEFF', icon: Sparkles,       tag: 'Ad Production',    grad: 'linear-gradient(135deg,#5B5BD6,#7C3AED)' },
  Atlas: { color: '#E54D2E', bg: '#FFF0EE', icon: Users,          tag: 'Lead Gen',          grad: 'linear-gradient(135deg,#E54D2E,#FF6B6B)' },
  Nova:  { color: '#0091FF', bg: '#E8F4FF', icon: HeadphonesIcon, tag: 'Conversational AI', grad: 'linear-gradient(135deg,#0091FF,#00C6FF)' },
  Remy:  { color: '#30A46C', bg: '#E9F9EE', icon: ShoppingCart,   tag: 'Cart Recovery',     grad: 'linear-gradient(135deg,#30A46C,#3DD68C)' },
  Echo:  { color: '#F76808', bg: '#FFF3E8', icon: Star,           tag: 'Reviews & UGC',     grad: 'linear-gradient(135deg,#F76808,#FFB347)' },
  Sage:  { color: '#0EA5E9', bg: '#E0F5FF', icon: HeadphonesIcon, tag: 'Support',           grad: 'linear-gradient(135deg,#0EA5E9,#38BDF8)' },
  Pulse: { color: '#8B5CF6', bg: '#F3EEFF', icon: LineChart,      tag: 'Analytics',         grad: 'linear-gradient(135deg,#8B5CF6,#C084FC)' },
}

const MOCK_STATS = {
  Kai:   { value: '12',  label: 'Ads created',       trend: '+4',  pct: 72 },
  Atlas: { value: '847', label: 'Leads found',        trend: '+124', pct: 85 },
  Nova:  { value: '234', label: 'DMs handled',        trend: '+38', pct: 61 },
  Remy:  { value: '18',  label: 'Carts recovered',    trend: '+5',  pct: 45 },
  Echo:  { value: '64',  label: 'Reviews collected',  trend: '+12', pct: 53 },
  Sage:  { value: '312', label: 'Tickets resolved',   trend: '+44', pct: 80 },
  Pulse: { value: '4',   label: 'Reports sent',       trend: '0',   pct: 40 },
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  const meta = user?.user_metadata || {}
  const onboardingDone = meta.onboarding_complete || false
  const [localDone, setLocalDone] = useState(onboardingDone)
  const [localAnswers, setLocalAnswers] = useState(meta.onboarding_answers || null)
  const [localRec, setLocalRec] = useState(meta.recommended_agents || ['Kai', 'Remy', 'Echo', 'Atlas', 'Nova', 'Sage', 'Pulse'])

  if (!localDone) return <Onboarding onComplete={({ answers, recommendations }) => {
    setLocalAnswers(answers); setLocalRec(recommendations); setLocalDone(true)
  }} />

  const currentPlan = 'starter'
  const unlocked = PLAN_AGENTS[currentPlan]
  const statuses = { Kai: 'active', Remy: 'setup', Echo: 'setup', Atlas: null, Nova: null, Sage: null, Pulse: null }

  const handleSignOut = async () => { await signOut(); navigate('/') }

  const fullName = meta.full_name || ''
  const firstName = fullName.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const initials = (fullName || firstName).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const sorted = [...AGENTS].sort((a, b) => {
    const ai = localRec.indexOf(a.name), bi = localRec.indexOf(b.name)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents',   label: 'Agents',    icon: Zap },
    { id: 'settings', label: 'Settings',  icon: Settings },
  ]

  const SB = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #F1F1F4' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#5B5BD6,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(91,91,214,0.4)', position: 'relative' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 13, letterSpacing: -0.5 }}>SA</span>
            <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#30A46C', border: '2px solid white' }} />
          </div>
          <span style={{ fontWeight: 900, fontSize: 16, color: '#1A1A2E', letterSpacing: -0.4 }}>StratifyAI</span>
        </Link>
      </div>

      {/* Search */}
      <div style={{ padding: '14px 16px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F7F7FA', borderRadius: 10, padding: '9px 12px' }}>
          <Search style={{ width: 14, height: 14, color: '#9CA3AF', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>Search...</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#C4C4CC', padding: '8px 8px 4px' }}>Menu</div>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setActiveTab(id); setMobileOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px',
              borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: activeTab === id ? 'linear-gradient(135deg,#5B5BD6,#7C3AED)' : 'transparent',
              color: activeTab === id ? 'white' : '#6B7280',
              boxShadow: activeTab === id ? '0 4px 14px rgba(91,91,214,0.35)' : 'none',
              transition: 'all 0.15s', width: '100%', textAlign: 'left',
            }}>
            <Icon style={{ width: 15, height: 15 }} />{label}
          </button>
        ))}

        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#C4C4CC', padding: '16px 8px 4px' }}>Agents</div>
        {['Kai', 'Remy', 'Echo'].map(name => {
          const cfg = AGENT_CFG[name]
          const Icon = cfg.icon
          return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, cursor: 'pointer' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: cfg.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon style={{ width: 12, height: 12, color: 'white' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{name}</div>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>{cfg.tag}</div>
              </div>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: statuses[name] === 'active' ? '#30A46C' : '#F59E0B', flexShrink: 0 }} />
            </div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid #F1F1F4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#5B5BD6,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: 'white', flexShrink: 0, boxShadow: '0 4px 10px rgba(91,91,214,0.3)' }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fullName || firstName}</div>
            <div style={{ fontSize: 10, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button onClick={handleSignOut} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, background: '#FFF0EE', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#E54D2E' }}>
          <LogOut style={{ width: 13, height: 13 }} /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F7FA', fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* Desktop Sidebar */}
      <aside style={{ width: 240, flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0, background: 'white', borderRight: '1px solid #F1F1F4', zIndex: 30, flexDirection: 'column', overflowY: 'auto', display: 'none' }} className="lg:!flex">
        <SB />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} className="lg:hidden">
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <aside style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: 'white', overflowY: 'auto', boxShadow: '4px 0 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 14px 0' }}>
              <button onClick={() => setMobileOpen(false)} style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X style={{ width: 14, height: 14, color: '#6B7280' }} />
              </button>
            </div>
            <SB />
          </aside>
        </div>
      )}

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="lg:ml-[240px] ml-0">

        {/* Topbar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 40, height: 60, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #F1F1F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden" style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Menu style={{ width: 15, height: 15, color: '#6B7280' }} />
            </button>
            <Link to="/" style={{ fontWeight: 900, fontSize: 15, color: '#1A1A2E', textDecoration: 'none', letterSpacing: -0.4 }}>
              StratifyAI
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell style={{ width: 15, height: 15, color: '#6B7280' }} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: '#E54D2E', border: '1.5px solid white' }} />
            </button>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#5B5BD6,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: 'white', boxShadow: '0 3px 10px rgba(91,91,214,0.3)' }}>{initials}</div>
          </div>
        </header>

        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Hero Banner — Purple gradient like Uinel */}
              <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,#5B5BD6 0%,#7C3AED 50%,#9333EA 100%)', padding: '28px 32px', marginBottom: 22, position: 'relative', overflow: 'hidden', minHeight: 140 }}>
                {/* Decorative shapes */}
                <div style={{ position: 'absolute', top: -40, right: 80, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ position: 'absolute', top: 20, right: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', bottom: -30, right: 160, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                {/* 3D blob shape */}
                <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', width: 140, height: 100, background: 'linear-gradient(135deg,rgba(255,200,100,0.9),rgba(255,120,180,0.9))', borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', filter: 'blur(0px)' }} />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: 380 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 99, padding: '4px 12px', marginBottom: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700 }}>All agents operational</span>
                  </div>
                  <h2 style={{ color: 'white', fontSize: 22, fontWeight: 900, letterSpacing: -0.6, lineHeight: 1.25, marginBottom: 8 }}>
                    {greeting}, {firstName}! 👋<br />
                    <span style={{ fontWeight: 500, fontSize: 14, opacity: 0.8 }}>Your AI team is working 24/7 for you.</span>
                  </h2>
                  <button style={{ background: 'white', color: '#5B5BD6', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                    <Play style={{ width: 13, height: 13 }} /> Explore agents
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
                {[
                  { label: 'Active agents',  value: '1',  sub: 'of 3 unlocked',     color: '#5B5BD6', bg: '#EEEEFF', icon: Zap },
                  { label: 'Tasks done',     value: '12', sub: 'this month',         color: '#30A46C', bg: '#E9F9EE', icon: CheckCircle },
                  { label: 'Ads created',    value: '12', sub: 'by Kai this month',  color: '#F76808', bg: '#FFF3E8', icon: TrendingUp },
                  { label: 'Current plan',   value: 'Starter', sub: '3 of 7 agents', color: '#7C3AED', bg: '#F3EEFF', icon: BarChart3, isLink: true },
                ].map(({ label, value, sub, color, bg, icon: Icon, isLink }) => (
                  <div key={label} style={{ background: 'white', borderRadius: 16, padding: '18px 18px', border: '1px solid #F1F1F4', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -16, right: -16, width: 60, height: 60, borderRadius: '50%', background: bg, opacity: 0.7 }} />
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <Icon style={{ width: 16, height: 16, color }} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: '#1A1A2E', letterSpacing: -0.8, lineHeight: 1, marginBottom: 3 }}>{value}</div>
                    {isLink
                      ? <Link to="/pricing" style={{ fontSize: 11, fontWeight: 700, color, textDecoration: 'none' }}>Upgrade ↗</Link>
                      : <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{sub}</div>
                    }
                  </div>
                ))}
              </div>

              {/* Middle row: Agent spotlight + Quick actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 22 }}>

                {/* Priority agent card */}
                {(() => {
                  const top = localRec[0]
                  const cfg = AGENT_CFG[top]
                  const Icon = cfg?.icon || Zap
                  return (
                    <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #F1F1F4', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                      <div style={{ background: cfg?.grad, padding: '20px 24px 16px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
                          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                            <Icon style={{ width: 22, height: 22, color: 'white' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>✦ Your #1 priority</div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'white', letterSpacing: -0.5 }}>{top} is ready to activate</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ background: 'white', padding: '18px 24px' }}>
                        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16, lineHeight: 1.6 }}>{AGENTS.find(a => a.name === top)?.desc}</p>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <Link to={`/dashboard/agent/${top.toLowerCase()}`}
                            style={{ flex: 1, background: cfg?.grad, color: 'white', border: 'none', borderRadius: 12, padding: '11px 18px', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none', boxShadow: `0 6px 20px ${cfg?.color}40` }}>
                            Set up {top} <ArrowRight style={{ width: 14, height: 14 }} />
                          </Link>
                          <button style={{ padding: '11px 18px', borderRadius: 12, border: '1.5px solid #E5E7EB', background: 'white', fontSize: 13, fontWeight: 700, color: '#6B7280', cursor: 'pointer' }}>
                            Learn more
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Quick setup checklist */}
                <div style={{ background: 'white', borderRadius: 18, border: '1px solid #F1F1F4', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: '#EEEEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles style={{ width: 14, height: 14, color: '#5B5BD6' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E' }}>Get started</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>1 of 4 complete</div>
                    </div>
                  </div>
                  {/* Progress */}
                  <div style={{ height: 4, background: '#F1F1F4', borderRadius: 99, marginBottom: 18, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '25%', background: 'linear-gradient(90deg,#5B5BD6,#7C3AED)', borderRadius: 99 }} />
                  </div>
                  {[
                    { done: true,  text: 'Create account',       sub: "You're in!" },
                    { done: false, text: 'Set up Kai',           sub: 'Connect Meta Ads' },
                    { done: false, text: 'Set up Remy',          sub: 'Connect Shopify' },
                    { done: false, text: 'Upgrade to Growth',    sub: 'Unlock all 7 agents' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 3 ? 14 : 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: s.done ? 'linear-gradient(135deg,#30A46C,#3DD68C)' : '#F1F1F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {s.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: s.done ? 600 : 700, color: s.done ? '#9CA3AF' : '#1A1A2E', textDecoration: s.done ? 'line-through' : 'none' }}>{s.text}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agents grid */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#1A1A2E', letterSpacing: -0.3 }}>Your agents</h3>
                <button onClick={() => setActiveTab('agents')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#5B5BD6', background: 'none', border: 'none', cursor: 'pointer' }}>
                  View all <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {sorted.map((agent, i) => {
                  const cfg = AGENT_CFG[agent.name]
                  const stats = MOCK_STATS[agent.name]
                  const Icon = cfg?.icon || Zap
                  const isUnlocked = unlocked.includes(agent.name)
                  const status = statuses[agent.name]

                  if (!isUnlocked) return (
                    <div key={agent.name} style={{ background: 'white', borderRadius: 16, border: '1px solid #F1F1F4', padding: '16px', opacity: 0.55 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Lock style={{ width: 14, height: 14, color: '#9CA3AF' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF' }}>{agent.name}</div>
                          <div style={{ fontSize: 10, color: '#C4C4CC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1 }}>{cfg?.tag}</div>
                        </div>
                      </div>
                      <div style={{ height: 1, background: '#F3F4F6', marginBottom: 12 }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#C4C4CC' }}>Upgrade to unlock</span>
                        <Link to="/pricing" style={{ fontSize: 11, fontWeight: 800, color: '#5B5BD6', textDecoration: 'none' }}>Upgrade →</Link>
                      </div>
                    </div>
                  )

                  return (
                    <div key={agent.name} style={{ background: 'white', borderRadius: 16, border: `1px solid ${cfg.bg}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${cfg.color}25` }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)' }}>
                      <div style={{ height: 3, background: cfg.grad }} />
                      <div style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 12, background: cfg.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${cfg.color}40` }}>
                              <Icon style={{ width: 17, height: 17, color: 'white' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 900, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: 5 }}>
                                {agent.name}
                                {i === 0 && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 99, background: cfg.bg, color: cfg.color, fontWeight: 800 }}>TOP</span>}
                              </div>
                              <div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 1 }}>{cfg.tag}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                            background: status === 'active' ? '#E9F9EE' : status === 'setup' ? '#FFF3E8' : '#F3F4F6',
                            color: status === 'active' ? '#30A46C' : status === 'setup' ? '#F76808' : '#9CA3AF',
                            border: `1px solid ${status === 'active' ? '#A7F3D0' : status === 'setup' ? '#FED7AA' : '#E5E7EB'}` }}>
                            {status === 'active' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30A46C', display: 'inline-block', animation: 'pulse 2s infinite' }} />}
                            {status === 'active' ? 'Active' : status === 'setup' ? 'Setup' : 'Pending'}
                          </div>
                        </div>

                        {status === 'active' && stats && (
                          <div style={{ background: cfg.bg, borderRadius: 12, padding: '12px', marginBottom: 10 }}>
                            <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, marginBottom: 3 }}>{stats.label}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                              <span style={{ fontSize: 28, fontWeight: 900, color: cfg.color, letterSpacing: -1 }}>{stats.value}</span>
                              <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, background: `${cfg.color}18`, padding: '2px 7px', borderRadius: 99 }}>+{stats.trend}</span>
                            </div>
                            <div style={{ marginTop: 8, height: 4, background: `${cfg.color}20`, borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${stats.pct}%`, background: cfg.grad, borderRadius: 99, transition: 'width 1s ease' }} />
                            </div>
                          </div>
                        )}

                        {status === 'setup' && (
                          <div style={{ background: '#FFF3E8', border: '1px solid #FED7AA', borderRadius: 12, padding: '10px 12px', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <AlertCircle style={{ width: 13, height: 13, color: '#F76808', flexShrink: 0 }} />
                              <span style={{ fontSize: 12, color: '#F76808', fontWeight: 600 }}>Setup required to activate</span>
                            </div>
                          </div>
                        )}

                        <div style={{ height: 1, background: '#F3F4F6', margin: '10px 0' }} />
                        <Link to={`/dashboard/agent/${agent.name.toLowerCase()}`}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: cfg.color, textDecoration: 'none' }}>
                          {status === 'setup' ? 'Complete setup' : 'View details'}
                          <ChevronRight style={{ width: 14, height: 14 }} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* AGENTS TAB */}
          {activeTab === 'agents' && (
            <>
              <div style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A2E', letterSpacing: -0.7, marginBottom: 4 }}>My Agents</h1>
                <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>Sorted by your goals · {unlocked.length} active · {7 - unlocked.length} locked</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {sorted.map((agent) => {
                  const cfg = AGENT_CFG[agent.name]
                  const stats = MOCK_STATS[agent.name]
                  const Icon = cfg?.icon || Zap
                  const isUnlocked = unlocked.includes(agent.name)
                  const status = statuses[agent.name]
                  if (!isUnlocked) return (
                    <div key={agent.name} style={{ background: 'white', borderRadius: 16, border: '1px solid #F1F1F4', padding: 16, opacity: 0.5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock style={{ width: 14, height: 14, color: '#9CA3AF' }} /></div>
                        <div><div style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF' }}>{agent.name}</div><div style={{ fontSize: 10, color: '#C4C4CC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1 }}>{cfg?.tag}</div></div>
                      </div>
                      <div style={{ height: 1, background: '#F3F4F6', marginBottom: 12 }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: '#C4C4CC' }}>Upgrade to unlock</span>
                        <Link to="/pricing" style={{ fontSize: 11, fontWeight: 800, color: '#5B5BD6', textDecoration: 'none' }}>Upgrade →</Link>
                      </div>
                    </div>
                  )
                  return (
                    <div key={agent.name} style={{ background: 'white', borderRadius: 16, border: `1px solid ${cfg.bg}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                      <div style={{ height: 3, background: cfg.grad }} />
                      <div style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: cfg.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${cfg.color}40` }}><Icon style={{ width: 18, height: 18, color: 'white' }} /></div>
                            <div><div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>{agent.name}</div><div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 1 }}>{agent.role}</div></div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                            background: status === 'active' ? '#E9F9EE' : '#FFF3E8',
                            color: status === 'active' ? '#30A46C' : '#F76808',
                            border: `1px solid ${status === 'active' ? '#A7F3D0' : '#FED7AA'}` }}>
                            {status === 'active' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30A46C', display: 'inline-block' }} />}
                            {status === 'active' ? 'Active' : 'Setup needed'}
                          </div>
                        </div>
                        {stats && status === 'active' && (
                          <div style={{ background: cfg.bg, borderRadius: 12, padding: 12, marginBottom: 10 }}>
                            <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 3 }}>{stats.label}</div>
                            <div style={{ fontSize: 26, fontWeight: 900, color: cfg.color, letterSpacing: -0.8 }}>{stats.value}</div>
                            <div style={{ marginTop: 6, height: 3, background: `${cfg.color}20`, borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${stats.pct}%`, background: cfg.grad, borderRadius: 99 }} />
                            </div>
                          </div>
                        )}
                        {status === 'setup' && <div style={{ background: '#FFF3E8', borderRadius: 12, padding: '10px 12px', marginBottom: 10, fontSize: 12, color: '#F76808', fontWeight: 600 }}>Complete setup to activate</div>}
                        <div style={{ height: 1, background: '#F3F4F6', margin: '10px 0' }} />
                        <Link to={`/dashboard/agent/${agent.name.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: cfg.color, textDecoration: 'none' }}>
                          {status === 'setup' ? 'Complete setup' : 'View details'} <ChevronRight style={{ width: 14, height: 14 }} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 600 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1A2E', letterSpacing: -0.7, marginBottom: 4 }}>Settings</h1>
              <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24, fontWeight: 500 }}>Manage your account</p>
              {[
                { title: 'Account', fields: [
                  { label: 'Full name',    val: fullName,      type: 'text',  dis: false },
                  { label: 'Company',     val: meta.company_name || '', type: 'text', dis: false },
                  { label: 'Email',       val: user?.email,   type: 'email', dis: true  },
                ]},
              ].map(({ title, fields }) => (
                <div key={title} style={{ background: 'white', borderRadius: 18, border: '1px solid #F1F1F4', padding: '22px', marginBottom: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A2E', marginBottom: 18 }}>{title}</div>
                  {fields.map(({ label, val, type, dis }) => (
                    <div key={label} style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: '#9CA3AF', marginBottom: 6 }}>{label}</label>
                      <input type={type} defaultValue={val} disabled={dis} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid', borderColor: dis ? '#F1F1F4' : '#E5E7EB', background: dis ? '#F9FAFB' : 'white', fontSize: 13, fontWeight: 500, color: dis ? '#9CA3AF' : '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <button style={{ background: 'linear-gradient(135deg,#5B5BD6,#7C3AED)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 22px', fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 6px 20px rgba(91,91,214,0.3)' }}>Save changes</button>
                </div>
              ))}

              <div style={{ background: 'white', borderRadius: 18, border: '1px solid #F1F1F4', padding: '22px', marginBottom: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A2E', marginBottom: 8 }}>Preferences</div>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 14, fontWeight: 500 }}>Retake the setup quiz to repersonalize your dashboard.</p>
                <button onClick={() => setLocalDone(false)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px', borderRadius: 12, border: '1.5px solid #E5E7EB', background: 'white', fontSize: 13, fontWeight: 700, color: '#5B5BD6', cursor: 'pointer' }}>
                  <Sparkles style={{ width: 14, height: 14 }} /> Redo setup quiz
                </button>
              </div>

              <div style={{ background: 'white', borderRadius: 18, border: '1px solid #FEE2E2', padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: '#E54D2E', marginBottom: 8 }}>Danger zone</div>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 14 }}>Sign out of your account on this device.</p>
                <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px', borderRadius: 12, border: '1.5px solid #FCA5A5', background: '#FFF0EE', fontSize: 13, fontWeight: 800, color: '#E54D2E', cursor: 'pointer' }}>
                  <LogOut style={{ width: 14, height: 14 }} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
