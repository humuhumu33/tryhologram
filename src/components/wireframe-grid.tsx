'use client'

interface WireframeGridProps {
  className?: string
}

export function WireframeGrid({ className = '' }: WireframeGridProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-20 ${className}`}>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Perspective grid pattern */}
          <pattern id="wireframe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0, 255, 255, 0.15)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Grid fade gradient */}
          <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="30%" stopOpacity="0.5" />
            <stop offset="70%" stopOpacity="0.5" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="grid-radial">
            <stop offset="0%" stopOpacity="0.8" />
            <stop offset="100%" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main grid with perspective transform */}
        <g transform="translate(0, -200) skewY(-10)">
          <rect
            width="200%"
            height="200%"
            fill="url(#wireframe-grid)"
            mask="url(#grid-fade)"
          />
        </g>

        {/* Glowing grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`glow-line-${i}`}>
            <line
              x1="0"
              y1={100 + i * 80}
              x2="100%"
              y2={100 + i * 80}
              stroke="rgba(0, 255, 255, 0.3)"
              strokeWidth="0.5"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.5;0.1"
                dur={`${4 + i}s`}
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>

            <line
              x1={100 + i * 100}
              y1="0"
              x2={100 + i * 100}
              y2="100%"
              stroke="rgba(255, 0, 255, 0.2)"
              strokeWidth="0.5"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.4;0.1"
                dur={`${5 + i}s`}
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}

        {/* Pulsing nodes at intersections */}
        {Array.from({ length: 15 }, (_, i) => {
          const x = (i % 5) * 100 + 100
          const y = Math.floor(i / 5) * 80 + 100

          return (
            <circle
              key={`node-${i}`}
              cx={x}
              cy={y}
              r="2"
              fill="rgba(0, 255, 255, 0.6)"
            >
              <animate
                attributeName="r"
                values="1;3;1"
                dur={`${2 + (i % 3)}s`}
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur={`${2 + (i % 3)}s`}
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>
    </div>
  )
}
