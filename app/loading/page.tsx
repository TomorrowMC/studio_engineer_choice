'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: 'fa-eye',
      title: 'Analyzing Quote',
      description: 'Reading text and identifying parts...',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: 'fa-database',
      title: 'Checking Prices',
      description: 'Comparing market rates...',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: 'fa-chart-line',
      title: 'Finding Savings',
      description: 'Discovering better options...',
      color: 'from-green-400 to-green-600',
    },
  ]

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1667) // ~5 seconds / 3 steps

    // Navigate to results after 5 seconds
    const redirectTimeout = setTimeout(() => {
      router.push('/results')
    }, 5000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(redirectTimeout)
    }
  }, [router])

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo Animation */}
      <div className="mb-12 animate-bounce-slow">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <i className="fas fa-shield-alt text-5xl text-indigo-600 animate-pulse"></i>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-white text-3xl font-bold mb-2 text-center">
        Analyzing Your Quote
      </h1>
      <p className="text-white/80 text-center mb-12 px-4">
        Our AI is working its magic...
      </p>

      {/* Steps Progress */}
      <div className="w-full max-w-md space-y-6 mb-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              index === currentStep
                ? 'scale-105'
                : index < currentStep
                ? 'opacity-70 scale-95'
                : 'opacity-40 scale-90'
            }`}
          >
            <div
              className={`bg-white rounded-2xl p-5 shadow-xl ${
                index === currentStep ? 'ring-4 ring-white/30' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                    index === currentStep ? 'animate-pulse' : ''
                  }`}
                >
                  <i className={`fas ${step.icon} text-white text-2xl`}></i>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {step.title}
                    </h3>
                    {index < currentStep && (
                      <i className="fas fa-check-circle text-green-500 text-lg"></i>
                    )}
                    {index === currentStep && (
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></span>
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-400"></span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-white/90 text-sm font-semibold mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
        <div className="flex items-start gap-3 text-white">
          <i className="fas fa-lightbulb text-yellow-300 text-xl mt-0.5"></i>
          <div>
            <p className="font-semibold mb-1">Did you know?</p>
            <p className="text-sm text-white/80">
              Most car owners overpay 20-40% on repairs due to lack of price
              transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
