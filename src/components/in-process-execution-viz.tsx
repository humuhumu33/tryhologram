"use client";

export function InProcessExecutionViz() {
  return (
    <div className="w-full py-8">
      <div className="relative w-full max-w-5xl mx-auto">
        <svg
          viewBox="0 0 1100 450"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="execution-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#06b6d4" opacity="0.8" />
            </marker>
          </defs>

          {/* Application Process Container - Dominant and Stable */}
          <g id="application-process">
            <rect x="80" y="40" width="600" height="320" rx="4" fill="#111827" stroke="#06b6d4" strokeWidth="3" />
            <text x="380" y="70" textAnchor="middle" fill="#06b6d4" fontSize="20" fontFamily="monospace" fontWeight="700">
              Application Process
            </text>
            <text x="380" y="92" textAnchor="middle" fill="#06b6d4" fontSize="16" fontFamily="monospace" fontWeight="600">
              (single PID)
            </text>
            
            {/* Application Code Box */}
            <g transform="translate(120, 130)">
              <rect x="0" y="0" width="150" height="90" rx="3" fill="#1f2937" stroke="#9ca3af" strokeWidth="1.5" />
              <text x="75" y="32" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace" fontWeight="600">
                Application Code
              </text>
              <text x="75" y="55" textAnchor="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">
                (your business logic)
              </text>
            </g>

            {/* Hologram Runtime Box - De-emphasized */}
            <g transform="translate(120, 240)">
              <rect x="0" y="0" width="150" height="90" rx="3" fill="#1f2937" stroke="#4b5563" strokeWidth="1" strokeDasharray="2,2" />
              <text x="75" y="32" textAnchor="middle" fill="#9ca3af" fontSize="16" fontFamily="monospace" fontWeight="500">
                Hologram Runtime
              </text>
              <text x="75" y="55" textAnchor="middle" fill="#6b7280" fontSize="13" fontFamily="monospace" opacity="0.8">
                (execution engine)
              </text>
            </g>

            {/* Embedded Circuits Box */}
            <g transform="translate(450, 130)">
              <rect x="0" y="0" width="200" height="170" rx="3" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
              <text x="100" y="70" textAnchor="middle" dominantBaseline="middle" fill="#10b981" fontSize="16" fontFamily="monospace" fontWeight="600">
                Embedded Circuits
              </text>
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">
                ISA programs
              </text>
              <text x="100" y="120" textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">
                Class maps
              </text>
              <text x="100" y="140" textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="13" fontFamily="monospace">
                Metadata
              </text>
            </g>

            {/* Single Bold Arrow from Application Code to Embedded Circuits - Middle Aligned */}
            <g transform="translate(290, 200)">
              <line x1="0" y1="0" x2="140" y2="0" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8" markerEnd="url(#execution-arrow)" />
              <text x="70" y="20" textAnchor="middle" fill="#06b6d4" fontSize="13" fontFamily="monospace" fontWeight="600">
                Direct function calls
              </text>
              <text x="70" y="35" textAnchor="middle" fill="#06b6d4" fontSize="13" fontFamily="monospace" fontWeight="600">
                and shared memory access
              </text>
            </g>
          </g>

          {/* External Elements - More Visible, Red Borders */}
          <g id="external-elements" transform="translate(720, 40)">
            <text x="164" y="30" textAnchor="middle" fill="#9ca3af" fontSize="18" fontFamily="monospace" fontWeight="600">
              Not required
            </text>
            
            {/* External Service */}
            <g transform="translate(0, 50)">
              <rect x="0" y="0" width="328" height="45" rx="3" fill="#1f2937" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="164" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace">
                External service
              </text>
            </g>

            {/* Daemon or sidecar */}
            <g transform="translate(0, 110)">
              <rect x="0" y="0" width="328" height="45" rx="3" fill="#1f2937" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="164" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace">
                Daemon or sidecar
              </text>
            </g>

            {/* IPC */}
            <g transform="translate(0, 170)">
              <rect x="0" y="0" width="328" height="45" rx="3" fill="#1f2937" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="164" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace">
                IPC
              </text>
            </g>

            {/* Network hop */}
            <g transform="translate(0, 230)">
              <rect x="0" y="0" width="328" height="45" rx="3" fill="#1f2937" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="164" y="28" textAnchor="middle" fill="#9ca3af" fontSize="15" fontFamily="monospace">
                Network hop
              </text>
            </g>
          </g>

        </svg>
      </div>
    </div>
  );
}







