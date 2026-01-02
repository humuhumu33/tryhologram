"use client";

import { useEffect, useState, useRef } from "react";
import { formatNanosecondsCompact } from "@/lib/benchmark-utils";
import { Zap } from "lucide-react";

interface SpeedStatCardProps {
  value: number;
  label: string;
  description?: string;
  className?: string;
}

export function SpeedStatCard({
  value,
  label,
  description,
  className = "",
}: SpeedStatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const formatted = formatNanosecondsCompact(value);

  // Calculate speed multiplier vs 1ms (1,000,000 ns)
  const speedMultiplier = Math.round(1_000_000 / value);
  const speedMultiplierFormatted = speedMultiplier >= 1000
    ? `${(speedMultiplier / 1000).toFixed(0)}K`
    : speedMultiplier.toLocaleString();

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-purple/20 bg-card/80 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple/40 hover:shadow-lg hover:shadow-purple/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5" />

      <div className="relative">
        {/* Main value */}
        <div className="text-center mb-4">
          <div className="text-5xl font-bold tracking-tight">
            <span className="holographic-text">{formatted.value}</span>
            <span className="text-2xl text-muted-foreground ml-1">{formatted.unit}</span>
          </div>
        </div>

        {/* Speed multiplier badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20">
            <Zap className="w-4 h-4 text-cyan" />
            <span className="text-sm font-semibold text-cyan">
              {speedMultiplierFormatted}x faster than 1ms
            </span>
          </div>
        </div>

        {/* Label and description */}
        <div className="text-center">
          <h3 className="font-semibold text-lg">{label}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
