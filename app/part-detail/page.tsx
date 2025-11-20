'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { savePartSelection, getPartSelection, type PartType } from '@/lib/partSelections'

type Tab = 'overview' | 'specs' | 'reviews'

interface PartOption {
  type: PartType
  name: string
  brand: string
  price: number
  rating: number
  reviews: number
  warranty: string
  badge: string
  badgeColor: string
  reviewsData: Array<{
    name: string
    rating: number
    date: string
    text: string
  }>
}

export default function PartDetailPage() {
  const router = useRouter()
  const [selectedPart, setSelectedPart] = useState<PartType>('aftermarket')
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  // Load saved selection on mount
  useEffect(() => {
    const saved = getPartSelection('Front Brake Pads')
    if (saved) {
      setSelectedPart(saved.selectedType)
    }
  }, [])

  const partOptions: Record<PartType, PartOption> = {
    oem: {
      type: 'oem',
      name: 'OEM Premium',
      brand: 'Toyota Genuine Parts',
      price: 420,
      rating: 4.8,
      reviews: 2456,
      warranty: '2 years',
      badge: 'Current Quote',
      badgeColor: 'bg-gray-500',
      reviewsData: [
        {
          name: 'Michael R.',
          rating: 5,
          date: '1 week ago',
          text: 'Genuine Toyota parts - perfect fit and finish. Worth the premium if you want OEM quality.',
        },
        {
          name: 'Jennifer L.',
          rating: 5,
          date: '3 weeks ago',
          text: 'Great quality as expected from OEM. A bit pricey but peace of mind is worth it.',
        },
      ],
    },
    aftermarket: {
      type: 'aftermarket',
      name: 'Premium Aftermarket',
      brand: 'Bosch QuietCast',
      price: 280,
      rating: 4.7,
      reviews: 8924,
      warranty: '3 years',
      badge: 'Recommended',
      badgeColor: 'bg-green-500',
      reviewsData: [
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
      ],
    },
    refurbished: {
      type: 'refurbished',
      name: 'Certified Refurbished',
      brand: 'OEM Refurbished',
      price: 189,
      rating: 4.5,
      reviews: 1234,
      warranty: '1 year',
      badge: 'Best Value',
      badgeColor: 'bg-blue-500',
      reviewsData: [
        {
          name: 'David P.',
          rating: 5,
          date: '1 week ago',
          text: 'Amazing deal! These refurbished pads work like new. Saved a ton of money.',
        },
        {
          name: 'Lisa M.',
          rating: 4,
          date: '2 weeks ago',
          text: 'Good quality for the price. Minor cosmetic imperfections but performance is solid.',
        },
      ],
    },
    budget: {
      type: 'budget',
      name: 'Economy Grade',
      brand: 'ACDelco Professional',
      price: 159,
      rating: 4.3,
      reviews: 3567,
      warranty: '1 year',
      badge: 'Budget Option',
      badgeColor: 'bg-orange-500',
      reviewsData: [
        {
          name: 'Robert T.',
          rating: 4,
          date: '3 days ago',
          text: 'Decent pads for daily driving. Not the quietest but they get the job done.',
        },
        {
          name: 'Amanda W.',
          rating: 4,
          date: '1 week ago',
          text: 'Good budget option. Some brake dust but acceptable for the price point.',
        },
      ],
    },
  }

  const currentOption = partOptions[selectedPart]

  const handleSaveAndReturn = () => {
    savePartSelection('Front Brake Pads', {
      itemName: 'Front Brake Pads',
      selectedType: selectedPart,
      brand: currentOption.brand,
      price: currentOption.price,
    })
    router.push('/results')
  }

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
        {selectedPart !== 'oem' && (
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-3 text-white">
              <i className="fas fa-tag text-2xl"></i>
              <div className="flex-1">
                <p className="font-bold text-lg">Save ${420 - currentOption.price}</p>
                <p className="text-sm text-white/90">
                  Switch to {currentOption.name.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Part Options */}
        <div className="space-y-3 mb-6">
          {(Object.keys(partOptions) as PartType[]).map((key) => {
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
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900">{option.name}</h3>
                      <span
                        className={`px-2 py-0.5 ${option.badgeColor} text-white text-xs font-semibold rounded-full`}
                      >
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 truncate">{option.brand}</p>
                    <div className="flex items-center gap-4 mb-2 flex-wrap">
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
                    BC{selectedPart === 'oem' ? '1234-OEM' : selectedPart === 'aftermarket' ? '1234-A' : selectedPart === 'refurbished' ? '1234-R' : '1234-B'}
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
                    {selectedPart === 'oem' ? '50,000' : selectedPart === 'aftermarket' ? '45,000' : selectedPart === 'refurbished' ? '40,000' : '35,000'} miles
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Made In</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedPart === 'oem' ? 'Japan' : 'USA'}
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

                {/* Sample Reviews - Dynamic based on selected part */}
                <div className="space-y-3">
                  {currentOption.reviewsData.map((review, idx) => (
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
              <span>{Math.round(((420 - currentOption.price) / 420) * 100)}% cheaper than dealer pricing</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Better warranty coverage</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSaveAndReturn}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          Update Quote with This Option
        </button>
      </div>
    </div>
  )
}
