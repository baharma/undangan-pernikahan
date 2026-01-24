# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **wedding invitation platform** built with Next.js 16, React 19, and Tailwind CSS v4. It creates elegant, animated wedding invitation websites with a split-screen layout: a dynamic hero section with background transitions on the left, and scrollable content sections on the right.

## Development Commands

```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Architecture Overview

### Layout Structure

The main invitation layout ([components/Content/Main/index.tsx](components/Content/Main/index.tsx)) uses a **split-screen design**:

- **Left side (flex-1/lg:flex-1)**: Hero section with
  - `BackgroundTransition` component - smooth cross-fading background images using GSAP
  - Wedding couple names, date, venue, countdown timer
  - Full height on desktop, 50vh on mobile (stacks vertically)

- **Right side (w-1/3 on desktop, w-full on mobile)**: Scrollable content with
  - Theme toggle button (light/dark mode)
  - Multiple sections: Bride & Groom, Story, Gallery, Event (with Google Maps), Gift Giving, Wedding Greetings
  - `BottomNavigator` - sticky navigation bar with smooth scroll to sections

### Theme System

The app supports **light/dark mode** toggling:
- Theme state managed in `ComponentContentMain` with `useState`
- Passed as `theme` prop ("light" | "dark") to all child components
- Components use `clsx` for conditional styling: `isDark ? "dark-styles" : "light-styles"`
- Dark mode uses `neutral-950` background with `amber` accents
- Light mode uses white background with `amber/orange` accents

### Background Transitions

**Critical Component**: [components/UI/BackgroundTransition/index.tsx](components/UI/BackgroundTransition/index.tsx)

- Uses **GSAP** for smooth opacity-based cross-fades between images
- All images rendered simultaneously in absolute-positioned layers
- Preloads all images on mount
- Transitions controlled by `setInterval` with configurable `intervalMs` (default: 7000ms)
- Transition duration controlled by `transitionMs` (default: 1400ms)
- **Key pattern**: Uses `gsap.to()` for opacity animations, NOT React state for smooth performance
- **No scale transforms** - cross-fade only to avoid jarring movements

### Component Architecture (Atomic Design)

**UI Components** (components/UI/):
- `Button` - Button with variants and loading states
- `GradientImage` - Lazy-loaded image with lightbox modal
- `Icon` - Icon wrapper component
- `Title` - Typography component with font variants (pacifico, etc.)
- `BackgroundTransition` - GSAP-powered image slideshow
- `BottomNavigator` - Section navigation with active state tracking

**Content Components** (components/Content/):
- `Home/` - Landing page with entrance animations
- `Main/` - Main invitation page with split-screen layout
  - `Component/bride-and-groom.tsx` - Couple profiles with image placeholders
  - `Component/date-count-down.tsx` - Countdown timer grid
  - `Component/story.tsx` - Love story timeline
  - `Component/gallery.tsx` - Photo gallery
  - `Component/gift-giving.tsx` - Bank account info with copy functionality
  - `Component/wedding-greetings.tsx` - Guest message form

### Responsive Design System

**CSS Variable-based Typography** ([app/globals.css](app/globals.css)):
- Base width variable: `--bw` (1280px desktop, 375px mobile)
- Font sizes calculated: `--text-16d: calc((16 / var(--bw)) * 100vw)`
- Enables fluid scaling across viewport sizes
- Use `--text-XXd` variables instead of hardcoded pixel values

**Breakpoints**:
- Mobile default (< 768px): Stacked vertical layout
- `md:` (768px+): Medium screens
- `lg:` (1024px+): Desktop with horizontal split-screen

### Animation Patterns

**GSAP Usage**:
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Your animations here
  });
  return () => ctx.revert(); // Cleanup
}, []);
```

**For BackgroundTransitions**: Direct `gsap.to()` calls without context (manages own cleanup)

**Entrance Animations**: See [components/Content/Home/index.tsx](components/Content/Home/index.tsx) for examples using `gsap.from()` with stagger

### Data Layer

**HTTP Client** ([lib/http.ts](lib/http.ts)):
- Custom wrapper around Axios with retry logic
- 2 retries with 1s delay between attempts
- Default timeout: 15s (9999999ms for blobs)
- Supports both full URLs and endpoint+base URL patterns
- Usage: `http<T>(endpoint, options, responseType, customTimeout, customBaseUrl)`

**Appwrite Integration** ([lib/appwrite-server.ts](lib/appwrite-server.ts)):
- Server-side Appwrite client for database operations
- Requires env vars: `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY`

### Routing

- **App Router** (Next.js 16)
- Dynamic route: `[slug]` in [app/[slug]/page.tsx](app/[slug]/page.tsx)
- Each slug = unique wedding invitation page
- Root layout in [app/layout.tsx](app/layout.tsx)

## Component Patterns

### Theme Prop Pattern

All content components accept a `theme` prop:
```typescript
type MyComponentProps = {
  theme?: "light" | "dark";
};
```

Inside components:
```typescript
const isDark = theme === "dark";
// Use with clsx
className={clsx(
  isDark ? "dark-class" : "light-class"
)}
```

### Bottom Navigator Integration

The `BottomNavigator` component:
- Sticky position at bottom of scrollable container
- Auto-detects active section based on scroll position
- Listens to scroll events on container with `data-scroll-container="true"`
- Requires sections to have `id` attributes matching `navItems` array

### Copy to Clipboard Pattern

Used in `gift-giving.tsx`:
```typescript
const copyToClipboard = async (text: string) => {
  const cleanText = text.replace(/\s/g, ""); // Remove spaces
  await navigator.clipboard.writeText(cleanText);
  // Show success state temporarily
};
```

## Technology Stack

- **Next.js 16.1.3** - App Router with React Server Components
- **React 19.2.3** - Latest React features
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility-first CSS with @theme inline config
- **GSAP 3.14.2** - Professional animations (@gsap/react for hooks)
- **TanStack Query 5.90** - Server state management
- **Appwrite 21.5** - Backend-as-a-service BaaS
- **React Icons 5.5** - Icon library
- **Axios 1.13** - HTTP client
- **clsx 2.1.1** - Conditional className utility

## Environment Variables

Required for production:

```bash
APPWRITE_ENDPOINT         # Appwrite API endpoint
APPWRITE_PROJECT_ID       # Appwrite project ID
APPWRITE_API_KEY          # Appwrite API key (server-side only)
NEXT_PUBLIC_API_URL      # Optional base URL for API requests
```

## Important Notes

### Mobile Responsiveness
- Left (hero) section: `h-[50vh]` on mobile, `h-screen` on desktop
- Right (content) section: `w-full` on mobile, `w-1/3` on desktop
- Container: `flex-col lg:flex-row` for vertical→horizontal switch

### Scroll Container
The right side content area must have `data-scroll-container="true"` attribute for `BottomNavigator` to work correctly.

### Image Loading
- `BackgroundTransition` preloads all images on mount
- `GradientImage` uses Intersection Observer for lazy loading
- Always set `lazy={false}` for critical above-fold images (like hero backgrounds)

### Dark Mode Colors
- Background: `bg-neutral-950`
- Text: `text-neutral-100` (primary), `text-neutral-400` (secondary)
- Accents: `amber-400/500` for buttons, highlights
- Borders: `border-neutral-800`

### Light Mode Colors
- Background: `bg-white`
- Text: `text-gray-900` (primary), `text-gray-600` (secondary)
- Accents: `amber-500/600` for buttons, highlights
- Borders: `border-gray-100/200`
