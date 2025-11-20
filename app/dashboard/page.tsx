'use client'

import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h1 className="text-white text-2xl font-bold">Alex Chen</h1>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
            <i className="fas fa-bell"></i>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-piggy-bank text-white text-xl"></i>
              <p className="text-white/80 text-xs">Total Saved</p>
            </div>
            <p className="text-white text-2xl font-bold">$1,247</p>
            <p className="text-white/70 text-xs mt-1">Lifetime savings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-chart-line text-white text-xl"></i>
              <p className="text-white/80 text-xs">Analyses</p>
            </div>
            <p className="text-white text-2xl font-bold">23</p>
            <p className="text-white/70 text-xs mt-1">Quotes scanned</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/camera"
              className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-camera text-green-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Scan Quote</p>
              <p className="text-white/80 text-xs">Analyze new repair estimate</p>
            </Link>

            <Link
              href="/mechanic-finder"
              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Find Shop</p>
              <p className="text-white/80 text-xs">Locate trusted mechanics</p>
            </Link>

            <Link
              href="/subscription"
              className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-crown text-purple-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Go Premium</p>
              <p className="text-white/80 text-xs">Unlock all features</p>
            </Link>

            <button className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-car text-orange-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">My Vehicles</p>
              <p className="text-white/80 text-xs">Manage your cars</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {/* Activity Item 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">
                      Brake Service Analysis
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    AutoPro Service Center
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-green-600">
                      Saved $287
                    </span>
                    <span className="text-xs text-gray-500">
                      Total: $1,555
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-file-invoice text-blue-600 text-xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">
                      Oil Change Quote
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      1 week ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Quick Lube Express
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-green-600">
                      Saved $45
                    </span>
                    <span className="text-xs text-gray-500">
                      Total: $89
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-wrench text-purple-600 text-xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">
                      Transmission Service
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      2 weeks ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Premier Auto Care
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-green-600">
                      Saved $420
                    </span>
                    <span className="text-xs text-gray-500">
                      Total: $895
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-lightbulb text-indigo-600 text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-2">Smart Insight</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                You've saved an average of $156 per quote. Users like you
                typically save 18-25% on repair costs.
              </p>
              <button className="text-sm font-semibold text-white underline">
                See Detailed Stats
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-graduation-cap text-indigo-600 text-xl"></i>
            <h3 className="font-bold text-gray-900">Today's Tip</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Always ask for itemized quotes before agreeing to repairs. This
            makes it easier to spot overcharges and compare prices.
          </p>
          <button className="text-sm text-indigo-600 font-semibold">
            Learn More <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
