import Image from "next/image";
import Link from "next/link";
import communityData from "@/content/en/community.json";

export function CommunityMembers() {
  const communityMembers = communityData.members;

  return (
    <section
      id="meet-community"
      className="bg-muted py-12 md:py-16 lg:py-20 xl:py-24"
    >
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tighter mb-3 md:mb-4">
            Meet UOR Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Get to know the researchers, developers, and visionaries building
            the future of universal data infrastructure, protocols and
            applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {communityMembers.map((member) => (
            <Link
              key={`${member.name}-${member.profileUrl}`}
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="relative mb-2 md:mb-4">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-muted border-2 md:border-3 border-purple shadow-lg group-hover:shadow-2xl transition-all duration-300 relative">
                  <div className="absolute -inset-1 rounded-full bg-purple/20 group-hover:bg-purple/30 transition-all duration-300 -z-10" />
                  <Image
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover relative z-10"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-xs sm:text-sm md:text-base mb-1 group-hover:text-brand transition-colors duration-200 leading-tight">
                {member.name}
              </h3>
              <p className="text-xs sm:text-xs md:text-sm text-brand font-medium mb-1 md:mb-2 leading-tight">
                {member.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed px-1 md:px-2 hidden sm:block">
                {member.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
