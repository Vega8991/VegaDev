# VEGA8991 — Portfolio

Personal portfolio built with React + Vite. Brutalist design, bilingual (EN/ES), light/dark theme, and a custom hash router with no external routing dependencies.

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 19 |
| Build | Vite 8 |
| Styles | Vanilla CSS (brutalist) |
| Fonts | Space Grotesk + Space Mono |
| Lint | ESLint + react-hooks |

---

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
  config.js          ← personal info and defaults (start here)
  App.jsx            ← root: routing, theme, i18n
  main.jsx           ← entry point
  index.css          ← all styles

  components/
    Nav.jsx
    Footer.jsx
    Marquee.jsx
    Reveal.jsx         ← scroll animation (IntersectionObserver)
    PageCurtain.jsx    ← page transition overlay
    Slider.jsx         ← featured projects carousel
    TweaksGearButton.jsx
    TweaksPanel.jsx    ← floating theme/language panel

  pages/
    HomePage.jsx
    WorkPage.jsx
    PathPage.jsx
    StackPage.jsx
    ContactPage.jsx

  data/
    projects.js        ← your projects
    routes.js          ← nav routes

  hooks/
    useRoute.js        ← custom hash router

  i18n/
    translations.js    ← all copy in EN + ES
    LangContext.jsx    ← language context
```

---

## Customisation

### 1. Personal info — `src/config.js`

```js
export const owner = {
  name:  'YourName',
  email: 'you@email.com',
  github: {
    url:    'https://github.com/yourusername',
    handle: '@yourusername',
  },
  linkedin: {
    url:    'https://www.linkedin.com/in/yourusername/',
    handle: 'in/yourusername',
  },
};

export const defaults = {
  theme: 'dark',   // 'light' | 'dark'
  lang:  'en',     // 'en' | 'es'
};
```

### 2. Projects — `src/data/projects.js`

Each project object:

```js
{
  id:       'my-project',    // key — must match translations.projects
  num:      '01',
  year:     '2025',
  stack:    ['React', 'Node'],
  github:   'https://github.com/...',
  demo:     'https://...',   // '#' if no live demo
  featured: true,            // shows in the home slider
  glyph:    'M/P',           // large text shown as image placeholder
}
```

Project copy (title, description, role) lives in `src/i18n/translations.js` under `projects`, keyed by the same `id`.

### 3. Copy and bio — `src/i18n/translations.js`

All visible text: titles, bio, section copy, nav labels, footer, form error messages — in both EN and ES. Each section is marked with a comment (`// home`, `// work`, etc.).

### 4. Styles — `src/index.css`

CSS custom properties in `:root` and `[data-theme="dark"]`:

```css
:root {
  --accent: #ff5a1f;   /* brand accent colour */
  --bg:     #f4eee4;
  --fg:     #0a0a0a;
  /* ... */
}
```

---

## Routes

| Hash | Page |
|---|---|
| `#/` | Home |
| `#/work` | Work |
| `#/path` | Path |
| `#/stack` | Stack |
| `#/contact` | Contact |

The router lives in `src/hooks/useRoute.js` — no react-router, no extra dependencies.

---

## Tweaks panel

The gear icon (⚙) in the bottom-right corner opens a floating panel to switch theme and language at runtime. Initial defaults are set in `src/config.js` → `defaults`.

---

## License

MIT — use it, fork it, make it yours.
