# 🚀 Quick Start Guide

## The Choice Engine - Next.js Version

### 📦 Installation (3 steps)

```bash
# 1. Navigate to project
cd next_version

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**That's it!** Open [http://localhost:3000](http://localhost:3000)

---

## ✅ What You Get

### 10 Complete Interactive Pages

1. **/** - Home & Navigation
2. **/splash** - Animated splash screen
3. **/onboarding** - Value proposition
4. **/camera** - Photo capture UI
5. **/loading** - AI analysis animation
6. **/results** - Quote breakdown ⭐
7. **/part-detail** - Part comparison
8. **/dashboard** - User dashboard
9. **/mechanic-finder** - Shop locator
10. **/profile** - User profile
11. **/subscription** - Premium plans
12. **/all-screens** - All pages showcase

### Key Features

✅ **Full Interactivity** - All buttons work
✅ **Auto Navigation** - Splash → Onboarding, Loading → Results
✅ **Shared Components** - Reusable UI elements
✅ **Type Safe** - TypeScript throughout
✅ **Responsive Design** - Mobile-first approach
✅ **Smooth Animations** - CSS transitions
✅ **Bottom Navigation** - Active route highlighting

---

## 🎯 Quick Demo Flow

### Try this user journey:

1. Start at **/** (home)
2. Click **"2. Onboarding"**
3. Click **"Try Your First Quote Free"** → Camera
4. Click **Capture Button** → Loading
5. Wait 5 seconds → Auto-redirects to Results
6. Click **"Compare All Options"** → Part Detail
7. Click **"Find Mechanics"** → Mechanic Finder
8. Use **Bottom Navigation** to explore Dashboard, Profile

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Font Awesome** - Icons

---

## 📁 Project Structure

```
next_version/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Home
│   ├── splash/            # Splash screen
│   ├── onboarding/        # Onboarding
│   ├── camera/            # Camera
│   ├── loading/           # Loading
│   ├── results/           # Results ⭐
│   ├── part-detail/       # Part comparison
│   ├── dashboard/         # Dashboard
│   ├── mechanic-finder/   # Mechanic finder
│   ├── profile/           # Profile
│   ├── subscription/      # Subscription
│   └── all-screens/       # Showcase
│
├── components/ui/          # Shared components
│   ├── StatusBar.tsx      # iOS status bar
│   ├── BottomNav.tsx      # Bottom navigation
│   └── PhoneFrame.tsx     # Phone mockup
│
└── public/                # Static assets
```

---

## 💡 Development Tips

### Hot Reload
- Save any file → Page auto-refreshes
- No need to restart server

### Adding Pages
```bash
# Create new page
mkdir app/new-page
touch app/new-page/page.tsx
```

### Using Components
```typescript
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

export default function MyPage() {
  return (
    <>
      <StatusBar />
      {/* Your content */}
      <BottomNav />
    </>
  )
}
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#667eea',  // Change this
        dark: '#764ba2',
      },
    },
  },
}
```

### Animations
Edit `app/globals.css` for custom animations

---

## 🐛 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Module errors?**
```bash
rm -rf node_modules .next
npm install
```

**Styles not updating?**
- Restart dev server after Tailwind config changes

---

## 🚢 Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies |
| `app/layout.tsx` | Root layout |
| `app/page.tsx` | Home page |
| `app/globals.css` | Global styles |
| `tailwind.config.ts` | Tailwind config |
| `next.config.js` | Next.js config |

---

## ✨ Next Steps

1. ✅ **Run the app** - `npm run dev`
2. ⚙️ **Explore pages** - Click through all screens
3. ⚙️ **Customize** - Change colors, content
4. ⚙️ **Add features** - Backend API, real data
5. ⚙️ **Deploy** - Vercel, Netlify, etc.

---

## 🎉 You're Ready!

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Have fun building!** 🚀

---

## 📞 Need Help?

- Check `README.md` for full documentation
- Visit Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs

---

*Created by Team 24 - Cornell Tech Studio*
