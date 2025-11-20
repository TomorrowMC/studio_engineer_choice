'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

export default function CameraPage() {
  const router = useRouter()

  const handleCapture = () => {
    router.push('/loading')
  }

  return (
    <div className="gradient-bg min-h-screen">
      <StatusBar bgColor="transparent" />

      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/onboarding"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-white font-bold text-lg">Scan Quote</h1>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <i className="fas fa-info-circle"></i>
          </div>
        </div>

        {/* Camera Viewfinder */}
        <div className="flex-1 relative mx-6 mb-6 rounded-3xl overflow-hidden bg-gray-900">
          {/* Simulated Camera Feed */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>

          {/* Scanning Frame Animation */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full aspect-[3/4] max-h-[500px]">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-indigo-400 rounded-tl-2xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-indigo-400 rounded-tr-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-indigo-400 rounded-bl-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-indigo-400 rounded-br-2xl animate-pulse"></div>

              {/* Scanning Line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-scan-line"></div>
              </div>

              {/* Helper Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-black/50 backdrop-blur-sm px-6 py-4 rounded-2xl">
                  <i className="fas fa-file-invoice text-indigo-400 text-4xl mb-3"></i>
                  <p className="text-white font-semibold text-lg mb-1">
                    Position Quote in Frame
                  </p>
                  <p className="text-white/70 text-sm">
                    Make sure all text is clearly visible
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/30"></div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="px-6 pb-8">
          {/* Instructions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3 text-white">
              <i className="fas fa-lightbulb text-yellow-300 text-xl mt-1"></i>
              <div className="flex-1">
                <p className="font-semibold mb-1">Pro Tips:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Avoid shadows and glare</li>
                  <li>• Capture entire document</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Capture Buttons */}
          <div className="flex items-center justify-center gap-4">
            {/* Gallery Button */}
            <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform">
              <i className="fas fa-images text-2xl"></i>
            </button>

            {/* Capture Button */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <i className="fas fa-camera text-white text-2xl"></i>
              </div>
              {/* Pulse Animation Ring */}
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20"></div>
            </button>

            {/* Flash Button */}
            <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform">
              <i className="fas fa-bolt text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Add scan line animation */}
      <style jsx>{`
        @keyframes scan-line {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan-line {
          animation: scan-line 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
