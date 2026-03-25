import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import HeroSection from '../components/HeroSection'
import BlogCard from '../components/BlogCard'
import { CardSkeleton } from '../components/LoadingSpinner'
import { CATEGORIES } from '../utils/helpers'

const PAGE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 },
}

export default function Home() {
  const { publishedPosts, loading } = useBlog()
  const posts    = publishedPosts()
  const featured = posts.filter(p => p.featured).slice(0, 3)
  const latest   = posts.filter(p => !p.featured).slice(0, 6)

  return (
    <motion.div {...PAGE}>
      <HeroSection />

      {/* Featured */}
      {(loading || featured.length > 0) && (
        <section className="py-20">
          <div className="section-container">
            <SectionHeader
              label="Featured"
              title="Handpicked Reads"
              desc="Posts I'm proud of — polished, researched, and worth your time."
            />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
                : featured.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Latest */}
      {latest.length > 0 && (
        <section className="py-16">
          <div className="section-container">
            <div className="flex items-end justify-between mb-10">
              <SectionHeader
                label="Recent"
                title="Latest Posts"
                desc="Fresh thoughts, raw and recent."
              />
              <Link to="/blog" className="btn-ghost hidden sm:flex">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
            </div>
            <div className="mt-10 text-center sm:hidden">
              <Link to="/blog" className="btn-secondary">View all posts <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="section-container">
          <SectionHeader
            label="Topics"
            title="Explore by Category"
            desc="Every post lives somewhere. Find the ones that speak to you."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(CATEGORIES).map(([key, cfg]) => {
              const count = posts.filter(p => p.category === key).length
              return (
                <Link
                  key={key}
                  to={`/blog?category=${key}`}
                  className="group card card-hover p-5 flex flex-col gap-3 text-center"
                >
                  <span
                    className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-xl"
                    style={{ background: cfg.bgClass.split(' ')[0].replace('bg-', '').replace('[', '').replace(']', '') }}
                  >
                    <Layers size={18} style={{ color: cfg.dotColor }} />
                  </span>
                  <div>
                    <p className={`text-sm font-semibold ${cfg.textClass}`}>{cfg.label}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{count} post{count !== 1 ? 's' : ''}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function SectionHeader({ label, title, desc }) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-2 block">{label}</span>
      <h2 className="section-title text-2xl lg:text-3xl">{title}</h2>
      {desc && <p className="text-slate-500 text-sm mt-2 max-w-lg">{desc}</p>}
    </div>
  )
}
