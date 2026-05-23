import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { ProposalRequest } from '../../../types/api'

interface Props {
  onSubmit: (data: ProposalRequest) => void
  isLoading: boolean
}

export default function ProposalForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProposalRequest>()
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label={t('proposal.label_name')} error={errors.name?.message} required>
        <input
          type="text"
          placeholder={t('proposal.placeholder_name')}
          className="input"
          {...register('name', { required: t('proposal.error_name') })}
        />
      </Field>

      <Field label={t('proposal.label_email')} error={errors.email?.message} required>
        <input
          type="email"
          placeholder={t('proposal.placeholder_email')}
          className="input"
          {...register('email', {
            required: t('proposal.error_email_required'),
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('proposal.error_email_invalid') },
          })}
        />
      </Field>

      <Field label={t('proposal.label_phone')} error={errors.phone?.message} required>
        <input
          type="tel"
          placeholder={t('proposal.placeholder_phone')}
          className="input"
          {...register('phone', { required: t('proposal.error_phone') })}
        />
      </Field>

      <Field label={t('proposal.label_car_link')} error={errors.carLink?.message} required>
        <input
          type="url"
          placeholder={t('proposal.placeholder_car_link')}
          className="input"
          {...register('carLink', {
            required: t('proposal.error_car_link_required'),
            validate: (v) => !v || /^https?:\/\/.+/.test(v) || t('proposal.error_car_link_invalid'),
          })}
        />
      </Field>

      <Field label={t('proposal.label_message')} error={errors.message?.message} required>
        <textarea
          rows={4}
          placeholder={t('proposal.placeholder_message')}
          className="input resize-none"
          {...register('message', { required: t('proposal.error_message') })}
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
            {t('proposal.btn_loading')}
          </>
        ) : (
          t('proposal.btn_submit')
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
