'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { savePartSelection, getPartSelection } from '@/lib/partSelections'

type BrandOption = 'wagner' | 'acdelco' | 'raybestos'

interface RotorOption {
  brand: string
  price: number
  rating: number
  reviews: number
  warranty: string
  badge: string
  badgeColor: string
}

export default function PartDetailRotorsPage() {
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState<BrandOption>('acdelco')

  useEffect(() => {
    const saved = getPartSelection('Brake Rotors (Pair)')
    if (saved && saved.brand === 'Wagner Premium') {
      setSelectedBrand('wagner')
    } else if (saved && saved.brand === 'Raybestos Element3') {
      setSelectedBrand('raybestos')
    }
  }, [])

  const options: Record<BrandOption, RotorOption> = {
    wagner: {
      brand: 'Wagner Premium',
      price: 320,
      rating: 4.6,
      reviews: 3421,
      warranty: '3 years',
      badge: 'Best Value',
      badgeColor: 'bg-green-500',
    },
    acdelco: {
      brand: 'ACDelco Professional',
      price: 340,
      rating: 4.7,
      reviews: 5892,
      warranty: '2 years',
      badge: 'Current Quote',
      badgeColor: 'bg-gray-500',
    },
    raybestos: {
      brand: 'Raybestos Element3',
      price: 355,
      rating: 4.8,
      reviews: 2156,
      warranty: '3 years',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
    },
  }

  const currentOption = options[selectedBrand]

  const handleSaveAndReturn = () => {
    savePartSelection('Brake Rotors (Pair)', {
      itemName: 'Brake Rotors (Pair)',
      selectedType: 'aftermarket',
      brand: currentOption.brand,
      price: currentOption.price,
    })
    router.push('/results')
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/results"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Brake Rotors (Pair)</h1>
        <p className="text-sm text-gray-600 mt-1">Compare trusted brands</p>
      </div>

      <div className="px-6 py-6 pb-32">
        {selectedBrand === 'wagner' && (
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-3 text-white">
              <i className="fas fa-tag text-2xl"></i>
              <div className="flex-1">
                <p className="font-bold text-lg">Save $20</p>
                <p className="text-sm text-white/90">Switch to Wagner Premium</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {(Object.keys(options) as BrandOption[]).map((key) => {
            const option = options[key]
            const isSelected = selectedBrand === key
            return (
              <button
                key={key}
                onClick={() => setSelectedBrand(key)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all active:scale-98 ${
                  isSelected
                    ? 'border-indigo-600 ring-4 ring-indigo-100'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
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

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900">{option.brand}</h3>
                      <span
                        className={`px-2 py-0.5 ${option.badgeColor} text-white text-xs font-semibold rounded-full`}
                      >
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Pair (Front)</p>
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

        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle text-indigo-600"></i>
            About These Options
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>•</span>
              <span>All options meet or exceed OEM specifications</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Direct fit for your vehicle</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Trusted brands with proven track records</span>
            </li>
          </ul>
        </div>

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

