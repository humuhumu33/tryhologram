'use client';

import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaperCard } from './paper-card';
import type { Paper } from '@/lib/research';
import './research.css';

interface ResearchHeroProps {
  papers: Paper[];
  badge: string;
  exploreLabel: string;
}

export function ResearchHero({ papers, badge, exploreLabel }: ResearchHeroProps) {
  return (
    <section className="research-hero">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="research-hero-badge">
          <Sparkles size={14} />
          <span>{badge}</span>
        </div>

        {/* Featured paper(s) */}
        <div className="space-y-6">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} isHero />
          ))}
        </div>

        {/* CTA to scroll to papers section */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <a href="#papers" className="flex items-center gap-2">
              {exploreLabel}
              <ArrowDown size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
