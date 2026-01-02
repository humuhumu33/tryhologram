"use client";

import { Brain, Eye, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNanoseconds, TECHNICAL_COMPARISONS } from "@/lib/benchmark-utils";
import "./speed-comparison.css";

interface SpeedComparisonProps {
  /** Canonicalization time in nanoseconds - the O(1) lookup operation */
  canonicalizeNs: number;
  className?: string;
}

const ICON_MAP = {
  Brain: Brain,
  Eye: Eye,
  Heart: Heart,
  Zap: Zap,
};

interface RelatableComparison {
  icon: keyof typeof ICON_MAP;
  stat: string;
  label: string;
  description: string;
}

export function SpeedComparison({
  canonicalizeNs,
  className = "",
}: SpeedComparisonProps) {
  // Calculate dynamic relatable comparisons based on canonicalization time
  const blinkMs = 300;
  const thoughtMs = 13;
  const heartbeatMs = 50;
  const lightSpeedMperNs = 0.3;

  const relatableComparisons: RelatableComparison[] = [
    {
      icon: "Brain",
      stat: `${Math.round((thoughtMs * 1_000_000) / canonicalizeNs).toLocaleString()}×`,
      label: "Faster Than Thought",
      description: `Human neural processing: ~${thoughtMs}ms. Hologram O(1) lookup: ~${formatNanoseconds(canonicalizeNs)}.`,
    },
    {
      icon: "Eye",
      stat: `${Math.round((blinkMs * 1_000_000) / canonicalizeNs).toLocaleString()}×`,
      label: "Lookups Per Blink",
      description: `One blink (${blinkMs}ms) = ${Math.round((blinkMs * 1_000_000) / canonicalizeNs).toLocaleString()} Hologram lookups.`,
    },
    {
      icon: "Heart",
      stat: `${Math.round((heartbeatMs * 1_000_000) / canonicalizeNs).toLocaleString()}+`,
      label: "Per Heartbeat",
      description: `Hologram lookups possible in a single ${heartbeatMs}ms heartbeat interval.`,
    },
    {
      icon: "Zap",
      stat: `${(canonicalizeNs * lightSpeedMperNs).toFixed(0)}m`,
      label: "Light Distance",
      description: `Light travels ${(canonicalizeNs * lightSpeedMperNs).toFixed(0)}m during one Hologram lookup.`,
    },
  ];

  // Build comparison data showing Hologram O(1) vs traditional O(n²)/O(n³) approaches
  // Hologram's 96-class geometric system provides constant-time canonicalization
  // Traditional approaches scale with n² or n³ where n = number of elements
  // Assuming ~10ns per basic operation for traditional approaches
  const baseOpNs = 10;
  const technicalData = [
    { name: "Hologram", time_ns: canonicalizeNs, isHologram: true, description: "O(1) lookup via 96-class geometric system" },
    { name: "O(n²) n=10", time_ns: 100 * baseOpNs, isHologram: false, description: "Traditional matrix ops, 10 elements" },
    { name: "O(n²) n=100", time_ns: 10_000 * baseOpNs, isHologram: false, description: "Traditional matrix ops, 100 elements" },
    { name: "O(n²) n=1000", time_ns: 1_000_000 * baseOpNs, isHologram: false, description: "Traditional matrix ops, 1000 elements" },
    { name: "O(n³) n=100", time_ns: 1_000_000 * baseOpNs, isHologram: false, description: "Traditional 3D ops, 100 elements" },
  ].sort((a, b) => a.time_ns - b.time_ns);

  // Calculate log scale positions (for visualization)
  const minLog = Math.log10(1); // 1ns
  const maxLog = Math.log10(100_000_000); // 100ms
  const getPosition = (ns: number) => {
    const log = Math.log10(Math.max(ns, 1));
    return ((log - minLog) / (maxLog - minLog)) * 100;
  };

  return (
    <div className={`speed-comparison ${className}`}>
      {/* Relatable comparisons - cards */}
      <div className="comparison-cards">
        {relatableComparisons.map((item) => {
          const IconComponent = ICON_MAP[item.icon];
          return (
            <Card key={item.label} className="comparison-card">
              <CardContent className="comparison-card-content">
                <div className="comparison-icon-wrapper">
                  <IconComponent className="comparison-icon" />
                </div>
                <div className="comparison-stat">{item.stat}</div>
                <div className="comparison-label">{item.label}</div>
                <p className="comparison-description">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Technical scale visualization */}
      <div className="technical-scale">
        <h4 className="technical-title">Algorithmic Advantage</h4>
        <p className="technical-subtitle">
          Hologram O(1) lookup vs traditional O(n²)/O(n³) approaches (logarithmic scale)
        </p>

        <div className="scale-container">
          {/* Scale track */}
          <div className="scale-track">
            {/* Data points */}
            {technicalData.map((item, index) => (
              <div
                key={item.name}
                className={`scale-point ${item.isHologram ? "scale-point-hologram" : ""}`}
                style={{ left: `${getPosition(item.time_ns)}%` }}
              >
                <div className="scale-marker" />
              </div>
            ))}
          </div>

          {/* Legend below */}
          <div className="scale-legend">
            {technicalData.map((item) => (
              <div
                key={item.name}
                className={`legend-item ${item.isHologram ? "legend-item-hologram" : ""}`}
                title={item.description}
              >
                <span className="legend-dot" />
                <span className="legend-name">{item.name}</span>
                <span className="legend-time">{formatNanoseconds(item.time_ns)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
