import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HowItWorksSection from './components/HowItWorksSection'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero — mobile: text then image stacked; desktop: full-viewport with image as bg */}
      <section className="bg-dark overflow-hidden flex flex-col sm:block sm:relative sm:min-h-screen">
        {/* Image — mobile: stacked below text; desktop: full-screen background */}
        <div className="relative order-last sm:order-none sm:absolute sm:inset-0">
          <img
            src="/hero.jpg"
            alt=""
            className="anim-hero-img w-full h-72 object-cover [object-position:50%_55%] sm:absolute sm:inset-0 sm:h-full sm:object-cover sm:object-center"
          />
          {/* Mobile: fade top of image into bg-dark so text section blends seamlessly */}
          <div className="sm:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-dark to-transparent pointer-events-none" />
        </div>
        <div className="hidden sm:block absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 65%)' }} />

        <div className="relative z-10 px-8 sm:px-50 w-full pt-24 pb-12 sm:pt-20 sm:pb-0">
          <p className="anim-hero-1 text-[10px] tracking-[0.3em] text-white/30 uppercase mb-8">
            {t('home.hero_kicker')}
          </p>
          <h1 className="mb-8">
            <span className="anim-hero-2 block text-4xl sm:text-5xl font-light text-white leading-[1.15] tracking-tight">
              {t('home.hero_line1')}
            </span>
            <span className="anim-hero-3 block text-4xl sm:text-5xl font-light text-white/40 leading-[1.15] tracking-tight">
              {t('home.hero_line2')}
            </span>
          </h1>
          <p className="anim-hero-4 text-sm text-white/35 max-w-sm leading-relaxed mb-12 font-light">
            {t('home.hero_subtitle')}
          </p>
          <Link
            to="/simulador"
            className="anim-hero-5 inline-flex items-center gap-3 group"
          >
            <span className="text-sm font-light text-white/40 group-hover:text-white/70 transition-colors duration-300 tracking-wide">
              {t('home.hero_cta')}
            </span>
            <span className="text-white/25 group-hover:text-white/50 group-hover:translate-x-1.5 transition-all duration-300 text-sm">
              →
            </span>
          </Link>
        </div>

        {/* Scroll indicator — desktop only */}
        <div className="hidden sm:flex scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.25em] text-white/20 uppercase">scroll</span>
          <svg className="w-4 h-4 text-white/20 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <HowItWorksSection />

      {/* CTA final */}
      <section className="bg-dark pt-10 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto space-y-10">
        <p className="text-2xl sm:text-3xl font-light text-white/70 tracking-tight leading-snug">
          {t('home.cta_tagline')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link to="/simulador" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-300 group">
            <span>{t('home.cta_simulate')}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/proposta" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-300 group">
            <span>{t('home.cta_proposal')}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        </div>
      </section>
    </div>
  )
}
