import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/AuthContext'
import { AGENTS } from '@/lib/site-data'
import Onboarding from '@/components/Onboarding'
import {
  LayoutDashboard, Zap, Settings, LogOut, Lock,
  ArrowRight, Bell, Users, ShoppingCart, Star,
  HeadphonesIcon, LineChart, Sparkles, AlertCircle,
  Menu, X, ChevronRight, TrendingUp, BarChart3, CheckCircle,
} from 'lucide-react'

const PLAN_AGENTS = {
  starter: ['Kai', 'Remy', 'Echo'],
  growth:  ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
  scale:   ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
}

const AGENT_CFG = {
  Kai:   { color: '#5B5BD6', bg: '#EEEEFF', icon: Sparkles,       tag: 'Ad Production',    grad: 'linear-gradient(135deg,#5B5BD6,#7C3AED)' },
  Atlas: { color: '#E54D2E', bg: '#FFF0EE', icon: Users,          tag: 'Lead Gen',          grad: 'linear-gradient(135deg,#E54D2E,#FF6B6B)' },
  Nova:  { color: '#0091FF', bg: '#E8F4FF', icon: HeadphonesIcon, tag: 'Conversational AI', grad: 'linear-gradient(135deg,#0091FF,#00C6FF)' },
  Remy:  { color: '#00B894', bg: '#E6FAF5', icon: ShoppingCart,   tag: 'Cart Recovery',     grad: 'linear-gradient(135deg,#00B894,#00D4AA)' },
  Echo:  { color: '#F76808', bg: '#FFF3E8', icon: Star,           tag: 'Reviews & UGC',     grad: 'linear-gradient(135deg,#F76808,#FFB347)' },
  Sage:  { color: '#0EA5E9', bg: '#E0F5FF', icon: HeadphonesIcon, tag: 'Support',           grad: 'linear-gradient(135deg,#0EA5E9,#38BDF8)' },
  Pulse: { color: '#8B5CF6', bg: '#F3EEFF', icon: LineChart,      tag: 'Analytics',         grad: 'linear-gradient(135deg,#8B5CF6,#C084FC)' },
}

const MOCK_STATS = {
  Kai:   { value: '12',  label: 'Ads created',      trend: '+4',   pct: 72 },
  Atlas: { value: '847', label: 'Leads found',       trend: '+124', pct: 85 },
  Nova:  { value: '234', label: 'DMs handled',       trend: '+38',  pct: 61 },
  Remy:  { value: '18',  label: 'Carts recovered',   trend: '+5',   pct: 45 },
  Echo:  { value: '64',  label: 'Reviews collected', trend: '+12',  pct: 53 },
  Sage:  { value: '312', label: 'Tickets resolved',  trend: '+44',  pct: 80 },
  Pulse: { value: '4',   label: 'Reports sent',      trend: '0',    pct: 40 },
}

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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
  const [localRec, setLocalRec] = useState(
    meta.recommended_agents || ['Kai', 'Remy', 'Echo', 'Atlas', 'Nova', 'Sage', 'Pulse']
  )

  if (!localDone) return (
    <Onboarding onComplete={({ answers, recommendations }) => {
      setLocalAnswers(answers); setLocalRec(recommendations); setLocalDone(true)
    }} />
  )

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
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.07]">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="relative w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
            <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
            <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
          </div>
          <span className="font-semibold text-[17px] tracking-tight text-white">StratifyAI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <div className="px-2 pb-2 font-mono text-[10px] tracking-[0.16em] uppercase text-white/25">Menu</div>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setMobileOpen(false) }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium border-none cursor-pointer text-left transition-all duration-150 ${
              activeTab === id
                ? 'bg-white/10 text-white'
                : 'bg-transparent text-white/45 hover:text-white/75 hover:bg-white/5'
            }`}
          >
            <Icon className="w-[15px] h-[15px] shrink-0" />
            <span className="flex-1">{label}</span>
            {activeTab === id && (
              <span className="w-1 h-3.5 rounded-full bg-[#0066FF]" />
            )}
          </button>
        ))}

        <div className="px-2 pb-2 pt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/25">Active agents</div>
        {['Kai', 'Remy', 'Echo'].map(name => {
          const cfg = AGENT_CFG[name]
          const Icon = cfg.icon
          return (
            <div key={name} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-default hover:bg-white/5 transition-colors">
              <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: cfg.grad }}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-white/75 leading-none">{name}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 mt-0.5">{cfg.tag}</div>
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: statuses[name] === 'active' ? '#00D4AA' : '#F59E0B' }}
              />
            </div>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 pt-3 border-t border-white/[0.07]">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-mono text-[11px] font-semibold text-white shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-white truncate">{fullName || firstName}</div>
            <div className="text-[10px] text-white/35 truncate font-mono">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[12px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 bg-transparent border-none cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* Sidebar overlay — all screen sizes */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0A0A0A] overflow-y-auto shadow-2xl">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border-none cursor-pointer"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <SB />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] flex items-center justify-between px-5 gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            >
              <Menu className="w-4 h-4 text-[#6B7280]" />
            </button>
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
                <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
              </div>
              <span className="font-semibold text-[17px] tracking-tight text-[#0A0A0A]">StratifyAI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="relative w-8 h-8 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer hover:bg-[#F9FAFB] transition-colors">
              <Bell className="w-3.5 h-3.5 text-[#6B7280]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E54D2E] border border-white" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center font-mono text-[11px] font-medium text-white">
              {initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-5 md:p-7">

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <motion.div initial="hidden" animate="show" variants={stagger}>

              {/* Hero */}
              <motion.div variants={fade} className="relative rounded-2xl bg-[#0A0A0A] overflow-hidden mb-5 p-7 md:p-9 min-h-[180px]">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0066FF]/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 w-56 h-40 rounded-full bg-[#00D4AA]/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/8 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/60">All agents operational</span>
                  </div>
                  <h2 className="text-[26px] md:text-[32px] font-medium tracking-tight text-white leading-tight mb-2">
                    {greeting}, {firstName}.
                  </h2>
                  <p className="text-[14px] text-white/45 mb-6 max-w-xs leading-relaxed">
                    Your AI team has been working while you were away.
                  </p>
                  <button
                    onClick={() => setActiveTab('agents')}
                    className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors border-none cursor-pointer"
                  >
                    View agents <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'Active agents',    value: '1',       sub: 'of 3 unlocked',    color: '#0066FF', bg: '#EBF3FF', icon: Zap },
                  { label: 'Tasks this month', value: '12',      sub: 'across all agents', color: '#00B894', bg: '#E6FAF5', icon: CheckCircle },
                  { label: 'Ads created',      value: '12',      sub: 'by Kai this month', color: '#F76808', bg: '#FFF3E8', icon: TrendingUp },
                  { label: 'Current plan',     value: 'Starter', isLink: true,             color: '#8B5CF6', bg: '#F3EEFF', icon: BarChart3 },
                ].map(({ label, value, sub, color, bg, icon: Icon, isLink }) => (
                  <div key={label} className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3.5" style={{ background: bg }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-1">{label}</div>
                    <div className="text-[22px] font-medium tracking-tight text-[#0A0A0A] leading-none mb-1.5">{value}</div>
                    {isLink
                      ? <Link to="/pricing" className="text-[11px] font-medium no-underline" style={{ color }}>Upgrade plan →</Link>
                      : <div className="text-[11px] text-[#9CA3AF]">{sub}</div>
                    }
                  </div>
                ))}
              </motion.div>

              {/* Agent spotlight + Checklist */}
              <motion.div variants={fade} className="grid lg:grid-cols-[1fr_288px] gap-4 mb-5">

                {/* Priority agent */}
                {(() => {
                  const top = localRec[0]
                  const cfg = AGENT_CFG[top]
                  const Icon = cfg?.icon || Zap
                  const agentData = AGENTS.find(a => a.name === top)
                  return (
                    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                      <div className="h-[3px]" style={{ background: cfg?.grad }} />
                      <div className="p-6">
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: cfg?.color }}>
                          ✦ Your #1 priority
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg?.grad }}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-[18px] font-medium tracking-tight text-[#0A0A0A]">{top} is ready to activate</div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] mt-0.5">{cfg?.tag}</div>
                          </div>
                        </div>
                        <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-5">{agentData?.desc}</p>
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/dashboard/agent/${top.toLowerCase()}`}
                            className="inline-flex items-center gap-2 text-[13px] font-medium text-white px-4 py-2.5 rounded-xl no-underline transition-opacity hover:opacity-90"
                            style={{ background: cfg?.grad }}
                          >
                            Set up {top} <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button className="text-[13px] font-medium text-[#6B7280] px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#FAFAFA] cursor-pointer transition-colors">
                            Learn more
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Checklist */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[13px] font-medium text-[#0A0A0A]">Get started</div>
                    <div className="font-mono text-[10px] text-[#9CA3AF]">1 / 4</div>
                  </div>
                  <div className="h-[3px] bg-[#E5E7EB] rounded-full mb-5 overflow-hidden">
                    <div className="h-full w-1/4 rounded-full bg-[#0066FF]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { done: true,  text: 'Create account',    sub: "You're in!" },
                      { done: false, text: 'Set up Kai',        sub: 'Connect Meta Ads' },
                      { done: false, text: 'Set up Remy',       sub: 'Connect Shopify' },
                      { done: false, text: 'Upgrade to Growth', sub: 'Unlock all 7 agents' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${s.done ? 'bg-[#0A0A0A]' : 'border-2 border-[#E5E7EB]'}`}>
                          {s.done && (
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className={`text-[13px] font-medium leading-tight ${s.done ? 'text-[#9CA3AF] line-through' : 'text-[#0A0A0A]'}`}>{s.text}</div>
                          <div className="text-[11px] text-[#9CA3AF] mt-0.5">{s.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Agents grid */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-[15px] font-medium tracking-tight text-[#0A0A0A]">Your agents</div>
                <button
                  onClick={() => setActiveTab('agents')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#0066FF] bg-transparent border-none cursor-pointer"
                >
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <motion.div variants={fade} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((agent) => {
                  const cfg = AGENT_CFG[agent.name]
                  const stats = MOCK_STATS[agent.name]
                  const Icon = cfg?.icon || Zap
                  const isUnlocked = unlocked.includes(agent.name)
                  const status = statuses[agent.name]

                  if (!isUnlocked) return (
                    <div key={agent.name} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4 text-[#C4C4CC]" />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#9CA3AF]">{agent.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#C4C4CC] mt-0.5">{cfg?.tag}</div>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#C4C4CC] leading-relaxed mb-4 flex-1">{agent.desc}</p>
                      <div className="h-px bg-[#F3F4F6] mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[#C4C4CC]">Upgrade to unlock</span>
                        <Link to="/pricing" className="text-[12px] font-medium text-[#0066FF] no-underline hover:underline">Upgrade →</Link>
                      </div>
                    </div>
                  )

                  return (
                    <div
                      key={agent.name}
                      className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-default flex flex-col"
                    >
                      <div className="h-[3px]" style={{ background: cfg?.grad }} />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg?.grad }}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-[14px] font-medium tracking-tight text-[#0A0A0A]">{agent.name}</div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] mt-0.5">{cfg?.tag}</div>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] ${
                            status === 'active' ? 'bg-[#E6FAF5] text-[#00B894]' :
                            status === 'setup'  ? 'bg-[#FFF3E8] text-[#F76808]' :
                            'bg-[#F3F4F6] text-[#9CA3AF]'
                          }`}>
                            {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />}
                            {status === 'active' ? 'Active' : status === 'setup' ? 'Setup' : 'Pending'}
                          </div>
                        </div>

                        <div className="flex-1">
                          {status === 'active' && stats && (
                            <div className="rounded-xl p-3.5 mb-4" style={{ background: cfg?.bg }}>
                              <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: `${cfg?.color}90` }}>{stats.label}</div>
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[22px] font-medium tracking-tight" style={{ color: cfg?.color }}>{stats.value}</span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${cfg?.color}18`, color: cfg?.color }}>{stats.trend}</span>
                              </div>
                              <div className="h-1 rounded-full overflow-hidden" style={{ background: `${cfg?.color}20` }}>
                                <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, background: cfg?.grad }} />
                              </div>
                            </div>
                          )}

                          {status === 'setup' && (
                            <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 mb-4 bg-[#FFFBF0] border border-[#FED7AA]">
                              <AlertCircle className="w-3.5 h-3.5 text-[#F76808] shrink-0" />
                              <span className="text-[12px] font-medium text-[#F76808]">Setup required to activate</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-[#F3F4F6] mb-3" />
                        <Link
                          to={`/dashboard/agent/${agent.name.toLowerCase()}`}
                          className="flex items-center justify-between text-[13px] font-medium no-underline transition-opacity hover:opacity-70"
                          style={{ color: cfg?.color }}
                        >
                          {status === 'setup' ? 'Complete setup' : 'View details'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ── AGENTS TAB ── */}
          {activeTab === 'agents' && (
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fade} className="mb-7">
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-2">Agents</div>
                <h1 className="text-2xl md:text-[30px] font-medium tracking-tight text-[#0A0A0A]">My AI team</h1>
                <p className="mt-1.5 text-[13.5px] text-[#6B7280]">
                  Sorted by your goals · {unlocked.length} active · {7 - unlocked.length} locked
                </p>
              </motion.div>
              <motion.div variants={fade} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((agent) => {
                  const cfg = AGENT_CFG[agent.name]
                  const stats = MOCK_STATS[agent.name]
                  const Icon = cfg?.icon || Zap
                  const isUnlocked = unlocked.includes(agent.name)
                  const status = statuses[agent.name]

                  if (!isUnlocked) return (
                    <div key={agent.name} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4 text-[#C4C4CC]" />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#9CA3AF]">{agent.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#C4C4CC] mt-0.5">{cfg?.tag}</div>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#C4C4CC] leading-relaxed mb-4 flex-1">{agent.desc}</p>
                      <div className="h-px bg-[#F3F4F6] mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[#C4C4CC]">Upgrade to unlock</span>
                        <Link to="/pricing" className="text-[12px] font-medium text-[#0066FF] no-underline hover:underline">Upgrade →</Link>
                      </div>
                    </div>
                  )

                  return (
                    <div
                      key={agent.name}
                      className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col"
                    >
                      <div className="h-[3px]" style={{ background: cfg?.grad }} />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg?.grad }}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-[14px] font-medium tracking-tight text-[#0A0A0A]">{agent.name}</div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] mt-0.5">{cfg?.tag}</div>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] ${
                            status === 'active' ? 'bg-[#E6FAF5] text-[#00B894]' : 'bg-[#FFF3E8] text-[#F76808]'
                          }`}>
                            {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />}
                            {status === 'active' ? 'Active' : 'Setup needed'}
                          </div>
                        </div>

                        <div className="flex-1">
                          {stats && status === 'active' && (
                            <div className="rounded-xl p-3.5 mb-4" style={{ background: cfg?.bg }}>
                              <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: `${cfg?.color}90` }}>{stats.label}</div>
                              <div className="text-[22px] font-medium tracking-tight mb-2" style={{ color: cfg?.color }}>{stats.value}</div>
                              <div className="h-1 rounded-full overflow-hidden" style={{ background: `${cfg?.color}20` }}>
                                <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, background: cfg?.grad }} />
                              </div>
                            </div>
                          )}

                          {status === 'setup' && (
                            <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 mb-4 bg-[#FFFBF0] border border-[#FED7AA]">
                              <AlertCircle className="w-3.5 h-3.5 text-[#F76808] shrink-0" />
                              <span className="text-[12px] font-medium text-[#F76808]">Setup required to activate</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-[#F3F4F6] mb-3" />
                        <Link
                          to={`/dashboard/agent/${agent.name.toLowerCase()}`}
                          className="flex items-center justify-between text-[13px] font-medium no-underline hover:opacity-70 transition-opacity"
                          style={{ color: cfg?.color }}
                        >
                          {status === 'setup' ? 'Complete setup' : 'View details'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === 'settings' && (
            <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-[540px]">
              <motion.div variants={fade} className="mb-7">
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-2">Account</div>
                <h1 className="text-2xl md:text-[30px] font-medium tracking-tight text-[#0A0A0A]">Settings</h1>
                <p className="mt-1.5 text-[13.5px] text-[#6B7280]">Manage your account and preferences</p>
              </motion.div>

              <motion.div variants={fade} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-4">
                <div className="text-[14px] font-medium text-[#0A0A0A] mb-5">Account details</div>
                {[
                  { label: 'Full name', val: fullName,                type: 'text',  dis: false },
                  { label: 'Company',   val: meta.company_name || '', type: 'text',  dis: false },
                  { label: 'Email',     val: user?.email,             type: 'email', dis: true  },
                ].map(({ label, val, type, dis }) => (
                  <div key={label} className="mb-4">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-1.5">{label}</label>
                    <input
                      type={type}
                      defaultValue={val}
                      disabled={dis}
                      className="w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-colors focus:border-[#0066FF]"
                      style={{
                        borderColor: dis ? '#E5E7EB' : '#E5E7EB',
                        background: dis ? '#FAFAFA' : 'white',
                        color: dis ? '#9CA3AF' : '#0A0A0A',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}
                <button className="bg-[#0A0A0A] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors border-none cursor-pointer">
                  Save changes
                </button>
              </motion.div>

              <motion.div variants={fade} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-4">
                <div className="text-[14px] font-medium text-[#0A0A0A] mb-1.5">Preferences</div>
                <p className="text-[13px] text-[#9CA3AF] mb-4 leading-relaxed">
                  Retake the setup quiz to repersonalize your dashboard.
                </p>
                <button
                  onClick={() => setLocalDone(false)}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#0066FF] border border-[#E5E7EB] px-4 py-2.5 rounded-xl hover:bg-[#F9FAFB] transition-colors bg-white cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Redo setup quiz
                </button>
              </motion.div>

              <motion.div variants={fade} className="bg-white rounded-2xl border border-[#FEE2E2] p-6">
                <div className="text-[14px] font-medium text-[#E54D2E] mb-1.5">Danger zone</div>
                <p className="text-[13px] text-[#9CA3AF] mb-4">Sign out of your account on this device.</p>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#E54D2E] border border-[#FCA5A5] px-4 py-2.5 rounded-xl bg-[#FFF5F5] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign out
                </button>
              </motion.div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  )
}
