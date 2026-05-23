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
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const current = languages.find(l => l.code === i18n.language) ?? languages[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(1,1,1,0.85) 0%, rgba(1,1,1,0) 100%)' }}>
      <div className="w-full px-8 sm:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-widest text-white/90 hover:text-white transition-colors uppercase">
          Outeiport
        </Link>

        <nav className="flex items-center gap-8 text-xs font-medium tracking-wide uppercase">
          <NavLink
            to="/simulador"
            className={({ isActive }) =>
              isActive
                ? 'text-white'
                : 'text-white/50 hover:text-white transition-colors'
            }
          >
            {t('nav.simulator')}
          </NavLink>
          <NavLink
            to="/proposta"
            className={({ isActive }) =>
              isActive
                ? 'text-white'
                : 'text-white/50 hover:text-white transition-colors'
            }
          >
            {t('nav.proposal')}
          </NavLink>

          <div ref={ref} className="relative border-l border-white/10 pl-6">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-1 text-xs font-medium tracking-wide text-white/40 hover:text-white/70 transition-colors"
            >
              {current.label}
              <svg className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-3 bg-dark-surface/95 backdrop-blur-sm rounded-lg border border-dark-border overflow-hidden z-50 min-w-[130px]">
                {languages.map(({ code, label, name }) => (
                  <button
                    key={code}
                    onClick={() => { i18n.changeLanguage(code); setOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left transition-colors
                      ${i18n.language === code
                        ? 'text-white font-semibold'
                        : 'text-white/40 hover:text-white hover:bg-dark-border'
                      }`}
                  >
                    <span className="w-5 opacity-50 font-bold">{label}</span>
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
