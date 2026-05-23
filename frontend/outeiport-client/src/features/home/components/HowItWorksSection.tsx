import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  )
}

const steps = [
  { num: '01', icon: <ChatIcon />,        titleKey: 'home.step1_title', descKey: 'home.step1_desc' },
  { num: '02', icon: <DocumentIcon />,    titleKey: 'home.step2_title', descKey: 'home.step2_desc' },
  { num: '03', icon: <CheckCircleIcon />, titleKey: 'home.step3_title', descKey: 'home.step3_desc' },
  { num: '04', icon: <TruckIcon />,       titleKey: 'home.step4_title', descKey: 'home.step4_desc' },
  { num: '05', icon: <ShieldIcon />,      titleKey: 'home.step5_title', descKey: 'home.step5_desc' },
  { num: '06', icon: <KeyIcon />,         titleKey: 'home.step6_title', descKey: 'home.step6_desc' },
]

export default function HowItWorksSection() {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const handleInView = useCallback((index: number) => {
    setActiveStep(index)
  }, [])

  return (
    <section className="bg-dark border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg font-light text-white/70 text-center pt-24 tracking-wide"
        >
          {t('home.how_it_works')}
        </motion.h2>

        <div className="flex">

          {/* ── Left: sticky panel (desktop only) ── */}
          <div className="hidden md:flex w-5/12 sticky top-0 h-screen items-center justify-center shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0,  scale: 1   }}
                exit={{ opacity: 0,    y: -14, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-5 select-none"
              >
                {/* Giant faded number */}
                <span className="text-[108px] font-extralight leading-none text-white/[0.04] tabular-nums">
                  {steps[activeStep].num}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 text-white/40">
                  {steps[activeStep].icon}
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
        animate={{ opacity: isActive ? 1 : 0.2 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 w-full"
      >
        {/* Mobile: num + icon inline */}
        <div className="flex items-center gap-3 md:hidden">
          <span className="text-xs font-medium text-white/25 tracking-widest">{step.num}</span>
          <div className="w-4 h-4 text-white/30">{step.icon}</div>
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
