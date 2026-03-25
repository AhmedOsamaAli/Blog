import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { initialBlogs } from '../data/initialBlogs'
import { supabase, isConfigured, toPost, toRow } from '../lib/supabase'

const BlogContext = createContext(null)

// ── localStorage keys (used only in offline/fallback mode) ───────────────────
const POSTS_KEY    = 'pb_posts'
const SESSION_KEY  = 'pb_admin_auth'
const HASH_KEY     = 'pb_admin_hash'
const LOCKOUT_KEY  = 'pb_lockout'

const MAX_ATTEMPTS    = 5
const LOCKOUT_MS      = 15 * 60 * 1000  // 15 minutes
const PBKDF2_ITERS    = 100_000

export function BlogProvider({ children }) {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [isAdmin, setIsAdmin]   = useState(false)

  // Only relevant in offline mode (no Supabase)
  const [hasPassword, setHasPassword] = useState(
    () => !isConfigured && !!localStorage.getItem(HASH_KEY)
  )

  // ── Load posts ─────────────────────────────────────────────────────────────
  const loadPosts = useCallback(async () => {
    if (!isConfigured) {
      try {
        const stored = localStorage.getItem(POSTS_KEY)
        setPosts(stored ? JSON.parse(stored) : initialBlogs)
      } catch {
        setPosts(initialBlogs)
      }
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      if (data.length > 0) {
        setPosts(data.map(toPost))
      } else {
        // Supabase is empty — seed initial posts into DB so CRUD works properly
        const rows = initialBlogs.map(p => toRow(p))
        const { data: seeded } = await supabase
          .from('posts')
          .insert(rows)
          .select()
        if (seeded) setPosts(seeded.map(toPost))
        else setPosts([])
      }
    } else {
      setPosts([])
    }
    setLoading(false)
  }, [])

  // ── Bootstrap auth + posts ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isConfigured) {
      setIsAdmin(sessionStorage.getItem(SESSION_KEY) === '1')
      loadPosts()
      return
    }

    // Supabase: check existing session, then subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
      loadPosts()
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAdmin(!!session)
        loadPosts()
      }
    )
    return () => subscription.unsubscribe()
  }, [loadPosts])

  // Persist posts to localStorage in offline mode
  useEffect(() => {
    if (!isConfigured && !loading && posts.length > 0) {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
    }
  }, [posts, loading])

  // ── Offline-mode auth helpers ──────────────────────────────────────────────

  // PBKDF2-based password hashing — saltHex is a 32-char hex string (16 bytes)
  const hashPass = async (pw, saltHex) => {
    const enc = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(pw), { name: 'PBKDF2' }, false, ['deriveBits']
    )
    const saltBytes = new Uint8Array(saltHex.match(/.{2}/g).map(h => parseInt(h, 16)))
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: PBKDF2_ITERS },
      keyMaterial, 256
    )
    return Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const setupPassword = async (pw) => {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16))
    const saltHex = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('')
    const h = await hashPass(pw, saltHex)
    localStorage.setItem(HASH_KEY, `${saltHex}:${h}`)
    setHasPassword(true)
    sessionStorage.setItem(SESSION_KEY, '1')
    setIsAdmin(true)
  }

  // ── Brute-force lockout helpers ────────────────────────────────────────────
  const getLockout = () => {
    try { return JSON.parse(localStorage.getItem(LOCKOUT_KEY)) ?? { failures: 0, until: 0 } }
    catch { return { failures: 0, until: 0 } }
  }

  const recordFailure = () => {
    const state = getLockout()
    const failures = Date.now() < state.until ? state.failures + 1 : 1
    const until    = failures >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : state.until
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ failures, until }))
    return failures >= MAX_ATTEMPTS ? Math.ceil(LOCKOUT_MS / 60000) : null
  }

  // ── Unified login ──────────────────────────────────────────────────────────
  // Supabase mode: { email, password }
  // Offline mode:  { password }
  const login = async ({ email = '', password = '' }) => {
    if (!isConfigured) {
      // Enforce lockout
      const lockout = getLockout()
      if (Date.now() < lockout.until) {
        const mins = Math.ceil((lockout.until - Date.now()) / 60000)
        return { error: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? 's' : ''}.` }
      }

      const stored = localStorage.getItem(HASH_KEY)

      // Migrate old unsalted SHA-256 hashes — force password reset
      if (stored && !stored.includes(':')) {
        localStorage.removeItem(HASH_KEY)
        setHasPassword(false)
        return { error: 'Your password needs to be reset (security upgrade). Please set a new password.' }
      }

      if (!stored) return { error: 'No password set.' }

      const [saltHex, storedHash] = stored.split(':')
      const h = await hashPass(password, saltHex)
      if (h === storedHash) {
        localStorage.removeItem(LOCKOUT_KEY)
        sessionStorage.setItem(SESSION_KEY, '1')
        setIsAdmin(true)
        return { error: null }
      }

      const lockedMins = recordFailure()
      if (lockedMins) return { error: `Too many failed attempts. Locked for ${lockedMins} minutes.` }
      return { error: 'Incorrect password.' }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const logout = async () => {
    if (!isConfigured) {
      sessionStorage.removeItem(SESSION_KEY)
      setIsAdmin(false)
      return
    }
    await supabase.auth.signOut()
    // isAdmin updated via onAuthStateChange subscription
  }

  // ── Blog accessors ─────────────────────────────────────────────────────────
  const publishedPosts = useCallback(
    () => posts
      .filter(p => p.published)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  )

  const getBySlug = useCallback(
    (slug) => posts.find(p => p.slug === slug),
    [posts]
  )

  const getById = useCallback(
    (id) => posts.find(p => p.id === id),
    [posts]
  )

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const createPost = async (data) => {
    if (!isConfigured) {
      const post = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPosts(prev => [post, ...prev])
      return { data: post, error: null }
    }

    const { data: row, error } = await supabase
      .from('posts')
      .insert([toRow(data)])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    const post = toPost(row)
    setPosts(prev => [post, ...prev])
    return { data: post, error: null }
  }

  const updatePost = async (id, data) => {
    if (!isConfigured) {
      setPosts(prev =>
        prev.map(p => p.id === id
          ? { ...p, ...data, updatedAt: new Date().toISOString() }
          : p
        )
      )
      return { error: null }
    }

    const { data: row, error } = await supabase
      .from('posts')
      .update(toRow(data))
      .eq('id', id)
      .select()
      .single()

    if (error) return { error: error.message }
    setPosts(prev => prev.map(p => p.id === id ? toPost(row) : p))
    return { error: null }
  }

  const deletePost = async (id) => {
    if (!isConfigured) {
      setPosts(prev => prev.filter(p => p.id !== id))
      return { error: null }
    }

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) return { error: error.message }
    setPosts(prev => prev.filter(p => p.id !== id))
    return { error: null }
  }

  const togglePublished = async (id) => {
    const post = posts.find(p => p.id === id)
    if (!post) return { error: 'Post not found' }
    return updatePost(id, { ...post, published: !post.published })
  }

  return (
    <BlogContext.Provider value={{
      posts,
      loading,
      isAdmin,
      isConfigured,
      hasPassword,        // offline mode only
      publishedPosts,
      getBySlug,
      getById,
      createPost,
      updatePost,
      deletePost,
      togglePublished,
      setupPassword,      // offline mode only
      login,
      logout,
    }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error('useBlog must be used within <BlogProvider>')
  return ctx
}
