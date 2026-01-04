import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { getResearchData } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Theory (Atlas) - Hologram',
  description:
    'The natural structure of information: discovering the intrinsic mathematical organization that governs how information organizes, transforms, and persists.',
};

export default function ResearchPage() {
  const data = getResearchData();

  return (
    <>
      {/* Main Content Section */}
      <Section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Atlas: The Physics<br />
              of Information
            </h1>
            <div className="flex justify-center mt-8 mb-8">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                <img
                  src="/torus-hero.gif"
                  alt="Holographic Torus"
                  className="w-full h-full object-contain"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'contrast(1.1) brightness(1.1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-16 space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Information is commonly treated as neutral data that acquires structure only through human design. The research work by <a href="https://www.uor.foundation/" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan/80 underline">The UOR Foundation</a> suggests a different conclusion: <strong className="text-cyan font-semibold">information itself has an intrinsic mathematical structure</strong> that governs how it organizes, transforms, and persists. This page introduces that discovery called Atlas and its implications, without assuming prior familiarity with the underlying theory.
            </p>
          </div>

          {/* Section I */}
          <div className="mb-16 space-y-8">
            <div className="border-l-4 border-cyan pl-6">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                I. Information as a Structured Physical Quantity
              </h2>
            </div>
            
            <div className="space-y-6 text-base leading-relaxed text-foreground">
              <p>
                In Atlas, information is treated not as an abstract bookkeeping device, but as a mathematical quantity with inherent organization. When binary information is analyzed through transformations that preserve informational content, stable patterns emerge that are independent of encoding conventions, data formats, or system design choices.
              </p>
              
              <p>
                One of the first results of this analysis is that binary information does not behave as a uniform space of 256 independent byte values. Instead, when examined through invariant-preserving transformations, those 256 values naturally organize into exactly <strong className="text-foreground font-semibold">96 equivalence classes</strong>. Each class groups byte values that are informationally equivalent: distinct at the representation level, but identical in terms of underlying informational content. This structure is not imposed; it emerges consistently from the mathematics of information itself.
              </p>
              
              <p>
                This equivalence structure reveals that information contains built-in redundancy elimination. At a fundamental level, meaningful information is already more compact than its surface representation suggests. The emergence of the 96 classes reflects a deeper principle: <strong className="text-cyan font-semibold">information has natural symmetries</strong>, and those symmetries constrain how it can be represented and transformed.
              </p>
              
              <p>
                Crucially, this structure appears universally. It does not depend on language, application domain, or computational context. The same classification emerges whether the data represents text, numbers, program state, or physical measurements. This universality strongly suggests that the structure belongs to information itself, not to any particular system that processes it.
              </p>
            </div>
          </div>

          {/* Section II */}
          <div className="mb-16 space-y-8">
            <div className="border-l-4 border-cyan pl-6">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                II. Geometric Organization and Natural Coordinates
              </h2>
            </div>
            
            <div className="space-y-6 text-base leading-relaxed text-foreground">
              <p>
                Beyond classification, Atlas reveals that information occupies a fixed geometric coordinate space. All information states project onto a space of exactly <strong className="text-foreground font-semibold">12,288 natural coordinates</strong>, arranged as a 48×256 Torus structure. This number is not arbitrary; it emerges as the smallest complete space capable of representing all informational states while preserving the discovered invariants.
              </p>
              
              <p>
                Each piece of information deterministically maps to a coordinate based on its content. The mapping is purely mathematical: the content is canonicalized, hashed, and projected into the coordinate space. As a result, <strong className="text-cyan font-semibold">information determines its own location</strong>. There is no need for external address assignment, registries, or lookup tables. Location is a property of the information itself, defined by the object attributes.
              </p>
              
              <p>
                This coordinate structure is inherently geometric. Relationships between pieces of information are reflected directly as spatial relationships within the coordinate space, rather than being reconstructed indirectly through indexes or metadata. Transformations of information correspond to well-defined movements within this space, constrained by invariant quantities.
              </p>
              
              <p>
                The coordinate space is also fixed in size. Unlike traditional systems that scale by growing address spaces, this structure remains constant. Capacity arises through reuse and temporal multiplexing, not expansion. This fixed geometry enables global reasoning about information behavior, since the entire space is always knowable and verifiable.
              </p>
            </div>
          </div>

          {/* Section III */}
          <div className="mb-16 space-y-8">
            <div className="border-l-4 border-cyan pl-6">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                III. Conservation Laws and Lossless Computation
              </h2>
            </div>
            
            <div className="space-y-6 text-base leading-relaxed text-foreground">
              <p>
                A defining consequence of information's intrinsic structure is the emergence of conservation laws. Atlas identifies <strong className="text-foreground font-semibold">four invariant quantities</strong> that must be preserved under all valid information transformations. These function analogously to conservation laws in physics: they are not enforced by checks or policies, but are mathematical necessities arising from symmetry in information space.
              </p>
              
              <p>
                When information transforms—through storage, transmission, or computation—these invariants remain constant. Any transformation that would violate them is not merely incorrect; it is mathematically invalid. This shifts correctness from something that must be monitored and repaired to something that is structurally guaranteed.
              </p>
              
              <p>
                From this follows a powerful result: <strong className="text-cyan font-semibold">lossless, structure-preserving computation</strong>. Transformations that preserve the invariants automatically generate mathematical proofs of their own correctness. Each operation can carry a compact certificate demonstrating that no information was lost, duplicated, or corrupted. Verification becomes a matter of checking proofs, not trusting implementations.
              </p>
              
              <p>
                Together, the geometric coordinate system and the conservation laws define a universal encoding framework. Information can be represented, moved, and transformed without loss of structure, and without reliance on context-specific conventions. Different systems that align with this structure naturally interoperate, because they are operating on the same underlying informational geometry.
              </p>
            </div>
          </div>

          {/* Read Whitepaper Button */}
          <div className="mt-12 flex items-center justify-center">
            <Button asChild>
              <a href="https://uor-foundation.github.io/hologram-archive/book/print.html" target="_blank" rel="noopener noreferrer">
                Read Whitepaper
              </a>
            </Button>
          </div>

          {/* Exploratory Applications Section */}
          <div className="mt-16 pt-12 border-t border-border/20">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
              Exploratory Applications
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  1. Scientific Research
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Accelerate scientific research by aligning computation with information's natural mathematical structure, enabling <span className="text-cyan font-semibold">complex system simulations</span>, new insights and reliable results.
                </p>
              </div>

              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  2. Geometric Compute
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Leverage the 12,288-coordinate space and conservation laws to build <span className="text-cyan font-semibold">novel compute circuits</span> with deterministic performance and mathematical guarantees of correctness.
                </p>
              </div>

              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  3. Geometric AI
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Enable AI models that operate on the intrinsic topological structure of information, providing a <span className="text-cyan font-semibold">unified substrate</span> for interpretable and self-verifying machine intelligence.
                </p>
              </div>

              <div className="rounded-lg border border-border/20 bg-surface-dark/30 p-6 hover:border-border/40 hover:bg-surface-dark/40 transition-all duration-200">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  4. Post-Quantum Encryption
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Build cryptographic systems that leverage the <span className="text-cyan font-semibold">geometric lattice</span> structure of information to provide security that remains valid in a post-quantum, constant-time O(1) computing era.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-base leading-relaxed text-cyan font-medium">
                Hologram virtual infrastructure aims to enable all these applications.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Collaborate Section */}
      <Section className="bg-surface-dark/30 border-t border-border/20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.collaborate.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{data.collaborate.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="group relative overflow-hidden border-cyan/40 bg-cyan/15 px-6 font-semibold text-cyan-foreground hover:border-cyan/60 hover:bg-cyan/20 hover:shadow-lg hover:shadow-cyan/20"
            >
              <a href="https://www.uor.foundation/" target="_blank" rel="noopener noreferrer">{data.collaborate.contactTeam}</a>
            </Button>
            <Button asChild>
              <a href="https://github.com/UOR-Foundation" target="_blank" rel="noopener noreferrer">
                {data.collaborate.viewGithub}
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
