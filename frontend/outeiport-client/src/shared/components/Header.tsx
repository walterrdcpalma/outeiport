import { Link, NavLink } from 'react-router-dom'

export default function Header() {
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
            Simulador ISV
          </NavLink>
          <NavLink
            to="/proposta"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold'
                : 'bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors'
            }
          >
            Pedir Proposta
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
