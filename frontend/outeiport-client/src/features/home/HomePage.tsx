import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
      </section>

      {/* How it works */}
      <section className="bg-dark-surface py-20 px-6 border-t border-dark-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-light text-white/70 text-center mb-14 tracking-wide">
            {t('home.how_it_works')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-12">
            <Step number="01" title={t('home.step1_title')} description={t('home.step1_desc')} />
            <Step number="02" title={t('home.step2_title')} description={t('home.step2_desc')} />
            <Step number="03" title={t('home.step3_title')} description={t('home.step3_desc')} />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-dark py-20 px-6 border-t border-dark-border">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          <FeatureCard
            title={t('home.feature_sim_title')}
            description={t('home.feature_sim_desc')}
            cta={t('home.feature_sim_cta')}
            to="/simulador"
          />
          <FeatureCard
            title={t('home.feature_prop_title')}
            description={t('home.feature_prop_desc')}
            cta={t('home.feature_prop_cta')}
            to="/proposta"
          />
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

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-white/20 tracking-widest">{number}</span>
      <h3 className="text-sm font-medium text-white/80">{title}</h3>
      <p className="text-xs text-muted leading-relaxed font-light">{description}</p>
    </div>
  )
}

function FeatureCard({
  title, description, cta, to,
}: {
  title: string; description: string; cta: string; to: string;
}) {
  return (
    <div className="rounded-xl p-7 border border-dark-border bg-dark-surface space-y-4">
      <h3 className="text-sm font-medium text-white/80">{title}</h3>
      <p className="text-xs text-muted leading-relaxed font-light">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors group"
      >
        <span>{cta}</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  )
}
