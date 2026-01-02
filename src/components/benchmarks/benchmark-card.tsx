"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Layers, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessedBenchmark, formatNanoseconds, formatThroughput } from "@/lib/benchmark-utils";
import "./benchmark-card.css";

interface BenchmarkCardProps {
  benchmark: ProcessedBenchmark;
  className?: string;
}

export function BenchmarkCard({ benchmark, className = "" }: BenchmarkCardProps) {
  const [expanded, setExpanded] = useState(false);

  const ciRange =
    benchmark.confidence_interval.upper_ns - benchmark.confidence_interval.lower_ns;
  const ciPercent = ((ciRange / benchmark.mean_ns) * 100).toFixed(1);

  const hasThroughput = benchmark.throughput && (benchmark.throughput.Elements || benchmark.throughput.Bytes);

  return (
    <Card
      className={`benchmark-card ${expanded ? "benchmark-card-expanded" : ""} ${className}`}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="benchmark-card-content">
        {/* Header - always visible */}
        <div className="benchmark-header">
          <div className="benchmark-info">
            <span className="benchmark-name">{benchmark.displayName}</span>
            <span className="benchmark-category">{benchmark.category}</span>
          </div>
          <div className="benchmark-main-value">
            <div className="flex items-baseline gap-1">
              <span className="benchmark-time">
                {formatNanoseconds(benchmark.mean_ns).split(' ')[0]}
              </span>
              <span className="benchmark-time-unit">
                {formatNanoseconds(benchmark.mean_ns).split(' ').slice(1).join(' ')}
              </span>
            </div>
            <span className="benchmark-expand-icon">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>
        </div>

        {/* Throughput badge - visible when present */}
        {hasThroughput && (
          <div className="benchmark-throughput-badge">
            {benchmark.throughput?.Elements && (
              <span className="throughput-item">
                <Layers size={12} />
                {formatThroughput(benchmark.throughput.Elements, "elements")}
              </span>
            )}
            {benchmark.throughput?.Bytes && (
              <span className="throughput-item">
                <Database size={12} />
                {formatThroughput(benchmark.throughput.Bytes, "bytes")}
              </span>
            )}
          </div>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="benchmark-details">
            <div className="benchmark-stats">
              <div className="benchmark-stat">
                <span className="stat-label">Mean</span>
                <div className="stat-value-wrapper">
                  <span className="stat-value-number">
                    {formatNanoseconds(benchmark.mean_ns).split(' ')[0]}
                  </span>
                  <span className="stat-value-unit">
                    {formatNanoseconds(benchmark.mean_ns).split(' ').slice(1).join(' ')}
                  </span>
                </div>
              </div>
              <div className="benchmark-stat">
                <span className="stat-label">Median</span>
                <div className="stat-value-wrapper">
                  <span className="stat-value-number">
                    {formatNanoseconds(benchmark.median_ns).split(' ')[0]}
                  </span>
                  <span className="stat-value-unit">
                    {formatNanoseconds(benchmark.median_ns).split(' ').slice(1).join(' ')}
                  </span>
                </div>
              </div>
              <div className="benchmark-stat">
                <span className="stat-label">Std Dev</span>
                <div className="stat-value-wrapper">
                  <span className="stat-value-number">
                    {formatNanoseconds(benchmark.std_dev_ns).split(' ')[0]}
                  </span>
                  <span className="stat-value-unit">
                    {formatNanoseconds(benchmark.std_dev_ns).split(' ').slice(1).join(' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Throughput details when expanded */}
            {hasThroughput && (
              <div className="benchmark-throughput-details">
                <span className="throughput-label">Throughput</span>
                <div className="throughput-values">
                  {benchmark.throughput?.Elements && (
                    <div className="throughput-detail">
                      <span className="throughput-value">{benchmark.throughput.Elements.toLocaleString()}</span>
                      <span className="throughput-unit">elements/op</span>
                    </div>
                  )}
                  {benchmark.throughput?.Bytes && (
                    <div className="throughput-detail">
                      <span className="throughput-value">{formatThroughput(benchmark.throughput.Bytes, "bytes")}</span>
                      <span className="throughput-unit">per operation</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Confidence interval visualization */}
            <div className="benchmark-ci">
              <span className="ci-label">95% Confidence Interval</span>
              <div className="ci-bar">
                <div className="ci-range">
                  <span className="ci-lower">{formatNanoseconds(benchmark.confidence_interval.lower_ns)}</span>
                  <div className="ci-visual">
                    <div className="ci-track">
                      <div className="ci-fill" />
                      <div className="ci-mean-marker" />
                    </div>
                  </div>
                  <span className="ci-upper">{formatNanoseconds(benchmark.confidence_interval.upper_ns)}</span>
                </div>
              </div>
              <span className="ci-percent">±{ciPercent}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
