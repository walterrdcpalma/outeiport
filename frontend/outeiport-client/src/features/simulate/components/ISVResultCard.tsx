import type { SimulateResponse } from '../../../types/api'

interface Props {
  result: SimulateResponse
}

const fuelLabels: Record<string, string> = {
  Gasoline:    'Gasolina / GPL',
  Diesel:      'Diesel',
  Electric:    'Elétrico',
  PlugInHybrid:'Híbrido Plug-in',
  Hybrid:      'Híbrido',
  Other:       'Outro',
}

function fmt(n: number) {
  return n.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtInt(n: number) {
  return n.toLocaleString('pt-PT')
}

export default function ISVResultCard({ result }: Props) {
  const isElectric = result.fuelType === 'Electric'

  return (
    <div className="space-y-6">
      {/* Car summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h2 className="text-xl font-bold text-blue-900">
          {result.make} {result.model}{' '}
          <span className="font-normal text-base text-slate-500">({result.year})</span>
        </h2>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-slate-700">
          <Spec label="Quilometragem"    value={`${fmtInt(result.mileage)} km`} />
          <Spec label="Cilindrada"       value={result.displacement ? `${fmtInt(result.displacement)} cc` : '—'} />
          <Spec label="Combustível"      value={fuelLabels[result.fuelType] ?? result.fuelType} />
          <Spec label="Emissões CO₂"    value={result.co2 ? `${result.co2} g/km` : '—'} />
          <Spec label="Potência"         value={result.powerKw ? `${result.powerKw} kW` : '—'} />
          <Spec label="Transmissão"      value={result.transmission ?? '—'} />
          <Spec label="Preço (origem)"   value={result.priceEur ? `€ ${fmtInt(result.priceEur)}` : '—'} />
        </div>
      </div>

      {/* ISV breakdown */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Desagregação do ISV (estimativa)</h3>
        </div>

        {isElectric ? (
          <div className="px-5 py-6 text-center text-green-700 font-medium">
            Veículos elétricos estão isentos de ISV (€ 0,00)
          </div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              <Row label="Componente de cilindrada"     value={`€ ${fmt(result.isv.displacementComponent)}`} />
              <Row label="Componente ambiental (CO₂)"  value={`€ ${fmt(result.isv.environmentalComponent)}`} />
              <Row
                label={`Coeficiente de desvalorização (${result.year})`}
                value={`× ${result.isv.depreciationCoefficient.toFixed(2)}`}
                muted
              />
              <tr className="bg-blue-600 text-white">
                <td className="px-5 py-4 font-bold text-base">ISV Estimado</td>
                <td className="px-5 py-4 font-bold text-base text-right">
                  € {fmt(result.isv.total)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center">
        Estimativa baseada nas tabelas CISV 2025. O valor final do ISV é determinado pela Autoridade
        Tributária (AT) após inspeção oficial do veículo.
      </p>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-slate-400 text-xs block">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className={`px-5 py-3 ${muted ? 'text-slate-400' : 'text-slate-700'}`}>{label}</td>
      <td className={`px-5 py-3 text-right font-mono ${muted ? 'text-slate-400' : 'text-slate-800 font-semibold'}`}>
        {value}
      </td>
    </tr>
  )
}
