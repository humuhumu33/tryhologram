import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Open-Source Mandate - UOR Foundation',
  description: 'Open-Source Mandate and commitment from UOR Foundation',
}

export default function OpenSourcePage() {
  return (
    <>
      <Section>
        <SectionHeader
          title="Open-Source Mandate"
          description="Our commitment to transparency, collaboration, and open innovation"
        />
        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <h2>Our Commitment</h2>
          <p>
            UOR Foundation is fundamentally committed to open-source development and transparent collaboration.
            We believe that the future of decentralized data infrastructure must be built in the open, with
            contributions from a diverse global community.
          </p>

          <h2>Core Principles</h2>
          <ul>
            <li>
              <strong>Open by Default:</strong> All code, research, and specifications developed by UOR Foundation
              are published under open-source licenses
            </li>
            <li>
              <strong>Community-Led:</strong> Development priorities and technical decisions are made through
              transparent community processes
            </li>
            <li>
              <strong>No Vendor Lock-in:</strong> All implementations are designed to be interoperable and avoid
              proprietary dependencies
            </li>
            <li>
              <strong>Accessible:</strong> Documentation, tools, and resources are freely available to everyone
            </li>
          </ul>

          <h2>What This Means</h2>
          <p>
            When you use UOR technology, you can be confident that:
          </p>
          <ul>
            <li>The source code is available for review, modification, and redistribution</li>
            <li>You're not dependent on any single vendor or organization</li>
            <li>You can contribute improvements back to the community</li>
            <li>The technology will remain free and open</li>
          </ul>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>MIT License</CardTitle>
              <CardDescription>Permissive open source</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most of our code is released under the MIT License, allowing maximum flexibility for use
                and modification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Apache 2.0</CardTitle>
              <CardDescription>Patent protection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Critical infrastructure components use Apache 2.0, providing patent protection and
                clear contribution terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CC BY 4.0</CardTitle>
              <CardDescription>Open documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Documentation and research papers are released under Creative Commons, ensuring free access
                to knowledge.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Involved
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our community of contributors building the future of decentralized data infrastructure.
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/UOR-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              View our repositories on GitHub →
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
