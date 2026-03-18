 'use client'
import { useState } from 'react'

export default function Pricing() {
  const [success, setSuccess] = useState(false)

  const plans = [
    {
      name: 'Starter',
      price: '9',
      features: [
        '20 prospect researches/mo',
        'AI email generator',
        'Email tracking',
        'Cancel anytime',
      ],
      paypalLink: 'https://www.paypal.com/paypalme/YOUR_PAYPAL_USERNAME/9'
    },
    {
      name: 'Pro',
      price: '29',
      popular: true,
      features: [
        'Unlimited researches',
        'AI email sequences',
        'CRM integration',
        'Priority support',
      ],
      paypalLink: 'https://www.paypal.com/paypalme/YOUR_PAYPAL_USERNAME/29'
    }
  ]

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-100 max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-6">Welcome to SalesIQ! Your account is now active.</p>
          <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all">
            Go to Dashboard
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SalesIQ
        </a>
        <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
          Back to Dashboard
        </a>
      </nav>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your plan</h1>
          <p className="text-gray-500 text-lg">Start closing more deals today</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'border-blue-200 shadow-xl' : 'border-gray-100 shadow-sm'}`}>
              {plan.popular && (
                <div className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-4">Most Popular</div>
              )}
              <div className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">${plan.price}<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <div className="text-gray-400 text-sm mb-6">Per user — cancel anytime</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={plan.paypalLink} target="_blank" rel="noopener noreferrer" className={`block text-center py-3 rounded-xl font-medium transition-all duration-200 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-blue-200' : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                Pay with PayPal
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">Secured by PayPal</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">Questions? Email us at support@salesiq.app</p>
        </div>
      </div>
    </main>
  )
}
