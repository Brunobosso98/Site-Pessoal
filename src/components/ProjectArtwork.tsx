import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useMotionExperience } from "@/hooks/use-motion-experience";

export type ProjectKind = "audit" | "reform" | "banking" | "nexus";
const stories = {
  audit: {
    name: "INTTAX / Auditoria fiscal",
    steps: ["Documentos", "Cruzamento", "Auditoria", "Relatório"],
    captions: [
      "XMLs e SPEDs entram no mesmo fluxo.",
      "O INTTAX cruza documentos e identifica produtos.",
      "Inconsistências são sinalizadas para revisão.",
      "A auditoria vira relatório com evidências.",
    ],
  },
  reform: {
    name: "INTTAX / Reforma Tributária",
    steps: ["Base fiscal", "Cenários", "Impactos", "Consultoria"],
    captions: [
      "Documentos e dados da empresa formam a base.",
      "O motor fiscal calcula cenários comparáveis.",
      "Custo, crédito e margem ganham contexto.",
      "O escritório transforma análise em consultoria.",
    ],
  },
  banking: {
    name: "Robô Paris / Operação financeira",
    steps: ["Empresas", "Coleta", "Organização", "Entrega"],
    captions: [
      "Uma rotina atende múltiplas empresas e bancos.",
      "O robô acessa o portal e coleta os extratos.",
      "Cada arquivo encontra sua empresa e período.",
      "Extratos organizados. Exceções para revisão.",
    ],
  },
  nexus: {
    name: "Game Day Nexus / Gestão de clubes",
    steps: ["Acesso", "Permissões", "Operação", "Isolamento"],
    captions: [
      "O usuário entra no contexto do seu clube.",
      "A função determina o acesso a cada departamento.",
      "Médico, técnico e financeiro trabalham conectados.",
      "Cada clube opera com seus próprios dados.",
    ],
  },
} satisfies Record<ProjectKind, { name: string; steps: string[]; captions: string[] }>;
const ease = [0.16, 1, 0.3, 1] as const;

/** A controllable process demonstration. All documents and diagrams are illustrative. */
export function ProjectArtwork({ kind }: { kind: ProjectKind }) {
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const { staticMotion } = useMotionExperience();
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [phase, setPhase] = useState(3);
  const running = visible && foreground && playing && !staticMotion;
  const story = stories[kind];
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(ref.current);
    const visibility = () => setForeground(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setPhase((value) => (value + 1) % 4), 3000);
    return () => window.clearTimeout(timer);
  }, [running, phase]);
  const duration = staticMotion ? 0 : 0.85;
  return (
    <figure
      ref={ref}
      className={"project-demo demo-" + kind}
      data-running={running}
      data-phase={phase}
      aria-label={"Demonstração: " + story.name}
    >
      <div className="demo-topline">
        <span>
          <i />
          {story.name}
        </span>
        <span className="demo-notation">Visão do sistema</span>
      </div>
      <div className="demo-stage">
        <svg viewBox="0 0 760 430" fill="none" aria-hidden="true" className="demo-svg">
          <defs>
            <pattern id={id + "grid"} width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".7" fill="currentColor" opacity=".15" />
            </pattern>
            <linearGradient id={id + "line"}>
              <stop stopColor="currentColor" stopOpacity="0" />
              <stop offset=".5" stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".15" />
            </linearGradient>
          </defs>
          <rect width="760" height="430" fill={"url(#" + id + "grid)"} />
          {kind === "audit" ? (
            <Audit phase={phase} running={running} duration={duration} />
          ) : kind === "reform" ? (
            <Reform phase={phase} running={running} duration={duration} />
          ) : kind === "banking" ? (
            <Banking phase={phase} running={running} duration={duration} />
          ) : (
            <Nexus phase={phase} running={running} duration={duration} />
          )}
        </svg>
      </div>
      <figcaption className="demo-caption" aria-live={playing ? "off" : "polite"}>
        <span className="demo-phase-number">0{phase + 1}</span>
        <span>{story.captions[phase]}</span>
      </figcaption>
      <div className="demo-controls">
        <div className="demo-steps" aria-label={"Etapas de " + story.name}>
          {story.steps.map((step, index) => (
            <button
              type="button"
              key={step}
              aria-pressed={phase === index}
              onClick={() => {
                setPlaying(false);
                setPhase(index);
              }}
            >
              <span className="demo-step-rail">
                {phase === index && (
                  <motion.i
                    key={phase + String(running)}
                    initial={false}
                    animate={{ scaleX: running ? [0, 1] : 1 }}
                    transition={{ duration: running ? 3 : 0, ease: "linear" }}
                  />
                )}
              </span>
              <span>{step}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="demo-play"
          disabled={staticMotion}
          aria-label={(playing ? "Pausar" : "Reproduzir") + " demonstração: " + story.name}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          type="button"
          className="demo-replay"
          aria-label={"Reiniciar demonstração: " + story.name}
          onClick={() => {
            setPhase(0);
            setPlaying(true);
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>
      <span className="demo-disclaimer">Demonstração ilustrativa · sem dados de clientes</span>
    </figure>
  );
}

type SceneProps = { phase: number; running: boolean; duration: number };
function Label({
  x,
  y,
  children,
  className = "",
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  className?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={"diagram-label " + className}>
      {children}
    </text>
  );
}
function Check({ x, y, active = true }: { x: number; y: number; active?: boolean }) {
  const { staticMotion } = useMotionExperience();
  return (
    <g transform={"translate(" + x + " " + y + ")"} opacity={active ? 1 : 0.22}>
      <circle r="10" fill="currentColor" opacity=".15" />
      <motion.path
        d="m-4 0 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: staticMotion ? 0 : 0.55, ease }}
      />
    </g>
  );
}
function Packet({
  points,
  running,
  delay = 0,
}: {
  points: [number, number][];
  running: boolean;
  delay?: number;
}) {
  return (
    <motion.circle
      r="3.5"
      fill="currentColor"
      initial={false}
      animate={
        running
          ? { cx: points.map((p) => p[0]), cy: points.map((p) => p[1]), opacity: [0, 1, 1, 0] }
          : { cx: points[0][0], cy: points[0][1], opacity: 0 }
      }
      transition={
        running ? { duration: 2, delay, repeat: Infinity, ease: "linear" } : { duration: 0 }
      }
    />
  );
}
function Engine({
  x = 380,
  y = 212,
  name,
  subtitle,
  active,
  running,
}: {
  x?: number;
  y?: number;
  name: string;
  subtitle: string;
  active: boolean;
  running: boolean;
}) {
  return (
    <g transform={"translate(" + x + " " + y + ")"}>
      <circle r="106" stroke="currentColor" strokeOpacity=".08" />
      <circle
        r="94"
        stroke="currentColor"
        strokeOpacity=".18"
        strokeDasharray="2 9"
        className={running ? "engine-dial" : ""}
      />
      <rect
        x="-77"
        y="-70"
        width="154"
        height="154"
        rx="18"
        fill="currentColor"
        opacity=".025"
        transform="rotate(-8)"
      />
      <rect x="-74" y="-74" width="148" height="148" rx="15" className="diagram-panel" />
      <rect
        x="-63"
        y="-63"
        width="126"
        height="126"
        rx="9"
        stroke="currentColor"
        strokeOpacity={active ? 0.65 : 0.2}
      />
      {[-42, -21, 0, 21, 42].map((n) => (
        <g key={n} stroke="currentColor" strokeOpacity=".3">
          <path d={"M-84 " + n + "h10M74 " + n + "h10M" + n + " -84v10M" + n + " 74v10"} />
        </g>
      ))}
      <path
        d="m-17-23 9 9 17-19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={active ? 1 : 0.5}
      />
      <Label x={0} y={17} anchor="middle" className="engine-name">
        {name}
      </Label>
      <Label x={0} y={43} anchor="middle" className="micro-label">
        {subtitle}
      </Label>
      {active && (
        <rect
          x="-62"
          y="-61"
          width="124"
          height="2"
          fill="currentColor"
          opacity=".6"
          className={running ? "engine-scan" : ""}
        />
      )}
    </g>
  );
}
function FiscalDocument({
  x,
  y,
  label,
  moving,
  duration,
}: {
  x: number;
  y: number;
  label: string;
  moving: boolean;
  duration: number;
}) {
  return (
    <g transform={"translate(" + x + " " + y + ")"}>
      <motion.g
        initial={false}
        animate={{
          x: moving ? 331 - x : 0,
          y: moving ? 148 - y : 0,
          scale: moving ? 0.2 : 1,
          opacity: moving ? 0 : 1,
          rotate: moving ? 12 : -4,
        }}
        transition={{ duration: duration * 1.5, delay: duration ? (y > 200 ? 0.32 : 0) : 0, ease }}
      >
        <path
          d="M0 7a7 7 0 0 1 7-7h69l22 22v100a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7Z"
          className="diagram-panel"
        />
        <path d="M76 0v22h22" stroke="currentColor" strokeOpacity=".5" />
        <Label x={14} y={49} className="document-label">
          {label}
        </Label>
        <path
          d="M14 67h59M14 80h44M14 93h53M14 106h32"
          stroke="currentColor"
          strokeOpacity=".25"
          strokeWidth="2"
        />
      </motion.g>
    </g>
  );
}
function Audit({ phase, running, duration }: SceneProps) {
  return (
    <>
      <Label x={36} y={40} className="diagram-heading">
        Documentos fiscais
      </Label>
      <Label x={546} y={40} className="diagram-heading">
        Auditoria rastreável
      </Label>
      <path
        d="M155 140H202Q228 140 247 175L282 212M155 302H203Q230 302 247 260L282 212M464 212H539"
        className="diagram-route"
      />
      <Packet
        points={[
          [155, 140],
          [206, 140],
          [250, 181],
          [290, 212],
        ]}
        running={running && phase < 2}
      />
      <Packet
        points={[
          [155, 302],
          [206, 302],
          [250, 250],
          [290, 212],
        ]}
        running={running && phase < 2}
        delay={0.6}
      />
      <FiscalDocument
        x={46}
        y={75}
        label="XML"
        moving={phase === 1 || phase === 2}
        duration={duration}
      />
      <FiscalDocument
        x={65}
        y={247}
        label="SPED"
        moving={phase === 1 || phase === 2}
        duration={duration}
      />
      <Engine
        name="INTTAX"
        subtitle={
          phase === 1 ? "matching / ML" : phase === 2 ? "auditoria fiscal" : "motor de auditoria"
        }
        active={phase === 1 || phase === 2}
        running={running}
      />
      <Packet
        points={[
          [464, 212],
          [490, 212],
          [515, 212],
          [540, 212],
        ]}
        running={running && phase >= 2}
      />
      <g transform="translate(540 76)">
        <motion.g
          initial={false}
          animate={{ y: phase === 3 ? 0 : 12, opacity: phase >= 2 ? 1 : 0.32 }}
          transition={{ duration, ease }}
        >
          <rect width="185" height="280" rx="10" className="diagram-report" />
          <path d="M20 46h145" stroke="currentColor" strokeOpacity=".2" />
          <Label x={20} y={29} className="report-title">
            Relatório fiscal
          </Label>
          <Label x={20} y={77} className="micro-label">
            EVIDÊNCIAS
          </Label>
          {["Documentos", "Cruzamentos", "Inconsistências", "Créditos"].map((label, n) => (
            <g key={label}>
              <Check x={26} y={106 + n * 32} active={phase === 3 || (phase === 2 && n < 2)} />
              <Label x={44} y={111 + n * 32} className="report-row">
                {label}
              </Label>
            </g>
          ))}
          <rect
            x="17"
            y="235"
            width="151"
            height="28"
            rx="4"
            fill="currentColor"
            opacity={phase === 3 ? 0.18 : 0.05}
          />
          <Label x={92} y={254} anchor="middle" className="report-status">
            {phase === 3 ? "Pronto para revisão" : "Em processamento"}
          </Label>
        </motion.g>
      </g>
      <Label x={380} y={376} anchor="middle" className="micro-label">
        ENTRADA → CRUZAMENTO → EVIDÊNCIA
      </Label>
    </>
  );
}
function Reform({ phase, running, duration }: SceneProps) {
  return (
    <>
      <Label x={34} y={40} className="diagram-heading">
        Base da empresa
      </Label>
      <Label x={501} y={40} className="diagram-heading">
        Decisão com contexto
      </Label>
      <path
        d="M145 173H211Q240 173 251 195L282 212M145 282H215Q241 282 258 250L282 212M464 212H490"
        className="diagram-route"
      />
      <FiscalDocument x={39} y={103} label="XML" moving={phase === 1} duration={duration} />
      <g transform="translate(52 270)">
        <rect width="107" height="49" rx="6" className="diagram-panel" />
        <Label x={53} y={31} anchor="middle" className="document-label">
          SPED
        </Label>
      </g>
      <Packet
        points={[
          [145, 173],
          [213, 173],
          [252, 193],
          [290, 212],
        ]}
        running={running && phase < 2}
      />
      <Engine
        name="INTTAX"
        subtitle="IBS / CBS"
        active={phase === 1 || phase === 2}
        running={running}
      />
      <g transform="translate(497 77)">
        <rect width="230" height="230" rx="10" className="diagram-report" />
        <Label x={18} y={29} className="report-title">
          Comparar cenários
        </Label>
        <path d="M18 45h194" stroke="currentColor" strokeOpacity=".18" />
        {["Custo", "Crédito", "Margem"].map((label, n) => (
          <g key={label} transform={"translate(18 " + (63 + n * 51) + ")"}>
            <Label x={0} y={13} className="report-row">
              {label}
            </Label>
            <rect x="75" y="0" width="105" height="8" rx="3" fill="currentColor" opacity=".13" />
            <motion.rect
              x="75"
              y="14"
              height="8"
              rx="3"
              fill="currentColor"
              initial={false}
              animate={{
                width: phase >= 2 ? [87, 68, 96][n] : 15,
                opacity: phase >= 2 ? 0.85 : 0.25,
              }}
              transition={{ duration, delay: duration ? n * 0.1 : 0, ease }}
            />
          </g>
        ))}
        <Label x={18} y={215} className="micro-label">
          Cenários ilustrativos, sem valores
        </Label>
      </g>
      <motion.g
        initial={false}
        animate={{ opacity: phase === 3 ? 1 : 0.3, y: phase === 3 ? 0 : 9 }}
        transition={{ duration, ease }}
      >
        <rect x="497" y="325" width="230" height="64" rx="9" className="diagram-panel" />
        <Check x={520} y={348} />
        <Label x={540} y={352} className="report-title">
          Relatório consultivo
        </Label>
        <Label x={515} y={375} className="micro-label">
          Argos · explicações com fontes
        </Label>
      </motion.g>
      <Packet
        points={[
          [464, 212],
          [474, 212],
          [485, 212],
          [495, 212],
        ]}
        running={running && phase >= 2}
      />
      <Label x={340} y={375} anchor="middle" className="micro-label">
        MOTOR CALCULA. ARGOS EXPLICA.
      </Label>
    </>
  );
}
function Banking({ phase, running, duration }: SceneProps) {
  return (
    <>
      <Label x={34} y={40} className="diagram-heading">
        Múltiplas empresas
      </Label>
      <Label x={531} y={40} className="diagram-heading">
        Rotina entregue
      </Label>
      {["Empresa A", "Empresa B", "Empresa C"].map((label, n) => (
        <g key={label} transform={"translate(35 " + (93 + n * 87) + ")"}>
          <rect width="154" height="60" rx="8" className="diagram-panel" />
          <path
            d="m17 25 12-9 12 9M21 29v14m8-14v14m8-14v14M16 45h27"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <Label x={56} y={35} className="report-row">
            {label}
          </Label>
        </g>
      ))}
      <path
        d="M190 122H230Q250 122 262 153L285 212M190 209H285M190 297H230Q250 297 262 265L285 212M464 212H528"
        className="diagram-route"
      />
      {[122, 209, 297].map((y, n) => (
        <Packet
          key={y}
          points={[
            [190, y],
            [230, y],
            [260, (y + 212) / 2],
            [289, 212],
          ]}
          running={running && phase === 1}
          delay={n * 0.3}
        />
      ))}
      <Engine
        name="PARIS"
        subtitle={phase === 1 ? "coletando extratos" : "automação / Python"}
        active={phase === 1 || phase === 2}
        running={running}
      />
      <Packet
        points={[
          [464, 212],
          [485, 212],
          [508, 212],
          [528, 212],
        ]}
        running={running && phase >= 2}
      />
      <g transform="translate(532 100)">
        <rect width="195" height="242" rx="10" className="diagram-report" />
        <Label x={17} y={30} className="report-title">
          Extratos organizados
        </Label>
        <path d="M17 46h160" stroke="currentColor" strokeOpacity=".2" />
        {["empresa / período", "extratos bancários", "relatório de exceções"].map((label, n) => (
          <motion.g
            key={label}
            initial={false}
            animate={{ opacity: phase >= 2 ? 1 : 0.25, x: phase >= 2 ? 0 : 10 }}
            transition={{ duration, delay: duration ? n * 0.15 : 0, ease }}
          >
            <path
              d={"M18 " + (66 + n * 45) + "h13l5 6h16v20H18z"}
              stroke="currentColor"
              strokeOpacity=".6"
            />
            <Label x={61} y={84 + n * 45} className="micro-label">
              {label}
            </Label>
          </motion.g>
        ))}
        <Check x={27} y={218} active={phase === 3} />
        <Label x={45} y={223} className="report-row">
          {phase === 3 ? "Pronto para a equipe" : "Organização por empresa"}
        </Label>
      </g>
      <Label x={380} y={379} anchor="middle" className="micro-label">
        COLETA AUTOMÁTICA. EXCEÇÕES VISÍVEIS.
      </Label>
    </>
  );
}
function Nexus({ phase, running, duration }: SceneProps) {
  return (
    <>
      <Label x={34} y={40} className="diagram-heading">
        Um produto. Vários clubes.
      </Label>
      <Label x={721} y={40} anchor="end" className="diagram-heading">
        Dados isolados por RLS
      </Label>
      <path d="M380 100V139M380 290V315M176 190H286M474 190H584" className="diagram-route" />
      <g transform="translate(274 60)">
        <rect width="212" height="44" rx="22" className="diagram-panel" />
        <circle cx="23" cy="22" r="5" fill="currentColor" />
        <Label x={42} y={28} className="report-row">
          Usuário / clube ativo
        </Label>
      </g>
      <Engine
        y={216}
        name="NEXUS"
        subtitle="permissões / RBAC"
        active={phase === 1 || phase === 2}
        running={running}
      />
      {[
        { x: 30, label: "Clube A", active: true },
        { x: 579, label: "Clube B", active: false },
      ].map((club) => (
        <g key={club.label} transform={"translate(" + club.x + " 129)"}>
          <rect
            width="151"
            height="187"
            rx="12"
            className="diagram-report"
            strokeDasharray={club.active ? undefined : "5 5"}
          />
          <Label x={75} y={32} anchor="middle" className="report-title">
            {club.label}
          </Label>
          {["Técnico", "Médico", "Financeiro"].map((label, n) => (
            <g key={label}>
              <motion.rect
                x="13"
                y={53 + n * 39}
                width="125"
                height="29"
                rx="5"
                fill="currentColor"
                initial={false}
                animate={{ opacity: club.active && phase >= 2 ? 0.15 : 0.035 }}
                transition={{ duration, delay: duration ? n * 0.12 : 0 }}
              />
              <Label x={25} y={73 + n * 39} className="report-row">
                {label}
              </Label>
            </g>
          ))}
        </g>
      ))}
      <Packet
        points={[
          [380, 104],
          [380, 115],
          [380, 129],
          [380, 142],
        ]}
        running={running && phase === 1}
      />
      <Packet
        points={[
          [286, 190],
          [250, 190],
          [210, 190],
          [182, 190],
        ]}
        running={running && phase >= 2}
      />
      <motion.g
        initial={false}
        animate={{ opacity: phase === 3 ? 1 : 0.3, y: phase === 3 ? 0 : 8 }}
        transition={{ duration, ease }}
      >
        <rect x="249" y="336" width="262" height="48" rx="24" className="diagram-panel" />
        <path
          d="M270 355v-4a6 6 0 0 1 12 0v4m-14 0h16v13h-16z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <Label x={295} y={365} className="report-row">
          Acesso limitado ao seu clube
        </Label>
      </motion.g>
    </>
  );
}
