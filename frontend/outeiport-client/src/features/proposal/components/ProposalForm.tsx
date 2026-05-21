import { useForm } from 'react-hook-form'
import type { ProposalRequest } from '../../../types/api'

interface Props {
  onSubmit: (data: ProposalRequest) => void
  isLoading: boolean
}

export default function ProposalForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProposalRequest>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Nome completo" error={errors.name?.message} required>
        <input
          type="text"
          placeholder="João Silva"
          className="input"
          {...register('name', { required: 'O nome é obrigatório' })}
        />
      </Field>

      <Field label="Email" error={errors.email?.message} required>
        <input
          type="email"
          placeholder="joao@email.com"
          className="input"
          {...register('email', {
            required: 'O email é obrigatório',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' },
          })}
        />
      </Field>

      <Field label="Telefone" error={errors.phone?.message} required>
        <input
          type="tel"
          placeholder="+351 9XX XXX XXX"
          className="input"
          {...register('phone', { required: 'O telefone é obrigatório' })}
        />
      </Field>

      <Field label="Link do carro (opcional)" error={errors.carLink?.message}>
        <input
          type="url"
          placeholder="https://suchen.mobile.de/..."
          className="input"
          {...register('carLink')}
        />
      </Field>

      <Field label="Mensagem" error={errors.message?.message} required>
        <textarea
          rows={4}
          placeholder="Descreve o carro que pretendes importar..."
          className="input resize-none"
          {...register('message', { required: 'A mensagem é obrigatória' })}
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
            A enviar…
          </>
        ) : (
          'Enviar Pedido'
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
