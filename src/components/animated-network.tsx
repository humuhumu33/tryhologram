'use client'

interface AnimatedNetworkProps {
  className?: string
}

export function AnimatedNetwork({ className = '' }: AnimatedNetworkProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated gradient for lines */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.6">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Network nodes */}
        <g className="nodes" opacity="0.6">
          {/* Central node */}
          <circle cx="400" cy="200" r="8" fill="hsl(var(--foreground))">
            <animate
              attributeName="r"
              values="6;8;6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Surrounding nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 400 + Math.cos((angle * Math.PI) / 180) * 120
            const y = 200 + Math.sin((angle * Math.PI) / 180) * 120
            return (
              <circle
                key={`node-${i}`}
                cx={x}
                cy={y}
                r="5"
                fill="hsl(var(--muted-foreground))"
              >
                <animate
                  attributeName="r"
                  values="4;6;4"
                  dur="2s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )
          })}
        </g>

        {/* Connection lines */}
        <g className="connections" opacity="0.3">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 400 + Math.cos((angle * Math.PI) / 180) * 120
            const y = 200 + Math.sin((angle * Math.PI) / 180) * 120
            return (
              <line
                key={`line-${i}`}
                x1="400"
                y1="200"
                x2={x}
                y2={y}
                stroke="url(#line-gradient)"
                strokeWidth="1.5"
                filter="url(#glow)"
              />
            )
          })}
        </g>

        {/* Outer ring */}
        <circle
          cx="400"
          cy="200"
          r="120"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="120;125;120"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
