import { Section, SectionHeader } from "@/components/section";
import { TorusIsometric } from "@/components/diagrams/torus/torus";
// import { LatticeDiagram } from "@/components/diagrams/lattice-diagram";
// import { IsometricFunnel } from "@/components/diagrams/isometric-view";
// import { CompilerDiagram } from "@/components/diagrams/compiler";
import { IsometricStack } from "@/components/diagrams/stack/stack";
// import { OrbitClasses } from "@/components/diagrams/orbitclasses/orbitclasses";
import { UnitGroups } from "@/components/diagrams/unitgroups/unitgroups";
import { ResonanceClasses } from "@/components/diagrams/resonance/resonance";
import { ComputationWorkflow } from "@/components/diagrams/workflow/workflow";
import { ComplexityComparison } from "@/components/diagrams/comparison/comparison";

export default function DiagrammingPage() {
  const characterStackLayers = [
    {
      gridSize: 4,
      height: 0.5,
      topColor: "block-teal",
      leftColor: "block-teal-dark",
      rightColor: "block-teal-dark",
      showBorders: true,
      borderTopColor: "block-orange-light",
      borderSideColor: "block-orange-dark",
    },
    {
      gridSize: 4,
      height: 3,
      topColor: "block-teal-light",
      leftColor: "block-teal-dark",
      rightColor: "block-teal-dark",
      verticalStacks: 4,
    },
    {
      gridSize: 4,
      height: 0.5,
      topColor: "block-beige-light",
      leftColor: "block-beige-dark",
      rightColor: "block-beige-dark",
      showBorders: true,
      borderTopColor: "block-orange-light",
      borderSideColor: "block-orange-dark",
    },
  ];

  return (
    <Section>
        <SectionHeader
          title="Diagrams"
          description="Diagrams illustrating the concepts of universal data representation and decentralized infrastructure."
        />
        <div className="flex items-center justify-center ">
          <TorusIsometric
            rotationX={45}
            rotationZ={0.55}
            majorRadius={110}
            minorRadius={45}
            className="w-full"
          />
          <IsometricStack layers={characterStackLayers} layerGap={0.2} />
          {/* <OrbitClasses /> */}
          <UnitGroups />
          <ResonanceClasses />
        </div>
        <div className="flex items-center justify-center ">
          <ComputationWorkflow />
          <ComplexityComparison />
        </div>
        {/* <div className="flex min-h-screen items-center justify-center ">
          <IsometricFunnel className="w-full" />
        </div> */}
      </Section>
  );
}
