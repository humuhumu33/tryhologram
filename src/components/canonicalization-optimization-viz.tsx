"use client";

export function CanonicalizationOptimizationViz() {
  return (
    <div className="w-full py-8">
      <div className="relative w-full max-w-5xl mx-auto">
        <svg
          viewBox="0 0 1000 475"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="opt-arrowhead-down" markerWidth="10" markerHeight="10" refX="5" refY="8" orient="auto">
              <polygon points="0 0, 10 8, 0 10" fill="#6b7280" opacity="0.5" />
            </marker>
          </defs>

          {/* Before Optimization - Top, Centered */}
          <g id="before-optimization">
            <text x="500" y="20" textAnchor="middle" fill="#9ca3af" fontSize="18" fontFamily="monospace" fontWeight="600">
              Before Optimization
            </text>
            <text x="500" y="43" textAnchor="middle" fill="#ef4444" fontSize="16" fontFamily="monospace">
              12 operations
            </text>

            {/* Operations chain - showing redundancy, centered */}
            <g transform="translate(500, 85)">
              {/* Row 1: Operations 1-6 */}
              <rect x="-280" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="-242.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">add()</text>
              <line x1="-200" y1="0" x2="-175" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              {/* Redundant operation */}
              <rect x="-170" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
              <text x="-132.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">+0</text>
              <line x1="-90" y1="0" x2="-65" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="-60" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="-22.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">mul()</text>
              <line x1="20" y1="0" x2="45" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              {/* Redundant operation */}
              <rect x="50" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
              <text x="87.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">*1</text>
              <line x1="130" y1="0" x2="155" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="160" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="197.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">tanh()</text>
              <line x1="240" y1="0" x2="265" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="270" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="307.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">relu()</text>
            </g>

            {/* Row 2: Operations 7-12 */}
            <g transform="translate(500, 165)">
              <rect x="-280" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="-242.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">sigmoid()</text>
              <line x1="-200" y1="0" x2="-175" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="-170" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="-132.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">norm()</text>
              <line x1="-90" y1="0" x2="-65" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="-60" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="-22.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">scale()</text>
              <line x1="20" y1="0" x2="45" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="50" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="87.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">add()</text>
              <line x1="130" y1="0" x2="155" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="160" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="197.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">mul()</text>
              <line x1="240" y1="0" x2="265" y2="0" stroke="#6b7280" strokeWidth="1.5" opacity="0.4" />
              
              <rect x="270" y="-28" width="75" height="56" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
              <text x="307.5" y="5" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace">relu()</text>
            </g>
          </g>

          {/* After Optimization - Below Before, Centered */}
          <g id="after-optimization">
            <text x="500" y="265" textAnchor="middle" fill="#9ca3af" fontSize="18" fontFamily="monospace" fontWeight="600">
              After Optimization
            </text>
            <text x="500" y="290" textAnchor="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">
              3 operations
            </text>

            {/* Optimized operations - fused and in a row, centered */}
            <g transform="translate(500, 335)">
              {/* Fused operation 1 */}
              <rect x="-290" y="-30" width="200" height="60" rx="2" fill="#111827" stroke="#10b981" strokeWidth="2.5" />
              <text x="-190" y="0" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">tanh + relu + sigmoid</text>
              
              <line x1="-85" y1="0" x2="-60" y2="0" stroke="#10b981" strokeWidth="2.5" opacity="0.6" />
              
              {/* Fused operation 2 */}
              <rect x="-50" y="-30" width="160" height="60" rx="2" fill="#111827" stroke="#10b981" strokeWidth="2.5" />
              <text x="30" y="0" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">norm + scale</text>
              
              <line x1="115" y1="0" x2="140" y2="0" stroke="#10b981" strokeWidth="2.5" opacity="0.6" />
              
              {/* Fused operation 3 */}
              <rect x="145" y="-30" width="200" height="60" rx="2" fill="#111827" stroke="#10b981" strokeWidth="2.5" />
              <text x="245" y="0" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">add + mul + relu</text>
            </g>
            
            {/* (fused) label - centered below operations, aligned with top graphic */}
            <text x="500" y="395" textAnchor="middle" fill="#6b7280" fontSize="14" fontFamily="monospace">(fused)</text>
          </g>

          {/* 75% Reduction Metric - Bottom Center */}
          <g id="reduction-metric" transform="translate(500, 445)">
            <text x="0" y="0" textAnchor="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">
              75% Reduction
            </text>
            <text x="0" y="25" textAnchor="middle" fill="#6b7280" fontSize="16" fontFamily="monospace">
              12 → 3 operations
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}












