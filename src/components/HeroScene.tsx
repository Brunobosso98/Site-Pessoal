import { motion, useReducedMotion } from "motion/react";

/**
 * Hero scene: the four-stage delivery journey.
 *
 *   01 DOR        — broken client state (scattered, disconnected)
 *   02 DESIGN     — clean architectural diagram emerging
 *   03 IMPLANTE   — same diagram with packets flowing
 *   04 OPERAÇÃO   — simplified live system with active pulse
 *
 * viewBox 800x550 keeps text legible when the card renders at ~600x412
 * (the 16:11 frame on a desktop lg breakpoint). At that scale, 1 viewBox
 * unit = 0.75 screen px, so a 14px label in the SVG = 10.5px on screen,
 * which is the smallest mono label the system uses anywhere.
 */

const STAGE_X = [120, 320, 520, 700] as const;
const VISUAL_CY = 220;

// Stage 1: broken / scattered (no labels — chaos is the point)
const S1_NODES: Array<{ x: number; y: number; r: number; faded?: boolean; alert?: boolean }> = [
  { x: 80, y: 170, r: 4 },
  { x: 120, y: 230, r: 6, alert: true },
  { x: 160, y: 195, r: 4 },
  { x: 145, y: 285, r: 4 },
  { x: 75, y: 270, r: 3, faded: true },
  { x: 170, y: 270, r: 3, faded: true },
];

// Stage 2 / 3: hub-and-spoke
function getS2(cx: number) {
  return {
    input: { x: cx - 60, y: 170, label: "input" },
    api: { x: cx - 60, y: 270, label: "api" },
    core: { x: cx + 10, y: 220, label: "core" },
    out: { x: cx + 60, y: 220, label: "cliente" },
  };
}

const S3_NODES = getS2(520);

// Stage 4: simplified 3-node live system
const S4 = {
  in: { x: 660, y: 220, label: "in" },
  system: { x: 700, y: 220, label: "sistema" },
  out: { x: 740, y: 220, label: "out" },
};

const STAGES = [
  { n: "01", name: "DOR", desc: ["processo travado", "retrabalho · gargalo"] },
  { n: "02", name: "DESIGN", desc: ["mapeio, modelo,", "desenho a solução"] },
  { n: "03", name: "IMPLANTE", desc: ["build em ciclos curtos,", "com teste desde o dia 1"] },
  { n: "04", name: "OPERAÇÃO", desc: ["sistema rodando,", "métrica batendo"] },
];

const TIMELINE_LEFT = 50;
const TIMELINE_RIGHT = 750;
const TIMELINE_Y = 470;

function MonoLabel({
  x,
  y,
  children,
  size = 12,
  fill = "var(--muted-foreground)",
  letterSpacing = "0.04em",
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  letterSpacing?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontFamily="var(--font-mono)"
      fill={fill}
      style={{ letterSpacing }}
    >
      {children}
    </text>
  );
}

function StageEyebrow({ cx, n, name, delay, reduce }: { cx: number; n: string; name: string; delay: number; reduce: boolean }) {
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={cx - 38} y1={42} x2={cx - 22} y2={42} stroke="var(--cyan)" strokeWidth="1" />
      <MonoLabel x={cx - 16} y={46} fill="var(--cyan)" size={12} letterSpacing="0.1em">
        {n}
      </MonoLabel>
      <text
        x={cx + 6}
        y={46}
        textAnchor="start"
        fontSize={18}
        fontFamily="var(--font-display)"
        fontWeight={600}
        fill="var(--foreground)"
        style={{ letterSpacing: "0.04em" }}
      >
        {name}
      </text>
    </motion.g>
  );
}

function StageDescription({ cx, lines, delay, reduce }: { cx: number; lines: string[]; delay: number; reduce: boolean }) {
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay }}
    >
      {lines.map((l, i) => (
        <MonoLabel key={i} x={cx} y={355 + i * 16} size={12} fill="var(--muted-foreground)" letterSpacing="0.02em">
          {l}
        </MonoLabel>
      ))}
    </motion.g>
  );
}

function Stage1({ cx, delay, reduce }: { cx: number; delay: number; reduce: boolean }) {
  // shift S1_NODES to the stage's cx
  const dx = cx - 120;
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay }}
    >
      {/* broken / partially-connected edges */}
      <g fill="none" stroke="var(--coral)">
        <path d={`M ${S1_NODES[0].x + dx} ${S1_NODES[0].y} L ${S1_NODES[1].x + dx} ${S1_NODES[1].y}`} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
        <path d={`M ${S1_NODES[1].x + dx} ${S1_NODES[1].y} L ${S1_NODES[2].x + dx} ${S1_NODES[2].y}`} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <path d={`M ${S1_NODES[3].x + dx} ${S1_NODES[3].y} L ${S1_NODES[4].x + dx} ${S1_NODES[4].y}`} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
        <path d={`M ${S1_NODES[2].x + dx} ${S1_NODES[2].y} L ${S1_NODES[5].x + dx} ${S1_NODES[5].y}`} strokeWidth="1" strokeDasharray="1 4" opacity="0.3" />
      </g>

      {/* nodes */}
      {S1_NODES.map((n, i) => {
        const x = n.x + dx;
        return (
          <g key={i}>
            {n.alert && <circle cx={x} cy={n.y} r={n.r + 5} fill="none" stroke="var(--coral)" strokeWidth="1" opacity="0.5" />}
            <circle
              cx={x}
              cy={n.y}
              r={n.r}
              fill={n.alert ? "var(--coral)" : "var(--graphite)"}
              stroke={n.faded ? "var(--border)" : n.alert ? "var(--coral)" : "var(--muted-foreground)"}
              strokeWidth="1"
              opacity={n.faded ? 0.5 : 1}
            />
          </g>
        );
      })}

      {/* alert label */}
      <MonoLabel x={cx} y={S1_NODES[1].y + 24} size={10} fill="var(--coral)" letterSpacing="0.1em">
        ATENÇÃO
      </MonoLabel>
    </motion.g>
  );
}

function Stage2({ cx, delay, reduce }: { cx: number; delay: number; reduce: boolean }) {
  const n = getS2(cx);
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay }}
    >
      {/* clean dashed cyan edges */}
      <g
        stroke="var(--cyan)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="3 5"
        opacity="0.7"
        style={{
          animation: reduce ? undefined : "dash-flow 5s linear infinite",
        }}
      >
        <path d={`M ${n.input.x} ${n.input.y} C ${n.input.x + 20} ${n.input.y}, ${n.core.x - 20} ${n.core.y}, ${n.core.x} ${n.core.y}`} />
        <path d={`M ${n.api.x} ${n.api.y} C ${n.api.x + 20} ${n.api.y}, ${n.core.x - 20} ${n.core.y}, ${n.core.x} ${n.core.y}`} />
        <path d={`M ${n.core.x} ${n.core.y} L ${n.out.x} ${n.out.y}`} />
      </g>

      <NodeDot x={n.input.x} y={n.input.y} color="var(--cyan)" r={4} />
      <NodeDot x={n.api.x} y={n.api.y} color="var(--cyan)" r={4} />
      <NodeDot x={n.core.x} y={n.core.y} color="var(--cyan-glow)" r={6} halo />
      <NodeDot x={n.out.x} y={n.out.y} color="var(--cyan)" r={4} />

      <MonoLabel x={n.input.x} y={n.input.y - 12} size={10} fill="var(--muted-foreground)">
        {n.input.label}
      </MonoLabel>
      <MonoLabel x={n.api.x} y={n.api.y + 22} size={10} fill="var(--muted-foreground)">
        {n.api.label}
      </MonoLabel>
      <MonoLabel x={n.core.x} y={n.core.y + 22} size={10} fill="var(--cyan)">
        {n.core.label}
      </MonoLabel>
      <MonoLabel x={n.out.x} y={n.out.y - 12} size={10} fill="var(--muted-foreground)">
        {n.out.label}
      </MonoLabel>
    </motion.g>
  );
}

function Stage3({ delay, reduce }: { delay: number; reduce: boolean }) {
  const n = S3_NODES;
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay }}
    >
      <g
        stroke="var(--cyan)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="3 5"
        opacity="0.6"
        style={{
          animation: reduce ? undefined : "dash-flow 4s linear infinite",
        }}
      >
        <path d={`M ${n.input.x} ${n.input.y} C ${n.input.x + 20} ${n.input.y}, ${n.core.x - 20} ${n.core.y}, ${n.core.x} ${n.core.y}`} />
        <path d={`M ${n.api.x} ${n.api.y} C ${n.api.x + 20} ${n.api.y}, ${n.core.x - 20} ${n.core.y}, ${n.core.x} ${n.core.y}`} />
      </g>
      <line x1={n.core.x} y1={n.core.y} x2={n.out.x} y2={n.out.y} stroke="var(--lime)" strokeWidth="1.5" opacity="0.8" />

      <NodeDot x={n.input.x} y={n.input.y} color="var(--cyan)" r={4} />
      <NodeDot x={n.api.x} y={n.api.y} color="var(--cyan)" r={4} />
      <NodeDot x={n.core.x} y={n.core.y} color="var(--lime)" r={6} pulse />
      <NodeDot x={n.out.x} y={n.out.y} color="var(--lime)" r={4} />

      <MonoLabel x={n.input.x} y={n.input.y - 12} size={10} fill="var(--muted-foreground)">
        {n.input.label}
      </MonoLabel>
      <MonoLabel x={n.api.x} y={n.api.y + 22} size={10} fill="var(--muted-foreground)">
        {n.api.label}
      </MonoLabel>
      <MonoLabel x={n.core.x} y={n.core.y + 24} size={10} fill="var(--lime)">
        {n.core.label}
      </MonoLabel>
      <MonoLabel x={n.out.x} y={n.out.y - 12} size={10} fill="var(--lime)">
        {n.out.label}
      </MonoLabel>

      {/* packets */}
      {!reduce && (
        <>
          <Packet from={n.input} to={n.core} color="var(--cyan)" delay={0} duration={2.4} />
          <Packet from={n.api} to={n.core} color="var(--cyan)" delay={1.2} duration={2.4} />
          <Packet from={n.core} to={n.out} color="var(--lime)" delay={0.6} duration={1.6} />
        </>
      )}
      {reduce && (
        <>
          <circle cx={(n.input.x + n.core.x) / 2} cy={(n.input.y + n.core.y) / 2} r="1.5" fill="var(--cyan)" />
          <circle cx={(n.api.x + n.core.x) / 2} cy={(n.api.y + n.core.y) / 2} r="1.5" fill="var(--cyan)" />
          <circle cx={(n.core.x + n.out.x) / 2} cy={(n.core.y + n.out.y) / 2} r="1.5" fill="var(--lime)" />
        </>
      )}
    </motion.g>
  );
}

function Stage4({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay }}
    >
      <line x1={S4.in.x} y1={S4.in.y} x2={S4.system.x} y2={S4.system.y} stroke="var(--lime)" strokeWidth="1.5" opacity="0.7" />
      <line x1={S4.system.x} y1={S4.system.y} x2={S4.out.x} y2={S4.out.y} stroke="var(--lime)" strokeWidth="1.5" opacity="0.7" />

      <NodeDot x={S4.in.x} y={S4.in.y} color="var(--foreground)" r={4} />
      <NodeDot x={S4.system.x} y={S4.system.y} color="var(--lime)" r={9} pulse strong />
      <NodeDot x={S4.out.x} y={S4.out.y} color="var(--foreground)" r={4} />

      <MonoLabel x={S4.in.x} y={S4.in.y - 14} size={10} fill="var(--muted-foreground)">
        {S4.in.label}
      </MonoLabel>
      <MonoLabel x={S4.out.x} y={S4.out.y - 14} size={10} fill="var(--muted-foreground)">
        {S4.out.label}
      </MonoLabel>
      <MonoLabel x={S4.system.x} y={S4.system.y + 28} size={10} fill="var(--lime)" letterSpacing="0.1em">
        ● ATIVO
      </MonoLabel>
    </motion.g>
  );
}

function NodeDot({
  x,
  y,
  color,
  r = 4,
  halo = false,
  pulse = false,
  strong = false,
}: {
  x: number;
  y: number;
  color: string;
  r?: number;
  halo?: boolean;
  pulse?: boolean;
  strong?: boolean;
}) {
  return (
    <g>
      {halo && <circle cx={x} cy={y} r={r + 4} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />}
      <circle cx={x} cy={y} r={r} fill="var(--graphite)" stroke={color} strokeWidth="1.2" />
      {pulse && (
        <motion.circle
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          animate={
            strong
              ? { r: [r, r + 6, r + 12], opacity: [0.8, 0.4, 0] }
              : { r: [r, r + 3, r + 5], opacity: [0.7, 0.3, 0] }
          }
          transition={{ duration: strong ? 2 : 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </g>
  );
}

function Packet({
  from,
  to,
  color,
  delay,
  duration,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.circle
      r="2"
      fill={color}
      filter="url(#packet-glow)"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: [from.x, to.x, to.x],
        cy: [from.y, to.y, to.y],
        opacity: [0, 1, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 550"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="packet-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* stage columns */}
      {STAGES.map((s, i) => {
        const cx = STAGE_X[i];
        return (
          <g key={s.n}>
            <StageEyebrow cx={cx} n={s.n} name={s.name} delay={0.1 + i * 0.12} reduce={!!reduce} />
            {i === 0 && <Stage1 cx={cx} delay={0.15 + i * 0.12} reduce={!!reduce} />}
            {i === 1 && <Stage2 cx={cx} delay={0.15 + i * 0.12} reduce={!!reduce} />}
            {i === 2 && <Stage3 delay={0.15 + i * 0.12} reduce={!!reduce} />}
            {i === 3 && <Stage4 delay={0.15 + i * 0.12} reduce={!!reduce} />}
            <StageDescription cx={cx} lines={s.desc} delay={0.4 + i * 0.12} reduce={!!reduce} />
          </g>
        );
      })}

      {/* progress timeline */}
      <motion.g
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.9 }}
      >
        <line
          x1={TIMELINE_LEFT}
          y1={TIMELINE_Y}
          x2={TIMELINE_RIGHT}
          y2={TIMELINE_Y}
          stroke="var(--border)"
          strokeWidth="1"
        />
        {STAGE_X.map((cx) => (
          <g key={cx}>
            <line x1={cx} y1={TIMELINE_Y - 3} x2={cx} y2={TIMELINE_Y + 3} stroke="var(--border)" strokeWidth="1" />
            <circle cx={cx} cy={TIMELINE_Y} r="1.5" fill="var(--muted-foreground)" opacity="0.6" />
          </g>
        ))}
        {!reduce && (
          <motion.circle
            cy={TIMELINE_Y}
            r="2.5"
            fill="var(--cyan)"
            filter="url(#packet-glow)"
            initial={{ cx: TIMELINE_LEFT }}
            animate={{
              cx: [TIMELINE_LEFT, TIMELINE_RIGHT, TIMELINE_RIGHT, TIMELINE_LEFT, TIMELINE_LEFT],
              opacity: [0, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.55, 0.6, 0.6, 1],
            }}
          />
        )}
        {reduce && <circle cx={TIMELINE_LEFT} cy={TIMELINE_Y} r="2.5" fill="var(--cyan)" />}

        <MonoLabel x={TIMELINE_LEFT} y={TIMELINE_Y + 18} size={10} fill="var(--muted-foreground)" anchor="start">
          briefing
        </MonoLabel>
        <MonoLabel x={TIMELINE_RIGHT} y={TIMELINE_Y + 18} size={10} fill="var(--muted-foreground)" anchor="end">
          operação
        </MonoLabel>
        <MonoLabel
          x={(TIMELINE_LEFT + TIMELINE_RIGHT) / 2}
          y={TIMELINE_Y - 10}
          size={10}
          fill="var(--muted-foreground)"
          letterSpacing="0.06em"
        >
          // entrega · 01 → 04
        </MonoLabel>
      </motion.g>

      {/* corner brackets — frame the canvas as a "console window" */}
      <g stroke="var(--border)" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M 14 14 L 14 24 M 14 14 L 24 14" />
        <path d="M 786 14 L 786 24 M 786 14 L 776 14" />
        <path d="M 14 536 L 14 526 M 14 536 L 24 536" />
        <path d="M 786 536 L 786 526 M 786 536 L 776 536" />
      </g>
    </svg>
  );
}

export default HeroScene;
