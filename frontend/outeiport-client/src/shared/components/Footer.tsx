import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-dark-border text-muted text-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>{t('footer.rights', { year })}</p>
        <p className="text-xs opacity-60">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  )
}
