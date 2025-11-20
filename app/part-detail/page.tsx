'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

type PartOption = 'oem' | 'aftermarket' | 'refurbished'
type Tab = 'overview' | 'specs' | 'reviews'

export default function PartDetailPage() {
  const [selectedPart, setSelectedPart] = useState<PartOption>('aftermarket')
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const partOptions = {
    oem: {
      name: 'OEM Premium',
      brand: 'Toyota Genuine Parts',
      price: 420,
      rating: 4.8,
      reviews: 2456,
      warranty: '2 years',
      badge: 'Current',
      badgeColor: 'bg-gray-500',
    },
    aftermarket: {
      name: 'Premium Aftermarket',
      brand: 'Bosch QuietCast',
      price: 280,
      rating: 4.7,
      reviews: 8924,
      warranty: '3 years',
      badge: 'Recommended',
      badgeColor: 'bg-green-500',
    },
    refurbished: {
      name: 'Certified Refurbished',
      brand: 'OEM Refurbished',
      price: 189,
      rating: 4.5,
      reviews: 1234,
      warranty: '1 year',
      badge: 'Best Value',
      badgeColor: 'bg-blue-500',
    },
  }

  const currentOption = partOptions[selectedPart]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/results"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
            <i className="fas fa-heart"></i>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Front Brake Pads</h1>
        <p className="text-sm text-gray-600 mt-1">Compare quality options</p>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Savings Banner */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center gap-3 text-white">
            <i className="fas fa-tag text-2xl"></i>
            <div className="flex-1">
              <p className="font-bold text-lg">Save $140</p>
              <p className="text-sm text-white/90">
                Switch to recommended alternative
              </p>
            </div>
          </div>
        </div>

        {/* Part Options */}
        <div className="space-y-3 mb-6">
          {(Object.keys(partOptions) as PartOption[]).map((key) => {
            const option = partOptions[key]
            const isSelected = selectedPart === key
            return (
              <button
                key={key}
                onClick={() => setSelectedPart(key)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all active:scale-98 ${
                  isSelected
                    ? 'border-indigo-600 ring-4 ring-indigo-100'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div className="mt-1">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{option.name}</h3>
                      <span
                        className={`px-2 py-0.5 ${option.badgeColor} text-white text-xs font-semibold rounded-full`}
                      >
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{option.brand}</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <span className="text-sm font-semibold text-gray-900">
                          {option.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({option.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <i className="fas fa-shield-alt text-indigo-600"></i>
                        <span>{option.warranty} warranty</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${option.price}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {(['overview', 'specs', 'reviews'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">About This Part</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {currentOption.brand} brake pads are engineered for superior
                    stopping power and longevity. Features advanced friction
                    materials that reduce brake dust and noise while maintaining
                    excellent performance in all weather conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>Low-dust ceramic formula</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>Noise-dampening shims included</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>Temperature fade resistant</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>OEM-equivalent fitment</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Material</span>
                  <span className="text-sm font-semibold text-gray-900">
                    Ceramic Composite
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Part Number</span>
                  <span className="text-sm font-semibold text-gray-900">
                    BC1234-A
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="text-sm font-semibold text-gray-900">
                    3.2 lbs
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Compatibility</span>
                  <span className="text-sm font-semibold text-gray-900">
                    Direct Fit
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Expected Life</span>
                  <span className="text-sm font-semibold text-gray-900">
                    50,000 miles
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Made In</span>
                  <span className="text-sm font-semibold text-gray-900">
                    USA
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900">
                        {currentOption.rating}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className="fas fa-star text-yellow-400 text-xs"
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">
                        Based on {currentOption.reviews.toLocaleString()} reviews
                      </p>
                      <div className="space-y-1">
                        {[5, 4, 3].map((stars) => (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-8">
                              {stars}★
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{
                                  width: `${stars === 5 ? 75 : stars === 4 ? 18 : 5}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-3">
                  {[
                    {
                      name: 'John M.',
                      rating: 5,
                      date: '2 weeks ago',
                      text: 'Excellent quality pads. No noise and minimal dust. Great value for money!',
                    },
                    {
                      name: 'Sarah K.',
                      rating: 5,
                      date: '1 month ago',
                      text: "These work just as well as OEM pads at half the price. Can't complain!",
                    },
                  ].map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          {review.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <i
                            key={i}
                            className="fas fa-star text-yellow-400 text-xs"
                          ></i>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Why This Choice */}
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle text-indigo-600"></i>
            Why We Recommend This
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>•</span>
              <span>Same quality standards as OEM parts</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Manufactured by reputable brand</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>33% cheaper than dealer pricing</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Better warranty coverage</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <Link
          href="/results"
          className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg text-center active:scale-95 transition-transform"
        >
          Update Quote with This Option
        </Link>
      </div>
    </div>
  )
}
