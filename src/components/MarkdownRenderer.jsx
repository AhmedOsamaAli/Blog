import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : 'text'
  const code = String(children).replace(/\n$/, '')
  const isBlock = code.includes('\n') || match

  if (!isBlock) {
    return (
      <code className="px-1.5 py-0.5 bg-dark-600 text-cyan-400 rounded font-mono text-[0.85em]">
        {children}
      </code>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-7 rounded-xl overflow-hidden border border-white/[0.06] code-wrap">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-600/90 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="copy-btn flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.04]"
        >
          {copied
            ? <><Check size={13} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
            : <><Copy size={13} />Copy</>
          }
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={code.split('\n').length > 5}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.84rem',
          background: 'rgb(15 15 26)',
          padding: '1.2rem 1.25rem',
        }}
        lineNumberStyle={{ color: 'rgba(148,163,184,0.25)', minWidth: '2.5em' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

const customComponents = {
  code: CodeBlock,
  a({ href, children }) {
    const external = href?.startsWith('http')
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-violet-400 hover:text-violet-300 transition-colors"
      >
        {children}
      </a>
    )
  },
  img({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-2xl w-full object-cover shadow-2xl shadow-black/30 my-8"
        loading="lazy"
      />
    )
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-violet-500 bg-violet-500/[0.06] rounded-r-2xl px-6 py-4 my-6 not-italic">
        {children}
      </blockquote>
    )
  },
  h2({ children }) {
    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return <h2 id={id} className="scroll-mt-24">{children}</h2>
  },
  h3({ children }) {
    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return <h3 id={id} className="scroll-mt-24">{children}</h3>
  },
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-invert prose-blog max-w-none
      prose-lg
      prose-headings:font-display prose-headings:tracking-tight
      prose-p:text-slate-300 prose-p:leading-[1.85]
      prose-li:text-slate-300 prose-li:leading-relaxed
      prose-strong:text-slate-200 prose-strong:font-semibold
      prose-hr:border-white/[0.06] prose-hr:my-10
      prose-table:text-sm
      prose-th:text-slate-300 prose-td:text-slate-400
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
