import "./comparison.css";

interface ComplexityComparisonProps {
  width?: number;
  height?: number;
}

export function ComplexityComparison({
  width = 600,
  height = 1200,
}: ComplexityComparisonProps) {
  // Draw graph with curves
  const graph = (
    <g transform="translate(50, 50)">
      {/* Axes */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="250"
        stroke="var(--graph-axis)"
        strokeWidth="3"
      />
      <line
        x1="0"
        y1="250"
        x2="400"
        y2="250"
        stroke="var(--graph-axis)"
        strokeWidth="3"
      />

      {/* Arrow heads */}
      <polygon points="-5,10 0,0 5,10" fill="var(--graph-axis)" />
      <polygon points="390,245 400,250 390,255" fill="var(--graph-axis)" />

      {/* Traditional O(n²) curve - steeper */}
      <path
        d="M 0 250 Q 100 240 150 180 Q 200 100 250 40"
        stroke="var(--graph-traditional)"
        strokeWidth="4"
        fill="none"
      />
      <text
        x="240"
        y="25"
        fontSize="18"
        fontWeight="bold"
        fill="var(--graph-traditional)"
      >
        O(n²)
      </text>

      {/* Atlas O(n) curve - flatter */}
      <path
        d="M 0 250 Q 100 245 200 220 Q 300 200 350 180"
        stroke="var(--graph-atlas)"
        strokeWidth="4"
        fill="none"
      />
      <text
        x="355"
        y="25"
        fontSize="18"
        fontWeight="bold"
        fill="var(--graph-atlas)"
      >
        O(n)
      </text>

      {/* Traditional label and gears */}
      <text
        x="20"
        y="80"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        TRADITIONAL
      </text>
      <text
        x="20"
        y="100"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        ALGORITHMS
      </text>

      {/* Gears icon */}
      <g transform="translate(80, 140)">
        <circle
          cx="0"
          cy="0"
          r="20"
          fill="var(--gear-teal)"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
        <circle
          cx="0"
          cy="0"
          r="10"
          fill="none"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 15;
          const y = Math.sin(rad) * 15;
          return (
            <circle key={angle} cx={x} cy={y} r="3" fill="var(--gear-teal)" />
          );
        })}

        <circle
          cx="25"
          cy="15"
          r="15"
          fill="var(--gear-orange)"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
        <circle
          cx="25"
          cy="15"
          r="7"
          fill="none"
          stroke="var(--node-border)"
          strokeWidth="2"
        />

        <circle
          cx="-20"
          cy="20"
          r="12"
          fill="var(--gear-dark-teal)"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
        <circle
          cx="-20"
          cy="20"
          r="6"
          fill="none"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
      </g>

      {/* Atlas label and magnifying glass */}
      <text
        x="280"
        y="80"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        ATLAS O(1)
      </text>
      <text
        x="280"
        y="100"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        FRAMEWORK
      </text>

      {/* Magnifying glass with O(1) */}
      <g transform="translate(330, 140)">
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="var(--magnify-glass)"
          stroke="var(--node-border)"
          strokeWidth="3"
        />
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="none"
          stroke="var(--node-border)"
          strokeWidth="2"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="var(--node-border)"
        >
          O(1)
        </text>
        <line
          x1="16"
          y1="16"
          x2="28"
          y2="28"
          stroke="var(--node-border)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* O(1) label at bottom right */}
      <text
        x="350"
        y="270"
        fontSize="16"
        fontWeight="bold"
        fill="var(--graph-atlas)"
      >
        O(1)
      </text>
    </g>
  );

  // Comparison table
  const table = (
    <g transform="translate(20, 350)">
      {/* Headers */}
      <rect
        x="0"
        y="0"
        width="280"
        height="50"
        fill="var(--table-header-orange)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="140"
        y="25"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        OPERATION &
      </text>
      <text
        x="140"
        y="40"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        TRADITIONAL COMPLEXITY
      </text>

      <rect
        x="280"
        y="0"
        width="280"
        height="50"
        fill="var(--table-header-teal)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="420"
        y="25"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        ATLAS
      </text>
      <text
        x="420"
        y="40"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        COMPLEXITY
      </text>

      {/* Row 1: Matrix Multiplication */}
      <rect
        x="0"
        y="50"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="70"
        y="75"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        Matrix
      </text>
      <text
        x="70"
        y="92"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        Multiplication
      </text>

      <rect
        x="140"
        y="50"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="210"
        y="75"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-traditional)"
      >
        O(n²) to O(n³)
      </text>
      <text
        x="210"
        y="92"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (tussles with size)
      </text>

      <rect
        x="280"
        y="50"
        width="280"
        height="60"
        fill="var(--table-header-teal)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="420"
        y="75"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-atlas)"
      >
        O(1)
      </text>
      <text
        x="420"
        y="92"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (Fixed 194x194 lookup)
      </text>

      {/* Row 2: Reductions */}
      <rect
        x="0"
        y="110"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="70"
        y="135"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        Reductions
      </text>
      <text
        x="70"
        y="152"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (sum, max)
      </text>

      <rect
        x="140"
        y="110"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="210"
        y="135"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-traditional)"
      >
        O(n)
      </text>
      <text
        x="210"
        y="152"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        sequential
      </text>

      <rect
        x="280"
        y="110"
        width="280"
        height="60"
        fill="var(--table-header-teal)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="420"
        y="135"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-atlas)"
      >
        O(1) latency
      </text>
      <text
        x="420"
        y="152"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (Parallel channels)
      </text>

      {/* Row 3: Division */}
      <rect
        x="0"
        y="170"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="70"
        y="195"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        Division
      </text>
      <text
        x="70"
        y="212"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (arbitrary precision)
      </text>

      <rect
        x="140"
        y="170"
        width="140"
        height="60"
        fill="var(--table-cell-beige)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="210"
        y="195"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-traditional)"
      >
        O(n)
      </text>
      <text
        x="210"
        y="212"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        iterative
      </text>

      <rect
        x="280"
        y="170"
        width="280"
        height="60"
        fill="var(--table-header-teal)"
        stroke="var(--table-border)"
        strokeWidth="2"
      />
      <text
        x="420"
        y="195"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="var(--graph-atlas)"
      >
        O(1) lookup
      </text>
      <text
        x="420"
        y="212"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        (Unit Group hash)
      </text>
    </g>
  );

  // Neural network diagram
  const neuralNet = (
    <g transform="translate(50, 650)">
      {/* Input layer */}
      <circle
        cx="0"
        cy="0"
        r="8"
        fill="var(--node-orange)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <circle
        cx="0"
        cy="40"
        r="8"
        fill="var(--node-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <circle
        cx="0"
        cy="80"
        r="8"
        fill="var(--node-orange)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />

      {/* Hidden layer 1 */}
      {[0, 30, 60, 90].map((y) => (
        <g key={`h1-${y}`}>
          <circle
            cx="80"
            cy={y}
            r="8"
            fill="var(--node-teal)"
            stroke="var(--node-border)"
            strokeWidth="2"
          />
          {/* Connections from input */}
          {[0, 40, 80].map((inputY) => (
            <line
              key={`conn-${inputY}-${y}`}
              x1="8"
              y1={inputY}
              x2="72"
              y2={y}
              stroke="var(--connection)"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      {/* Hidden layer 2 */}
      {[15, 45, 75].map((y) => (
        <g key={`h2-${y}`}>
          <circle
            cx="160"
            cy={y}
            r="8"
            fill="var(--node-orange)"
            stroke="var(--node-border)"
            strokeWidth="2"
          />
          {/* Connections from hidden 1 */}
          {[0, 30, 60, 90].map((h1Y) => (
            <line
              key={`conn2-${h1Y}-${y}`}
              x1="88"
              y1={h1Y}
              x2="152"
              y2={y}
              stroke="var(--connection)"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      {/* Output layer */}
      <circle
        cx="240"
        cy="30"
        r="8"
        fill="var(--node-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <circle
        cx="240"
        cy="60"
        r="8"
        fill="var(--node-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      {/* Connections to output */}
      {[15, 45, 75].map((h2Y) => (
        <g key={`out-${h2Y}`}>
          <line
            x1="168"
            y1={h2Y}
            x2="232"
            y2="30"
            stroke="var(--connection)"
            strokeWidth="1"
          />
          <line
            x1="168"
            y1={h2Y}
            x2="232"
            y2="60"
            stroke="var(--connection)"
            strokeWidth="1"
          />
        </g>
      ))}

      <text
        x="120"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        LLM INFERENCE
      </text>
      <text
        x="120"
        y="150"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        IN MICROSECONDS
      </text>
      <text
        x="120"
        y="170"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        1000-layer transformer
      </text>
      <text
        x="120"
        y="185"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        executes in ~35ns (1000 x
      </text>
      <text
        x="120"
        y="200"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        36ns), enabling real time
      </text>
      <text
        x="120"
        y="215"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        conversational AI.
      </text>
    </g>
  );

  // Quantum circuit diagram
  const quantumCircuit = (
    <g transform="translate(340, 650)">
      {/* Quantum wires (horizontal lines) */}
      {[0, 30, 60, 90, 120].map((y, i) => (
        <line
          key={`wire-${i}`}
          x1="0"
          y1={y}
          x2="200"
          y2={y}
          stroke="var(--wire)"
          strokeWidth="2"
        />
      ))}

      {/* Gates */}
      <rect
        x="40"
        y="-10"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <rect
        x="40"
        y="50"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <rect
        x="40"
        y="110"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />

      {/* Mid gates */}
      <rect
        x="100"
        y="20"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <rect
        x="100"
        y="80"
        width="25"
        height="20"
        fill="var(--gate-orange)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />

      {/* Control dots and lines */}
      <circle cx="130" cy="30" r="4" fill="var(--node-border)" />
      <line
        x1="130"
        y1="30"
        x2="130"
        y2="60"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <circle
        cx="130"
        cy="60"
        r="8"
        fill="none"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <line
        x1="122"
        y1="60"
        x2="138"
        y2="60"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <line
        x1="130"
        y1="52"
        x2="130"
        y2="68"
        stroke="var(--node-border)"
        strokeWidth="2"
      />

      {/* Right gates */}
      <rect
        x="160"
        y="-10"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />
      <rect
        x="160"
        y="110"
        width="25"
        height="20"
        fill="var(--gate-teal)"
        stroke="var(--node-border)"
        strokeWidth="2"
      />

      <text
        x="100"
        y="160"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        EXACT QUANTUM
      </text>
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className="comparison-text-bold"
      >
        SIMULATION
      </text>
      <text
        x="100"
        y="200"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        Quantum states exactly
      </text>
      <text
        x="100"
        y="215"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        represented in Cliftes space;
      </text>
      <text
        x="100"
        y="230"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        gate operations are O(1)
      </text>
      <text
        x="100"
        y="245"
        textAnchor="middle"
        fontSize="11"
        className="comparison-text"
      >
        group actions, elouv.
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 600 950"
      className="comparison-container"
      style={{ width, height }}
    >
      <rect
        x="0"
        y="0"
        width="600"
        height="950"
        className="comparison-background"
      />

      {graph}
      {table}
      {neuralNet}
      {quantumCircuit}
    </svg>
  );
}
