import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

export default function OnboardingPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <StatusBar bgColor="transparent" />

      <div className="flex flex-col h-screen pt-4 pb-8 px-6">
        {/* Logo & Tagline */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <i className="fas fa-shield-alt text-4xl text-indigo-600"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">The Choice Engine</h1>
          <p className="text-white/90 text-sm">Your Car Repair Copilot</p>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Stop Overpaying for Car Repairs
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Snap a photo of any repair quote. Get instant analysis, price validation, and cheaper alternatives in seconds.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-camera text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Instant Analysis</p>
                  <p className="text-sm text-gray-600">Upload photo, get results in 5 seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-chart-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Price Transparency</p>
                  <p className="text-sm text-gray-600">Know if you're getting a fair deal</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-bolt text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Smart Alternatives</p>
                  <p className="text-sm text-gray-600">Find cheaper OEM & aftermarket parts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center text-white mb-6">
            <div className="mb-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-300 text-xl"></i>
              ))}
              <span className="ml-2 font-bold text-xl">4.9/5</span>
            </div>
            <p className="text-white/90 font-medium">Join 50,000+ smart car owners</p>
            <p className="text-white/70 text-sm mt-1">Average savings: $230-$300 per quote</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href="/camera"
            className="block w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform text-center"
          >
            <span className="text-lg">Try Your First Quote Free</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
          <button className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-3 rounded-2xl border-2 border-white/30 active:scale-95 transition-transform">
            <i className="fas fa-play-circle mr-2"></i>
            Watch How It Works (30s)
          </button>
          <p className="text-center text-white/70 text-xs mt-3">
            No credit card required • First analysis free • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
