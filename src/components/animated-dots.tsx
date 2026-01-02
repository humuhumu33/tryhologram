'use client'

import { useEffect, useRef } from 'react'

interface AnimatedDotsProps {
  className?: string
  dotCount?: number
}

export function AnimatedDots({ className = '', dotCount = 50 }: AnimatedDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create dots
    interface Dot {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }

    const dots: Dot[] = Array.from({ length: dotCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 2 + 1,
    }))

    // Get computed color
    const computedStyle = getComputedStyle(document.documentElement)
    const isDark = computedStyle.getPropertyValue('--background').includes('3.9')
    const dotColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'
    const lineColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw dots
      dots.forEach((dot) => {
        dot.x += dot.vx
        dot.y += dot.vy

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      })

      // Draw connections
      dots.forEach((dot, i) => {
        dots.slice(i + 1).forEach((otherDot) => {
          const dx = dot.x - otherDot.x
          const dy = dot.y - otherDot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(otherDot.x, otherDot.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateSize)
    }
  }, [dotCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 h-full w-full ${className}`}
    />
  )
}
