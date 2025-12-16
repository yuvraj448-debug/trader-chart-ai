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
      setResult(data.analysis || 'No response from AI')
    } catch (err) {
      setResult('Something went wrong. Try again.')
    }

    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0b0b0b',
      color: '#fff',
      padding: '20px',
      fontFamily: 'Arial',
    }}>
      <h1 style={{ fontSize: '26px', marginBottom: '15px' }}>
        Trader Chart AI
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: '12px' }}
      />

      <input
        type="text"
        placeholder="Ask anything about this chart (optional)..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '12px',
          background: '#111',
          color: '#fff',
          border: '1px solid #333',
          borderRadius: '6px',
        }}
      />

      <button
        onClick={submitAnalysis}
        style={{
          width: '100%',
          padding: '12px',
          background: '#fff',
          color: '#000',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        {loading ? 'Analyzing chart…' : 'Analyze Chart'}
      </button>

      {result && (
        <pre style={{
          marginTop: '20px',
          background: '#111',
          padding: '15px',
          borderRadius: '8px',
          whiteSpace: 'pre-wrap',
        }}>
          {result}
        </pre>
      )}
    </main>
  )
}