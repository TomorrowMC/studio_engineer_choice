'use client'

import { useState } from 'react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

type FilterType = 'all' | 'certified' | 'dealership' | 'independent'

export default function MechanicFinderPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')

  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: 'fa-th-large' },
    { value: 'certified', label: 'Certified', icon: 'fa-certificate' },
    { value: 'dealership', label: 'Dealer', icon: 'fa-building' },
    { value: 'independent', label: 'Local', icon: 'fa-store' },
  ]

  const mechanics = [
    {
      name: 'AutoTech Pro',
      type: 'Certified Independent',
      rating: 4.8,
      reviews: 234,
      distance: '0.8 mi',
      price: '$$',
      specialties: ['Brake Service', 'Oil Change'],
      badges: ['Certified', 'Fair Pricing'],
      image: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      name: 'Premier Auto Care',
      type: 'AAA Certified',
      rating: 4.9,
      reviews: 567,
      distance: '1.2 mi',
      price: '$$$',
      specialties: ['All Services', 'Diagnostics'],
      badges: ['AAA', 'Warranty'],
      image: 'bg-gradient-to-br from-purple-400 to-purple-600',
    },
    {
      name: 'QuickFix Garage',
      type: 'Local Shop',
      rating: 4.6,
      reviews: 128,
      distance: '1.5 mi',
      price: '$',
      specialties: ['Quick Service', 'Tires'],
      badges: ['Budget-Friendly'],
      image: 'bg-gradient-to-br from-green-400 to-green-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Mechanics</h1>
        <p className="text-sm text-gray-600">Trusted shops near you</p>
      </div>

      {/* Map Area */}
      <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Map Pins */}
        <div className="absolute top-1/4 left-1/3 animate-bounce">
          <div className="relative">
            <i className="fas fa-map-marker-alt text-red-500 text-4xl drop-shadow-lg"></i>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap">
              AutoTech Pro
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 animate-bounce animation-delay-200">
          <i className="fas fa-map-marker-alt text-purple-500 text-3xl drop-shadow-lg"></i>
        </div>
        <div className="absolute top-2/3 left-1/4 animate-bounce animation-delay-400">
          <i className="fas fa-map-marker-alt text-green-500 text-3xl drop-shadow-lg"></i>
        </div>

        {/* Your Location */}
        <div className="absolute bottom-1/3 right-1/3">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 active:scale-95 transition-transform">
            <i className="fas fa-plus"></i>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 active:scale-95 transition-transform">
            <i className="fas fa-minus"></i>
          </button>
        </div>

        {/* Current Location Button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 active:scale-95 transition-transform">
          <i className="fas fa-crosshairs text-xl"></i>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 -mt-6 relative z-10 mb-4">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <i className="fas fa-search text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by name or service..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-400"
            />
            <button className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform">
              <i className="fas fa-sliders-h"></i>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedFilter === filter.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <i className={`fas ${filter.icon} mr-2`}></i>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{mechanics.length}</span>{' '}
          shops found nearby
        </p>
      </div>

      {/* Mechanics List */}
      <div className="px-6 pb-32 space-y-4">
        {mechanics.map((shop, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm overflow-hidden active:scale-98 transition-transform"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex gap-4 mb-4">
                {/* Shop Logo */}
                <div
                  className={`w-16 h-16 ${shop.image} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <i className="fas fa-wrench text-white text-2xl"></i>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {shop.name}
                    </h3>
                    <button className="text-gray-400 active:scale-95 transition-transform">
                      <i className="far fa-heart text-xl"></i>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{shop.type}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-star text-yellow-400 text-sm"></i>
                      <span className="text-sm font-semibold text-gray-900">
                        {shop.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({shop.reviews})
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt text-indigo-600"></i>
                      <span>{shop.distance}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {shop.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {shop.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {shop.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-semibold rounded-xl active:scale-95 transition-transform">
                  <i className="fas fa-phone"></i>
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl active:scale-95 transition-transform">
                  <i className="fas fa-directions"></i>
                  <span>Directions</span>
                </button>
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <i className="fas fa-clock text-green-600"></i>
                <span>Open now</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <i className="fas fa-calendar-check text-indigo-600"></i>
                <span>Same-day available</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />

      {/* Animation styles */}
      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
