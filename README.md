# Team Tech Auto Electric — Website

Business website for **Team Tech Auto Electric**, an auto repair and electrical shop located at 2373 Bathgate Ave, The Bronx, NY. Built as a single-page, bilingual (English/Spanish) website focused on converting visitors into phone calls.

---

## Live Business Info
https://webdesign-multimedia.github.io/HTML_CSS_JS/TeamTech/
| | |
|---|---|
| **Phone 1** | (718) 737-3036 — Ask for Walter |
| **Phone 2** | (718) 589-1505 |
| **Address** | 2373 Bathgate Ave, The Bronx, NY |
| **Email** | TeamTech2373@gmail.com |
| **Instagram** | @teamtech2373 |
| **Hours** | Mon–Sat: 8am–7pm |

---

## Pages & Sections

| Section | Description |
|---|---|
| **Top Bar** | Address, hours, phone, EN/ES language toggle |
| **Navigation** | Fixed navbar that follows the user while scrolling |
| **Hero** | Emergency-first headline ("Car Not Starting?"), two click-to-call buttons, animated particle background |
| **Services** | Two-panel layout — Diagnostics & Electrical (left) + Complete Mechanical (right), with $20 oil change highlight |
| **Promo Strip** | $20 oil change labor special call-out banner |
| **Reviews** | Auto-advancing testimonial slider with touch/swipe support |
| **Find Us** | Pulsing call cards, contact info rows, embedded Google Map |
| **Footer** | Full contact info, service links, Mexican flag accent |

---

## Technology Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, layout, animations, responsive design |
| **Vanilla JavaScript (ES6+)** | All interactivity — no frameworks or libraries |
| **CSS Custom Properties** | Site-wide color theming via variables |
| **CSS Grid & Flexbox** | Responsive two-column layouts |
| **CSS Keyframe Animations** | Preloader, pulsing buttons, scroll bounce, particle effects |
| **HTML5 Canvas API** | Animated particle network in the hero background |
| **IntersectionObserver API** | Scroll-triggered reveal animations |
| **localStorage API** | Remembers the user's chosen language between visits |
| **Google Fonts** | Oswald (headings) + Inter (body text) |
| **Font Awesome 6** | Icons throughout the site |
| **Google Maps Embed API** | Interactive map on the Find Us section |

---

## Key Features

### Bilingual Support (EN / ES)
Every piece of text on the page has both an English and Spanish version stored in `data-en` / `data-es` HTML attributes. Clicking the language toggle calls `applyLang()` in JavaScript, which swaps all `.t` elements instantly without reloading the page. The chosen language is saved to `localStorage` so it persists on return visits.

### Animated Hero Background
A `<canvas>` element sits behind the hero section. JavaScript draws and animates a network of floating particles (red, gold, and white) that connect with faint lines when close enough. The particle count scales based on screen size.

### Preloader
A gear-spin animation plays for ~1.8 seconds on first load, then fades out. Gives the browser time to load fonts and assets before revealing the page.

### Fixed Navigation
The navbar uses `position: fixed` so it remains visible at the top of the screen at all times as the user scrolls. Background opacity increases slightly after scrolling 60px for better readability over content.

### Review Slider
A touch-friendly testimonial carousel that auto-advances every 5 seconds. Supports swipe gestures on mobile. Dot indicators update to show the current slide. Adjusts how many cards are visible based on screen width (3 → 2 → 1).

### Scroll Reveal
Sections animate in as they enter the viewport using the `IntersectionObserver` API — no scroll event listeners needed.

---

## File Structure

```
TeamTech/
├── index.html    — Page structure and content
├── style.css     — All styles, variables, animations, responsive rules
├── script.js     — Preloader, language toggle, particles, slider, scroll effects
└── README.md     — This file
```

---

## Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--red` | `#CC1A1A` | Primary brand red, CTAs, accents |
| `--gold` | `#F0A300` | Highlights, icons, special items |
| `--green` | `#0D6E3A` | Mechanical section accent |
| `--bg` | `#07090F` | Main background |
| `--bg2` | `#0C0F1A` | Section alternating background |
| `--bg3` | `#111726` | Card backgrounds |
| `--text` | `#DDE3EE` | Body text |
| `--muted` | `#7A8599` | Secondary/muted text |

---

## Fonts

- **Oswald** — Headings, brand name, phone numbers, labels. Bold condensed style that matches the shop's flyer aesthetic.
- **Inter** — Body text, descriptions, all general copy. Clean and highly readable.

---

*Built with HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond Google Fonts and Font Awesome.*
