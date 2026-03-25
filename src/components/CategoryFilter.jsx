import { CATEGORIES } from '../utils/helpers'

const ALL = { label: 'All', textClass: 'text-slate-300', bgClass: 'bg-white/[0.06] border-white/[0.1]', dotColor: '#94a3b8' }

export default function CategoryFilter({ selected, onChange, counts = {} }) {
  const options = [
    { key: 'all', ...ALL, count: Object.values(counts).reduce((a, b) => a + b, 0) },
    ...Object.entries(CATEGORIES).map(([key, cfg]) => ({ key, ...cfg, count: counts[key] || 0 })),
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ key, label, textClass, bgClass, dotColor, count }) => {
        const active = selected === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`category-badge transition-all duration-200 ${
              active
                ? `${bgClass} ${textClass} shadow-md`
                : 'text-slate-500 bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:text-slate-400'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: active ? dotColor : 'currentColor', opacity: active ? 1 : 0.4 }}
            />
            {label}
            <span className={`text-[10px] ml-0.5 ${active ? 'opacity-70' : 'opacity-40'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
