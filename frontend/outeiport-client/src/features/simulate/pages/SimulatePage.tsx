import { useSimulate } from '../hooks/useSimulate'
import SimulateForm from '../components/SimulateForm'
import ISVResultCard from '../components/ISVResultCard'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export default function SimulatePage() {
  const { mutate, data, isPending, isError, error, reset } = useSimulate()
  const { t } = useTranslation()

  function getErrorMessage() {
    if (!isAxiosError(error)) return t('errors.unexpected')
    const body = error.response?.data
    if (body?.detail) return body.detail
    if (body?.errors) {
      return Object.values(body.errors as Record<string, string[]>).flat().join(' ')
    }
    return body?.title ?? t('errors.generic')
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-light text-white mb-1">{t('simulate.title')}</h1>
      <p className="text-xs text-muted mb-10 font-light leading-relaxed">{t('simulate.subtitle')}</p>

      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 mb-8">
        <SimulateForm
          onSubmit={(d) => { reset(); mutate(d) }}
          isLoading={isPending}
        />
      </div>

      {isError && (
        <div className="border border-red-900/50 bg-red-950/20 text-red-400 rounded-xl p-4 text-xs mb-6 font-light">
          {getErrorMessage()}
        </div>
      )}

      {data && <ISVResultCard result={data} />}
    </div>
  )
}
