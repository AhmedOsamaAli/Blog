# Personal Blog — Elsayed Ahmed

A professional personal blog built with **React + Vite + Tailwind CSS**, deployable to **GitHub Pages** for free.

---

## Features

- **Professional dark UI** — violet/cyan gradient accents, glassmorphism cards, animated hero
- **5 sample blog posts** seeded with real markdown content across Tech, Career, Personal, Tutorial, and Thoughts categories
- **Category filtering + search** on the blog list page
- **Full markdown rendering** — GFM support, syntax-highlighted code blocks with copy button, table of contents
- **Admin dashboard** — password-protected CRUD (create / edit / delete / publish / draft)
- **Stateful persistence** — all posts saved in `localStorage`; session auth via `sessionStorage`
- **Page transitions** — smooth with Framer Motion
- **Mobile responsive** — hamburger nav, fluid grid
- **GitHub Pages ready** — HashRouter, zero server needed

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
```

Open `http://localhost:5173`.

---

## Admin Panel

Navigate to **`/#/admin`** in your browser.

- **First visit:** Set a password (stored as SHA-256 hash in localStorage). Must be ≥ 8 characters.
- **Subsequent visits:** Enter your password to unlock the dashboard.
- The session expires when you close the browser tab.

From the dashboard you can:
- Create new posts with a live markdown preview
- Edit existing posts
- Toggle published / draft status
- Delete posts (with confirmation)

---

## Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

Push this project to a new GitHub repository.

### Step 2 — Set the base path

Copy `.env.example` to `.env` and set `VITE_BASE_PATH` to your repo name:

```env
# For a project site: https://username.github.io/Blog/
VITE_BASE_PATH=/Blog/

# For a user site: https://username.github.io/
VITE_BASE_PATH=/
```

### Step 3 — Configure `package.json` homepage (optional)

Add to `package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO"
```

### Step 4 — Deploy

```bash
npm run deploy
```

This runs `vite build` then `gh-pages -d dist`, pushing the `dist/` folder to the `gh-pages` branch.

### Step 5 — Enable GitHub Pages

In your repository → **Settings → Pages**, set the source to the `gh-pages` branch, root `/`.

Your blog will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Customization Checklist

- [ ] Update name and bio in [src/pages/About.jsx](src/pages/About.jsx)
- [ ] Update social links in [src/components/Footer.jsx](src/components/Footer.jsx) and [src/components/HeroSection.jsx](src/components/HeroSection.jsx)
- [ ] Update meta description in [index.html](index.html)
- [ ] Replace sample posts via the Admin panel or edit [src/data/initialBlogs.js](src/data/initialBlogs.js)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Bundler | Vite |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Animation | Framer Motion |
| Routing | React Router DOM v6 (HashRouter) |
| Markdown | react-markdown + remark-gfm |
| Syntax | react-syntax-highlighter (One Dark) |
| Icons | lucide-react |
| Deploy | gh-pages |

---

## Project Structure

```
src/
├── App.jsx                   # Router + layout
├── context/
│   └── BlogContext.jsx       # Global state: posts CRUD + auth
├── data/
│   └── initialBlogs.js       # Seed blog posts
├── utils/
│   └── helpers.js            # slugify, readingTime, formatDate, CATEGORIES
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── BlogCard.jsx
│   ├── HeroSection.jsx
│   ├── CategoryFilter.jsx
│   ├── SearchBar.jsx
│   ├── ReadingProgress.jsx
│   ├── MarkdownRenderer.jsx
│   └── ScrollToTop.jsx
└── pages/
    ├── Home.jsx
    ├── BlogList.jsx
    ├── BlogDetail.jsx
    ├── About.jsx
    ├── Admin.jsx
    ├── BlogEditor.jsx
    └── NotFound.jsx
```

---

## License

MIT
