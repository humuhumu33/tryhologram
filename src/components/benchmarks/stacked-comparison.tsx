"use client";

import { useEffect, useState, useRef } from "react";
import { formatNanosecondsCompact } from "@/lib/benchmark-utils";

interface StackedComparisonProps {
  value: number;
  label: string;
  description?: string;
  className?: string;
}

export function StackedComparison({
  value,
  label,
  description,
  className = "",
}: StackedComparisonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const formatted = formatNanosecondsCompact(value);

  // Comparison references - holographic theme
  const comparisons = [
    { label: "1 millisecond", ns: 1_000_000, color: "bg-purple/70" },
    { label: "100 microseconds", ns: 100_000, color: "bg-purple/60" },
    { label: "10 microseconds", ns: 10_000, color: "bg-cyan/70" },
    { label: "1 microsecond", ns: 1_000, color: "bg-cyan/80" },
  ];

  // Our value
  const ourBar = {
    label: `${label} (${formatted.value}${formatted.unit})`,
    ns: value,
    color: "bg-gradient-to-r from-cyan to-purple",
  };

  // Find max for scaling (use 1ms as reference)
  const maxNs = 1_000_000;

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-purple/20 bg-card/80 p-6 backdrop-blur-sm transition-all hover:border-purple/40 hover:shadow-lg hover:shadow-purple/10 ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold text-lg">{label}</h3>
          <div>
            <span className="text-3xl font-bold text-foreground">{formatted.value}</span>
            <span className="text-lg text-muted-foreground ml-1">{formatted.unit}</span>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Stacked bars */}
      <div className="space-y-3">
        {/* Our value - highlighted */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-32 text-sm font-medium text-cyan truncate">
              Your benchmark
            </div>
            <div className="flex-1 h-8 bg-muted/30 rounded overflow-hidden">
              <div
                className={`h-full ${ourBar.color} rounded transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                style={{
                  width: isVisible ? `${Math.max((value / maxNs) * 100, 2)}%` : "0%",
                }}
              >
                <span className="text-xs font-semibold text-white drop-shadow">
                  {formatted.value}{formatted.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-muted/30 my-2" />

        {/* Reference bars */}
        {comparisons.map((comp, i) => {
          const widthPercent = (comp.ns / maxNs) * 100;
          const multiplier = Math.round(comp.ns / value);

          return (
            <div key={comp.label} className="relative">
              <div className="flex items-center gap-3">
                <div className="w-32 text-sm text-muted-foreground truncate">
                  {comp.label}
                </div>
                <div className="flex-1 h-6 bg-muted/30 rounded overflow-hidden">
                  <div
                    className={`h-full ${comp.color} rounded transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? `${widthPercent}%` : "0%",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <div className="w-20 text-right text-xs text-muted-foreground">
                  {multiplier > 1 && (
                    <span className="text-cyan font-medium">{multiplier}x slower</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
