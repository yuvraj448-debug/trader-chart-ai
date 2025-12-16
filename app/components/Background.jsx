'use client'
import { useEffect } from 'react'

export default function Background() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    let stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      d: Math.random() * 0.5
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      stars.forEach(s => {
        ctx.moveTo(s.x, s.y)
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      })
      ctx.fill()
      stars.forEach(s => {
        s.y += s.d
        if (s.y > canvas.height) {
          s.y = 0
          s.x = Math.random() * canvas.width
        }
      })
    }

    const interval = setInterval(draw, 40)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      id="bg-canvas"
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
    />
  )
}