'use client'

import { useState } from 'react'
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
  price: string
  specialties: string[]
  badges: string[]
  image: string
  hours: string
  hoursSchedule: HoursSchedule | null
  address: string
  phone: string
  phoneRaw: string
  mapsUrl: string
  filterGroup: string
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

export default function MechanicFinderPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [expandedShopId, setExpandedShopId] = useState<number | null>(null)

  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: 'fa-th-large' },
    { value: 'certified', label: 'Certified', icon: 'fa-certificate' },
    { value: 'dealership', label: 'Dealer', icon: 'fa-building' },
    { value: 'independent', label: 'Local', icon: 'fa-store' },
  ]

  const mechanics: Mechanic[] = [
    {
      id: 1,
      name: 'United Auto Repair',
      type: 'Certified Independent',
      rating: 4.5,
      reviews: 39,
      distance: '1.0 mi',
      price: '$$',
      specialties: ['Brake Service', 'Oil Change', 'Towing'],
      badges: ['Certified', 'Fair Pricing'],
      image: 'bg-gradient-to-br from-blue-400 to-blue-600',
      hours: 'Mon–Fri 7:00 AM – 5:00 PM',
      hoursSchedule: { open: 7, close: 17, days: [1, 2, 3, 4, 5] },
      address: '236 E 83rd St, New York, NY 10028',
      phone: '(212) 744-0615',
      phoneRaw: '+12127440615',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=236+E+83rd+St%2C+New+York%2C+NY+10028',
      filterGroup: 'certified',
    },
    {
      id: 2,
      name: 'Vernon Auto Repairs',
      type: 'Local Shop',
      rating: 4.4,
      reviews: 22,
      distance: '0.5 mi',
      price: '$',
      specialties: ['Emergency Repairs', 'General Service', 'Towing'],
      badges: ['Open 24/7', 'Budget-Friendly'],
      image: 'bg-gradient-to-br from-green-400 to-green-600',
      hours: 'Open 24 Hours',
      hoursSchedule: null,
      address: '38-01 Vernon Blvd, Long Island City, NY 11101',
      phone: '(718) 666-7592',
      phoneRaw: '+17186667592',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=38-01+Vernon+Blvd%2C+Long+Island+City%2C+NY+11101',
      filterGroup: 'independent',
    },
    {
      id: 3,
      name: 'Ultimate Auto Care',
      type: 'AAA Certified',
      rating: 4.8,
      reviews: 30,
      distance: '1.5 mi',
      price: '$$',
      specialties: ['Oil Change', 'Brake Service', 'Engine Diagnostics'],
      badges: ['AAA', 'Warranty'],
      image: 'bg-gradient-to-br from-purple-400 to-purple-600',
      hours: 'Mon–Fri 8 AM–6 PM, Sat 8 AM–2 PM',
      hoursSchedule: { open: 8, close: 18, satOpen: 8, satClose: 14, days: [1, 2, 3, 4, 5, 6] },
      address: '3637 21st St, Astoria, NY 11106',
      phone: '(718) 392-2757',
      phoneRaw: '+17183922757',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=3637+21st+St%2C+Astoria%2C+NY+11106',
      filterGroup: 'certified',
    },
    {
      id: 4,
      name: 'Barnett Auto Repair',
      type: 'Local Shop',
      rating: 4.4,
      reviews: 30,
      distance: '1.3 mi',
      price: '$',
      specialties: ['Brakes', 'AC Service', 'Transmission'],
      badges: ['Budget-Friendly', '60yr Experience'],
      image: 'bg-gradient-to-br from-orange-400 to-orange-600',
      hours: 'Mon–Fri 8:00 AM – 6:00 PM',
      hoursSchedule: { open: 8, close: 18, days: [1, 2, 3, 4, 5] },
      address: '44-25 Barnett Ave, Long Island City, NY 11104',
      phone: '(718) 786-5640',
      phoneRaw: '+17187865640',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=44-25+Barnett+Ave%2C+Long+Island+City%2C+NY+11104',
      filterGroup: 'independent',
    },
    {
      id: 5,
      name: 'BKM Automotive',
      type: 'Certified Independent',
      rating: 4.7,
      reviews: 45,
      distance: '1.1 mi',
      price: '$$',
      specialties: ['Import Specialist', 'Engine Repair', 'Inspection'],
      badges: ['Certified', 'Import Specialist'],
      image: 'bg-gradient-to-br from-red-400 to-red-600',
      hours: 'Mon–Fri 8 AM–6 PM, Sat 10 AM–4 PM',
      hoursSchedule: { open: 8, close: 18, satOpen: 10, satClose: 16, days: [1, 2, 3, 4, 5, 6] },
      address: '36-48 38th St, Long Island City, NY 11101',
      phone: '(718) 361-9515',
      phoneRaw: '+17183619515',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=36-48+38th+St%2C+Long+Island+City%2C+NY+11101',
      filterGroup: 'certified',
    },
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

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Mechanics</h1>
        <p className="text-sm text-gray-600">Trusted shops near Roosevelt Island</p>
      </div>

      {/* Map Area — OpenStreetMap (Roosevelt Island area, NYC) */}
      <div className="relative h-72 overflow-hidden shadow-inner">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9700%2C40.7490%2C-73.9250%2C40.7750&layer=mapnik&marker=40.7614%2C-73.9480"
          className="w-full h-full border-0"
          title="Map of Roosevelt Island and nearby auto repair shops"
          loading="lazy"
        />
        {/* Location overlay label */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow text-xs font-semibold text-gray-700 flex items-center gap-1.5 pointer-events-none">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
          Roosevelt Island, NYC
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 -mt-6 relative z-20 mb-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <i className="fas fa-search text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by name or service..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-400"
            />
            <button className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform hover:bg-indigo-700">
              <i className="fas fa-sliders-h"></i>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedFilter === filter.value
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
      <div className="px-6 mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filteredMechanics.length}</span>{' '}
          shops found nearby
        </p>
        <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1">
          List View <i className="fas fa-list"></i>
        </button>
      </div>

      {/* Mechanics List */}
      <div className="px-6 pb-32 space-y-4">
        {filteredMechanics.map((shop) => {
          const open = isOpenNow(shop)
          return (
            <div
              key={shop.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100"
            >
              <div className="p-5 cursor-pointer" onClick={() => toggleExpand(shop.id)}>
                {/* Header */}
                <div className="flex gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <span className="text-xl font-black text-gray-500">{shop.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h3 className="font-bold text-gray-900 text-lg truncate flex-1">
                        {shop.name}
                      </h3>
                      <button className="text-gray-400 active:scale-95 transition-transform hover:text-red-500 flex-shrink-0">
                        <i className="far fa-heart text-xl"></i>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{shop.type}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <span className="text-sm font-bold text-gray-900">{shop.rating}</span>
                        <span className="text-xs text-gray-500">({shop.reviews})</span>
                      </div>
                      <span className="text-xs text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <i className="fas fa-map-marker-alt text-indigo-500 text-xs"></i>
                        <span>{shop.distance}</span>
                      </div>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-sm font-semibold text-gray-700">{shop.price}</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {shop.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1"
                    >
                      <i className="fas fa-check-circle text-[10px]"></i>
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-300 overflow-hidden ${expandedShopId === shop.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {shop.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Hours</p>
                      <p className="font-medium text-gray-900">{shop.hours}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="font-medium text-gray-900 text-xs leading-snug">{shop.address}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{shop.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`tel:${shop.phoneRaw}`}
                    className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-semibold rounded-xl active:scale-95 transition-transform hover:bg-indigo-700 shadow-md shadow-indigo-200"
                  >
                    <i className="fas fa-phone"></i>
                    <span>Call</span>
                  </a>
                  <a
                    href={shop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl active:scale-95 transition-transform hover:bg-gray-50"
                  >
                    <i className="fas fa-directions text-indigo-600"></i>
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="bg-gray-50 px-5 py-3 flex items-center justify-between text-xs border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <div className={`w-2 h-2 rounded-full ${open ? 'bg-green-500' : 'bg-red-400'}`}></div>
                  <span>{open ? 'Open now' : 'Closed'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                  <i className="fas fa-bolt"></i>
                  <span>Instant Booking</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <BottomNav />

      <style jsx>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
