"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BenchmarkCard } from "./benchmark-card";
import {
  ProcessedBenchmark,
  formatNanoseconds,
  getCategoryDisplayName,
} from "@/lib/benchmark-utils";

interface ExpandableCategoryProps {
  categoryId: string;
  description: string;
  benchmarks: ProcessedBenchmark[];
  initialDisplayCount?: number;
}

export function ExpandableCategory({
  categoryId,
  description,
  benchmarks,
  initialDisplayCount = 12,
}: ExpandableCategoryProps) {
  const [expanded, setExpanded] = useState(false);
  const displayedBenchmarks = expanded
    ? benchmarks
    : benchmarks.slice(0, initialDisplayCount);
  const remainingCount = benchmarks.length - initialDisplayCount;
  const showExpandButton = benchmarks.length > initialDisplayCount;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        {getCategoryDisplayName(categoryId)}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayedBenchmarks.map((benchmark) => (
          <BenchmarkCard key={benchmark.id} benchmark={benchmark} />
        ))}
        {showExpandButton && !expanded && (
          <Card
            className="bg-surface-dark/30 border-dashed border-border/30 hover:border-border/50 cursor-pointer transition-all hover:bg-surface-dark/40"
            onClick={() => setExpanded(true)}
          >
            <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                +{remainingCount}
              </span>
              <span className="text-sm text-muted-foreground">
                more benchmarks
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground mt-1" />
            </CardContent>
          </Card>
        )}
      </div>
      {expanded && showExpandButton && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronUp className="w-4 h-4 mr-2" />
            Show fewer
          </Button>
        </div>
      )}
    </div>
  );
}
