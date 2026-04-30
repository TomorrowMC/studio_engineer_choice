'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { getQuoteData, type PartSelection } from '@/lib/partSelections'
import { saveActivity } from '@/lib/activityStorage'

interface ItemData {
  id: number
  name: string
  storageKey?: string
  originalPrice: number
  marketPrice: number
  marketRange?: string
  status: 'High' | 'Fair'
  color: 'red' | 'yellow' | 'green'
  desc: string
  details: string
  canCustomize: boolean
  detailRoute?: string
}

interface QuoteConfig {
  shop: string
  date: string
  vehicle: string
  mileage: string
  activityTitle: string
  activitySaved: string
  activityTotal: string
  taxRate: number
  items: ItemData[]
}

const TAX_RATE_1 = 0.08
const TAX_RATE_2 = 0.0825

const QUOTE_CONFIGS: Record<number, QuoteConfig> = {
  0: {
    shop: 'AutoCare Service Center',
    date: 'April 21, 2026',
    vehicle: '2018 Toyota Camry',
    mileage: '68,750 mi',
    activityTitle: 'Oil Change & Brake Service',
    activitySaved: '$80',
    activityTotal: '$691',
    taxRate: TAX_RATE_1,
    items: [
      {
        id: 1,
        name: 'Brake Pad Replacement (Front)',
        storageKey: 'Front Brake Pads',
        originalPrice: 250,
        marketPrice: 195,
        marketRange: '180–220',
        status: 'High',
        color: 'red',
        desc: 'OEM Toyota Parts',
        details: 'The quoted price for OEM front brake pads is above market average for this vehicle. Quality aftermarket alternatives from Bosch QuietCast or Akebono ProACT deliver equivalent stopping performance at significantly lower cost.',
        canCustomize: true,
        detailRoute: '/part-detail',
      },
      {
        id: 2,
        name: 'Engine Oil Change',
        storageKey: 'Engine Oil Change',
        originalPrice: 80,
        marketPrice: 55,
        marketRange: '38–80',
        status: 'High',
        color: 'yellow',
        desc: 'Full synthetic + oil filter included',
        details: 'Full-synthetic service is the premium tier. A synthetic blend or high-mileage option delivers strong protection at 30–45% less cost. Tap below to compare oil types.',
        canCustomize: true,
        detailRoute: '/part-detail-oil',
      },
      {
        id: 3,
        name: 'Air Filter Replacement',
        storageKey: 'Air Filter Replacement',
        originalPrice: 40,
        marketPrice: 22,
        marketRange: '17–55',
        status: 'High',
        color: 'yellow',
        desc: 'Engine air filter',
        details: 'OEM-equivalent engine air filters from Bosch or Fram cost $17–$22 — roughly half the quoted price — with the same fit and filtration. The K&N reusable filter costs more upfront but pays off over time.',
        canCustomize: true,
        detailRoute: '/part-detail-airfilter',
      },
      {
        id: 4,
        name: 'Labor (3 hrs)',
        originalPrice: 270,
        marketPrice: 270,
        marketRange: '240–300',
        status: 'Fair',
        color: 'green',
        desc: '$90/hr — general repairs & inspection',
        details: 'A labor rate of $90/hr is within the standard market range for independent shops in the NYC metro area ($85–$105/hr). Dealerships typically charge $130–$160/hr for the same work.',
        canCustomize: false,
      },
    ],
  },
  1: {
    shop: 'XYZ Auto Service',
    date: 'April 23, 2024',
    vehicle: '2019 Honda Accord',
    mileage: '87,450 mi',
    activityTitle: 'Serpentine Belt & Battery',
    activitySaved: '$95',
    activityTotal: '$444',
    taxRate: TAX_RATE_2,
    items: [
      {
        id: 1,
        name: 'Replace Serpentine Belt',
        originalPrice: 125,
        marketPrice: 90,
        marketRange: '85–110',
        status: 'High',
        color: 'red',
        desc: 'OEM-spec serpentine belt',
        details: 'Serpentine belt replacement typically runs $85–$110 at independent shops including parts and labor. Quality aftermarket belts (Gates, Dayco) match OEM durability at 20–30% less.',
        canCustomize: false,
      },
      {
        id: 2,
        name: 'Rotate & Balance Tires',
        originalPrice: 60,
        marketPrice: 60,
        marketRange: '55–70',
        status: 'Fair',
        color: 'green',
        desc: 'All 4 wheels rotated and balanced',
        details: 'Tire rotation and balance at $60 is within the fair market range for the Austin, TX area. Prices typically run $50–$70 depending on shop type.',
        canCustomize: false,
      },
      {
        id: 3,
        name: 'Replace Battery',
        originalPrice: 180,
        marketPrice: 145,
        marketRange: '130–160',
        status: 'High',
        color: 'yellow',
        desc: 'Includes new battery + installation',
        details: "A replacement battery for a 2019 Honda Accord (Group 51R) costs $95–$130 in parts alone. Consider purchasing a battery from AutoZone or O'Reilly (~$125) and asking the shop to install it for a flat labor fee (~$20).",
        canCustomize: false,
      },
      {
        id: 4,
        name: 'Replace Cabin Air Filter',
        storageKey: 'Air Filter Replacement',
        originalPrice: 45,
        marketPrice: 22,
        marketRange: '17–55',
        status: 'High',
        color: 'red',
        desc: 'Cabin air filter',
        details: 'Cabin air filters for a 2019 Accord are a 5-minute DIY job behind the glove box. A Bosch or Fram equivalent filter costs $15–$22 at any auto parts store — a fraction of the quoted $45.',
        canCustomize: true,
        detailRoute: '/part-detail-airfilter',
      },
    ],
  },
}

// ---------- PDF report generator ----------
function generateReport(config: QuoteConfig, subtotal: number, tax: number, total: number, savings: number) {
  const itemRows = config.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${item.name}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;
            background:${item.color === 'red' ? '#fee2e2' : item.color === 'yellow' ? '#fef9c3' : '#dcfce7'};
            color:${item.color === 'red' ? '#dc2626' : item.color === 'yellow' ? '#ca8a04' : '#16a34a'};">
            ${item.status}
          </span>
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">$${item.originalPrice.toFixed(2)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right;color:#16a34a;font-weight:700;">$${item.marketPrice.toFixed(2)}</td>
      </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Quote Analysis — The Choice Engine</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; background: #fff; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #4f46e5; }
    .logo { font-size: 24px; font-weight: 800; color: #4f46e5; }
    .logo span { color: #7c3aed; }
    .meta { text-align: right; font-size: 13px; color: #6b7280; }
    .meta strong { color: #111827; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-box { background: #f9fafb; border-radius: 12px; padding: 16px; }
    .info-box p { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
    .info-box strong { font-size: 15px; color: #111827; }
    .savings-banner { background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .savings-banner .amount { font-size: 36px; font-weight: 800; }
    .savings-banner .label { font-size: 14px; opacity: 0.9; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #4f46e5; color: white; padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; }
    th:nth-child(3), th:nth-child(4) { text-align: right; }
    .totals td { padding: 8px 16px; font-size: 14px; }
    .totals .total-row td { font-weight: 800; font-size: 16px; background: #f3f4f6; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">The Choice <span>Engine</span></div>
      <div style="font-size:13px;color:#6b7280;margin-top:4px;">AI-Powered Quote Analysis Report</div>
    </div>
    <div class="meta">
      <div><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <div><strong>Quote Date:</strong> ${config.date}</div>
      <div><strong>Shop:</strong> ${config.shop}</div>
    </div>
  </div>
  <div class="info-grid" style="margin-bottom:28px;">
    <div class="info-box"><p>Vehicle</p><strong>${config.vehicle}</strong></div>
    <div class="info-box"><p>Mileage</p><strong>${config.mileage}</strong></div>
  </div>
  <div class="savings-banner">
    <div>
      <div class="label">Potential Savings Identified</div>
      <div class="amount">$${savings}</div>
    </div>
    <div style="text-align:right;">
      <div class="label">Original Quote Total</div>
      <div style="font-size:22px;font-weight:700;">$${total.toFixed(2)}</div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Itemized Analysis</div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align:center;">Status</th>
          <th>Quoted Price</th>
          <th>Market Price</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <table class="totals">
      <tr><td style="border-bottom:1px solid #e5e7eb;">Subtotal</td><td></td><td></td><td style="text-align:right;border-bottom:1px solid #e5e7eb;">$${subtotal.toFixed(2)}</td></tr>
      <tr><td style="border-bottom:1px solid #e5e7eb;">Tax (${(config.taxRate * 100).toFixed(2)}%)</td><td></td><td></td><td style="text-align:right;border-bottom:1px solid #e5e7eb;">$${tax.toFixed(2)}</td></tr>
      <tr class="total-row"><td>Total Amount</td><td></td><td></td><td style="text-align:right;">$${total.toFixed(2)}</td></tr>
    </table>
  </div>
  <div class="section">
    <div class="section-title">Recommendations</div>
    <div style="background:#eff6ff;border-radius:12px;padding:16px 20px;font-size:13px;line-height:1.7;color:#1e40af;">
      ${config.items.filter(i => i.status === 'High').map(i => `• <strong>${i.name}</strong>: ${i.details}`).join('<br><br>')}
    </div>
  </div>
  <div class="footer">Generated by The Choice Engine · AI-Powered Auto Repair Price Analysis · Not a substitute for professional mechanical advice.</div>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 600)
}
// ------------------------------------------

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current || target === 0) return
    startedRef.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(tick)
      else setValue(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return value
}

export default function ResultsPage() {
  const router = useRouter()
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [selections, setSelections] = useState<Record<string, PartSelection>>({})
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const data = getQuoteData()
    setSelections(data.selections)
    if (typeof window !== 'undefined') {
      const idx = parseInt(localStorage.getItem('active_quote') ?? '0')
      setQuoteIndex(idx)
    }
  }, [])

  const config = QUOTE_CONFIGS[quoteIndex] ?? QUOTE_CONFIGS[0]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('activity_saved')) return
    saveActivity({
      title: config.activityTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      shop: config.shop,
      saved: config.activitySaved,
      total: config.activityTotal,
      icon: 'fa-check-circle',
      color: 'green',
      items: config.items.map((item) => ({
        name: item.name,
        originalPrice: item.originalPrice,
        currentPrice: item.marketPrice,
        status: item.status,
      })),
    })
    sessionStorage.setItem('activity_saved', 'true')
  }, [config])

  const getStorageKey = (item: ItemData) => item.storageKey ?? item.name

  const getCurrentPrice = (item: ItemData): number => {
    const selection = selections[getStorageKey(item)]
    // Use selection price if customized, otherwise use market price as best-case default
    return selection ? selection.price : item.marketPrice
  }

  const subtotalOriginal = config.items.reduce((s, i) => s + i.originalPrice, 0)
  const subtotalCurrent = config.items.reduce((s, i) => s + getCurrentPrice(i), 0)
  const taxAmount = Math.round(subtotalCurrent * config.taxRate * 100) / 100
  const totalWithTax = subtotalCurrent + taxAmount
  // "Potential savings" uses market prices as the best-case baseline for the banner
  const potentialSavings = config.items.reduce((s, i) => s + Math.max(0, i.originalPrice - i.marketPrice), 0)
  // "Actual savings" reflects user's customization choices vs original
  const totalSavings = subtotalOriginal - subtotalCurrent

  const displayedSavings = useCountUp(potentialSavings)

  const savingsPercent = subtotalOriginal > 0 ? ((potentialSavings / subtotalOriginal) * 100).toFixed(1) : '0'
  const motivationalLines = [
    `You're saving more than 82% of users this week.`,
    `Top 15% saver — most users miss these deals.`,
    `You caught savings that 7 in 10 car owners miss.`,
  ]
  const motivationalLine = motivationalLines[quoteIndex % motivationalLines.length]

  const handleShare = async () => {
    const text = `I can save $${potentialSavings} on my ${config.vehicle} repair! Analyzed by The Choice Engine.`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Quote Analysis', text })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text)
      setToast('Copied to clipboard!')
      setTimeout(() => setToast(null), 2500)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  const statusColors = {
    red: { bg: 'bg-red-50', text: 'text-red-600', border: '#EF4444', badge: 'bg-red-100 text-red-600', dot: 'bg-red-500', bar: 'bg-red-400' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: '#EAB308', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500', bar: 'bg-yellow-400' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: '#22C55E', badge: 'bg-green-100 text-green-600', dot: 'bg-green-500', bar: 'bg-green-400' },
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-xl animate-pop-in">
          <i className="fas fa-check-circle text-green-400 mr-2"></i>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <Link href="/camera" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-gray-200">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="flex gap-2">
            <button onClick={handleShare} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-indigo-50 hover:text-indigo-600">
              <i className="fas fa-share-alt"></i>
            </button>
            <Link href="/compare" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform hover:bg-gray-200">
              <i className="fas fa-columns"></i>
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Analysis</h1>
        <p className="text-sm text-gray-500 mt-0.5">{config.shop} · {config.date}</p>
        <p className="text-xs text-gray-400">{config.vehicle} · {config.mileage}</p>
      </div>

      <div className="px-6 py-5 pb-32 space-y-5">

        {/* Savings Banner with count-up */}
        <div className="bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-3xl p-6 shadow-lg shadow-green-200 animate-fade-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/25 p-3">
              <i className="fas fa-check-circle text-white text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-lg font-bold mb-0.5">You Can Save Money!</h2>
              <p className="text-white/80 text-xs mb-3">We found cheaper alternatives that match quality standards</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums">${displayedSavings}</span>
                <span className="text-white/75 text-base">in potential savings</span>
              </div>
            </div>
          </div>
          <p className="text-white/70 text-xs mt-3 pl-0.5">{motivationalLine}</p>
        </div>

        {/* Price Comparison Chart */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-fade-slide-up delay-100">
          <h3 className="font-bold text-gray-900 mb-4">Cost Comparison</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-500 font-medium">Original Quote</span>
                <span className="font-bold text-gray-800">${subtotalOriginal.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-500 font-medium">With Our Picks</span>
                <span className="font-bold text-green-600">${subtotalCurrent.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full relative overflow-hidden"
                  style={{ width: `${(subtotalCurrent / subtotalOriginal) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold text-gray-700">${subtotalCurrent.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Tax ({(config.taxRate * 100).toFixed(2)}%)</span>
              <span className="font-semibold text-gray-700">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-bold border-t border-gray-100 pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${totalWithTax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">You save</span>
              <span className="text-green-600 font-bold text-base bg-green-50 px-3 py-1 rounded-xl border border-green-100">
                {savingsPercent}% ({`$${totalSavings}`})
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 px-1 text-xs text-gray-500 font-medium animate-fade-slide-up delay-150">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>Fair</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>High</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>Overpriced</div>
        </div>

        {/* Line Items */}
        <div className="space-y-3 animate-fade-slide-up delay-200">
          <h3 className="font-bold text-gray-900 text-lg">Itemized Analysis</h3>

          {config.items.map((item, index) => {
            const currentPrice = getCurrentPrice(item)
            const itemSavings = item.originalPrice - currentPrice
            const selection = selections[getStorageKey(item)]
            const sc = statusColors[item.color]
            const isExpanded = expandedItem === index
            const shopBarPct = 100
            const mktBarPct = Math.round((item.marketPrice / item.originalPrice) * 100)

            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl border-l-4 transition-all duration-300 overflow-hidden ${isExpanded ? 'ring-2 ring-indigo-100 shadow-md' : ''}`}
                style={{ borderLeftColor: sc.border }}
              >
                <div className="p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${sc.badge} ${item.color === 'red' ? 'animate-pulse' : ''}`}>
                          {item.color === 'red' ? '🔴 ' : item.color === 'yellow' ? '🟡 ' : '🟢 '}
                          {item.status === 'High' ? 'Overpriced' : 'Fair'}
                        </span>
                        {selection && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
                            <i className="fas fa-check mr-1"></i>Modified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{selection ? selection.brand : item.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">${currentPrice}</p>
                      {currentPrice !== item.originalPrice && <p className="text-xs text-gray-400 line-through">${item.originalPrice}</p>}
                      <p className="text-[10px] text-gray-400 mt-0.5">Mkt: ${item.marketRange ?? item.marketPrice}</p>
                    </div>
                  </div>

                  {/* Mini price gauge */}
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                    <div className="absolute left-[20%] right-[20%] h-full bg-green-100"></div>
                    <div
                      className={`h-full rounded-full ${sc.dot}`}
                      style={{ width: '18%', marginLeft: item.color === 'red' ? '78%' : item.color === 'yellow' ? '60%' : '40%' }}
                    ></div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-gray-100 animate-fade-slide-up">
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.details}</p>

                      {/* Animated price comparison bars */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Comparison</p>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Shop Quoted</span>
                            <span className="font-bold text-gray-700">${item.originalPrice}</span>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-400 rounded-full relative overflow-hidden animate-bar-fill"
                              style={{ '--bar-target': `${shopBarPct}%` } as React.CSSProperties}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Market Price</span>
                            <span className="font-bold text-green-600">${item.marketPrice}</span>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bar-fill delay-100"
                              style={{ '--bar-target': `${mktBarPct}%` } as React.CSSProperties}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {item.canCustomize && (
                        <button
                          onClick={(e) => { e.stopPropagation(); if (item.detailRoute) router.push(item.detailRoute) }}
                          className="flex items-center gap-2 w-full text-indigo-600 font-bold bg-indigo-50 p-3 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100"
                        >
                          <i className="fas fa-shopping-cart text-sm"></i>
                          <span className="text-sm">{itemSavings > 0 ? `Save $${itemSavings}` : 'View Options'} — Tap to customize</span>
                          <i className="fas fa-chevron-right ml-auto text-xs opacity-60"></i>
                        </button>
                      )}
                    </div>
                  )}

                  {!isExpanded && item.canCustomize && (
                    <div className="mt-2 text-xs font-semibold text-indigo-500 flex items-center gap-1">
                      <i className="fas fa-chevron-down text-[10px]"></i>
                      {itemSavings > 0 ? `Tap to save $${itemSavings}` : 'Tap to see options'}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Compare CTA */}
        <Link
          href="/compare"
          className="block w-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 text-center animate-fade-slide-up delay-300"
        >
          <p className="text-indigo-700 font-semibold text-sm">
            <i className="fas fa-columns mr-2 opacity-70"></i>
            Compare both demo quotes side-by-side
            <i className="fas fa-arrow-right ml-2 text-xs opacity-60"></i>
          </p>
        </Link>

        {/* Smart Alternatives Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg shadow-indigo-200 animate-fade-slide-up delay-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <i className="fas fa-lightbulb text-yellow-300 text-2xl"></i>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-1">Smart Alternatives Available</h3>
              <p className="text-white/85 text-sm">High-quality parts from trusted brands can save you money without compromising safety or performance.</p>
            </div>
          </div>
          <Link href="/mechanic-finder" className="block w-full bg-white text-indigo-600 font-bold py-3 rounded-xl text-center active:scale-95 transition-transform hover:bg-gray-50 shadow-md text-sm">
            Find a Better Mechanic Nearby
            <i className="fas fa-arrow-right ml-2 text-xs"></i>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-fade-slide-up delay-400">
          <button
            onClick={() => generateReport(config, subtotalOriginal, Math.round(subtotalOriginal * config.taxRate * 100) / 100, subtotalOriginal + Math.round(subtotalOriginal * config.taxRate * 100) / 100, totalSavings)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform hover:shadow-xl"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            Get Detailed PDF Report
          </button>
          <Link href="/mechanic-finder" className="block w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-sm border-2 border-indigo-200 text-center active:scale-95 transition-transform hover:bg-indigo-50 text-sm">
            <i className="fas fa-map-marker-alt mr-2"></i>
            Find Better Mechanics Nearby
          </Link>
        </div>
      </div>
    </div>
  )
}
