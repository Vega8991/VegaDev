# VEGA8991 — Portfolio

My personal portfolio. Brutalist design, bilingual (EN/ES), light/dark theme. Monorepo with a React frontend and a small Express backend that handles the contact form.

---

## What it is

A single-page portfolio with five sections: Home, Work, Path, Stack, and Contact. No external router — navigation runs on a custom hash-based hook. A floating tweaks panel (⚙) lets visitors switch language and theme at runtime without reloading.

The backend handles contact form submissions through Nodemailer with rate limiting (5 requests per 15 min per IP).

---

## Stack

| | |
|---|---|
| UI | React 19 |
| Build | Vite 8 |
| Tests | Vitest + Testing Library |
| Styles | Vanilla CSS (brutalist) |
| Fonts | Space Grotesk + Space Mono |
| Backend | Express 5 + Nodemailer |

---

## Structure

```
frontend/
  src/
    config.js          ← personal info and defaults
    App.jsx            ← routing, theme, i18n wiring
    index.css          ← all styles and CSS custom properties

    components/        ← Nav, Footer, Marquee, Slider, PageCurtain,
                          Reveal (scroll animation), TweaksPanel
    pages/             ← HomePage, WorkPage, PathPage, StackPage, ContactPage
    data/              ← projects.js, routes.js
    hooks/             ← useRoute.js (custom hash router)
    i18n/              ← translations.js (EN + ES), LangContext.jsx

backend/
  server.js            ← Express app with CORS and rate limiting
  routes/contact.js    ← contact form handler (Nodemailer)
```

---

## Pages

| Route | Page |
|---|---|
| `#/` | Home |
| `#/work` | Work |
| `#/path` | Career path |
| `#/stack` | Technologies |
| `#/contact` | Contact |

---

## License

MIT
