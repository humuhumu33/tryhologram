'use client';

import type { TopicCategory } from '@/lib/research';
import './research.css';

interface FilterPillsProps {
  topics: TopicCategory[];
  years: number[];
  activeTopic: string | null;
  activeYear: number | null;
  onTopicChange: (topic: string | null) => void;
  onYearChange: (year: number | null) => void;
  ui: Record<string, string>;
}

export function FilterPills({
  topics,
  years,
  activeTopic,
  activeYear,
  onTopicChange,
  onYearChange,
  ui,
}: FilterPillsProps) {
  return (
    <div className="filter-container" role="group" aria-label="Filter papers">
      {/* All topics pill */}
      <button
        type="button"
        className={`filter-pill ${activeTopic === null ? 'filter-pill-active' : ''}`}
        onClick={() => onTopicChange(null)}
        aria-pressed={activeTopic === null}
      >
        {ui.allTopics || 'All Topics'}
      </button>

      {/* Topic pills */}
      {topics.map((topic) => (
        <button
          key={topic.id}
          type="button"
          className={`filter-pill ${activeTopic === topic.id ? 'filter-pill-active' : ''}`}
          onClick={() => onTopicChange(topic.id)}
          aria-pressed={activeTopic === topic.id}
        >
          {topic.label}
        </button>
      ))}

      {/* Year dropdown */}
      <select
        className="filter-year-select"
        value={activeYear?.toString() || ''}
        onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
        aria-label="Filter by year"
      >
        <option value="">{ui.allYears || 'All Years'}</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
