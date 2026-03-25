import { createClient } from '@supabase/supabase-js'

export const isConfigured =
  !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

export const supabase = isConfigured
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
    )
  : null

// ── Row (snake_case DB) ↔ Post (camelCase app) ─────────────────────────────
export const toPost = (row) => ({
  id:          row.id,
  title:       row.title,
  slug:        row.slug,
  excerpt:     row.excerpt      ?? '',
  content:     row.content      ?? '',
  category:    row.category     ?? 'tech',
  tags:        row.tags         ?? [],
  coverImage:  row.cover_image  ?? '',
  published:   row.published    ?? false,
  featured:    row.featured     ?? false,
  readingTime: row.reading_time ?? 1,
  createdAt:   row.created_at,
  updatedAt:   row.updated_at,
})

export const toRow = (post) => ({
  title:        post.title,
  slug:         post.slug,
  excerpt:      post.excerpt     ?? '',
  content:      post.content     ?? '',
  category:     post.category    ?? 'tech',
  tags:         post.tags        ?? [],
  cover_image:  post.coverImage  ?? '',
  published:    post.published   ?? false,
  featured:     post.featured    ?? false,
  reading_time: post.readingTime ?? 1,
})
