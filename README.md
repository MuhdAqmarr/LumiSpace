# LumiSpace — Premium Venue Booking Marketplace

A cinematic, Awwwards-inspired multi-provider hall/venue booking marketplace built with Next.js, TypeScript, Tailwind CSS, GSAP, and Three.js.

![LumiSpace](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css) ![GSAP](https://img.shields.io/badge/GSAP-3-88CE02) ![Three.js](https://img.shields.io/badge/Three.js-r184-black?logo=three.js)

---

## ✨ Features

### Public Marketplace
- **Cinematic Homepage** — Editorial hero with Three.js golden particles, scroll-triggered animations, magnetic CTAs
- **Venue Search & Browsing** — Filter by location, event type, capacity
- **Venue Detail Pages** — Comprehensive venue info with amenities, rules, gallery placeholders
- **Provider Landing Pages** — Branded microsites with WebGL particle backgrounds (gold/neon/garden presets)
- **Booking Request Flow** — Multi-section form with Zod validation, booking confirmation with unique code

### Admin Dashboard
- **Provider Login** — Demo authentication with mock credentials
- **Dashboard Overview** — Stats cards, recent bookings, calendar preview
- **Booking Management** — View, approve, reject booking requests with status history
- **Venue Management** — Manage venue listings
- **Provider Profile** — Update brand details

### Design & Motion
- **Dark Luxury Aesthetic** — #080706 background, gold accents, Playfair Display + Inter typography
- **GSAP ScrollTrigger** — Scroll-triggered reveals, text animations, animated counters
- **Three.js / WebGL** — Atmospheric golden particles on hero, provider-themed 3D scenes
- **Magnetic Buttons** — Mouse-reactive CTAs with elastic snap-back
- **Glassmorphism** — Frosted glass navbar and panels
- **Film Grain Overlay** — Subtle texture for cinematic feel
- **Reduced Motion Support** — All animations respect `prefers-reduced-motion`

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to the project
cd LumiSpace

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Demo Credentials

Use these credentials to access the admin dashboard:

| Provider | Email | Password |
|---|---|---|
| Lumiere Grand Hall | `admin@lumieregrandhall.com` | `demo1234` |
| Urban Loft Collective | `admin@urbanloft.com` | `demo1234` |
| Gardenia Event Estate | `admin@gardeniaestate.com` | `demo1234` |

**Login URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard routes
│   │   ├── bookings/             # Booking management
│   │   ├── venues/               # Venue management
│   │   ├── provider-profile/     # Provider settings
│   │   └── login/                # Admin login
│   ├── book/[venueSlug]/         # Booking request form
│   ├── booking/confirmation/     # Booking confirmation
│   ├── become-a-provider/        # Provider registration
│   ├── p/[providerSlug]/         # Provider landing pages
│   ├── venues/                   # Venue listing & detail
│   ├── globals.css               # Design tokens & styles
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Homepage
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── motion/                   # GSAP animation components
│   │   ├── GsapProvider.tsx      # GSAP context provider
│   │   ├── ScrollReveal.tsx      # Scroll-triggered reveal
│   │   ├── SplitTextReveal.tsx   # Text animation
│   │   ├── MagneticButton.tsx    # Magnetic CTA
│   │   ├── AnimatedCounter.tsx   # Number counter
│   │   ├── HorizontalScrollGallery.tsx
│   │   └── PinnedStorySection.tsx
│   ├── public/                   # Public page components
│   ├── ui/                       # Reusable UI components
│   │   ├── LoadingState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── Toast.tsx
│   └── webgl/                    # Three.js components
│       ├── FloatingParticles.tsx  # Particle system
│       ├── HeroAtmosphereCanvas.tsx
│       └── ProviderSignatureScene.tsx
└── lib/
    ├── data/                     # Mock seed data
    ├── motion/                   # GSAP utilities
    ├── schemas/                  # Zod validation
    ├── services/                 # Data service layer
    ├── webgl/                    # WebGL utilities
    ├── types.ts                  # TypeScript types
    └── utils.ts                  # Utility functions
```

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animation | GSAP 3 + ScrollTrigger |
| 3D/WebGL | Three.js + React Three Fiber + Drei |
| Data | Mock data (Supabase-ready service layer) |

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080706` | Page background |
| `--bg-surface` | `#12100E` | Cards, panels |
| `--text-primary` | `#F7F1E8` | Primary text |
| `--gold` | `#C8A96A` | Accent, CTAs |
| `--clay` | `#9D6B53` | Warm accent |
| `--success` | `#3BAA6F` | Approved status |
| `--warning` | `#D7A23F` | Pending status |
| `--danger` | `#C95050` | Rejected status |

### Typography
- **Display:** Playfair Display (editorial headlines)
- **Body:** Inter (clean, modern body text)

---

## 📱 Responsive

The application is fully responsive across:
- **Mobile** (320px+)
- **Tablet** (768px+)
- **Desktop** (1024px+)
- **Large Desktop** (1440px+)

WebGL effects are automatically disabled on mobile for performance.

---

## ♿ Accessibility

- All animations respect `prefers-reduced-motion`
- Focus-visible outlines on all interactive elements
- Semantic HTML5 elements throughout
- ARIA labels on icon-only buttons
- Keyboard navigable

---

## 📄 License

MIT
