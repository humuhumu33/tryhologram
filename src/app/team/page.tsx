import { Metadata } from "next";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/section";
import teamData from "@/content/en/team.json";

export const metadata: Metadata = {
  title: "Team - UOR Foundation",
  description:
    "Meet the team behind UOR Foundation. Researchers, engineers, and innovators building decentralized data infrastructure.",
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    github?: string;
  };
}

export default function TeamPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title={teamData.title}
          description={teamData.description}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamData.members.map((member) => (
            <Card key={member.name} className="flex flex-col">
              <CardHeader className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {member.role}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{member.bio}</p>
                <div className="mt-4 flex gap-3">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {teamData.joinTeam.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {teamData.joinTeam.description}
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/UOR-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              {teamData.joinTeam.viewPositions}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
