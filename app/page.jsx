'use client'

import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const submitAnalysis = async () => {
    if (!image) {
      alert('Upload a chart screenshot')
      return
    }

    setLoading(true)
    setResult('')

    const formData = new FormData()
    formData.append('image', image)
    formData.append('question', question)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResult(data.analysis)
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start pt-24 px-4 text-white z-10">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">Trader Chart AI</h1>
      <p className="text-gray-400 text-sm mb-8 text-center max-w-sm">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      {/* ANALYZE CARD */}
      <div className="analysis-box w-full max-w-md mb-16">
        <input
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)..."
          className="w-full bg-black border border-neutral-800 rounded-lg p-3 mb-4 text-sm outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={submitAnalysis}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Chart'}
        </button>

        {result && (
          <pre className="mt-4 text-xs text-gray-300 whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>

      {/* 🔥 AI CORE SECTION (REPLACES EMPTY SPACE) */}
      <section className="relative flex flex-col items-center justify-center text-center mb-32">
        
        {/* AI GLOW */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse"></div>
          <div className="relative w-36 h-36 rounded-full border border-green-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* TEXT */}
        <p className="mt-6 text-sm text-green-400 tracking-wide animate-pulse">
          AI is analyzing structure, liquidity, momentum & intent
        </p>
      </section>
    </main>
  )
}