import "./hero-stack.css";

interface HeroStackProps {
  width?: number;
  height?: number;
  className?: string;
}

export function HeroStack({
  width = 400,
  height = 450,
  className = "",
}: HeroStackProps) {

  // Isometric transformation helpers
  const cubeSize = 80;
  const angle = Math.PI / 6; // 30 degrees
  const sin30 = Math.sin(angle);
  const cos30 = Math.cos(angle);

  const iso = (x: number, y: number, z: number) => {
    const isoX = (x - y) * cos30 * cubeSize;
    const isoY = (x + y) * sin30 * cubeSize - z * cubeSize;
    return { x: isoX, y: isoY };
  };

  // Draw a single isometric cube with glass effect
  const drawGlassCube = (
    x: number,
    y: number,
    z: number,
    cubeHeight: number,
    key: string
  ) => {
    // Top face
    const topPoints = [
      iso(x, y, z + cubeHeight),
      iso(x + 1, y, z + cubeHeight),
      iso(x + 1, y + 1, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
    ];

    // Left face
    const leftPoints = [
      iso(x, y, z),
      iso(x, y, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
      iso(x, y + 1, z),
    ];

    // Right face
    const rightPoints = [
      iso(x, y + 1, z),
      iso(x + 1, y + 1, z),
      iso(x + 1, y + 1, z + cubeHeight),
      iso(x, y + 1, z + cubeHeight),
    ];

    const topPath = `M ${topPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
    const leftPath = `M ${leftPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;
    const rightPath = `M ${rightPoints
      .map((p) => `${p.x},${p.y}`)
      .join(" L ")} Z`;

    return (
      <g key={key} className="hero-cube">
        <path d={leftPath} className="hero-cube-left" />
        <path d={rightPath} className="hero-cube-right" />
        <path d={topPath} className="hero-cube-top" />
      </g>
    );
  };

  // Cube positions in cross pattern - [x, y, z, height]
  const cubes: [number, number, number, number][] = [
    [0, 1, 0, 1.2], // Back left
    [1, 0, 0, 1.2], // Back right
    [1, 2, 0, 1.2], // Front left
    [2, 1, 0, 1.2], // Front right
    [1, 1, 1.4, 0.8], // Center (raised)
  ];

  // Glowing orb position - slightly above center
  const orbPosition = { cx: 0, cy: -15 };

  const centerX = width / 2;
  const centerY = height / 2 + 40;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`hero-stack-container ${className}`}
      style={{ width, height }}
    >
      <defs>
        {/* Gradient for glass effect */}
        <linearGradient id="glassTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.15)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
        </linearGradient>

        <linearGradient id="glassLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(88, 28, 135, 0.4)" />
          <stop offset="100%" stopColor="rgba(30, 27, 75, 0.6)" />
        </linearGradient>

        <linearGradient id="glassRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(76, 29, 149, 0.35)" />
          <stop offset="100%" stopColor="rgba(30, 27, 75, 0.5)" />
        </linearGradient>

        {/* Orb glow gradient */}
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(167, 139, 250, 0.9)" />
          <stop offset="40%" stopColor="rgba(139, 92, 246, 0.4)" />
          <stop offset="100%" stopColor="rgba(88, 28, 135, 0)" />
        </radialGradient>

        {/* Soft blur filter */}
        <filter id="orbBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* Dotted connector line */}
        <line
          x1={orbPosition.cx}
          y1={orbPosition.cy + 30}
          x2={orbPosition.cx}
          y2={orbPosition.cy + 60}
          className="hero-connector-line"
        />

        {/* Render cubes from back to front */}
        {cubes.map((cube, i) =>
          drawGlassCube(cube[0], cube[1], cube[2], cube[3], `cube-${i}`)
        )}

        {/* Center glowing orb */}
        <g transform={`translate(${orbPosition.cx}, ${orbPosition.cy})`}>
          {/* Outer glow - pulses */}
          <circle
            r="45"
            fill="url(#orbGlow)"
            filter="url(#orbBlur)"
            className="hero-orb-outer"
          />
          {/* Inner bright core */}
          <circle
            r="18"
            fill="url(#orbGlow)"
            className="hero-orb-inner"
          />
          {/* Hot center */}
          <circle
            r="6"
            fill="rgba(255, 255, 255, 0.8)"
            className="hero-orb-core"
          />
        </g>
      </g>
    </svg>
  );
}
