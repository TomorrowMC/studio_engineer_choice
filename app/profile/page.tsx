'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

interface Vehicle {
  id: string
  year: string
  make: string
  model: string
  trim: string
  color: string
  mileage: string
  vin: string
  gradient: string
}

const VEHICLES_KEY = 'choice_engine_vehicles'
const PROFILE_KEY = 'choice_engine_profile'

const gradients = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-green-400 to-green-600',
  'bg-gradient-to-br from-orange-400 to-orange-600',
  'bg-gradient-to-br from-red-400 to-red-600',
  'bg-gradient-to-br from-teal-400 to-teal-600',
]

const defaultVehicles: Vehicle[] = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    color: 'Silver',
    mileage: '45,230',
    vin: '4T1B11HK...',
    gradient: gradients[0],
  },
  {
    id: '2',
    year: '2016',
    make: 'Honda',
    model: 'CR-V',
    trim: 'EX',
    color: 'White Pearl',
    mileage: '72,890',
    vin: '5J6RM4H5...',
    gradient: gradients[1],
  },
  {
    id: '3',
    year: '2021',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    color: 'Black',
    mileage: '18,450',
    vin: '5YJ3E1EA...',
    gradient: gradients[2],
  },
]

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function ProfilePage() {
  const [userName, setUserName] = useState('Alex Chen')
  const [vehicles, setVehicles] = useState<Vehicle[]>(defaultVehicles)
  const [showEditName, setShowEditName] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [editNameValue, setEditNameValue] = useState('')
  const [newVehicle, setNewVehicle] = useState({
    year: '',
    make: '',
    model: '',
    trim: '',
    color: '',
    mileage: '',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const profile = localStorage.getItem(PROFILE_KEY)
    if (profile) {
      try {
        const parsed = JSON.parse(profile)
        if (parsed.name) setUserName(parsed.name)
      } catch {}
    }
    const stored = localStorage.getItem(VEHICLES_KEY)
    if (stored) {
      try {
        setVehicles(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const handleSaveName = () => {
    const trimmed = editNameValue.trim()
    if (!trimmed) return
    setUserName(trimmed)
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ name: trimmed }))
    setShowEditName(false)
  }

  const openEditName = () => {
    setEditNameValue(userName)
    setShowEditName(true)
  }

  const handleAddVehicle = () => {
    if (!newVehicle.year || !newVehicle.make || !newVehicle.model) return
    const vehicle: Vehicle = {
      id: Date.now().toString(),
      year: newVehicle.year,
      make: newVehicle.make,
      model: newVehicle.model,
      trim: newVehicle.trim || '',
      color: newVehicle.color || '',
      mileage: newVehicle.mileage || '0',
      vin: '',
      gradient: gradients[vehicles.length % gradients.length],
    }
    const updated = [...vehicles, vehicle]
    setVehicles(updated)
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(updated))
    setNewVehicle({ year: '', make: '', model: '', trim: '', color: '', mileage: '' })
    setShowAddVehicle(false)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => String(currentYear - i))

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-bold">Profile</h1>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
            <i className="fas fa-cog"></i>
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-3xl font-bold">{getInitials(userName)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 truncate">{userName}</h2>
              <p className="text-sm text-gray-600 mb-2 truncate">alex.chen@email.com</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold rounded-full">
                  <i className="fas fa-crown mr-1"></i>
                  Premium
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">23</p>
              <p className="text-xs text-gray-600">Quotes</p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-2xl font-bold text-green-600 mb-1">$1.2K</p>
              <p className="text-xs text-gray-600">Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{vehicles.length}</p>
              <p className="text-xs text-gray-600">Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 pb-32">
        {/* My Vehicles */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">My Vehicles</h3>
            <button
              onClick={() => setShowAddVehicle(true)}
              className="text-sm text-indigo-600 font-semibold"
            >
              <i className="fas fa-plus mr-1"></i>
              Add Vehicle
            </button>
          </div>

          <div className="space-y-3">
            {vehicles.map((vehicle, idx) => (
              <div key={vehicle.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${vehicle.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <i className="fas fa-car text-white text-2xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h4>
                        {(vehicle.trim || vehicle.color) && (
                          <p className="text-sm text-gray-600">
                            {[vehicle.trim, vehicle.color].filter(Boolean).join(' • ')}
                          </p>
                        )}
                      </div>
                      {idx === 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg whitespace-nowrap flex-shrink-0">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-tachometer-alt text-indigo-600"></i>
                        <span>{vehicle.mileage} mi</span>
                      </div>
                      {vehicle.vin && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <i className="fas fa-calendar text-indigo-600"></i>
                            <span>VIN: {vehicle.vin}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <Link
              href="/subscription"
              className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-crown text-yellow-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Subscription</p>
                  <p className="text-xs text-gray-600">Premium Plan</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </Link>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-bell text-blue-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-600">Alerts & reminders</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-lock text-purple-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Privacy & Security</p>
                  <p className="text-xs text-gray-600">Password, 2FA</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>

            <button
              onClick={openEditName}
              className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-user-edit text-green-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Edit Profile</p>
                  <p className="text-xs text-gray-600">Name, email, photo</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>
          </div>
        </div>

        {/* Support & Info */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Support & Info</h3>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-question-circle text-indigo-600"></i>
                </div>
                <p className="font-semibold text-gray-900">Help Center</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-headset text-orange-600"></i>
                </div>
                <p className="font-semibold text-gray-900">Contact Support</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-star text-pink-600"></i>
                </div>
                <p className="font-semibold text-gray-900">Rate App</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-info-circle text-gray-600"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">About</p>
                  <p className="text-xs text-gray-600">Version 2.1.0</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>
          </div>
        </div>

        <button className="w-full bg-white text-red-600 font-semibold py-4 rounded-2xl shadow-sm border border-red-200 active:scale-95 transition-transform">
          <i className="fas fa-sign-out-alt mr-2"></i>
          Log Out
        </button>

        <div className="text-center mt-6 text-xs text-gray-500">
          <p>The Choice Engine</p>
          <p className="mt-1">
            <button className="underline">Terms</button> •{' '}
            <button className="underline">Privacy</button>
          </p>
        </div>
      </div>

      <BottomNav />

      {/* Edit Name Modal */}
      {showEditName && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditName(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Edit Your Name</h2>
            <p className="text-sm text-gray-500 mb-5">This name appears across the app.</p>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Display Name
              </label>
              <input
                type="text"
                value={editNameValue}
                onChange={(e) => setEditNameValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowEditName(false)}
                className="py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                disabled={!editNameValue.trim()}
                className="py-3 bg-indigo-600 text-white font-semibold rounded-2xl active:scale-95 transition-transform disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddVehicle(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Add a Vehicle</h2>
            <p className="text-sm text-gray-500 mb-5">Year and make are required.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Year *</label>
                <select
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Make *</label>
                <input
                  type="text"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                  placeholder="e.g. Toyota, Honda, Ford"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Model *</label>
                <input
                  type="text"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  placeholder="e.g. Camry, Civic, F-150"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Trim</label>
                  <input
                    type="text"
                    value={newVehicle.trim}
                    onChange={(e) => setNewVehicle({ ...newVehicle, trim: e.target.value })}
                    placeholder="e.g. LE, EX"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Color</label>
                  <input
                    type="text"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                    placeholder="e.g. Silver"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Mileage</label>
                <input
                  type="number"
                  value={newVehicle.mileage}
                  onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
                  placeholder="e.g. 45000"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowAddVehicle(false)}
                className="py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVehicle}
                disabled={!newVehicle.year || !newVehicle.make || !newVehicle.model}
                className="py-3 bg-indigo-600 text-white font-semibold rounded-2xl active:scale-95 transition-transform disabled:opacity-50"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
