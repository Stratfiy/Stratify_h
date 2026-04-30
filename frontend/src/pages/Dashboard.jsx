import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { AGENTS } from '@/lib/site-data'
import {
  LayoutDashboard, Settings, LogOut, ChevronRight,
  Zap, Lock, ArrowRight, Bell, User, TrendingUp,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react'

const PLAN_AGENTS = {
  starter: ['Kai', 'Remy', 'Echo'],
  growth: ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
  scale: ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse'],
}

const AGENT_COLORS = {
  Kai: '#0066FF', Atlas: '#8B5CF6', Nova: '#EC4899',
  Remy: '#00D4AA', Echo: '#F59E0B', Sage: '#10B981', Pulse: '#F97316'
}

const MOCK_STATS = {
  Kai: { label: 'Ads created', value: '12', unit: 'this month', trend: '+4 this week' },
  Atlas: { label: 'Leads found', value: '847', unit: 'this month', trend: '+124 this week' },
  Nova: { label: 'DMs handled', value: '234', unit: 'this month', trend: '+38 this week' },
  Remy: { label: 'Carts recovered', value: '18', unit: 'this month', trend: '$4,320 revenue' },
  Echo: { label: 'Reviews collected', value: '64', unit: 'this month', trend: '+12 this week' },
  Sage: { label: 'Tickets resolved', value: '312', unit: 'this month', trend: '80% auto-resolved' },
  Pulse: { label: 'Reports sent', value: '4', unit: 'this month', trend: 'Next: Monday 9AM' },
}

function AgentCard({ agent, isUnlocked, status }) {
  const color = AGENT_COLORS[agent.name]
  const stats = MOCK_STATS[agent.name]

  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isUnlocked
        ? 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm'
        : 'border-[#F3F4F6] bg-[#FAFAFA]'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: isUnlocked ? color : '#E5E7EB' }}
          >
            {isUnlocked ? agent.initial : <Lock className="w-4 h-4 text-[#9CA3AF]" />}
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${isUnlocked ? 'text-[#0A0A0A]' : 'text-[#9CA3AF]'}`}>
              {agent.name}
            </h3>
            <p className={`text-xs font-mono uppercase tracking-wider ${isUnlocked ? 'text-[#6B7280]' : 'text-[#D1D5DB]'}`}>
              {agent.role}
            </p>
          </div>
        </div>

        {isUnlocked && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            status === 'active'
              ? 'bg-green-50 text-green-700'
              : status === 'pending'
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}>
            {status === 'active' && <CheckCircle className="w-3 h-3" />}
            {status === 'pending' && <Clock className="w-3 h-3" />}
            {status === 'setup' && <AlertCircle className="w-3 h-3" />}
            {status === 'active' ? 'Active' : status === 'pending' ? 'Activating' : 'Setup required'}
          </div>
        )}
      </div>

      {isUnlocked && status === 'active' && stats && (
        <div className="bg-[#F9FAFB] rounded-xl p-3 mb-4">
          <p className="text-[#6B7280] text-xs mb-1">{stats.label}</p>
          <p className="text-2xl font-semibold tracking-tight text-[#0A0A0A]">{stats.value}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{stats.unit} · {stats.trend}</p>
        </div>
      )}

      {isUnlocked && status === 'setup' && (
        <div className="bg-yellow-50 rounded-xl p-3 mb-4 text-xs text-yellow-700">
          Complete setup to activate this agent
        </div>
      )}

      {isUnlocked && status === 'pending' && (
        <div className="bg-blue-50 rounded-xl p-3 mb-4 text-xs text-blue-700">
          Your agent is being configured. We'll notify you when it's ready.
        </div>
      )}

      {isUnlocked ? (
        <Link
          to={`/dashboard/agent/${agent.name.toLowerCase()}`}
          className="flex items-center justify-between text-sm text-[#0066FF] hover:text-[#0052CC] font-medium"
        >
          {status === 'setup' ? 'Complete setup' : 'View details'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#9CA3AF]">Upgrade to unlock</p>
          <Link to="/pricing" className="text-xs text-[#0066FF] hover:underline font-medium flex items-center gap-1">
            Upgrade <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock plan — will come from Stripe/DB later
  const currentPlan = 'starter'
  const unlockedAgents = PLAN_AGENTS[currentPlan]

  const agentStatuses = {
    Kai: 'active', Remy: 'setup', Echo: 'setup',
    Atlas: null, Nova: null, Sage: null, Pulse: null
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there'
  const companyName = user?.user_metadata?.company_name || 'Your Company'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E5E7EB] flex-col fixed h-full">
        <div className="p-6 border-b border-[#E5E7EB]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
              <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight">StratifyAI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
              activeTab === 'overview'
                ? 'bg-[#0A0A0A] text-white'
                : 'text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
              activeTab === 'agents'
                ? 'bg-[#0A0A0A] text-white'
                : 'text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]'
            }`}
          >
            <Zap className="w-4 h-4" /> My Agents
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
              activeTab === 'settings'
                ? 'bg-[#0A0A0A] text-white'
                : 'text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]'
            }`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        {/* Plan badge */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="bg-[#F9FAFB] rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                {currentPlan} plan
              </span>
              <Link to="/pricing" className="text-xs text-[#0066FF] hover:underline">Upgrade</Link>
            </div>
            <p className="text-sm font-semibold text-[#0A0A0A]">
              {unlockedAgents.length} of 7 agents
            </p>
            <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0066FF] rounded-full"
                style={{ width: `${(unlockedAgents.length / 7) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0A0A0A] truncate">{userName}</p>
              <p className="text-xs text-[#9CA3AF] truncate">{companyName}</p>
            </div>
            <button onClick={handleSignOut} className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#0A0A0A]">
              Good morning, {userName.split(' ')[0]} 👋
            </h1>
            <p className="text-[#6B7280] text-sm mt-0.5">
              Here's what your agents are doing today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#D1D5DB] transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
          </div>
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#0066FF]" />
                  <span className="text-sm text-[#6B7280]">Active agents</span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">1</p>
                <p className="text-xs text-[#9CA3AF] mt-1">2 pending setup</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#00D4AA]" />
                  <span className="text-sm text-[#6B7280]">Tasks completed</span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">12</p>
                <p className="text-xs text-[#9CA3AF] mt-1">This month</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm text-[#6B7280]">Current plan</span>
                </div>
                <p className="text-3xl font-semibold tracking-tight capitalize">{currentPlan}</p>
                <Link to="/pricing" className="text-xs text-[#0066FF] hover:underline mt-1 inline-block">
                  Upgrade →
                </Link>
              </div>
            </div>

            {/* Setup checklist */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-8">
              <h2 className="font-semibold text-[#0A0A0A] mb-1">Get started</h2>
              <p className="text-sm text-[#6B7280] mb-4">Complete these steps to activate your agents</p>
              <div className="flex flex-col gap-3">
                {[
                  { done: true, label: 'Create your account', desc: 'You\'re in!' },
                  { done: false, label: 'Complete Kai setup', desc: 'Connect your Meta Ads account', link: '/dashboard/agent/kai' },
                  { done: false, label: 'Complete Remy setup', desc: 'Connect your Shopify store', link: '/dashboard/agent/remy' },
                  { done: false, label: 'Upgrade to Growth', desc: 'Unlock all 7 agents', link: '/pricing' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.done ? 'bg-[#10B981]' : 'border-2 border-[#E5E7EB]'
                    }`}>
                      {step.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${step.done ? 'text-[#9CA3AF] line-through' : 'text-[#0A0A0A]'}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">{step.desc}</p>
                    </div>
                    {step.link && !step.done && (
                      <Link to={step.link} className="text-xs text-[#0066FF] hover:underline font-medium flex items-center gap-1">
                        Start <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Agent grid */}
            <h2 className="font-semibold text-[#0A0A0A] mb-4">Your agents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {AGENTS.map((agent) => (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                  isUnlocked={unlockedAgents.includes(agent.name)}
                  status={agentStatuses[agent.name]}
                />
              ))}
            </div>
          </>
        )}

        {/* Agents tab */}
        {activeTab === 'agents' && (
          <>
            <h2 className="font-semibold text-[#0A0A0A] mb-6">My Agents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {AGENTS.map((agent) => (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                  isUnlocked={unlockedAgents.includes(agent.name)}
                  status={agentStatuses[agent.name]}
                />
              ))}
            </div>
          </>
        )}

        {/* Settings tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="font-semibold text-[#0A0A0A] mb-6">Account Settings</h2>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Full name</label>
                <input
                  type="text"
                  defaultValue={userName}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Company name</label>
                <input
                  type="text"
                  defaultValue={companyName}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#0A0A0A] text-sm outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#9CA3AF] text-sm bg-[#F9FAFB]"
                />
              </div>
              <button className="bg-[#0A0A0A] text-white py-3 px-6 rounded-xl font-medium text-sm hover:bg-[#1a1a1a] transition-colors w-fit">
                Save changes
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mt-4">
              <h3 className="font-semibold text-[#0A0A0A] mb-1">Subscription</h3>
              <p className="text-sm text-[#6B7280] mb-4">
                You're on the <strong className="capitalize">{currentPlan}</strong> plan.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-[#0066FF] text-white py-2.5 px-5 rounded-xl font-medium text-sm hover:bg-[#0052CC] transition-colors"
              >
                Manage subscription <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-red-100 p-6 mt-4">
              <h3 className="font-semibold text-red-600 mb-1">Danger zone</h3>
              <p className="text-sm text-[#6B7280] mb-4">
                Sign out of your account on this device.
              </p>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 py-2.5 px-5 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function Check({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
