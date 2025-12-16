'use client'
import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const submitAnalysis = async () => {
    if (!image) {
      alert('Please upload a chart screenshot')
      return
    }

    setLoading(true)
    setResult('')

    const formData = new FormData()
    formData.append('image', image)
    formData.append('question', question)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setResult(data.analysis || 'No analysis returned.')
    } catch (err) {
      setResult('AI error. Try again.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Trader Chart AI
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-4 text-sm"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none"
        />

        <button
          onClick={submitAnalysis}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Chart'}
        </button>

        {loading && (
          <div className="mt-6 text-center text-sm text-gray-400 animate-pulse">
            Reading price action & liquidity...
          </div>
        )}

        {result && (
          <pre className="mt-6 whitespace-pre-wrap text-sm bg-black/40 p-4 rounded-lg border border-white/10">
            {result}
          </pre>
        )}
      </div>
    </main>
  )
}