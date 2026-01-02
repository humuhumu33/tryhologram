import researchData from '@/content/en/research.json';

// Types
export interface Paper {
  id: string;
  type: 'academic' | 'whitepaper';
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  venue?: string;
  link?: string;
  arxiv?: string;
  topics: string[];
  isFlagship: boolean;
}

export interface Comic {
  id: string;
  type: 'comic';
  title: string;
  subtitle?: string;
  description: string;
  author: string;
  illustrator?: string;
  publishedDate: string;
  episodeNumber: number;
  coverImage: string;
  topics: string[];
  isFlagship: boolean;
  readTime: string;
}

export interface TopicCategory {
  id: string;
  label: string;
}

export interface ResearchData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    featuredIds: string[];
  };
  papers: Paper[];
  comics: Comic[];
  categories: {
    topics: TopicCategory[];
  };
  sections: {
    papers: { title: string; description: string };
    comics: { title: string; description: string };
  };
  collaborate: {
    title: string;
    description: string;
    viewGithub: string;
    contactTeam: string;
  };
  ui: Record<string, string>;
}

// Type assertion for imported JSON
const data = researchData as ResearchData;

// Data accessors
export function getResearchData(): ResearchData {
  return data;
}

export function getAllPapers(): Paper[] {
  return data.papers;
}

export function getAllComics(): Comic[] {
  return data.comics;
}

export function getHeroItems(): Paper[] {
  const { featuredIds } = data.hero;

  if (featuredIds.length > 0) {
    return featuredIds
      .map((id) => data.papers.find((paper) => paper.id === id))
      .filter((paper): paper is Paper => paper !== undefined);
  }

  // Fallback: return flagship papers sorted by year
  return data.papers
    .filter((paper) => paper.isFlagship)
    .sort((a, b) => b.year - a.year)
    .slice(0, 2);
}

export function getTopics(): TopicCategory[] {
  return data.categories.topics;
}

export function getYears(): number[] {
  const years = new Set(data.papers.map((paper) => paper.year));
  return Array.from(years).sort((a, b) => b - a);
}

export interface FilterState {
  topic: string | null;
  year: number | null;
}

export function filterPapers(papers: Paper[], filters: FilterState): Paper[] {
  return papers.filter((paper) => {
    // Topic filter
    if (filters.topic && !paper.topics.includes(filters.topic)) {
      return false;
    }

    // Year filter
    if (filters.year && paper.year !== filters.year) {
      return false;
    }

    return true;
  });
}

export function getPapersByTopic(topic: string): Paper[] {
  return data.papers.filter((paper) => paper.topics.includes(topic));
}

export function getPapersByYear(year: number): Paper[] {
  return data.papers.filter((paper) => paper.year === year);
}
