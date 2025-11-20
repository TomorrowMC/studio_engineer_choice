import { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  label?: string
  description?: string
}

export default function PhoneFrame({ children, label, description }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <div className="text-center mb-4">
          <div className="text-white font-bold text-xl mb-2">{label}</div>
          {description && (
            <div className="text-white/80 text-sm max-w-[393px]">{description}</div>
          )}
        </div>
      )}
      <div className="w-[393px] h-[852px] bg-black rounded-[55px] p-3 shadow-2xl relative">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-20"></div>

        {/* Screen */}
        <div className="w-full h-full rounded-[45px] overflow-hidden bg-white relative">
          {children}
        </div>
      </div>
    </div>
  )
}
