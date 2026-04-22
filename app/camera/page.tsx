'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

export default function CameraPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleAnalyze = () => {
    // Toggle quote index here (synchronous click handler — not affected by React Strict Mode double-invoke)
    if (typeof window !== 'undefined') {
      const current = parseInt(localStorage.getItem('active_quote') ?? '1')
      localStorage.setItem('active_quote', current === 0 ? '1' : '0')
      sessionStorage.removeItem('activity_saved')
    }
    router.push('/loading')
  }

  return (
    <div className="gradient-bg min-h-screen overflow-x-hidden">
      <StatusBar bgColor="transparent" />

      <div className="flex flex-col min-h-screen px-6 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-white font-bold text-lg">Upload Quote</h1>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <i className="fas fa-info-circle"></i>
          </div>
        </div>

        {/* Upload Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Hidden file input — no capture attr so iOS shows Camera / Library / Files */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Preview or placeholder */}
          <button
            onClick={handleUploadClick}
            className="relative flex-1 min-h-[280px] bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl flex flex-col items-center justify-center gap-4 active:scale-[0.98] transition-transform hover:bg-white/15 overflow-hidden"
          >
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Quote preview"
                  className="absolute inset-0 w-full h-full object-contain rounded-3xl p-2"
                />
                <div className="absolute inset-0 bg-black/30 rounded-3xl flex items-end justify-center pb-6">
                  <span className="bg-white/90 text-gray-900 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <i className="fas fa-sync-alt text-indigo-600"></i>
                    Tap to change
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-cloud-upload-alt text-white text-4xl"></i>
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-bold text-xl mb-2">Upload Your Quote</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Tap to choose a photo from your camera, photo library, or files
                  </p>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-xs mt-2">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-camera"></i>
                    <span>Camera</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <i className="fas fa-images"></i>
                    <span>Photos</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <i className="fas fa-folder"></i>
                    <span>Files</span>
                  </div>
                </div>
              </>
            )}
          </button>

          {/* File name */}
          {fileName && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fas fa-file-image text-green-300"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{fileName}</p>
                <p className="text-white/60 text-xs">Ready to analyze</p>
              </div>
              <i className="fas fa-check-circle text-green-400 text-lg"></i>
            </div>
          )}

          {/* Tips */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-start gap-3 text-white">
              <i className="fas fa-lightbulb text-yellow-300 text-xl mt-0.5"></i>
              <div className="flex-1">
                <p className="font-semibold mb-1.5">For best results:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Ensure the full document is visible</li>
                  <li>• Good lighting, no glare or shadows</li>
                  <li>• Keep text sharp and readable</li>
                  <li>• JPG, PNG, or HEIC formats accepted</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!preview}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 ${
              preview
                ? 'bg-white text-indigo-600 hover:bg-white/90 shadow-white/20'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            <i className="fas fa-magic mr-2"></i>
            Analyze Quote
          </button>
        </div>
      </div>
    </div>
  )
}
