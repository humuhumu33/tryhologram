'use client'

interface LightBeamsProps {
  className?: string
  count?: number
}

export function LightBeams({ className = '', count = 5 }: LightBeamsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Light beam gradient */}
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>

          <linearGradient id="beam-gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 0, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 0, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 0, 255, 0)" />
          </linearGradient>

          <filter id="beam-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>

        {/* Diagonal light beams */}
        {Array.from({ length: count }, (_, i) => {
          const startX = (i / count) * 200 - 50
          const angle = 65 + (i % 3) * 5

          return (
            <g key={`beam-${i}`}>
              <path
                d={`M ${startX},0 L ${startX + 30},0 L ${startX + 130},100 L ${startX + 100},100 Z`}
                fill={i % 2 === 0 ? 'url(#beam-gradient)' : 'url(#beam-gradient-purple)'}
                filter="url(#beam-blur)"
                opacity="0"
                transform={`rotate(${angle} ${startX + 15} 50)`}
              >
                <animate
                  attributeName="opacity"
                  values="0;0.4;0"
                  dur={`${4 + i * 0.5}s`}
                  begin={`${i * 0.8}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; ${i % 2 === 0 ? '20' : '-20'},100; 0,0"
                  dur={`${6 + i}s`}
                  begin={`${i * 0.8}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )
        })}

        {/* Horizontal scanning beams */}
        {[0, 1, 2].map((i) => (
          <rect
            key={`scan-${i}`}
            x="0"
            y="0"
            width="100%"
            height="2"
            fill="rgba(0, 255, 255, 0.2)"
            filter="url(#beam-blur)"
          >
            <animate
              attributeName="y"
              values="-10;110;-10"
              dur={`${8 + i * 2}s`}
              begin={`${i * 2}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
    </div>
  )
}
