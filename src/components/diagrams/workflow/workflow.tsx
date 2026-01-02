'use client'

import { useState, useEffect } from 'react';
import "./workflow.css";

interface ComputationWorkflowProps {
  width?: number;
  height?: number;
}

export function ComputationWorkflow({
  width = 400,
  height = 1440,
}: ComputationWorkflowProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const centerX = 200;

  // Draw down arrow
  const drawArrow = (x: number, y: number, length: number) => (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + length} className="workflow-arrow" />
      <polygon
        points={`${x},${y + length + 8} ${x - 5},${y + length} ${x + 5},${
          y + length
        }`}
        className="workflow-arrow"
      />
    </g>
  );

  // Text section helper with improved styling
  const textSection = (
    lines: Array<{ text: string; bold?: boolean; size?: number }>,
    x: number,
    y: number
  ) => (
    <g>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + i * 22}
          textAnchor="middle"
          fontSize={line.size || 13}
          fontWeight={line.bold ? "bold" : "normal"}
          fill="var(--text-color)"
        >
          {line.text}
        </text>
      ))}
    </g>
  );

  // Top icon with graph
  const topIcon = (
    <g transform="translate(120, 20)">
      {/* Rounded square */}
      <rect
        x="0"
        y="0"
        width="160"
        height="160"
        rx="15"
        fill="var(--icon-box-bg)"
        stroke="var(--icon-box-border)"
        strokeWidth="3"
      />

      {/* Folded corner */}
      <path d="M 140 0 L 160 20 L 140 20 Z" fill="var(--icon-box-corner)" />
      <path
        d="M 140 0 L 160 20 L 140 20 Z"
        stroke="var(--icon-box-border)"
        strokeWidth="2"
        fill="none"
      />

      {/* Graph/molecule structure */}
      <g transform="translate(80, 80)">
        {/* Center node */}
        <circle
          cx="0"
          cy="0"
          r="8"
          fill="var(--graph-node-teal)"
          stroke="var(--icon-box-border)"
          strokeWidth="2"
        />

        {/* Outer nodes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 35;
          const y = Math.sin(rad) * 35;
          const isOrange = i % 2 === 1;
          return (
            <g key={`node-${i}`}>
              <line
                x1="0"
                y1="0"
                x2={x}
                y2={y}
                stroke="var(--graph-line)"
                strokeWidth="2"
              />
              <circle
                cx={x}
                cy={y}
                r="6"
                fill={
                  isOrange
                    ? "var(--graph-node-orange)"
                    : "var(--graph-node-teal)"
                }
                stroke="var(--icon-box-border)"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </g>
    </g>
  );

  // Top text section
  const topText = textSection(
    [
      { text: "COMPUTATION IS PRE-COMPUTED AND STORED:", bold: true, size: 14 },
      { text: "Hologram compiler pre-computes outcomes", size: 13 },
      { text: "across 96 resonance classes", size: 13 },
    ],
    centerX,
    230
  );

  // File icon
  const fileIcon = (
    <g transform="translate(140, 310)">
      <rect
        x="0"
        y="0"
        width="120"
        height="140"
        rx="5"
        fill="var(--file-bg)"
        stroke="var(--file-border)"
        strokeWidth="2.5"
      />
      <path
        d="M 90 0 L 120 30 L 90 30 Z"
        fill="var(--file-fold)"
        stroke="var(--file-border)"
        strokeWidth="2.5"
      />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="var(--text-color)"
      >
        .holo
      </text>
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fontSize="16"
        fill="var(--text-color)"
      >
        FILE
      </text>
      <text
        x="60"
        y="115"
        textAnchor="middle"
        fontSize="14"
        fill="var(--text-color)"
      >
        (~66 KB)
      </text>
    </g>
  );

  // Middle text section
  const middleText = textSection(
    [
      { text: "RUNTIME EXECUTION IS A ~35ns LOOKUP:", bold: true, size: 14 },
      { text: "Hashing (~10ns) + Lookup (~25ns)", size: 13 },
      { text: "replaces calculations", size: 13 },
    ],
    centerX,
    640
  );

  // Hash flow
  const hashFlow = (
    <g transform="translate(0, 520)">
      {/* Document */}
      <g transform="translate(30, 0)">
        <rect
          x="0"
          y="0"
          width="40"
          height="50"
          rx="3"
          fill="var(--file-bg)"
          stroke="var(--file-border)"
          strokeWidth="2"
        />
        <line
          x1="8"
          y1="12"
          x2="32"
          y2="12"
          stroke="var(--file-border)"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="20"
          x2="32"
          y2="20"
          stroke="var(--file-border)"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="28"
          x2="32"
          y2="28"
          stroke="var(--file-border)"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="36"
          x2="25"
          y2="36"
          stroke="var(--file-border)"
          strokeWidth="1.5"
        />
      </g>

      {/* Arrow */}
      <line x1="80" y1="25" x2="110" y2="25" className="workflow-arrow" />
      <polygon points="118,25 110,20 110,30" className="workflow-arrow" />

      {/* Hash box */}
      <g transform="translate(120, 0)">
        <path
          d="M 0 10 L 10 0 L 70 0 L 80 10 L 70 50 L 10 50 Z"
          fill="var(--hash-box-bg)"
          stroke="var(--hash-box-border)"
          strokeWidth="2.5"
        />
        <text
          x="40"
          y="32"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          hash()
        </text>
      </g>

      {/* Arrow */}
      <line x1="210" y1="25" x2="240" y2="25" className="workflow-arrow" />
      <polygon points="248,25 240,20 240,30" className="workflow-arrow" />

      {/* Code window */}
      <g transform="translate(250, 0)">
        <rect
          x="0"
          y="0"
          width="120"
          height="60"
          rx="5"
          fill="var(--device-screen)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <rect
          x="0"
          y="0"
          width="120"
          height="12"
          rx="5"
          fill="var(--icon-box-bg)"
        />
        <line
          x1="10"
          y1="22"
          x2="105"
          y2="22"
          stroke="var(--device-border)"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="32"
          x2="90"
          y2="32"
          stroke="var(--device-border)"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="42"
          x2="80"
          y2="42"
          stroke="var(--device-border)"
          strokeWidth="1.5"
        />
      </g>
    </g>
  );

  // Device grid
  const deviceGrid = (
    <g transform="translate(50, 770)">
      {/* CPU 1 */}
      <g transform="translate(0, 0)">
        <rect
          x="0"
          y="0"
          width="70"
          height="70"
          rx="5"
          fill="var(--device-cpu)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <rect
          x="15"
          y="15"
          width="40"
          height="40"
          fill="var(--device-border)"
          opacity="0.3"
        />
        <text
          x="35"
          y="85"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          CPU
        </text>
      </g>

      {/* GPU */}
      <g transform="translate(110, 0)">
        <rect
          x="0"
          y="0"
          width="70"
          height="70"
          rx="5"
          fill="var(--device-gpu)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <rect
          x="10"
          y="10"
          width="25"
          height="25"
          fill="var(--device-border)"
          opacity="0.3"
        />
        <rect
          x="40"
          y="10"
          width="20"
          height="50"
          fill="var(--device-border)"
          opacity="0.3"
        />
        <text
          x="35"
          y="85"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          GPU
        </text>
      </g>

      {/* Mobile */}
      <g transform="translate(220, 0)">
        <rect
          x="15"
          y="0"
          width="40"
          height="70"
          rx="5"
          fill="var(--device-screen)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <circle cx="35" cy="62" r="3" fill="var(--device-border)" />
        <text
          x="35"
          y="85"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          Mobile
        </text>
      </g>

      {/* CPU 2 */}
      <g transform="translate(0, 110)">
        <rect
          x="0"
          y="0"
          width="70"
          height="70"
          rx="5"
          fill="var(--device-cpu)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <rect
          x="15"
          y="15"
          width="40"
          height="40"
          fill="var(--device-border)"
          opacity="0.3"
        />
        <text
          x="35"
          y="85"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          CPU
        </text>
      </g>

      {/* Tablet */}
      <g transform="translate(110, 110)">
        <rect
          x="5"
          y="0"
          width="60"
          height="70"
          rx="5"
          fill="var(--device-screen)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <circle cx="35" cy="62" r="3" fill="var(--device-border)" />
      </g>

      {/* Web */}
      <g transform="translate(220, 110)">
        <rect
          x="0"
          y="10"
          width="70"
          height="50"
          rx="5"
          fill="var(--device-screen)"
          stroke="var(--device-border)"
          strokeWidth="2.5"
        />
        <rect
          x="0"
          y="10"
          width="70"
          height="12"
          rx="5"
          fill="var(--icon-box-bg)"
        />
        <circle
          cx="35"
          cy="40"
          r="12"
          stroke="var(--device-border)"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="25"
          y1="30"
          x2="45"
          y2="50"
          stroke="var(--device-border)"
          strokeWidth="2"
        />
        <text
          x="35"
          y="85"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="var(--text-color)"
        >
          Web
        </text>
      </g>
    </g>
  );

  // Bottom text section
  const bottomText = textSection(
    [
      { text: "UNIVERSAL & BACKEND-INDEPENDENT:", bold: true, size: 14 },
      { text: "Same .holo file runs on any target with O(1)", size: 13 },
      { text: "performance, complexity is in mathematics,", size: 13 },
      { text: "not hardware.", size: 13 },
    ],
    centerX,
    1020
  );

  // Prevent hydration mismatch from floating-point differences
  if (!mounted) {
    return (
      <svg
        viewBox="0 0 400 1120"
        className="workflow-container"
        style={{ width, height }}
      >
        <rect
          x="0"
          y="0"
          width="400"
          height="1120"
          className="workflow-background"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 1120"
      className="workflow-container"
      style={{ width, height }}
    >
      <rect
        x="0"
        y="0"
        width="400"
        height="1120"
        className="workflow-background"
      />

      {topIcon}
      {drawArrow(centerX, 190, 30)}
      {topText}
      {drawArrow(centerX, 295, 15)}
      {fileIcon}
      {drawArrow(centerX, 460, 50)}
      {hashFlow}
      {middleText}
      {drawArrow(centerX, 705, 55)}
      {deviceGrid}
      {drawArrow(centerX, 985, 25)}
      {bottomText}
    </svg>
  );
}
