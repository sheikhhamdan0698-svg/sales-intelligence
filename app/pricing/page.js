'use client'
import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [success, setSuccess] = useState(false)

  const plans = [
    {
      name: 'Starter',
      price: '49',
      priceLabel: '$49/mo',
      features: [
        '50 prospect researches/mo',
        'AI email generator',
        'Email tracking',
        'PayPal billing',
      ]
    },
    {
      name: 'Pro',
      price: '99',
      priceLabel: '$99/mo',
      popular: true,
      features: [
        'Unlimited researches',
        'AI email sequences',
        'CRM integration',
        'Priority support',
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
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

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-green-600 mb-6">Welcome to SalesIQ! Your account is now active.</p>
            <a href="/dashboard" className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-all">
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                  selectedPlan === plan.name
                    ? 'border-blue-500 shadow-xl shadow-blue-100'
                    : plan.popular
                    ? 'border-blue-200 shadow-lg'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-4">
                    Most Popular
                  </div>
                )}

                <div className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ${plan.price}<span className="text-lg text-gray-400 font-normal">/mo</span>
                </div>
                <div className="text-gray-400 text-sm mb-6">Per user • Cancel anytime</div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>

                {selectedPlan === plan.name ? (
                  <div className="mt-4">
                    <PayPalScriptProvider options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      currency: 'USD'
                    }}>
                      <PayPalButtons
                        style={{ layout: 'vertical', shape: 'rect' }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{
                              amount: {
                                value: plan.price,
                                currency_code: 'USD'
                              },
                              description: `SalesIQ ${plan.name} Plan`
                            }]
                          })
                        }}
                        onApprove={async (data, actions) => {
                          await actions.order.capture()
                          setSuccess(true)
                        }}
                        onCancel={() => setSelectedPlan(null)}
                      />
                    </PayPalScriptProvider>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-blue-200'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Get Started
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
``