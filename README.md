# UOR Foundation Website

A modern, minimalist website for the UOR Foundation, inspired by [Luminal.com](https://www.luminal.com/) and built with Next.js 16, Tailwind CSS 4, and shadcn/ui.

## Features

- **Modern Design**: Clean, minimalist aesthetic with generous whitespace and smooth animations
- **Internationalization**: All content managed through JSON files using react-i18next
- **Dark Mode**: System-aware theme toggle with persistent preferences
- **Newsletter Signup**: Integrated with Resend for email collection
- **Contact Form**: Functional contact form with email delivery via Resend
- **Google Analytics**: Built-in analytics support
- **Policy Pages**: Privacy Policy, Terms of Service, and Open-Source Mandate
- **Responsive**: Mobile-first design that works on all devices
- **Type-Safe**: Built with TypeScript for improved developer experience
- **Best Practices**: Follows Next.js and React best practices

## Pages

- **Home** (`/`): Landing page with hero section, features, and CTAs
- **Team** (`/team`): Team member profiles and bios
- **Community** (`/community`): Community project showcases organized by category
- **Research** (`/research`): Research papers and publications
- **Contact** (`/contact`): Contact form for inquiries
- **Privacy** (`/privacy`): Privacy policy
- **Terms** (`/terms`): Terms of service
- **Open-Source** (`/open-source`): Open-source mandate and commitment

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Email**: [Resend](https://resend.com/)
- **Analytics**: Google Analytics
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript 5

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/UOR-Foundation/hologram.git
cd hologram/hologram-website
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Resend (for newsletter and contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxxxxxxx
CONTACT_EMAIL=contact@uor.foundation
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

All website content is managed through JSON and MDX files in the `/content` directory. See [CONTENT_MANAGEMENT.md](CONTENT_MANAGEMENT.md) for detailed instructions.

### Quick Reference

- **Navigation & Footer**: `content/en/common.json`
- **Home Page**: `content/en/home.json`
- **Team Members**: `content/en/team.json`
- **Community Projects**: `content/en/community.json`
- **Research Papers**: `content/en/research.json`
- **Contact Page**: `content/en/contact.json`
- **Blog Posts**: `content/blog/*.mdx` (MDX format)

For detailed examples and instructions, see the [Content Management Guide](CONTENT_MANAGEMENT.md).

## Customization

### Theme Colors

Colors are defined using CSS variables in `src/app/globals.css`. The theme uses HSL color space for easy customization:

```css
:root {
  --accent: 25 95% 53%; /* Orange accent color */
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  /* ... other colors */
}
```

### Typography

Fonts are configured in `src/app/layout.tsx`:

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

## Building for Production

```bash
npm run build
```

The built files will be in the `.next` directory.

## Deployment

This project can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): Connect your GitHub repository
- **Netlify**: Use the Next.js build plugin
- **Docker**: Create a Dockerfile with Node.js 20+
- **Self-hosted**: Run `npm run build` and `npm start`

### Environment Variables

Make sure to configure these environment variables in your deployment platform:

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- `RESEND_API_KEY`: Resend API key
- `RESEND_AUDIENCE_ID`: Resend audience ID for newsletter
- `CONTACT_EMAIL`: Email address to receive contact form submissions

## MDX Support

This project includes MDX support for content authoring. See [MDX_SETUP.md](MDX_SETUP.md) for detailed configuration and usage instructions.

- **Quick Start**: Run `pnpm dev` for fast development with Turbopack
- **Advanced Features**: Run `pnpm dev:webpack` for full MDX plugin support
- **MDX Components**: Customizable in `src/components/mdx-components.tsx`

## Development

### Project Structure

```
├── content/              # i18n content files
│   └── en/
│       ├── common.json
│       ├── home.json
│       ├── team.json
│       ├── community.json
│       ├── research.json
│       ├── contact.json
│       └── blog.json
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── contact/      # Contact page
│   │   ├── community/    # Community page
│   │   ├── research/     # Research page
│   │   ├── team/         # Team page
│   │   ├── privacy/      # Privacy policy
│   │   ├── terms/        # Terms of service
│   │   ├── open-source/  # Open-source mandate
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   ├── section.tsx
│   │   └── ...
│   ├── i18n/            # i18n configuration
│   └── lib/             # Utility functions
├── components.json      # shadcn/ui config
├── tailwind.config.ts   # Tailwind config
└── tsconfig.json        # TypeScript config
```

### Code Style

- Use functional components with hooks
- Follow the Airbnb JavaScript Style Guide
- Use TypeScript for type safety
- Keep components small and focused
- Use Tailwind utility classes (never hardcode colors)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:

- GitHub: [https://github.com/UOR-Foundation/hologram](https://github.com/UOR-Foundation/hologram)
- Discord: [https://discord.gg/uor](https://discord.gg/uor)
- Email: [contact@uor.foundation](mailto:contact@uor.foundation)
