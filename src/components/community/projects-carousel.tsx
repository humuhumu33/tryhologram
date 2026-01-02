"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Plus } from "lucide-react";
import communityData from "@/content/en/community.json";

// Map icon names to components
const iconComponents: Record<string, React.ReactNode> = {
  atom: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" fill="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" fill="none" transform="rotate(-60 12 12)" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  code: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6" />
      <path d="m21 12-6 0m-6 0-6 0" />
      <path d="m16.24 7.76-4.24 4.24m0 0L7.76 16.24" />
      <path d="m7.76 7.76 4.24 4.24m0 0l4.24 4.24" />
    </svg>
  ),
};

// Icon background colors based on JSON color field
const iconBgColors: Record<string, string> = {
  "text-cyan": "bg-cyan",
  "text-purple": "bg-purple",
};

// Tag colors based on tag name - holographic theme
const tagColors: Record<string, string> = {
  "Mathematics": "bg-cyan/20 text-cyan dark:bg-cyan/10 dark:text-cyan",
  "Rust": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "Lean": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "AI/ML": "bg-purple/20 text-purple dark:bg-purple/10 dark:text-purple",
  "Python": "bg-cyan/20 text-cyan dark:bg-cyan/10 dark:text-cyan",
  "Community": "bg-purple/20 text-purple dark:bg-purple/10 dark:text-purple",
  "Open Source": "bg-cyan/20 text-cyan dark:bg-cyan/10 dark:text-cyan",
};

// Build projects from JSON data
const jsonProjects = communityData.featuredProjects.map((project, index) => ({
  id: index + 1,
  title: project.title,
  author: project.author,
  description: project.description,
  url: project.url,
  icon: {
    bg: iconBgColors[project.color] || "bg-gray-600",
    svg: iconComponents[project.icon] || iconComponents.atom,
  },
  tags: project.tags.map(tag => ({
    name: tag,
    color: tagColors[tag] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  })),
}));

// Add call-to-action card
const projects = [
  ...jsonProjects,
  {
    id: jsonProjects.length + 1,
    title: "Submit Your Project",
    author: "You",
    description:
      "Have a project that aligns with UOR principles? Share your work with the community and help build the foundation of sovereign data infrastructure.",
    isCallToAction: true,
    url: "https://github.com/UOR-Foundation",
    icon: {
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      svg: <Plus className="text-white w-8 h-8" />,
    },
    tags: [
      { name: "Community", color: tagColors["Community"] },
      { name: "Open Source", color: tagColors["Open Source"] },
    ],
  },
];

export default function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projectsPerSlide = 3;
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const getCurrentProjects = () => {
    const startIndex = currentSlide * projectsPerSlide;
    return projects.slice(startIndex, startIndex + projectsPerSlide);
  };

  return (
    <div className="relative">
      {/* Cards Grid */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-4 md:gap-6 max-w-6xl mx-auto transition-all duration-500 ease-in-out">
          {getCurrentProjects().map((project) => (
            <a
              key={project.id}
              href={project.url}
              target={project.url?.startsWith("http") ? "_blank" : undefined}
              rel={project.url?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:border-brand/30 h-full min-h-[400px] flex flex-col relative cursor-pointer"
            >
              <div
                className={`h-12 w-12 md:h-16 md:w-16 rounded-lg ${project.icon.bg} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-200`}
              >
                {project.icon.svg}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                {project.title}
              </h3>

              <p className="text-xs md:text-sm text-brand mb-2">
                by {project.author}
              </p>

              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-0.5 md:py-1 ${tag.color} text-[10px] md:text-xs rounded-full`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-brand transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if more than one slide */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-card/80 hover:bg-card text-foreground rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-card/80 hover:bg-card text-foreground rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next projects"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Dot Indicators - Only show if more than one slide */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-brand"
                  : "bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
