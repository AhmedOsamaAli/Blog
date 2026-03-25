-- ══════════════════════════════════════════════════════════
-- Personal Blog — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ══════════════════════════════════════════════════════════

create table if not exists posts (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        unique not null,
  excerpt      text        default '',
  content      text        default '',
  category     text        default 'tech',
  tags         text[]      default '{}',
  cover_image  text        default '',
  published    boolean     default false,
  featured     boolean     default false,
  reading_time int         default 1,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Auto-update updated_at on every row update ───────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on posts;

create trigger set_updated_at
  before update on posts
  for each row
  execute function handle_updated_at();

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table posts enable row level security;

-- Anyone (public) can read published posts
create policy "Public: read published posts" on posts for
select using (published = true);

-- Authenticated users (you, the admin) can read ALL posts (including drafts)
create policy "Admin: read all posts" on posts for
select to authenticated using (true);

-- Only authenticated users can create / edit / delete
create policy "Admin: insert posts" on posts for
insert
    to authenticated
with
    check (true);

create policy "Admin: update posts" on posts for
update to authenticated using (true);

create policy "Admin: delete posts" on posts for delete to authenticated using (true);