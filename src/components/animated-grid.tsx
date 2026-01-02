'use client'

interface AnimatedGridProps {
  className?: string
}

export function AnimatedGrid({ className = '' }: AnimatedGridProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full stroke-border/10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32V.5H32"
              fill="none"
              strokeDasharray="0"
            />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--border))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#grid-gradient)" />
      </svg>
    </div>
  )
}
