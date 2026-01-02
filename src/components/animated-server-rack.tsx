'use client'

interface AnimatedServerRackProps {
  className?: string
}

export function AnimatedServerRack({ className = '' }: AnimatedServerRackProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 400 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* LED glow */}
          <filter id="led-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rack outline */}
        <rect
          x="50"
          y="50"
          width="300"
          height="500"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          rx="4"
        />

        {/* Server units */}
        {Array.from({ length: 8 }, (_, i) => {
          const y = 80 + i * 60
          const delay = i * 0.3

          return (
            <g key={`server-${i}`}>
              {/* Server unit */}
              <rect
                x="70"
                y={y}
                width="260"
                height="40"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                rx="2"
              />

              {/* Activity indicator bar */}
              <rect
                x="80"
                y={y + 10}
                width="0"
                height="4"
                fill="hsl(var(--foreground))"
                opacity="0.6"
              >
                <animate
                  attributeName="width"
                  values="0;200;0"
                  dur="2s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </rect>

              {/* Status LEDs */}
              <circle
                cx="300"
                cy={y + 12}
                r="3"
                fill="hsl(142 76% 36%)"
                filter="url(#led-glow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="315"
                cy={y + 12}
                r="3"
                fill="hsl(var(--muted-foreground))"
                opacity="0.3"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="1.5s"
                  begin={`${delay + 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Port indicators */}
              {Array.from({ length: 4 }, (_, portIndex) => (
                <rect
                  key={`port-${i}-${portIndex}`}
                  x={80 + portIndex * 12}
                  y={y + 25}
                  width="8"
                  height="6"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  rx="1"
                />
              ))}
            </g>
          )
        })}

        {/* Power flow line */}
        <line
          x1="30"
          y1="80"
          x2="30"
          y2="540"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          opacity="0.2"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 500;500 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </div>
  )
}
