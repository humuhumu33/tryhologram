// Benchmark data types and utilities

export interface ConfidenceInterval {
  lower_ns: number;
  upper_ns: number;
  confidence_level: number;
}

export interface Throughput {
  Elements?: number;
  Bytes?: number;
}

export interface RawBenchmark {
  category: string;
  mean_ns: number;
  median_ns: number;
  std_dev_ns: number;
  slope_ns: number | null;
  confidence_interval: ConfidenceInterval;
  throughput?: Throughput;
  full_id: string;
}

export interface CategoryInfo {
  description: string;
  benchmarks: string[];
  count: number;
}

export interface BenchmarkData {
  timestamp: string;
  commit: string;
  commit_short: string;
  benchmark_count: number;
  categories: Record<string, CategoryInfo>;
  benchmarks: Record<string, RawBenchmark>;
}

export interface ProcessedBenchmark extends RawBenchmark {
  id: string;
  displayName: string;
}

export interface ProcessedCategory {
  id: string;
  description: string;
  benchmarks: ProcessedBenchmark[];
  count: number;
  avgTime: number;
  fastestTime: number;
}

// Category display names and order
const CATEGORY_DISPLAY: Record<string, { name: string; order: number }> = {
  compiler: { name: "Compiler", order: 1 },
  backends: { name: "Backends", order: 2 },
  "core/ops": { name: "Core Operations", order: 3 },
  "core/buffer": { name: "Buffer Operations", order: 4 },
  "core/tensor": { name: "Tensor Operations", order: 5 },
  e2e: { name: "End-to-End", order: 6 },
  other: { name: "Other", order: 7 },
};

/**
 * Format nanoseconds to human-readable string
 */
export function formatNanoseconds(ns: number): string {
  if (ns < 1000) {
    return `${ns.toFixed(1)} ns`;
  } else if (ns < 1_000_000) {
    return `${(ns / 1000).toFixed(2)} μs`;
  } else {
    return `${(ns / 1_000_000).toFixed(2)} ms`;
  }
}

/**
 * Format nanoseconds to compact display (for gauges)
 */
export function formatNanosecondsCompact(ns: number): { value: string; unit: string } {
  if (ns < 1000) {
    return { value: ns.toFixed(0), unit: "ns" };
  } else if (ns < 1_000_000) {
    return { value: (ns / 1000).toFixed(1), unit: "μs" };
  } else {
    return { value: (ns / 1_000_000).toFixed(2), unit: "ms" };
  }
}

/**
 * Format throughput values (elements or bytes)
 */
export function formatThroughput(value: number, type: "elements" | "bytes"): string {
  if (type === "bytes") {
    if (value < 1024) {
      return `${value} B`;
    } else if (value < 1024 * 1024) {
      return `${(value / 1024).toFixed(1)} KB`;
    } else if (value < 1024 * 1024 * 1024) {
      return `${(value / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(value / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  } else {
    if (value < 1000) {
      return `${value}`;
    } else if (value < 1_000_000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
  }
}

/**
 * Get human-readable display name for a benchmark ID
 */
export function getBenchmarkDisplayName(id: string): string {
  // Extract the base name and parameter
  const parts = id.split("/");
  const baseName = parts[0];
  const param = parts[1];

  // Convert snake_case to Title Case
  const titleCase = baseName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return param ? `${titleCase} (${param})` : titleCase;
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(categoryId: string): string {
  return CATEGORY_DISPLAY[categoryId]?.name || categoryId;
}

/**
 * Process raw benchmark data into categorized structure
 */
export function categorizeBenchmarks(data: BenchmarkData): {
  categories: ProcessedCategory[];
  all: ProcessedBenchmark[];
  byCategory: Record<string, ProcessedBenchmark[]>;
} {
  const processedBenchmarks: ProcessedBenchmark[] = Object.entries(data.benchmarks).map(
    ([id, benchmark]) => ({
      ...benchmark,
      id,
      displayName: getBenchmarkDisplayName(id),
    })
  );

  // Group by category
  const byCategory: Record<string, ProcessedBenchmark[]> = {};
  for (const benchmark of processedBenchmarks) {
    const cat = benchmark.category;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    byCategory[cat].push(benchmark);
  }

  // Sort benchmarks within each category by mean time
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort((a, b) => a.mean_ns - b.mean_ns);
  }

  // Build processed categories
  const categories: ProcessedCategory[] = Object.entries(data.categories)
    .map(([id, info]) => {
      const benchmarks = byCategory[id] || [];
      const avgTime = benchmarks.length > 0
        ? benchmarks.reduce((sum, b) => sum + b.mean_ns, 0) / benchmarks.length
        : 0;
      const fastestTime = benchmarks.length > 0
        ? Math.min(...benchmarks.map((b) => b.mean_ns))
        : 0;

      return {
        id,
        description: info.description,
        benchmarks,
        count: info.count,
        avgTime,
        fastestTime,
      };
    })
    .sort((a, b) => {
      const orderA = CATEGORY_DISPLAY[a.id]?.order ?? 99;
      const orderB = CATEGORY_DISPLAY[b.id]?.order ?? 99;
      return orderA - orderB;
    });

  // All benchmarks sorted by mean time
  const all = processedBenchmarks.sort((a, b) => a.mean_ns - b.mean_ns);

  return { categories, all, byCategory };
}

/**
 * Get compiler-related benchmarks (canonicalize + compile)
 */
export function getCompilerBenchmarks(byCategory: Record<string, ProcessedBenchmark[]>): {
  canonicalize: ProcessedBenchmark[];
  compile: ProcessedBenchmark[];
} {
  const compilerBenchmarks = byCategory["compiler"] || [];

  return {
    canonicalize: compilerBenchmarks.filter(
      (b) => b.id.startsWith("canonicalize") || b.id.startsWith("verify_canonicalization")
    ),
    compile: compilerBenchmarks.filter(
      (b) => b.id.startsWith("compile")
    ),
  };
}

/**
 * Calculate average time for a set of benchmarks
 */
export function calculateAverage(benchmarks: ProcessedBenchmark[]): number {
  if (benchmarks.length === 0) return 0;
  const sum = benchmarks.reduce((acc, b) => acc + b.mean_ns, 0);
  return sum / benchmarks.length;
}

/**
 * Find the fastest benchmark
 */
export function findFastest(benchmarks: ProcessedBenchmark[]): ProcessedBenchmark | null {
  if (benchmarks.length === 0) return null;
  return benchmarks.reduce((min, b) => (b.mean_ns < min.mean_ns ? b : min));
}

/**
 * Find the slowest benchmark
 */
export function findSlowest(benchmarks: ProcessedBenchmark[]): ProcessedBenchmark | null {
  if (benchmarks.length === 0) return null;
  return benchmarks.reduce((max, b) => (b.mean_ns > max.mean_ns ? b : max));
}

/**
 * Speed comparison data for context
 */
export interface SpeedComparison {
  name: string;
  time_ns: number;
  description: string;
  isHologram?: boolean;
}

export const TECHNICAL_COMPARISONS: SpeedComparison[] = [
  { name: "L1 Cache", time_ns: 1, description: "CPU L1 cache access" },
  { name: "L3 Cache", time_ns: 40, description: "CPU L3 cache access" },
  { name: "RAM Access", time_ns: 100, description: "Main memory access" },
  { name: "SSD Read", time_ns: 100_000, description: "SSD random read" },
  { name: "Network RTT", time_ns: 100_000_000, description: "Network round-trip" },
];

/**
 * Calculate relatable comparison stats
 */
export function getRelatableComparisons(fastestNs: number, avgCompileNs: number) {
  const blinkMs = 300; // Human blink ~300ms
  const thoughtMs = 13; // Neural processing ~13ms
  const heartbeatMs = 50; // Heartbeat ~50ms
  const lightSpeedMperNs = 0.3; // Light travels 0.3m per nanosecond

  return {
    fasterThanThought: Math.round(thoughtMs * 1_000_000 / fastestNs),
    executionsPerBlink: Math.round(blinkMs * 1_000_000 / avgCompileNs),
    circuitsPerHeartbeat: Math.round(heartbeatMs * 1_000_000 / avgCompileNs),
    lightTravelMeters: (avgCompileNs * lightSpeedMperNs).toFixed(1),
  };
}
