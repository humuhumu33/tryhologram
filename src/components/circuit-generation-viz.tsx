"use client";

export function CircuitGenerationViz() {
  return (
    <div className="w-full py-8">
      <div className="relative w-full max-w-5xl mx-auto">
        <svg
          viewBox="0 0 1000 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="compile-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6b7280" opacity="0.6" />
            </marker>
            <marker id="runtime-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#10b981" opacity="0.7" />
            </marker>
          </defs>

          {/* Compile-Time: Optimized Operations */}
          <g id="compile-time-operations">
            <text x="200" y="27" textAnchor="middle" fill="#9ca3af" fontSize="18" fontFamily="monospace" fontWeight="600">
              Optimized Operations
            </text>
            
            <g transform="translate(200, 75)">
              <rect x="-60" y="-28" width="120" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="0" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">fused_op1</text>
              
              <rect x="-60" y="35" width="120" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="0" y="68" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">fused_op2</text>
              
              <rect x="-60" y="98" width="120" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="0" y="131" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">fused_op3</text>
            </g>
          </g>

          {/* Arrow: Compile & Fuse */}
          <g transform="translate(260, 110)">
            <line x1="0" y1="0" x2="150" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.6" markerEnd="url(#compile-arrow)" />
            <text x="75" y="-20" textAnchor="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">Compile</text>
            <text x="75" y="-8" textAnchor="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">& Fuse</text>
          </g>

          {/* Compile-Time Boundary: Circuit Generation */}
          <g id="circuit-generation" transform="translate(500, 110)">
            <rect x="-90" y="-55" width="180" height="150" rx="3" fill="#1f2937" stroke="#06b6d4" strokeWidth="2.5" />
            <text x="0" y="-20" textAnchor="middle" fill="#06b6d4" fontSize="16" fontFamily="monospace" fontWeight="600">Circuit</text>
            <text x="0" y="0" textAnchor="middle" fill="#06b6d4" fontSize="16" fontFamily="monospace" fontWeight="600">Generation</text>
            
            {/* Precomputed mappings indicator */}
            <rect x="-80" y="15" width="160" height="50" rx="2" fill="#111827" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" />
            <text x="0" y="30" textAnchor="middle" fill="#6b7280" fontSize="16" fontFamily="monospace">Precomputed</text>
            <text x="0" y="48" textAnchor="middle" fill="#6b7280" fontSize="16" fontFamily="monospace">mappings</text>
          </g>
          
          {/* Finite Torus text - just below Precomputed mappings box */}
          <text x="500" y="200" textAnchor="middle" fill="#6b7280" fontSize="16" fontFamily="monospace">Finite Torus</text>

          {/* Arrow: Freeze Topology */}
          <g transform="translate(590, 110)">
            <line x1="0" y1="0" x2="110" y2="0" stroke="#10b981" strokeWidth="1.5" opacity="0.7" markerEnd="url(#runtime-arrow)" />
            <text x="55" y="-20" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Freeze</text>
            <text x="55" y="-8" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Topology</text>
          </g>

          {/* Runtime: Software-Defined Circuit */}
          <g id="runtime-circuit">
            <text x="800" y="22" textAnchor="middle" fill="#9ca3af" fontSize="18" fontFamily="monospace" fontWeight="600">
              Software-Defined Circuit
            </text>
            
            <g transform="translate(800, 65)">
              {/* Circuit structure */}
              <rect x="-120" y="-28" width="240" height="140" rx="2" fill="#111827" stroke="#10b981" strokeWidth="2.5" />
              <text x="0" y="-5" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">Fixed Topology</text>
              <text x="0" y="15" textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="14" fontFamily="monospace">O(1) Deterministic Execution</text>
              
              {/* Class maps - well aligned and sized */}
              <rect x="-95" y="40" width="60" height="55" rx="2" fill="#111827" stroke="#10b981" strokeWidth="1.5" />
              <text x="-65" y="58" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Class</text>
              <text x="-65" y="75" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Map (96)</text>
              
              <rect x="-25" y="40" width="60" height="55" rx="2" fill="#111827" stroke="#10b981" strokeWidth="1.5" />
              <text x="5" y="58" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">ISA</text>
              <text x="5" y="75" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Program</text>
              
              <rect x="45" y="40" width="60" height="55" rx="2" fill="#111827" stroke="#10b981" strokeWidth="1.5" />
              <text x="75" y="67.5" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="13" fontFamily="monospace">Metadata</text>
              
              {/* No branching indicator */}
              <text x="0" y="135" textAnchor="middle" fill="#6b7280" fontSize="14" fontFamily="monospace" fontStyle="italic">
                No branching • No runtime decisions
              </text>
            </g>
          </g>

          {/* Characteristics list with tick marks */}
          <g id="characteristics" transform="translate(500, 270)">
            {/* Tick mark and General-purpose */}
            <g transform="translate(-280, 0)">
              <path d="M -12 5 L -8 10 L 1 0" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="8" y="5" textAnchor="start" fill="#9ca3af" fontSize="16" fontFamily="monospace" dominantBaseline="middle">General-purpose</text>
            </g>
            
            {/* Tick mark and Lossless encoding */}
            <g transform="translate(-30, 0)">
              <path d="M -12 5 L -8 10 L 1 0" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="8" y="5" textAnchor="start" fill="#9ca3af" fontSize="16" fontFamily="monospace" dominantBaseline="middle">Lossless encoding</text>
            </g>
            
            {/* Tick mark and Software-defined */}
            <g transform="translate(220, 0)">
              <path d="M -12 5 L -8 10 L 1 0" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="8" y="5" textAnchor="start" fill="#9ca3af" fontSize="16" fontFamily="monospace" dominantBaseline="middle">Software-defined</text>
            </g>
          </g>

        </svg>
      </div>
    </div>
  );
}











