import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { SimulateRequest } from '../../../types/api'

interface Props {
  onSubmit: (data: SimulateRequest) => void
  isLoading: boolean
}

export default function SimulateForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<SimulateRequest>()
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="url" className="block text-[10px] font-medium text-white/30 mb-2 tracking-widest uppercase">
          {t('simulate.label_url')}
        </label>
        <input
          id="url"
          type="url"
          placeholder={t('simulate.placeholder_url')}
          className="input"
          {...register('url', {
            required: t('simulate.error_required'),
            validate: (v) => v.includes('mobile.de') || t('simulate.error_invalid'),
          })}
        />
        {errors.url && (
          <p className="mt-1.5 text-xs text-red-400 font-light">{errors.url.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-dark font-semibold py-3 px-6 rounded-lg hover:bg-white/90 disabled:opacity-40 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            {t('simulate.btn_loading')}
          </>
        ) : (
          t('simulate.btn_submit')
        )}
      </button>
    </form>
  )
}
