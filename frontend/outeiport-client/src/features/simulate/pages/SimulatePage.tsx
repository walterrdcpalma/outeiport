import { useSimulate } from '../hooks/useSimulate'
import SimulateForm from '../components/SimulateForm'
import ISVResultCard from '../components/ISVResultCard'
import { isAxiosError } from 'axios'

export default function SimulatePage() {
  const { mutate, data, isPending, isError, error, reset } = useSimulate()

  function getErrorMessage() {
    if (!isAxiosError(error)) return 'Ocorreu um erro inesperado.'
    const body = error.response?.data
    if (body?.detail) return body.detail
    if (body?.errors) {
      return Object.values(body.errors as Record<string, string[]>).flat().join(' ')
    }
    return body?.title ?? 'Algo correu mal.'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Simulador ISV</h1>
      <p className="text-slate-500 mb-8">
        Cola o link de um anúncio do mobile.de e obtém uma estimativa do ISV para
        importar o veículo para Portugal.
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <SimulateForm
          onSubmit={(d) => { reset(); mutate(d) }}
          isLoading={isPending}
        />
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm mb-6">
          <strong>Erro:</strong> {getErrorMessage()}
        </div>
      )}

      {data && <ISVResultCard result={data} />}
    </div>
  )
}
