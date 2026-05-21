import { useForm } from 'react-hook-form'
import type { SimulateRequest } from '../../../types/api'

interface Props {
  onSubmit: (data: SimulateRequest) => void
  isLoading: boolean
}

export default function SimulateForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<SimulateRequest>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
          Link do anúncio mobile.de
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://suchen.mobile.de/auto-inserat/..."
          className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register('url', {
            required: 'O link é obrigatório',
            validate: (v) =>
              v.includes('mobile.de') || 'Deve ser um link válido do mobile.de',
          })}
        />
        {errors.url && (
          <p className="mt-1 text-xs text-red-600">{errors.url.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            A calcular…
          </>
        ) : (
          'Calcular ISV'
        )}
      </button>
    </form>
  )
}
