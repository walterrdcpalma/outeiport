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
      <Field label={t('proposal.label_name')} error={errors.name?.message}>
        <input
          type="text"
          placeholder={t('proposal.placeholder_name')}
          className="input"
          {...register('name', { required: t('proposal.error_name') })}
        />
      </Field>

      <Field label={t('proposal.label_email')} error={errors.email?.message}>
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

      <Field label={t('proposal.label_phone')} error={errors.phone?.message}>
        <input
          type="tel"
          placeholder={t('proposal.placeholder_phone')}
          className="input"
          {...register('phone', { required: t('proposal.error_phone') })}
        />
      </Field>

      <Field label={t('proposal.label_car_link')} error={errors.carLink?.message}>
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

      <Field label={t('proposal.label_message')} error={errors.message?.message}>
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
        className="w-full bg-white text-dark font-semibold py-3 px-6 rounded-lg hover:bg-white/90 disabled:opacity-40 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
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
  label, error, children,
}: {
  label: string; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-white/30 mb-2 tracking-widest uppercase">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400 font-light">{error}</p>}
    </div>
  )
}
