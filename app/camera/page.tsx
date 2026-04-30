'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

const DEMO_QUOTES = [
  {
    index: 0,
    vehicle: '2018 Toyota Camry',
    shop: 'AutoCare Service Center',
    date: 'April 21, 2026',
    total: '$640.00',
    savings: '$80',
    mileage: '68,750 mi',
    itemCount: 4,
    items: ['Front Brake Pads', 'Engine Oil Change', 'Air Filter', 'Labor'],
    color: 'from-blue-500 to-indigo-600',
    accentColor: 'bg-blue-600',
    icon: 'fa-car',
  },
  {
    index: 1,
    vehicle: '2019 Honda Accord',
    shop: 'XYZ Auto Service',
    date: 'April 23, 2024',
    total: '$410.00',
    savings: '$95',
    mileage: '87,450 mi',
    itemCount: 4,
    items: ['Serpentine Belt', 'Tire Rotation', 'Battery', 'Cabin Air Filter'],
    color: 'from-violet-500 to-purple-600',
    accentColor: 'bg-violet-600',
    icon: 'fa-car-side',
  },
]

export default function CameraPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setSelectedQuote(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleAnalyze = () => {
    if (typeof window !== 'undefined') {
      if (selectedQuote !== null) {
        localStorage.setItem('active_quote', selectedQuote.toString())
      }
      sessionStorage.removeItem('activity_saved')
    }
    router.push('/loading')
  }

  const canAnalyze = selectedQuote !== null || preview !== null

  return (
    <div className="gradient-bg min-h-screen overflow-x-hidden">
      <StatusBar bgColor="transparent" />

      <div className="flex flex-col min-h-screen px-6 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-white font-bold text-lg">Analyze Quote</h1>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <i className="fas fa-info-circle"></i>
          </div>
        </div>

        {/* Demo badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/25 flex items-center gap-2">
            <i className="fas fa-flask text-yellow-300 text-xs"></i>
            Demo Mode — Select a sample quote below
          </span>
        </div>

        {/* Demo Quote Cards */}
        <div className="space-y-4 mb-6">
          <p className="text-white/80 text-sm font-semibold">Choose a Quote to Analyze</p>

          {DEMO_QUOTES.map((quote, i) => (
            <button
              key={quote.index}
              onClick={() => { setSelectedQuote(quote.index); setPreview(null); setFileName(null) }}
              className={`w-full text-left rounded-3xl transition-all duration-300 active:scale-[0.98] overflow-hidden animate-fade-slide-up delay-${i === 0 ? '100' : '200'} ${
                selectedQuote === quote.index
                  ? 'ring-4 ring-white shadow-2xl scale-[1.01]'
                  : 'ring-1 ring-white/20 opacity-90 hover:opacity-100 hover:scale-[1.005]'
              }`}
            >
              <div className={`bg-gradient-to-br ${quote.color} p-5`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                      <i className={`fas ${quote.icon} text-white text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-white font-bold text-base leading-tight">{quote.vehicle}</p>
                      <p className="text-white/75 text-xs mt-0.5">{quote.shop} · {quote.mileage}</p>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${selectedQuote === quote.index ? 'bg-white border-white' : 'bg-transparent'}`}>
                    {selectedQuote === quote.index && <i className="fas fa-check text-green-600 text-xs"></i>}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                    {quote.itemCount} items
                  </span>
                  <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                    {quote.date}
                  </span>
                  <span className="bg-green-400/35 text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-green-300/30">
                    Save up to {quote.savings}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {quote.items.map((item, idx) => (
                    <span key={idx} className="bg-white/12 backdrop-blur-sm text-white/85 text-xs px-2 py-0.5 rounded-md border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/15 backdrop-blur-sm px-5 py-2.5 flex items-center justify-between">
                <span className="text-white/70 text-xs font-medium">Quoted total</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-xs line-through">{quote.total}</span>
                  <span className="text-green-300 text-xs font-bold">Save {quote.savings} →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Upload section (secondary) */}
        <div className="mb-6">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="w-full flex items-center justify-between text-white/60 hover:text-white/90 transition-colors text-sm py-2"
          >
            <span className="flex items-center gap-2">
              <i className="fas fa-cloud-upload-alt text-xs"></i>
              Or upload your own quote photo
            </span>
            <i className={`fas fa-chevron-${showUpload ? 'up' : 'down'} text-xs transition-transform duration-200`}></i>
          </button>

          {showUpload && (
            <div className="mt-3 space-y-3 animate-fade-slide-up">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-32 bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/35 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-white/15 overflow-hidden"
              >
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Quote preview" className="absolute inset-0 w-full h-full object-contain rounded-2xl p-2" />
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-end justify-center pb-3">
                      <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <i className="fas fa-sync-alt text-indigo-600 text-xs"></i>
                        Tap to change
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt text-white/60 text-2xl"></i>
                    <p className="text-white/60 text-sm">Tap to choose a photo</p>
                  </>
                )}
              </button>

              {fileName && (
                <div className="bg-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3">
                  <i className="fas fa-file-image text-green-300 text-sm"></i>
                  <p className="text-white text-sm truncate flex-1">{fileName}</p>
                  <i className="fas fa-check-circle text-green-400 text-sm"></i>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 mt-auto ${
            canAnalyze
              ? 'bg-white text-indigo-600 hover:bg-white/95 shadow-white/25'
              : 'bg-white/20 text-white/45 cursor-not-allowed'
          }`}
        >
          {canAnalyze ? (
            <>
              <i className="fas fa-magic mr-2"></i>
              Analyze Quote →
            </>
          ) : (
            <>
              <i className="fas fa-hand-pointer mr-2 opacity-60"></i>
              Select a quote above
            </>
          )}
        </button>
      </div>
    </div>
  )
}
