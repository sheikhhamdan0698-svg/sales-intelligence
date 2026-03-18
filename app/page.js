'use client'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full opacity-40 animate-blob" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-blue-50 rounded-full opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SalesIQ
        </div>
        <div className="flex gap-4 items-center">
          <a href="/login" className="text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors duration-200">Login</a>
          <a href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-200 font-medium">
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-8 pt-40 pb-24 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          AI-Powered Sales Intelligence
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          Close More Deals.<br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Stop Wasting Time
          </span>{' '}
          on Research.
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          SalesIQ researches your prospects, writes personalized emails, and tells you the perfect moment to reach out — all automatically.
        </p>

        <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-400">
          <a href="/signup" className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:opacity-90 transition-all duration-300 shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-0.5">
            Start Free Today
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a href="#how" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5">
            See How It Works
          </a>
        </div>


        {/* Floating dashboard preview */}
        <div className="mt-16 relative animate-float">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 bg-gray-100 rounded-full h-6 ml-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">47</div>
                <div className="text-xs text-gray-500 mt-1">Prospects today</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-gray-500 mt-1">Emails sent</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-500 mt-1">Replies received</div>
              </div>
            </div>
            <div className="space-y-2">
              {['Acme Corp — Series B raised $12M last week', 'TechFlow Inc — Hiring 20 sales reps', 'DataPro — CEO just changed'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div className="text-sm text-gray-600">{item}</div>
                  <div className="ml-auto text-xs text-blue-500 font-medium whitespace-nowrap">Write email →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center text-white">
          {[
            { num: '3hrs', label: 'Saved per rep daily' },
            { num: '40%', label: 'More replies on cold email' },
            { num: '10x', label: 'Faster prospect research' },
          ].map((s, i) => (
            <div key={i} className="hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold">{s.num}</div>
              <div className="text-blue-200 mt-1 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-24 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
        <p className="text-center text-gray-400 mb-16">Three steps. That is all.</p>
        <div className="grid grid-cols-3 gap-10">
          {[
            { n: '1', title: 'Add a prospect', desc: 'Type any company name or paste a LinkedIn URL' },
            { n: '2', title: 'AI does the research', desc: 'We find funding news, pain points, recent activity and more' },
            { n: '3', title: 'Send the perfect email', desc: 'AI writes a personalized email. You review and send in one click' },
          ].map((s, i) => (
            <div key={i} className="text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200 group-hover:shadow-xl group-hover:shadow-blue-300 transition-all duration-300">
                {s.n}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 bg-gray-50 py-24 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Simple Pricing</h2>
          <p className="text-center text-gray-400 mb-16">No hidden fees. Cancel anytime.</p>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-lg font-semibold text-gray-900 mb-1">Starter</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$49<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <div className="text-gray-400 text-sm mb-6">Per user</div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {['50 prospect researches/mo', 'AI email generator', 'Email tracking', 'PayPal billing'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/signup" className="block text-center border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium">
                Get Started
              </a>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Most Popular</div>
              <div className="text-lg font-semibold text-white mb-1">Pro</div>
              <div className="text-4xl font-bold text-white mb-1">$99<span className="text-lg text-blue-200 font-normal">/mo</span></div>
              <div className="text-blue-200 text-sm mb-6">Per user</div>
              <ul className="space-y-3 text-sm text-blue-100 mb-8">
                {['Unlimited researches', 'AI email sequences', 'CRM integration', 'Priority support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-300 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/signup" className="block text-center bg-white text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 text-sm border-t border-gray-100">
        © 2026 SalesIQ. Built to help you sell more.
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 8s infinite ease-in-out; }
        .animate-float { animation: float 4s infinite ease-in-out; }
        .animate-fade-in { animation: fade-in 0.6s ease forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

    </main>
  )
}