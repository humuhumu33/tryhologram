import "./resonance.css";

interface TubeConfig {
  rx: number;
  ry: number;
  rotation: number;
  tilt: number; // 3D tilt effect
  color: string;
  colorLight: string;
  colorDark: string;
  layer: number;
}

interface ResonanceClassesProps {
  width?: number;
  height?: number;
}

export function ResonanceClasses({
  width = 600,
  height = 600,
}: ResonanceClassesProps) {
  const centerX = 250;
  const centerY = 250;
  const tubeWidth = 28;

  // Define tubes with various orientations
  const tubes: TubeConfig[] = [
    // Layer 1 (back)
    {
      rx: 160,
      ry: 80,
      rotation: 45,
      tilt: 20,
      color: "resonance-dark-teal",
      colorLight: "resonance-dark-teal-light",
      colorDark: "resonance-dark-teal-dark",
      layer: 1,
    },
    {
      rx: 160,
      ry: 80,
      rotation: -45,
      tilt: 20,
      color: "resonance-orange",
      colorLight: "resonance-orange-light",
      colorDark: "resonance-orange-dark",
      layer: 1,
    },

    // Layer 2
    {
      rx: 160,
      ry: 80,
      rotation: 0,
      tilt: 30,
      color: "resonance-teal",
      colorLight: "resonance-teal-light",
      colorDark: "resonance-teal-dark",
      layer: 2,
    },
    {
      rx: 160,
      ry: 80,
      rotation: 90,
      tilt: 30,
      color: "resonance-light-teal",
      colorLight: "resonance-light-teal-light",
      colorDark: "resonance-light-teal-dark",
      layer: 2,
    },

    // Layer 3
    {
      rx: 160,
      ry: 80,
      rotation: 135,
      tilt: 15,
      color: "resonance-teal",
      colorLight: "resonance-teal-light",
      colorDark: "resonance-teal-dark",
      layer: 3,
    },
    {
      rx: 160,
      ry: 80,
      rotation: -135,
      tilt: 15,
      color: "resonance-orange",
      colorLight: "resonance-orange-light",
      colorDark: "resonance-orange-dark",
      layer: 3,
    },

    // Layer 4 (front)
    {
      rx: 160,
      ry: 80,
      rotation: 22.5,
      tilt: 25,
      color: "resonance-dark-teal",
      colorLight: "resonance-dark-teal-light",
      colorDark: "resonance-dark-teal-dark",
      layer: 4,
    },
    {
      rx: 160,
      ry: 80,
      rotation: -22.5,
      tilt: 25,
      color: "resonance-teal",
      colorLight: "resonance-teal-light",
      colorDark: "resonance-teal-dark",
      layer: 4,
    },
  ];

  // Layer offsets for 3D stacked appearance
  const layerOffsets: Record<number, { x: number; y: number }> = {
    1: { x: 0, y: -15 },  // Back layer - offset up
    2: { x: -5, y: -5 },  // Second layer
    3: { x: 5, y: 5 },    // Third layer
    4: { x: 0, y: 15 },   // Front layer - offset down
  };

  const drawTube = (tube: TubeConfig, index: number) => {
    const gradId = `res-grad-${index}`;

    // Apply 3D tilt by scaling the ry
    const effectiveRy = tube.ry * (1 - tube.tilt / 100);

    // Get layer offset for 3D stacking effect
    const offset = layerOffsets[tube.layer] || { x: 0, y: 0 };

    return (
      <g
        key={`tube-${index}`}
        transform={`translate(${offset.x}, ${offset.y})`}
      >
        <g className={`resonance-layer resonance-layer-${tube.layer}`}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`var(--${tube.colorLight})`} />
              <stop offset="50%" stopColor={`var(--${tube.color})`} />
              <stop offset="100%" stopColor={`var(--${tube.colorDark})`} />
            </linearGradient>
          </defs>

          <g transform={`rotate(${tube.rotation} ${centerX} ${centerY})`}>
          {/* Inner shadow */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={tube.rx - tubeWidth / 2}
            ry={effectiveRy - tubeWidth / 2}
            fill={`var(--${tube.colorDark})`}
            opacity={0.2}
          />

          {/* Main tube */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={tube.rx}
            ry={effectiveRy}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={tubeWidth}
          />

          {/* Highlight */}
          <ellipse
            cx={centerX}
            cy={centerY - 3}
            rx={tube.rx - 5}
            ry={effectiveRy * 0.85}
            fill="none"
            stroke={`var(--${tube.colorLight})`}
            strokeWidth={tubeWidth * 0.3}
            opacity={0.6}
          />

          {/* Outlines */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={tube.rx + tubeWidth / 2}
            ry={effectiveRy + tubeWidth / 2}
            className="resonance-outline"
          />
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={tube.rx - tubeWidth / 2}
            ry={effectiveRy - tubeWidth / 2}
            className="resonance-outline"
          />
        </g>
        </g>
      </g>
    );
  };

  // Group tubes by layer for proper rendering order
  const layers = [1, 2, 3, 4];

  return (
    <svg
      viewBox="0 0 500 500"
      className="resonance-container"
      style={{ width, height }}
    >
      <rect
        x="0"
        y="0"
        width="500"
        height="500"
        className="resonance-background"
      />

      {layers.map((layer) =>
        tubes
          .filter((t) => t.layer === layer)
          .map((tube, index) => drawTube(tube, index + layer * 10))
      )}
    </svg>
  );
}
