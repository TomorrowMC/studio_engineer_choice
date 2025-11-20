'use client'

import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'
import BottomNav from '@/components/ui/BottomNav'

export default function ProfilePage() {
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
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-3xl font-bold">AC</span>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 truncate">
                Alex Chen
              </h2>
              <p className="text-sm text-gray-600 mb-2 truncate">alex.chen@email.com</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold rounded-full">
                  <i className="fas fa-crown mr-1"></i>
                  Premium
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
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
              <p className="text-2xl font-bold text-gray-900 mb-1">3</p>
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
            <button className="text-sm text-indigo-600 font-semibold">
              <i className="fas fa-plus mr-1"></i>
              Add Vehicle
            </button>
          </div>

          <div className="space-y-3">
            {/* Vehicle 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-car text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        2019 Toyota Camry
                      </h4>
                      <p className="text-sm text-gray-600">LE • Silver</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg whitespace-nowrap flex-shrink-0">
                      Primary
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-tachometer-alt text-indigo-600"></i>
                      <span>45,230 mi</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-calendar text-indigo-600"></i>
                      <span>VIN: 4T1B11HK...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-car text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1 truncate">
                    2016 Honda CR-V
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">EX • White Pearl</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-tachometer-alt text-indigo-600"></i>
                      <span>72,890 mi</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-calendar text-indigo-600"></i>
                      <span>VIN: 5J6RM4H5...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-car text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1 truncate">
                    2021 Tesla Model 3
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">Long Range • Black</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-tachometer-alt text-indigo-600"></i>
                      <span>18,450 mi</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-calendar text-indigo-600"></i>
                      <span>VIN: 5YJ3E1EA...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Account Settings
          </h3>

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

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Support & Info
          </h3>

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

        {/* Logout Button */}
        <button className="w-full bg-white text-red-600 font-semibold py-4 rounded-2xl shadow-sm border border-red-200 active:scale-95 transition-transform">
          <i className="fas fa-sign-out-alt mr-2"></i>
          Log Out
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>The Choice Engine</p>
          <p className="mt-1">
            <button className="underline">Terms</button> •{' '}
            <button className="underline">Privacy</button>
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
