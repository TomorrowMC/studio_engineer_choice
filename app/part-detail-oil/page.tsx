'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { savePartSelection, getPartSelection } from '@/lib/partSelections'

type OilType = 'fullsyn' | 'blend' | 'highmileage' | 'conventional'

interface OilOption {
  type: OilType
  name: string
  brand: string
  price: number
  rating: number
  reviews: number
  warranty: string
  badge: string
  badgeColor: string
  desc: string
  reviewsData: Array<{ name: string; rating: number; date: string; text: string }>
}

export default function PartDetailOilPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<OilType>('blend')

  useEffect(() => {
    const saved = getPartSelection('Engine Oil Change')
    if (saved) {
      if (saved.brand.includes('Blend')) setSelected('blend')
      else if (saved.brand.includes('High-Mileage') || saved.brand.includes('High Mileage')) setSelected('highmileage')
      else if (saved.brand.includes('Conventional')) setSelected('conventional')
      else if (saved.brand.includes('Full Synthetic') || saved.brand.includes('Mobil 1')) setSelected('fullsyn')
    }
  }, [])

  const options: Record<OilType, OilOption> = {
    fullsyn: {
      type: 'fullsyn',
      name: 'Full Synthetic',
      brand: 'Mobil 1 Full Synthetic',
      price: 80,
      rating: 4.9,
      reviews: 41203,
      warranty: '10,000 mi interval',
      badge: 'In Your Quote',
      badgeColor: 'bg-gray-500',
      desc: 'Maximum engine protection, longest interval',
      reviewsData: [
        { name: 'David K.', rating: 5, date: '2 weeks ago', text: 'Best oil for Toyota engines. Noticeably smoother idle and improved fuel economy.' },
        { name: 'Sandra M.', rating: 5, date: '1 month ago', text: 'Long change interval makes it worth the price. Engine runs like new.' },
      ],
    },
    blend: {
      type: 'blend',
      name: 'Synthetic Blend',
      brand: 'Valvoline Synthetic Blend',
      price: 55,
      rating: 4.6,
      reviews: 18904,
      warranty: '7,500 mi interval',
      badge: 'Recommended',
      badgeColor: 'bg-green-500',
      desc: 'Best value — combines synthetic & conventional',
      reviewsData: [
        { name: 'James T.', rating: 5, date: '1 week ago', text: 'Great middle-ground option. My Camry has been running smooth for 60k+ miles on this.' },
        { name: 'Rachel A.', rating: 4, date: '3 weeks ago', text: 'Good price and solid protection. Shop charges less than full synthetic for the same job.' },
      ],
    },
    highmileage: {
      type: 'highmileage',
      name: 'High-Mileage Synthetic',
      brand: 'Castrol GTX High-Mileage',
      price: 68,
      rating: 4.7,
      reviews: 9341,
      warranty: '7,500 mi interval',
      badge: 'Best for 68K mi',
      badgeColor: 'bg-blue-500',
      desc: 'Formulated for engines over 75K miles — seal conditioners included',
      reviewsData: [
        { name: 'Tom R.', rating: 5, date: '5 days ago', text: 'Specifically designed for higher-mileage engines. Noticed less oil consumption right away.' },
        { name: 'Patricia H.', rating: 5, date: '2 weeks ago', text: 'Mechanic recommended this for my 80k-mile Camry. Great call — no leaks since.' },
      ],
    },
    conventional: {
      type: 'conventional',
      name: 'Conventional',
      brand: 'Pennzoil Conventional',
      price: 38,
      rating: 4.2,
      reviews: 7621,
      warranty: '3,000–5,000 mi interval',
      badge: 'Budget',
      badgeColor: 'bg-orange-500',
      desc: 'Basic protection — requires more frequent changes',
      reviewsData: [
        { name: 'Greg L.', rating: 4, date: '1 week ago', text: 'Does the job for basic commuter use. Just remember the shorter change interval.' },
        { name: 'Monica B.', rating: 4, date: '2 weeks ago', text: 'Budget-friendly option. Fine for older cars or if you stay on top of changes.' },
      ],
    },
  }

  const current = options[selected]
  const originalPrice = 80

  const handleSave = () => {
    savePartSelection('Engine Oil Change', {
      itemName: 'Engine Oil Change',
      selectedType: selected as never,
      brand: current.brand,
      price: current.price,
    })
    router.push('/results')
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <Link href="/results" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
            <i className="far fa-heart"></i>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Engine Oil Change</h1>
        <p className="text-sm text-gray-600 mt-1">Choose the right oil type for your vehicle</p>
      </div>

      <div className="px-6 py-6 pb-32">
        {selected !== 'fullsyn' && (
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-3 text-white">
              <i className="fas fa-tag text-2xl"></i>
              <div className="flex-1">
                <p className="font-bold text-lg">Save ${originalPrice - current.price}</p>
                <p className="text-sm text-white/90">Switch to {current.name.toLowerCase()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {(Object.keys(options) as OilType[]).map((key) => {
            const opt = options[key]
            const isSelected = selected === key
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                  isSelected ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900">{opt.name}</h3>
                      <span className={`px-2 py-0.5 ${opt.badgeColor} text-white text-xs font-semibold rounded-full`}>{opt.badge}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 truncate">{opt.brand}</p>
                    <p className="text-xs text-gray-500 mb-2">{opt.desc}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <span className="text-sm font-semibold text-gray-900">{opt.rating}</span>
                        <span className="text-xs text-gray-500">({opt.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <i className="fas fa-road text-indigo-600 text-xs"></i>
                        <span>{opt.warranty}</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">${opt.price}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Sample Reviews */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="p-5">
            <h4 className="font-bold text-gray-900 mb-3">Customer Reviews</h4>
            <div className="space-y-3">
              {current.reviewsData.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{r.name}</span>
                    <span className="text-xs text-gray-500">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(r.rating)].map((_, j) => (
                      <i key={j} className="fas fa-star text-yellow-400 text-xs"></i>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle text-indigo-600"></i>
            Why We Recommend Synthetic Blend
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span>•</span><span>Meets Toyota 0W-20 spec requirement</span></li>
            <li className="flex gap-2"><span>•</span><span>Better cold-weather start protection than conventional</span></li>
            <li className="flex gap-2"><span>•</span><span>{Math.round(((originalPrice - options.blend.price) / originalPrice) * 100)}% cheaper than full synthetic service</span></li>
            <li className="flex gap-2"><span>•</span><span>Suitable for 68,750-mile vehicle mileage</span></li>
          </ul>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          Update Quote with This Option
        </button>
      </div>
    </div>
  )
}
