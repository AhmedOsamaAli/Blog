import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PenLine, Code2 } from 'lucide-react'
import { useBlog } from '../context/BlogContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { isAdmin } = useBlog()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
            <Code2 size={15} strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-slate-200 group-hover:text-white transition-colors hidden sm:block">
            Ahmed<span className="text-violet-400">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${pathname === to ? 'nav-link-active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            title={isAdmin ? 'Admin Dashboard' : 'Admin'}
            className={`btn-ghost ${isAdmin ? 'text-violet-400' : ''}`}
          >
            <PenLine size={16} />
            <span className="hidden sm:inline">{isAdmin ? 'Dashboard' : 'Admin'}</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/[0.05] bg-dark-800/95 backdrop-blur-xl"
          >
            <nav className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === to
                      ? 'text-slate-100 bg-white/[0.05]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="px-4 py-3 rounded-xl text-sm font-medium text-violet-400 hover:text-violet-300 hover:bg-white/[0.03] flex items-center gap-2 transition-colors"
              >
                <PenLine size={15} /> {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
