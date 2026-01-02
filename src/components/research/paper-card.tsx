'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Paper } from '@/lib/research';
import './research.css';

interface PaperCardProps {
  paper: Paper;
  isHero?: boolean;
  className?: string;
}

export function PaperCard({ paper, isHero = false, className = '' }: PaperCardProps) {
  const [expanded, setExpanded] = useState(isHero);

  const cardClasses = [
    'paper-card',
    expanded && !isHero ? 'paper-card-expanded' : '',
    isHero ? 'paper-card-hero' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (!isHero) {
      setExpanded(!expanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isHero && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  return (
    <Card
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isHero ? undefined : 0}
      role={isHero ? undefined : 'button'}
      aria-expanded={isHero ? undefined : expanded}
    >
      {isHero && <div className="paper-card-accent-bar" />}
      <CardContent className="paper-card-content">
        {/* Header */}
        <div className="paper-header">
          <h3 className="paper-title">{paper.title}</h3>
          {!isHero && (
            <span className="paper-expand-icon" aria-hidden="true">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="paper-meta">
          <span className="paper-authors">{paper.authors.join(', ')}</span>
          <span className="paper-separator">·</span>
          <span className="paper-year">{paper.year}</span>
          {paper.venue && (
            <>
              <span className="paper-separator">·</span>
              <span className="paper-venue">{paper.venue}</span>
            </>
          )}
        </div>

        {/* Abstract preview (or full for hero) */}
        <p className="paper-abstract-preview">{paper.abstract}</p>

        {/* Topic tags */}
        <div className="paper-topics">
          {paper.topics.map((topic) => (
            <span key={topic} className="paper-topic-tag">
              {topic.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Expanded details (or always shown for hero) */}
        {(expanded || isHero) && !isHero && (
          <div className="paper-details">
            <p className="paper-abstract-full">{paper.abstract}</p>
            <div className="paper-links">
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileText size={14} />
                  Read Paper
                </a>
              )}
              {paper.arxiv && (
                <a
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-link paper-link-secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  arXiv
                </a>
              )}
            </div>
          </div>
        )}

        {/* Links for hero card (always visible) */}
        {isHero && (
          <div className="paper-links" style={{ marginTop: '1rem' }}>
            {paper.link && (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-link"
              >
                <FileText size={14} />
                Read Paper
              </a>
            )}
            {paper.arxiv && (
              <a
                href={paper.arxiv}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-link paper-link-secondary"
              >
                <ExternalLink size={14} />
                arXiv
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
