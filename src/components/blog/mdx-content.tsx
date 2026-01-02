interface MDXContentProps {
  children: React.ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </div>
  );
}
