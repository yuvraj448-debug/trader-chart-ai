'use client'
import { useState } from 'react'

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

    let i = 0
    const typing = setInterval(() => {
      setDisplayText(prev => prev + data.analysis[i])
      i++
      if (i >= data.analysis.length) clearInterval(typing)
    }, 8)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-20">
      <h1 className="text-3xl font-bold text-center">
        Trader Chart AI
      </h1>

      <p className="text-sm text-gray-400 text-center mt-2 mb-6">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      <div className="w-full max-w-md bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-4">
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          className="w-full text-sm mb-3"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm mb-4"
        />

        <button
          onClick={submitAnalysis}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl"
        >
          {loading ? (
            <span className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-300"></span>
            </span>
          ) : (
            'Analyze Chart'
          )}
        </button>
      </div>

      {displayText && (
        <div className="w-full max-w-md mt-6 space-y-4">
          {displayText.split('\n\n').map((block, i) => (
            <div key={i} className="analysis-box">
              {block}
            </div>
          ))}

          <button
            onClick={() => {
              navigator.clipboard.writeText(result)
              alert('Analysis copied 🚀')
            }}
            className="w-full py-3 rounded-xl border border-white/10 text-sm hover:bg-white/10 transition"
          >
            📤 Copy Analysis
          </button>
        </div>
      )}
    </main>
  )
}