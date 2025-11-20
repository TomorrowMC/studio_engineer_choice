'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { getQuoteData, type PartSelection } from '@/lib/partSelections'

interface ItemData {
  id: number
  name: string
  originalPrice: number
  marketPrice: number
  marketRange?: string
  status: 'High' | 'Fair'
  color: 'red' | 'yellow' | 'green'
  desc: string
  details: string
  canCustomize: boolean
  brandOptions?: Array<{
    brand: string
    price: number
    rating: number
  }>
}

export default function ResultsPage() {
  const router = useRouter()
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [selections, setSelections] = useState<Record<string, PartSelection>>({})
  
  useEffect(() => {
    const data = getQuoteData()
    setSelections(data.selections)
  }, [])

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  const items: ItemData[] = [
    {
      id: 1,
      name: 'Front Brake Pads',
      originalPrice: 420,
      marketPrice: 280,
      status: 'High',
      color: 'red',
      desc: selections['Front Brake Pads']?.brand || 'OEM Premium Grade',
      details: 'The quoted price for OEM brake pads is significantly higher than the market average for this vehicle model. Aftermarket alternatives from reputable brands like Bosch or Akebono offer similar performance at a lower cost.',
      canCustomize: true
    },
    {
      id: 2,
      name: 'Brake Rotors (Pair)',
      originalPrice: 340,
      marketPrice: 340,
      marketRange: '320-360',
      status: 'Fair',
      color: 'green',
      desc: 'Standard Quality',
      details: 'The price for rotors is within the expected market range. We found several quality alternatives from trusted brands at similar or better prices.',
      canCustomize: true,
      brandOptions: [
        { brand: 'Wagner Premium', price: 320, rating: 4.6 },
        { brand: 'ACDelco Professional', price: 340, rating: 4.7 },
        { brand: 'Raybestos Element3', price: 355, rating: 4.8 }
      ]
    },
    {
      id: 3,
      name: 'Labor (2.5 hrs)',
      originalPrice: 300,
      marketPrice: 225,
      marketRange: '200-250',
      status: 'High',
      color: 'yellow',
      desc: '$120/hr rate',
      details: 'The labor rate of $120/hr is slightly above the local average of $90-$100/hr for independent shops. Dealerships typically charge $130-$150/hr.',
      canCustomize: false
    },
    {
      id: 4,
      name: 'Brake Fluid Flush',
      originalPrice: 89,
      marketPrice: 85,
      marketRange: '75-95',
      status: 'Fair',
      color: 'green',
      desc: 'DOT 4 Synthetic',
      details: 'Price is fair for a standard brake fluid flush service.',
      canCustomize: false
    }
  ]

  // Calculate current prices based on selections
  const getCurrentPrice = (item: ItemData): number => {
    const selection = selections[item.name]
    return selection ? selection.price : item.originalPrice
  }

  const originalTotal = items.reduce((sum, item) => sum + item.originalPrice, 0)
  const currentTotal = items.reduce((sum, item) => sum + getCurrentPrice(item), 0)
  const totalSavings = originalTotal - currentTotal

  const handleCustomizeItem = (itemName: string) => {
    if (itemName === 'Front Brake Pads') {
      router.push('/part-detail')
    } else if (itemName === 'Brake Rotors (Pair)') {
      router.push('/part-detail-rotors')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <Link
            href="/camera"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-gray-200"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-gray-200">
              <i className="fas fa-share-alt"></i>
            </button>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-gray-200">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Analysis</h1>
        <p className="text-sm text-gray-600 mt-1">
          AutoPro Service Center • Nov 20, 2025
        </p>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Success Banner */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 mb-6 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <i className="fas fa-check-circle text-white text-3xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-xl font-bold mb-1">You Can Save Money!</h2>
              <p className="text-white/90 text-sm mb-3">
                {totalSavings > 0 ? 'We found cheaper alternatives that match quality standards' : 'Review our recommended options below'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${totalSavings}</span>
                <span className="text-white/80 text-lg">
                  {totalSavings > 0 ? 'in total savings' : 'potential savings'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Visualization Chart */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Total Cost Comparison</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Original Quote</span>
                        <span className="font-bold text-gray-900">${originalTotal.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">With Your Selections</span>
                        <span className="font-bold text-green-600">${currentTotal.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full relative" style={{ width: `${(currentTotal / originalTotal) * 100}%` }}>
                             <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Savings</span>
                <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                  {((totalSavings / originalTotal) * 100).toFixed(1)}%
                </span>
            </div>
        </div>

        {/* Price Legend */}
        <div className="flex justify-between items-center px-2 mb-4 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              <span>Fair</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
              <span>High</span>
            </div>
             <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              <span>Overpriced</span>
            </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-gray-900 text-lg">Itemized Analysis</h3>

          {items.map((item, index) => {
            const currentPrice = getCurrentPrice(item)
            const itemSavings = item.originalPrice - currentPrice
            const selection = selections[item.name]
            
            return (
              <div 
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-sm border-l-4 transition-all duration-300 overflow-hidden ${expandedItem === index ? 'ring-2 ring-indigo-100' : ''}`}
                  style={{ borderLeftColor: item.color === 'red' ? '#EF4444' : item.color === 'yellow' ? '#EAB308' : '#22C55E' }}
              >
                  <div className="p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
                      <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full 
                              ${item.color === 'red' ? 'bg-red-100 text-red-600' : 
                                item.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 
                                'bg-green-100 text-green-600'}`}>
                              {item.status}
                          </span>
                          {selection && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
                              <i className="fas fa-check mr-1"></i>Modified
                            </span>
                          )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{selection ? selection.brand : item.desc}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-bold text-gray-900">${currentPrice}</p>
                          {currentPrice !== item.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">${item.originalPrice}</p>
                          )}
                          <p className="text-xs text-gray-500">
                              {item.marketRange ? `Range: $${item.marketRange}` : `Market: $${item.marketPrice}`}
                          </p>
                      </div>
                      </div>
                      
                      {/* Range Visualization (Mini) */}
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden flex items-center relative">
                          {/* Fair Price Zone Indicator */}
                          <div className="absolute left-[20%] right-[20%] h-full bg-green-200/50"></div>
                          {/* Price Marker */}
                           <div 
                              className={`h-full rounded-full ${item.color === 'red' ? 'bg-red-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ 
                                  width: '20%', 
                                  marginLeft: item.color === 'red' ? '80%' : item.color === 'yellow' ? '60%' : '40%' 
                              }}
                          ></div>
                      </div>

                      {expandedItem === index && (
                          <div className="mt-4 pt-3 border-t border-gray-100 text-sm animate-fade-in">
                              <p className="text-gray-600 mb-3 leading-relaxed">{item.details}</p>
                              {item.canCustomize && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleCustomizeItem(item.name)
                                    }}
                                    className="flex items-center gap-2 w-full text-indigo-600 font-bold bg-indigo-50 p-3 rounded-xl hover:bg-indigo-100 transition-colors"
                                  >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span>
                                      {itemSavings > 0 ? `Saving $${itemSavings}` : 'View Options'} - Tap to customize
                                    </span>
                                    <i className="fas fa-chevron-right ml-auto text-xs"></i>
                                  </button>
                              )}
                          </div>
                      )}
                      
                      {expandedItem !== index && item.canCustomize && (
                          <div className="mt-3 text-xs font-bold text-indigo-600 flex items-center gap-1">
                              <i className="fas fa-info-circle"></i> 
                              {itemSavings > 0 ? `Saving $${itemSavings} - ` : ''}Tap to see options
                          </div>
                      )}
                  </div>
              </div>
            )
          })}
        </div>

        {/* Alternative Parts Recommendation */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg mb-6 shadow-indigo-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <i className="fas fa-lightbulb text-yellow-300 text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-1">Smart Alternatives Available</h3>
              <p className="text-white/90 text-sm">
                High-quality parts from trusted brands can save you money without
                compromising safety or performance
              </p>
            </div>
          </div>
          <Link
            href="/part-detail"
            className="block w-full bg-white text-indigo-600 font-bold py-3 rounded-xl text-center active:scale-95 transition-transform hover:bg-gray-50 shadow-md"
          >
            Explore All Options
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform hover:shadow-xl">
            <i className="fas fa-file-pdf mr-2"></i>
            Get Detailed Report
          </button>
          <Link
            href="/mechanic-finder"
            className="block w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-sm border-2 border-indigo-600 text-center active:scale-95 transition-transform hover:bg-indigo-50"
          >
            <i className="fas fa-map-marker-alt mr-2"></i>
            Find Better Mechanics Nearby
          </Link>
        </div>
      </div>
    </div>
  )
}
