'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatusBar from '@/components/ui/StatusBar'

type Plan = 'free' | 'premium'

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('premium')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  const plans = {
    free: {
      name: 'Free',
      price: 0,
      period: 'forever',
      tagline: 'Try the basics',
      features: [
        { text: '3 quote analyses per month', included: true },
        { text: 'Basic price comparison', included: true },
        { text: 'Part alternatives', included: true },
        { text: 'PDF reports', included: false },
        { text: 'Mechanic ratings', included: false },
        { text: 'Unlimited scans', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced analytics', included: false },
      ],
    },
    premium: {
      name: 'Premium',
      price: billingCycle === 'monthly' ? 9.99 : 7.99,
      period: billingCycle === 'monthly' ? '/month' : '/month',
      annualSavings: billingCycle === 'annual' ? 24 : 0,
      tagline: 'Maximize your savings',
      features: [
        { text: 'Unlimited quote analyses', included: true },
        { text: 'Advanced price insights', included: true },
        { text: 'Smart part recommendations', included: true },
        { text: 'Professional PDF reports', included: true },
        { text: 'Verified mechanic ratings', included: true },
        { text: 'Price trend tracking', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Detailed analytics dashboard', included: true },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StatusBar bgColor="white" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
            <p className="text-sm text-gray-600">Choose your plan</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 pb-12">
        {/* Current Plan Badge */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-5 mb-6 shadow-lg">
          <div className="flex items-center gap-3 text-white">
            <i className="fas fa-crown text-3xl"></i>
            <div className="flex-1">
              <p className="text-sm text-white/90 mb-1">Current Plan</p>
              <p className="text-xl font-bold">Premium - Annual</p>
              <p className="text-sm text-white/90 mt-1">Renews Dec 20, 2025</p>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              billingCycle === 'annual'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Annual
            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        {/* Premium Plan */}
        <div className="mb-4">
          <div
            className={`bg-white rounded-3xl shadow-xl overflow-hidden border-4 transition-all ${
              selectedPlan === 'premium'
                ? 'border-indigo-600 ring-4 ring-indigo-100'
                : 'border-transparent'
            }`}
          >
            {/* Recommended Badge */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 font-bold text-sm">
              <i className="fas fa-star mr-2"></i>
              RECOMMENDED
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl mb-4">
                  <i className="fas fa-crown text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plans.premium.name}
                </h3>
                <p className="text-gray-600 mb-4">{plans.premium.tagline}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plans.premium.price}
                  </span>
                  <span className="text-gray-600">{plans.premium.period}</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Save ${plans.premium.annualSavings}/year • Billed $95.88 annually
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plans.premium.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-500 text-lg mt-0.5"></i>
                    <span className="text-gray-700 flex-1">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
                Continue with Premium
              </button>
            </div>
          </div>
        </div>

        {/* Free Plan */}
        <div className="mb-8">
          <div
            className={`bg-white rounded-3xl shadow-sm overflow-hidden border-2 transition-all ${
              selectedPlan === 'free'
                ? 'border-indigo-600 ring-4 ring-indigo-100'
                : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                  <i className="fas fa-gift text-gray-600 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plans.free.name}
                </h3>
                <p className="text-gray-600 mb-4">{plans.free.tagline}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plans.free.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <i
                      className={`fas ${
                        feature.included ? 'fa-check-circle text-green-500' : 'fa-times-circle text-gray-300'
                      } text-lg mt-0.5`}
                    ></i>
                    <span
                      className={`flex-1 ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl active:scale-95 transition-transform">
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Feature Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="text-center py-3 text-sm font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="text-center py-3 text-sm font-semibold text-indigo-600">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-700">Quote analyses</td>
                  <td className="text-center text-gray-600">3/month</td>
                  <td className="text-center text-indigo-600 font-semibold">
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-700">Price insights</td>
                  <td className="text-center">
                    <i className="fas fa-check text-gray-400"></i>
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-indigo-600"></i>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-700">PDF reports</td>
                  <td className="text-center">
                    <i className="fas fa-times text-gray-300"></i>
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-indigo-600"></i>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-700">Mechanic ratings</td>
                  <td className="text-center">
                    <i className="fas fa-times text-gray-300"></i>
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-indigo-600"></i>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Priority support</td>
                  <td className="text-center">
                    <i className="fas fa-times text-gray-300"></i>
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-indigo-600"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            What Users Say
          </h3>
          <div className="space-y-3">
            {[
              {
                name: 'Sarah M.',
                text: 'Saved over $800 in my first 3 months. Premium pays for itself!',
                rating: 5,
              },
              {
                name: 'Mike T.',
                text: 'The mechanic ratings alone are worth the premium price.',
                rating: 5,
              },
              {
                name: 'Jennifer K.',
                text: 'Best investment for anyone who owns a car. Highly recommended!',
                rating: 5,
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2">{review.text}</p>
                <p className="text-xs text-gray-500 font-semibold">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes! Cancel your subscription anytime with no cancellation fees.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all new users get a 7-day free trial of Premium features.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, Apple Pay, and Google Pay.',
              },
              {
                q: 'Do you offer refunds?',
                a: '30-day money-back guarantee if you\'re not satisfied.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-2xl shadow-sm overflow-hidden group"
              >
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <i className="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <i className="fas fa-lock text-gray-400 text-2xl"></i>
            <i className="fas fa-shield-alt text-gray-400 text-2xl"></i>
            <i className="fab fa-cc-visa text-gray-400 text-2xl"></i>
            <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
          </div>
          <p className="text-xs text-gray-600">
            Secure payment • 256-bit SSL encryption • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
