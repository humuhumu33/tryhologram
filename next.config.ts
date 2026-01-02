import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

const withMDX = createMDX({
  options: {
    // Note: remark-gfm doesn't work with Turbopack
    // Use HTML tables in MDX files instead of markdown tables
  },
});

export default withMDX(nextConfig);
