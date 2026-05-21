import type { SimulateResponse } from '../../../types/api'

interface Props {
  result: SimulateResponse
}

const fuelLabels: Record<string, string> = {
  Gasoline: 'Petrol / GPL',
  Diesel: 'Diesel',
  Electric: 'Electric',
  PlugInHybrid: 'Plug-in Hybrid',
  Hybrid: 'Hybrid',
  Other: 'Other',
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

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-slate-700">
          <Spec label="Mileage" value={`${fmtInt(result.mileage)} km`} />
          <Spec label="Displacement" value={result.displacement ? `${fmtInt(result.displacement)} cc` : '—'} />
          <Spec label="Fuel" value={fuelLabels[result.fuelType] ?? result.fuelType} />
          <Spec label="CO₂" value={result.co2 ? `${result.co2} g/km` : '—'} />
          <Spec label="Power" value={result.powerKw ? `${result.powerKw} kW` : '—'} />
          <Spec label="Gearbox" value={result.transmission ?? '—'} />
          <Spec label="Price (origin)" value={result.priceEur ? `€ ${fmtInt(result.priceEur)}` : '—'} />
        </div>
      </div>

      {/* ISV breakdown */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">ISV Breakdown (estimate)</h3>
        </div>

        {isElectric ? (
          <div className="px-5 py-6 text-center text-green-700 font-medium">
            Electric vehicles are exempt from ISV (€ 0.00)
          </div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              <Row
                label="Displacement component"
                value={`€ ${fmt(result.isv.componenteCilindrada)}`}
              />
              <Row
                label="Environmental component (CO₂)"
                value={`€ ${fmt(result.isv.componenteAmbiental)}`}
              />
              <Row
                label={`Depreciation coefficient (${result.year})`}
                value={`× ${result.isv.coeficienteDesvalorizacao.toFixed(2)}`}
                muted
              />
              <tr className="bg-blue-600 text-white">
                <td className="px-5 py-4 font-bold text-base">Estimated ISV</td>
                <td className="px-5 py-4 font-bold text-base text-right">
                  € {fmt(result.isv.total)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center">
        This is an estimate based on CISV 2025 tables. The final ISV amount is determined by
        the Portuguese Tax Authority (AT) after official vehicle inspection.
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
