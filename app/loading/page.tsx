'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  {
    icon: 'fa-eye',
    title: 'Scanning Quote',
    fullDescription: 'Found 4 line items — reading part numbers & labor codes...',
    completedLabel: 'Identified 4 parts to evaluate',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: 'fa-database',
    title: 'Checking Prices',
    fullDescription: 'Cross-referencing 847 price records across local shops...',
    completedLabel: 'Price data loaded ✓',
    color: 'from-violet-400 to-purple-600',
  },
  {
    icon: 'fa-chart-line',
    title: 'Finding Savings',
    fullDescription: 'Generating 3 savings recommendations for your vehicle...',
    completedLabel: 'Report ready — savings found!',
    color: 'from-green-400 to-emerald-600',
  },
]

const FACTS = [
  'OEM vs Aftermarket pricing often differs by 30–45%.',
  'Independent shops charge 40–60% less than dealerships on average.',
  'Labor rates vary by over $80/hr within the same zip code.',
  'Brake pads are the most commonly overpriced service item.',
  'Getting 3 quotes typically saves car owners $120+ per repair.',
]

export default function LoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)
  const [factVisible, setFactVisible] = useState(true)
  const [showComplete, setShowComplete] = useState(false)
  const charRef = useRef(charIndex)
  charRef.current = charIndex

  // Main progress + step timer
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100 }
        return prev + 2
      })
    }, 100)

    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 1700),
      setTimeout(() => setCurrentStep(2), 3400),
    ]

    const completeTimer = setTimeout(() => setShowComplete(true), 4600)
    const redirectTimer = setTimeout(() => router.push('/results'), 5200)

    return () => {
      clearInterval(progressInterval)
      stepTimers.forEach(clearTimeout)
      clearTimeout(completeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  // Typewriter effect — reset on step change
  useEffect(() => {
    setTypedText('')
    setCharIndex(0)
  }, [currentStep])

  useEffect(() => {
    const desc = STEPS[currentStep]?.fullDescription ?? ''
    if (charIndex >= desc.length) return
    const t = setTimeout(() => {
      setTypedText(desc.slice(0, charIndex + 1))
      setCharIndex((c) => c + 1)
    }, 22)
    return () => clearTimeout(t)
  }, [charIndex, currentStep])

  // Rotate fact chips
  useEffect(() => {
    const interval = setInterval(() => {
      setFactVisible(false)
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % FACTS.length)
        setFactVisible(true)
      }, 300)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  const activeQuoteIndex = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('active_quote') ?? '0')
    : 0
  const savingsPreview = activeQuoteIndex === 1 ? '$95' : '$80'

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Logo bounce */}
      <div className="mb-10 animate-bounce-slow">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <i className="fas fa-shield-alt text-4xl text-indigo-600 animate-pulse"></i>
        </div>
      </div>

      <h1 className="text-white text-2xl font-bold mb-1 text-center">Analyzing Your Quote</h1>
      <p className="text-white/70 text-center mb-8 text-sm px-4">Our AI is working its magic...</p>

      {/* Step cards */}
      <div className="w-full max-w-md space-y-3 mb-8">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep
          const isDone = index < currentStep
          const isPending = index > currentStep

          return (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isActive ? 'scale-[1.03]' : isDone ? 'opacity-75 scale-[0.97]' : 'opacity-35 scale-[0.94]'
              }`}
            >
              <div className={`bg-white rounded-2xl p-4 shadow-xl ${isActive ? 'ring-2 ring-white/40' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0 ${isActive ? 'animate-pulse' : ''}`}>
                    {isDone
                      ? <i className="fas fa-check text-white text-lg"></i>
                      : <i className={`fas ${step.icon} text-white text-xl`}></i>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      {isActive && (
                        <div className="flex gap-0.5">
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed min-h-[1rem]">
                      {isDone
                        ? step.completedLabel
                        : isActive
                        ? <span>{typedText}<span className="inline-block w-0.5 h-3 bg-indigo-400 ml-0.5 animate-pulse align-middle"></span></span>
                        : isPending ? 'Waiting...' : ''
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between text-white/80 text-xs font-semibold mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2.5 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/25 animate-shimmer-slide"></div>
          </div>
        </div>
      </div>

      {/* Rotating fact chip */}
      <div className={`w-full max-w-md transition-opacity duration-300 ${factVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-start gap-3 border border-white/15">
          <i className="fas fa-lightbulb text-yellow-300 text-sm mt-0.5 flex-shrink-0"></i>
          <p className="text-white/85 text-xs leading-relaxed">{FACTS[factIndex]}</p>
        </div>
      </div>

      {/* Completion preview */}
      {showComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl animate-pop-in">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check-circle text-green-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
            <p className="text-gray-500 text-sm mb-4">We found potential savings on your quote.</p>
            <div className="bg-green-50 rounded-2xl px-6 py-3 inline-block">
              <p className="text-3xl font-black text-green-600">{savingsPreview}</p>
              <p className="text-xs text-green-600/70 font-medium">in potential savings</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.2s ease-in-out infinite; }

        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slide { animation: shimmer-slide 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
