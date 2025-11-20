import Link from 'next/link'

export default function Home() {
  const screens = [
    { href: '/splash', icon: 'fa-bolt', label: '1. Splash Screen' },
    { href: '/onboarding', icon: 'fa-hand-sparkles', label: '2. Onboarding' },
    { href: '/camera', icon: 'fa-camera', label: '3. Photo Capture' },
    { href: '/loading', icon: 'fa-spinner', label: '4. AI Analysis' },
    { href: '/results', icon: 'fa-chart-bar', label: '5. Results' },
    { href: '/part-detail', icon: 'fa-cog', label: '6. Part Comparison' },
    { href: '/dashboard', icon: 'fa-history', label: '7. Dashboard' },
    { href: '/mechanic-finder', icon: 'fa-map-marker-alt', label: '8. Mechanic Finder' },
    { href: '/profile', icon: 'fa-user-circle', label: '9. Profile' },
    { href: '/subscription', icon: 'fa-crown', label: '10. Subscription' },
    { href: '/all-screens', icon: 'fa-th', label: 'View All Screens', special: true },
  ]

  const features = [
    { icon: 'fa-camera', title: 'Photo-Based Input', desc: 'No manual entry - just snap a photo of any repair quote' },
    { icon: 'fa-brain', title: 'AI Quote Analysis', desc: 'Advanced OCR and NLP parse quotes in 5 seconds' },
    { icon: 'fa-chart-line', title: 'Price Transparency', desc: 'Compare against 50,000+ quotes for fair pricing' },
    { icon: 'fa-bolt', title: 'Smart Alternatives', desc: 'Find cheaper OEM, aftermarket, and refurbished parts' },
    { icon: 'fa-map-marker-alt', title: 'Mechanic Network', desc: 'Connect with trusted mechanics in your area' },
    { icon: 'fa-history', title: 'Quote History', desc: 'Track all your past analyses and savings' },
  ]

  return (
    <div className="min-h-screen bg-gradient-primary p-4 sm:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-2xl">
            <i className="fas fa-shield-alt text-4xl sm:text-5xl text-indigo-600"></i>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">The Choice Engine</h1>
          <p className="text-lg sm:text-2xl text-white/90 mb-2 px-4">Complete Interactive Prototype</p>
          <p className="text-sm sm:text-lg text-white/70 px-4">Next.js Version - Snap • Analyze • Save</p>
        </div>

        {/* Navigation Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-4 sm:p-8 mb-8 sm:mb-12 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <i className="fas fa-compass text-indigo-600 mr-2"></i>
            Navigation Guide
          </h2>
          <p className="text-gray-600 mb-6">
            This prototype contains 10 complete screens with full interactivity.
            Each screen is optimized for iPhone 16 Pro and ready for demonstration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.map((screen) => (
              <Link
                key={screen.href}
                href={screen.href}
                className={`inline-block px-6 py-4 rounded-xl font-semibold transition-all shadow-md active:scale-95 ${
                  screen.special
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-300'
                }`}
              >
                <i className={`fas ${screen.icon} mr-2`}></i>
                {screen.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 px-4">Key Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-4 sm:p-8 mb-8 sm:mb-12 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Core Value Proposition
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10 Hours → 10 Seconds</div>
              <p className="text-gray-600">Time saved researching quotes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$230 - $300</div>
              <p className="text-gray-600">Average savings per quote</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
              <p className="text-gray-600">Smart car owners using the app</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Competitive Advantages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                <div>
                  <p className="font-semibold text-gray-900">vs. Google/Reddit</p>
                  <p className="text-sm text-gray-600">Instant answers vs. 10 hours of research</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                <div>
                  <p className="font-semibold text-gray-900">vs. RepairPal</p>
                  <p className="text-sm text-gray-600">Photo input vs. manual data entry</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                <div>
                  <p className="font-semibold text-gray-900">vs. Second Opinion</p>
                  <p className="text-sm text-gray-600">Instant vs. 1-2 days wait time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                <div>
                  <p className="font-semibold text-gray-900">Unique Value</p>
                  <p className="text-sm text-gray-600">Actionable alternatives, not just price ranges</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/80 pb-8">
          <p className="text-lg mb-2">
            <i className="fas fa-users mr-2"></i>
            Created by Team 24 - Cornell Tech Studio
          </p>
          <p className="text-sm">Kai Gao • Yifei Hu • Carter He • Yihan Zhou</p>
          <p className="text-xs mt-4 text-white/60">Next.js Version - Full Stack React Application</p>
        </div>
      </div>
    </div>
  )
}
