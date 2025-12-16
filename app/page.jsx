'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [loading, setLoading] = useState(false)

  const submitAnalysis = async () => {
    if (!image) return alert('Upload a chart screenshot')

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

  useEffect(() => {
    if (!result) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(prev => prev + result[i])
      i++
      if (i >= result.length) clearInterval(interval)
    }, 12)
    return () => clearInterval(interval)
  }, [result])

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-24">
      <h1 className="text-3xl font-bold mb-2">Trader Chart AI</h1>
      <p className="text-sm text-gray-400 mb-8 text-center">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          className="mb-3 w-full text-sm"
        />

        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask anything about this chart (optional)..."
          className="w-full mb-4 bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm"
        />

        <button
          onClick={submitAnalysis}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Analyze Chart
        </button>
      </div>

      {/* AI Visual */}
      <div className="relative mt-16 flex flex-col items-center text-center">
        <div className="absolute inset-0 blur-3xl opacity-30 bg-green-500 rounded-full"></div>
        <img
          src="https://i.imgur.com/9QZQZQy.png"
          className="relative w-56 h-56 animate-pulse"
          alt="AI Brain"
        />
        <p className="mt-5 text-xs text-gray-400 max-w-xs">
          AI is analyzing structure, liquidity, momentum & intent
        </p>
      </div>

      {/* Result */}
      {loading && (
        <p className="mt-10 text-sm text-gray-400 animate-pulse">
          Analyzing chart...
        </p>
      )}

      {displayText && (
        <div className="analysis-box mt-10 max-w-md w-full">
          {displayText}
        </div>
      )}

      {/* Follow-up Chat */}
      {result && (
        <div className="mt-8 w-full max-w-md">
          <div className="flex gap-2">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm"
            />
            <button
              onClick={submitAnalysis}
              className="bg-white text-black px-4 rounded-lg font-medium"
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </main>
  )
}