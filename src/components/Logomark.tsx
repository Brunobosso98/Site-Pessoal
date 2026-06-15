import type { SVGProps } from "react";

/**
 * Logomark: a 24x24 SVG that reads as a small "console window with a
 * two-node system." Uses the same corner-bracket motif as the Hero scene
 * (src/components/HeroScene.tsx) and the same `var(--cyan)` signal as the
 * rest of the page, so it extends the existing visual language rather than
 * introducing a new mark.
 *
 * Renders inline in the React tree, so CSS variables resolve correctly
 * (the favicon in public/favicon.svg is the same SVG with literal hex
 * values substituted for var(--cyan) and var(--border)).
 */
export function Logomark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeLinecap="square"
        fill="none"
      >
        <path d="M 2 8 L 2 2 L 8 2" />
        <path d="M 16 2 L 22 2 L 22 8" />
        <path d="M 2 16 L 2 22 L 8 22" />
        <path d="M 16 22 L 22 22 L 22 16" />
      </g>

      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12"
        stroke="var(--cyan)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />

      <g
        fill="var(--cyan)"
        style={{ filter: "drop-shadow(0 0 1.5px var(--cyan))" }}
      >
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="12" r="3" />
      </g>
    </svg>
  );
}

export default Logomark;
