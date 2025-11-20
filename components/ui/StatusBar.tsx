'use client'

import { useState, useEffect } from 'react'

export default function StatusBar({ bgColor = 'white' }: { bgColor?: string }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`h-11 flex items-center justify-between px-5 text-[15px] font-semibold ${
        bgColor === 'white' ? 'bg-white text-gray-900' : 'bg-transparent text-white'
      }`}
    >
      <span>{time || '9:41'}</span>
      <div className="flex gap-1">
        <i className="fas fa-signal"></i>
        <i className="fas fa-wifi"></i>
        <i className="fas fa-battery-three-quarters"></i>
      </div>
    </div>
  )
}
