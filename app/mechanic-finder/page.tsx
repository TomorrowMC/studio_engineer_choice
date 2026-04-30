'use client'

import { useState, useEffect } from 'react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

type FilterType = 'all' | 'certified' | 'dealership' | 'independent'

interface HoursSchedule {
  open: number
  close: number
  satOpen?: number
  satClose?: number
  days: number[]
}

interface Mechanic {
  id: number
  name: string
  type: string
  rating: number
  reviews: number
  distance: string
  distanceMiles: number
  price: string
  specialties: string[]
  badges: string[]
  image: string
  hours: string
  nextSlot: string
  hoursSchedule: HoursSchedule | null
  address: string
  phone: string
  phoneRaw: string
  mapsUrl: string
  filterGroup: string
  estSavingsQ0: number
  estSavingsQ1: number
}

const isOpenNow = (shop: Mechanic): boolean => {
  if (!shop.hoursSchedule) return true
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  if (!shop.hoursSchedule.days.includes(day)) return false
  const openHour = day === 6 && shop.hoursSchedule.satOpen != null
    ? shop.hoursSchedule.satOpen
    : shop.hoursSchedule.open
  const closeHour = day === 6 && shop.hoursSchedule.satClose != null
    ? shop.hoursSchedule.satClose
    : shop.hoursSchedule.close
  return hour >= openHour && hour < closeHour
}

const mechanics: Mechanic[] = [
  {
    id: 1,
    name: 'United Auto Repair',
    type: 'Certified Independent',
    rating: 4.5,
    reviews: 39,
    distance: '1.0 mi',
    distanceMiles: 1.0,
    price: '$$',
    specialties: ['Brake Service', 'Oil Change', 'Towing'],
    badges: ['Certified', 'Fair Pricing'],
    image: 'bg-gradient-to-br from-blue-400 to-blue-600',
    hours: 'Mon–Fri 7:00 AM – 5:00 PM',
    nextSlot: 'Today 2:00 PM',
    hoursSchedule: { open: 7, close: 17, days: [1, 2, 3, 4, 5] },
    address: '236 E 83rd St, New York, NY 10028',
    phone: '(212) 744-0615',
    phoneRaw: '+12127440615',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=236+E+83rd+St%2C+New+York%2C+NY+10028',
    filterGroup: 'certified',
    estSavingsQ0: 64,
    estSavingsQ1: 78,
  },
  {
    id: 2,
    name: 'Vernon Auto Repairs',
    type: 'Local Shop',
    rating: 4.4,
    reviews: 22,
    distance: '0.5 mi',
    distanceMiles: 0.5,
    price: '$',
    specialties: ['Emergency Repairs', 'General Service', 'Towing'],
    badges: ['Open 24/7', 'Budget-Friendly'],
    image: 'bg-gradient-to-br from-green-400 to-green-600',
    hours: 'Open 24 Hours',
    nextSlot: 'Today 11:30 AM',
    hoursSchedule: null,
    address: '38-01 Vernon Blvd, Long Island City, NY 11101',
    phone: '(718) 666-7592',
    phoneRaw: '+17186667592',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=38-01+Vernon+Blvd%2C+Long+Island+City%2C+NY+11101',
    filterGroup: 'independent',
    estSavingsQ0: 55,
    estSavingsQ1: 70,
  },
  {
    id: 3,
    name: 'Ultimate Auto Care',
    type: 'AAA Certified',
    rating: 4.8,
    reviews: 30,
    distance: '1.5 mi',
    distanceMiles: 1.5,
    price: '$$',
    specialties: ['Oil Change', 'Brake Service', 'Engine Diagnostics'],
    badges: ['AAA', 'Warranty'],
    image: 'bg-gradient-to-br from-purple-400 to-purple-600',
    hours: 'Mon–Fri 8 AM–6 PM, Sat 8 AM–2 PM',
    nextSlot: 'Tomorrow 9:00 AM',
    hoursSchedule: { open: 8, close: 18, satOpen: 8, satClose: 14, days: [1, 2, 3, 4, 5, 6] },
    address: '3637 21st St, Astoria, NY 11106',
    phone: '(718) 392-2757',
    phoneRaw: '+17183922757',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=3637+21st+St%2C+Astoria%2C+NY+11106',
    filterGroup: 'certified',
    estSavingsQ0: 72,
    estSavingsQ1: 88,
  },
  {
    id: 4,
    name: 'Barnett Auto Repair',
    type: 'Local Shop',
    rating: 4.4,
    reviews: 30,
    distance: '1.3 mi',
    distanceMiles: 1.3,
    price: '$',
    specialties: ['Brakes', 'AC Service', 'Transmission'],
    badges: ['Budget-Friendly', '60yr Experience'],
    image: 'bg-gradient-to-br from-orange-400 to-orange-600',
    hours: 'Mon–Fri 8:00 AM – 6:00 PM',
    nextSlot: 'Today 4:30 PM',
    hoursSchedule: { open: 8, close: 18, days: [1, 2, 3, 4, 5] },
    address: '44-25 Barnett Ave, Long Island City, NY 11104',
    phone: '(718) 786-5640',
    phoneRaw: '+17187865640',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=44-25+Barnett+Ave%2C+Long+Island+City%2C+NY+11104',
    filterGroup: 'independent',
    estSavingsQ0: 58,
    estSavingsQ1: 76,
  },
  {
    id: 5,
    name: 'BKM Automotive',
    type: 'Certified Independent',
    rating: 4.7,
    reviews: 45,
    distance: '1.1 mi',
    distanceMiles: 1.1,
    price: '$$',
    specialties: ['Import Specialist', 'Engine Repair', 'Inspection'],
    badges: ['Certified', 'Import Specialist'],
    image: 'bg-gradient-to-br from-red-400 to-red-600',
    hours: 'Mon–Fri 8 AM–6 PM, Sat 10 AM–4 PM',
    nextSlot: 'Today 3:15 PM',
    hoursSchedule: { open: 8, close: 18, satOpen: 10, satClose: 16, days: [1, 2, 3, 4, 5, 6] },
    address: '36-48 38th St, Long Island City, NY 11101',
    phone: '(718) 361-9515',
    phoneRaw: '+17183619515',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=36-48+38th+St%2C+Long+Island+City%2C+NY+11101',
    filterGroup: 'certified',
    estSavingsQ0: 68,
    estSavingsQ1: 82,
  },
]

export default function MechanicFinderPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [expandedShopId, setExpandedShopId] = useState<number | null>(null)
  const [activeQuote, setActiveQuote] = useState(0)
  const [toastShopId, setToastShopId] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const idx = parseInt(localStorage.getItem('active_quote') ?? '0')
      setActiveQuote(idx)
    }
  }, [])

  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: 'fa-th-large' },
    { value: 'certified', label: 'Certified', icon: 'fa-certificate' },
    { value: 'dealership', label: 'Dealer', icon: 'fa-building' },
    { value: 'independent', label: 'Local', icon: 'fa-store' },
  ]

  const filteredMechanics = mechanics.filter(shop => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'certified') return shop.filterGroup === 'certified'
    if (selectedFilter === 'dealership') return false
    if (selectedFilter === 'independent') return shop.filterGroup === 'independent'
    return true
  })

  const toggleExpand = (id: number) => {
    setExpandedShopId(expandedShopId === id ? null : id)
  }

  const showEstimateToast = (shopId: number) => {
    setToastShopId(shopId)
    setTimeout(() => setToastShopId(null), 2500)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Toast */}
      {toastShopId !== null && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-xl animate-pop-in whitespace-nowrap">
          <i className="fas fa-crown text-yellow-400 mr-2"></i>
          Get Estimate — available in Premium
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Find Mechanics</h1>
        <p className="text-sm text-gray-500">Trusted shops near Roosevelt Island</p>
      </div>

      {/* Map */}
      <div className="relative h-64 overflow-hidden shadow-inner">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9700%2C40.7490%2C-73.9250%2C40.7750&layer=mapnik&marker=40.7614%2C-73.9480"
          className="w-full h-full border-0"
          title="Map of Roosevelt Island and nearby auto repair shops"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow text-xs font-semibold text-gray-700 flex items-center gap-1.5 pointer-events-none">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          Roosevelt Island, NYC
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 -mt-6 relative z-20 mb-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <i className="fas fa-search text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search by name or service..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm"
            />
            <button className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform hover:bg-indigo-700">
              <i className="fas fa-sliders-h text-sm"></i>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedFilter === filter.value
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${filter.icon} mr-1.5`}></i>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="px-6 mb-3 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{filteredMechanics.length}</span> shops found nearby
        </p>
        <span className="text-indigo-600 text-xs font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          <i className="fas fa-bolt mr-1"></i>Using your quote savings
        </span>
      </div>

      {/* Shop List */}
      <div className="px-6 pb-32 space-y-4">
        {filteredMechanics.map((shop, i) => {
          const open = isOpenNow(shop)
          const estSavings = activeQuote === 1 ? shop.estSavingsQ1 : shop.estSavingsQ0
          const isExpanded = expandedShopId === shop.id

          return (
            <div
              key={shop.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all border border-gray-100 animate-fade-slide-up ${i === 0 ? '' : `delay-${Math.min(i * 75, 300)}`}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="p-5 cursor-pointer" onClick={() => toggleExpand(shop.id)}>
                {/* Shop header */}
                <div className="flex gap-3 mb-3">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-200 bg-gradient-to-br ${shop.image.replace('bg-gradient-to-br ', '')}`} style={{width: 52, height: 52}}>
                    <span className="text-lg font-black text-white">{shop.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-0.5 gap-2">
                      <h3 className="font-bold text-gray-900 truncate flex-1">{shop.name}</h3>
                      <button
                        className="text-gray-300 active:scale-95 transition-all hover:text-red-400 flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="far fa-heart text-lg"></i>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-1.5">{shop.type}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                        <i className="fas fa-star text-yellow-500 text-[10px]"></i>
                        <span className="text-sm font-bold text-gray-900">{shop.rating}</span>
                        <span className="text-xs text-gray-400">({shop.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <i className="fas fa-map-marker-alt text-indigo-500 text-[10px]"></i>
                        <span className="font-medium">{shop.distance}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{shop.price}</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {shop.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100 flex items-center gap-1"
                    >
                      <i className="fas fa-check-circle text-[9px]"></i>
                      {badge}
                    </span>
                  ))}
                  {/* Estimated savings badge */}
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                    <i className="fas fa-piggy-bank mr-1 text-[9px]"></i>
                    Est. save ~${estSavings}
                  </span>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="pt-3 border-t border-gray-100 animate-fade-slide-up">
                    <div className="mb-3">
                      <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Specialties</p>
                      <div className="flex flex-wrap gap-1.5">
                        {shop.specialties.map((specialty, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">{specialty}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-400 mb-0.5 text-[10px] font-medium uppercase">Hours</p>
                        <p className="font-semibold text-gray-800 text-[11px] leading-snug">{shop.hours}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-400 mb-0.5 text-[10px] font-medium uppercase">Address</p>
                        <p className="font-semibold text-gray-800 text-[11px] leading-snug">{shop.address}</p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-3 mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase mb-0.5">Est. Repair Cost</p>
                        <p className="text-indigo-800 font-bold text-sm">Using our recommendations: ~<span className="text-green-600">${estSavings} less</span></p>
                      </div>
                      <i className="fas fa-chart-line text-indigo-400 text-lg"></i>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                      <i className="fas fa-phone-alt text-gray-400 mr-1.5"></i>
                      {shop.phone}
                    </p>

                    {/* Get Estimate button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); showEstimateToast(shop.id) }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl mb-3 active:scale-95 transition-transform text-sm shadow-md shadow-indigo-200"
                    >
                      <i className="fas fa-file-invoice-dollar mr-2"></i>
                      Get Estimate from This Shop
                    </button>
                  </div>
                )}

                {/* Call / Directions */}
                <div className="grid grid-cols-2 gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`tel:${shop.phoneRaw}`}
                    className="flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl active:scale-95 transition-transform hover:bg-indigo-700 shadow-md shadow-indigo-200 text-sm"
                  >
                    <i className="fas fa-phone text-xs"></i>
                    <span>Call</span>
                  </a>
                  <a
                    href={shop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl active:scale-95 transition-transform hover:bg-gray-50 text-sm"
                  >
                    <i className="fas fa-directions text-indigo-600 text-xs"></i>
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-gray-50 px-5 py-2.5 flex items-center justify-between text-xs border-t border-gray-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <div className={`w-2 h-2 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></div>
                  <span className={open ? 'text-green-600' : 'text-gray-400'}>
                    {open ? 'Open now' : 'Closed'}
                  </span>
                  {open && (
                    <span className="text-gray-400 ml-1">
                      · Next: {shop.nextSlot}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-indigo-600 font-semibold">
                  <i className="fas fa-bolt text-[10px]"></i>
                  <span>Instant Booking</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <BottomNav />

      <style jsx>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
