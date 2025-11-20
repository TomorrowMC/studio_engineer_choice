'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="gradient-bg min-h-screen overflow-hidden">
      <StatusBar bgColor="transparent" />

      <div className="flex flex-col items-center justify-center h-screen px-6">
        {/* Logo */}
        <div className="mb-8 animate-fade-in animate-pulse">
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <i className="fas fa-shield-alt text-6xl text-indigo-600"></i>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center mb-2 animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-3">The Choice Engine</h1>
          <p className="text-xl text-white/90 font-medium">Your Car Repair Copilot</p>
        </div>

        {/* Tagline */}
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <p className="text-white/80 text-sm">Snap • Analyze • Save</p>
        </div>

        {/* Loading Dots */}
        <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${delay}s` }}
            ></div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="text-center">
            <p className="text-white/60 text-xs mb-2">Powered by AI • Trusted by 50,000+ Users</p>
            <p className="text-white/40 text-xs">Version 1.0.0</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
        .animate-shimmer {
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
