'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HolographicTitleProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  glow?: boolean
}

export function HolographicTitle({
  children,
  className = '',
  as: Component = 'h1',
  glow = true
}: HolographicTitleProps) {
  return (
    <Component
      className={cn(
        'holographic-text',
        glow && 'holographic-glow',
        className
      )}
    >
      {children}
    </Component>
  )
}
