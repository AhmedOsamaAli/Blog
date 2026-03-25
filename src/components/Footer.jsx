import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail, Rss, Code2 } from 'lucide-react'

const SOCIAL = [
  { href: 'https://github.com/AhmedOsamaAli', icon: Github,   label: 'GitHub'   },
  { href: 'https://twitter.com/AhmedOsamaAli', icon: Twitter, label: 'Twitter'  },
  { href: 'https://linkedin.com/in/ahmedosamaali', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hi@ahmedosama.dev', icon: Mail, label: 'Email' },
]

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/admin', label: 'Admin' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-dark-800/50 mt-20">
      <div className="section-container py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white">
                <Code2 size={15} strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-slate-200">
                Ahmed<span className="text-violet-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Software engineer, writer, and builder. Sharing thoughts on tech, code, and life.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                    bg-white/[0.04] hover:bg-white/[0.08]
                    border border-white/[0.06] hover:border-violet-500/30
                    text-slate-500 hover:text-violet-400
                    transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Topics */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
              Topics
            </p>
            <div className="flex flex-col gap-2.5">
              {['Technology', 'Career', 'Personal', 'Tutorial', 'Thoughts'].map(t => (
                <Link
                  key={t}
                  to={`/blog?category=${t.toLowerCase()}`}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Ahmed Osama. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Rss size={11} className="text-violet-500" />
            Built with React &amp; deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  )
}
