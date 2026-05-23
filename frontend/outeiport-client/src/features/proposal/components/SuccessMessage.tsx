import { useTranslation } from 'react-i18next'

interface Props {
  onReset: () => void
}

export default function SuccessMessage({ onReset }: Props) {
  const { t } = useTranslation()

  return (
    <div className="text-center py-16 space-y-5">
      <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-light text-white">{t('success.title')}</h2>
      <p className="text-xs text-muted max-w-xs mx-auto font-light leading-relaxed">{t('success.message')}</p>
      <button
        onClick={onReset}
        className="mt-2 text-xs text-white/25 hover:text-white/50 transition-colors font-light tracking-wide"
      >
        {t('success.btn_again')}
      </button>
    </div>
  )
}
