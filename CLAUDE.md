# Stonehouse Holdings — Design Reference

## Project Overview
- **Company:** Stonehouse Holdings (transport & logistics, founded 2024)
- **Owner:** Reino Fourie
- **Email:** info@stonehouseltd.co.za | Phone: 064 559 8007
- **Framework:** Next.js 15, React 19, `output: 'export'` (static site — no server-side API routes)
- **Hosting:** Firebase Hosting via GitHub Actions CI/CD (auto-deploys on push to `main`)
- **Repo:** https://github.com/Reino221/stonehousewebsite

---

## Design System

### Colour Palette
| Token | Value | Usage |
|---|---|---|
| Gold primary | `#C99700` | Labels, accents, borders |
| Gold bright | `#FFD700` | Gradient end, highlights, active nav |
| Gold gradient | `linear-gradient(135deg, #C99700 0%, #FFD700 100%)` | Buttons, headings |
| Gold gradient (90°) | `linear-gradient(90deg, #C99700, #FFD700)` | Logo text, nav active |
| Silver gradient | `linear-gradient(90deg, #C0C0C0, #888888)` | "Holdings" in navbar logo |
| Navy dark | `#1D2A35` | Navbar, CTA section bg, button text |
| Navy darker | `#0d1620` | CTA gradient end |
| Dark bg 1 | `#131b25` | Dark-mode page background (About section) |
| Dark bg 2 | `#181d23` | Dark-mode page background (Divisions, Contact) |
| Dark bg 3 | `#232b36` | Dark-mode cards |
| Dark card border | `#3a4248` | Dark-mode card borders |
| Dark nav border | `#223044` | Navbar bottom border |
| Dark input bg | `#1a2330` | Dark-mode form inputs |
| Dark text | `#e0e0e0` | Dark-mode body text |
| Muted text | `#b0bec5` | Dark-mode secondary text |
| Light bg | `#f4f6f9` | Light-mode section background (Why Choose Us) |
| Light card bg | `#ffffff` | Light-mode cards |
| Light text | `#4a5568` | Light-mode body text |
| Text dark | `#1D2A35` | Light-mode headings |
| Green accent | `#34D399` | Agriculture division colour |
| Orange accent | `#C97B2A` | Minerals division colour |

### Typography
- Font: inherited (system/browser default, `fontFamily: 'inherit'` on inputs)
- Hero heading: `clamp(2.4rem, 6vw, 4.5rem)`, weight 900, letter-spacing `-0.02em`
- Section headings (h2): `clamp(1.8rem, 4vw, 2.8rem)`, weight 900, letter-spacing `-0.02em`
- Section labels (eyebrow): `0.85rem`, weight 700, `letterSpacing: '0.14em'`, uppercase, colour `#C99700`
- Card headings (h3): `1.05rem`–`1.35rem`, weight 700–800
- Body text: `1.1rem`, `lineHeight: 1.85`
- Contact page title: `3.5rem`, weight 800
- Page title (contact/info h2): `1.2rem`, weight 700, `letterSpacing: 0.5`

### Buttons
```js
// Primary (gold gradient)
{
  background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)',
  color: '#1D2A35',
  border: 'none',
  borderRadius: 50,          // pill shape
  padding: '0.9rem 2.6rem',
  fontWeight: 700,
  fontSize: '1.05rem',
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(200,160,0,0.3)',
}
// Hover: opacity 0.88

// Secondary (ghost/outline on dark bg)
{
  background: 'transparent',
  color: '#fff',
  border: '2px solid rgba(255,255,255,0.55)',
  borderRadius: 50,
  padding: '0.9rem 2.6rem',
  fontWeight: 700,
  fontSize: '1.05rem',
}
// Hover: borderColor '#FFD700', color '#FFD700'
```

### Form Inputs
```js
const inputStyle = (theme) => ({
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: theme === 'dark' ? '1.5px solid #FFD700' : '1.5px solid #d1d5db',
  background: theme === 'dark' ? '#1a2330' : '#f9fafb',
  color: theme === 'dark' ? '#e0e0e0' : '#1D2A35',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
});
```

### Cards
```js
// Standard info card (dark mode)
{
  background: theme === 'dark' ? '#232b36' : '#fff',
  borderRadius: 16,
  padding: '2rem 1.5rem',
  boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(0,0,0,0.07)',
  border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #ebebeb',
}

// Contact/form card
{
  background: theme === 'dark' ? 'rgba(34,48,68,0.97)' : 'rgba(255,255,255,0.97)',
  borderRadius: 18,
  boxShadow: theme === 'dark' ? '0 4px 24px rgba(200,200,0,0.10)' : '0 4px 24px rgba(0,0,0,0.08)',
  padding: '2.2rem 2.5rem',
  border: theme === 'dark' ? '1.5px solid #FFD700' : '1.5px solid #e7e7e7',
}

// Division video card (home page)
{
  borderRadius: 18,
  overflow: 'hidden',
  position: 'relative',
  minHeight: 340,
  boxShadow: '0 6px 28px rgba(0,0,0,0.18)',
  // gradient overlay: linear-gradient(to top, rgba(10,18,30,0.88) 40%, rgba(10,18,30,0.35) 100%)
}
```

---

## Layout & Structure

### Navbar (`components/MenuBar.js`)
- Fixed, `zIndex: 1200`, height ~`5.5rem` (accounts for padding)
- Background: `#1D2A35`, border-bottom: `1.5px solid #223044`
- Logo: image `public/stonehouse logo.jpg` + gradient text
- Menu items: Home, About, Contact (centred on desktop, hamburger on mobile)
- Mobile breakpoint: `<= 768px`
- Page title in navbar changes based on route (switch in `getPageTitle()`)

### App wrapper (`pages/_app.js`)
- `paddingTop: '5.5rem'` on content wrapper to account for fixed navbar
- Full-bleed hero sections must use `marginTop: '-5.5rem'` to pull up behind navbar

### Section padding
- Standard sections: `padding: '6rem 2rem'`
- Max content width: `maxWidth: 1100` (grids) or `maxWidth: 900` (text-heavy)

### Hero section (`pages/index.js`)
- `minHeight: '70vh'`, `marginTop: '-5.5rem'`, dark overlay `rgba(13,22,35,0.72)`
- Background image: `public/hero-bg.jpg.jpg` (double extension — macOS saved it this way)
- Content shifted up: `marginTop: '-4rem'` on inner div

---

## Pages

| Page | File | Notes |
|---|---|---|
| Home | `pages/index.js` | Landing page layout. Hero → About → Why Choose Us → Our Divisions → CTA |
| About | `pages/about.js` | 5 paragraphs, transport/logistics focus |
| Contact | `pages/contact.js` | Info card + Web3Forms contact form |
| Minerals | `pages/minerals.js` | Coal & Chrome trading page with quote request modal |
| Agriculture | `pages/agriculture.js` | Agriculture division page |
| Dashboard | `pages/dashboard.js` | User dashboard |
| Login | `pages/login.js` | Authentication |
| Signup | `pages/signup.js` | Registration |
| Profile | `pages/profile.js` | User profile |

### Removed pages
- `pages/store.js` — deleted, menu button removed
- Stonehouse Estates — removed from home page divisions

---

## Services / Divisions (Home Page)
```js
const services = [
  {
    name: 'Minerals & Resources',
    desc: 'Expert sourcing, processing, and trading of bulk minerals including coal and chrome, serving mining and industrial clients across Southern Africa.',
    video: '/Coal vid.mp4',
    route: '/minerals',
    color: '#C97B2A',
  },
  {
    name: 'Agriculture',
    desc: 'Agricultural supplies, fertilizers, and comprehensive farming solution services.',
    video: '/Agri vid.mp4',
    route: '/agriculture',
    color: '#34D399',
  },
];
```

---

## Email / Forms

### Web3Forms (contact form)
- API endpoint: `https://api.web3forms.com/submit`
- Access key: `3ab2c9fd-5aae-4fb3-ba33-adb5e0cf07b7`
- Delivers to: `info@stonehouseltd.co.za`
- Used because site is statically exported — no server-side API routes possible
- Form fields: name, email, phone, message
- States: `idle | sending | success | error`

---

## Deployment

### Push to GitHub (triggers auto-deploy to Firebase)
```bash
# Use PAT in push URL (token not persisted to config)
git push https://TOKEN@github.com/Reino221/stonehousewebsite.git main
```
- DO NOT use `git remote set-url` with token — it persists to `.git/config`
- DO NOT include `.github/workflows/` files in commits unless PAT has `workflow` scope

### Dev server
- Run from project directory: `npm run dev`
- Launcher: `/Users/reinofourie/Desktop/Start Stonehouse Dev.command`

---

## Public Assets
| File | Usage |
|---|---|
| `public/stonehouse logo.jpg` | Navbar logo |
| `public/hero-bg.jpg.jpg` | Homepage hero background (double extension) |
| `public/Coal vid.mp4` | Minerals division card video |
| `public/Agri vid.mp4` | Agriculture division card video |
