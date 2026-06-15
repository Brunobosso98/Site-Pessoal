import { motion, useReducedMotion } from "motion/react";

// Nodes laid out as an automation map: APIs -> Queues -> Services -> Outcomes
const nodes = [
  { id: "webhook", x: 60, y: 80, label: "Webhook", kind: "in" },
  { id: "api", x: 60, y: 200, label: "API", kind: "in" },
  { id: "form", x: 60, y: 320, label: "Form", kind: "in" },

  { id: "queue", x: 280, y: 140, label: "Queue", kind: "core" },
  { id: "router", x: 280, y: 260, label: "Router", kind: "core" },

  { id: "ai", x: 500, y: 80, label: "AI Agent", kind: "service" },
  { id: "db", x: 500, y: 200, label: "Postgres", kind: "service" },
  { id: "crm", x: 500, y: 320, label: "CRM", kind: "service" },

  { id: "out", x: 720, y: 200, label: "Cliente", kind: "out" },
] as const;

const links: [string, string][] = [
  ["webhook", "queue"],
  ["api", "queue"],
  ["api", "router"],
  ["form", "router"],
  ["queue", "ai"],
  ["queue", "db"],
  ["router", "db"],
  ["router", "crm"],
  ["ai", "out"],
  ["db", "out"],
  ["crm", "out"],
];

const colorFor = (kind: string) => {
  if (kind === "in") return "var(--cyan)";
  if (kind === "core") return "var(--lime)";
  if (kind === "service") return "var(--cyan-glow)";
  return "var(--coral)";
};

export function AutomationMap() {
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n] as const));

  return (
    <svg
      viewBox="0 0 800 400"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {links.map(([a, b], i) => {
        const A = byId[a];
        const B = byId[b];
        const mx = (A.x + B.x) / 2;
        const d = `M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`;
        return (
          <g key={`${a}-${b}`}>
            <path d={d} stroke="oklch(1 0 0 / 8%)" strokeWidth="1" fill="none" />
            <path
              d={d}
              stroke="var(--cyan)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6 10"
              style={{
                animation: reduce ? undefined : `dash-flow ${4 + (i % 3)}s linear infinite`,
                opacity: 0.55,
              }}
            />
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
        >
          <circle cx={n.x} cy={n.y} r="28" fill="url(#nodeGlow)" />
          <circle
            cx={n.x}
            cy={n.y}
            r="10"
            fill="var(--graphite)"
            stroke={colorFor(n.kind)}
            strokeWidth="1.5"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="3.5"
            fill={colorFor(n.kind)}
            style={{
              animation: reduce ? undefined : `pulse-dot ${2 + (i % 4) * 0.3}s ease-in-out infinite`,
              transformOrigin: `${n.x}px ${n.y}px`,
            }}
          />
          <text
            x={n.x}
            y={n.y + 28}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="oklch(0.85 0.01 250)"
            letterSpacing="0.05em"
          >
            {n.label.toUpperCase()}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}