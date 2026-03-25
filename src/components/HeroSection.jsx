import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'

const ROLES = [
  'Software Engineer',
  'Technical Writer',
  'Open-Source Builder',
  'Problem Solver',
]

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function HeroSection() {
  const role = useTypewriter(ROLES)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      {/* Background orbs */}
      <div className="orb orb-violet w-[600px] h-[600px] -top-32 -left-32 opacity-[0.18]" />
      <div className="orb orb-cyan w-[500px] h-[500px] top-1/4 right-0 opacity-[0.14]" />
      <div className="orb orb-pink w-[400px] h-[400px] bottom-0 left-1/3 opacity-[0.10]" />

      <div className="section-container relative z-10 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={ITEM}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.div variants={ITEM}>
              <p className="text-slate-500 text-lg font-medium mb-2">Hello, I'm</p>
              <h1 className="font-display font-extrabold leading-tight" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
                <span className="gradient-text">Elsayed</span>
                <br />
                <span className="text-slate-100">Ahmed</span>
              </h1>
            </motion.div>

            <motion.div variants={ITEM} className="flex items-center gap-2 h-8">
              <span className="text-lg text-slate-300 font-medium">{role}</span>
              <span className="w-0.5 h-6 bg-violet-400 animate-blink" />
            </motion.div>

            <motion.p variants={ITEM} className="text-slate-400 text-base leading-relaxed max-w-lg">
              I write about software engineering, the craft of clean code, and the human side of building
              products. Occasionally, things that have nothing to do with computers.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={ITEM} className="flex flex-wrap gap-3 pt-2">
              <Link to="/blog" className="btn-primary">
                Read the Blog <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary">
                About Me
              </Link>
            </motion.div>

            {/* Social */}
            <motion.div variants={ITEM} className="flex items-center gap-4 pt-2">
              <span className="text-xs text-slate-600 uppercase tracking-wider">Find me on</span>
              {[
                { href: 'https://github.com/elsayedahmed', icon: Github },
                { href: 'https://twitter.com/elsayedahmed', icon: Twitter },
                { href: 'https://linkedin.com/in/elsayedahmed', icon: Linkedin },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <FloatingCodeCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FloatingCodeCard() {
  return (
    <div className="relative animate-float">
      {/* Glow */}
      <div className="absolute -inset-4 bg-violet-600/10 rounded-3xl blur-2xl" />

      <div className="relative card border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-dark-600/80 border-b border-white/[0.05]">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-slate-500 font-mono">index.tsx</span>
        </div>

        {/* Code */}
        <pre className="code-card p-5 text-[0.76rem] leading-[1.75]">
          <CodeLine n={1}>
            <span className="text-pink-400">import</span>
            <span className="text-slate-300"> &#123; useState &#125; </span>
            <span className="text-pink-400">from</span>
            <span className="text-emerald-400"> 'react'</span>
          </CodeLine>
          <CodeLine n={2}>{' '}</CodeLine>
          <CodeLine n={3}>
            <span className="text-pink-400">export default function</span>
            <span className="text-sky-400"> Portfolio</span>
            <span className="text-slate-300">() &#123;</span>
          </CodeLine>
          <CodeLine n={4}>
            <span className="text-slate-300">  </span>
            <span className="text-pink-400">const</span>
            <span className="text-slate-300"> [</span>
            <span className="text-orange-300">passion</span>
            <span className="text-slate-300">] = useState(</span>
            <span className="text-emerald-400">'code'</span>
            <span className="text-slate-300">)</span>
          </CodeLine>
          <CodeLine n={5}>{' '}</CodeLine>
          <CodeLine n={6}>
            <span className="text-slate-300">  </span>
            <span className="text-pink-400">return</span>
            <span className="text-slate-300"> (</span>
          </CodeLine>
          <CodeLine n={7}>
            <span className="text-slate-300">    &lt;</span>
            <span className="text-sky-400">div</span>
            <span className="text-slate-300">&gt;</span>
          </CodeLine>
          <CodeLine n={8}>
            <span className="text-slate-300">      </span>
            <span className="text-violet-300">Creative Engineer</span>
          </CodeLine>
          <CodeLine n={9}>
            <span className="text-slate-300">      &lt;</span>
            <span className="text-sky-400">p</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-emerald-400">&#123;passion&#125;</span>
            <span className="text-slate-300"> &amp; </span>
            <span className="text-emerald-400">craft</span>
            <span className="text-slate-300">&lt;/</span>
            <span className="text-sky-400">p</span>
            <span className="text-slate-300">&gt;</span>
          </CodeLine>
          <CodeLine n={10}>
            <span className="text-slate-300">    &lt;/</span>
            <span className="text-sky-400">div</span>
            <span className="text-slate-300">&gt;</span>
          </CodeLine>
          <CodeLine n={11}>
            <span className="text-slate-300">  )</span>
          </CodeLine>
          <CodeLine n={12}>
            <span className="text-slate-300">&#125;</span>
          </CodeLine>
        </pre>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-violet-600/20 border-t border-violet-500/20">
          <span className="text-[10px] text-violet-400 font-mono">TypeScript React</span>
          <span className="text-[10px] text-slate-500 font-mono">Ln 12, Col 1</span>
        </div>
      </div>
    </div>
  )
}

function CodeLine({ n, children }) {
  return (
    <div className="flex">
      <span className="line-num select-none">{n}</span>
      <span>{children}</span>
    </div>
  )
}
