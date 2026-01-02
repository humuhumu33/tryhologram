import Link from 'next/link';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BlogPostMetadata } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="h-full transition-all hover:shadow-lg hover:border-accent">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          By {post.author}
        </CardFooter>
      </Card>
    </Link>
  );
}
