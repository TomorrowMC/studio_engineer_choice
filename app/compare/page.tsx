'use client'

import Link from 'next/link'
import { useState } from 'react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

const QUOTES = [
  {
    id: 0,
    vehicle: '2018 Toyota Camry',
    shop: 'AutoCare Service Center',
    date: 'April 21, 2026',
    mileage: '68,750 mi',
    totalQuoted: 691.20,
    potentialSavings: 80,
    taxRate: 8.0,
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
    items: [
      { name: 'Brake Pad Replacement', quoted: 250, market: 195, status: 'High' as const },
      { name: 'Engine Oil Change', quoted: 80, market: 55, status: 'High' as const },
      { name: 'Air Filter Replacement', quoted: 40, market: 22, status: 'High' as const },
      { name: 'Labor (3 hrs)', quoted: 270, market: 270, status: 'Fair' as const },
    ],
  },
  {
    id: 1,
    vehicle: '2019 Honda Accord',
    shop: 'XYZ Auto Service',
    date: 'April 23, 2024',
    mileage: '87,450 mi',
    totalQuoted: 444.00,
    potentialSavings: 95,
    taxRate: 8.25,
    color: 'from-violet-500 to-purple-600',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    badgeColor: 'bg-violet-100 text-violet-700',
    items: [
      { name: 'Serpentine Belt', quoted: 125, market: 90, status: 'High' as const },
      { name: 'Tire Rotation & Balance', quoted: 60, market: 60, status: 'Fair' as const },
      { name: 'Replace Battery', quoted: 180, market: 145, status: 'High' as const },
      { name: 'Cabin Air Filter', quoted: 45, market: 22, status: 'High' as const },
    ],
  },
]

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 'both'>('both')

  const betterQuote = QUOTES.reduce((a, b) => (a.potentialSavings > b.potentialSavings ? a : b))
  const totalCombinedSavings = QUOTES.reduce((s, q) => s + q.potentialSavings, 0)

  const displayedQuotes = activeTab === 'both' ? QUOTES : [QUOTES[activeTab]]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden pb-24">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <Link href="/dashboard" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
            <i className="fas fa-arrow-left text-sm"></i>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Compare Quotes</h1>
            <p className="text-xs text-gray-400">Side-by-side analysis of your demo quotes</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">

        {/* Summary banner */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 shadow-lg shadow-indigo-200 animate-fade-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-columns text-white text-lg"></i>
            </div>
            <div className="text-white">
              <h2 className="font-bold">Combined Savings Opportunity</h2>
              <p className="text-white/70 text-xs">Across both demo quotes</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {QUOTES.map((q) => (
              <div key={q.id} className="bg-white/15 rounded-2xl p-3 text-center border border-white/20">
                <p className="text-white/70 text-[10px] font-medium mb-1 truncate">{q.vehicle.split(' ').slice(1).join(' ')}</p>
                <p className="text-white text-xl font-black">${q.potentialSavings}</p>
                <p className="text-white/60 text-[10px]">savings</p>
              </div>
            ))}
            <div className="bg-yellow-400/20 rounded-2xl p-3 text-center border border-yellow-300/30">
              <p className="text-white/70 text-[10px] font-medium mb-1">Combined</p>
              <p className="text-yellow-300 text-xl font-black">${totalCombinedSavings}</p>
              <p className="text-white/60 text-[10px]">total</p>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className={`rounded-2xl p-4 border ${betterQuote.borderColor} ${betterQuote.lightColor} animate-fade-slide-up delay-100`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${betterQuote.color} flex items-center justify-center flex-shrink-0`}>
              <i className="fas fa-trophy text-white text-sm"></i>
            </div>
            <div>
              <p className={`font-bold text-sm ${betterQuote.textColor}`}>Best Savings — {betterQuote.vehicle}</p>
              <p className="text-gray-500 text-xs">
                ${betterQuote.potentialSavings} potential savings · {betterQuote.shop}
              </p>
            </div>
          </div>
        </div>

        {/* Tab toggles */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl animate-fade-slide-up delay-150">
          {(['both', 0, 1] as const).map((tab) => (
            <button
              key={String(tab)}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              {tab === 'both' ? 'Both' : tab === 0 ? 'Toyota' : 'Honda'}
            </button>
          ))}
        </div>

        {/* Quote cards */}
        {activeTab === 'both' ? (
          <div className="grid grid-cols-2 gap-3 animate-fade-slide-up delay-200">
            {QUOTES.map((q) => (
              <QuoteCard key={q.id} quote={q} compact />
            ))}
          </div>
        ) : (
          <div className="animate-fade-slide-up delay-200">
            <QuoteCard quote={QUOTES[activeTab]} compact={false} />
          </div>
        )}

        {/* Item-by-item comparison */}
        {activeTab === 'both' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-fade-slide-up delay-300">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-list-ul text-indigo-500 text-sm"></i>
              Itemized Breakdown
            </h3>
            {[0, 1, 2, 3].map((idx) => {
              const q0item = QUOTES[0].items[idx]
              const q1item = QUOTES[1].items[idx]
              if (!q0item || !q1item) return null
              return (
                <div key={idx} className="grid grid-cols-2 gap-2 mb-3 last:mb-0">
                  <ItemRow item={q0item} quote={QUOTES[0]} />
                  <ItemRow item={q1item} quote={QUOTES[1]} />
                </div>
              )
            })}
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-3 animate-fade-slide-up delay-400">
          <Link
            href="/camera"
            className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl text-center shadow-lg active:scale-95 transition-transform"
          >
            <i className="fas fa-magic mr-2"></i>
            Analyze a New Quote
          </Link>
          <Link
            href="/mechanic-finder"
            className="block w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl text-center shadow-sm border-2 border-indigo-200 active:scale-95 transition-transform hover:bg-indigo-50"
          >
            <i className="fas fa-map-marker-alt mr-2"></i>
            Find a Mechanic Near You
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function QuoteCard({ quote, compact }: { quote: typeof QUOTES[0]; compact: boolean }) {
  const overpriced = quote.items.filter(i => i.status === 'High').length
  const fair = quote.items.filter(i => i.status === 'Fair').length

  return (
    <div className={`rounded-2xl overflow-hidden border ${quote.borderColor} shadow-sm`}>
      <div className={`bg-gradient-to-br ${quote.color} p-${compact ? '3' : '5'}`}>
        <p className="text-white font-bold text-sm leading-tight">{quote.vehicle}</p>
        <p className="text-white/70 text-[10px] mt-0.5">{quote.shop}</p>
        {!compact && <p className="text-white/60 text-[10px]">{quote.mileage} · {quote.date}</p>}
      </div>
      <div className={`p-3 ${quote.lightColor} space-y-2`}>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-gray-500">Quoted</span>
          <span className="font-bold text-gray-900 text-sm">${quote.totalQuoted.toFixed(0)}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-gray-500">Savings</span>
          <span className={`font-black text-base ${quote.textColor}`}>${quote.potentialSavings}</span>
        </div>
        {!compact && (
          <div className="flex gap-2 pt-1">
            <span className="text-[10px] bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">{overpriced} overpriced</span>
            <span className="text-[10px] bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full">{fair} fair</span>
          </div>
        )}
        {compact && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-[9px] bg-red-100 text-red-600 font-semibold px-1.5 py-0.5 rounded-full">{overpriced} overpriced</span>
            <span className="text-[9px] bg-green-100 text-green-600 font-semibold px-1.5 py-0.5 rounded-full">{fair} fair</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ItemRow({ item, quote }: { item: typeof QUOTES[0]['items'][0]; quote: typeof QUOTES[0] }) {
  const saved = item.quoted - item.market
  return (
    <div className={`rounded-xl p-2.5 border ${quote.borderColor} ${quote.lightColor}`}>
      <p className="text-gray-800 font-semibold text-[11px] leading-tight mb-1 line-clamp-1">{item.name}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-900 font-bold text-xs">${item.market}</p>
          {saved > 0 && <p className="text-gray-400 text-[9px] line-through">${item.quoted}</p>}
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
          item.status === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}>
          {item.status === 'High' ? `–$${saved}` : '✓ Fair'}
        </span>
      </div>
    </div>
  )
}
