export const initialBlogs = [
  {
    id: '1',
    title: 'The Art of Writing Clean Code That Stands the Test of Time',
    slug: 'art-of-writing-clean-code',
    excerpt:
      'Clean code is not about aesthetics — it is about empathy. Empathy for the developer who will read your code six months from now. That developer is almost certainly future you.',
    content: `## The Problem with "Working Code"

We have all heard it: *"If it ain't broke, don't fix it."* But in software, **working code** and **good code** are often miles apart. A codebase can be perfectly functional yet completely unmaintainable — a ticking technical debt bomb.

Clean code is not a luxury. It is a professional responsibility.

## What Does "Clean" Actually Mean?

Clean code is:

- **Readable** at a glance — not after ten minutes of archaeology
- **Intentional** — every name and every structure communicates purpose
- **Self-documenting** — comments explain *why*, not *what*
- **Testable** — small, focused functions with clear inputs and outputs

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

## The Core Principles

### 1. Meaningful Names

Naming is the hardest part of programming — and the most impactful.

\`\`\`javascript
// ❌ What does this do?
function calc(x, y, z) {
  return x * (1 - y) + z
}

// ✅ Self-documenting
function calculateDiscountedPrice(basePrice, discountRate, shippingCost) {
  return basePrice * (1 - discountRate) + shippingCost
}
\`\`\`

Names should answer three questions: *What is this? What does it do? Why does it exist?*

### 2. Functions That Do One Thing

The Single Responsibility Principle applies to functions too. A function should do **one thing**, do it well, and do it only.

\`\`\`javascript
// ❌ Three responsibilities in one function
function processUser(user) {
  if (!user.email) throw new Error('Email required')
  user.email = user.email.toLowerCase()
  database.save(user)
}

// ✅ Each function has a single, clear purpose
function validateUser(user) {
  if (!user.email) throw new Error('Email required')
}

function normalizeUser(user) {
  return { ...user, email: user.email.toLowerCase() }
}

function saveUser(user) {
  return database.save(user)
}
\`\`\`

### 3. Avoid Magic Numbers

Magic numbers make code mysterious. Named constants tell a story.

\`\`\`javascript
// ❌ What is 86400000?
if (Date.now() - lastLogin > 86400000) expireSession()

// ✅ Intent is immediately obvious
const ONE_DAY_MS = 24 * 60 * 60 * 1000
if (Date.now() - lastLogin > ONE_DAY_MS) expireSession()
\`\`\`

### 4. Keep It Flat — Avoid Deep Nesting

Deep nesting is a sign that your function is doing too much and your logic has not been fully decomposed.

\`\`\`javascript
// ❌ Arrow of doom
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.payment.verified) {
        for (const item of order.items) {
          // ...
        }
      }
    }
  }
}

// ✅ Guard clauses and early returns
function processOrder(order) {
  if (!order)                   return
  if (!order.items.length)      return
  if (!order.payment.verified)  return
  
  for (const item of order.items) {
    // ...
  }
}
\`\`\`

## The Bigger Picture

Writing clean code is a form of communication. When you write code, you are writing a message to a future reader. Six months from now, will that person — very likely you — understand exactly why a decision was made?

**Ask yourself these questions before committing:**

- Would a colleague understand this function in 30 seconds?
- Does the name tell the complete story?
- Is there anything that demands an explanatory comment?

## Conclusion

Clean code is not about perfection. It is about thoughtfulness and intent. Start small: improve one function name, extract one complex condition, replace one magic number. Over time, these habits compound into a codebase that makes you genuinely proud to work in.

The best code is the code that disappears — so clear, so obvious, that the reader never even notices it is there.`,
    category: 'tech',
    tags: ['programming', 'best-practices', 'software-engineering'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop',
    createdAt: '2025-11-10T09:00:00Z',
    updatedAt: '2025-11-10T09:00:00Z',
    readingTime: 7,
    published: true,
    featured: true,
  },
  {
    id: '2',
    title: 'From Imposter Syndrome to Quiet Confidence: My Journey in Tech',
    slug: 'imposter-syndrome-to-confidence',
    excerpt:
      'For the first two years of my career, I was convinced I would be "found out." Every code review felt like an interrogation. Every standup felt like a performance. Here is what changed.',
    content: `## The Four-Word Loop

For the first two years of my engineering career, a four-word sentence played on repeat: **"I don't belong here."**

Every PR I opened felt like broadcasting my ignorance. Every meeting where someone used an acronym I didn't know felt like a test I was quietly failing. I would nod along, then frantically Google the term the second the call ended.

I now know this feeling has a name: imposter syndrome. And I know it is almost universally shared among people in this industry — including people you deeply admire.

## What Imposter Syndrome Actually Is

Imposter syndrome is not humility. It is not even self-awareness. It is a **cognitive distortion** — a misfiring of pattern-matching that leads you to conclude you are the only fraud among a room of genuinely capable people.

The painful irony is that it tends to hit hardest the people who care the most, who are self-aware enough to know what they don't know yet. The least competent people in a room rarely feel like imposters. This phenomenon even has its own name: the **Dunning-Kruger effect**.

## The Shift That Changed Everything

Three things gradually shifted my relationship with that inner critic:

### 1. I Started Writing Publicly

The moment I published my first technical post — even though it only got twelve views, six of which were probably me — something changed. I was forced to articulate what I actually understood. The gaps in my knowledge became visible, manageable, and fixable.

Writing transformed "I don't know this" from a shameful secret into an actionable to-do item.

### 2. I Kept a "Wins" Document

I started a private document where I logged every problem I solved, every piece of code I was proud of, every time a teammate thanked me for help. The human brain is wired to over-index on negatives. This document was the antidote.

\`\`\`
✅ Solved the race condition that had been blocking the team for two weeks
✅ Refactored the auth module — PR approved with no change requests
✅ Junior engineer said my explanation of async/await actually made sense
\`\`\`

### 3. I Reframed "I Don't Know" as "I Don't Know Yet"

Language shapes thought. Saying "I don't know this" is a closed statement. Saying "I don't know this *yet*" is an open invitation.

The engineering people I admire most are the ones who say "great question, let me look into that" without the slightest embarrassment. Curiosity, not omniscience, is the mark of a great engineer.

## What I Tell Junior Engineers Now

When I mentor someone early in their career who is struggling with this, I tell them the same thing:

> The fact that you are questioning your competence is strong evidence that you are competent. Frauds do not typically lie awake worrying about whether they are actually good enough.

You were hired because someone capable looked at you and saw potential. Trust that judgment, especially on the days when you cannot trust your own.

## The Long Game

Imposter syndrome never fully disappears. Even now, after years in the industry, I occasionally feel it at the edges of a new challenge. But it no longer paralyzes me. It has become a signal rather than a sentence — a sign that I am working at the frontier of my knowledge, which is exactly where growth lives.

**The goal is not to silence the inner critic. The goal is to no longer be ruled by it.**`,
    category: 'career',
    tags: ['career', 'mindset', 'personal-growth'],
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop',
    createdAt: '2025-12-01T10:30:00Z',
    updatedAt: '2025-12-01T10:30:00Z',
    readingTime: 6,
    published: true,
    featured: true,
  },
  {
    id: '3',
    title: "Why I Write: The Case for a Developer's Public Journal",
    slug: 'why-i-write-developers-public-journal',
    excerpt:
      "Writing is the single highest-leverage habit I've built in my career. Not because people read it — but because writing forces a quality of thought that reading and watching never can.",
    content: `## Writing as a Mirror

There is a test I now apply to everything I think I understand: *Can I explain it clearly in writing?*

More often than I would like to admit, the answer is no. And that gap — the distance between "I get it" and "I can explain it" — is precisely where the real learning lives.

This is why I write.

## The Learning Multiplier

When you read a tutorial, you borrow someone else's understanding. When you watch a video, you follow their mental model. These are valuable. But when you write about what you have just learned, you are forced to construct your *own* model — to fill in every gap that passive consumption left untouched.

Richard Feynman understood this. His learning technique was built on one principle: if you cannot explain something simply, you do not understand it yet. Writing is that forced simplification.

## The Unexpected Benefits

I started writing without an audience. Here is what I discovered:

### 1. Notes Become Assets

Every post is a future reference. I have lost count of the times I have Googled a problem and found my own old post. Writing is building a personal knowledge base that compounds over years.

### 2. You Attract What You Publish

Writing publicly is one of the strangest and most powerful career moves I have made. Opportunities — collaborations, speaking invitations, job referrals — have come through things I wrote, not through cold applications. Your public writing is a sample of your thinking, accessible to anyone, at any time.

### 3. Teaching Solidifies Understanding

Nothing exposed the holes in my knowledge like trying to explain React's reconciliation algorithm from scratch. The questions a hypothetical reader would ask became questions I had to answer for myself first.

## What to Write About?

The most common objection: *"But who would want to read about what I know? It's all been covered already."*

Here is the thing about the internet: there are always people who are exactly one step behind you. Your "obvious" explanation might be the one that finally makes it click for someone. The perspective of a person who just learned something is often more useful than the perspective of an expert who forgot what confusion felt like.

Write about:

- What you built this week, and what surprised you
- A bug you spent three hours on (and what the fix was)
- A concept that confused you, explained the way you wish someone had explained it to you
- Your honest take on a technology you are learning

## The Compound Effect

The first few posts feel like shouting into a void. That is fine. The value of writing is not primarily in being read. It is in the thinking that writing demands. Every post is an investment in your own clarity, your own future reference library, and your ability to communicate ideas — the skill that separates good engineers from great ones.

**Start with honesty. Start with curiosity. Start with whatever you understood today that you did not understand yesterday.**

That is enough.`,
    category: 'personal',
    tags: ['writing', 'learning', 'developer-growth'],
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop',
    createdAt: '2025-12-20T08:00:00Z',
    updatedAt: '2025-12-20T08:00:00Z',
    readingTime: 5,
    published: true,
    featured: false,
  },
  {
    id: '4',
    title: 'React Performance Patterns: What Actually Moves the Needle',
    slug: 'react-performance-patterns',
    excerpt:
      'Most React performance advice is overly cautious: "wrap everything in useMemo!" The truth is more nuanced, and the patterns that actually matter are fewer than you think.',
    content: `## The Premature Optimisation Trap

The React ecosystem has a performance anxiety problem. Developers reach for \`useMemo\`, \`useCallback\`, and \`React.memo\` reflexively — before profiling, before measuring, before understanding what they are even optimizing.

Here is the hard truth: **most React apps do not have performance problems**. And for those that do, the fix is almost never "add more memoisation."

Let me walk you through the patterns that actually matter.

## 1. Understand Re-renders First

Before reaching for any optimization, you need to understand when React renders. A component re-renders when:

1. Its **state** changes
2. Its **props** change (by reference, not deep equality)
3. Its **parent** re-renders (unless memoised)
4. A **context** it consumes changes

Most performance bugs are caused by one of these. Profiling — not guessing — will tell you which.

\`\`\`jsx
// Use React DevTools Profiler or this to diagnose:
import { Profiler } from 'react'

<Profiler id="MyComponent" onRender={(id, phase, duration) => {
  console.log(\`\${id} (\${phase}): \${duration.toFixed(2)}ms\`)
}}>
  <MyComponent />
</Profiler>
\`\`\`

## 2. Move State Down

The single most impactful performance pattern requires zero additional APIs. Keep state as close to where it is used as possible.

\`\`\`jsx
// ❌ State high up — whole list re-renders on every keystroke
function ProductPage() {
  const [search, setSearch] = useState('')
  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <HeavyProductList /> {/* Re-renders with every keystroke */}
    </>
  )
}

// ✅ State pushed down — HeavyProductList is never affected
function ProductPage() {
  return (
    <>
      <SearchSection />   {/* owns its own state */}
      <HeavyProductList />
    </>
  )
}
\`\`\`

## 3. Memoize Correctly (and sparingly)

\`React.memo\` prevents a component from re-rendering when its **props have not changed by reference**.

\`\`\`jsx
// Only memo components that:
// 1. Render frequently
// 2. With the same props
// 3. AND rendering is genuinely expensive
const ExpensiveChart = React.memo(function ExpensiveChart({ data }) {
  // heavy computation or large DOM tree
  return <canvas ... />
})
\`\`\`

**When NOT to memo:** Simple components that render fast, or components that almost always receive new props anyway.

## 4. useMemo and useCallback: The Real Rules

\`\`\`jsx
// useMemo: only when the computation is genuinely expensive
const sortedData = useMemo(
  () => heavySort(data),  // e.g. sorting 10k items
  [data]
)

// useCallback: only when the function is a prop to a memoized child
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// ❌ This is just noise — no memoized child receives this
const handleInputChange = useCallback((e) => {
  setSearch(e.target.value)
}, [])  // unnecessary
\`\`\`

## 5. Virtualize Long Lists

If you are rendering hundreds or thousands of items, virtualization is your answer — not memoisation.

\`\`\`bash
npm install @tanstack/react-virtual
\`\`\`

\`\`\`jsx
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  })
  
  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={item.key} style={{ transform: \`translateY(\${item.start}px)\` }}>
            <Row data={items[item.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

## 6. Code Splitting with lazy()

Reduce initial bundle size by splitting large routes or components.

\`\`\`jsx
import { lazy, Suspense } from 'react'

const AdminDashboard = lazy(() => import('./AdminDashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboard />
    </Suspense>
  )
}
\`\`\`

## The Performance Checklist

Before adding any optimization:

1. **Profile first** — use React DevTools Profiler
2. **Identify the bottleneck** — is it render count or render duration?
3. **Apply the simplest fix** — state colocation beats memoization
4. **Measure again** — did it actually help?

Performance engineering is empirical, not intuitive. Let the profiler lead the way.`,
    category: 'tutorial',
    tags: ['react', 'javascript', 'performance', 'hooks'],
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=900&auto=format&fit=crop',
    createdAt: '2026-01-08T11:00:00Z',
    updatedAt: '2026-01-08T11:00:00Z',
    readingTime: 9,
    published: true,
    featured: true,
  },
  {
    id: '5',
    title: 'Deep Work in a Distracted World: A Developer\'s Playbook',
    slug: 'deep-work-developer-playbook',
    excerpt:
      'The ability to focus without distraction is becoming increasingly rare and increasingly valuable. For developers, this is both the bad news and the good news.',
    content: `## The Attention Economy's Collateral Damage

Software engineering is among the most cognitively demanding professions that exist. Writing correct, elegant, scalable systems requires holding enormous amounts of context in working memory simultaneously — and sustaining that state for hours.

Then your phone buzzes.

Then Slack pings.

Then someone schedules a meeting in the middle of your morning.

Then your concentration — along with the context it took twenty minutes to build — evaporates.

This is not a small problem.

## The Science of Context Switching

Research from Gloria Mark at UC Irvine found that it takes an **average of 23 minutes** to return to a task after an interruption. For developers working on complex problems, the cost is likely higher.

Deep work — Cal Newport's term for *cognitively demanding work done in a state of distraction-free concentration* — is not just a productivity preference. It is the precondition for the kind of work that actually matters.

## The Developer's Playbook

These are the practices that have made the most difference for me:

### 1. Time-Block the Morning

My most cognitively rich hours are 8–11am. I protect them unconditionally. No meetings. No Slack. No email. Just work on the one hardest problem.

This isn't about being difficult — it's about recognising that not all hours are equal, and scheduling accordingly.

\`\`\`
06:30  Wake, no phone
07:00  Exercise or walk
08:00  ─────────────────────── Deep Work Block ─────────────────────────
11:00  ─────────────────────────────────────────────────────────────────
11:00  Meetings, Slack, admin
13:00  Lunch
14:00  Lighter deep work or collaboration
17:00  Done
\`\`\`

### 2. Prepare the Night Before

Knowing *exactly* what you will work on when you sit down removes the decision-making tax from your most productive hours. Every evening, I write one sentence:

> "Tomorrow I will ______."

That is the ticket to the deep work session.

### 3. The Shutdown Ritual

Context doesn't stay at the office. A shutdown ritual signals to your brain that the workday is genuinely over. Mine:

1. Review tomorrow's one task
2. Close all tabs and apps
3. Write "Shutdown complete" in my journal

Sounds silly. Works surprisingly well.

### 4. Single-Tasking (Actually)

Multitasking is a myth. What we call multitasking is rapid task-switching — and it degrades the quality of each task performed. During a deep work session, there is exactly one thing open: the editor or the relevant documentation.

No browser tabs for Reddit "just in case."  
No Spotify playlist you have to curate mid-session.  
No phone face-up on the desk.

### 5. Measure Input, Not Output

Days feel productive when you are *busy*. But busyness and output are not the same thing. I track **deep work hours per day**, not tasks completed or lines of code written.

Currently aiming for four deep work hours per day. Most days I hit three. Some days, two. But having the metric keeps me honest.

## The Feedback Loop

The counterintuitive discovery: the more consistently you protect deep work, the more comfortable you become with being bored, with sitting with a hard problem, with *not* reaching for your phone as a reflex.

That tolerance — the ability to remain present with a difficult problem long enough for genuine understanding to emerge — is extraordinarily rare. And in a knowledge economy, it is worth whatever discomfort its cultivation requires.

**The engineers who produce the most meaningful work are not the ones with the best tools. They are the ones who have learned to think clearly, for long stretches, without interruption.**

That is a learnable skill. Start today.`,
    category: 'thoughts',
    tags: ['productivity', 'focus', 'habits', 'deep-work'],
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&auto=format&fit=crop',
    createdAt: '2026-02-14T07:30:00Z',
    updatedAt: '2026-02-14T07:30:00Z',
    readingTime: 6,
    published: true,
    featured: false,
  },
]
