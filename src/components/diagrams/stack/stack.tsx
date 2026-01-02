import React from "react";
import "./stack.css";

interface LayerConfig {
  gridSize: number;
  height: number;
  topColor: string;
  leftColor: string;
  rightColor: string;
  bottomColor?: string;
  frontColor?: string;
  backColor?: string;
  showBorders?: boolean;
  borderTopColor?: string;
  borderSideColor?: string;
  verticalStacks?: number; // Number of individual cubes to stack vertically
}

interface IsometricStackProps {
  width?: number;
  height?: number;
  layers: LayerConfig[];
  layerGap?: number;
}

export function IsometricStack({
  width = 600,
  height = 600,
  layers,
  layerGap = 0.3,
}: IsometricStackProps) {
  // Isometric constants
  const cubeSize = 40;
  const angle = Math.PI / 6; // 30 degrees
  const sin30 = Math.sin(angle);
  const cos30 = Math.cos(angle);

  // Helper to create isometric coordinates
  const iso = (x: number, y: number, z: number) => {
    const isoX = (x - y) * cos30 * cubeSize;
    const isoY = (x + y) * sin30 * cubeSize - z * cubeSize;
    return { x: isoX, y: isoY };
  };

  // Helper to draw a cube at position (x, y, z)
  const drawCube = (
    x: number,
    y: number,
    z: number,
    cubeHeight: number,
    topClass: string,
    leftClass: string,
    rightClass: string,
    bottomClass?: string,
    frontClass?: string,
    backClass?: string
  ) => {
    // Top face points
    const topPoints = [
      iso(x, y, z + cubeHeight),
      iso(x + 1, y, z + cubeHeight),
      iso(x + 1, y + 1, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
    ];

    // Left face points
    const leftPoints = [
      iso(x, y, z),
      iso(x, y, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
      iso(x, y + 1, z),
    ];

    // Right face points
    const rightPoints = [
      iso(x, y, z),
      iso(x + 1, y, z),
      iso(x + 1, y, z + cubeHeight),
      iso(x, y, z + cubeHeight),
    ];

    // Bottom face points
    const bottomPoints = [
      iso(x, y, z),
      iso(x + 1, y, z),
      iso(x + 1, y + 1, z),
      iso(x, y + 1, z),
    ];

    // Front face points (at y + 1 edge)
    const frontPoints = [
      iso(x, y + 1, z),
      iso(x + 1, y + 1, z),
      iso(x + 1, y + 1, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
    ];

    // Back face points (at x + 1 edge)
    const backPoints = [
      iso(x + 1, y, z),
      iso(x + 1, y + 1, z),
      iso(x + 1, y + 1, z + cubeHeight),
      iso(x + 1, y, z + cubeHeight),
    ];

    const topPath = `M ${topPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
    const leftPath = `M ${leftPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;
    const rightPath = `M ${rightPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;
    const bottomPath = `M ${bottomPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;
    const frontPath = `M ${frontPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;
    const backPath = `M ${backPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;

    return (
      <g key={`cube-${x}-${y}-${z}`}>
        {bottomClass && (
          <path d={bottomPath} className={`stack-shape ${bottomClass}`} />
        )}
        <path d={leftPath} className={`stack-shape ${leftClass}`} />
        <path d={rightPath} className={`stack-shape ${rightClass}`} />
        {frontClass && (
          <path d={frontPath} className={`stack-shape ${frontClass}`} />
        )}
        {backClass && (
          <path d={backPath} className={`stack-shape ${backClass}`} />
        )}
        <path d={topPath} className={`stack-shape ${topClass}`} />
      </g>
    );
  };

  // Calculate z-positions for each layer
  let currentZ = 0;
  const layerZPositions = layers.map((layer) => {
    const z = currentZ;
    currentZ += layer.height + layerGap;
    return z;
  });

  const allElements: React.ReactElement[] = [];

  // Generate each layer
  layers.forEach((layer, layerIndex) => {
    const z = layerZPositions[layerIndex];
    const stacks = layer.verticalStacks || 1;
    const stackHeight = layer.height / stacks;

    for (let i = 0; i < layer.gridSize; i++) {
      for (let j = 0; j < layer.gridSize; j++) {
        const isEdge =
          layer.showBorders &&
          (i === 0 ||
            i === layer.gridSize - 1 ||
            j === 0 ||
            j === layer.gridSize - 1);

        // Draw each vertical stack
        for (let stackIndex = 0; stackIndex < stacks; stackIndex++) {
          const stackZ = z + stackIndex * stackHeight;

          const topClass =
            isEdge && layer.borderTopColor
              ? layer.borderTopColor
              : layer.topColor;
          const leftClass =
            isEdge && layer.borderSideColor
              ? layer.borderSideColor
              : layer.leftColor;
          const rightClass =
            isEdge && layer.borderSideColor
              ? layer.borderSideColor
              : layer.rightColor;
          const bottomClass = layer.bottomColor || layer.leftColor;
          const frontClass = layer.frontColor || layer.rightColor;
          const backClass = layer.backColor || layer.rightColor;

          allElements.push(
            drawCube(
              i,
              j + 1.5,
              stackZ,
              stackHeight,
              topClass,
              leftClass,
              rightClass,
              bottomClass,
              frontClass,
              backClass
            )
          );
        }
      }
    }
  });

  // Calculate viewBox to center the stack
  const centerX = 300;
  const centerY = 200;
  const viewBoxWidth = 600;
  const viewBoxHeight = 600;

  return (
    <svg
      viewBox={`${centerX - viewBoxWidth / 2} ${
        centerY - viewBoxHeight / 2
      } ${viewBoxWidth} ${viewBoxHeight}`}
      className="isometric-stack-container"
      style={{ width, height }}
    >
      <rect
        x={centerX - viewBoxWidth / 2}
        y={centerY - viewBoxHeight / 2}
        width={viewBoxWidth}
        height={viewBoxHeight}
        className="stack-background"
      />

      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* Render all layers from bottom to top */}
        {allElements}
      </g>
    </svg>
  );
}
