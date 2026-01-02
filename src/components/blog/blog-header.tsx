import { format } from 'date-fns';

interface BlogHeaderProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
}

export function BlogHeader({
  title,
  description,
  date,
  author,
  readingTime,
  tags,
}: BlogHeaderProps) {
  return (
    <header className="mb-10 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
        <span>•</span>
        <span>{readingTime}</span>
        <span>•</span>
        <span>By {author}</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
