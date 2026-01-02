"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import "./torus.css";

export interface TorusIsometricProps {
  className?: string;
  rotationX?: number;
  rotationZ?: number;
  majorRadius?: number;
  minorRadius?: number;
  interactive?: boolean;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface PathData {
  path: string;
  depth: number;
  type?: string;
}

export function TorusIsometric({
  rotationX: initialRotationX = 25,
  rotationZ: initialRotationZ = 45,
  majorRadius = 120,
  minorRadius = 45,
  className = "",
  interactive = true,
}: TorusIsometricProps) {
  const [mounted, setMounted] = useState(false);
  const [rotationX, setRotationX] = useState(initialRotationX);
  const [rotationZ, setRotationZ] = useState(initialRotationZ);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  // Auto-rotation animation - continuous smooth rotation (matches GIF animation)
  useEffect(() => {
    if (!mounted) return;

    let startTime = performance.now();
    const baseRotationZ = initialRotationZ;
    const baseRotationX = initialRotationX;

    const animate = (currentTime: number) => {
      // Always animate if not interactive, or if interactive and not dragging
      if (interactive && (!autoRotateRef.current || isDragging.current)) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds

      // Continuous rotation around Z axis (360 degrees per 20 seconds - matches GIF speed)
      const rotationZ = baseRotationZ + (elapsed * 360) / 20;
      
      // Subtle oscillation on X axis for more dynamic look (matches GIF)
      const rotationX = baseRotationX + Math.sin(elapsed * 0.5) * 5;

      setRotationZ(rotationZ);
      setRotationX(rotationX);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, initialRotationX, initialRotationZ, interactive]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !interactive) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      if (isDragging.current) {
        // Pause auto-rotation while dragging
        autoRotateRef.current = false;
        setRotationZ((prev) => prev + deltaX * 0.5);
        setRotationX((prev) => Math.max(-90, Math.min(90, prev + deltaY * 0.5)));
      } else {
        // Smooth rotation based on mouse position relative to center
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);

        const targetRotationZ = initialRotationZ + relativeX * 30;
        const targetRotationX = initialRotationX + relativeY * 30;

        setRotationZ(targetRotationZ);
        setRotationX(Math.max(-90, Math.min(90, targetRotationX)));
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    },
    [interactive, initialRotationX, initialRotationZ]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    // Resume auto-rotation after a delay
    setTimeout(() => {
      autoRotateRef.current = true;
    }, 2000);
  }, []);

  useEffect(() => {
    if (!interactive || !mounted) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [interactive, mounted, handleMouseMove, handleMouseDown, handleMouseUp]);

  // Memoize geometry calculation to recalculate when rotation changes
  const { allLines } = useMemo(() => {
    // Generate dense wireframe grid for mathematical torus projection
    const majorSegments = 80; // Around the ring - very dense for wireframe
    const minorSegments = 60; // Around the tube - very dense for wireframe

    // Convert rotation angles from degrees to radians
    const rotX = (rotationX * Math.PI) / 180;
    const rotZ = (rotationZ * Math.PI) / 180;

    // Helper function to create 3D point on torus with proper parametric equations
    const torusPoint = (u: number, v: number): Point3D => {
      // Parametric equations for a torus
      const x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
      const y = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);
      const z = minorRadius * Math.sin(v);

      // Apply 3D rotation - first rotate around X axis
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      // Then rotate around Z axis
      const x2 = x * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      const y2 = x * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      return { x: x2, y: y2, z: z1 };
    };


    // Generate meridians (around the tube)
    const meridians: PathData[] = [];
    for (let i = 0; i < majorSegments; i++) {
      const u = (i / majorSegments) * 2 * Math.PI;
      const points: string[] = [];

      for (let j = 0; j <= minorSegments; j++) {
        const v = (j / minorSegments) * 2 * Math.PI;
        const p = torusPoint(u, v);
        points.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      }

      meridians.push({
        path: `M ${points.join(" L ")}`,
        depth: torusPoint(u, 0).z,
      });
    }

    // Generate parallels (around the ring)
    const parallels: PathData[] = [];
    for (let j = 0; j < minorSegments; j++) {
      const v = (j / minorSegments) * 2 * Math.PI;
      const points: string[] = [];

      for (let i = 0; i <= majorSegments; i++) {
        const u = (i / majorSegments) * 2 * Math.PI;
        const p = torusPoint(u, v);
        points.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      }

      parallels.push({
        path: `M ${points.join(" L ")}`,
        depth: torusPoint(0, v).z,
      });
    }

    // Sort by depth for proper wireframe rendering (back to front)
    const allLines: PathData[] = [
      ...meridians.map((m) => ({ ...m, type: "meridian" })),
      ...parallels.map((p) => ({ ...p, type: "parallel" })),
    ].sort((a, b) => b.depth - a.depth); // Render back to front for wireframe

    return { allLines };
  }, [rotationX, rotationZ, majorRadius, minorRadius]);

  // Prevent hydration mismatch from floating-point differences
  if (!mounted) {
    return (
      <div ref={containerRef} className={cn("torus-container", className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-200 -200 400 400"
          className={cn("w-full h-full", className)}
        >
          <rect
            x="-200"
            y="-200"
            width="400"
            height="400"
            className="background"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("torus-container", interactive && "torus-interactive", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-200 -200 400 400"
        className={cn("w-full h-full", className)}
      >
        <rect
          x="-200"
          y="-200"
          width="400"
          height="400"
          className="background"
        />

        <g transform="translate(0, 0)" className="torus-wireframe">
          {/* Render dense wireframe grid lines */}
          {allLines.map((line, i) => (
            <path
              key={`line-${i}`}
              d={line.path}
              className="grid-lines"
              data-type={line.type}
              strokeWidth="0.5"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
