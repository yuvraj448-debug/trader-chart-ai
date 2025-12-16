import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const formData = await req.formData()
    const image = formData.get('image')
    const asset = formData.get('asset')
    const timeframe = formData.get('timeframe')
    const session = formData.get('session')

    const prompt = `
You are a professional institutional trader.
Analyze the uploaded trading chart screenshot.

Asset: ${asset}
Timeframe: ${timeframe}
Session: ${session}

Give:
- Market bias (bullish / bearish / range)
- Key liquidity zones
- Entry model
- Stop loss & take profit
- Risk management advice
- Session-specific insight
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })

    return NextResponse.json({
      analysis: response.choices[0].message.content,
    })
  } catch (e) {
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}