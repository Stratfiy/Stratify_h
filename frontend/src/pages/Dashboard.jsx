import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { AGENTS } from '@/lib/site-data'
import Onboarding from '@/components/Onboarding'
import {
  LayoutDashboard, Zap, Settings, LogOut, ChevronRight,
  Lock, ArrowRight, Bell, TrendingUp, BarChart3, Users,
  ShoppingCart, Star, HeadphonesIcon, LineChart,
  Sparkles, AlertCircle, Clock, Menu
} from 'lucide-react'

const PLAN_AGENTS = {
  starter: ['Kai', 'Remy', 'Echo'],
  growth:  ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
  scale:   ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
}

const AGENT_CONFIG = {
  Kai:   { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)',  icon: Sparkles,       glow: '0 0 24px rgba(59,130,246,0.3)' },
  Atlas: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)',  icon: Users,          glow: '0 0 24px rgba(139,92,246,0.3)' },
  Nova:  { color: '#EC4899', bg: 'rgba(236,72,153,0.12)',  icon: HeadphonesIcon, glow: '0 0 24px rgba(236,72,153,0.3)' },
  Remy:  { color: '#10B981', bg: 'rgba(16,185,129,0.12)',  icon: ShoppingCart,   glow: '0 0 24px rgba(16,185,129,0.3)' },
  Echo:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  icon: Star,           glow: '0 0 24px rgba(245,158,11,0.3)' },
  Sage:  { color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',   icon: HeadphonesIcon, glow: '0 0 24px rgba(6,182,212,0.3)'  },
  Pulse: { color: '#F97316', bg: 'rgba(249,115,22,0.12)',  icon: LineChart,      glow: '0 0 24px rgba(249,115,22,0.3)' },
}

const MOCK_STATS = {
  Kai:   { label: 'Ads created',       value: '12',  unit: 'this month', trend: '+4 this week',      pct: 72 },
  Atlas: { label: 'Leads found',       value: '847', unit: 'this month', trend: '+124 this week',     pct: 85 },
  Nova:  { label: 'DMs handled',       value: '234', unit: 'this month', trend: '+38 this week',      pct: 61 },
  Remy:  { label: 'Carts recovered',   value: '18',  unit: 'this month', trend: '$4,320 revenue',     pct: 45 },
  Echo:  { label: 'Reviews collected', value: '64',  unit: 'this month', trend: '+12 this week',      pct: 53 },
  Sage:  { label: 'Tickets resolved',  value: '312', unit: 'this month', trend: '80% auto-resolved',  pct: 80 },
  Pulse: { label: 'Reports sent',      value: '4',   unit: 'this month', trend: 'Next: Monday 9AM',   pct: 40 },
}

// Personalized welcome messages based on onboarding answers
function getPersonalizedMessage(answers) {
  if (!answers) return { headline: "Here's what your agents are doing today", sub: null }
  const challengeMap = {
    leads:     { headline: "Let's fill your pipeline.", sub: "Atlas and Nova are your best bets. Start with Atlas to find leads." },
    ads:       { headline: "Let's 10x your ad output.", sub: "Kai is ready to create Meta ads on autopilot." },
    retention: { headline: "Let's stop the leaks.", sub: "Remy recovers 22% of abandoned carts within 30 minutes." },
    support:   { headline: "Let's free up your team.", sub: "Sage resolves 80% of tickets without a human." },
    data:      { headline: "Let's get you clarity.", sub: "Pulse sends you a Monday morning report every week." },
    all:       { headline: "Let's fix everything, one agent at a time.", sub: "We'll start with your top priority and scale from there." },
  }
  return challengeMap[answers.biggest_challenge] || { headline: "Here's what your agents are doing today", sub: null }
}

function AgentCard({ agent, isUnlocked, status, isPriority }) {
  const cfg = AGENT_CONFIG[agent.name]
  const stats = MOCK_STATS[agent.name]
  const Icon = cfg?.icon || Zap

  if (!isUnlocked) {
    return (
      <div className="relative rounded-2xl border border-white/5 bg-white/[0.03] p-5 overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Lock className="w-4 h-4 text-white/20" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white/25">{agent.name}</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-white/15">{agent.role}</p>
          </div>
        </div>
        <div className="h-px bg-white/5 mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/20">Upgrade to unlock</p>
          <Link to="/pricing" className="text-xs font-medium flex items-center gap-1 text-blue-400">
            Upgrade <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative rounded-2xl border overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 ${isPriority ? 'ring-1' : ''}`}
      style={{
        borderColor: cfg.color + '30',
        background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(255,255,255,0.02) 100%)`,
        ...(isPriority ? { ringColor: cfg.color + '50' } : {}),
      }}>
      {isPriority && (
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }} />
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${cfg.color}10` }} />

      <div className="p-5 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: cfg.color, boxShadow: cfg.glow }}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">{agent.name}</h3>
                {isPriority && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: cfg.color + '20', color: cfg.color }}>
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-white/40">{agent.role}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            status === 'active'  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            status === 'pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                   'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            {status === 'active'  && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            {status === 'pending' && <Clock className="w-3 h-3" />}
            {status === 'setup'   && <AlertCircle className="w-3 h-3" />}
            {status === 'active' ? 'Active' : status === 'pending' ? 'Activating' : 'Setup required'}
          </div>
        </div>

        {status === 'active' && stats && (
          <div className="mb-4">
            <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-white/40 text-xs mb-1">{stats.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{stats.value}</p>
              <p className="text-xs mt-0.5" style={{ color: cfg.color }}>{stats.unit} · {stats.trend}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, backgroundColor: cfg.color }} />
              </div>
              <span className="text-xs text-white/30">{stats.pct}%</span>
            </div>
          </div>
        )}

        {status === 'setup' && (
          <div className="rounded-xl p-3 mb-4 bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-400">Complete setup to activate this agent</p>
          </div>
        )}

        <div className="h-px bg-white/5 mb-3" />
        <Link to={`/dashboard/agent/${agent.name.toLowerCase()}`}
          className="flex items-center justify-between text-sm font-medium transition-colors"
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

  // Check onboarding status
  const meta = user?.user_metadata || {}
  const onboardingDone = meta.onboarding_complete || false
  const onboardingAnswers = meta.onboarding_answers || null
  const recommendedAgents = meta.recommended_agents || ['Kai', 'Atlas', 'Remy', 'Nova', 'Echo', 'Sage', 'Pulse']

  const [localOnboardingDone, setLocalOnboardingDone] = useState(onboardingDone)
  const [localAnswers, setLocalAnswers] = useState(onboardingAnswers)
  const [localRecommended, setLocalRecommended] = useState(recommendedAgents)

  const handleOnboardingComplete = ({ answers, recommendations }) => {
    setLocalAnswers(answers)
    setLocalRecommended(recommendations)
    setLocalOnboardingDone(true)
  }

  // Show onboarding for new users
  if (!localOnboardingDone) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  const currentPlan = 'starter'
  const unlockedAgents = PLAN_AGENTS[currentPlan]
  const agentStatuses = {
    Kai: 'active', Remy: 'setup', Echo: 'setup',
    Atlas: null, Nova: null, Sage: null, Pulse: null
  }

  const handleSignOut = async () => { await signOut(); navigate('/') }

  const userName = meta.full_name || user?.email?.split('@')[0] || 'there'
  const companyName = meta.company_name || 'Your Company'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const personalMsg = getPersonalizedMessage(localAnswers)

  // Sort agents by recommendation
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
      <div className="p-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            <span className="text-white font-mono text-[13px] font-bold tracking-tighter">SA</span>
            <span className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#0D0D12]" />
          </div>
          <span className="font-bold text-[17px] tracking-tight text-white">StratifyAI</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setActiveTab(id); setMobileSidebarOpen(false) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left ${
              activeTab === id ? 'text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
            style={activeTab === id ? {
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.1))',
              boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.2)'
            } : {}}>
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="rounded-xl p-4 mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-white/40">{currentPlan} plan</span>
            <Link to="/pricing" className="text-xs font-medium text-blue-400 hover:text-blue-300">Upgrade</Link>
          </div>
          <p className="text-sm font-semibold text-white mb-2">{unlockedAgents.length} of 7 agents</p>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full"
              style={{ width: `${(unlockedAgents.length / 7) * 100}%`, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-white/30 truncate">{companyName}</p>
          </div>
          <button onClick={handleSignOut}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#0D0D12' }}>
      <aside className="hidden lg:flex w-64 flex-col fixed h-full border-r border-white/5"
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <SidebarContent />
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col border-r border-white/5"
            style={{ background: '#0D0D12' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 border-b border-white/5"
          style={{ background: 'rgba(13,13,18,0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-white capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 border border-white/5 transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <Link to="/" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 border border-white/5 transition-all">
              ← Back to site
            </Link>
            <button onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 border border-red-500/10 transition-all">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-8">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {greeting}, {userName.split(' ')[0]} 👋
                </h2>
                <p className="text-white/50 text-sm mt-1">{personalMsg.headline}</p>
                {personalMsg.sub && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <p className="text-xs text-blue-300">{personalMsg.sub}</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: TrendingUp, label: 'Active agents',   value: '1',       sub: '2 pending setup', color: '#3B82F6' },
                  { icon: Zap,        label: 'Tasks completed', value: '12',      sub: 'This month',      color: '#10B981' },
                  { icon: BarChart3,  label: 'Current plan',    value: 'Starter', isLink: true,           color: '#8B5CF6' },
                ].map(({ icon: Icon, label, value, sub, color, isLink }) => (
                  <div key={label} className="rounded-2xl border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"
                      style={{ background: color, transform: 'translate(30%, -30%)' }} />
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color + '20' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <span className="text-sm text-white/40">{label}</span>
                    </div>
                    <p className="text-3xl font-bold text-white tracking-tight capitalize">{value}</p>
                    {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
                    {isLink && <Link to="/pricing" className="text-xs mt-1 inline-block" style={{ color }}>Upgrade →</Link>}
                  </div>
                ))}
              </div>

              {/* Recommended first agent banner */}
              {localRecommended[0] && (
                <div className="rounded-2xl border p-5 mb-8 flex items-center justify-between gap-4"
                  style={{
                    background: `linear-gradient(135deg, ${AGENT_CONFIG[localRecommended[0]]?.color}15, rgba(255,255,255,0.02))`,
                    borderColor: AGENT_CONFIG[localRecommended[0]]?.color + '30',
                  }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{
                        background: AGENT_CONFIG[localRecommended[0]]?.color,
                        boxShadow: AGENT_CONFIG[localRecommended[0]]?.glow,
                      }}>
                      {localRecommended[0][0]}
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Start here — recommended for you</p>
                      <p className="text-white font-semibold">{localRecommended[0]} is your #1 priority agent</p>
                      <p className="text-sm text-white/40 mt-0.5">
                        {AGENTS.find(a => a.name === localRecommended[0])?.desc}
                      </p>
                    </div>
                  </div>
                  <Link to={`/dashboard/agent/${localRecommended[0].toLowerCase()}`}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-80"
                    style={{ background: AGENT_CONFIG[localRecommended[0]]?.color }}>
                    Set up <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Agents grid — sorted by recommendation */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Your agents</h3>
                <button onClick={() => setActiveTab('agents')} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
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

          {/* AGENTS TAB */}
          {activeTab === 'agents' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">My Agents</h2>
                <p className="text-white/40 text-sm mt-1">Sorted by your goals · {unlockedAgents.length} active · {7 - unlockedAgents.length} locked</p>
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

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
                <p className="text-white/40 text-sm mt-1">Manage your account and preferences</p>
              </div>

              <div className="rounded-2xl border border-white/5 p-6 flex flex-col gap-5 mb-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-white text-sm">Account</h3>
                {[
                  { label: 'Full name',    value: userName,    type: 'text',  disabled: false },
                  { label: 'Company name', value: companyName, type: 'text',  disabled: false },
                  { label: 'Email',        value: user?.email, type: 'email', disabled: true  },
                ].map(({ label, value, type, disabled }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">{label}</label>
                    <input type={type} defaultValue={value} disabled={disabled}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: disabled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)',
                      }} />
                  </div>
                ))}
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white w-fit hover:opacity-80 transition-all"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                  Save changes
                </button>
              </div>

              {/* Redo onboarding */}
              <div className="rounded-2xl border border-white/5 p-6 mb-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-white text-sm mb-1">Your preferences</h3>
                <p className="text-sm text-white/40 mb-4">Retake the setup quiz to repersonalize your dashboard.</p>
                <button onClick={() => setLocalOnboardingDone(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                  <Sparkles className="w-4 h-4" /> Redo setup quiz
                </button>
              </div>

              <div className="rounded-2xl border border-white/5 p-6 mb-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-white text-sm mb-1">Subscription</h3>
                <p className="text-sm text-white/40 mb-4">You're on the <span className="text-white capitalize">{currentPlan}</span> plan.</p>
                <Link to="/pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-80 transition-all"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                  Manage subscription <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-2xl border border-red-500/10 p-6"
                style={{ background: 'rgba(239,68,68,0.03)' }}>
                <h3 className="font-semibold text-red-400 text-sm mb-1">Danger zone</h3>
                <p className="text-sm text-white/30 mb-4">Sign out of your account on this device.</p>
                <button onClick={handleSignOut}
                  className="inline-flex items-center gap-2 border border-red-500/20 text-red-400 py-2.5 px-5 rounded-xl font-medium text-sm hover:bg-red-500/10 transition-colors">
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
