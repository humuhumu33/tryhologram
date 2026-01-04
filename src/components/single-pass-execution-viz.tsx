"use client";

import { ArrowDown, X, Check } from "lucide-react";

export function SinglePassExecutionViz() {
  return (
    <div className="w-full space-y-8" aria-label="Single-Pass Execution vs Traditional Multi-Pass comparison">
      {/* Two Column Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Vertical divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2" />
        
        {/* Left Card: Traditional Multi-Pass */}
        <div className="bg-muted/20 border border-border/30 rounded-lg p-6 space-y-8 relative backdrop-blur-[0.5px] opacity-90">
          <h5 className="text-base font-semibold text-white text-center">Traditional Multi-Pass Execution</h5>
          
          {/* Pipeline Diagram */}
          <div className="flex flex-col items-center space-y-2 min-h-[280px] justify-center" aria-label="Traditional multi-pass execution pipeline">
            <div className="w-full max-w-xs">
              {/* Input */}
              <div className="bg-surface-dark/40 border border-border/20 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Input</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Ops 1 (tanh) */}
              <div className="bg-surface-dark/40 border border-border/20 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Ops 1 (tanh)</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Intermediate Buffer */}
              <div className="bg-muted/40 border border-dashed border-border/30 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Intermediate Buffer (DRAM)</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Ops 2 (relu) */}
              <div className="bg-surface-dark/40 border border-border/20 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Ops 2 (relu)</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Intermediate Buffer */}
              <div className="bg-muted/40 border border-dashed border-border/30 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Intermediate Buffer (DRAM)</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Ops 3 (sigmoid) */}
              <div className="bg-surface-dark/40 border border-border/20 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Ops 3 (sigmoid)</span>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
              
              {/* Output */}
              <div className="bg-surface-dark/40 border border-border/20 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-white">Output</span>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center justify-center gap-2">
              <X className="w-4 h-4 text-muted-foreground/60" />
              <span>Multiple passes over data</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <X className="w-4 h-4 text-muted-foreground/60" />
              <span>Intermediate buffers in DRAM</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <X className="w-4 h-4 text-muted-foreground/60" />
              <span>Repeated memory reads and writes</span>
            </div>
          </div>

          {/* Cost Model */}
          <div className="pt-4 border-t border-border/20">
            <p className="text-sm text-white font-medium text-center">
              Cost: O(n) passes
            </p>
          </div>
        </div>

        {/* Right Card: Hologram Single-Pass */}
        <div className="bg-surface-dark/50 border-2 border-cyan/50 rounded-lg p-6 space-y-8 relative shadow-lg shadow-cyan/10">
          <h5 className="text-base font-semibold text-cyan text-center">Hologram Single-Pass Execution</h5>
          
          {/* Simplified Diagram - Aligned to same height */}
          <div className="flex flex-col items-center space-y-3 min-h-[280px] justify-center" aria-label="Hologram single-pass execution">
            <div className="w-full max-w-xs">
              {/* Input */}
              <div className="bg-surface-dark/60 border-2 border-cyan/40 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-cyan">Input</span>
              </div>
              
              <div className="flex justify-center my-3">
                <ArrowDown className="w-5 h-5 text-cyan" strokeWidth={2.5} />
              </div>
              
              {/* Precompiled Fused Circuit Block */}
              <div className="bg-cyan/20 border-2 border-cyan/60 rounded-lg px-4 py-4 text-center">
                <span className="text-xs font-semibold text-cyan">
                  Precompiled Fused Circuit
                </span>
                <div className="text-xs text-cyan/80 mt-2">
                  Single hash table lookup
                </div>
                <div className="text-xs text-cyan/70 mt-1">
                  Compiled once
                </div>
              </div>
              
              <div className="flex justify-center my-3">
                <ArrowDown className="w-5 h-5 text-cyan" strokeWidth={2.5} />
              </div>
              
              {/* Output */}
              <div className="bg-surface-dark/60 border-2 border-cyan/40 rounded-md px-3 py-2.5 text-center">
                <span className="text-xs font-medium text-cyan">Output</span>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-cyan" />
              <span>Single pass through data</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-cyan" />
              <span>No intermediate buffers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-cyan" />
              <span>Constant-time per element</span>
            </div>
          </div>

          {/* Cost Model */}
          <div className="pt-4 border-t border-cyan/30">
            <p className="text-sm text-cyan font-semibold text-center">
              Cost: O(1) per element
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}











