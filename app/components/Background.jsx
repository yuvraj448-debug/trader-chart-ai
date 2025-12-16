'use client'

import { useEffect } from 'react'

export default function Background() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 160 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      s: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()

      stars.forEach((star) => {
        ctx.moveTo(star.x, star.y)
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      })

      ctx.fill()

      stars.forEach((star) => {
        star.y += star.s
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })
    }

    const interval = setInterval(draw, 30)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      id="bg-canvas"
      className="fixed top-0 left-0 w-full h-full z-0 opacity-40"
    />
  )
}