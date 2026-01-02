import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectsCarousel = dynamic(() => import("./projects-carousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />,
});

export function CommunityProjects() {
  /* UOR Communities Projects */
  return (
    <section className="bg-gray-100 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter lg:text-4xl mb-4">
            UOR Communities Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the innovative projects, protocols and applications built by
            our community using UOR principles and technologies.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
          }
        >
          <ProjectsCarousel />
        </Suspense>
      </div>
    </section>
  );
}
