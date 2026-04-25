# Hallora — Multi-Provider Hall / Venue Booking Marketplace

## Purpose

This document is a complete project handoff for building **Hallora**, a responsive hall, venue, and event-space booking marketplace.

The original bounty asks for a single venue booking web app with:

1. Responsive landing page
2. Venue details page
3. Booking request form
4. Date and time slot selection
5. Booking confirmation page
6. Admin login page
7. Admin dashboard to manage bookings
8. Booking statuses: pending, approved, rejected
9. Proper form validation
10. Clean user-friendly experience

This version expands the idea into a **multi-provider marketplace**:

> Hallora is a cinematic multi-provider venue booking marketplace. Visitors can explore premium venue providers, view immersive provider microsites, check venue details, select dates and time slots, and submit booking requests. Venue providers can log in to manage bookings, approve or reject requests, and maintain their venue presence. The app focuses on a polished booking flow, responsive design, storytelling-driven UI, and practical admin usability — with no payment integration required.

---

# 1. Product Concept

## Product Name

**Hallora**

Alternative names:

- VenueVerse
- Gatherly Spaces
- LumiSpace
- HallHaus
- Venue Noir

## Product Type

A multi-provider marketplace for discovering and booking halls, venues, event spaces, ballrooms, gardens, rooftops, meeting spaces, and private event locations.

## Core Concept

Users can:

- Browse venues from multiple providers.
- Search by city, event type, guest count, and date.
- Visit a provider's cinematic landing page.
- View detailed venue information.
- Select a date and time slot.
- Submit a booking request.
- Receive a confirmation page with a booking code.

Venue providers can:

- Register as a provider.
- Get their own public provider landing page.
- Add and manage multiple venues.
- Log in to an admin dashboard.
- Review incoming booking requests.
- Approve or reject requests.
- Manage booking statuses.

Platform admins can optionally:

- Review all providers.
- Approve provider accounts.
- Manage marketplace-wide bookings and venues.

---

# 2. MVP Scope

Build a polished marketplace MVP that satisfies the bounty while feeling larger and more premium than a basic booking site.

## Public Visitor Side

Required pages:

1. Marketplace landing page
2. Venue listing/search page
3. Provider landing page
4. Venue details page
5. Booking request form/page
6. Booking confirmation page
7. Provider registration page

## Provider/Admin Side

Required pages:

1. Admin login page
2. Provider dashboard
3. Booking management page
4. Booking detail page or drawer
5. Venue management page
6. Provider profile/landing page settings page

## Optional Page

1. Platform admin dashboard

---

# 3. User Roles

| Role | Description |
|---|---|
| Guest | Can browse venues and submit booking requests |
| Customer | Optional logged-in user who can track bookings |
| Provider Admin | Venue owner who manages their own venues and bookings |
| Provider Staff | Can review bookings but may not edit provider profile |
| Platform Admin | Can manage all providers, venues, and bookings |

For the bounty MVP, the most important admin role is:

```txt
Provider Admin
```

---

# 4. Recommended Tech Stack

## Main Stack

```txt
Next.js App Router
TypeScript
Tailwind CSS
React Hook Form
Zod
Lucide React
shadcn/ui-style component patterns
Mock data + localStorage for MVP
Supabase later
```

## Premium Awwwards-Style Motion Stack

```txt
GSAP
@gsap/react
GSAP ScrollTrigger
Three.js
@react-three/fiber
@react-three/drei
Lenis optional
```

## Optional Later Stack

```txt
Supabase Auth
Supabase Postgres
Supabase Storage
Zustand
```

## Recommendation

Use:

```txt
GSAP = main animation engine
Three.js / React Three Fiber = selective cinematic WebGL layer
Framer Motion = optional or removed
Lenis = optional smooth scroll for public marketing pages only
```

---

# 5. Key Design Direction

## Experience Style

The public website should feel:

- Cinematic
- Premium
- Editorial
- Awwwards-inspired
- Video-led
- Storytelling-driven
- Smooth and animated
- Dark luxury
- High contrast
- Polished and responsive

The admin dashboard should feel:

- Clean
- Fast
- Practical
- Minimal
- Functional
- Lightly animated only where useful

## Visual Direction

Use a dark luxury palette.

```txt
Background: #080706
Surface: #12100E
Text: #F7F1E8
Muted Text: #B8AFA3
Gold Accent: #C8A96A
Warm Clay: #9D6B53
Soft Cream: #FFF7E8
Success: #3BAA6F
Warning: #D7A23F
Danger: #C95050
```

## Typography

Suggested pairing:

```txt
Display Font:
- Playfair Display
- Cormorant Garamond
- Editorial New-style font

Body Font:
- Inter
- Manrope
- Satoshi-style font
```

## UI Texture Ideas

- Subtle film grain/noise overlay
- Soft glass panels
- Gold hairline borders
- Large image/video masks
- Soft spotlight gradients
- Dark velvet-like surfaces
- Premium editorial whitespace

---

# 6. Routes

## Public Routes

```txt
/
```

Marketplace landing page.

```txt
/venues
```

Browse/search all venues.

```txt
/venues/[venueSlug]
```

Venue details page.

```txt
/p/[providerSlug]
```

Provider cinematic landing page.

```txt
/p/[providerSlug]/[venueSlug]
```

Provider-specific venue detail page.

```txt
/book/[venueSlug]
```

Booking request flow.

```txt
/booking/confirmation/[bookingCode]
```

Booking confirmation page.

```txt
/become-a-provider
```

Provider registration/onboarding page.

## Admin Routes

```txt
/admin/login
```

Admin login page.

```txt
/admin
```

Dashboard overview.

```txt
/admin/bookings
```

Booking management table.

```txt
/admin/bookings/[bookingId]
```

Booking detail/review page.

```txt
/admin/venues
```

Venue management page.

```txt
/admin/provider-profile
```

Provider landing page settings.

```txt
/admin/platform
```

Optional platform admin area.

---

# 7. Page-by-Page Requirements

## 7.1 Marketplace Landing Page

The marketplace homepage should introduce the platform and help users discover venues.

### Sections

1. Cinematic video hero
2. Marketplace search bar
3. Featured venues
4. Scroll storytelling section
5. Featured providers
6. How it works
7. Provider CTA
8. Footer

### Hero Section

Content:

```txt
Headline:
Find the room where the night begins.

Subheadline:
Discover cinematic halls, gardens, rooftops, and private spaces from trusted venue providers.

Primary CTA:
Find a Venue

Secondary CTA:
List Your Venue
```

Visuals:

- Full-screen video background
- Gradient fallback if video fails
- Three.js golden particle atmosphere
- Large editorial typography
- Soft spotlight overlay
- Magnetic CTA buttons

GSAP animation:

- Hero text line reveal
- Video mask opening effect
- Search bar slide-up reveal
- CTA stagger reveal

Three.js effect:

- Floating golden particles
- Soft mouse-reactive depth
- Low object count
- Disabled or simplified on reduced motion

### Search Bar

Fields:

- Location
- Event type
- Guest count
- Date

CTA:

```txt
Search venues
```

### Featured Venues

Venue cards should include:

- Image or video preview
- Venue name
- Provider name
- Location
- Capacity
- Starting price
- Event tags
- CTA: View venue

### Storytelling Section

Concept:

```txt
Every event starts with a space.
```

Use a pinned GSAP scroll section with changing images/videos.

Chapters:

1. Weddings
2. Corporate launches
3. Exhibitions
4. Private celebrations

### Featured Providers

Each provider card links to:

```txt
/p/[providerSlug]
```

Provider cards should show:

- Provider logo/name
- Hero image
- City
- Number of venues
- Short tagline
- CTA: Explore provider

### How It Works

Steps:

1. Discover venues
2. Choose a date and time
3. Send a request
4. Provider confirms

### Provider CTA

Content:

```txt
Own a venue?
Build your cinematic venue page and manage bookings from one dashboard.
```

CTA:

```txt
Become a Provider
```

---

## 7.2 Provider Landing Page

Each registered provider gets a public cinematic microsite.

Example:

```txt
/p/lumiere-grand-hall
```

### Sections

1. Provider hero video
2. Provider story
3. Venue collection
4. Experience chapters
5. Gallery
6. Testimonials
7. Final booking CTA

### Provider Hero

Content:

```txt
Provider Name:
Lumiere Grand Hall

Tagline:
A heritage ballroom restored for modern celebrations.

CTA:
Explore Spaces

Secondary CTA:
Request Booking
```

Visuals:

- Provider-specific video or hero image
- Provider-specific Three.js signature scene
- Large typography
- Scroll indicator
- Soft grain overlay

### Provider Story

Use sticky scroll storytelling.

Example copy:

```txt
A restored grand hall where chandeliers, warm stone, and modern production meet.
From ceremonies to product launches, Lumiere creates a stage for unforgettable evenings.
```

GSAP behavior:

- Left side sticky text
- Right side image/video changes by scroll chapter
- Progress line follows scroll
- Text reveals line by line

### Venue Collection

Provider can have multiple venues:

- Grand Ballroom
- Glass Pavilion
- Rooftop Atelier
- Executive Seminar Suite

Use horizontal scroll on desktop and stacked cards on mobile.

### Experience Chapters

Possible chapters:

- Ambience
- Capacity
- Catering
- Lighting and audio
- Parking
- Accessibility

### Gallery

A premium image/video grid or horizontal gallery.

Optional WebGL:

- Image distortion on hover
- Soft ripple
- Scroll-based image bend

### Final CTA

Content:

```txt
Ready to plan your event at Lumiere?
Choose a space, select a date, and send a request.
```

CTA:

```txt
Start Booking
```

---

## 7.3 Venue Listing Page

Route:

```txt
/venues
```

Purpose:

Allow users to browse all marketplace venues.

### Features

- Search by keyword
- Filter by city
- Filter by event type
- Filter by capacity
- Filter by provider
- Filter by date
- Sort by featured, capacity, newest, or price
- Responsive venue grid
- Empty state if no results

### Venue Card Details

Each card should show:

- Venue image
- Venue name
- Provider name
- City
- Capacity
- Starting price
- Event types
- CTA

---

## 7.4 Venue Details Page

Routes:

```txt
/venues/[venueSlug]
/p/[providerSlug]/[venueSlug]
```

### Required Sections

1. Venue hero
2. Key information cards
3. Gallery/video
4. Amenities
5. Rules
6. Availability preview
7. Time slots
8. Booking CTA
9. Map/contact panel

### Hero Content

- Venue name
- Provider name
- Location
- Capacity
- Starting price
- CTA: Check Availability

### Key Info Cards

Show:

- Capacity
- Size
- City
- Parking
- Event types
- Accessibility
- Starting price

### Gallery

Use:

- Hero video
- Image grid
- Horizontal scroll on desktop
- Normal scroll on mobile

### Amenities

Example amenities:

- Stage
- Projector
- Sound system
- Lighting rig
- Bridal room
- VIP room
- Parking
- Accessible entrance
- Catering prep area
- Wi-Fi

### Rules

Example rules:

- No smoking indoors
- Outside catering requires approval
- Sound cutoff after 11 PM
- Decorations must be removed after event
- Booking approval is required before confirmation
- No direct payment in the app

### Availability Preview

Show:

- Date picker
- Time slot selector
- Unavailable states for pending/approved bookings

### Sticky CTA

On mobile, show sticky bottom CTA:

```txt
Check Availability
```

On desktop, use a sticky side booking panel if appropriate.

---

## 7.5 Booking Request Flow

Route:

```txt
/book/[venueSlug]
```

The booking flow can be single-page or multi-step.

### Recommended Multi-Step Flow

1. Select date
2. Select time slot
3. Enter event details
4. Enter contact details
5. Review request
6. Submit
7. Redirect to confirmation page

### Event Details Fields

- Venue
- Event type
- Event date
- Time slot
- Expected guest count
- Setup notes
- Special requests

### Customer Details Fields

- Full name
- Email
- Phone number
- Organization name, optional

### Validation Rules

Use Zod + React Hook Form.

Rules:

```txt
customerName required
valid email required
phone required
eventType required
eventDate must be today or future
time slot required
guestCount must be greater than 0
guestCount must be less than or equal to venue capacity
setup notes max length 500
special requests max length 500
prevent duplicate pending or approved booking for same venue/date/time
status defaults to pending
```

### Booking Status

New booking status:

```txt
pending
```

### Duplicate Booking Rule

A time slot is unavailable if another booking exists with:

```txt
same venueId
same eventDate
same startTime
same endTime
status is pending or approved
```

### Booking Code Format

Example:

```txt
HLR-2026-00482
```

---

## 7.6 Booking Confirmation Page

Route:

```txt
/booking/confirmation/[bookingCode]
```

Show:

- Booking reference code
- Venue name
- Provider name
- Event date
- Time slot
- Guest count
- Status badge: Pending
- Message explaining provider review
- CTA: Browse More Venues
- CTA: Contact Provider

Example copy:

```txt
Your request has been sent.
The venue provider will review your booking and contact you soon.
```

Optional Three.js / GSAP:

- Small cinematic success animation
- Floating gold seal
- Booking code reveal
- Subtle particles

Keep it lightweight.

---

## 7.7 Provider Registration Page

Route:

```txt
/become-a-provider
```

Purpose:

Allow venue owners to register their provider profile and first venue.

### Fields

Provider details:

- Brand name
- Tagline
- Description
- Contact email
- Contact phone
- Address
- City
- Country

First venue details:

- Venue name
- Venue type
- Capacity min
- Capacity max
- Price from
- Short description
- Amenities
- Rules

Branding fields:

- Hero image URL
- Hero video URL
- Logo URL
- Accent color

For MVP, media uploads can be mock URL fields.

### Submission Result

Create a provider with status:

```txt
pending
```

Create first venue with status:

```txt
draft
```

Show success message:

```txt
Your provider profile has been submitted for review.
```

---

## 7.8 Admin Login Page

Route:

```txt
/admin/login
```

Demo credentials:

```txt
email: provider@hallora.test
password: password123
```

Fields:

- Email
- Password

Validation:

- Email required
- Valid email
- Password required

On success:

```txt
Redirect to /admin
```

---

## 7.9 Provider Admin Dashboard

Route:

```txt
/admin
```

Purpose:

Provider admins manage their own provider account, venues, and bookings.

### Dashboard Cards

Show:

- Pending bookings
- Approved bookings
- Rejected bookings
- Total venues
- This month’s requests

### Recent Bookings

Columns:

- Customer
- Venue
- Event date
- Time
- Guest count
- Status
- Action

### Calendar Preview

Show upcoming approved bookings.

### Venue Performance

Show simple stats:

- Most requested venue
- Popular event type
- Booking status breakdown

### Admin Design

Keep it:

- Clean
- Light background or dark professional dashboard
- Minimal motion
- Clear status badges
- Fast to use

Do not add heavy Three.js or video backgrounds to admin pages.

---

## 7.10 Booking Management

Route:

```txt
/admin/bookings
```

Provider admins can:

- View all incoming booking requests for their provider
- Filter by status
- Filter by venue
- Filter by date
- Search customer name or email
- Open booking detail page/drawer
- Approve booking
- Reject booking
- Add internal admin notes

### Status Actions

When approved:

```txt
status = approved
slot becomes unavailable
reviewedAt is set
reviewedBy is set
booking status history is created
```

When rejected:

```txt
status = rejected
slot becomes available again
reviewedAt is set
reviewedBy is set
booking status history is created
```

---

# 8. Data Models

## 8.1 TypeScript Types

Create:

```ts
export type UserRole =
  | "guest"
  | "customer"
  | "provider_admin"
  | "provider_staff"
  | "platform_admin";

export type ProviderStatus = "pending" | "approved" | "suspended";

export type VenueStatus = "draft" | "published" | "archived";

export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Provider {
  id: string;
  ownerId: string;
  brandName: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  logoUrl?: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl?: string;
  address: string;
  city: string;
  country: string;
  status: ProviderStatus;
  themeJson?: ProviderTheme;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderTheme {
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  heroStyle?: "cinematic" | "editorial" | "minimal";
  webglPreset?: "gold" | "neon" | "garden" | "none";
}

export interface Venue {
  id: string;
  providerId: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  venueType: string;
  capacityMin: number;
  capacityMax: number;
  sizeSqft?: number;
  address: string;
  city: string;
  country: string;
  priceFrom?: number;
  heroImageUrl?: string;
  heroVideoUrl?: string;
  galleryUrls: string[];
  amenities: string[];
  rules: string[];
  eventTypes: string[];
  status: VenueStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VenueAvailabilityRule {
  id: string;
  venueId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  isActive: boolean;
}

export interface VenueBlockedDate {
  id: string;
  venueId: string;
  blockedDate: string;
  reason?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  providerId: string;
  venueId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organizationName?: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  setupNotes?: string;
  specialRequests?: string;
  status: BookingStatus;
  adminNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  oldStatus?: BookingStatus;
  newStatus: BookingStatus;
  changedBy?: string;
  note?: string;
  createdAt: string;
}
```

---

## 8.2 Database Schema Version

If using Supabase/Postgres later:

### profiles

```txt
id
email
full_name
phone
role: guest | customer | provider_admin | provider_staff | platform_admin
created_at
updated_at
```

### providers

```txt
id
owner_id
brand_name
slug
tagline
description
story
logo_url
hero_video_url
hero_image_url
contact_email
contact_phone
website_url
address
city
country
status: pending | approved | suspended
theme_json
created_at
updated_at
```

### venues

```txt
id
provider_id
name
slug
short_description
long_description
venue_type
capacity_min
capacity_max
size_sqft
address
city
country
price_from
hero_image_url
hero_video_url
gallery_urls
amenities
rules
event_types
status: draft | published | archived
created_at
updated_at
```

### venue_availability_rules

```txt
id
venue_id
day_of_week
start_time
end_time
slot_duration_minutes
is_active
```

### venue_blocked_dates

```txt
id
venue_id
blocked_date
reason
created_at
```

### bookings

```txt
id
booking_code
provider_id
venue_id
customer_name
customer_email
customer_phone
organization_name
event_type
event_date
start_time
end_time
guest_count
setup_notes
special_requests
status: pending | approved | rejected | cancelled
admin_note
reviewed_by
reviewed_at
created_at
updated_at
```

### booking_status_history

```txt
id
booking_id
old_status
new_status
changed_by
note
created_at
```

---

# 9. Seed Data

Create at least 3 providers.

## Provider 1

```txt
Name: Lumiere Grand Hall
Slug: lumiere-grand-hall
Tagline: A heritage ballroom restored for modern celebrations.
City: Kuala Lumpur
Theme: Gold cinematic luxury
WebGL Preset: gold
```

Venues:

1. Grand Ballroom
2. Glass Pavilion

## Provider 2

```txt
Name: Urban Loft Collective
Slug: urban-loft-collective
Tagline: Industrial spaces for launches, exhibitions, and modern gatherings.
City: Petaling Jaya
Theme: Concrete, grid, neon, editorial
WebGL Preset: neon
```

Venues:

1. Rooftop Atelier
2. Industrial Loft Hall

## Provider 3

```txt
Name: Gardenia Event Estate
Slug: gardenia-event-estate
Tagline: Garden ceremonies and open-air celebrations framed by nature.
City: Shah Alam
Theme: Garden, daylight, soft glass, botanical
WebGL Preset: garden
```

Venues:

1. Garden Marquee
2. Executive Seminar Suite

## Sample Venues

Create at least 6 venues:

1. Grand Ballroom
2. Glass Pavilion
3. Rooftop Atelier
4. Industrial Loft Hall
5. Garden Marquee
6. Executive Seminar Suite

Each venue should include:

- Name
- Slug
- Provider ID
- City
- Capacity min/max
- Venue type
- Price from
- Short description
- Long description
- Hero image
- Optional hero video
- Gallery URLs
- Amenities
- Rules
- Event types
- Published status

## Sample Bookings

Create at least 12 bookings with mixed statuses:

```txt
pending
approved
rejected
```

Use realistic customers, event types, dates, times, and guest counts.

Example event types:

- Wedding
- Corporate Dinner
- Product Launch
- Exhibition
- Seminar
- Birthday
- Private Dinner
- Charity Gala

---

# 10. Services and Business Logic

For MVP, use mock data and localStorage.

Recommended services:

```txt
lib/services/provider-service.ts
lib/services/venue-service.ts
lib/services/booking-service.ts
lib/services/auth-service.ts
```

## provider-service.ts

Functions:

```ts
getProviders()
getProviderBySlug(slug)
getProviderById(id)
createProvider(input)
updateProvider(id, input)
```

## venue-service.ts

Functions:

```ts
getVenues()
getPublishedVenues()
getVenueBySlug(slug)
getVenuesByProviderId(providerId)
createVenue(input)
updateVenue(id, input)
```

## booking-service.ts

Functions:

```ts
getBookings()
getBookingById(id)
getBookingByCode(bookingCode)
getBookingsByProviderId(providerId)
getBookingsByVenueId(venueId)
createBooking(input)
updateBookingStatus(bookingId, status, adminNote)
isSlotAvailable(venueId, eventDate, startTime, endTime)
getUnavailableSlots(venueId, eventDate)
generateBookingCode()
```

## auth-service.ts

For demo only:

```ts
login(email, password)
logout()
getCurrentUser()
isAuthenticated()
```

Demo login:

```txt
provider@hallora.test
password123
```

---

# 11. Zod Schemas

Create:

```txt
lib/schemas/booking-schema.ts
lib/schemas/provider-schema.ts
lib/schemas/admin-login-schema.ts
```

## Booking Schema Requirements

```txt
customerName required
customerEmail valid email
customerPhone required
organizationName optional
eventType required
eventDate today or future
startTime required
endTime required
guestCount number greater than 0
guestCount less than or equal to venue capacity
setupNotes optional, max 500
specialRequests optional, max 500
```

## Admin Login Schema

```txt
email required and valid
password required
```

## Provider Registration Schema

```txt
brandName required
tagline required
description required
contactEmail valid
contactPhone required
address required
city required
country required
firstVenueName required
capacityMax greater than 0
```

---

# 12. Component Inventory

## Layout Components

```txt
CinematicNavbar
Footer
PublicLayout
AdminLayout
AdminSidebar
MobileNav
```

## Public Marketing Components

```txt
VideoHero
MarketplaceSearch
FeaturedVenueGrid
FeaturedVenueRail
ProviderCard
VenueCard
StoryScrollSection
ProviderHero
ProviderStory
VenueGallery
VenueDetailsPanel
AmenitiesGrid
RulesList
HowItWorks
ProviderCTA
```

## Booking Components

```txt
AvailabilityPicker
TimeSlotSelector
BookingRequestForm
BookingReviewStep
ConfirmationCard
BookingStatusBadge
```

## Admin Components

```txt
AdminLoginForm
AdminStatsCards
BookingTable
BookingDetailDrawer
StatusActionButtons
AdminFilters
VenueManagementTable
EmptyState
LoadingState
Toast
```

## Motion Components

```txt
GsapProvider
ScrollReveal
SplitTextReveal
PinnedStorySection
HorizontalScrollGallery
MagneticButton
AnimatedCounter
PageTransition
```

## WebGL Components

```txt
HeroAtmosphereCanvas
ProviderSignatureScene
FloatingParticles
VenueFloorPlanScene
ImageDistortionGallery
ShaderBackground
```

---

# 13. GSAP Usage Guide

Use GSAP for public storytelling and cinematic interactions.

## Install

```bash
npm install gsap @gsap/react
```

## Use GSAP For

- Hero text reveal
- Search bar reveal
- Video mask opening animation
- Scroll-triggered storytelling
- Pinned provider story sections
- Horizontal venue gallery
- Masked image reveals
- Page transitions
- Magnetic buttons
- Booking confirmation reveal

## Avoid GSAP For

- Complex form logic
- Dashboard-heavy interactions
- Over-animating every element
- Anything that hurts accessibility or usability

## Required Implementation Notes

- Use client components for GSAP.
- Use `useGSAP()` from `@gsap/react`.
- Register `ScrollTrigger` only on the client.
- Clean up animations on unmount.
- Respect `prefers-reduced-motion`.
- Avoid layout shift.
- Avoid scroll hijacking in form pages.

---

# 14. Three.js / React Three Fiber Usage Guide

Use Three.js selectively as a cinematic layer.

## Install

```bash
npm install three @react-three/fiber @react-three/drei
```

## Use Three.js For

1. Marketplace hero atmosphere canvas
2. Provider-specific signature scenes
3. Floating particles
4. Optional interactive venue floor plan
5. Optional gallery image distortion
6. Booking confirmation gold seal animation

## Avoid Three.js For

- Admin dashboard
- Booking form fields
- Tables
- Every section
- Heavy scenes on mobile

## Recommended Canvas Settings

```tsx
<Canvas
  dpr={[1, 1.5]}
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  }}
>
  {/* Scene */}
</Canvas>
```

## Performance Rules

```txt
Only one major Three.js canvas per page
Lazy-load WebGL components with dynamic import and ssr:false
Use image or gradient fallback
Cap devicePixelRatio
Respect prefers-reduced-motion
Keep object count low
Avoid massive assets
Disable heavy effects on low-power/mobile if needed
No Three.js on admin pages
```

## Provider WebGL Presets

### Gold Preset

For Lumiere Grand Hall:

```txt
Gold particles
Chandelier-like glow
Soft fog
Warm spotlights
```

### Neon Preset

For Urban Loft Collective:

```txt
Subtle grid lines
Neon reflections
Concrete mood
Mouse-reactive lights
```

### Garden Preset

For Gardenia Event Estate:

```txt
Floating petals
Soft daylight
Glass blur
Gentle green/gold particles
```

---

# 15. Lenis Usage Guide

Lenis is optional.

Use Lenis only on public marketing pages for smooth scroll polish.

Do not use Lenis on:

- Admin dashboard
- Booking form pages if it harms form usability
- Mobile if performance is poor

Install:

```bash
npm install lenis
```

Use for:

- Homepage storytelling
- Provider landing page scroll chapters
- Gallery sections

---

# 16. Animation Storyboard

## Homepage Hero

Visual:

```txt
Dark full-screen cinematic hero
Muted event video
Three.js golden particles
Huge editorial headline
Search panel
```

Motion:

```txt
Headline reveals line by line
Video mask expands
Particles slowly drift
Search bar slides up
CTA buttons have magnetic hover
```

## Homepage Storytelling Scroll

Visual:

```txt
Pinned text on left
Changing event visuals on right
Gold progress line
```

Motion:

```txt
ScrollTrigger pins the section
Each chapter fades/slides in
Images reveal with masks
Progress line grows with scroll
```

## Featured Venue Gallery

Visual:

```txt
Horizontal rail of premium venue cards
Large image-forward cards
```

Motion:

```txt
Horizontal scroll on desktop
Cards scale subtly on hover
Images parallax inside cards
Normal stacked layout on mobile
```

## Provider Landing Page

Visual:

```txt
Provider-specific cinematic hero
3D signature scene
Sticky story chapters
Venue collection
Gallery
```

Motion:

```txt
Logo fades in
Hero copy reveals
Story pins and swaps media
Venue cards enter in sequence
Final CTA expands into view
```

## Venue Details Page

Visual:

```txt
Hero video/image
Sticky facts panel
Gallery
Availability picker
```

Motion:

```txt
Hero copy reveal
Fact cards stagger in
Gallery images reveal on scroll
Calendar/time slots animate gently
Mobile sticky CTA appears after hero
```

## Booking Confirmation

Visual:

```txt
Elegant confirmation card
Booking code
Pending status
Soft particles or gold seal
```

Motion:

```txt
Booking code reveals
Card lifts in
Status badge fades in
Particles remain subtle
```

## Admin Dashboard

Motion:

```txt
Stats cards reveal once
Booking table row hover
Drawer slides in
Status badge changes smoothly
```

No heavy animation.

---

# 17. Accessibility Requirements

Forms must be accessible.

Use:

- Real `<label>` elements
- Clear error messages
- Keyboard-navigable buttons and inputs
- Focus states
- Semantic HTML
- ARIA only where useful
- Logical tab order
- Sufficient color contrast
- No animation that prevents reading or interacting
- `prefers-reduced-motion` support

Validation should happen:

- On the client for fast feedback
- In the service/backend layer before storing data

---

# 18. Responsive Requirements

The app must work on:

```txt
Mobile
Tablet
Desktop
Large desktop
```

## Mobile Rules

- Simplify animations
- Stack venue cards
- Use sticky booking CTA
- Avoid heavy WebGL
- Make forms easy to complete
- Use large touch targets
- Avoid horizontal overflow

## Desktop Rules

- Use cinematic scroll sections
- Use horizontal gallery
- Use pinned storytelling
- Use larger typography
- Use split layouts

---

# 19. File Structure

Recommended structure:

```txt
app/
  page.tsx
  venues/
    page.tsx
    [venueSlug]/
      page.tsx
  p/
    [providerSlug]/
      page.tsx
      [venueSlug]/
        page.tsx
  book/
    [venueSlug]/
      page.tsx
  booking/
    confirmation/
      [bookingCode]/
        page.tsx
  become-a-provider/
    page.tsx
  admin/
    login/
      page.tsx
    page.tsx
    bookings/
      page.tsx
      [bookingId]/
        page.tsx
    venues/
      page.tsx
    provider-profile/
      page.tsx

components/
  layout/
    CinematicNavbar.tsx
    Footer.tsx
    PublicLayout.tsx
    AdminLayout.tsx
    AdminSidebar.tsx
  public/
    VideoHero.tsx
    MarketplaceSearch.tsx
    FeaturedVenueGrid.tsx
    ProviderCard.tsx
    VenueCard.tsx
    StoryScrollSection.tsx
    ProviderHero.tsx
    ProviderStory.tsx
    VenueGallery.tsx
    VenueDetailsPanel.tsx
    AmenitiesGrid.tsx
    RulesList.tsx
  booking/
    AvailabilityPicker.tsx
    TimeSlotSelector.tsx
    BookingRequestForm.tsx
    BookingReviewStep.tsx
    ConfirmationCard.tsx
  admin/
    AdminLoginForm.tsx
    AdminStatsCards.tsx
    BookingStatusBadge.tsx
    BookingTable.tsx
    BookingDetailDrawer.tsx
    StatusActionButtons.tsx
    VenueManagementTable.tsx
  motion/
    GsapProvider.tsx
    ScrollReveal.tsx
    SplitTextReveal.tsx
    PinnedStorySection.tsx
    HorizontalScrollGallery.tsx
    MagneticButton.tsx
    AnimatedCounter.tsx
    PageTransition.tsx
  webgl/
    HeroAtmosphereCanvas.tsx
    ProviderSignatureScene.tsx
    FloatingParticles.tsx
    VenueFloorPlanScene.tsx
    ImageDistortionGallery.tsx
  ui/
    Button.tsx
    Input.tsx
    Select.tsx
    Textarea.tsx
    Card.tsx
    Badge.tsx
    Dialog.tsx
    Drawer.tsx
    Toast.tsx
    EmptyState.tsx
    LoadingState.tsx

lib/
  data/
    providers.ts
    venues.ts
    bookings.ts
  services/
    provider-service.ts
    venue-service.ts
    booking-service.ts
    auth-service.ts
  schemas/
    booking-schema.ts
    provider-schema.ts
    admin-login-schema.ts
  motion/
    gsap.ts
    useReducedMotion.ts
    animation-presets.ts
  webgl/
    scene-presets.ts
    performance.ts
  types.ts
  utils.ts

public/
  images/
  videos/
```

---

# 20. Implementation Phases

## Phase 1 — Foundation

Set up:

- Next.js project
- TypeScript
- Tailwind
- App Router
- Design tokens
- Reusable layout
- Mock data
- Responsive navbar
- Footer
- Basic routing

Deliverable:

```txt
A running app with homepage, navigation, and mock venue data.
```

## Phase 2 — Marketplace Homepage

Build:

- Video hero
- Search bar
- Featured venue cards
- Provider cards
- Storytelling scroll sections
- CTA for providers

Deliverable:

```txt
A polished marketplace landing page.
```

## Phase 3 — GSAP Foundation

Build:

- GsapProvider
- ScrollReveal
- SplitTextReveal
- PinnedStorySection
- HorizontalScrollGallery
- MagneticButton
- Reduced-motion support

Deliverable:

```txt
Public pages have reusable motion primitives.
```

## Phase 4 — Three.js Foundation

Build:

- HeroAtmosphereCanvas
- ProviderSignatureScene
- FloatingParticles
- WebGL fallback handling
- Dynamic import with SSR disabled

Deliverable:

```txt
Public hero sections have selective cinematic WebGL.
```

## Phase 5 — Provider Landing Pages

Build:

- Dynamic provider page by slug
- Provider hero
- Provider story
- Provider venue collection
- Gallery
- Testimonials
- CTA to book

Deliverable:

```txt
Every provider has a public microsite.
```

## Phase 6 — Venue Details

Build:

- Dynamic venue page
- Venue hero
- Details cards
- Amenities
- Gallery/video
- Rules
- Availability preview
- Sticky booking CTA

Deliverable:

```txt
Users can understand the venue and move into booking.
```

## Phase 7 — Booking Flow

Build:

- Date picker
- Time slot selection
- Booking request form
- Form validation
- Confirmation page
- Booking reference code
- Mock persistence or database insert

Deliverable:

```txt
Users can submit booking requests successfully.
```

## Phase 8 — Provider Registration

Build:

- /become-a-provider
- Provider profile form
- First venue form
- Media URL mock UI
- Availability setup mock UI
- Success screen

Deliverable:

```txt
A provider can register and appear as pending/draft.
```

## Phase 9 — Admin Login and Dashboard

Build:

- Login page
- Protected admin layout
- Dashboard overview
- Booking table
- Booking filters
- Booking detail drawer/modal
- Approve/reject actions

Deliverable:

```txt
Provider admins can manage incoming booking requests.
```

## Phase 10 — Polish

Add:

- Loading states
- Empty states
- Error states
- Mobile responsiveness
- Reduced motion support
- Toast notifications
- Better copywriting
- Demo seed data
- README
- Deployment instructions

Deliverable:

```txt
A bounty-ready polished app.
```

---

# 21. Bounty Acceptance Checklist

The final app must clearly show:

- [ ] Responsive marketplace landing page
- [ ] Multiple venue providers
- [ ] Each provider has a public landing page
- [ ] Venue details page
- [ ] Booking request form
- [ ] Date selection
- [ ] Time slot selection
- [ ] Booking confirmation page
- [ ] Admin login page
- [ ] Admin dashboard
- [ ] Booking statuses: pending, approved, rejected
- [ ] Admin can approve bookings
- [ ] Admin can reject bookings
- [ ] Proper form validation
- [ ] Clean mobile UX
- [ ] Polished visual design
- [ ] GSAP storytelling animation
- [ ] Selective Three.js/WebGL wow factor
- [ ] No payment integration
- [ ] README with setup instructions and demo credentials

---

# 22. Winning Extra Touches

Add these if time allows:

## Provider Theme Customization

Let providers choose:

- Accent color
- Hero image/video
- Brand tagline
- CTA text
- WebGL mood preset

Store in:

```txt
provider.themeJson
```

## Shareable Provider URL

Every provider gets:

```txt
/p/provider-slug
```

## Booking Timeline

On admin booking detail:

```txt
Request received -> Pending review -> Approved/Rejected
```

## Smart Empty States

Example:

```txt
No pending bookings yet.
When guests submit a request, it will appear here.
```

## Mobile Sticky Booking CTA

On venue pages:

```txt
Check Availability
```

should be visible at the bottom after the user scrolls past the hero.

## Demo Mode Label

Add a small badge:

```txt
Demo marketplace data
```

This helps judges understand it is a bounty prototype.

---

# 23. Complete Master Prompt for Any Coding AI

Copy and paste this into Claude, Gemini, Codex, Cursor, or another coding model.

```txt
You are a senior full-stack product engineer, creative frontend developer, UX architect, and motion designer.

Build a complete responsive multi-provider hall/venue booking marketplace web app called “Hallora”.

The original bounty requires:
1. Responsive landing page for the venue
2. Venue details page with key information
3. Booking request form
4. Date and time slot selection
5. Booking confirmation page
6. Admin login page
7. Admin dashboard to manage bookings
8. Booking statuses: pending, approved, rejected
9. Proper form validation
10. Clean and user-friendly experience

But this app must extend the idea into a marketplace:
- Multiple venue/hall providers can exist.
- Each provider has their own public landing page after registration.
- Each provider can have multiple venues.
- Visitors can browse/search venues, view provider pages, view venue details, select date/time slot, and submit booking requests.
- Provider admins can log in and manage only their own bookings.
- Platform admin support can be included as optional.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation
- shadcn/ui-style components
- Lucide icons
- Mock data/localStorage first
- Structure services so Supabase can replace mock storage later
- No payment integration

Premium animation/WebGL stack:
- GSAP
- @gsap/react
- GSAP ScrollTrigger
- Three.js
- @react-three/fiber
- @react-three/drei
- Lenis optional for smooth scroll on public pages only

Design direction:
Create an Awwwards-inspired experience:
- Cinematic dark luxury visual style
- Huge editorial typography
- Full-screen video hero with fallback image/gradient
- Scroll-triggered storytelling sections
- Sticky story chapters
- Animated venue cards
- Parallax image/video sections
- Smooth reveal animations
- Premium microinteractions
- Horizontal gallery on desktop
- Three.js atmospheric hero canvas
- Provider-specific WebGL signature scenes
- Optional interactive 3D venue floor-plan preview
- Clean, fast, accessible mobile experience
- Support prefers-reduced-motion
- Do not make the admin dashboard overly animated; keep it functional and polished

Use GSAP for:
- Hero text reveals
- Scroll-triggered storytelling
- Pinned story sections
- Horizontal venue galleries
- Masked image reveals
- Page transitions
- Magnetic buttons
- Booking confirmation animation

Use Three.js/R3F for:
- Cinematic hero atmosphere canvas
- Provider-specific 3D signature background
- Floating particles
- Optional interactive venue floor-plan preview
- Optional gallery image distortion

Do not overuse Three.js:
- No Three.js on admin pages
- No heavy 3D inside forms
- Only one major canvas per page
- Lazy-load WebGL components
- Provide image/gradient fallback
- Cap DPR for performance
- Respect prefers-reduced-motion

Public routes:
- /
- /venues
- /venues/[venueSlug]
- /p/[providerSlug]
- /p/[providerSlug]/[venueSlug]
- /book/[venueSlug]
- /booking/confirmation/[bookingCode]
- /become-a-provider

Admin routes:
- /admin/login
- /admin
- /admin/bookings
- /admin/bookings/[bookingId]
- /admin/venues
- /admin/provider-profile

Demo login:
- email: provider@hallora.test
- password: password123

Data models:
Create TypeScript types for Provider, Venue, Booking, Profile, VenueAvailabilityRule, VenueBlockedDate, and BookingStatusHistory.

Provider fields:
- id
- ownerId
- brandName
- slug
- tagline
- description
- story
- logoUrl
- heroVideoUrl
- heroImageUrl
- contactEmail
- contactPhone
- websiteUrl
- address
- city
- country
- status: pending | approved | suspended
- themeJson
- createdAt
- updatedAt

Venue fields:
- id
- providerId
- name
- slug
- shortDescription
- longDescription
- venueType
- capacityMin
- capacityMax
- sizeSqft
- address
- city
- country
- priceFrom
- heroImageUrl
- heroVideoUrl
- galleryUrls
- amenities
- rules
- eventTypes
- status: draft | published | archived
- createdAt
- updatedAt

Booking fields:
- id
- bookingCode
- providerId
- venueId
- customerName
- customerEmail
- customerPhone
- organizationName
- eventType
- eventDate
- startTime
- endTime
- guestCount
- setupNotes
- specialRequests
- status: pending | approved | rejected | cancelled
- adminNote
- reviewedBy
- reviewedAt
- createdAt
- updatedAt

Seed data:
Create at least 3 providers:
1. Lumiere Grand Hall
2. Urban Loft Collective
3. Gardenia Event Estate

Create at least 6 venues:
1. Grand Ballroom
2. Glass Pavilion
3. Rooftop Atelier
4. Industrial Loft Hall
5. Garden Marquee
6. Executive Seminar Suite

Create at least 12 bookings with mixed statuses:
- pending
- approved
- rejected

Booking behavior:
1. User selects venue.
2. User selects date.
3. User selects time slot.
4. User fills booking form.
5. Validate with Zod and React Hook Form.
6. Save booking as pending.
7. Generate booking code like HLR-2026-00482.
8. Redirect to confirmation page.
9. Disable unavailable slots if a pending or approved booking already exists for the same venue/date/time.

Validation:
- customerName required
- valid email required
- phone required
- eventDate must be today or future
- time slot required
- guestCount > 0
- guestCount <= venue capacity
- eventType required
- prevent duplicate pending/approved bookings for same venue/date/time slot
- status defaults to pending

Admin behavior:
1. Provider admin logs in from /admin/login.
2. Dashboard shows pending, approved, rejected counts.
3. Booking table shows all provider bookings.
4. Provider can filter by status, venue, date, and search customer.
5. Provider can open booking details.
6. Provider can approve or reject.
7. When approved, slot becomes unavailable.
8. When rejected, slot becomes available again.
9. Provider can add admin notes.

Required components:
- CinematicNavbar
- Footer
- VideoHero
- MarketplaceSearch
- FeaturedVenueGrid
- ProviderCard
- VenueCard
- StoryScrollSection
- ProviderHero
- ProviderStory
- VenueGallery
- VenueDetailsPanel
- AvailabilityPicker
- TimeSlotSelector
- BookingRequestForm
- BookingReviewStep
- ConfirmationCard
- AdminLoginForm
- AdminSidebar
- AdminStatsCards
- BookingStatusBadge
- BookingTable
- BookingDetailDrawer
- StatusActionButtons
- ProviderRegistrationForm
- EmptyState
- LoadingState
- Toast notifications

Motion components:
- GsapProvider
- ScrollReveal
- SplitTextReveal
- PinnedStorySection
- HorizontalScrollGallery
- MagneticButton
- AnimatedCounter
- PageTransition

WebGL components:
- HeroAtmosphereCanvas
- ProviderSignatureScene
- FloatingParticles
- VenueFloorPlanScene
- ImageDistortionGallery

Accessibility/performance:
- Real labels on forms
- Helpful error messages
- Keyboard navigable controls
- aria attributes where useful
- prefers-reduced-motion support
- Do not break if video files are missing
- Use image/gradient fallbacks
- Avoid huge dependencies
- Ensure responsive layout works on mobile, tablet, and desktop
- Lazy-load WebGL with dynamic import and ssr:false
- Use Canvas dpr={[1, 1.5]}
- No Three.js on admin pages

Suggested file structure:
- app/
  - page.tsx
  - venues/page.tsx
  - venues/[venueSlug]/page.tsx
  - p/[providerSlug]/page.tsx
  - p/[providerSlug]/[venueSlug]/page.tsx
  - book/[venueSlug]/page.tsx
  - booking/confirmation/[bookingCode]/page.tsx
  - become-a-provider/page.tsx
  - admin/login/page.tsx
  - admin/page.tsx
  - admin/bookings/page.tsx
  - admin/bookings/[bookingId]/page.tsx
  - admin/venues/page.tsx
  - admin/provider-profile/page.tsx
- components/
  - layout/
  - public/
  - booking/
  - admin/
  - motion/
  - webgl/
  - ui/
- lib/
  - data/
  - services/
  - schemas/
  - motion/
  - webgl/
  - types.ts
  - utils.ts
- public/
  - images/
  - videos/

Implementation steps:
1. Set up project and dependencies.
2. Create TypeScript types.
3. Create mock seed data.
4. Create localStorage-backed booking service.
5. Create auth service for demo login.
6. Create Zod schemas.
7. Build public layout.
8. Build marketplace homepage.
9. Build GSAP motion components.
10. Build Three.js WebGL components.
11. Build venue browsing page.
12. Build provider landing page.
13. Build venue detail page.
14. Build booking page and confirmation page.
15. Build provider registration page.
16. Build admin login.
17. Build protected admin layout.
18. Build dashboard.
19. Build booking management table and actions.
20. Add responsive polishing.
21. Add reduced-motion support.
22. Run lint/build and fix errors.
23. Add README with setup, demo credentials, routes, and feature checklist.

Before final response:
- Run the project build command.
- Fix TypeScript errors.
- Fix obvious lint issues.
- Make sure all routes compile.
- Summarize what was built.
- Mention any limitations.
```

---

# 24. Claude-Specific Prompt

```txt
You are a senior full-stack product engineer, UX architect, and motion-focused frontend designer.

Build a responsive multi-provider hall/venue booking marketplace web app called “Hallora”.

The app must satisfy the original bounty:
1. Responsive landing page for the venue
2. Venue details page with key information
3. Booking request form
4. Date and time slot selection
5. Booking confirmation page
6. Admin login page
7. Admin dashboard to manage bookings
8. Booking statuses: pending, approved, rejected
9. Proper form validation
10. Clean and user-friendly experience

But extend it into a marketplace:
- Multiple venue/hall providers can exist.
- Each provider has their own public landing page after registration.
- Each provider can have multiple venues.
- Visitors can browse/search venues, view provider pages, view venue details, select date/time slot, and submit booking requests.
- Provider admins can log in and manage only their own bookings.
- Platform admin support can be included as optional.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation
- shadcn/ui-style components
- Lucide icons
- Mock data/localStorage first, but structure services so Supabase can replace mock storage later
- No payment integration

Motion and WebGL stack:
- GSAP
- @gsap/react
- GSAP ScrollTrigger
- Three.js
- @react-three/fiber
- @react-three/drei
- Lenis optional

Design direction:
Create an Awwwards-inspired experience:
- Cinematic dark luxury visual style
- Huge editorial typography
- Full-screen video hero with fallback image/gradient
- Scroll-triggered storytelling sections
- Sticky story chapters
- Animated venue cards
- Parallax image/video sections
- Smooth reveal animations
- Premium microinteractions
- Horizontal gallery on desktop
- Clean, fast, accessible mobile experience
- Support prefers-reduced-motion
- Do not make the admin dashboard overly animated; keep it functional and polished

Use GSAP for:
- Hero text reveals
- Scroll-triggered storytelling
- Pinned story sections
- Horizontal venue galleries
- Masked image reveals
- Page transitions
- Magnetic buttons
- Booking confirmation animation

Use Three.js/R3F for:
- Cinematic hero atmosphere canvas
- Provider-specific 3D signature background
- Floating particles
- Optional interactive venue floor-plan preview
- Optional gallery image distortion

Do not overuse Three.js:
- No Three.js on admin pages
- No heavy 3D inside forms
- Only one major canvas per page
- Lazy-load WebGL components
- Provide image/gradient fallback
- Cap DPR for performance
- Respect prefers-reduced-motion

Create these additional motion components:
- GsapProvider
- ScrollReveal
- SplitTextReveal
- PinnedStorySection
- HorizontalScrollGallery
- MagneticButton

Create these WebGL components:
- HeroAtmosphereCanvas
- ProviderSignatureScene
- VenueFloorPlanScene
- FloatingParticles
- ImageDistortionGallery

Public pages should feel cinematic and award-worthy.
Admin pages should remain clean, fast, and practical.

Main public routes:
- /
- /venues
- /venues/[venueSlug]
- /p/[providerSlug]
- /p/[providerSlug]/[venueSlug]
- /book/[venueSlug]
- /booking/confirmation/[bookingCode]
- /become-a-provider

Admin routes:
- /admin/login
- /admin
- /admin/bookings
- /admin/bookings/[bookingId]
- /admin/venues
- /admin/provider-profile

Use demo data:
Create at least 3 providers:
1. Lumiere Grand Hall
2. Urban Loft Collective
3. Gardenia Event Estate

Create at least 6 venues:
- Grand Ballroom
- Glass Pavilion
- Rooftop Atelier
- Industrial Loft Hall
- Garden Marquee
- Executive Seminar Suite

Create at least 12 sample bookings with mixed statuses:
- pending
- approved
- rejected

Demo login:
- provider@hallora.test
- password123

Booking flow:
1. User opens venue page.
2. User clicks “Check Availability”.
3. User selects event date.
4. App shows available time slots.
5. User selects a slot.
6. User fills event and contact details.
7. User reviews request.
8. User submits booking.
9. App creates pending booking and booking code.
10. User sees confirmation page.

Admin flow:
1. Provider admin logs in from /admin/login.
2. Dashboard shows pending, approved, rejected counts.
3. Booking table shows all provider bookings.
4. Provider can filter by status, venue, date, and search customer.
5. Provider can open booking details.
6. Provider can approve or reject.
7. When approved, slot becomes unavailable.
8. When rejected, slot becomes available again.

Required implementation:
- Fully responsive
- Strong mobile layout
- Accessible forms with labels and useful errors
- Reusable components
- Clean file structure
- Type-safe models
- Zod schemas
- React Hook Form
- GSAP for major motion
- React Three Fiber for selective WebGL
- Avoid breaking app if video assets are missing
- Use gradient/image fallbacks
- No payment integration
- README with setup instructions, demo credentials, and feature list

Deliver:
1. Complete file structure
2. Full source code
3. Explanation of important decisions
4. Instructions to run locally
5. Checklist showing how each bounty requirement is satisfied
```

---

# 25. Gemini-Specific Prompt

```txt
Act as a world-class creative director, UX designer, frontend experience designer, and motion/WebGL art director.

I am building a bounty project: a multi-provider hall/venue booking marketplace web app called “Hallora”.

The app is not just for one venue. It should support many hall/venue providers. Each provider can register and gets their own cinematic public landing page. Each provider can list multiple venues. Visitors can browse venues, open a provider page, view venue details, choose a date/time slot, and submit a booking request. Provider admins can log in and approve/reject bookings.

I want the design to feel Awwwards-inspired:
- Cinematic
- Editorial
- Premium
- Scroll storytelling
- Video-led
- Full of animation
- Luxurious
- Modern marketplace
- GSAP-powered
- Selectively enhanced with Three.js/WebGL
- But still usable and realistic

Your task:
Create a complete creative, UX, motion, and developer handoff blueprint for this app.

Please produce:

1. Brand direction
- Name: Hallora
- Tagline options
- Brand personality
- Visual mood
- Color palette
- Typography pairing
- UI texture ideas
- Icon style
- Photography/video direction

2. Landing page storyboard
Create a section-by-section design for the marketplace homepage:
- Hero
- Search
- Featured venues
- Storytelling section
- Provider showcase
- How it works
- Provider CTA
- Footer

For each section include:
- Layout
- Copywriting
- Animation idea
- Interaction idea
- Mobile behavior

3. Provider landing page storyboard
Each provider has a page like:
/p/lumiere-grand-hall

Design this page as a cinematic microsite:
- Hero video
- Provider story
- Venue collection
- Experience chapters
- Gallery
- Testimonials
- Booking CTA

For each section include:
- Visual concept
- Copy
- Animation
- UX purpose

4. Venue details page storyboard
The venue page should include:
- Hero
- Venue facts
- Gallery/video
- Amenities
- Rules
- Availability preview
- Time slots
- Booking CTA

Make it feel premium but easy to use.

5. Booking flow UX
Design a clean multi-step booking request flow:
- Select date
- Select time slot
- Event details
- Contact details
- Review
- Confirmation

Include validation messages and empty/error states.

6. Admin dashboard UX
Design a simple provider admin dashboard:
- Login
- Overview
- Booking table
- Filters
- Booking detail drawer
- Approve/reject actions
- Status badges
- Venue management

Keep the admin interface cleaner and more practical than the public website.

7. Motion system
Create a GSAP motion guide:
- Page transitions
- Hero text reveal
- Scroll reveal
- Sticky storytelling
- Pinned narrative sections
- Card hover animations
- Magnetic CTAs
- Masked image/video reveals
- Horizontal venue gallery
- Time slot selection animation
- Dashboard microinteractions
- Reduced-motion behavior

8. WebGL / Three.js system
Create a Three.js / React Three Fiber guide:
- Marketplace hero atmosphere canvas
- Provider-specific signature scenes
- Floating particles
- Optional 3D venue floor-plan preview
- Optional gallery image distortion
- Soft particles, shader gradients, spotlight effects, glass distortion
- Mobile fallback
- Reduced-motion fallback
- Performance rules

9. Motion and WebGL storyboard
Create a motion/WebGL storyboard for:
- Marketplace homepage hero
- Marketplace scroll story
- Provider landing page
- Venue details page
- Booking confirmation page

For each, specify:
- Visual concept
- Motion behavior
- Scroll behavior
- WebGL effect, if any
- Mobile fallback
- Reduced-motion fallback
- Performance notes

10. Component inventory
List all reusable components:
- Navbar
- VideoHero
- SearchBar
- VenueCard
- ProviderCard
- StoryScrollSection
- Gallery
- AvailabilityPicker
- TimeSlotSelector
- BookingForm
- ConfirmationCard
- AdminSidebar
- BookingTable
- StatusBadge
- BookingDetailDrawer
- GSAP components
- WebGL components

11. Sample content
Create realistic sample content for:
- 3 providers
- 6 venues
- 12 bookings
- Testimonials
- Amenities
- Rules
- Event types

12. Developer handoff
Write clear instructions for a developer using:
- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- Three.js
- React Three Fiber
- Drei
- React Hook Form
- Zod

Important constraints:
- No payment integration
- Responsive design is required
- Forms must be accessible
- Animations must not hurt performance
- Video sections need image/gradient fallbacks
- WebGL sections need fallback states
- The booking/admin flow must be practical and clear
- Do not use Three.js on admin pages
- Do not over-animate forms

Output the result as a complete design document that I can give to a coding AI.
```

---

# 26. Codex-Specific Prompt

```txt
You are an expert full-stack engineer working inside a codebase.

Build a complete responsive multi-provider hall/venue booking marketplace web app called “Hallora”.

If the repository is empty, create a new Next.js App Router project using:
- TypeScript
- Tailwind CSS
- GSAP
- @gsap/react
- Three.js
- @react-three/fiber
- @react-three/drei
- React Hook Form
- Zod
- Lucide React
- shadcn/ui-style component patterns, but do not require shadcn CLI unless already available

If the repository already exists:
- Inspect the existing structure first
- Reuse the current package manager
- Do not delete existing work unless necessary
- Implement the requested app cleanly

Core bounty requirements:
1. Responsive landing page
2. Venue details page
3. Booking request form
4. Date and time slot selection
5. Booking confirmation page
6. Admin login page
7. Admin dashboard to manage bookings
8. Booking statuses: pending, approved, rejected
9. Proper form validation
10. Clean user-friendly experience

Extended requirement:
This must be a marketplace, not a single venue app.
- Multiple providers exist
- Each provider has a public landing page
- Each provider can have multiple venues
- Provider admins manage only their own bookings

Use mock data/localStorage persistence for the MVP.
Structure the data/services so that Supabase can replace mock storage later.

Public routes:
- /
- /venues
- /venues/[venueSlug]
- /p/[providerSlug]
- /p/[providerSlug]/[venueSlug]
- /book/[venueSlug]
- /booking/confirmation/[bookingCode]
- /become-a-provider

Admin routes:
- /admin/login
- /admin
- /admin/bookings
- /admin/bookings/[bookingId]
- /admin/venues
- /admin/provider-profile

Demo login:
- email: provider@hallora.test
- password: password123

Data models:
Create TypeScript types for:

Provider:
- id
- ownerId
- brandName
- slug
- tagline
- description
- story
- logoUrl
- heroVideoUrl
- heroImageUrl
- contactEmail
- contactPhone
- address
- city
- country
- status: pending | approved | suspended
- themeJson
- createdAt
- updatedAt

Venue:
- id
- providerId
- name
- slug
- shortDescription
- longDescription
- venueType
- capacityMin
- capacityMax
- sizeSqft
- address
- city
- country
- priceFrom
- heroImageUrl
- heroVideoUrl
- galleryUrls
- amenities
- rules
- eventTypes
- status: draft | published | archived
- createdAt
- updatedAt

Booking:
- id
- bookingCode
- providerId
- venueId
- customerName
- customerEmail
- customerPhone
- organizationName
- eventType
- eventDate
- startTime
- endTime
- guestCount
- setupNotes
- specialRequests
- status: pending | approved | rejected | cancelled
- adminNote
- reviewedBy
- reviewedAt
- createdAt
- updatedAt

Seed data:
Create at least 3 providers:
1. Lumiere Grand Hall
2. Urban Loft Collective
3. Gardenia Event Estate

Create at least 6 venues:
1. Grand Ballroom
2. Glass Pavilion
3. Rooftop Atelier
4. Industrial Loft Hall
5. Garden Marquee
6. Executive Seminar Suite

Create at least 12 bookings with mixed statuses:
- pending
- approved
- rejected

Booking behavior:
- User selects venue
- User selects date
- User selects time slot
- User fills booking form
- Validate with Zod and React Hook Form
- Save booking as pending
- Generate booking code like HLR-2026-00482
- Redirect to confirmation page
- Disable unavailable slots if a pending or approved booking already exists for the same venue/date/time

Admin behavior:
- Login with demo credentials
- Protect admin routes
- Show dashboard cards:
  - pending bookings
  - approved bookings
  - rejected bookings
  - total venues
- Show booking table
- Filters:
  - status
  - venue
  - date
  - search by customer name/email
- Booking detail drawer or detail page
- Approve booking action
- Reject booking action
- Add optional admin note
- Update booking status in localStorage/mock service

Design requirements:
Public website should feel Awwwards-inspired:
- Dark luxury visual style
- Cinematic hero
- Video background with safe fallback
- Large editorial typography
- Scroll storytelling
- Smooth GSAP reveal animations
- Premium venue cards
- Parallax-like image sections
- Sticky CTA on venue page
- Horizontal gallery on desktop if feasible
- Elegant mobile responsive layout
- Selective Three.js/WebGL wow factor

Premium animation/WebGL stack:
- gsap
- @gsap/react
- three
- @react-three/fiber
- @react-three/drei
- lenis optional

Implement GSAP correctly in Next.js:
- Use client components for GSAP animations
- Use @gsap/react useGSAP() for lifecycle-safe animations
- Register ScrollTrigger only on the client
- Clean up animations on unmount
- Respect prefers-reduced-motion
- Avoid layout shift

Implement these motion components:
- components/motion/GsapProvider.tsx
- components/motion/ScrollReveal.tsx
- components/motion/SplitTextReveal.tsx
- components/motion/PinnedStorySection.tsx
- components/motion/HorizontalScrollGallery.tsx
- components/motion/MagneticButton.tsx

Implement these WebGL components:
- components/webgl/HeroAtmosphereCanvas.tsx
- components/webgl/ProviderSignatureScene.tsx
- components/webgl/FloatingParticles.tsx
- components/webgl/VenueFloorPlanScene.tsx

WebGL requirements:
- Use React Three Fiber
- Lazy-load WebGL components with dynamic import and ssr:false
- Use dpr={[1, 1.5]}
- Use image/gradient fallback if WebGL fails or reduced motion is enabled
- Do not add Three.js to admin pages
- Keep object count low
- Avoid massive assets

Use GSAP on public pages:
- Homepage hero reveal
- Scroll storytelling section
- Featured venue horizontal gallery
- Provider page pinned story
- Venue detail gallery reveal
- Booking confirmation success animation

Use minimal animation on admin pages:
- Stats card entrance
- Drawer open/close
- Status badge transitions

Admin dashboard design:
- Clean
- Practical
- Minimal motion
- Easy filters
- Clear status badges
- Good empty states

Accessibility/performance:
- Real labels on forms
- Helpful error messages
- Keyboard navigable controls
- aria attributes where useful
- prefers-reduced-motion support
- Do not break if video files are missing
- Use image/gradient fallbacks
- Avoid huge dependencies
- Ensure responsive layout works on mobile, tablet, and desktop

Suggested file structure:
- app/
  - page.tsx
  - venues/page.tsx
  - venues/[venueSlug]/page.tsx
  - p/[providerSlug]/page.tsx
  - p/[providerSlug]/[venueSlug]/page.tsx
  - book/[venueSlug]/page.tsx
  - booking/confirmation/[bookingCode]/page.tsx
  - become-a-provider/page.tsx
  - admin/login/page.tsx
  - admin/page.tsx
  - admin/bookings/page.tsx
  - admin/bookings/[bookingId]/page.tsx
  - admin/venues/page.tsx
  - admin/provider-profile/page.tsx
- components/
  - public/
  - booking/
  - admin/
  - layout/
  - motion/
  - webgl/
  - ui/
- lib/
  - data/
  - services/
  - schemas/
  - motion/
  - webgl/
  - types.ts
  - utils.ts
- public/
  - images/
  - videos/

Important components:
- CinematicNavbar
- VideoHero
- MarketplaceSearch
- VenueCard
- ProviderCard
- StoryScrollSection
- ProviderHero
- VenueGallery
- VenueDetailsPanel
- AvailabilityPicker
- TimeSlotSelector
- BookingRequestForm
- ConfirmationCard
- AdminLoginForm
- AdminSidebar
- AdminStatsCards
- BookingStatusBadge
- BookingTable
- BookingDetailDrawer
- ProviderRegistrationForm
- GsapProvider
- ScrollReveal
- SplitTextReveal
- PinnedStorySection
- HorizontalScrollGallery
- MagneticButton
- HeroAtmosphereCanvas
- ProviderSignatureScene
- FloatingParticles
- VenueFloorPlanScene

Implementation steps:
1. Set up project and dependencies
2. Create TypeScript types
3. Create mock seed data
4. Create localStorage-backed booking service
5. Create auth service for demo login
6. Create Zod schemas
7. Build public layout
8. Build marketplace homepage
9. Build GSAP motion components
10. Build Three.js WebGL components
11. Build venue browsing page
12. Build provider landing page
13. Build venue detail page
14. Build booking page and confirmation page
15. Build provider registration page
16. Build admin login
17. Build protected admin layout
18. Build dashboard
19. Build booking management table and actions
20. Add responsive polishing
21. Add reduced-motion support
22. Run lint/build and fix errors
23. Add README with setup, demo credentials, routes, and feature checklist

Before final response:
- Run the project build command
- Fix TypeScript errors
- Fix obvious lint issues
- Make sure all routes compile
- Summarize what was built
- Mention any limitations
```

---

# 27. README Template for Final Project

Use this README in the generated project.

```md
# Hallora

Hallora is a cinematic multi-provider venue booking marketplace. Visitors can explore premium venue providers, view immersive provider microsites, check venue details, select dates and time slots, and submit booking requests. Venue providers can log in to manage bookings, approve or reject requests, and maintain their venue presence.

## Features

- Responsive marketplace landing page
- Multiple venue providers
- Provider public landing pages
- Venue listing and details pages
- Date and time slot selection
- Booking request form
- Booking confirmation page
- Admin login
- Provider dashboard
- Booking management
- Booking statuses: pending, approved, rejected
- Form validation with Zod and React Hook Form
- GSAP-powered storytelling animation
- Selective Three.js / React Three Fiber WebGL sections
- No payment integration

## Demo Credentials

```txt
email: provider@hallora.test
password: password123
```

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP
- @gsap/react
- Three.js
- @react-three/fiber
- @react-three/drei
- React Hook Form
- Zod
- Lucide React
- Mock data + localStorage

## Routes

### Public

```txt
/
 /venues
 /venues/[venueSlug]
 /p/[providerSlug]
 /p/[providerSlug]/[venueSlug]
 /book/[venueSlug]
 /booking/confirmation/[bookingCode]
 /become-a-provider
```

### Admin

```txt
/admin/login
/admin
/admin/bookings
/admin/bookings/[bookingId]
/admin/venues
/admin/provider-profile
```

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

This is an MVP bounty project. Booking data is stored using mock data and localStorage. The service layer is structured so it can be replaced by Supabase later.
```

---

# 28. Final Project Positioning

Use this in the bounty submission:

```txt
Hallora is a cinematic multi-provider venue booking marketplace. It expands the basic hall booking concept into a polished platform where visitors can browse venues from multiple providers, explore provider-specific landing pages, select date and time slots, and submit booking requests. Provider admins can log in to review, approve, or reject bookings from a simple dashboard. The public site uses GSAP and selective Three.js/WebGL effects for an Awwwards-inspired storytelling experience, while the booking and admin flows remain practical, responsive, accessible, and easy to use. No payment integration is included, as required by the bounty.
```
