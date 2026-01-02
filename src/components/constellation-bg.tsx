'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { AnimatedPrism } from '@/components/animated-prism'

interface Node {
  x: number
  y: number
  radius: number
  element?: SVGCircleElement
}

interface ConstellationBgProps {
  className?: string
}

export function ConstellationBg({ className = '' }: ConstellationBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationsRef = useRef<gsap.core.Tween[]>([])
  const frameIdRef = useRef<number>(0)
  const prismRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    const width = container.offsetWidth || 1920
    const height = container.offsetHeight || 1080
    const nodeCount = 80
    const connectionDistance = 180

    // Update viewBox to match container
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

    // Clear previous
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild)
    }
    animationsRef.current.forEach(tween => tween.kill())
    animationsRef.current = []

    // Create defs for gradients and filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

    // Glow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', 'constellation-glow')
    filter.setAttribute('x', '-100%')
    filter.setAttribute('y', '-100%')
    filter.setAttribute('width', '300%')
    filter.setAttribute('height', '300%')

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feGaussianBlur.setAttribute('stdDeviation', '4')
    feGaussianBlur.setAttribute('result', 'coloredBlur')
    filter.appendChild(feGaussianBlur)

    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode1.setAttribute('in', 'coloredBlur')
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode2.setAttribute('in', 'SourceGraphic')
    feMerge.appendChild(feMergeNode1)
    feMerge.appendChild(feMergeNode2)
    filter.appendChild(feMerge)
    defs.appendChild(filter)

    // Line gradient - uses CSS variable colors
    const lineGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    lineGradient.setAttribute('id', 'constellation-line-grad')
    lineGradient.innerHTML = `
      <stop offset="0%" class="constellation-stop-cyan" />
      <stop offset="50%" class="constellation-stop-purple" />
      <stop offset="100%" class="constellation-stop-cyan" />
    `
    defs.appendChild(lineGradient)

    svg.appendChild(defs)

    // Create groups for connections and nodes
    const connectionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    connectionsGroup.setAttribute('class', 'connections')
    svg.appendChild(connectionsGroup)

    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    nodesGroup.setAttribute('class', 'nodes')
    svg.appendChild(nodesGroup)

    // Create nodes with random positions across full viewport
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.5 + Math.random() * 2.5,
      }

      // Create node element
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(node.x))
      circle.setAttribute('cy', String(node.y))
      circle.setAttribute('r', String(node.radius))
      circle.classList.add('constellation-node')
      circle.setAttribute('filter', 'url(#constellation-glow)')
      nodesGroup.appendChild(circle)
      node.element = circle

      // Slow, mellow floating animation with GSAP
      const tween = gsap.to(node, {
        x: node.x + (Math.random() - 0.5) * 80,
        y: node.y + (Math.random() - 0.5) * 80,
        duration: 8 + Math.random() * 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          circle.setAttribute('cx', String(node.x))
          circle.setAttribute('cy', String(node.y))
        },
      })
      animationsRef.current.push(tween)

      // Very slow pulse animation
      const pulseTween = gsap.to(circle, {
        attr: { r: node.radius * 1.3 },
        duration: 3 + Math.random() * 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3,
      })
      animationsRef.current.push(pulseTween)

      nodes.push(node)
    }

    nodesRef.current = nodes

    // Create dynamic connections
    const allConnections: Map<string, SVGLineElement> = new Map()

    const updateConnections = () => {
      const activeConnections = new Set<string>()

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeI = nodes[i]
          const nodeJ = nodes[j]
          const dx = nodeJ.x - nodeI.x
          const dy = nodeJ.y - nodeI.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const connectionKey = `${i}-${j}`

          if (distance < connectionDistance) {
            activeConnections.add(connectionKey)
            const opacity = Math.max(0, (1 - distance / connectionDistance) * 0.5)

            let line = allConnections.get(connectionKey)
            if (!line) {
              line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
              line.classList.add('constellation-line')
              line.setAttribute('stroke-width', '1')
              connectionsGroup.appendChild(line)
              allConnections.set(connectionKey, line)
            }

            line.setAttribute('x1', String(nodeI.x))
            line.setAttribute('y1', String(nodeI.y))
            line.setAttribute('x2', String(nodeJ.x))
            line.setAttribute('y2', String(nodeJ.y))
            line.setAttribute('opacity', String(opacity))
          }
        }
      }

      allConnections.forEach((line, key) => {
        if (!activeConnections.has(key)) {
          line.remove()
          allConnections.delete(key)
        }
      })

      frameIdRef.current = requestAnimationFrame(updateConnections)
    }
    frameIdRef.current = requestAnimationFrame(updateConnections)

    // Handle resize
    const handleResize = () => {
      const newWidth = container.offsetWidth || 1920
      const newHeight = container.offsetHeight || 1080
      svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameIdRef.current)
      animationsRef.current.forEach(tween => tween.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Floating prism animation
  useEffect(() => {
    if (!prismRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(prismRef.current, {
        y: 30,
        x: 15,
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-1 overflow-hidden ${className}`}
    >
      {/* Base gradient - removed, using body gradient instead */}

      {/* Constellation SVG with theme-aware styles */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Floating Hologram Prism */}
      <div ref={prismRef} className="absolute right-0 top-1/4 -translate-y-1/2">
        <AnimatedPrism size="large" opacity={0.25} position="right" />
      </div>

      {/* Fade overlay - holographic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(280_70%_6%_/_0.9)_70%)]" />
      
      {/* Holographic glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,hsl(200_80%_30%_/_0.1)_0%,transparent_50%),radial-gradient(ellipse_at_70%_60%,hsl(280_70%_25%_/_0.08)_0%,transparent_50%)]" />

      {/* Theme-aware styles for constellation - holographic colors */}
      <style jsx global>{`
        .constellation-node {
          fill: rgba(6, 182, 212, 0.9);
          opacity: 0.8;
          filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.5));
        }
        .constellation-line {
          stroke: rgba(6, 182, 212, 0.4);
          stroke-width: 0.5;
        }
        .constellation-stop-cyan {
          stop-color: rgba(6, 182, 212, 0.6);
          stop-opacity: 0.5;
        }
        .constellation-stop-purple {
          stop-color: rgba(139, 92, 246, 0.5);
          stop-opacity: 0.4;
        }
      `}</style>
    </div>
  )
}
