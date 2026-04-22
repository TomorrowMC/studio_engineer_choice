'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { savePartSelection, getPartSelection } from '@/lib/partSelections'

type FilterType = 'oem' | 'bosch' | 'fram' | 'kn'

interface FilterOption {
  type: FilterType
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

export default function PartDetailAirFilterPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<FilterType>('bosch')

  useEffect(() => {
    const saved = getPartSelection('Air Filter Replacement')
    if (saved) {
      if (saved.brand.includes('K&N')) setSelected('kn')
      else if (saved.brand.includes('Fram')) setSelected('fram')
      else if (saved.brand.includes('Bosch')) setSelected('bosch')
      else if (saved.brand.includes('OEM') || saved.brand.includes('Toyota')) setSelected('oem')
    }
  }, [])

  const options: Record<FilterType, FilterOption> = {
    oem: {
      type: 'oem',
      name: 'OEM Toyota Filter',
      brand: 'Toyota Genuine Parts',
      price: 40,
      rating: 4.8,
      reviews: 5234,
      warranty: '1 year / 15,000 mi',
      badge: 'In Your Quote',
      badgeColor: 'bg-gray-500',
      desc: 'Original equipment — guaranteed fit and OEM quality',
      reviewsData: [
        { name: 'Brian C.', rating: 5, date: '3 weeks ago', text: 'Exact OEM fit, no issues. More expensive but you know it will work perfectly.' },
        { name: 'Linda P.', rating: 5, date: '1 month ago', text: 'Dealership-quality part. Worth it if you prefer genuine Toyota parts.' },
      ],
    },
    bosch: {
      type: 'bosch',
      name: 'Bosch Workshop Premium',
      brand: 'Bosch 5500WS',
      price: 22,
      rating: 4.7,
      reviews: 12841,
      warranty: '1 year / 12,000 mi',
      badge: 'Recommended',
      badgeColor: 'bg-green-500',
      desc: 'OEM-spec filtration at nearly half the price',
      reviewsData: [
        { name: 'Kevin M.', rating: 5, date: '1 week ago', text: 'Perfect fit on my Camry. Bosch quality at a fraction of the Toyota part price.' },
        { name: 'Janet W.', rating: 5, date: '2 weeks ago', text: "Direct drop-in replacement. Can't tell the difference from the OEM part." },
      ],
    },
    fram: {
      type: 'fram',
      name: 'Fram Extra Guard',
      brand: 'Fram CA10241',
      price: 17,
      rating: 4.4,
      reviews: 8903,
      warranty: '1 year / 12,000 mi',
      badge: 'Budget',
      badgeColor: 'bg-orange-500',
      desc: 'Reliable everyday protection — great value pick',
      reviewsData: [
        { name: 'Mark A.', rating: 4, date: '2 weeks ago', text: 'Does the job well enough. Hard to justify paying more for a cabin air filter.' },
        { name: 'Helen S.', rating: 5, date: '1 month ago', text: 'Fits perfectly and does what it needs to. Budget option that works.' },
      ],
    },
    kn: {
      type: 'kn',
      name: 'K&N High-Performance',
      brand: 'K&N 33-2304',
      price: 55,
      rating: 4.8,
      reviews: 19234,
      warranty: 'Million-Mile Guarantee',
      badge: 'Reusable',
      badgeColor: 'bg-blue-500',
      desc: 'Washable & reusable — pay once, use for years',
      reviewsData: [
        { name: 'Chris R.', rating: 5, date: '4 days ago', text: 'Initial cost is higher but I\'ve been washing and reusing it for 3 years. Net savings are huge.' },
        { name: 'Amy T.', rating: 5, date: '3 weeks ago', text: 'Best long-term investment. Better airflow than OEM and never needs replacing.' },
      ],
    },
  }

  const current = options[selected]
  const originalPrice = 40

  const handleSave = () => {
    savePartSelection('Air Filter Replacement', {
      itemName: 'Air Filter Replacement',
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
        <h1 className="text-2xl font-bold text-gray-900">Air Filter Replacement</h1>
        <p className="text-sm text-gray-600 mt-1">Compare filter options — same fit, different price</p>
      </div>

      <div className="px-6 py-6 pb-32">
        {selected !== 'oem' && (
          <div className={`rounded-2xl p-4 mb-6 shadow-lg text-white ${selected === 'kn' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'}`}>
            <div className="flex items-center gap-3">
              <i className={`fas ${selected === 'kn' ? 'fa-recycle' : 'fa-tag'} text-2xl`}></i>
              <div className="flex-1">
                {selected === 'kn' ? (
                  <>
                    <p className="font-bold text-lg">Reusable — Save Long-Term</p>
                    <p className="text-sm text-white/90">Pay ${current.price} once vs. ${originalPrice} every service</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-lg">Save ${originalPrice - current.price} this visit</p>
                    <p className="text-sm text-white/90">Switch to {current.brand}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {(Object.keys(options) as FilterType[]).map((key) => {
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
                        <i className="fas fa-shield-alt text-indigo-600 text-xs"></i>
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

        {/* Reviews */}
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
            Quick Tip
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span>•</span><span>Air filters are a 5-minute DIY job — no tools needed</span></li>
            <li className="flex gap-2"><span>•</span><span>Buy your own filter and ask the shop to install it</span></li>
            <li className="flex gap-2"><span>•</span><span>K&N filter pays for itself after 2–3 oil change cycles</span></li>
            <li className="flex gap-2"><span>•</span><span>Replace every 12,000–15,000 miles or annually</span></li>
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
