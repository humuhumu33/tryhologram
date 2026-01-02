"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export const HologramPipeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Intro timeline: stages and key elements appear in sequence
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.from(".stage", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.15,
      })
        .from(
          ".connector-line",
          {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "center top",
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".fan-line",
          {
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .from(
          ".runtime",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.1"
        );

      // Continuous subtle animations

      // Flowing dash down the pipeline
      gsap.to(".connector-line", {
        strokeDashoffset: -48,
        duration: 2.8,
        repeat: -1,
        ease: "none",
      });

      // Gentle shimmer on fan-out lines
      gsap.to(".fan-line", {
        opacity: 0.5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Very subtle breathing on stage outlines
      gsap.to(".stage-box", {
        strokeOpacity: 0.6,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 1600"
      className="w-full h-auto hologram-pipeline-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 40)">
        {/* Stage 1 */}
        <g className="stage stage-1">
          <rect width="400" height="160" rx="16" className="stage-box" />
          <text x="200" y="40" className="stage-title">
            Stage 1 — User Code
          </text>

          <text x="40" y="90" className="mono">
            Python / TypeScript
          </text>
          <text x="40" y="120" className="mono">
            tensor.matmul(other)
          </text>
        </g>

        {/* connector 1 */}
        <g transform="translate(200, 180)" className="connector">
          <line x1="0" y1="0" x2="0" y2="100" className="connector-line" />
        </g>

        {/* Stage 2 */}
        <g transform="translate(0, 280)" className="stage stage-2">
          <rect width="400" height="180" rx="16" className="stage-box" />
          <text x="200" y="40" className="stage-title">
            Stage 2 — Circuit Building
          </text>

          <text x="40" y="90" className="mono">
            Operation Graph
          </text>
          <text x="40" y="120" className="mono">
            Nodes connected
          </text>
          <text x="40" y="150" className="mono">
            Lazy evaluation (ops queued)
          </text>
        </g>

        {/* connector 2 */}
        <g transform="translate(200, 480)" className="connector">
          <line x1="0" y1="0" x2="0" y2="100" className="connector-line" />
        </g>

        {/* Stage 3 */}
        <g transform="translate(0, 580)" className="stage stage-3">
          <rect width="400" height="210" rx="16" className="stage-box" />
          <text x="200" y="40" className="stage-title">
            Stage 3 — Compilation
          </text>

          <text x="40" y="90" className="mono">
            Hologram Compiler
          </text>
          <text x="40" y="120" className="mono">
            Pattern canonicalization
          </text>
          <text x="40" y="150" className="mono">
            96-class resonance mapping
          </text>
          <text x="40" y="180" className="mono">
            Output: Compiled Circuit
          </text>
        </g>

        {/* timing annotation */}
        <text x="450" y="660" className="timing">
          compile time: ~μs
        </text>

        {/* connector 3 */}
        <g transform="translate(200, 810)" className="connector">
          <line x1="0" y1="0" x2="0" y2="100" className="connector-line" />
        </g>

        {/* Stage 4 */}
        <g transform="translate(0, 910)" className="stage stage-4">
          <rect width="400" height="200" rx="16" className="stage-box" />
          <text x="200" y="40" className="stage-title">
            Stage 4 — ISA Translation
          </text>

          <text x="40" y="90" className="mono">
            Atlas ISA
          </text>
          <text x="40" y="130" className="mono">
            Instruction stream emitted
          </text>
          <text x="40" y="160" className="mono">
            50+ specialized opcodes
          </text>
        </g>

        {/* connector 4 */}
        <g transform="translate(200, 1130)" className="connector">
          <line x1="0" y1="0" x2="0" y2="100" className="connector-line" />
        </g>

        {/* Stage 5 */}
        <g transform="translate(0, 1230)" className="stage stage-5">
          <rect width="400" height="330" rx="16" className="stage-box" />
          <text x="200" y="40" className="stage-title">
            Stage 5 — Backend Execution
          </text>

          {/* Fan-out lines */}
          <g className="fanout">
            <line x1="200" y1="80" x2="50" y2="150" className="fan-line" />
            <line x1="200" y1="80" x2="350" y2="150" className="fan-line" />
            <line x1="200" y1="80" x2="50" y2="240" className="fan-line" />
            <line x1="200" y1="80" x2="350" y2="240" className="fan-line" />
          </g>

          {/* Backends */}
          <text x="50" y="170" className="mono">
            CUDA → NVIDIA GPU
          </text>
          <text x="350" y="170" textAnchor="end" className="mono">
            Metal → Apple GPU
          </text>

          <text x="50" y="260" className="mono">
            WebGPU → Browser GPU
          </text>
          <text x="350" y="260" textAnchor="end" className="mono">
            CPU → SIMD instructions
          </text>

          <text x="200" y="310" className="runtime">
            O(1) execution time
          </text>
        </g>

        {/* runtime timing annotation */}
        <text x="450" y="1320" className="timing">
          runtime lookup: ~35ns
        </text>
      </g>
    </svg>
  );
};

export default HologramPipeline;
