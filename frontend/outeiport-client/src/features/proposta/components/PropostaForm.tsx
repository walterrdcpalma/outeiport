import { useForm } from 'react-hook-form'
import type { PropostaRequest } from '../../../types/api'

interface Props {
  onSubmit: (data: PropostaRequest) => void
  isLoading: boolean
}

export default function PropostaForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<PropostaRequest>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Full name" error={errors.nome?.message} required>
        <input
          type="text"
          placeholder="João Silva"
          className="input"
          {...register('nome', { required: 'Name is required' })}
        />
      </Field>

      <Field label="Email" error={errors.email?.message} required>
        <input
          type="email"
          placeholder="joao@email.com"
          className="input"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
        />
      </Field>

      <Field label="Phone" error={errors.telefone?.message} required>
        <input
          type="tel"
          placeholder="+351 9XX XXX XXX"
          className="input"
          {...register('telefone', { required: 'Phone is required' })}
        />
      </Field>

      <Field label="Car link (optional)" error={errors.linkCarro?.message}>
        <input
          type="url"
          placeholder="https://suchen.mobile.de/..."
          className="input"
          {...register('linkCarro')}
        />
      </Field>

      <Field label="Message" error={errors.mensagem?.message} required>
        <textarea
          rows={4}
          placeholder="Tell us about the car you're looking to import..."
          className="input resize-none"
          {...register('mensagem', { required: 'Message is required' })}
        />
      </Field>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          'Send Quote Request'
        )}
      </button>
    </form>
  )
}

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
