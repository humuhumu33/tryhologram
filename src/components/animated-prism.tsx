'use client'

interface AnimatedPrismProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  opacity?: number
  position?: 'left' | 'right' | 'center'
}

export function AnimatedPrism({
  className = '',
  size = 'medium',
  opacity = 0.3,
  position = 'right'
}: AnimatedPrismProps) {
  const sizeMap = {
    small: 300,
    medium: 500,
    large: 800
  }

  const positionClass = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  }

  const width = sizeMap[size]
  const height = sizeMap[size]

  return (
    <div
      className={`absolute ${positionClass[position]} top-1/2 -translate-y-1/2 ${className}`}
      style={{ opacity }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-slow-spin"
      >
        <defs>
          {/* Glow filter */}
          <filter id="prism-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Light ray gradient */}
          <linearGradient id="light-ray" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Central wireframe prism */}
        <g transform="translate(200, 200)">
          {/* Front face */}
          <path
            d="M 0,-80 L 70,40 L -70,40 Z"
            fill="none"
            stroke="url(#holographic-stroke)"
            strokeWidth="1.5"
            filter="url(#prism-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Back face */}
          <path
            d="M 0,-60 L 50,60 L -50,60 Z"
            fill="none"
            stroke="rgba(255, 0, 255, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* Connecting edges */}
          <line x1="0" y1="-80" x2="0" y2="-60" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
          <line x1="70" y1="40" x2="50" y2="60" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
          <line x1="-70" y1="40" x2="-50" y2="60" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />

          {/* Inner details */}
          <line x1="0" y1="-80" x2="0" y2="40" stroke="rgba(255, 255, 0, 0.2)" strokeWidth="0.5" />
          <line x1="-70" y1="40" x2="70" y2="40" stroke="rgba(255, 255, 0, 0.2)" strokeWidth="0.5" />
        </g>

        {/* Light rays emanating from prism */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={`ray-${i}`}
            x1="200"
            y1="200"
            x2={200 + Math.cos((angle * Math.PI) / 180) * 150}
            y2={200 + Math.sin((angle * Math.PI) / 180) * 150}
            stroke="url(#light-ray)"
            strokeWidth="2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur="4s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Gradient definition for wireframe */}
        <defs>
          <linearGradient id="holographic-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff">
              <animate attributeName="stop-color" values="#00ffff;#ff00ff;#ffff00;#00ffff" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ff00ff">
              <animate attributeName="stop-color" values="#ff00ff;#ffff00;#00ffff;#ff00ff" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
