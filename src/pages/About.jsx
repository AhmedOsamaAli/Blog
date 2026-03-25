import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, MapPin, Coffee, Zap, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const PAGE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.35 },
}

const SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Python',
  'System Design', 'Cloud (Azure/AWS)', 'CI/CD', 'PostgreSQL',
]

const INTERESTS = [
  { icon: Coffee, label: 'Coffee snob (pour-over, always)' },
  { icon: BookOpen, label: 'Reading: philosophy & sci-fi' },
  { icon: Zap, label: 'Open-source contributions' },
  { icon: MapPin, label: 'Cairo, Egypt 🇪🇬' },
]

const SOCIAL = [
  { href: 'https://github.com/elsayedahmed', icon: Github, label: 'GitHub',   handle: '@elsayedahmed'  },
  { href: 'https://twitter.com/elsayedahmed', icon: Twitter, label: 'Twitter', handle: '@elsayedahmed' },
  { href: 'https://linkedin.com/in/elsayedahmed', icon: Linkedin, label: 'LinkedIn', handle: 'Elsayed Ahmed' },
  { href: 'mailto:hi@elsayed.dev', icon: Mail, label: 'Email', handle: 'hi@elsayed.dev' },
]

export default function About() {
  return (
    <motion.div {...PAGE} className="pt-28 pb-24">
      <div className="section-container max-w-4xl">

        {/* Hero */}
        <div className="flex flex-col sm:flex-row gap-10 items-start mb-16">
          {/* Avatar — gradient placeholder */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl
              bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500
              flex items-center justify-center text-5xl font-display font-bold text-white
              shadow-2xl shadow-violet-500/20">
              EA
            </div>
            {/* Online dot */}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-dark-900 shadow-md" />
          </div>

          {/* Intro */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-2 block">About me</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 mb-1">
              Elsayed Ahmed
            </h1>
            <p className="text-slate-400 text-base mb-4 font-medium">Software Engineer · Technical Writer · Builder</p>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-5">
              <MapPin size={13} className="text-slate-600" />
              Cairo, Egypt
            </div>

            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                    bg-white/[0.04] hover:bg-white/[0.08]
                    border border-white/[0.06] hover:border-violet-500/30
                    text-slate-500 hover:text-violet-400
                    transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <section className="mb-14">
          <h2 className="section-title text-xl mb-5">My Story</h2>
          <div className="space-y-4 text-slate-400 leading-[1.9] text-base">
            <p>
              I'm a software engineer with a passion for building things that matter and explaining
              concepts clearly. I started writing code as a teenager — mostly break-fix scripts and
              small web experiments — and never really stopped. What began as curiosity turned into a
              career, and then into a craft I genuinely love.
            </p>
            <p>
              Over the years I've worked across the stack — from React frontends and Node.js APIs to
              cloud infrastructure and performance engineering. But the constant thread has been a
              love of clarity: clean code, clear writing, honest communication.
            </p>
            <p>
              This blog is where I think out loud. About software, about building products, about
              the strange and rewarding experience of being a human who spends a significant portion
              of their life telling computers what to do.
            </p>
          </div>
        </section>

        {/* Two columns: skills + interests */}
        <div className="grid sm:grid-cols-2 gap-8 mb-14">
          {/* Skills */}
          <div>
            <h2 className="section-title text-xl mb-5">What I Work With</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <span key={skill}
                  className="text-sm text-slate-300 bg-white/[0.04] border border-white/[0.06]
                  hover:border-violet-500/20 hover:text-violet-300 px-3.5 py-1.5 rounded-xl
                  transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h2 className="section-title text-xl mb-5">Outside of Code</h2>
            <ul className="space-y-3">
              {INTERESTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.05]
                    flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-violet-400" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Currently */}
        <section className="card p-6 mb-14">
          <h2 className="section-title text-lg mb-4">Currently</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              Building products and writing about the lessons along the way
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
              Deep-diving into distributed systems and LLM tooling
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
              Exploring the intersection of AI and developer productivity
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center py-12 card">
          <h2 className="section-title text-xl mb-3">Let's Connect</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Whether it's a collaboration, a question, or just to say hi —
            I'm always happy to hear from people who build things.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIAL.map(({ href, icon: Icon, label, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                  bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]
                  hover:border-violet-500/20 text-slate-400 hover:text-violet-300 transition-all"
              >
                <Icon size={14} />{handle}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link to="/blog" className="btn-primary">
            Read the Blog →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
