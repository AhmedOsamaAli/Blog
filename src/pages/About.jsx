import { motion } from 'framer-motion'
import { Github, Facebook, Linkedin, Mail, Globe, MapPin, Trophy, Zap, Code } from 'lucide-react'
import { Link } from 'react-router-dom'

const PAGE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.35 },
}

const SKILLS = [
  'Python', 'TypeScript', 'C/C++', 'Kotlin',
  'React', 'Node.js', 'Go', 'FastAPI',
  'PostgreSQL', 'Docker', 'Azure', 'Neo4j',
]

const INTERESTS = [
  { icon: Trophy, label: 'Competitive programming — 4000+ problems solved' },
  { icon: Code, label: '3x ICPC Regionalist · EOI Bronze Medalist' },
  { icon: Zap, label: 'Open-source builder & ACM ICPC coach' },
  { icon: MapPin, label: 'Cairo, Egypt 🇪🇬' },
]

const SOCIAL = [
  { href: 'https://github.com/AhmedOsamaAli',           icon: Github,   label: 'GitHub',    handle: '@AhmedOsamaAli'          },
  { href: 'https://www.facebook.com/AHMEDOSAMADIAB1/',  icon: Facebook, label: 'Facebook',  handle: 'Ahmed Osama'             },
  { href: 'https://www.linkedin.com/in/ahmedosamadiab/', icon: Linkedin, label: 'LinkedIn', handle: 'Ahmed Osama'             },
  { href: 'https://ahmedosamaali.github.io/Portfolio/', icon: Globe,    label: 'Portfolio', handle: 'Portfolio'               },
  { href: 'mailto:ahmedosamadiab@gmail.com',            icon: Mail,     label: 'Email',     handle: 'ahmedosamadiab@gmail.com' },
]

export default function About() {
  return (
    <motion.div {...PAGE} className="pt-28 pb-24">
      <div className="section-container max-w-4xl">

        {/* Hero */}
        <div className="flex flex-col sm:flex-row gap-10 items-start mb-16">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden
              ring-2 ring-violet-500/30
              shadow-2xl shadow-violet-500/20">
              <img
                src={`${import.meta.env.BASE_URL}me.jpg`}
                alt="Ahmed Osama"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-dark-900 shadow-md" />
          </div>

          {/* Intro */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-2 block">About me</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 mb-1">
              Ahmed Osama
            </h1>
            <p className="text-slate-400 text-base mb-4 font-medium">SWE @ Microsoft &middot; Ex-DFKI &middot; 2x ACPC</p>

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
              I'm a software engineer at Microsoft in Cairo, working on the Clarity analytics
              platform — the SDK that quietly powers data collection across 2M+ websites. Before
              that, I was an intern at the German Research Center for AI (DFKI) in Berlin, where I
              built the architecture for DORIAN, an intelligent discovery assistant, and completed
              my bachelor's thesis on AI-driven research tools.
            </p>
            <p>
              I graduated from the German International University (GIU) with a Bachelor's in
              Computer Science, majoring in Software Engineering — where I also led the ACM ICPC community.
            </p>
            <p>
              My background is in competitive programming — I'm a 3x ICPC Regionalist, earned a
              bronze medal at the Egyptian Olympiad in Informatics, and have solved 4000+ problems
              across Codeforces and LeetCode. That foundation shapes how I approach engineering:
              think precisely, optimize deliberately, and enjoy hard problems.
            </p>
            <p>
              This blog is where I write about what I'm building, learning, and thinking about —
              software internals, system design, AI tools, career lessons, and whatever else seems
              worth putting into words.
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
              Software Engineer at Microsoft — building reliable software at scale
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
              Exploring agentic systems and AI-assisted developer tooling
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
