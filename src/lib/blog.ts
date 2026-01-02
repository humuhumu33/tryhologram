import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const isDevelopment = process.env.NODE_ENV === 'development';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime: string;
  draft?: boolean;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
  draft?: boolean;
}

export function getAllPosts(): BlogPostMetadata[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
        draft: data.draft || false,
      } as BlogPostMetadata;
    })
    // Filter out drafts in production
    .filter((post) => isDevelopment || !post.draft);

  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    const post: BlogPost = {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      image: data.image,
      content,
      readingTime: stats.text,
      draft: data.draft || false,
    };

    // Don't return draft posts in production
    if (!isDevelopment && post.draft) {
      return null;
    }

    return post;
  } catch {
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
