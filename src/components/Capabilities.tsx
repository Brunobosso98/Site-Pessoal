import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Bot, Braces, Check, Database, Network, Workflow } from "lucide-react";
import { useMotionExperience } from "@/hooks/use-motion-experience";
import { useIsMobile } from "@/hooks/use-mobile";

const capabilities = [
  {
    icon: Braces,
    title: "Produtos full-stack",
    short: "Da ideia à experiência",
    headline: "Seu próximo produto, construído por inteiro.",
    body: "Conecto decisões de produto e engenharia para transformar uma necessidade em software que a equipe consegue usar e evoluir.",
    deliverables: [
      "Arquitetura e modelo de dados",
      "Interfaces, APIs e permissões",
      "Deploy, documentação e evolução",
    ],
    layers: ["Experiência", "Regras de negócio", "APIs & serviços", "Dados & infraestrutura"],
    highlight: 0,
    project: "Game Day Nexus",
    slug: "game-day-nexus",
    note: "Produto multi-tenant em operação",
  },
  {
    icon: Workflow,
    title: "Automação operacional",
    short: "Tempo de volta para a equipe",
    headline: "A rotina roda. Sua equipe cuida do que importa.",
    body: "Transformo tarefas repetitivas em rotinas confiáveis. Coleta, processamento e entrega com visibilidade sobre o que funcionou e o que precisa de atenção.",
    deliverables: [
      "Rotinas agendadas e robôs",
      "Retentativas e tratamento de falhas",
      "Relatórios de execução e exceções",
    ],
    layers: ["Entrega organizada", "Execução & revisão", "Agendamentos", "Sistemas de origem"],
    highlight: 1,
    project: "Robô Paris",
    slug: "robo-paris",
    note: "Automação de rotinas financeiras",
  },
  {
    icon: Network,
    title: "Integrações & APIs",
    short: "Sistemas que se entendem",
    headline: "Menos ilhas de informação. Mais operação conectada.",
    body: "Integro ERPs, plataformas e ferramentas internas com contratos claros, validação e rastreabilidade em cada conexão.",
    deliverables: [
      "APIs, webhooks e adaptadores",
      "Filas e processamento de eventos",
      "Sincronização e observabilidade",
    ],
    layers: ["Operação conectada", "Contratos & validação", "APIs & eventos", "Sistemas de origem"],
    highlight: 2,
    project: "SaaS-SIEG",
    slug: "saas-sieg",
    note: "Integração entre plataformas",
  },
  {
    icon: Bot,
    title: "IA aplicada ao trabalho",
    short: "Contexto antes da resposta",
    headline: "Inteligência útil, com fontes e limites claros.",
    body: "Construo assistentes que consultam ferramentas e fontes autorizadas. A resposta vem acompanhada de contexto, evidências e respeito ao escopo de acesso.",
    deliverables: [
      "RAG e busca em fontes versionadas",
      "Ferramentas com acesso controlado",
      "Evidências e limites de custo",
    ],
    layers: [
      "Resposta com fontes",
      "Contexto & ferramentas",
      "Busca & evidências",
      "Conhecimento autorizado",
    ],
    highlight: 1,
    project: "Argos / INTTAX Reforma",
    slug: "inttax-reforma",
    note: "Assistente analítico com evidências",
  },
  {
    icon: Database,
    title: "Tecnologia fiscal",
    short: "Domínio que vira software",
    headline: "Regras complexas. Uma experiência clara.",
    body: "Traduzo rotinas fiscais e contábeis em produtos utilizáveis. Da leitura de XML e SPED ao cruzamento documental e à análise que apoia a revisão humana.",
    deliverables: [
      "Ingestão de XML e SPED",
      "Cruzamento e auditoria documental",
      "Análises e relatórios rastreáveis",
    ],
    layers: ["Análise & consultoria", "Regras do domínio", "Cruzamento documental", "XML & SPED"],
    highlight: 3,
    project: "INTTAX Fiscal",
    slug: "inttax-fiscal",
    note: "Engenharia com conhecimento de domínio",
  },
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const { staticMotion } = useMotionExperience();
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const selected = capabilities[active];
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % capabilities.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index + capabilities.length - 1) % capabilities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = capabilities.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };
  return (
    <section id="capacidades" className="capability-studio" aria-labelledby={`${id}-title`}>
      <div className="capability-heading">
        <div>
          <p className="section-caption">Como posso contribuir</p>
          <h2 id={`${id}-title`}>
            A visão do todo.
            <br />
            <span className="text-cyan">O cuidado em cada camada.</span>
          </h2>
        </div>
        <p>
          Entendo o negócio, desenho a solução e construo com você. Para tirar uma ideia do papel ou
          dar o próximo passo em um produto que já existe.
        </p>
      </div>
      <div className="capability-workspace">
        <div
          ref={listRef}
          className="capability-tabs"
          role="tablist"
          aria-label="Áreas de contribuição"
          aria-orientation={isMobile ? "horizontal" : "vertical"}
        >
          {capabilities.map((capability, index) => (
            <button
              key={capability.title}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`${id}-panel`}
              tabIndex={active === index ? 0 : -1}
              onKeyDown={(event) => keyboard(event, index)}
              onClick={() => setActive(index)}
            >
              <capability.icon size={21} strokeWidth={1.4} />
              <span>
                {capability.title}
                <small>{capability.short}</small>
              </span>
              <ArrowUpRight size={17} />
              {active === index && (
                <motion.i
                  className="capability-selection"
                  layoutId={`${id}-selection`}
                  transition={{ duration: staticMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
        <div
          className="capability-detail"
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
        >
          <div className="capability-model" aria-hidden="true">
            <div className="model-orbit" />
            <div className="model-stack">
              {selected.layers.map((label, index) => (
                <motion.div
                  key={index}
                  className="model-layer"
                  data-highlight={selected.highlight === index}
                  style={{ zIndex: selected.highlight === index ? 5 : 4 - index }}
                  initial={false}
                  animate={{
                    y: selected.highlight === index ? -12 : 0,
                    x: selected.highlight === index ? 12 : 0,
                    z: selected.highlight === index ? 40 : 0,
                  }}
                  transition={{ duration: staticMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{label}</span>
                  <i />
                  <i />
                  <i />
                </motion.div>
              ))}
            </div>
            <span className="model-annotation">
              {selected.layers[selected.highlight]}
              <span>Engenharia de ponta a ponta</span>
            </span>
          </div>
          <div className="capability-description">
            <h3>{selected.headline}</h3>
            <p>{selected.body}</p>
            <ul>
              {selected.deliverables.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link className="capability-proof" to="/projetos" hash={`projeto-${selected.slug}`}>
            <span>
              <small>Veja na prática · {selected.note}</small>
              {selected.project}
            </span>
            <ArrowUpRight size={21} />
          </Link>
        </div>
      </div>
      <div className="capability-closing">
        <span>Profundidade técnica. Proximidade com quem decide.</span>
        <a href="#contato">
          Vamos pensar no seu projeto <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
