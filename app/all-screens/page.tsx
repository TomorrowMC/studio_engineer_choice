import Link from 'next/link'
import PhoneFrame from '@/components/ui/PhoneFrame'

export default function AllScreensPage() {
  const screens = [
    { name: '1. Splash Screen', path: '/splash', desc: 'App launch animation with branding' },
    { name: '2. Onboarding', path: '/onboarding', desc: 'Value proposition & feature highlights' },
    { name: '3. Photo Capture', path: '/camera', desc: 'AI-powered quote scanning interface' },
    { name: '4. AI Analysis', path: '/loading', desc: 'Real-time processing visualization' },
    { name: '5. Results & Breakdown', path: '/results', desc: 'Price analysis with smart alternatives' },
    { name: '6. Part Comparison', path: '/part-detail', desc: 'Detailed alternative parts analysis' },
    { name: '7. Dashboard', path: '/dashboard', desc: 'User history & quick actions' },
    { name: '8. Mechanic Finder', path: '/mechanic-finder', desc: 'Location-based shop discovery' },
    { name: '9. Profile & Settings', path: '/profile', desc: 'Account management & preferences' },
    { name: '10. Subscription Plans', path: '/subscription', desc: 'Premium features & pricing' },
  ]

  return (
    <div className="min-h-screen bg-gradient-primary p-4 sm:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <Link
            href="/"
            className="inline-block mb-4 sm:mb-6 text-white/80 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">All Screens</h1>
          <p className="text-lg sm:text-2xl text-white/90">Complete User Experience Flow</p>
          <p className="text-sm sm:text-base text-white/70 mt-2">10 Interactive Pages • Next.js + React</p>
        </div>

        {/* Screens Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 mb-12">
          {screens.map((screen, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-center mb-4">
                <h2 className="text-white font-bold text-xl mb-2">{screen.name}</h2>
                <p className="text-white/80 text-sm mb-3">{screen.desc}</p>
                <Link
                  href={screen.path}
                  className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Open Full Screen
                </Link>
              </div>

              {/* Phone Frame Preview */}
              <div className="transform scale-75 origin-top">
                <PhoneFrame>
                  <iframe
                    src={screen.path}
                    className="w-full h-full"
                    title={screen.name}
                  />
                </PhoneFrame>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-4 sm:p-8 mb-8 sm:mb-12 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Project Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10</div>
              <p className="text-gray-600">Complete Pages</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-gray-600">Interactive</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">Next.js</div>
              <p className="text-gray-600">Full Stack React</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">TypeScript</div>
              <p className="text-gray-600">Type Safe</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 text-white">
          <h3 className="text-xl font-bold mb-4">
            <i className="fas fa-code mr-2"></i>
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Next.js 14</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>React 18</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>App Router</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Server Components</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Font Awesome</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400"></i>
              <span>Responsive</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/80 pb-8">
          <p className="text-lg mb-2">
            <i className="fas fa-users mr-2"></i>
            Created by Team 24 - Cornell Tech Studio
          </p>
          <p className="text-sm mb-4">
            Kai Gao • Yifei Hu • Carter He • Yihan Zhou
          </p>
          <Link
            href="/"
            className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all"
          >
            <i className="fas fa-home mr-2"></i> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
