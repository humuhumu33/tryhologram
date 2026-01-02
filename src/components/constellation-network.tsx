'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Node {
  x: number
  y: number
  radius: number
  element?: SVGCircleElement
  connections: SVGLineElement[]
}

interface ConstellationNetworkProps {
  className?: string
}

export function ConstellationNetwork({ className = '' }: ConstellationNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationsRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const width = 800
    const height = 400
    const nodeCount = 50
    const connectionDistance = 120

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
    filter.setAttribute('id', 'glow')
    filter.setAttribute('x', '-50%')
    filter.setAttribute('y', '-50%')
    filter.setAttribute('width', '200%')
    filter.setAttribute('height', '200%')

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feGaussianBlur.setAttribute('stdDeviation', '3')
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

    // Line gradient
    const lineGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    lineGradient.setAttribute('id', 'lineGrad')
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop1.setAttribute('offset', '0%')
    stop1.setAttribute('stop-color', '#8b5cf6')
    stop1.setAttribute('stop-opacity', '0.6')
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop2.setAttribute('offset', '50%')
    stop2.setAttribute('stop-color', '#3b82f6')
    stop2.setAttribute('stop-opacity', '0.8')
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop3.setAttribute('offset', '100%')
    stop3.setAttribute('stop-color', '#8b5cf6')
    stop3.setAttribute('stop-opacity', '0.6')
    lineGradient.appendChild(stop1)
    lineGradient.appendChild(stop2)
    lineGradient.appendChild(stop3)
    defs.appendChild(lineGradient)

    svg.appendChild(defs)

    // Create groups for connections and nodes
    const connectionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    connectionsGroup.setAttribute('class', 'connections')
    svg.appendChild(connectionsGroup)

    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    nodesGroup.setAttribute('class', 'nodes')
    svg.appendChild(nodesGroup)

    // Create nodes with random positions
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        x: 50 + Math.random() * (width - 100),
        y: 50 + Math.random() * (height - 100),
        radius: 2 + Math.random() * 3,
        connections: [],
      }

      // Create node element
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(node.x))
      circle.setAttribute('cy', String(node.y))
      circle.setAttribute('r', String(node.radius))
      circle.setAttribute('fill', '#8b5cf6')
      circle.setAttribute('filter', 'url(#glow)')
      circle.setAttribute('opacity', '0.8')
      nodesGroup.appendChild(circle)
      node.element = circle

      // Animate node with GSAP
      const tween = gsap.to(node, {
        x: node.x + (Math.random() - 0.5) * 100,
        y: node.y + (Math.random() - 0.5) * 60,
        duration: 3 + Math.random() * 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          circle.setAttribute('cx', String(node.x))
          circle.setAttribute('cy', String(node.y))
        },
      })
      animationsRef.current.push(tween)

      // Pulse animation
      const pulseTween = gsap.to(circle, {
        attr: { r: node.radius * 1.5 },
        opacity: 1,
        duration: 1 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      })
      animationsRef.current.push(pulseTween)

      nodes.push(node)
    }

    nodesRef.current = nodes

    // Create connections between nearby nodes
    const allConnections: SVGLineElement[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', String(nodes[i].x))
          line.setAttribute('y1', String(nodes[i].y))
          line.setAttribute('x2', String(nodes[j].x))
          line.setAttribute('y2', String(nodes[j].y))
          line.setAttribute('stroke', 'url(#lineGrad)')
          line.setAttribute('stroke-width', '1')
          line.setAttribute('opacity', String(1 - distance / connectionDistance))
          connectionsGroup.appendChild(line)

          nodes[i].connections.push(line)
          nodes[j].connections.push(line)
          allConnections.push(line)

          // Store node indices for updates
          ;(line as unknown as { nodeI: number; nodeJ: number }).nodeI = i
          ;(line as unknown as { nodeI: number; nodeJ: number }).nodeJ = j
        }
      }
    }

    // Update connections on animation
    const updateConnections = () => {
      allConnections.forEach(line => {
        const lineData = line as unknown as { nodeI: number; nodeJ: number }
        const nodeI = nodes[lineData.nodeI]
        const nodeJ = nodes[lineData.nodeJ]
        line.setAttribute('x1', String(nodeI.x))
        line.setAttribute('y1', String(nodeI.y))
        line.setAttribute('x2', String(nodeJ.x))
        line.setAttribute('y2', String(nodeJ.y))

        const dx = nodeJ.x - nodeI.x
        const dy = nodeJ.y - nodeI.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const opacity = Math.max(0, 1 - distance / (connectionDistance * 1.5))
        line.setAttribute('opacity', String(opacity * 0.6))
      })
      requestAnimationFrame(updateConnections)
    }
    const frameId = requestAnimationFrame(updateConnections)

    return () => {
      cancelAnimationFrame(frameId)
      animationsRef.current.forEach(tween => tween.kill())
    }
  }, [])

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-purple/30 bg-linear-to-br from-surface-dark via-purple/20 to-surface-dark ${className}`}>
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      />
    </div>
  )
}
