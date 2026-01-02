"use client";

import { useEffect, useState, useRef } from "react";
import { formatNanosecondsCompact } from "@/lib/benchmark-utils";

interface TimelineScaleProps {
  value: number;
  label: string;
  description?: string;
  className?: string;
}

export function TimelineScale({
  value,
  label,
  description,
  className = "",
}: TimelineScaleProps) {
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

  // Calculate operations per second (1 second = 1 billion nanoseconds)
  const opsPerSecond = Math.round(1_000_000_000 / value);

  // Format ops/second nicely
  const formatOpsPerSecond = (ops: number) => {
    if (ops >= 1_000_000_000) {
      return { value: (ops / 1_000_000_000).toFixed(1), unit: "B", fullUnit: "billion ops/sec" };
    } else if (ops >= 1_000_000) {
      return { value: (ops / 1_000_000).toFixed(1), unit: "M", fullUnit: "million ops/sec" };
    } else if (ops >= 1_000) {
      return { value: (ops / 1_000).toFixed(1), unit: "K", fullUnit: "thousand ops/sec" };
    }
    return { value: ops.toString(), unit: "", fullUnit: "ops/sec" };
  };

  const opsFormatted = formatOpsPerSecond(opsPerSecond);

  // Throughput scale (log scale from 1K to 1B ops/sec)
  const minOps = 1_000;
  const maxOps = 1_000_000_000;
  const logMin = Math.log10(minOps);
  const logMax = Math.log10(maxOps);
  const logValue = Math.log10(Math.max(opsPerSecond, minOps));
  const valuePercent = Math.min(((logValue - logMin) / (logMax - logMin)) * 100, 100);

  // Throughput ticks
  const ticks = [
    { ops: 1_000, label: "1K" },
    { ops: 10_000, label: "10K" },
    { ops: 100_000, label: "100K" },
    { ops: 1_000_000, label: "1M" },
    { ops: 10_000_000, label: "10M" },
    { ops: 100_000_000, label: "100M" },
    { ops: 1_000_000_000, label: "1B" },
  ];

  // Throughput zones (higher is better, so reverse the colors)
  const zones = [
    { start: 0, end: 33, label: "Standard", color: "from-orange-500/20 to-orange-500/5" },
    { start: 33, end: 66, label: "High", color: "from-purple/20 to-purple/5" },
    { start: 66, end: 100, label: "Ultra High", color: "from-cyan/20 to-cyan/5" },
  ];

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-purple/20 bg-card/80 p-6 backdrop-blur-sm transition-all hover:border-purple/40 hover:shadow-lg hover:shadow-purple/10 ${className}`}
    >
      {/* Header - Throughput as hero metric */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg">{label}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-foreground">{opsFormatted.value}{opsFormatted.unit}</span>
          <span className="text-sm text-muted-foreground ml-1">ops/sec</span>
        </div>
      </div>

      {/* Throughput Scale */}
      <div className="relative">
        {/* Zone backgrounds */}
        <div className="absolute inset-x-0 top-0 h-16 flex rounded-lg overflow-hidden">
          {zones.map((zone) => (
            <div
              key={zone.label}
              className={`bg-gradient-to-b ${zone.color}`}
              style={{ width: `${zone.end - zone.start}%` }}
            />
          ))}
        </div>

        {/* Scale track */}
        <div className="relative h-16 mb-2">
          {/* Main line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/50 rounded-full" />

          {/* Tick marks */}
          {ticks.map((tick) => {
            const logTick = Math.log10(tick.ops);
            const tickPercent = ((logTick - logMin) / (logMax - logMin)) * 100;
            return (
              <div
                key={tick.label}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${tickPercent}%` }}
              >
                <div className="w-px h-4 bg-muted-foreground/40 -translate-x-1/2" />
              </div>
            );
          })}

          {/* Value indicator */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: `${isVisible ? valuePercent : 0}%` }}
          >
            {/* Pulse ring */}
            <div className="absolute -inset-3 bg-cyan/20 rounded-full animate-ping" />
            {/* Main dot */}
            <div className="relative w-5 h-5 bg-cyan rounded-full -translate-x-1/2 shadow-lg shadow-cyan/50 border-2 border-white/20" />
            {/* Label above */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="px-2 py-1 bg-cyan text-cyan-foreground text-xs font-semibold rounded shadow-lg">
                {opsFormatted.value}{opsFormatted.unit}
              </div>
            </div>
          </div>
        </div>

        {/* Tick labels */}
        <div className="relative h-6">
          {ticks.map((tick) => {
            const logTick = Math.log10(tick.ops);
            const tickPercent = ((logTick - logMin) / (logMax - logMin)) * 100;
            return (
              <div
                key={tick.label}
                className="absolute text-xs text-muted-foreground -translate-x-1/2"
                style={{ left: `${tickPercent}%` }}
              >
                {tick.label}
              </div>
            );
          })}
        </div>

        {/* Zone labels */}
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-purple font-medium">Lower throughput</span>
          <span className="text-cyan font-medium">Higher throughput →</span>
        </div>
      </div>

      {/* Execution time context (secondary) */}
      <div className="mt-4 pt-4 border-t border-muted/30 text-center">
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-purple">{formatted.value}{formatted.unit}</span>
          <span className="ml-1">average execution time</span>
        </div>
      </div>
    </div>
  );
}
