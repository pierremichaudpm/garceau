# WORKING_LOG — Ski Garceau Site Été

## Session 2026-04-08

### Ce qui a été fait
- Setup complet Vite + React depuis le prototype JSX v2
- Hero carousel : 4 images (hero.webp, velo-tour-des-deux-lacs, donat_lac, hiking) avec ken burns et crossfade 3s
- Chatbot IA intégré dans le hero (glass-morphism), auto-close 5s desktop, fermé par défaut mobile, pulse animation sur le toggle
- Modals activités avec vrai contenu Saint-Donat (sentiers, distances, dénivelés, Ultra-Trail des Pionniers, Tour des Deux Lacs, Le Nordet, etc.)
- Modals services avec contenu réel (Boutique 365j/an, 4 bornes EV, Opération re-CYCLE, etc.)
- Carousel activités horizontal avec swipe touch, auto-rotate 5s, pause sur interaction/modal, infinite loop
- Section terrasse avec parallax léger au scroll
- Camp de base : textes en séquence staggerée au scroll
- Services : cellules en cascade staggerée
- Section headers : slide-in depuis la gauche
- Responsive mobile complet (4 breakpoints)
- Photos locales remplacent tous les placeholders Unsplash (sauf camp)
- Déployé sur Netlify via GitHub `pierremichaudpm/garceau`
- Proposition PDF rebrandée Studio Micho (SM-2026-GRC)

### Décisions techniques
- **Pas d'animation CSS pour le ken burns** — les `@keyframes` causaient des jerks au restart. Solution finale : `transition: transform 7s linear` sur `[data-active="true"]`, snap back `0s delay 3s` quand inactive. Zoom in only.
- **Positions images hero en CSS pur** — les inline styles `backgroundPosition` ne pouvaient pas être overridés par media queries. Déplacé en classes CSS `.hero-slide-N` avec `!important` dans le media query mobile.
- **Pas de scroll-snap natif pour le carousel activités** — causait un scroll incontrôlable sur mobile. Gardé `translateX` + touch events JS.
- **Reveal component avec forwardRef** — nécessaire pour passer le `actSectionRef` à travers le composant Reveal.
- **Palette bone plus beige** — changé de #f2efe9 à #ede8df pour plus de chaleur.

### Problèmes rencontrés
- Ken burns hero : multiples itérations (animations CSS → transitions CSS). Les animations avec `alternate` causaient du zoom out. Les `nth-child` ne matchaient pas les bons éléments quand overlay/inner étaient siblings. Résolu avec `data-active` + transitions pures.
- Inline `transform` dans le JSX empêchait les animations CSS de s'appliquer (spécificité inline > CSS).
- `scrollIntoView` sur les dots activités scrollait toute la page au load. Remplacé par `container.scrollTo`.
- Cache Vite dev server persistant — nécessitait `rm -rf node_modules/.vite` + restart.
- Media query mobile : les changements semblaient ne pas s'appliquer — souvent un problème de cache browser ou de spécificité CSS.

### Prochaines étapes
- Remplacer les dernières photos Unsplash (camp de base, terrasse) par des vraies
- Photos pour les modals activités (actuellement les mêmes que les cards)
- Intégrer un vrai chatbot IA (Claude API) au lieu du mock
- CMS headless (Decap, Sanity, ou autre)
- PWA : service worker, manifest, cache hors-ligne
- SEO : pages dédiées par activité, meta tags, sitemap
- Tester sur vrais devices mobiles (iPhone, Android)
- Ajustements après retour client (Stéphane Boulay / Pascale Dupuis)
