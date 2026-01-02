import { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/section'
import { Button } from '@/components/ui/button'
import communityData from '@/content/en/community.json'

export const metadata: Metadata = {
  title: 'Community - UOR Foundation',
  description: communityData.description,
}

export default function CommunityPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title={communityData.title}
          description={communityData.description}
        />
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityData.projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full flex flex-col border-border/50 hover:border-purple/40 transition-all hover:shadow-lg hover:shadow-purple/10 cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl group-hover:text-purple transition-colors">
                    {project.title}
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple transition-colors" />
                  </CardTitle>
                  <CardDescription>by {project.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple/10 px-3 py-1 text-xs text-purple-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {communityData.shareProject.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {communityData.shareProject.description}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild>
              <a href="https://github.com/UOR-Foundation" target="_blank" rel="noopener noreferrer">
                {communityData.shareProject.submitProject}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://discord.gg/uor" target="_blank" rel="noopener noreferrer">
                {communityData.shareProject.joinDiscord}
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
