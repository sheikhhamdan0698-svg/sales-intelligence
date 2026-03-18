'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [prospect, setProspect] = useState('')
  const [loading, setLoading] = useState(false)
  const [research, setResearch] = useState(null)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleResearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResearch(null)
    setShowPaywall(false)

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: prospect,
          userId: user.id
        })
      })

      const result = await response.json()

      if (result.limitReached) {
        setShowPaywall(true)
      } else if (result.success) {
        setResearch({
          company: prospect,
          summary: result.data.summary,
          signals: result.data.signals,
          email: result.data.email
        })
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Something went wrong. Try again.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SalesIQ
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <a href="/pricing" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all">
            Upgrade Plan
          </a>
          <button onClick={handleLogout} className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-10">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-500 mt-1">Research any company and get a real AI written email in seconds.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Researches today', value: '0' },
            { label: 'Emails generated', value: '0' },
            { label: 'Replies received', value: '0' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Research a prospect</h2>
          <p className="text-gray-400 text-sm mb-6">Type any company name and real AI will research it for you</p>
          <form onSubmit={handleResearch} className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. Salesforce, HubSpot, Acme Corp..."
              value={prospect}
              onChange={(e) => setProspect(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Researching...' : 'Research →'}
            </button>
          </form>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>AI is researching <strong>{prospect}</strong>...</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">This takes about 5-10 seconds</p>
          </div>
        )}

        {/* Paywall */}
        {showPaywall && (
          <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-10 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You have used your free research!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Upgrade to keep researching prospects and generating personalized cold emails with AI.</p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Starter</div>
                <div className="text-3xl font-bold text-gray-900 mb-3">$9<span className="text-sm text-gray-400 font-normal">/mo</span></div>
                <ul className="text-sm text-gray-600 space-y-2 mb-4 text-left">
                  <li>✓ 20 researches/mo</li>
                  <li>✓ AI email generator</li>
                  <li>✓ Email tracking</li>
                </ul>
                <a href="/pricing" className="block text-center border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-50 transition-all font-medium text-sm">
                  Get Starter
                </a>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold">
                  BEST VALUE
                </div>
                <div className="font-semibold text-white mb-1">Pro</div>
                <div className="text-3xl font-bold text-white mb-3">$29<span className="text-sm text-blue-200 font-normal">/mo</span></div>
                <ul className="text-sm text-blue-100 space-y-2 mb-4 text-left">
                  <li>✓ Unlimited researches</li>
                  <li>✓ AI email sequences</li>
                  <li>✓ Priority support</li>
                </ul>
                <a href="/pricing" className="block text-center bg-white text-blue-600 py-2 rounded-xl hover:bg-blue-50 transition-all font-medium text-sm">
                  Get Pro
                </a>
              </div>
            </div>

            <p className="text-gray-400 text-sm">Cancel anytime. No hidden fees.</p>
          </div>
        )}

        {research && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
                  {research.company[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{research.company}</div>
                  <div className="text-xs text-green-500 font-medium">✓ Research complete</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{research.summary}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-semibold text-gray-900 mb-4">Buying signals detected</h3>
              <div className="space-y-3">
                {research.signals.map((signal, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                    <span className="text-green-500 font-bold">↑</span>
                    <span className="text-gray-700 text-sm">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-semibold text-gray-900 mb-4">AI generated cold email</h3>
              <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {research.email}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(research.email)
                  alert('Email copied!')
                }}
                className="mt-4 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all"
              >
                Copy email
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}