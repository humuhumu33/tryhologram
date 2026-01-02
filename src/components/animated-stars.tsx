'use client'

import { useEffect, useRef } from 'react'

interface AnimatedStarsProps {
  className?: string
  starCount?: number
}

export function AnimatedStars({ className = '', starCount = 200 }: AnimatedStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create stars with varying properties
    interface Star {
      x: number
      y: number
      radius: number
      baseOpacity: number
      twinkleSpeed: number
      twinklePhase: number
    }

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    // Function to get current theme
    const getStarColor = () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const isDark = computedStyle.getPropertyValue('--background').includes('3.9')
      return isDark ? '255, 255, 255' : '60, 60, 60'
    }

    // Function to get opacity multiplier based on theme
    const getOpacityMultiplier = () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const isDark = computedStyle.getPropertyValue('--background').includes('3.9')
      return isDark ? 1 : 0.6 // Reduce opacity in light mode
    }

    // Animation loop
    let animationFrameId: number
    let frame = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current theme colors (reactive to theme changes)
      const starColor = getStarColor()
      const opacityMultiplier = getOpacityMultiplier()

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        // Calculate twinkle opacity
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.3
        const currentOpacity = Math.max(0.1, Math.min(1, (star.baseOpacity + twinkle) * opacityMultiplier))

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${starColor}, ${currentOpacity})`
        ctx.fill()

        // Add subtle glow for larger stars
        if (star.radius > 1.2) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          )
          gradient.addColorStop(0, `rgba(${starColor}, ${currentOpacity * 0.3})`)
          gradient.addColorStop(1, `rgba(${starColor}, 0)`)
          ctx.fillStyle = gradient
          ctx.fillRect(
            star.x - star.radius * 3,
            star.y - star.radius * 3,
            star.radius * 6,
            star.radius * 6
          )
        }
      })

      frame++
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateSize)
    }
  }, [starCount])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-full w-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
