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

  // Typing animation
  useEffect(() => {
    if (!result) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(result.slice(0, i))
      i++
      if (i > result.length) clearInterval(interval)
    }, 15)
    return () => clearInterval(interval)
  }, [result])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Trader Chart AI
      </h1>

      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl p-5 shadow-xl">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-zinc-700 outline-none"
        />

        <button
          onClick={submitAnalysis}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Analyze Chart
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-8 text-zinc-400 animate-pulse">
          🧠 Analyzing smart money & liquidity…
        </div>
      )}

      {/* Result */}
      {displayText && (
        <div className="mt-8 w-full max-w-xl bg-zinc-900 rounded-2xl p-6 text-sm leading-relaxed whitespace-pre-wrap font-mono">
          {displayText}
        </div>
      )}
    </main>
  )
}