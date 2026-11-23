export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <pattern id="topo" width="700" height="700" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#1c2740" strokeWidth="1">
            <path d="M350 120c110 0 200 70 200 190s-100 200-210 200-190-80-190-200 90-190 200-190z" />
            <path d="M350 170c80 0 150 55 150 140s-80 150-160 150-140-60-140-150 70-140 150-140z" />
            <path d="M350 220c55 0 100 35 100 90s-50 100-105 100-95-45-95-100 45-90 100-90z" />
            <path d="M350 270c28 0 52 18 52 44s-26 52-54 52-48-24-48-52 24-44 50-44z" />
            <path d="M-20 600c140-50 250 30 380-10s230-80 360-20" />
            <path d="M-20 650c140-50 250 30 380-10s230-80 360-20" />
            <path d="M-20 40c160 30 270-30 400 10s200 40 340 0" />
            <path d="M-20 85c160 30 270-30 400 10s200 40 340 0" />
          </g>
        </pattern>
        <pattern id="dots" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
          <circle cx=".8" cy=".8" r=".38" fill="#33456b" />
        </pattern>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6F432" stopOpacity=".35" />
          <stop offset="1" stopColor="#C6F432" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Topo({ opacity = 0.6, style }: { opacity?: number; style?: React.CSSProperties }) {
  return (
    <svg className="topo" style={{ opacity, ...style }} aria-hidden>
      <rect width="100%" height="100%" fill="url(#topo)" />
    </svg>
  );
}
