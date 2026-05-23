import { useProposalSubmit } from '../hooks/useProposalSubmit'
import ProposalForm from '../components/ProposalForm'
import SuccessMessage from '../components/SuccessMessage'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export default function ProposalPage() {
  const { mutate, isPending, isSuccess, isError, error, reset } = useProposalSubmit()
  const { t } = useTranslation()

  function getErrorMessage() {
    if (!isAxiosError(error)) return t('errors.unexpected')
    const body = error.response?.data
    if (body?.errors) {
      return Object.values(body.errors as Record<string, string[]>).flat().join(' ')
    }
    return body?.detail ?? body?.title ?? t('errors.generic')
  }

  if (isSuccess) return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <SuccessMessage onReset={reset} />
    </div>
  )

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-2xl font-light text-white mb-1">{t('proposal.title')}</h1>
      <p className="text-xs text-muted mb-10 font-light leading-relaxed">{t('proposal.subtitle')}</p>

      {isError && (
        <div className="border border-red-900/50 bg-red-950/20 text-red-400 rounded-xl p-4 text-xs mb-6 font-light">
          {getErrorMessage()}
        </div>
      )}

      <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
        <ProposalForm onSubmit={mutate} isLoading={isPending} />
      </div>
    </div>
  )
}
