import { useProposalSubmit } from '../hooks/useProposalSubmit'
import ProposalForm from '../components/ProposalForm'
import SuccessMessage from '../components/SuccessMessage'
import { isAxiosError } from 'axios'

export default function ProposalPage() {
  const { mutate, isPending, isSuccess, isError, error, reset } = useProposalSubmit()

  function getErrorMessage() {
    if (!isAxiosError(error)) return 'Ocorreu um erro inesperado.'
    const body = error.response?.data
    if (body?.errors) {
      return Object.values(body.errors as Record<string, string[]>).flat().join(' ')
    }
    return body?.detail ?? body?.title ?? 'Algo correu mal.'
  }

  if (isSuccess) return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <SuccessMessage onReset={reset} />
    </div>
  )

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Pedir Proposta</h1>
      <p className="text-slate-500 mb-8">
        Preenche o formulário e preparamos uma proposta personalizada para a tua importação.
      </p>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm mb-6">
          <strong>Erro:</strong> {getErrorMessage()}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <ProposalForm onSubmit={mutate} isLoading={isPending} />
      </div>
    </div>
  )
}
