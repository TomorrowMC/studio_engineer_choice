'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Welcome back,')
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [statsKey, setStatsKey] = useState(0)

  const tips = [
    {
      title: "Always ask for itemized quotes",
      content: "Before agreeing to repairs, get an itemized quote. This makes it easier to spot overcharges and compare prices."
    },
    {
      title: "Check for warranty coverage",
      content: "Some repairs might be covered under your vehicle's powertrain or bumper-to-bumper warranty. Always check first."
    },
    {
      title: "Ask about aftermarket parts",
      content: "High-quality aftermarket parts can save you 20-50% compared to OEM parts without sacrificing reliability."
    }
  ]

  const activities = [
    {
      id: 1,
      title: "Brake Service Analysis",
      date: "2 days ago",
      shop: "AutoPro Service Center",
      saved: "$287",
      total: "$1,555",
      icon: "fa-check-circle",
      color: "green"
    },
    {
      id: 2,
      title: "Oil Change Quote",
      date: "1 week ago",
      shop: "Quick Lube Express",
      saved: "$45",
      total: "$89",
      icon: "fa-file-invoice",
      color: "blue"
    },
    {
      id: 3,
      title: "Transmission Service",
      date: "2 weeks ago",
      shop: "Premier Auto Care",
      saved: "$420",
      total: "$895",
      icon: "fa-wrench",
      color: "purple"
    }
  ]

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning,')
    else if (hour < 18) setGreeting('Good Afternoon,')
    else setGreeting('Good Evening,')
  }, [])

  const refreshStats = () => {
    setStatsKey(prev => prev + 1)
  }

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-4 pb-8 rounded-b-[30px] shadow-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="animate-fade-in">
            <p className="text-white/80 text-sm mb-1 font-medium">{greeting}</p>
            <h1 className="text-white text-3xl font-bold tracking-tight">Alex Chen</h1>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform border border-white/10">
            <div className="relative">
              <i className="fas fa-bell"></i>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-600"></div>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3" key={statsKey}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-piggy-bank text-white text-sm"></i>
              </div>
              <p className="text-white/90 text-xs font-medium">Total Saved</p>
            </div>
            <p className="text-white text-2xl font-bold tracking-tight">$1,247</p>
            <p className="text-white/70 text-xs mt-1 font-medium">Lifetime savings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-sm"></i>
              </div>
              <p className="text-white/90 text-xs font-medium">Analyses</p>
            </div>
            <p className="text-white text-2xl font-bold tracking-tight">23</p>
            <p className="text-white/70 text-xs mt-1 font-medium">Quotes scanned</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Quick Actions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/camera"
              className="group bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-all hover:shadow-green-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                <i className="fas fa-camera text-green-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Scan Quote</p>
              <p className="text-white/90 text-xs font-medium">Analyze new repair estimate</p>
            </Link>

            <Link
              href="/mechanic-finder"
              className="group bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-all hover:shadow-blue-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Find Shop</p>
              <p className="text-white/90 text-xs font-medium">Locate trusted mechanics</p>
            </Link>

            <Link
              href="/subscription"
              className="group bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-all hover:shadow-purple-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                <i className="fas fa-crown text-purple-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">Go Premium</p>
              <p className="text-white/90 text-xs font-medium">Unlock all features</p>
            </Link>

            <button className="group bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-5 shadow-lg active:scale-95 transition-all hover:shadow-orange-200 hover:shadow-xl text-left">
              <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                <i className="fas fa-car text-orange-600 text-2xl"></i>
              </div>
              <p className="text-white font-bold text-lg mb-1">My Vehicles</p>
              <p className="text-white/90 text-xs font-medium">Manage your cars</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 bg-${activity.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${activity.icon} text-${activity.color}-600 text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h3 className="font-bold text-gray-900 truncate flex-1">
                        {activity.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                        {activity.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {activity.shop}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                        Saved {activity.saved}
                      </span>
                      <span className="text-xs text-gray-500">
                        Total: {activity.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg shadow-indigo-200 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <i className="fas fa-lightbulb text-yellow-300 text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-2">Smart Insight</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4 font-medium">
                You've saved an average of <span className="font-bold bg-white/20 px-1 rounded">$156</span> per quote. Users like you
                typically save 18-25% on repair costs.
              </p>
              <button className="text-sm font-bold text-white flex items-center gap-2 hover:gap-3 transition-all">
                See Detailed Stats <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-graduation-cap text-indigo-600 text-xl"></i>
              <h3 className="font-bold text-gray-900">Daily Car Tip</h3>
            </div>
            <button onClick={nextTip} className="text-gray-400 hover:text-indigo-600 transition-colors">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div key={currentTipIndex} className="animate-fade-in">
             <h4 className="font-semibold text-gray-800 mb-2">{tips[currentTipIndex].title}</h4>
             <p className="text-sm text-gray-600 leading-relaxed mb-3">
               {tips[currentTipIndex].content}
             </p>
          </div>
          <button className="text-sm text-indigo-600 font-semibold hover:underline">
            Learn More
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
