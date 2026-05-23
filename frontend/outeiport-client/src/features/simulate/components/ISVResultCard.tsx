import { useTranslation } from 'react-i18next'
import type { SimulateResponse } from '../../../types/api'

interface Props {
  result: SimulateResponse
}

const fuelKeys: Record<string, string> = {
  Gasoline:     'result.fuel_gasoline',
  Diesel:       'result.fuel_diesel',
  Electric:     'result.fuel_electric',
  PlugInHybrid: 'result.fuel_plugin_hybrid',
  Hybrid:       'result.fuel_hybrid',
  Other:        'result.fuel_other',
}

function fmt(n: number) {
  return n.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtInt(n: number) {
  return n.toLocaleString('pt-PT')
}

export default function ISVResultCard({ result }: Props) {
  const { t } = useTranslation()
  const isElectric = result.fuelType === 'Electric'

  return (
    <div className="space-y-4">
      {/* Car summary */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-5">
        <h2 className="text-base font-light text-white mb-4">
          {result.make} {result.model}{' '}
          <span className="text-muted">({result.year})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Spec label={t('result.mileage')}      value={`${fmtInt(result.mileage)} km`} />
          <Spec label={t('result.displacement')} value={result.displacement ? `${fmtInt(result.displacement)} cc` : '—'} />
          <Spec label={t('result.fuel')}         value={t(fuelKeys[result.fuelType] ?? 'result.fuel_other')} />
          <Spec label={t('result.co2')}          value={result.co2 ? `${result.co2} g/km` : '—'} />
          <Spec label={t('result.power')}        value={result.powerKw ? `${result.powerKw} kW` : '—'} />
          <Spec label={t('result.transmission')} value={result.transmission ?? '—'} />
          <Spec label={t('result.price')}        value={result.priceEur ? `€ ${fmtInt(result.priceEur)}` : '—'} />
        </div>
      </div>

      {/* ISV breakdown */}
      <div className="border border-dark-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-dark-border">
          <h3 className="text-[10px] font-medium text-white/30 tracking-widest uppercase">{t('result.isv_breakdown')}</h3>
        </div>

        {isElectric ? (
          <div className="px-5 py-6 text-center text-white/40 text-sm font-light">
            {t('result.electric_exempt')}
          </div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              <Row label={t('result.displacement_component')}  value={`€ ${fmt(result.isv.displacementComponent)}`} />
              <Row label={t('result.environmental_component')} value={`€ ${fmt(result.isv.environmentalComponent)}`} />
              <Row
                label={t('result.depreciation', { year: result.year })}
                value={`× ${result.isv.depreciationCoefficient.toFixed(2)}`}
                muted
              />
              <tr className="border-t border-dark-border">
                <td className="px-5 py-4 text-sm font-medium text-white">{t('result.isv_total')}</td>
                <td className="px-5 py-4 text-sm font-semibold text-white text-right font-mono">
                  € {fmt(result.isv.total)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-muted text-center font-light">{t('result.disclaimer')}</p>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] text-muted uppercase tracking-widest block mb-0.5">{label}</span>
      <span className="text-sm font-light text-white/80">{value}</span>
    </div>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <tr className="border-b border-dark-border last:border-0">
      <td className={`px-5 py-3 font-light ${muted ? 'text-muted' : 'text-white/60'}`}>{label}</td>
      <td className={`px-5 py-3 text-right font-mono text-xs ${muted ? 'text-muted' : 'text-white/80'}`}>
        {value}
      </td>
    </tr>
  )
}
