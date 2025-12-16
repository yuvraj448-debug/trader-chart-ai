'use client'

import { useState, useEffect } from 'react'
import Background from './components/Background'

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
    setResult(data.analysis || '')
    setLoading(false)
  }

  /* Typing animation */
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
    <>
      {/* ⭐ Animated Star Background */}
      <Background />

      {/* 🔝 CONTENT LAYER */}
      <main className="app-content min-h-screen flex flex-col items-center px-4 pt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Trader Chart AI
        </h1>

        <div className="w-full max-w-md bg-[#0b0b0b]/80 backdrop-blur-xl border border-[#1a1a1a] rounded-2xl p-4 shadow-xl">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mb-3 text-sm"
          />

          <textarea
            placeholder="Ask anything about this chart (optional)..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full mb-4 p-2 rounded-md resize-none"
            rows={2}
          />

          <button
            onClick={submitAnalysis}
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded-lg"
          >
            {loading ? 'Analyzing…' : 'Analyze Chart'}
          </button>
        </div>

        {/* 📊 RESULT */}
        {displayText && (
          <div className="analysis-box w-full max-w-md mt-6">
            {displayText}
          </div>
        )}
      </main>
    </>
  )
}