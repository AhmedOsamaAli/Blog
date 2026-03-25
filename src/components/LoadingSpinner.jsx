export default function LoadingSpinner({ size = 'md', text, fullPage = false }) {
  const sizes = { sm: 'w-5 h-5 border', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-2' }

  const inner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-violet-600/30 border-t-violet-500 rounded-full animate-spin`} />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  )

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {inner}
      </div>
    )
  }
  return inner
}

// Card skeletons for blog lists
export function CardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-44 bg-white/[0.04]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/[0.04] rounded-lg w-1/4" />
        <div className="h-5 bg-white/[0.04] rounded-lg w-3/4" />
        <div className="h-4 bg-white/[0.04] rounded-lg w-full" />
        <div className="h-4 bg-white/[0.04] rounded-lg w-2/3" />
        <div className="flex gap-2 pt-1">
          <div className="h-3 bg-white/[0.04] rounded-full w-16" />
          <div className="h-3 bg-white/[0.04] rounded-full w-12" />
        </div>
      </div>
    </div>
  )
}
