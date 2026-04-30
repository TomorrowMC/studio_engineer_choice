'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'
import { getActivities, type ActivityRecord } from '@/lib/activityStorage'

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current || target === 0) return
    startedRef.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      setValue(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(tick)
      else setValue(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return value
}

const defaultActivities: ActivityRecord[] = [
  {
    id: 'default-1',
    title: 'Brake Service Analysis',
    date: 'Apr 19, 2026',
    shop: 'AutoPro Service Center',
    saved: '$287',
    total: '$1,555',
    icon: 'fa-check-circle',
    color: 'green',
    items: [
      { name: 'Front Brake Pads', originalPrice: 420, currentPrice: 280, status: 'High' },
      { name: 'Brake Rotors (Pair)', originalPrice: 340, currentPrice: 340, status: 'Fair' },
      { name: 'Labor (2.5 hrs)', originalPrice: 300, currentPrice: 225, status: 'High' },
      { name: 'Brake Fluid Flush', originalPrice: 89, currentPrice: 89, status: 'Fair' },
    ],
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'default-2',
    title: 'Oil Change Quote',
    date: 'Apr 14, 2026',
    shop: 'Quick Lube Express',
    saved: '$45',
    total: '$89',
    icon: 'fa-oil-can',
    color: 'blue',
    items: [
      { name: 'Full Synthetic Oil Change', originalPrice: 89, currentPrice: 65, status: 'High' },
      { name: 'Oil Filter', originalPrice: 15, currentPrice: 10, status: 'High' },
    ],
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'default-3',
    title: 'Transmission Service',
    date: 'Apr 7, 2026',
    shop: 'Premier Auto Care',
    saved: '$420',
    total: '$895',
    icon: 'fa-wrench',
    color: 'purple',
    items: [
      { name: 'Transmission Fluid Flush', originalPrice: 350, currentPrice: 280, status: 'High' },
      { name: 'Filter Replacement', originalPrice: 145, currentPrice: 125, status: 'High' },
      { name: 'Labor (3 hrs)', originalPrice: 400, currentPrice: 270, status: 'High' },
    ],
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
]

const borderForColor: Record<string, string> = {
  green: 'border-l-green-400',
  blue: 'border-l-blue-400',
  purple: 'border-l-purple-400',
  orange: 'border-l-orange-400',
}
const bgForColor: Record<string, string> = {
  green: 'bg-green-100',
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
}
const textForColor: Record<string, string> = {
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
}
const savingsBgForColor: Record<string, string> = {
  green: 'bg-green-50 text-green-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Welcome back,')
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [activities, setActivities] = useState<ActivityRecord[]>(defaultActivities)
  const [selectedActivity, setSelectedActivity] = useState<ActivityRecord | null>(null)
  const [userName, setUserName] = useState('Alex Chen')

  const totalSaved = useCountUp(1247)
  const analysisCount = useCountUp(23)

  const tips = [
    {
      title: 'Always ask for itemized quotes',
      content: 'Before agreeing to repairs, get an itemized quote. This makes it easier to spot overcharges and compare prices.',
    },
    {
      title: 'Check for warranty coverage',
      content: "Some repairs might be covered under your vehicle's powertrain or bumper-to-bumper warranty. Always check first.",
    },
    {
      title: 'Ask about aftermarket parts',
      content: 'High-quality aftermarket parts can save you 20–50% compared to OEM parts without sacrificing reliability.',
    },
  ]

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning,')
    else if (hour < 18) setGreeting('Good Afternoon,')
    else setGreeting('Good Evening,')

    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('choice_engine_profile')
      if (profile) {
        try {
          const parsed = JSON.parse(profile)
          if (parsed.name) setUserName(parsed.name)
        } catch {}
      }
      const stored = getActivities()
      if (stored.length > 0) {
        setActivities([...stored, ...defaultActivities].slice(0, 10))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 pt-4 pb-8 rounded-b-[32px] shadow-xl relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="animate-fade-slide-up">
            <p className="text-white/75 text-sm mb-0.5 font-medium">{greeting}</p>
            <h1 className="text-white text-2xl font-bold tracking-tight">{userName}</h1>
          </div>
          <button className="w-10 h-10 glass-card-dark rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
            <div className="relative">
              <i className="fas fa-bell"></i>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-700"></div>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card-dark rounded-2xl p-4 animate-fade-slide-up delay-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-piggy-bank text-white text-xs"></i>
              </div>
              <p className="text-white/80 text-xs font-medium">Total Saved</p>
            </div>
            <p className="text-white text-2xl font-black tabular-nums tracking-tight">
              ${totalSaved.toLocaleString()}
            </p>
            <p className="text-white/60 text-xs mt-1">Lifetime savings</p>
          </div>
          <div className="glass-card-dark rounded-2xl p-4 animate-fade-slide-up delay-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-xs"></i>
              </div>
              <p className="text-white/80 text-xs font-medium">Analyses</p>
            </div>
            <p className="text-white text-2xl font-black tabular-nums tracking-tight">{analysisCount}</p>
            <p className="text-white/60 text-xs mt-1">Quotes scanned</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 space-y-7">

        {/* Quick-start CTA */}
        <Link
          href="/camera"
          className="block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform animate-fade-slide-up"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-magic text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">Analyze a New Quote</p>
              <p className="text-white/70 text-xs mt-0.5">10 seconds to find your savings</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5">
              <span className="text-white text-xs font-bold">Start →</span>
            </div>
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="animate-fade-slide-up delay-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/camera"
              className="group bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 shadow-md active:scale-95 transition-all hover:shadow-green-200 hover:shadow-xl"
            >
              <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <i className="fas fa-camera text-green-600 text-xl"></i>
              </div>
              <p className="text-white font-bold">Scan Quote</p>
              <p className="text-white/80 text-xs mt-0.5">Analyze estimate</p>
            </Link>

            <Link
              href="/mechanic-finder"
              className="group bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 shadow-md active:scale-95 transition-all hover:shadow-blue-200 hover:shadow-xl"
            >
              <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
              </div>
              <p className="text-white font-bold">Find Shop</p>
              <p className="text-white/80 text-xs mt-0.5">Trusted mechanics</p>
            </Link>

            <Link
              href="/compare"
              className="group bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl p-4 shadow-md active:scale-95 transition-all hover:shadow-purple-200 hover:shadow-xl"
            >
              <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <i className="fas fa-columns text-purple-600 text-xl"></i>
              </div>
              <p className="text-white font-bold">Compare</p>
              <p className="text-white/80 text-xs mt-0.5">Side-by-side quotes</p>
            </Link>

            <Link
              href="/profile"
              className="group bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 shadow-md active:scale-95 transition-all hover:shadow-orange-200 hover:shadow-xl"
            >
              <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <i className="fas fa-car text-orange-600 text-xl"></i>
              </div>
              <p className="text-white font-bold">My Vehicles</p>
              <p className="text-white/80 text-xs mt-0.5">Manage your cars</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-slide-up delay-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-semibold">View All</button>
          </div>

          <div className="space-y-2.5">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 ${borderForColor[activity.color] ?? 'border-l-gray-300'} hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]`}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="flex gap-3 items-center">
                  <div className={`w-11 h-11 ${bgForColor[activity.color] ?? 'bg-gray-100'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${activity.icon} ${textForColor[activity.color] ?? 'text-gray-600'} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm truncate flex-1">{activity.title}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{activity.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mb-1.5">{activity.shop}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${savingsBgForColor[activity.color] ?? 'bg-gray-50 text-gray-600'}`}>
                        Saved {activity.saved}
                      </span>
                      <span className="text-xs text-gray-400">Total: {activity.total}</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-300 text-xs flex-shrink-0"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 shadow-lg shadow-indigo-200 animate-fade-slide-up delay-300">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <i className="fas fa-lightbulb text-yellow-300 text-xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold mb-1.5">Smart Insight</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-3">
                You've saved an average of{' '}
                <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded-lg">$156</span> per quote.
                Users like you typically save 18–25% on repair costs.
              </p>
              <button className="text-sm font-bold text-white flex items-center gap-2 hover:gap-3 transition-all">
                See Detailed Stats <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-slide-up delay-400">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <i className="fas fa-graduation-cap text-indigo-600"></i>
              <h3 className="font-bold text-gray-900">Daily Car Tip</h3>
            </div>
            <button onClick={() => setCurrentTipIndex((prev) => (prev + 1) % tips.length)} className="text-gray-400 hover:text-indigo-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-50">
              <i className="fas fa-sync-alt text-sm"></i>
            </button>
          </div>
          <div key={currentTipIndex} className="animate-fade-slide-up">
            <h4 className="font-semibold text-gray-800 mb-1.5 text-sm">{tips[currentTipIndex].title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{tips[currentTipIndex].content}</p>
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedActivity(null)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-5"></div>

            <div className="flex items-start gap-4 mb-5">
              <div className={`w-14 h-14 ${bgForColor[selectedActivity.color] ?? 'bg-gray-100'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <i className={`fas ${selectedActivity.icon} ${textForColor[selectedActivity.color] ?? 'text-gray-600'} text-2xl`}></i>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-0.5">{selectedActivity.title}</h2>
                <p className="text-sm text-gray-500">{selectedActivity.shop}</p>
                <p className="text-xs text-gray-400 mt-0.5">{selectedActivity.date}</p>
              </div>
              <button onClick={() => setSelectedActivity(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">You saved</p>
                <p className="text-2xl font-bold text-green-600">{selectedActivity.saved}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Total quoted</p>
                <p className="text-xl font-bold text-gray-900">{selectedActivity.total}</p>
              </div>
            </div>

            {selectedActivity.items.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Line Items</h3>
                <div className="space-y-2">
                  {selectedActivity.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <span className={`text-xs font-semibold ${item.status === 'Fair' ? 'text-green-600' : 'text-red-500'}`}>{item.status}</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900 text-sm">${item.currentPrice}</p>
                        {item.currentPrice !== item.originalPrice && <p className="text-xs text-gray-400 line-through">${item.originalPrice}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setSelectedActivity(null)} className="mt-5 w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl active:scale-95 transition-transform">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
