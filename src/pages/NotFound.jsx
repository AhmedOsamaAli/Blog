import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <span className="font-display font-extrabold text-[8rem] leading-none
            bg-gradient-to-br from-violet-600/20 to-cyan-600/20 bg-clip-text text-transparent
            select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold text-[8rem] leading-none
              bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent
              blur-2xl opacity-30 select-none">
              404
            </span>
          </div>
        </div>

        <h1 className="font-display font-bold text-2xl text-slate-200 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/blog" className="btn-secondary">Browse Posts</Link>
        </div>
      </div>
    </motion.div>
  )
}
