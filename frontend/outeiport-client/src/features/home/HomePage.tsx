import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HowItWorksSection from './components/HowItWorksSection'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero — full viewport, header floats over it */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        <img
          src="/hero.jpg"
          alt=""
          className="anim-hero-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 65%)' }} />

        <div className="relative z-10 px-8 sm:px-50 w-full pt-20">
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

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.25em] text-white/20 uppercase">scroll</span>
          <svg className="w-4 h-4 text-white/20 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <HowItWorksSection />

      {/* CTA final */}
      <section className="bg-dark py-32 px-6 border-t border-dark-border text-center">
        <div className="max-w-md mx-auto space-y-8">
          <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase">
            {t('home.hero_kicker')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-snug whitespace-pre-line">
            {t('home.cta_title')}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-2">
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

      {/* Disclaimer */}
      <section className="bg-dark py-10 px-6 border-t border-dark-border">
        <p className="text-center text-xs text-muted max-w-lg mx-auto font-light leading-relaxed">
          {t('home.disclaimer')}
        </p>
      </section>
    </div>
  )
}
