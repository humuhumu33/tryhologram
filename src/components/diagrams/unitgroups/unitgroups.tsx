import "./unitgroups.css";

interface UnitGroupsProps {
  width?: number;
  height?: number;
}

export function UnitGroups({ width = 600, height = 600 }: UnitGroupsProps) {
  const centerX = 250;
  const centerY = 250;
  const tubeWidth = 35;
  const radius = 120;

  // Define 6 interwoven tubes at different rotations
  const tubes = [
    {
      angle: 0,
      color: "unit-orange",
      colorLight: "unit-orange-light",
      colorDark: "unit-orange-dark",
      layer: 1,
    },
    {
      angle: 60,
      color: "unit-teal",
      colorLight: "unit-teal-light",
      colorDark: "unit-teal-dark",
      layer: 2,
    },
    {
      angle: 120,
      color: "unit-dark-teal",
      colorLight: "unit-dark-teal-light",
      colorDark: "unit-dark-teal-dark",
      layer: 1,
    },
    {
      angle: 180,
      color: "unit-orange",
      colorLight: "unit-orange-light",
      colorDark: "unit-orange-dark",
      layer: 2,
    },
    {
      angle: 240,
      color: "unit-light-teal",
      colorLight: "unit-light-teal-light",
      colorDark: "unit-light-teal-dark",
      layer: 1,
    },
    {
      angle: 300,
      color: "unit-beige",
      colorLight: "unit-beige-light",
      colorDark: "unit-beige-dark",
      layer: 2,
    },
  ];

  const drawTube = (
    angle: number,
    color: string,
    colorLight: string,
    colorDark: string
  ) => {
    const rx = radius;
    const ry = radius * 0.35; // Flattened ellipse for 3D effect
    const outerRx = rx + tubeWidth / 2;
    const outerRy = ry + tubeWidth / 2;
    const innerRx = rx - tubeWidth / 2;
    const innerRy = ry - tubeWidth / 2;

    // Create gradient for 3D shading
    const gradId = `grad-${angle}`;
    const clipId = `clip-${angle}`;

    return (
      <g
        key={`tube-${angle}`}
        transform={`rotate(${angle} ${centerX} ${centerY})`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`var(--${colorLight})`} />
            <stop offset="50%" stopColor={`var(--${color})`} />
            <stop offset="100%" stopColor={`var(--${colorDark})`} />
          </linearGradient>

          {/* Clip path to constrain fills within tube ring */}
          <clipPath id={clipId}>
            <path
              d={`
                M ${centerX - outerRx} ${centerY}
                A ${outerRx} ${outerRy} 0 1 1 ${centerX + outerRx} ${centerY}
                A ${outerRx} ${outerRy} 0 1 1 ${centerX - outerRx} ${centerY}
                M ${centerX - innerRx} ${centerY}
                A ${innerRx} ${innerRy} 0 1 0 ${centerX + innerRx} ${centerY}
                A ${innerRx} ${innerRy} 0 1 0 ${centerX - innerRx} ${centerY}
              `}
              fillRule="evenodd"
            />
          </clipPath>
        </defs>

        {/* Clipped tube content */}
        <g clipPath={`url(#${clipId})`}>
          {/* Main tube body */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={tubeWidth + 2}
          />

          {/* Highlight on top */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={`var(--${colorLight})`}
            strokeWidth={tubeWidth * 0.3}
            opacity={0.4}
          />
        </g>

        {/* Outline - drawn on top */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={outerRx}
          ry={outerRy}
          className="unit-outline"
        />
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={innerRx}
          ry={innerRy}
          className="unit-outline"
        />
      </g>
    );
  };

  // Separate tubes into layers for proper over/under weaving
  const layer1 = tubes.filter((t) => t.layer === 1);
  const layer2 = tubes.filter((t) => t.layer === 2);

  return (
    <svg
      viewBox="0 0 500 500"
      className="unit-container"
      style={{ width, height }}
    >
      <rect x="0" y="0" width="500" height="500" className="unit-background" />

      <g className="unit-diagram">
        {/* Layer 1 - bottom tubes */}
        {layer1.map((tube) =>
          drawTube(tube.angle, tube.color, tube.colorLight, tube.colorDark)
        )}

        {/* Layer 2 - top tubes */}
        {layer2.map((tube) =>
          drawTube(tube.angle, tube.color, tube.colorLight, tube.colorDark)
        )}
      </g>
    </svg>
  );
}
