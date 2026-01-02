import "./orbit.css";

interface TubeConfig {
  height: number;
  bendStart: number; // Where the bend starts (y position)
  color: string;
  colorLight: string;
  colorDark: string;
}

interface OrbitClassesProps {
  width?: number;
  height?: number;
}

export function OrbitClasses({ width = 600, height = 600 }: OrbitClassesProps) {
  const tubeWidth = 22;
  const tubeSpacing = 34;
  const bendRadius = 35;

  // Define 8 tubes - each has different vertical drop before bending
  const tubes: TubeConfig[] = [
    {
      height: 120,
      bendStart: 0,
      color: "tube-dark-teal",
      colorLight: "tube-dark-teal-light",
      colorDark: "tube-dark-teal-dark",
    },
    {
      height: 105,
      bendStart: 0,
      color: "tube-orange",
      colorLight: "tube-orange-light",
      colorDark: "tube-orange-dark",
    },
    {
      height: 90,
      bendStart: 0,
      color: "tube-beige",
      colorLight: "tube-beige-light",
      colorDark: "tube-beige-dark",
    },
    {
      height: 75,
      bendStart: 0,
      color: "tube-teal",
      colorLight: "tube-teal-light",
      colorDark: "tube-teal-dark",
    },
    {
      height: 60,
      bendStart: 0,
      color: "tube-light-teal",
      colorLight: "tube-light-teal-light",
      colorDark: "tube-light-teal-dark",
    },
    {
      height: 45,
      bendStart: 0,
      color: "tube-teal",
      colorLight: "tube-teal-light",
      colorDark: "tube-teal-dark",
    },
    {
      height: 30,
      bendStart: 0,
      color: "tube-dark-teal",
      colorLight: "tube-dark-teal-light",
      colorDark: "tube-dark-teal-dark",
    },
    {
      height: 15,
      bendStart: 0,
      color: "tube-orange",
      colorLight: "tube-orange-light",
      colorDark: "tube-orange-dark",
    },
  ];

  const drawTube = (tube: TubeConfig, index: number) => {
    const startX = 60 + index * tubeSpacing;
    const startY = 50;

    // Vertical segment
    const verticalEndY = startY + tube.height;

    // Bend (90 degrees from vertical down to horizontal right)
    const bendCenterX = startX + bendRadius;
    const bendCenterY = verticalEndY;

    // Horizontal segment
    const horizontalStartX = bendCenterX;
    const horizontalStartY = verticalEndY + bendRadius;
    const horizontalEndX = horizontalStartX + 200;
    const horizontalEndY = horizontalStartY;

    // Path: straight down -> 90° curve to right -> straight right
    const tubePath = `
      M ${startX} ${startY}
      L ${startX} ${verticalEndY}
      A ${bendRadius} ${bendRadius} 0 0 1 ${horizontalStartX} ${horizontalStartY}
      L ${horizontalEndX} ${horizontalEndY}
    `;

    return (
      <g key={`tube-${index}`}>
        <defs>
          <linearGradient
            id={`tube-grad-${index}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={`var(--${tube.colorLight})`} />
            <stop offset="30%" stopColor={`var(--${tube.color})`} />
            <stop offset="100%" stopColor={`var(--${tube.colorDark})`} />
          </linearGradient>
        </defs>

        {/* Main tube body */}
        <path
          d={tubePath}
          stroke={`url(#tube-grad-${index})`}
          strokeWidth={tubeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Top cap (light) */}
        <ellipse
          cx={startX}
          cy={startY}
          rx={tubeWidth / 2}
          ry={tubeWidth / 2.5}
          fill={`var(--${tube.colorLight})`}
        />

        {/* Bottom cap (dark) */}
        <ellipse
          cx={horizontalEndX}
          cy={horizontalEndY}
          rx={tubeWidth / 2}
          ry={tubeWidth / 2.5}
          fill={`var(--${tube.colorDark})`}
        />

        {/* Black outlines */}
        <ellipse
          cx={startX}
          cy={startY}
          rx={tubeWidth / 2}
          ry={tubeWidth / 2.5}
          className="tube-outline"
        />

        <path
          d={tubePath}
          className="tube-outline"
          strokeWidth={tubeWidth}
          fill="none"
          strokeLinecap="round"
        />

        <ellipse
          cx={horizontalEndX}
          cy={horizontalEndY}
          rx={tubeWidth / 2}
          ry={tubeWidth / 2.5}
          className="tube-outline"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 500 400"
      className="orbit-container"
      style={{ width, height }}
    >
      <rect x="0" y="0" width="500" height="400" className="orbit-background" />

      {tubes.map((tube, index) => drawTube(tube, index))}
    </svg>
  );
}
