import { useState, useEffect, useRef, useCallback, startTransition } from 'react'
import { motion, AnimatePresence, type MotionProps } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type IconMode = 'mount' | 'inview'
type DrawProps = Pick<MotionProps, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'>

const draw = (mode: IconMode, delay = 0, duration = 1.1): DrawProps => {
  const transition = { pathLength: { duration, delay, ease: [0.16, 1, 0.3, 1] as const }, opacity: { duration: 0.2, delay } }
  const initial = { pathLength: 0, opacity: 0 }
  const target = { pathLength: 1, opacity: 1 }
  return mode === 'mount'
    ? { initial, animate: target, transition }
    : { initial, whileInView: target, viewport: { once: true }, transition }
}

const pop = (mode: IconMode, delay = 0): DrawProps => {
  const transition = { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] as const }
  const initial = { scale: 0, opacity: 0 }
  const target = { scale: 1, opacity: 1 }
  return mode === 'mount'
    ? { initial, animate: target, transition }
    : { initial, whileInView: target, viewport: { once: true }, transition }
}

function ChatIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.path d="M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" {...draw(mode, 0, 1.3)} />
      <motion.circle cx="8" cy="10" r=".6" fill="currentColor" {...pop(mode, 0.95)} />
      <motion.circle cx="12" cy="10" r=".6" fill="currentColor" {...pop(mode, 1.1)} />
      <motion.circle cx="16" cy="10" r=".6" fill="currentColor" {...pop(mode, 1.25)} />
    </svg>
  )
}

function DocumentIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" {...draw(mode, 0, 0.9)} />
      <motion.path d="M13 3H11a2 2 0 00-2 2v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 00-2-2z" {...draw(mode, 0.65, 0.55)} />
      <motion.path d="M9 12h6" {...draw(mode, 1.05, 0.35)} />
      <motion.path d="M9 16h4" {...draw(mode, 1.3, 0.3)} />
    </svg>
  )
}

function CheckCircleIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.circle cx="12" cy="12" r="9" {...draw(mode, 0, 1.1)} />
      <motion.path d="M8.5 12.5l2.5 2.5 4.5-5" {...draw(mode, 0.9, 0.5)} />
    </svg>
  )
}

function TruckIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.path d="M1 3h13v13H1z" {...draw(mode, 0, 0.9)} />
      <motion.path d="M14 8h4l3 5v3h-7V8z" {...draw(mode, 0.75, 0.75)} />
      <motion.circle cx="5.5" cy="18.5" r="2" {...pop(mode, 1.25)} />
      <motion.circle cx="18.5" cy="18.5" r="2" {...pop(mode, 1.4)} />
    </svg>
  )
}

function ShieldIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.path d="M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.955 11.955 0 0112 2.944z" {...draw(mode, 0, 1.3)} />
      <motion.path d="M8.5 12.5l2.5 2.5 4.5-5" {...draw(mode, 1.1, 0.5)} />
    </svg>
  )
}

function KeyIcon({ mode = 'mount' as IconMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <motion.circle cx="8" cy="9" r="4" {...draw(mode, 0, 1.0)} />
      <motion.path d="M12 13l8-1v2l-2 1v2l-2-.5V19l-2-1-2-2.5" {...draw(mode, 0.85, 0.85)} />
    </svg>
  )
}

type StepDef = { num: string; Icon: React.ComponentType<{ mode?: IconMode }>; titleKey: string; descKey: string }

const steps: StepDef[] = [
  { num: '01', Icon: ChatIcon,        titleKey: 'home.step1_title', descKey: 'home.step1_desc' },
  { num: '02', Icon: DocumentIcon,    titleKey: 'home.step2_title', descKey: 'home.step2_desc' },
  { num: '03', Icon: CheckCircleIcon, titleKey: 'home.step3_title', descKey: 'home.step3_desc' },
  { num: '04', Icon: TruckIcon,       titleKey: 'home.step4_title', descKey: 'home.step4_desc' },
  { num: '05', Icon: ShieldIcon,      titleKey: 'home.step5_title', descKey: 'home.step5_desc' },
  { num: '06', Icon: KeyIcon,         titleKey: 'home.step6_title', descKey: 'home.step6_desc' },
]

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const handleInView = useCallback((index: number) => { startTransition(() => setActiveStep(index)) }, [])

  const { num: activeNum, Icon: ActiveIcon } = steps[activeStep]

  return (
    <section className="bg-dark border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="flex">

          {/* ── Left: sticky panel (desktop only) ── */}
          <div className="hidden md:flex w-5/12 sticky top-0 h-screen items-center justify-center shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-5 select-none"
              >
                <span className="text-[108px] font-extralight leading-none text-white/[0.04] tabular-nums">
                  {activeNum}
                </span>
                <div className="w-14 h-14 text-white/40">
                  <ActiveIcon mode="mount" />
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-1">
                  {steps.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ width: i === activeStep ? 28 : 10, opacity: i === activeStep ? 0.5 : 0.15 }}
                      transition={{ duration: 0.4 }}
                      className="h-px bg-white rounded-full"
                    />
                  ))}
                </div>

                {/* Counter */}
                <p className="text-[10px] text-white/20 tracking-[0.25em] font-light">
                  {String(activeStep + 1).padStart(2, '0')} / 06
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: scrolling steps ── */}
          <div className="w-full md:w-7/12 pt-16 pb-24">
            {steps.map((step, i) => (
              <StepRow
                key={step.num}
                step={step}
                index={i}
                isActive={i === activeStep}
                onInView={handleInView}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

interface StepRowProps {
  step: typeof steps[number]
  index: number
  isActive: boolean
  onInView: (index: number) => void
}

function StepRow({ step, index, isActive, onInView }: StepRowProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(index) },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onInView])

  return (
    <div
      ref={ref}
      className="min-h-[65vh] flex items-center border-b border-dark-border last:border-0 py-14"
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.25 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 w-full"
      >
        {/* Mobile: icon + num stacked */}
        <div className="flex flex-col gap-4 md:hidden">
          <span className="text-xs font-medium text-white/25 tracking-widest">{step.num}</span>
          <div className="w-12 h-12 text-white/35">
            <step.Icon mode="inview" />
          </div>
        </div>

        {/* Desktop: num only */}
        <span className="hidden md:block text-xs font-medium text-white/25 tracking-widest">
          {step.num}
        </span>

        <h3 className="text-2xl sm:text-3xl font-light text-white leading-snug tracking-tight">
          {t(step.titleKey)}
        </h3>
        <p className="text-sm text-muted leading-relaxed max-w-xs font-light">
          {t(step.descKey)}
        </p>
      </motion.div>
    </div>
  )
}
