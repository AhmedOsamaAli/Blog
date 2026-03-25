import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(docH > 0 ? Math.min(100, (scrollTop / docH) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className="reading-progress" style={{ width: `${progress}%` }} />
}
