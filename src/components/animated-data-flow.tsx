'use client'

interface AnimatedDataFlowProps {
  className?: string
}

export function AnimatedDataFlow({ className = '' }: AnimatedDataFlowProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Data packet gradient */}
          <linearGradient id="packet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal data flow lines */}
        {[150, 250, 350, 450].map((y, index) => (
          <g key={`flow-${index}`}>
            {/* Base line */}
            <line
              x1="0"
              y1={y}
              x2="1200"
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* Animated data packet */}
            <rect
              y={y - 2}
              width="100"
              height="4"
              fill="url(#packet-gradient)"
            >
              <animate
                attributeName="x"
                from="-100"
                to="1200"
                dur={`${3 + index * 0.5}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* Node points along the line */}
            {[200, 400, 600, 800, 1000].map((x, nodeIndex) => (
              <circle
                key={`node-${index}-${nodeIndex}`}
                cx={x}
                cy={y}
                r="3"
                fill="hsl(var(--muted-foreground))"
                opacity="0.2"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.5;0.2"
                  dur="1.5s"
                  begin={`${nodeIndex * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Vertical connecting lines */}
        {[200, 400, 600, 800, 1000].map((x, index) => (
          <line
            key={`vertical-${index}`}
            x1={x}
            y1="150"
            x2={x}
            y2="450"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity="0.1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>
    </div>
  )
}
