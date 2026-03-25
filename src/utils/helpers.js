// ── Slug ─────────────────────────────────────────────────────────────────────
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ── Reading time ──────────────────────────────────────────────────────────────
export function readingTime(markdown) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*`_~>\[\]]/g, '')
    .trim()
  const words = plain.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

// ── Date formatting ───────────────────────────────────────────────────────────
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ── TOC extraction from markdown ──────────────────────────────────────────────
export function extractHeadings(markdown) {
  const headings = []
  const lines = markdown.split('\n')
  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text  = match[2].replace(/[*`_]/g, '')
      const id    = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      headings.push({ level, text, id })
    }
  }
  return headings
}

// ── Category metadata ─────────────────────────────────────────────────────────
export const CATEGORIES = {
  tech: {
    label: 'Technology',
    textClass: 'text-sky-400',
    bgClass: 'bg-sky-400/10 border-sky-400/20',
    dotColor: '#38bdf8',
    gradient: 'from-sky-600/40 via-blue-700/30 to-indigo-700/40',
  },
  personal: {
    label: 'Personal',
    textClass: 'text-violet-400',
    bgClass: 'bg-violet-400/10 border-violet-400/20',
    dotColor: '#a78bfa',
    gradient: 'from-violet-600/40 via-purple-700/30 to-fuchsia-700/40',
  },
  career: {
    label: 'Career & Growth',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-400/10 border-orange-400/20',
    dotColor: '#fb923c',
    gradient: 'from-orange-600/40 via-amber-700/30 to-yellow-700/40',
  },
  tutorial: {
    label: 'Tutorial',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/10 border-emerald-400/20',
    dotColor: '#34d399',
    gradient: 'from-emerald-600/40 via-teal-700/30 to-cyan-700/40',
  },
  thoughts: {
    label: 'Thoughts',
    textClass: 'text-pink-400',
    bgClass: 'bg-pink-400/10 border-pink-400/20',
    dotColor: '#f472b6',
    gradient: 'from-pink-600/40 via-rose-700/30 to-red-700/40',
  },
}

export const ALL_CATEGORIES = Object.keys(CATEGORIES)
