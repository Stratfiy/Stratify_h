import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    id: 'business_type',
    question: "What kind of business are you running?",
    subtitle: "We'll set up the right agents for your industry.",
    type: 'single',
    options: [
      { value: 'ecommerce',   label: 'E-commerce store',      icon: '🛍️', desc: 'Shopify, WooCommerce, DTC' },
      { value: 'saas',        label: 'SaaS / Software',       icon: '💻', desc: 'B2B or B2C software product' },
      { value: 'agency',      label: 'Agency / Freelance',    icon: '🎯', desc: 'Marketing, design, consulting' },
      { value: 'healthcare',  label: 'Healthcare / Clinic',   icon: '🏥', desc: 'Medical practice, wellness' },
      { value: 'local',       label: 'Local Business',        icon: '📍', desc: 'Restaurant, retail, services' },
      { value: 'other',       label: 'Something else',        icon: '✨', desc: 'Tell us after setup' },
    ],
  },
  {
    id: 'biggest_challenge',
    question: "What's your biggest challenge right now?",
    subtitle: "Pick the one that keeps you up at night.",
    type: 'single',
    options: [
      { value: 'leads',       label: 'Not enough leads',      icon: '📉', desc: 'Pipeline is dry' },
      { value: 'ads',         label: 'Ad creatives are slow', icon: '🎬', desc: 'Takes too long to produce content' },
      { value: 'retention',   label: 'Losing customers',      icon: '🔄', desc: 'Churn and abandoned carts' },
      { value: 'support',     label: 'Support is overwhelming', icon: '😓', desc: 'Too many tickets, not enough time' },
      { value: 'data',        label: "Can't see what's working", icon: '📊', desc: 'No clear analytics or reporting' },
      { value: 'all',         label: 'Honestly, all of it',   icon: '🤯', desc: 'Everything needs help' },
    ],
  },
  {
    id: 'tools',
    question: "Which tools are you currently using?",
    subtitle: "Select all that apply — we'll connect your agents to these.",
    type: 'multi',
    options: [
      { value: 'meta_ads',    label: 'Meta Ads',      icon: '📘' },
      { value: 'shopify',     label: 'Shopify',       icon: '🟢' },
      { value: 'whatsapp',    label: 'WhatsApp',      icon: '💬' },
      { value: 'instagram',   label: 'Instagram',     icon: '📸' },
      { value: 'hubspot',     label: 'HubSpot',       icon: '🧡' },
      { value: 'gmail',       label: 'Gmail',         icon: '📧' },
      { value: 'slack',       label: 'Slack',         icon: '💜' },
      { value: 'none',        label: 'None yet',      icon: '🚀' },
    ],
  },
  {
    id: 'revenue',
    question: "Where is your business right now?",
    subtitle: "This helps us calibrate your agent goals.",
    type: 'single',
    options: [
      { value: 'pre',         label: 'Pre-revenue',           icon: '🌱', desc: 'Just getting started' },
      { value: '0_10k',       label: '$0 – $10K / mo',        icon: '📈', desc: 'Early traction' },
      { value: '10_50k',      label: '$10K – $50K / mo',      icon: '🚀', desc: 'Growing fast' },
      { value: '50_200k',     label: '$50K – $200K / mo',     icon: '💰', desc: 'Scaling up' },
      { value: '200k_plus',   label: '$200K+ / mo',           icon: '🏆', desc: 'High-growth stage' },
    ],
  },
  {
    id: 'first_agent',
    question: "Which agent do you want to activate first?",
    subtitle: "We'll prioritize this one in your setup.",
    type: 'single',
    options: [
      { value: 'kai',   label: 'Kai — Ad Creatives',    icon: '🎬', desc: 'Generate hooks & Meta ads automatically' },
      { value: 'atlas', label: 'Atlas — Lead Gen',      icon: '🎯', desc: 'Find and reach your ideal customers' },
      { value: 'remy',  label: 'Remy — Cart Recovery',  icon: '🛒', desc: 'Recover 22% of abandoned carts' },
      { value: 'nova',  label: 'Nova — Inbound DMs',    icon: '💬', desc: 'Handle DMs and book meetings' },
      { value: 'sage',  label: 'Sage — Support',        icon: '🎧', desc: 'Resolve 80% of tickets automatically' },
    ],
  },
]

// Maps answers to recommended agent order
function buildRecommendations(answers) {
  const agents = ['Kai', 'Atlas', 'Nova', 'Remy', 'Echo', 'Sage', 'Pulse']
  const score = { Kai: 0, Atlas: 0, Nova: 0, Remy: 0, Echo: 0, Sage: 0, Pulse: 0 }

  // By challenge
  const challengeMap = {
    leads: { Atlas: 3, Nova: 2 },
    ads: { Kai: 3, Echo: 2 },
    retention: { Remy: 3, Echo: 2, Nova: 1 },
    support: { Sage: 3, Nova: 2 },
    data: { Pulse: 3, Echo: 1 },
    all: { Kai: 1, Atlas: 1, Remy: 1, Sage: 1, Pulse: 1 },
  }
  if (answers.biggest_challenge && challengeMap[answers.biggest_challenge]) {
    Object.entries(challengeMap[answers.biggest_challenge]).forEach(([a, s]) => { score[a] += s })
  }

  // By tools
  if (answers.tools?.includes('meta_ads')) { score.Kai += 3; score.Echo += 1 }
  if (answers.tools?.includes('shopify'))  { score.Remy += 3 }
  if (answers.tools?.includes('whatsapp') || answers.tools?.includes('instagram')) { score.Nova += 2 }
  if (answers.tools?.includes('hubspot'))  { score.Atlas += 2 }

  // By first agent
  if (answers.first_agent) {
    const map = { kai: 'Kai', atlas: 'Atlas', remy: 'Remy', nova: 'Nova', sage: 'Sage' }
    const top = map[answers.first_agent]
    if (top) score[top] += 5
  }

  return agents.sort((a, b) => score[b] - score[a])
}

export default function Onboarding({ onComplete }) {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [saving, setSaving] = useState(false)
  const [direction, setDirection] = useState(1)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const isMulti = current.type === 'multi'
  const selected = answers[current.id] || (isMulti ? [] : null)

  const canProceed = isMulti
    ? selected.length > 0
    : selected !== null

  const handleSelect = (value) => {
    if (isMulti) {
      const arr = selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
      setAnswers({ ...answers, [current.id]: arr })
    } else {
      setAnswers({ ...answers, [current.id]: value })
    }
  }

  const handleNext = async () => {
    if (!canProceed) return
    if (isLast) {
      setSaving(true)
      const recommendations = buildRecommendations(answers)
      try {
        await supabase.auth.updateUser({
          data: {
            onboarding_complete: true,
            onboarding_answers: answers,
            recommended_agents: recommendations,
          }
        })
      } catch (e) {}
      onComplete({ answers, recommendations })
    } else {
      setDirection(1)
      setStep(s => s + 1)
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(s => s - 1)
  }

  const variants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: '#0D0D12' }}>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #3B82F6, #8B5CF6)' }} />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Personalizing your workspace</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* Logo */}
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
              <span className="text-white font-mono text-[13px] font-bold">SA</span>
            </div>
            <span className="font-bold text-lg text-white">StratifyAI</span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <div key={i} className="transition-all duration-300 rounded-full"
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                background: i < step
                  ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)'
                  : i === step
                  ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)'
                  : 'rgba(255,255,255,0.1)',
              }} />
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-8">

              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3">
                Step {step + 1} of {STEPS.length}
              </p>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                {current.question}
              </h2>
              <p className="text-white/40 text-sm mb-8">{current.subtitle}</p>

              <div className={`grid gap-3 ${
                current.options.length <= 4 ? 'grid-cols-1' :
                current.options.length === 5 ? 'grid-cols-1 sm:grid-cols-2' :
                'grid-cols-2 sm:grid-cols-4'
              }`}>
                {current.options.map((opt) => {
                  const isSelected = isMulti
                    ? selected.includes(opt.value)
                    : selected === opt.value

                  return (
                    <button key={opt.value} onClick={() => handleSelect(opt.value)}
                      className="relative text-left rounded-xl p-4 border transition-all duration-200 group"
                      style={{
                        background: isSelected ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)',
                        borderColor: isSelected ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.07)',
                        boxShadow: isSelected ? '0 0 20px rgba(59,130,246,0.15)' : 'none',
                      }}>
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className="text-2xl mb-2 block">{opt.icon}</span>
                      <p className={`text-sm font-semibold mb-0.5 ${isSelected ? 'text-white' : 'text-white/70'}`}>
                        {opt.label}
                      </p>
                      {opt.desc && (
                        <p className="text-xs text-white/30">{opt.desc}</p>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="px-8 pb-8 flex items-center justify-between">
            <button onClick={handleBack} disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:text-white/60 transition-colors disabled:opacity-0 disabled:pointer-events-none">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button onClick={handleNext} disabled={!canProceed || saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: canProceed ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' : 'rgba(255,255,255,0.08)' }}>
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Setting up…</>
              ) : isLast ? (
                <><Sparkles className="w-4 h-4" /> Build my dashboard</>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          You can change these settings anytime in your dashboard
        </p>
      </div>
    </div>
  )
}

export { buildRecommendations }
