# CLAUDE.md — Ski Garceau Site Été

## Projet
Site été pour Ski Garceau, Saint-Donat. Prototype fonctionnel React/Vite déployé sur Netlify.
Repo : `pierremichaudpm/garceau` (GitHub, SSH)

## Stack
- **Frontend** : React 19 + Vite 8
- **CSS** : Vanilla CSS (App.css), pas de framework
- **Fonts** : DM Sans (body) + Space Mono (mono/labels)
- **Déploiement** : Netlify (auto-deploy depuis `main`)
- **Build** : `npm run build` → `dist/`

## Structure
```
site/
├── src/
│   ├── App.jsx          # Composant principal — tout le site
│   ├── App.css          # Tous les styles (desktop + mobile)
│   ├── index.css        # Variables CSS, reset, fonts
│   └── main.jsx         # Entry point React
├── public/              # Images (photos locales Saint-Donat)
├── netlify.toml         # Config Netlify (build, headers, redirects)
└── index.html           # Shell HTML
```

## Design
- **Palette** : bone (#ede8df), red Garceau (#E31937), ink (#1a1a1a)
- **Direction** : Éditorial outdoor, warm, pas corporate
- **Logo** : Logo Ski Garceau inchangé, rouge principal conservé

## Conventions
- Breakpoints mobile : 900px (tablet), 600px (phone), 380px (petit phone)
- Photos hero : positions desktop dans CSS classes `.hero-slide-N`, mobile dans media query `@media (max-width: 600px)`
- Ken burns hero : pure CSS transitions (pas d'animations), zoom in only, pas de zoom out
- Carousel activités : `translateX` contrôlé par state, touch swipe JS, auto-rotate 5s

## Proposition client
- PDF généré depuis `proposition.html` via Chrome headless `--print-to-pdf --no-pdf-header-footer`
- Branding Studio Micho (logo base64 inline dans le HTML)
- Référence : SM-2026-GRC
