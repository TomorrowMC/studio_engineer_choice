'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: 'fa-home', label: 'Home' },
  { href: '/camera', icon: 'fa-camera', label: 'Scan' },
  { href: '/mechanic-finder', icon: 'fa-map-marker-alt', label: 'Find' },
  { href: '/profile', icon: 'fa-user', label: 'Profile' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2.5 pb-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-[11px] transition-colors ${
              isActive ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <i className={`fas ${item.icon} text-[22px]`}></i>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
