import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { Section, SectionHeader } from '@/components/section';

export const metadata: Metadata = {
  title: 'Blog - Hologram',
  description: 'Insights, updates, and articles from the Hologram team',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <SectionHeader
        title="Blog"
        description="Insights, updates, and articles from the Hologram team"
      />
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Section>
  );
}
