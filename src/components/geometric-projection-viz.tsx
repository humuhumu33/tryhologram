"use client";

export function GeometricProjectionViz() {
  return (
    <div className="w-full py-8">
      <div className="relative w-full max-w-5xl mx-auto">
        <svg
          viewBox="0 0 1000 340"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="4" orient="auto">
              <polygon points="0 0, 10 4, 0 8" fill="#6b7280" opacity="0.6" />
            </marker>
          </defs>

          {/* Operations (Left Side) - Simple boxes */}
          <g id="operations">
            {/* Compute Operations label - centered above column, with proper spacing */}
            <text x="150" y="10" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace" fontWeight="600">
              Compute Operations
            </text>
            <text x="150" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace" fontWeight="600">
              (256 binary values)
            </text>
            
            <g transform="translate(150, 70)">
              <rect x="-45" y="-25" width="90" height="50" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              <text x="0" y="8" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontFamily="monospace" fontWeight="600">add()</text>
            </g>

            <g transform="translate(150, 140)">
              <rect x="-45" y="-25" width="90" height="50" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              <text x="0" y="8" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontFamily="monospace" fontWeight="600">mul()</text>
            </g>

            <g transform="translate(150, 210)">
              <rect x="-45" y="-25" width="90" height="50" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              <text x="0" y="8" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontFamily="monospace" fontWeight="600">sigmoid()</text>
            </g>

            <g transform="translate(150, 280)">
              <rect x="-45" y="-25" width="90" height="50" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              <text x="0" y="8" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontFamily="monospace" fontWeight="600">relu()</text>
            </g>
          </g>

          {/* Torus Structure (Center) - Image */}
          <g id="geometric-space" transform="translate(500, 190)">
            {/* Geometric compute space label above torus */}
            <text x="0" y="-125" textAnchor="middle" fill="#9ca3af" fontSize="17" fontFamily="monospace" fontWeight="600">
              Geometric compute space
            </text>
            <text x="0" y="-105" textAnchor="middle" fill="#9ca3af" fontSize="17" fontFamily="monospace" fontWeight="600">
              (finite torus representation)
            </text>
            
            <foreignObject x="-150" y="-100" width="300" height="200">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src="/torus-wireframe.png" 
                  alt="Torus wireframe"
                  className="w-full h-full object-contain"
                />
              </div>
            </foreignObject>
            
            {/* Label with proper spacing - linked to Theory page */}
            <a href="/research">
              <text x="0" y="120" textAnchor="middle" fill="#06b6d4" fontSize="18" fontFamily="monospace" fontWeight="600" style={{ cursor: 'pointer' }}>
                Atlas Framework
              </text>
              {/* Underline for link */}
              <line x1="-70" y1="125" x2="70" y2="125" stroke="#06b6d4" strokeWidth="2" />
            </a>
          </g>

          {/* Arrow 1: Before Torus - Operations to Torus */}
          <g id="arrow-before-torus">
            <line x1="240" y1="190" x2="350" y2="190" stroke="#6b7280" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" markerEnd="url(#arrowhead)" />
            <text x="295" y="155" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontFamily="monospace" fontWeight="600">Byte-level</text>
            <text x="295" y="170" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontFamily="monospace" fontWeight="600">bijective mapping</text>
          </g>

          {/* Arrow 2: After Torus - Torus to Class Maps */}
          <g id="arrow-after-torus">
            <line x1="650" y1="190" x2="760" y2="190" stroke="#6b7280" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" markerEnd="url(#arrowhead)" />
            <text x="705" y="155" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontFamily="monospace" fontWeight="600">Hash table</text>
            <text x="705" y="170" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontFamily="monospace" fontWeight="600">O(1) lookup</text>
          </g>

          {/* Class Maps (Right Side) - Simple data structures */}
          <g id="class-maps">
            {/* Class Maps label - centered above column */}
            <text x="850" y="10" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace" fontWeight="600">
              Class Maps
            </text>
            <text x="850" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace" fontWeight="600">
              (96 bytes each)
            </text>
            
            <g transform="translate(850, 70)">
              <rect x="-50" y="-30" width="100" height="60" rx="2" fill="#111827" stroke="#06b6d4" strokeWidth="2" />
              {/* Simplified grid */}
              <g transform="translate(-35, -15)">
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={`row-${i}`}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <rect
                        key={`${i}-${j}`}
                        x={i * 8}
                        y={j * 8}
                        width="6"
                        height="6"
                        fill={i === 0 && j === 0 ? "#06b6d4" : "#374151"}
                        stroke="#1f2937"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                ))}
              </g>
            </g>

            <g transform="translate(850, 140)">
              <rect x="-50" y="-30" width="100" height="60" rx="2" fill="#111827" stroke="#10b981" strokeWidth="2" />
              <g transform="translate(-35, -15)">
                {Array.from({ length: 8 }).map((_, i) =>
                  Array.from({ length: 4 }).map((_, j) => (
                    <rect
                      key={`${i}-${j}`}
                      x={i * 8}
                      y={j * 8}
                      width="6"
                      height="6"
                      fill={i === 1 && j === 1 ? "#10b981" : "#374151"}
                      stroke="#1f2937"
                      strokeWidth="0.5"
                    />
                  ))
                )}
              </g>
            </g>

            <g transform="translate(850, 210)">
              <rect x="-50" y="-30" width="100" height="60" rx="2" fill="#111827" stroke="#f59e0b" strokeWidth="2" />
              <g transform="translate(-35, -15)">
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={`row-${i}`}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <rect
                        key={`${i}-${j}`}
                        x={i * 8}
                        y={j * 8}
                        width="6"
                        height="6"
                        fill={i === 2 && j === 2 ? "#f59e0b" : "#374151"}
                        stroke="#1f2937"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                ))}
              </g>
            </g>

            <g transform="translate(850, 280)">
              <rect x="-50" y="-30" width="100" height="60" rx="2" fill="#111827" stroke="#8b5cf6" strokeWidth="2" />
              <g transform="translate(-35, -15)">
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={`row-${i}`}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <rect
                        key={`${i}-${j}`}
                        x={i * 8}
                        y={j * 8}
                        width="6"
                        height="6"
                        fill={i === 3 && j === 3 ? "#8b5cf6" : "#374151"}
                        stroke="#1f2937"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                ))}
              </g>
            </g>
          </g>

        </svg>
      </div>
    </div>
  );
}







