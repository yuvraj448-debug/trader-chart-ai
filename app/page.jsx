'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [loading, setLoading] = useState(false)

  const submitAnalysis = async () => {
    if (!image) {
      alert('Upload a chart screenshot')
      return
    }

    setLoading(true)
    setResult('')
    setDisplayText('')

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

  /* TYPING EFFECT */
  useEffect(() => {
    if (!result) return

    let i = 0
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + result[i])
      i++
      if (i >= result.length) clearInterval(interval)
    }, 8)

    return () => clearInterval(interval)
  }, [result])

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-24 px-4 z-10">

      <h1 className="text-3xl font-bold mb-2">Trader Chart AI</h1>
      <p className="text-gray-400 text-sm mb-8 text-center max-w-sm">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      <div className="analysis-box w-full max-w-md">
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

        {displayText && (
          <div className="ai-result typing-caret">
            {displayText}
          </div>
        )}
      </div>

      {/* AI CORE */}
      <div className="mt-24 flex flex-col items-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-green-500 opacity-20 blur-3xl animate-pulse rounded-full"></div>
          <div className="relative w-full h-full border border-green-400 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        <p className="mt-6 text-xs text-green-400 tracking-wide animate-pulse">
          AI is analyzing structure, liquidity, momentum & intent
        </p>
      </div>
    </main>
  )
}