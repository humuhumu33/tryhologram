# Claude Rules for UOR Foundation Website

This document contains guidelines and rules for working with the UOR Foundation website codebase.

## Project Overview

This is a Next.js 16 (with Turbopack) website for the UOR Foundation, built with:
- **Framework**: Next.js 16.0.3 with App Router
- **Package Manager**: pnpm (for development and dependency management)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom components
- **Internationalization**: i18next with react-i18next
- **Theme**: next-themes for dark/light mode
- **Fonts**: Geist Sans and Geist Mono

## File Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── team/              # Team page
│   ├── community/         # Community page
│   ├── research/          # Research page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy page
│   └── globals.css        # Global styles and theme variables
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Footer component
│   ├── section.tsx       # Reusable section components
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
└── lib/
    └── utils.ts          # Utility functions (cn helper)

docs/                       # Documentation files only
└── *.md                   # All documentation goes here
```

## Coding Rules

### 1. Component Structure

**All pages must be client components** if they use hooks or i18n:
```tsx
'use client'

import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation('namespace')
  // ...
}
```

**Server components** should be used when possible for better performance:
```tsx
// No 'use client' directive
export default function ServerComponent() {
  return <div>Static content</div>
}
```

### 2. Internationalization (i18n)

**Always use translation keys** for user-facing text:
```tsx
// ✅ CORRECT
const { t } = useTranslation('home')
<h1>{t('hero.title')}</h1>

// ❌ WRONG
<h1>Your Foundation for Universal Data Infrastructure</h1>
```

**Translation namespaces:**
- `common`: Shared translations (navigation, footer)
- `home`: Home page content
- Page-specific namespaces for other pages

### 3. Styling Guidelines

**Use Tailwind utility classes** with the `cn()` helper for conditional styling:
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  className
)}>
```

**Responsive design breakpoints:**
- `sm`: 640px (tablets portrait)
- `md`: 768px (tablets landscape)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)

**Always design mobile-first:**
```tsx
// ✅ CORRECT
<div className="text-base sm:text-lg lg:text-xl">

// ❌ WRONG
<div className="lg:text-xl md:text-lg text-base">
```

### 4. Theme System

**Use CSS variables** defined in `globals.css`:
- Light mode: `:root` variables
- Dark mode: `.dark` class variables

**Semantic color tokens:**
- `bg-background` / `text-foreground` - Base colors
- `bg-card` / `text-card-foreground` - Card backgrounds
- `bg-muted` / `text-muted-foreground` - Muted/secondary text
- `text-accent` / `bg-accent` - Accent/brand color (orange)
- `bg-primary` / `text-primary-foreground` - Primary buttons
- `bg-secondary` / `text-secondary-foreground` - Secondary elements

### 5. Component Patterns

**Button with links** - Use `asChild` pattern:
```tsx
import { Button } from '@/components/ui/button'

// ✅ CORRECT
<Button asChild>
  <a href="/link">Text</a>
</Button>

// ❌ WRONG
<Button onClick={() => router.push('/link')}>Text</Button>
```

**Section wrapper** - Use Section component:
```tsx
import { Section, SectionHeader } from '@/components/section'

<Section id="section-id" className="bg-muted/50">
  <SectionHeader
    title="Section Title"
    description="Section description"
  />
  {/* Content */}
</Section>
```

**Cards** - Use Card components:
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

### 6. TypeScript Rules

**Define interfaces** for component props and data structures:
```tsx
interface TeamMember {
  name: string
  role: string
  bio: string
  linkedin?: string
  github?: string
}
```

**Use proper typing** for component props:
```tsx
interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  // ...
}
```

**Use path aliases** for imports instead of relative paths:
```tsx
// ✅ CORRECT - Use path aliases
import { Button } from '@/components/ui/button'
import teamData from '@/content/en/team.json'

// ❌ WRONG - Avoid relative paths
import { Button } from '../../../components/ui/button'
import teamData from '../../../content/en/team.json'
```

**Available path aliases:**
- `@/*` - Maps to `./src/*` (for all source files)
- `@/content/*` - Maps to `./content/*` (for content/data files)

### 7. Accessibility

**Always include:**
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section>`)
- Screen reader text for icon buttons: `<span className="sr-only">Description</span>`
- `rel="noopener noreferrer"` on external links with `target="_blank"`
- Alt text for images (when added)
- ARIA labels where needed

### 8. Performance

**Optimize images** (when used):
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

**Use dynamic imports** for heavy components:
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### 9. Git Commit Guidelines

**Format:** `type: description`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add dark mode toggle to navigation
fix: resolve asChild prop error in Button component
docs: update README with setup instructions
style: improve responsive layout on mobile
```

### 10. External Links

**UOR Foundation Links:**
- GitHub: `https://github.com/UOR-Foundation`
- Discord: `https://discord.gg/uor`

**Placeholder Links:**
- Team LinkedIn/GitHub: `https://linkedin.com` / `https://github.com`
- Research papers: `https://arxiv.org`

## Common Tasks

### Adding a New Page

1. Create page file: `src/app/[pagename]/page.tsx`
2. Add to navigation in `src/components/navigation.tsx`
3. Add translations to i18n files
4. Update footer links if needed

### Adding a Team Member

Edit `src/app/team/page.tsx`:
```tsx
{
  name: 'Name',
  role: 'Role',
  bio: 'Short bio.',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
}
```

### Creating a New Component

1. Create file in `src/components/` or `src/components/ui/`
2. Use TypeScript with proper interfaces
3. Export with named export
4. Add to barrel export if needed

### Updating Theme Colors

Edit CSS variables in `src/app/globals.css`:
- `:root` for light mode
- `.dark` for dark mode

## Testing

Before committing:
1. Run `pnpm build` to check for build errors
2. Test both light and dark modes
3. Test responsive design on mobile, tablet, and desktop
4. Verify all links work
5. Check console for errors

## Development Commands

Using pnpm as the package manager:
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm add <package>` - Add a new dependency
- `pnpm add -D <package>` - Add a new dev dependency

## Do Not Do

❌ Hardcode text instead of using i18n
❌ Use inline styles instead of Tailwind classes
❌ Import components without using them
❌ Create pages without 'use client' when using hooks
❌ Forget to add `suppressHydrationWarning` to html tag when using themes
❌ Use `<a>` tags instead of Next.js `<Link>` for internal navigation
❌ Use `npm`, `yarn`, or `bun` commands - always use `pnpm` instead
❌ Add dependencies without documenting them
❌ Skip TypeScript types or use `any`
❌ Ignore console warnings or errors
❌ Create documentation files outside of the `/docs` directory
❌ Create markdown files in the root or src directories (except CLAUDE.md and README.md in root)

## Best Practices

✅ Use semantic HTML elements
✅ Keep components small and focused
✅ Extract repeated patterns into reusable components
✅ Use TypeScript strictly (no `any` types)
✅ Follow mobile-first responsive design
✅ Maintain consistent spacing and layout
✅ Use the existing design system (colors, spacing, typography)
✅ Test in both light and dark modes
✅ Ensure accessibility with ARIA labels and semantic HTML
✅ Keep translations organized and consistent
✅ Place all documentation files in the `/docs` directory

## Questions or Issues?

When encountering issues:
1. Check this CLAUDE.md file
2. Review similar existing code in the codebase
3. Check Next.js 16 documentation
4. Check Tailwind CSS 4 documentation
5. Review shadcn/ui component documentation
