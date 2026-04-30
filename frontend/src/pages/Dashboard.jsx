import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { AGENTS } from '@/lib/site-data'
import Onboarding from '@/components/Onboarding'
import {
  LayoutDashboard, Zap, Settings, LogOut, ChevronRight,
  Lock, ArrowRight, Bell, TrendingUp, BarChart3, Users,
  ShoppingCart, Star, HeadphonesIcon, LineChart,
  Sparkles, AlertCircle, Clock, Menu, X
} from 'lucide-react'

const PLAN_AGENTS = {
  starter: ['Kai', 'Remy', 'Echo'],
  growth:  ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
  scale:   ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
}

const AGENT_CONFIG = {
  Kai:   { color: '#2563EB', light: '#EFF6FF', border: '#BFDBFE', icon: Sparkles,       shadow: '0 8px 32px rgba(37,99,235,0.15)' },
  Atlas: { color: '#7C3AED', light: '#F5F3FF', border: '#DDD6FE', icon: Users,          shadow: '0 8px 32px rgba(124,58,237,0.15)' },
  Nova:  { color: '#DB2777', light: '#FDF2F8', border: '#FBCFE8', icon: HeadphonesIcon, shadow: '0 8px 32px rgba(219,39,119,0.15)' },
  Remy:  { color: '#059669', light: '#ECFDF5', border: '#A7F3D0', icon: ShoppingCart,   shadow: '0 8px 32px rgba(5,150,105,0.15)'  },
  Echo:  { color: '#D97706', light: '#FFFBEB', border: '#FDE68A', icon: Star,           shadow: '0 8px 32px rgba(217,119,6,0.15)'  },
  Sage:  { color: '#0891B2', light: '#ECFEFF', border: '#A5F3FC', icon: HeadphonesIcon, shadow: '0 8px 32px rgba(8,145,178,0.15)'  },
  Pulse: { color: '#EA580C', light: '#FFF7ED', border: '#FED7AA', icon: LineChart,      shadow: '0 8px 32px rgba(234,88,12,0.15)'  },
}

const MOCK_STATS = {
  Kai:   { label: 'Ads created',       value: '12',  unit: 'this month', trend: '+4 this week',     pct: 72 },
  Atlas: { label: 'Leads found',       value: '847', unit: 'this month', trend: '+124 this week',    pct: 85 },
  Nova:  { label: 'DMs handled',       value: '234', unit: 'this month', trend: '+38 this week',     pct: 61 },
  Remy:  { label: 'Carts recovered',   value: '18',  unit: 'this month', trend: '$4,320 revenue',    pct: 45 },
  Echo:  { label: 'Reviews collected', value: '64',  unit: 'this month', trend: '+12 this week',     pct: 53 },
  Sage:  { label: 'Tickets resolved',  value: '312', unit: 'this month', trend: '80% auto-resolved', pct: 80 },
  Pulse: { label: 'Reports sent',      value: '4',   unit: 'this month', trend: 'Next: Monday 9AM',  pct: 40 },
}

function getPersonalizedMessage(answers) {
  if (!answers) return { headline: "Here's what your agents are doing today", sub: null }
  const map = {
    leads:     { headline: "Let's fill your pipeline.",           sub: "Atlas and Nova are your best bets." },
    ads:       { headline: "Let's 10x your ad output.",           sub: "Kai is ready to create Meta ads on autopilot." },
    retention: { headline: "Let's stop the leaks.",               sub: "Remy recovers 22% of abandoned carts within 30 minutes." },
    support:   { headline: "Let's free up your team.",            sub: "Sage resolves 80% of tickets without a human." },
    data:      { headline: "Let's get you clarity.",              sub: "Pulse sends you a Monday morning report every week." },
    all:       { headline: "Let's fix everything, one by one.",   sub: "We'll start with your top priority and scale from there." },
  }
  return map[answers.biggest_challenge] || { headline: "Here's what your agents are doing today", sub: null }
}

function AgentCard({ agent, isUnlocked, status, isPriority }) {
  const cfg = AGENT_CONFIG[agent.name]
  const stats = MOCK_STATS[agent.name]
  const Icon = cfg?.icon || Zap

  if (!isUnlocked) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 p-5 overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-3 mb-4 opacity-40">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">{agent.name}</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-gray-400">{agent.role}</p>
          </div>
        </div>
        <div className="h-px bg-gray-100 mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Upgrade to unlock</p>
          <Link to="/pricing" className="text-xs font-semibold flex items-center gap-1 text-blue-600">
            Upgrade <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl bg-white border overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${isPriority ? 'ring-2' : ''}`}
      style={{
        borderColor: cfg.border,
        boxShadow: isPriority ? cfg.shadow : '0 2px 12px rgba(0,0,0,0.06)',
        ...(isPriority ? { ringColor: cfg.color + '40' } : {}),
      }}>
      {isPriority && (
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}88)` }} />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{ backgroundColor: cfg.color }}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-gray-900">{agent.name}</h3>
                {isPriority && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: cfg.light, color: cfg.color }}>
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400">{agent.role}</p>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            status === 'active'  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            status === 'pending' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                   'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {status === 'active'  && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            {status === 'pending' && <Clock className="w-3 h-3" />}
            {status === 'setup'   && <AlertCircle className="w-3 h-3" />}
            {status === 'active' ? 'Active' : status === 'pending' ? 'Activating' : 'Setup required'}
          </div>
        </div>

        {status === 'active' && stats && (
          <div className="mb-4">
            <div className="rounded-xl p-3 mb-3" style={{ background: cfg.light }}>
              <p className="text-xs text-gray-500 mb-1">{stats.label}</p>
              <p className="text-2xl font-bold tracking-tight" style={{ color: cfg.color }}>{stats.value}</p>
              <p className="text-xs mt-0.5 text-gray-500">{stats.unit} · <span style={{ color: cfg.color }}>{stats.trend}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${stats.pct}%`, backgroundColor: cfg.color }} />
              </div>
              <span className="text-xs text-gray-400">{stats.pct}%</span>
            </div>
          </div>
        )}

        {status === 'setup' && (
          <div className="rounded-xl p-3 mb-4 bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-700">Complete setup to activate this agent</p>
          </div>
        )}

        <div className="h-px bg-gray-100 mb-3" />
        <Link to={`/dashboard/agent/${agent.name.toLowerCase()}`}
          className="flex items-center justify-between text-sm font-semibold transition-colors"
          style={{ color: cfg.color }}>
          {status === 'setup' ? 'Complete setup' : 'View details'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const meta = user?.user_metadata || {}
  const onboardingDone = meta.onboarding_complete || false
  const [localOnboardingDone, setLocalOnboardingDone] = useState(onboardingDone)
  const [localAnswers, setLocalAnswers] = useState(meta.onboarding_answers || null)
  const [localRecommended, setLocalRecommended] = useState(meta.recommended_agents || ['Kai', 'Remy', 'Echo', 'Atlas', 'Nova', 'Sage', 'Pulse'])

  const handleOnboardingComplete = ({ answers, recommendations }) => {
    setLocalAnswers(answers)
    setLocalRecommended(recommendations)
    setLocalOnboardingDone(true)
  }

  if (!localOnboardingDone) return <Onboarding onComplete={handleOnboardingComplete} />

  const currentPlan = 'starter'
  const unlockedAgents = PLAN_AGENTS[currentPlan]
  const agentStatuses = { Kai: 'active', Remy: 'setup', Echo: 'setup', Atlas: null, Nova: null, Sage: null, Pulse: null }

  const handleSignOut = async () => { await signOut(); navigate('/') }

  const userName = meta.full_name || user?.email?.split('@')[0] || 'there'
  const companyName = meta.company_name || 'My Company'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const personalMsg = getPersonalizedMessage(localAnswers)

  const sortedAgents = [...AGENTS].sort((a, b) => {
    const ai = localRecommended.indexOf(a.name)
    const bi = localRecommended.indexOf(b.name)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  const navItems = [
    { id: 'overview', label: 'Overview',  icon: LayoutDashboard },
    { id: 'agents',   label: 'My Agents', icon: Zap },
    { id: 'settings', label: 'Settings',  icon: Settings },
  ]

  const SidebarContent = () => (
    <>
      {/* Logo / Company name */}
      <div className="p-6 border-b border-gray-100">
        <Link to="/" onClick={() => setMobileSidebarOpen(false)}
          className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
            <span className="text-white font-bold text-[13px] tracking-tighter">SA</span>
            <span className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-gray-900">{companyName}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setActiveTab(id); setMobileSidebarOpen(false) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* Plan badge + user + signout */}
      <div className="p-4 border-t border-gray-100">
        {/* Plan */}
        <div className="rounded-xl p-4 mb-4 border border-blue-100"
          style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{currentPlan} plan</span>
            <Link to="/pricing" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Upgrade</Link>
          </div>
          <p className="text-sm font-bold text-gray-900 mb-2">{unlockedAgents.length} of 7 agents</p>
          <div className="h-1.5 rounded-full bg-blue-100 overflow-hidden">
            <div className="h-full rounded-full"
              style={{ width: `${(unlockedAgents.length / 7) * 100}%`, background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }} />
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-1 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Sign out — below Contact style */}
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#F5F5F7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed h-full border-r border-gray-200/80 bg-white/80"
        style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col border-r border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-gray-900">Menu</span>
              <button onClick={() => setMobileSidebarOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 border-b border-gray-200/60 bg-white/70"
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
              <Menu className="w-5 h-5" />
            </button>
            {/* Company name as clickable link instead of "overview" */}
            <Link to="/" className="font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors">
              {companyName}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Welcome */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {greeting}, {userName.split(' ')[0]} 👋
                </h2>
                <p className="text-gray-500 mt-1">{personalMsg.headline}</p>
                {personalMsg.sub && (
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-blue-200 bg-blue-50">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <p className="text-sm text-blue-700 font-medium">{personalMsg.sub}</p>
                  </div>
                )}
              </div>

              {/* Stats — Apple-style frosted cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: TrendingUp, label: 'Active agents',   value: '1',       sub: '2 pending setup', color: '#2563EB', light: '#EFF6FF' },
                  { icon: Zap,        label: 'Tasks completed', value: '12',      sub: 'This month',      color: '#059669', light: '#ECFDF5' },
                  { icon: BarChart3,  label: 'Current plan',    value: 'Starter', isLink: true,           color: '#7C3AED', light: '#F5F3FF' },
                ].map(({ icon: Icon, label, value, sub, color, light, isLink }) => (
                  <div key={label} className="rounded-2xl bg-white p-6 border border-gray-100 relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                    {/* 3D shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(circle at 30% 20%, ${color}08, transparent 60%)` }} />
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: light }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">{label}</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 tracking-tight capitalize">{value}</p>
                    {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
                    {isLink && (
                      <Link to="/pricing" className="text-sm font-semibold mt-1 inline-block" style={{ color }}>Upgrade →</Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Priority agent banner */}
              {localRecommended[0] && AGENT_CONFIG[localRecommended[0]] && (
                <div className="rounded-2xl bg-white border p-6 mb-8 flex items-center justify-between gap-4"
                  style={{
                    borderColor: AGENT_CONFIG[localRecommended[0]].border,
                    boxShadow: AGENT_CONFIG[localRecommended[0]].shadow,
                    background: `linear-gradient(135deg, ${AGENT_CONFIG[localRecommended[0]].light}, white)`,
                  }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg"
                      style={{ background: AGENT_CONFIG[localRecommended[0]].color }}>
                      {localRecommended[0][0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Start here — recommended for you</p>
                      <p className="text-gray-900 font-bold text-lg">{localRecommended[0]} is your #1 priority agent</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {AGENTS.find(a => a.name === localRecommended[0])?.desc}
                      </p>
                    </div>
                  </div>
                  <Link to={`/dashboard/agent/${localRecommended[0].toLowerCase()}`}
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: AGENT_CONFIG[localRecommended[0]].color }}>
                    Set up <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Agents */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900">Your agents</h3>
                <button onClick={() => setActiveTab('agents')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedAgents.map((agent, i) => (
                  <AgentCard key={agent.name} agent={agent}
                    isUnlocked={unlockedAgents.includes(agent.name)}
                    status={agentStatuses[agent.name]}
                    isPriority={i === 0 && unlockedAgents.includes(agent.name)} />
                ))}
              </div>
            </>
          )}

          {/* AGENTS */}
          {activeTab === 'agents' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">My Agents</h2>
                <p className="text-gray-500 mt-1">Sorted by your goals · {unlockedAgents.length} active · {7 - unlockedAgents.length} locked</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedAgents.map((agent, i) => (
                  <AgentCard key={agent.name} agent={agent}
                    isUnlocked={unlockedAgents.includes(agent.name)}
                    status={agentStatuses[agent.name]}
                    isPriority={i === 0 && unlockedAgents.includes(agent.name)} />
                ))}
              </div>
            </>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h2>
                <p className="text-gray-500 mt-1">Manage your account and preferences</p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-5 mb-4"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-gray-900">Account</h3>
                {[
                  { label: 'Full name',    value: userName,    type: 'text',  disabled: false },
                  { label: 'Company name', value: companyName, type: 'text',  disabled: false },
                  { label: 'Email',        value: user?.email, type: 'email', disabled: true  },
                ].map(({ label, value, type, disabled }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
                    <input type={type} defaultValue={value} disabled={disabled}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        background: disabled ? '#F9FAFB' : 'white',
                        borderColor: disabled ? '#E5E7EB' : '#D1D5DB',
                        color: disabled ? '#9CA3AF' : '#111827',
                      }} />
                  </div>
                ))}
                <button className="px-6 py-3 rounded-xl text-sm font-bold text-white w-fit hover:shadow-md transition-all"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                  Save changes
                </button>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6 mb-4"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-gray-900 mb-1">Preferences</h3>
                <p className="text-sm text-gray-500 mb-4">Retake the setup quiz to repersonalize your dashboard.</p>
                <button onClick={() => setLocalOnboardingDone(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all">
                  <Sparkles className="w-4 h-4" /> Redo setup quiz
                </button>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6 mb-4"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-gray-900 mb-1">Subscription</h3>
                <p className="text-sm text-gray-500 mb-4">You're on the <span className="font-semibold text-gray-900 capitalize">{currentPlan}</span> plan.</p>
                <Link to="/pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:shadow-md transition-all"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                  Manage subscription <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white border border-red-100 p-6"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 className="font-bold text-red-500 mb-1">Danger zone</h3>
                <p className="text-sm text-gray-400 mb-4">Sign out of your account on this device.</p>
                <button onClick={handleSignOut}
                  className="inline-flex items-center gap-2 border-2 border-red-200 text-red-500 py-2.5 px-5 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
