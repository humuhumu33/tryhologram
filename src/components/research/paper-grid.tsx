'use client';

import { useState, useMemo } from 'react';
import { FilterPills } from './filter-pills';
import { PaperCard } from './paper-card';
import { filterPapers, type Paper, type TopicCategory, type FilterState } from '@/lib/research';
import './research.css';

interface PaperGridProps {
  papers: Paper[];
  topics: TopicCategory[];
  years: number[];
  ui: Record<string, string>;
}

export function PaperGrid({ papers, topics, years, ui }: PaperGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    topic: null,
    year: null,
  });
  const [animationKey, setAnimationKey] = useState(0);

  const filteredPapers = useMemo(() => {
    return filterPapers(papers, filters);
  }, [papers, filters]);

  const handleTopicChange = (topic: string | null) => {
    setFilters((prev) => ({ ...prev, topic }));
    setAnimationKey((prev) => prev + 1);
  };

  const handleYearChange = (year: number | null) => {
    setFilters((prev) => ({ ...prev, year }));
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div>
      {/* Filters */}
      <FilterPills
        topics={topics}
        years={years}
        activeTopic={filters.topic}
        activeYear={filters.year}
        onTopicChange={handleTopicChange}
        onYearChange={handleYearChange}
        ui={ui}
      />

      {/* Papers grid */}
      {filteredPapers.length > 0 ? (
        <div className="paper-grid" key={animationKey}>
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} className="paper-card-enter" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No papers found matching the selected filters.</p>
          <button
            type="button"
            className="text-sm text-cyan hover:underline mt-2"
            onClick={() => {
              setFilters({ topic: null, year: null });
              setAnimationKey((prev) => prev + 1);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
