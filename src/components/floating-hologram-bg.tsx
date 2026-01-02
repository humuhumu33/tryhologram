'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FloatingHologramBgProps {
  className?: string
}

export function FloatingHologramBg({ className = '' }: FloatingHologramBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prism1Ref = useRef<SVGSVGElement>(null)
  const prism2Ref = useRef<SVGSVGElement>(null)
  const prism3Ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow floating animation for first prism
      if (prism1Ref.current) {
        gsap.to(prism1Ref.current, {
          y: 30,
          x: 15,
          rotation: 5,
          duration: 12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }

      // Slower floating for second prism
      if (prism2Ref.current) {
        gsap.to(prism2Ref.current, {
          y: -25,
          x: -10,
          rotation: -3,
          duration: 15,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }

      // Third prism with different timing
      if (prism3Ref.current) {
        gsap.to(prism3Ref.current, {
          y: 20,
          x: -20,
          rotation: 4,
          duration: 18,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-950/20" />

      {/* Wireframe grid background */}
      <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hologram-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="hsl(var(--cyan))"
              strokeWidth="0.3"
              strokeOpacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="200%" height="200%" fill="url(#hologram-grid)" transform="skewY(-5)" />
      </svg>

      {/* Floating Prism 1 - Top Right */}
      <svg
        ref={prism1Ref}
        className="absolute -right-20 top-20 h-[500px] w-[500px] opacity-20"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="prism-glow-1">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="holographic-stroke-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cyan))">
              <animate attributeName="stop-color" values="hsl(var(--cyan));hsl(var(--purple));hsl(var(--cyan))" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--purple))">
              <animate attributeName="stop-color" values="hsl(var(--purple));hsl(var(--cyan));hsl(var(--purple))" dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <g transform="translate(200, 200)">
          {/* Main triangle */}
          <path
            d="M 0,-120 L 104,60 L -104,60 Z"
            fill="none"
            stroke="url(#holographic-stroke-1)"
            strokeWidth="1.5"
            filter="url(#prism-glow-1)"
          >
            <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite" />
          </path>
          {/* Inner triangle */}
          <path
            d="M 0,-80 L 70,40 L -70,40 Z"
            fill="none"
            stroke="hsl(var(--cyan))"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
          {/* Center lines */}
          <line x1="0" y1="-120" x2="0" y2="60" stroke="hsl(var(--purple))" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="-104" y1="60" x2="52" y2="-30" stroke="hsl(var(--purple))" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="104" y1="60" x2="-52" y2="-30" stroke="hsl(var(--purple))" strokeWidth="0.5" strokeOpacity="0.2" />
        </g>
      </svg>

      {/* Floating Prism 2 - Bottom Left */}
      <svg
        ref={prism2Ref}
        className="absolute -left-32 bottom-40 h-[600px] w-[600px] opacity-15"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="prism-glow-2">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="holographic-stroke-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--purple))">
              <animate attributeName="stop-color" values="hsl(var(--purple));hsl(var(--cyan));hsl(var(--purple))" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--cyan))">
              <animate attributeName="stop-color" values="hsl(var(--cyan));hsl(var(--purple));hsl(var(--cyan))" dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <g transform="translate(200, 200)">
          {/* Hexagon shape */}
          <path
            d="M 0,-100 L 87,-50 L 87,50 L 0,100 L -87,50 L -87,-50 Z"
            fill="none"
            stroke="url(#holographic-stroke-2)"
            strokeWidth="1.5"
            filter="url(#prism-glow-2)"
          >
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="8s" repeatCount="indefinite" />
          </path>
          {/* Inner hexagon */}
          <path
            d="M 0,-60 L 52,-30 L 52,30 L 0,60 L -52,30 L -52,-30 Z"
            fill="none"
            stroke="hsl(var(--cyan))"
            strokeWidth="0.5"
            strokeOpacity="0.25"
          />
          {/* Center point */}
          <circle cx="0" cy="0" r="4" fill="hsl(var(--cyan))" fillOpacity="0.3">
            <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* Floating Prism 3 - Center Right */}
      <svg
        ref={prism3Ref}
        className="absolute right-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 opacity-10"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="prism-glow-3">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="translate(200, 200)">
          {/* Diamond shape */}
          <path
            d="M 0,-80 L 80,0 L 0,80 L -80,0 Z"
            fill="none"
            stroke="hsl(var(--cyan))"
            strokeWidth="1"
            filter="url(#prism-glow-3)"
          >
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="7s" repeatCount="indefinite" />
          </path>
          {/* Inner diamond */}
          <path
            d="M 0,-50 L 50,0 L 0,50 L -50,0 Z"
            fill="none"
            stroke="hsl(var(--purple))"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeDasharray="3 3"
          />
        </g>
      </svg>

      {/* Floating particles */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 20 }, (_, i) => {
          const x = 10 + (i * 17) % 90
          const y = 5 + (i * 23) % 90
          const delay = i * 0.5
          const duration = 6 + (i % 4) * 2
          return (
            <circle
              key={`particle-${i}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="1.5"
              fill="hsl(var(--cyan))"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.4;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${y}%;${y - 5}%;${y}%`}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>

      {/* Light beams */}
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cyan))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--cyan))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--cyan))" stopOpacity="0" />
          </linearGradient>
          <filter id="beam-blur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        {[0, 1, 2].map((i) => (
          <rect
            key={`beam-${i}`}
            x="0"
            y="0"
            width="100%"
            height="3"
            fill="url(#beam-grad)"
            filter="url(#beam-blur)"
          >
            <animate
              attributeName="y"
              values="-5%;105%;-5%"
              dur={`${20 + i * 5}s`}
              begin={`${i * 3}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
    </div>
  )
}
