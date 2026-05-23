import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const current = languages.find(l => l.code === i18n.language) ?? languages[0]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(1,1,1,0.85) 0%, rgba(1,1,1,0) 100%)' }}>
        <div className="w-full px-6 sm:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-widest text-white/90 hover:text-white transition-colors uppercase">
            Outeiport
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-8 text-xs font-medium tracking-wide uppercase">
              <NavLink
                to="/simulador"
                className={({ isActive }) => isActive ? 'text-white' : 'text-white/50 hover:text-white transition-colors'}
              >
                {t('nav.simulator')}
              </NavLink>
              <NavLink
                to="/proposta"
                className={({ isActive }) => isActive ? 'text-white' : 'text-white/50 hover:text-white transition-colors'}
              >
                {t('nav.proposal')}
              </NavLink>
            </nav>

            {/* Language switcher */}
            <div ref={langRef} className="relative hidden sm:block border-l border-white/10 pl-6">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1 text-xs font-medium tracking-wide uppercase text-white/40 hover:text-white/70 transition-colors"
              >
                {current.label}
                <svg className={`w-2.5 h-2.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-3 bg-dark-surface/95 backdrop-blur-sm rounded-lg border border-dark-border overflow-hidden z-50 min-w-[130px]">
                  {languages.map(({ code, label, name }) => (
                    <button
                      key={code}
                      onClick={() => { i18n.changeLanguage(code); setLangOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left transition-colors ${i18n.language === code ? 'text-white font-semibold' : 'text-white/40 hover:text-white hover:bg-dark-border'}`}
                    >
                      <span className="w-5 opacity-50 font-bold">{label}</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-white/70 origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-px bg-white/70"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-white/70 origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dark/98 flex flex-col items-center justify-center gap-10 sm:hidden"
          >
            {/* Nav links */}
            {[
              { to: '/simulador', label: t('nav.simulator') },
              { to: '/proposta', label: t('nav.proposal') },
            ].map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={to}
                  className="text-2xl font-light text-white/70 hover:text-white transition-colors tracking-wide"
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Language switcher inside menu */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 pt-4 border-t border-dark-border"
            >
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => { i18n.changeLanguage(code); setMenuOpen(false) }}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors ${i18n.language === code ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
