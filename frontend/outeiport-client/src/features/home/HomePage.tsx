import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            {t('home.hero_title')}
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            {t('home.hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/simulador"
              className="bg-white text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-base"
            >
              {t('home.cta_simulate')}
            </Link>
            <Link
              to="/proposta"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              {t('home.cta_proposal')}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-12">
            {t('home.how_it_works')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Step number="1" title={t('home.step1_title')} description={t('home.step1_desc')} />
            <Step number="2" title={t('home.step2_title')} description={t('home.step2_desc')} />
            <Step number="3" title={t('home.step3_title')} description={t('home.step3_desc')} />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <FeatureCard
            title={t('home.feature_sim_title')}
            description={t('home.feature_sim_desc')}
            cta={t('home.feature_sim_cta')}
            to="/simulador"
            accent
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
      <section className="py-8 px-4">
        <p className="text-center text-xs text-slate-400 max-w-xl mx-auto">
          {t('home.disclaimer')}
        </p>
      </section>
    </div>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center">
        {number}
      </div>
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm">{description}</p>
    </div>
  )
}

function FeatureCard({
  title, description, cta, to, accent,
}: {
  title: string; description: string; cta: string; to: string; accent?: boolean
}) {
  return (
    <div className={`rounded-2xl p-6 space-y-3 border ${accent ? 'bg-blue-900 text-white border-blue-800' : 'bg-white text-slate-800 border-slate-200'}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className={`text-sm ${accent ? 'text-blue-200' : 'text-slate-500'}`}>{description}</p>
      <Link
        to={to}
        className={`inline-block mt-2 font-semibold text-sm px-5 py-2 rounded-lg transition-colors ${
          accent
            ? 'bg-white text-blue-900 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {cta} →
      </Link>
    </div>
  )
}
