'use client'

interface ScanLinesProps {
  className?: string
  opacity?: number
}

export function ScanLines({ className = '', opacity = 1 }: ScanLinesProps) {
  return (
    <div
      className={`scan-lines pointer-events-none absolute inset-0 z-[1] ${className}`}
      style={{ opacity }}
    />
  )
}
