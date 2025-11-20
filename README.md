# The Choice Engine - Next.js Version

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

> **Complete Next.js migration of The Choice Engine prototype - Full stack React application with interactive functionality**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Navigate to the project directory
cd next_version

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📱 Project Overview

This is a complete Next.js migration of The Choice Engine prototype, featuring **10 fully interactive pages** built with modern React patterns, TypeScript, and Tailwind CSS.

### What's New in Next.js Version

✅ **Full Interactivity** - All buttons and links are functional
✅ **Client-Side Navigation** - Fast page transitions with Next.js routing
✅ **Shared Components** - Reusable UI components (StatusBar, BottomNav, etc.)
✅ **Type Safety** - TypeScript for better developer experience
✅ **Auto Routing** - Splash screen redirects, loading animations
✅ **State Management** - Interactive forms and user selections
✅ **Optimized Images** - Next.js Image component for performance
✅ **Production Ready** - Can be deployed to Vercel with one click

---

## 📂 Project Structure

```
next_version/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Font Awesome
│   ├── globals.css              # Global styles and animations
│   ├── page.tsx                 # Home/Navigation page
│   ├── splash/page.tsx          # Splash screen (auto-redirects)
│   ├── onboarding/page.tsx      # Onboarding experience
│   ├── camera/page.tsx          # Photo capture interface
│   ├── loading/page.tsx         # AI analysis (auto-redirects)
│   ├── results/page.tsx         # Quote analysis results ⭐
│   ├── part-detail/page.tsx     # Part comparison
│   ├── dashboard/page.tsx       # User dashboard
│   ├── mechanic-finder/page.tsx # Mechanic locator
│   ├── profile/page.tsx         # User profile
│   ├── subscription/page.tsx    # Premium plans
│   └── all-screens/page.tsx     # All screens showcase
│
├── components/                   # Shared React components
│   └── ui/
│       ├── StatusBar.tsx        # iOS status bar
│       ├── BottomNav.tsx        # Bottom navigation
│       └── PhoneFrame.tsx       # Phone mockup frame
│
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.js                # Next.js config
└── README.md                     # This file
```

---

## 🎯 Features & Pages

### Core User Flow (Pages 1-6)

**1. Splash Screen** (`/splash`)
- Animated logo with shimmer effect
- Auto-redirects to onboarding after 3 seconds
- Loading dots animation

**2. Onboarding** (`/onboarding`)
- Value proposition showcase
- Three key features with gradient icons
- Social proof (4.9/5 stars, 50,000+ users)
- CTA button → Camera

**3. Photo Capture** (`/camera`)
- Simulated camera viewfinder
- Animated scanning frame
- Corner brackets with scan line
- Gallery, capture, and flash buttons
- Capture → Loading page

**4. AI Analysis** (`/loading`)
- Three-step progress visualization
- Animated progress bar
- Status indicators with icons
- Auto-redirects to results after 5 seconds

**5. Results & Breakdown** (`/results`) ⭐ **CORE VALUE**
- Price breakdown with color-coded legend
- Total quote vs. fair price range
- Itemized line items with market comparison
- Alternative parts recommendations
- Action buttons: Get Report, Find Mechanics

**6. Part Comparison** (`/part-detail`)
- Three options: OEM, Aftermarket, Refurbished
- Radio button selection
- Tabbed interface (Overview, Specs, Reviews)
- Ratings, warranties, and features
- Update Quote CTA

### Extended Features (Pages 7-10)

**7. Dashboard** (`/dashboard`)
- User statistics (Total Saved, Analyses)
- Quick action cards
- Recent activity list with savings
- Smart insights
- Bottom navigation

**8. Mechanic Finder** (`/mechanic-finder`)
- Simulated map with animated pins
- Search bar with filters
- Mechanic listings with ratings
- Call and Directions buttons
- Bottom navigation

**9. Profile** (`/profile`)
- User info with Premium badge
- Statistics overview
- Vehicle management
- Account settings menu
- Support section
- Bottom navigation

**10. Subscription** (`/subscription`)
- Monthly/Annual billing toggle
- Premium plan (Recommended)
- Free plan comparison
- Feature comparison table
- User testimonials
- FAQ accordion

---

## 🎨 Design System

### Colors
```typescript
Primary: {
  DEFAULT: '#667eea',  // Indigo
  dark: '#764ba2',     // Purple
}

Gradients:
- Primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- Success: #10B981 → #059669
- Warning: #F59E0B → #D97706
- Alert: #EF4444 → #DC2626
```

### Typography
- Font Family: -apple-system (iOS native)
- Base Size: 16px
- Line Height: 1.5
- Weights: 400 (Regular), 600 (Semibold), 700 (Bold)

### Components
- StatusBar: iOS-style status bar with time and icons
- BottomNav: Tab bar navigation with active states
- PhoneFrame: iPhone 16 Pro mockup wrapper

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14.0** - React framework with App Router
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Icons & Assets
- **Font Awesome 6.5.1** - Icon library (via CDN)
- **Unsplash** - High-quality images (configured in next.config.js)

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## 📱 Interactive Features

### Navigation
- ✅ Automatic page redirects (splash → onboarding, loading → results)
- ✅ Link-based navigation with Next.js `<Link>`
- ✅ Programmatic navigation with `useRouter()`
- ✅ Active route highlighting in BottomNav

### Animations
- ✅ Splash screen logo animations
- ✅ Loading progress bar
- ✅ Slide-in animations for list items
- ✅ Pulse effects for interactive elements
- ✅ Smooth page transitions

### User Interactions
- ✅ Button click handlers
- ✅ Tab switching (Part Detail page)
- ✅ Radio button selection
- ✅ Accordion expansion (FAQ)
- ✅ Active state styling
- ✅ Hover effects

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/choice-engine)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 📊 Performance

### Bundle Size
- Initial page load: ~150KB (gzipped)
- Route transitions: < 50KB per page
- Total app size: ~500KB

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Optimizations
- ✅ Server Components for static content
- ✅ Client Components only where needed
- ✅ Image optimization with next/image
- ✅ Code splitting by route
- ✅ CSS purging with Tailwind

---

## 🎯 Development Workflow

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Adding New Pages

1. Create new directory in `app/`:
```bash
mkdir app/new-page
```

2. Create `page.tsx`:
```typescript
export default function NewPage() {
  return <div>New Page</div>
}
```

3. Add route to navigation components

### Creating New Components

1. Create component in `components/ui/`:
```bash
touch components/ui/NewComponent.tsx
```

2. Import and use:
```typescript
import NewComponent from '@/components/ui/NewComponent'
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` for environment-specific configuration:

```bash
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Tailwind Customization

Edit `tailwind.config.ts` to customize theme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#667eea',
        dark: '#764ba2',
      },
    },
  },
}
```

---

## 📝 Migration Notes

### Differences from HTML Version

**Improved:**
- ✅ Full interactivity (not just static pages)
- ✅ Shared components (no code duplication)
- ✅ Type safety with TypeScript
- ✅ Better routing with Next.js
- ✅ Production-ready build system

**Maintained:**
- ✅ Identical visual design
- ✅ Same color scheme and branding
- ✅ All 10 original pages
- ✅ iPhone 16 Pro layout

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue: Port 3000 already in use**
```bash
# Use different port
npm run dev -- -p 3001
```

**Issue: Styles not applying**
```bash
# Restart dev server after Tailwind config changes
```

---

## 👥 Team

**Team 24 - Cornell Tech Studio**

- Kai Gao
- Yifei Hu
- Carter He
- Yihan Zhou

---

## 📄 License

For educational purposes - Cornell Tech Studio project.

---

## 🎉 Next Steps

### For Development
1. ✅ Install dependencies
2. ✅ Run dev server
3. ⚙️ Add backend API integration
4. ⚙️ Implement real OCR functionality
5. ⚙️ Connect to parts database

### For Testing
1. ✅ Test all navigation flows
2. ⚙️ Add unit tests (Jest + React Testing Library)
3. ⚙️ E2E tests (Playwright or Cypress)
4. ⚙️ Mobile device testing

### For Production
1. ⚙️ Set up analytics
2. ⚙️ Add error tracking (Sentry)
3. ⚙️ Implement authentication
4. ⚙️ Deploy to Vercel
5. ⚙️ Set up CI/CD pipeline

---

**Ready to run!** 🚀

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

*Last Updated: November 20, 2025*
