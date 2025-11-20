'use client'

import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-1">
          <Link
            href="/camera"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
              <i className="fas fa-share-alt"></i>
            </button>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Analysis</h1>
        <p className="text-sm text-gray-600 mt-1">
          AutoPro Service Center • Nov 20, 2025
        </p>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Success Banner */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 mb-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check-circle text-green-600 text-3xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-xl font-bold mb-1">You Can Save Money!</h2>
              <p className="text-white/90 text-sm mb-3">
                We found cheaper alternatives that match quality standards
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$287</span>
                <span className="text-white/80 text-lg">potential savings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Legend */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Price Breakdown</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-gray-600">Above market</span>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Fair price</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">Slightly high</span>
            </div>
          </div>
        </div>

        {/* Total Price Card */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Quote Total</p>
              <p className="text-3xl font-bold text-gray-900">$1,842</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">With Alternatives</p>
              <p className="text-3xl font-bold text-green-600">$1,555</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">You save</span>
              <span className="font-bold text-green-600 text-lg">$287 (15.6%)</span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-gray-900 text-lg">Itemized Analysis</h3>

          {/* Item 1 - High Price */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-red-500">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">Front Brake Pads</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                    High
                  </span>
                </div>
                <p className="text-sm text-gray-600">OEM Premium Grade</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$420</p>
                <p className="text-xs text-gray-500 line-through">Market: $280</p>
              </div>
            </div>
            <Link
              href="/part-detail"
              className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mt-3"
            >
              <i className="fas fa-tag"></i>
              <span>Save $140 with alternative</span>
              <i className="fas fa-chevron-right text-xs"></i>
            </Link>
          </div>

          {/* Item 2 - Fair Price */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-green-500">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">Brake Rotors (Pair)</h4>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                    Fair
                  </span>
                </div>
                <p className="text-sm text-gray-600">Standard Quality</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$340</p>
                <p className="text-xs text-gray-500">Market: $320-360</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mt-3">
              <i className="fas fa-check-circle"></i>
              <span>Good price for this part</span>
            </div>
          </div>

          {/* Item 3 - Slightly High */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">Labor (2.5 hrs)</h4>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded-full">
                    High
                  </span>
                </div>
                <p className="text-sm text-gray-600">$120/hr rate</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$300</p>
                <p className="text-xs text-gray-500">Market: $200-250</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 text-sm font-semibold mt-3">
              <i className="fas fa-info-circle"></i>
              <span>Above average labor rate</span>
            </div>
          </div>

          {/* Item 4 - Fair */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-green-500">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">Brake Fluid Flush</h4>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                    Fair
                  </span>
                </div>
                <p className="text-sm text-gray-600">DOT 4 Synthetic</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$89</p>
                <p className="text-xs text-gray-500">Market: $75-95</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Parts Recommendation */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-lightbulb text-indigo-600 text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-1">Smart Alternative Found</h3>
              <p className="text-white/90 text-sm">
                High-quality aftermarket parts can save you money without
                compromising safety
              </p>
            </div>
          </div>
          <Link
            href="/part-detail"
            className="block w-full bg-white text-indigo-600 font-bold py-3 rounded-xl text-center active:scale-95 transition-transform"
          >
            View Alternative Options
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
            <i className="fas fa-file-pdf mr-2"></i>
            Get Detailed Report
          </button>
          <Link
            href="/mechanic-finder"
            className="block w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-sm border-2 border-indigo-600 text-center active:scale-95 transition-transform"
          >
            <i className="fas fa-map-marker-alt mr-2"></i>
            Find Better Mechanics Nearby
          </Link>
        </div>
      </div>
    </div>
  )
}
