import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

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
      <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
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
  { num: '01', icon: <ChatIcon />,       titleKey: 'home.step1_title', descKey: 'home.step1_desc' },
  { num: '02', icon: <DocumentIcon />,   titleKey: 'home.step2_title', descKey: 'home.step2_desc' },
  { num: '03', icon: <CheckCircleIcon />, titleKey: 'home.step3_title', descKey: 'home.step3_desc' },
  { num: '04', icon: <TruckIcon />,      titleKey: 'home.step4_title', descKey: 'home.step4_desc' },
  { num: '05', icon: <ShieldIcon />,     titleKey: 'home.step5_title', descKey: 'home.step5_desc' },
  { num: '06', icon: <KeyIcon />,        titleKey: 'home.step6_title', descKey: 'home.step6_desc' },
]

export default function HowItWorksSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-dark py-24 px-6 border-t border-dark-border">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg font-light text-white/70 text-center mb-16 tracking-wide"
        >
          {t('home.how_it_works')}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
          {steps.map(({ num, icon, titleKey, descKey }, i) => (
            <motion.div
              key={num}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="bg-dark p-8 flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-white/20 tracking-widest">{num}</span>
                <div className="w-5 h-5 text-white/25">{icon}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/80 mb-2">{t(titleKey)}</h3>
                <p className="text-xs text-muted leading-relaxed font-light">{t(descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
