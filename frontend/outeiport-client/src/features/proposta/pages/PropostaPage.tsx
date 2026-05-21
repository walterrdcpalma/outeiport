import { usePropostaSubmit } from '../hooks/usePropostaSubmit'
import PropostaForm from '../components/PropostaForm'
import SuccessMessage from '../components/SuccessMessage'
import { isAxiosError } from 'axios'

export default function PropostaPage() {
  const { mutate, isPending, isSuccess, isError, error, reset } = usePropostaSubmit()

  function getErrorMessage() {
    if (!isAxiosError(error)) return 'An unexpected error occurred.'
    const body = error.response?.data
    if (body?.errors) {
      return Object.values(body.errors as Record<string, string[]>)
        .flat()
        .join(' ')
    }
    return body?.detail ?? body?.title ?? 'Something went wrong.'
  }

  if (isSuccess) return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <SuccessMessage onReset={reset} />
    </div>
  )

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Request a Quote</h1>
      <p className="text-slate-500 mb-8">
        Fill in the form and we'll prepare a personalised import proposal for you.
      </p>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm mb-6">
          <strong>Error:</strong> {getErrorMessage()}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <PropostaForm onSubmit={mutate} isLoading={isPending} />
      </div>
    </div>
  )
}
