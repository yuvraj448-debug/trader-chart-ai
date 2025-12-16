'use client'
import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [asset, setAsset] = useState('XAUUSD')
  const [timeframe, setTimeframe] = useState('M15')
  const [session, setSession] = useState('London')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const submitAnalysis = async () => {
    if (!image) return alert('Upload chart screenshot')
    setLoading(true)

    const formData = new FormData()
    formData.append('image', image)
    formData.append('asset', asset)
    formData.append('timeframe', timeframe)
    formData.append('session', session)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResult(data.analysis)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Trader Chart AI</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <div className="flex gap-2 mb-3">
          <select onChange={(e) => setAsset(e.target.value)} className="bg-black border p-2">
            <option>XAUUSD</option>
            <option>BTCUSD</option>
            <option>EURUSD</option>
          </select>

          <select onChange={(e) => setTimeframe(e.target.value)} className="bg-black border p-2">
            <option>M5</option>
            <option>M15</option>
            <option>H1</option>
          </select>

          <select onChange={(e) => setSession(e.target.value)} className="bg-black border p-2">
            <option>London</option>
            <option>New York</option>
            <option>Asia</option>
          </select>
        </div>

        <button
          onClick={submitAnalysis}
          className="w-full bg-white text-black font-bold py-2 rounded-xl"
        >
          {loading ? 'Analyzing...' : 'Analyze Chart'}
        </button>

        {result && (
          <pre className="mt-4 bg-black p-4 rounded-xl text-sm whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </main>
  )
}