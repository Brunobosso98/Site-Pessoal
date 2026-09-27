import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Fingerprint,
  FolderOpen,
  LockKeyhole,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useMotionExperience } from "@/hooks/use-motion-experience";

export type ProjectKind = "audit" | "reform" | "banking" | "nexus" | "integration";
const stories = {
  audit: {
    name: "INTTAX Fiscal",
    label: "Inteligência documental",
    steps: ["Receber", "Cruzar", "Verificar", "Evidenciar"],
    captions: [
      "Documentos diferentes. Uma base para auditar.",
      "Notas e escrituração se encontram no mesmo contexto.",
      "Divergências em destaque, prontas para revisão humana.",
      "Cada conclusão pode ser rastreada até sua origem.",
    ],
  },
  reform: {
    name: "INTTAX Reforma",
    label: "Explorador de cenários",
    steps: ["Base", "Crédito", "Margem", "Cenário"],
    captions: [
      "Uma base fiscal para comparar caminhos.",
      "Créditos entram na leitura do cenário.",
      "Custo e margem analisados em conjunto.",
      "Arraste o controle e explore a composição ilustrativa.",
    ],
  },
  banking: {
    name: "Robô Paris",
    label: "Mesa de operação",
    steps: ["Agenda", "Execução", "Revisão", "Entrega"],
    captions: [
      "A rotina começa na agenda, sem depender de cliques.",
      "Coletas independentes, coordenadas em uma execução.",
      "Arquivos organizados; exceções separadas para revisão.",
      "Selecione uma empresa para explorar sua entrega.",
    ],
  },
  nexus: {
    name: "Game Day Nexus",
    label: "Gestão de clubes",
    steps: ["Clube", "Elenco", "Equipe", "Acesso"],
    captions: [
      "O clube é o centro da operação.",
      "O elenco conecta a rotina dos departamentos.",
      "Cada equipe enxerga o que precisa para trabalhar.",
      "Explore os departamentos. O contexto do clube é preservado.",
    ],
  },
  integration: {
    name: "SaaS-SIEG",
    label: "Rede de integrações",
    steps: ["Conectar", "Validar", "Sincronizar", "Rastrear"],
    captions: [
      "Sistemas distintos conectados por contratos claros.",
      "Cada integração tem seu próprio adaptador.",
      "Eventos coordenados, com retentativas e rastreabilidade.",
      "Selecione uma conexão para explorar a arquitetura.",
    ],
  },
};
const ease = [0.16, 1, 0.3, 1] as const;
type SceneProps = { phase: number; duration: number; choose: (value: number) => void };

/** Each scene has its own interaction; all records and chart geometry are illustrative. */
export function ProjectArtwork({ kind }: { kind: ProjectKind }) {
  const ref = useRef<HTMLElement>(null);
  const { staticMotion } = useMotionExperience();
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [phase, setPhase] = useState(0);
  const [replay, setReplay] = useState(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 95, damping: 25 });
  const rotateY = useSpring(ry, { stiffness: 95, damping: 25 });
  const running = visible && foreground && playing && !staticMotion;
  const story = stories[kind];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    if (ref.current) observer.observe(ref.current);
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
    const timer = window.setTimeout(() => setPhase((value) => (value + 1) % 4), 4200);
    return () => window.clearTimeout(timer);
  }, [running, phase]);
  const choose = (value: number) => {
    rx.set(0);
    ry.set(0);
    setPlaying(false);
    setPhase(value);
  };
  const props = { phase, duration: staticMotion || !visible || !foreground ? 0 : 0.85, choose };
  return (
    <figure
      ref={ref}
      className={`project-demo experience demo-${kind}`}
      data-running={running}
      data-phase={phase}
      aria-label={`Demonstração: ${story.name}`}
      onPointerMove={(event) => {
        if (staticMotion || !playing || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        rx.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 5);
        ry.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div className="experience-topline">
        <span>
          <i />
          {story.name}
        </span>
        <span>{story.label}</span>
      </div>
      <motion.div
        key={replay}
        className="experience-scene"
        style={staticMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      >
        {kind === "audit" ? (
          <Audit {...props} />
        ) : kind === "reform" ? (
          <Reform {...props} />
        ) : kind === "banking" ? (
          <Banking {...props} />
        ) : kind === "nexus" ? (
          <Nexus {...props} />
        ) : (
          <Integration {...props} />
        )}
      </motion.div>
      <figcaption className="experience-caption" aria-live={playing ? "off" : "polite"}>
        <span>{String(phase + 1).padStart(2, "0")}</span>
        {story.captions[phase]}
      </figcaption>
      <div className="experience-controls">
        <div className="experience-steps" aria-label={`Etapas de ${story.name}`}>
          {story.steps.map((step, index) => (
            <button
              type="button"
              key={step}
              aria-pressed={phase === index}
              onClick={() => choose(index)}
            >
              <span className="experience-rail">
                {phase === index && <i key={`${phase}-${running}`} />}
              </span>
              {step}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="experience-play"
          disabled={staticMotion}
          aria-label={`${playing ? "Pausar" : "Reproduzir"} demonstração: ${story.name}`}
          onClick={() => {
            rx.set(0);
            ry.set(0);
            setPlaying(!playing);
          }}
        >
          {playing && !staticMotion ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          type="button"
          className="experience-replay"
          aria-label={`Reiniciar demonstração: ${story.name}`}
          onClick={() => {
            setPhase(0);
            setPlaying(true);
            setReplay((value) => value + 1);
          }}
        >
          <RotateCcw size={15} />
        </button>
      </div>
      <span className="experience-note">Experiência interativa · dados ilustrativos</span>
    </figure>
  );
}

function Audit({ phase, duration, choose }: SceneProps) {
  return (
    <div className="audit-scene">
      <div className="scene-heading">
        <span>
          Entre o dado
          <br />
          <strong>e a evidência.</strong>
        </span>
        <Fingerprint size={32} strokeWidth={1} />
      </div>
      <div className="audit-workbench">
        <div className="audit-files" aria-hidden="true">
          {["SPED", "NF-e", "XML"].map((label, index) => (
            <motion.div
              key={label}
              className="audit-file"
              initial={false}
              animate={{
                x: phase > 0 ? index * 9 : index * 17,
                y: phase > 0 ? -index * 12 : -index * 15,
                rotate: phase > 0 ? index * -3 : index * -8,
              }}
              transition={{ duration, ease }}
            >
              <FileText size={21} strokeWidth={1.2} />
              <span>{label}</span>
              <i />
              <i />
              <i />
              <small>documento de origem</small>
            </motion.div>
          ))}
        </div>
        <div className="audit-bridge" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>matching</span>
        </div>
        <div className="audit-ledger">
          <div className="ledger-heading">
            <span>Revisão documental</span>
            <ShieldCheck size={16} />
          </div>
          {["Identificação", "Escrituração", "Crédito fiscal"].map((row, index) => (
            <motion.div
              key={row}
              className="ledger-row"
              initial={false}
              animate={{
                opacity: phase > index || phase === 3 ? 1 : 0.8,
                x: phase > index ? 0 : 5,
              }}
              transition={{ duration, ease, delay: duration ? index * 0.08 : 0 }}
            >
              <span>{row}</span>
              {phase >= 2 && index === 1 ? (
                <span className="review-dot">Revisar</span>
              ) : (
                <Check size={14} />
              )}
            </motion.div>
          ))}
          <div className="audit-evidence">
            <i />
            <span>
              {phase === 3 ? "Origem vinculada ao relatório" : "Rastreabilidade documental"}
            </span>
          </div>
          <div className="audit-scan" aria-hidden="true" />
        </div>
      </div>
      <button className="scene-action" type="button" onClick={() => choose(phase === 3 ? 0 : 3)}>
        {phase === 3 ? "Rever documentos" : "Revelar evidências"}
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function Reform({ phase, duration, choose }: SceneProps) {
  const [customScenario, setScenario] = useState<number | null>(null);
  const scenario = customScenario ?? [25, 65, 90, 45][phase];
  const id = useId();
  const level = scenario / 100;
  const curve = `M 0 165 C 65 165 72 ${158 - level * 20} 130 ${153 - level * 35} S 218 ${150 - level * 75} 272 ${135 - level * 95} S 370 ${125 - level * 115} 450 ${105 - level * 90}`;
  return (
    <div className="reform-scene">
      <div className="scene-heading">
        <span>
          Um cenário muda.
          <br />
          <strong>A visão acompanha.</strong>
        </span>
        <span className="scenario-badge">IBS / CBS</span>
      </div>
      <div className="scenario-legend">
        <span>
          <i />
          Cenário explorado
        </span>
        <span>
          <i />
          Referência
        </span>
      </div>
      <div className="scenario-chart" aria-hidden="true">
        <svg viewBox="0 0 450 200" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="currentColor" stopOpacity=".24" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 85, 130, 175].map((y) => (
            <path key={y} d={`M0 ${y}H450`} stroke="currentColor" strokeOpacity=".1" />
          ))}
          <path
            d="M0 165C85 160 115 141 180 145S300 98 450 90"
            stroke="currentColor"
            strokeOpacity=".35"
            strokeDasharray="5 6"
          />
          <motion.path
            initial={false}
            animate={{ d: `${curve} L450 200H0Z` }}
            transition={{ duration: duration * 0.45, ease }}
            fill={`url(#${id})`}
          />
          <motion.path
            initial={false}
            animate={{ d: curve }}
            transition={{ duration: duration * 0.45, ease }}
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <motion.circle
            initial={false}
            animate={{ cx: 449, cy: 105 - level * 90 }}
            transition={{ duration: duration * 0.45, ease }}
            r="5"
            fill="currentColor"
          />
          <path
            className="chart-tracer"
            d={curve}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1 560"
          />
        </svg>
        <span className="chart-axis">Base fiscal</span>
        <span className="chart-axis">Composição do cenário</span>
      </div>
      <div className="scenario-factors">
        {["Custo", "Crédito", "Margem"].map((label, index) => (
          <button
            type="button"
            key={label}
            aria-pressed={phase === index + 1}
            onClick={() => {
              setScenario([25, 65, 90][index]);
              choose(index + 1);
            }}
          >
            <span>{label}</span>
            <span className="factor-track">
              <motion.i
                initial={false}
                animate={{
                  scaleX: [0.75 - level * 0.25, 0.2 + level * 0.7, 0.35 + level * 0.55][index],
                }}
                transition={{ duration: duration * 0.5, ease }}
              />
            </span>
          </button>
        ))}
      </div>
      <label className="scenario-slider">
        <span>
          Explore o cenário <span>Arraste para comparar ↔</span>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={scenario}
          aria-label="Composição ilustrativa do cenário tributário"
          aria-valuetext={`Posição ${scenario} de 100, composição ilustrativa`}
          onChange={(event) => {
            setScenario(Number(event.target.value));
            choose(3);
          }}
        />
      </label>
    </div>
  );
}

function Banking({ phase, duration, choose }: SceneProps) {
  const [customCompany, setCompany] = useState<number | null>(null);
  const company = customCompany ?? Math.min(phase, 2);
  return (
    <div className="banking-scene">
      <div className="scene-heading">
        <span>
          A operação continua.
          <br />
          <strong>Sem o trabalho repetitivo.</strong>
        </span>
        <span className="desk-clock">
          06:00<small>rotina agendada</small>
        </span>
      </div>
      <div className="bank-desk">
        <div className="bank-schedule">
          <span className="desk-label">Fila de execução</span>
          {["Empresa A", "Empresa B", "Empresa C"].map((label, index) => (
            <button
              type="button"
              key={label}
              aria-pressed={company === index}
              onClick={() => {
                setCompany(index);
                choose(3);
              }}
            >
              <span className="company-monogram">{label.slice(-1)}</span>
              <span>
                {label}
                <small>{phase > index ? "Coleta concluída" : "Rotina programada"}</small>
              </span>
              {company === index ? <ArrowUpRight size={14} /> : <span className="queue-dot" />}
            </button>
          ))}
        </div>
        <div className="bank-delivery">
          <div className="folder-sculpture" aria-hidden="true">
            <div className="folder-back" />
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="bank-paper"
                initial={false}
                animate={{
                  y: phase >= 2 ? -12 - index * 13 : -40 - index * 13,
                  rotate: (index - 1) * (phase >= 2 ? 5 : 12),
                  x: (index - 1) * (phase >= 2 ? 9 : 16),
                }}
                transition={{ duration, ease, delay: duration ? index * 0.1 : 0 }}
              >
                <span>{["OFX", "PDF", "CSV"][index]}</span>
                <i />
                <i />
              </motion.div>
            ))}
            <div className="folder-front">
              <FolderOpen size={24} strokeWidth={1} />
              <span>EMPRESA {String.fromCharCode(65 + company)}</span>
            </div>
          </div>
          <span className="delivery-label">Extratos por período</span>
          <span className="delivery-status">
            <Check size={12} />
            {phase >= 2 ? "Disponíveis para análise" : "Coleta e organização"}
          </span>
        </div>
      </div>
      <div className="desk-footer">
        <span>
          <i />
          {phase === 2 ? "Exceções separadas para revisão" : "Execução independente por empresa"}
        </span>
        <LockKeyhole size={13} />
      </div>
    </div>
  );
}

const departments = ["Técnico", "Médico", "Financeiro"];
const formations = [
  [
    [50, 82],
    [20, 63],
    [42, 62],
    [63, 62],
    [81, 63],
    [31, 43],
    [53, 44],
    [73, 43],
    [22, 22],
    [50, 17],
    [78, 22],
  ],
  [
    [50, 80],
    [22, 62],
    [43, 59],
    [65, 59],
    [80, 62],
    [28, 39],
    [52, 40],
    [75, 39],
    [29, 20],
    [53, 16],
    [76, 20],
  ],
  [
    [50, 82],
    [18, 61],
    [39, 65],
    [62, 65],
    [82, 61],
    [35, 43],
    [64, 43],
    [20, 25],
    [50, 30],
    [80, 25],
    [50, 12],
  ],
];
function Nexus({ phase, duration, choose }: SceneProps) {
  const [customDepartment, setDepartment] = useState<number | null>(null);
  const department = customDepartment ?? [0, 0, 1, 2][phase];
  const [club, setClub] = useState(0);
  const positions = formations[department];
  return (
    <div className="nexus-scene">
      <div className="scene-heading">
        <span>
          Um clube inteiro.
          <br />
          <strong>Na mesma jogada.</strong>
        </span>
        <button
          type="button"
          className="club-switch"
          aria-label="Alternar clube demonstrativo"
          onClick={() => {
            setClub((value) => 1 - value);
            choose(3);
          }}
        >
          Clube {club ? "B" : "A"}
          <span>⇄</span>
        </button>
      </div>
      <div className="club-world">
        <div className="pitch-perspective" aria-hidden="true">
          <div className="football-pitch">
            <div className="pitch-half" />
            <div className="pitch-circle" />
            <div className="pitch-box pitch-box-top" />
            <div className="pitch-box pitch-box-bottom" />
            {positions.map(([x, y], index) => (
              <motion.span
                key={index}
                className={`player-node ${department === 1 && index === 8 ? "player-review" : ""}`}
                initial={false}
                animate={{
                  left: `${club ? 100 - x : x}%`,
                  top: `${y}%`,
                  scale: phase === 1 && index % 3 === 0 ? 1.22 : 1,
                }}
                transition={{ duration, ease, delay: duration ? index * 0.02 : 0 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            ))}
            <div className="pitch-sweep" />
          </div>
        </div>
        <div className="club-context">
          <span className="club-context-icon">
            {department === 0 ? "↗" : department === 1 ? "+" : "$"}
          </span>
          <strong>{["Visão do elenco", "Saúde do atleta", "Gestão financeira"][department]}</strong>
          <span>
            {
              ["Treinos e escalação", "Acompanhamento da equipe", "Rotina do departamento"][
                department
              ]
            }
          </span>
          <small>
            <LockKeyhole size={11} />
            Clube {club ? "B" : "A"} · acesso por função
          </small>
        </div>
      </div>
      <div className="department-switch" aria-label="Departamento do clube">
        {departments.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={department === index}
            onClick={() => {
              setDepartment(index);
              choose(2);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Integration({ phase, duration, choose }: SceneProps) {
  const [selected, setSelected] = useState(0);
  const labels = ["ERP", "API", "Fiscal", "CRM", "Eventos", "Arquivos"];
  return (
    <div className="integration-scene">
      <div className="scene-heading">
        <span>
          Sistemas diferentes.
          <br />
          <strong>Uma operação conectada.</strong>
        </span>
        <ShieldCheck size={28} strokeWidth={1} />
      </div>
      <div className="integration-orbit">
        <svg viewBox="0 0 460 240" fill="none" aria-hidden="true">
          {labels.map((_, index) => {
            const angle = (index * Math.PI) / 3;
            const x = 230 + Math.cos(angle) * 168;
            const y = 120 + Math.sin(angle) * 90;
            return (
              <g key={index}>
                <path
                  d={`M230 120Q${x} 120 ${x} ${y}`}
                  stroke="currentColor"
                  strokeOpacity={selected === index ? 0.8 : 0.15}
                />
                <path
                  className="integration-packet"
                  style={{ animationDelay: `${index * -0.6}s` }}
                  d={`M230 120Q${x} 120 ${x} ${y}`}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="4 240"
                />
              </g>
            );
          })}
        </svg>
        <motion.div
          className="integration-core"
          initial={false}
          animate={{ rotate: phase * 90 }}
          transition={{ duration, ease }}
        >
          <i />
          <i />
          <i />
          <i />
        </motion.div>
        <span className="integration-core-label">SIEG</span>
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            className="integration-node"
            style={
              {
                "--node-x": `${50 + Math.cos((index * Math.PI) / 3) * 36.5}%`,
                "--node-y": `${50 + Math.sin((index * Math.PI) / 3) * 37.5}%`,
              } as CSSProperties
            }
            aria-pressed={selected === index}
            onClick={() => {
              setSelected(index);
              choose(3);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="desk-footer">
        <span>
          <i />
          {labels[selected]} · contrato validado · eventos rastreáveis
        </span>
        <Check size={14} />
      </div>
    </div>
  );
}
