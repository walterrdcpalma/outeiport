import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Importa o teu carro da Alemanha sem surpresas
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Cola o link de um anúncio do mobile.de e obtém uma estimativa do ISV de imediato.
            Sabe o custo total antes de comprar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/simulador"
              className="bg-white text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-base"
            >
              Calcular ISV agora
            </Link>
            <Link
              to="/proposta"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Pedir proposta
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-12">
            Como funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Encontra o carro"
              description="Pesquisa no mobile.de e copia o link do anúncio do carro que queres importar."
            />
            <Step
              number="2"
              title="Simula o ISV"
              description="Cola o link no simulador. Extraímos as características e calculamos o ISV estimado automaticamente."
            />
            <Step
              number="3"
              title="Pede uma proposta"
              description="Queres avançar? Envia-nos os detalhes e preparamos uma proposta completa de importação."
            />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <FeatureCard
            title="Simulador ISV"
            description="Estima o Imposto Sobre Veículos para qualquer carro no mobile.de — gasolina, diesel, híbrido ou elétrico."
            cta="Abrir simulador"
            to="/simulador"
            accent
          />
          <FeatureCard
            title="Proposta Completa"
            description="Recebe uma proposta personalizada com ISV, desalfandegamento, transporte e registo incluídos."
            cta="Pedir proposta"
            to="/proposta"
          />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4">
        <p className="text-center text-xs text-slate-400 max-w-xl mx-auto">
          Os valores de ISV apresentados são estimativas baseadas nas tabelas CISV 2025.
          O valor final é determinado pela Autoridade Tributária (AT) após inspeção oficial.
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
