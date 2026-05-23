import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = languages.find(l => l.code === i18n.language) ?? languages[0]

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90">
          Outeiport
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/simulador"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-300 underline underline-offset-4'
                : 'hover:text-blue-300 transition-colors'
            }
          >
            {t('nav.simulator')}
          </NavLink>
          <NavLink
            to="/proposta"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold'
                : 'bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors'
            }
          >
            {t('nav.proposal')}
          </NavLink>

          <div ref={ref} className="relative border-l border-blue-700 pl-4">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-1 text-sm font-semibold hover:text-blue-200 transition-colors"
            >
              {current.label}
              <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                {languages.map(({ code, label, name }) => (
                  <button
                    key={code}
                    onClick={() => { i18n.changeLanguage(code); setOpen(false) }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors
                      ${i18n.language === code
                        ? 'bg-blue-50 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className="w-6 text-xs font-bold text-slate-400">{label}</span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
