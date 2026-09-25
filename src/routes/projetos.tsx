import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Bot,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Network,
  Workflow,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectArtwork, type ProjectKind } from "@/components/ProjectArtwork";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Bruno Martins" },
      {
        name: "description",
        content:
          "Auditoria fiscal, Reforma Tributária com Argos, automação financeira e plataformas multi-tenant. Conheça os problemas, a engenharia e os resultados de cada projeto.",
      },
      { property: "og:title", content: "Projetos — Bruno Martins" },
      {
        property: "og:description",
        content:
          "Software em operação: auditoria e Reforma Tributária no ecossistema INTTAX, IA com evidências, automação financeira e gestão multi-tenant.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Projetos,
});

type Metric = { k: string; v: string; trend?: "up" | "down" | "flat" };
type Decision = { label: string; body: string };
type Project = {
  slug: string;
  number: string;
  year: string;
  role: string;
  status: "ativo" | "produção" | "manutenção";
  client: string;
  tag: string;
  icon: typeof Bot;
  title: string;
  problem: string;
  approach: string[];
  metrics: Metric[];
  stack: string[];
  decision: Decision;
  visual: ProjectKind | "stack-rows";
};

const projects: Project[] = [
  {
    slug: "inttax-fiscal",
    number: "01",
    year: "2024",
    role: "full-stack · ia aplicada",
    status: "produção",
    client: "Operação fiscal contábil · B2B",
    tag: "AI · FISCAL",
    icon: Bot,
    title: "INTTAX Fiscal — auditoria com ML",
    problem:
      "Departamento fiscal auditando manualmente XMLs, SPEDs e cruzamentos entre documentos — alto volume, erros de classificação recorrentes, créditos tributários deixados na mesa.",
    approach: [
      "Pipeline que processa XMLs em lote, valida esquemas, aplica modelos de ML para matching de produtos entre notas e registros contábeis, e sinaliza inconsistências para revisão humana. Modelos aprendem com as correções da equipe e ficam mais precisos com o uso.",
      "Por trás: Celery + Redis para processamento assíncrono, Postgres para persistência, React no painel, chatbot fiscal para suporte imediato. O sistema identifica oportunidades de crédito tributário que passariam despercebidas em análise manual.",
    ],
    metrics: [
      { k: "−80%", v: "tempo de auditoria", trend: "down" },
      { k: "99,7%", v: "precisão matching", trend: "flat" },
      { k: "15M+", v: "documentos processados", trend: "up" },
      { k: "−95%", v: "erros de classificação", trend: "down" },
    ],
    stack: ["Python", "Flask", "React", "PostgreSQL", "Redis", "ML"],
    decision: {
      label: "Decisão · ML sobre regras hard-coded",
      body: "Regras fixas travam em exceção nova toda semana. Modelo aprende com correções, vira mais preciso que a regra — e a equipe para de revisar o que o sistema já resolveu.",
    },
    visual: "audit",
  },
  {
    slug: "inttax-reforma",
    number: "02",
    year: "2026 → presente",
    role: "full-stack · domínio fiscal · IA aplicada",
    status: "produção",
    client: "Escritórios contábeis e tributários · consultoria B2B",
    tag: "SOFTWARE + CONSULTORIA",
    icon: Bot,
    title: "INTTAX Reforma Tributária — análise que vira consultoria",
    problem:
      "Para orientar clientes durante a transição tributária, escritórios precisam reunir documentos, comparar cenários e explicar efeitos em custo, crédito, margem e preço. Informações dispersas e cálculos sem rastreabilidade limitam a capacidade de transformar esse trabalho em um serviço de consultoria recorrente.",
    approach: [
      "Uma plataforma integrada ao Portal INTTAX importa NF-e, NFC-e, NFS-e, CT-e e SPED, normaliza e cruza documentos e constrói uma base fiscal por empresa. Um worker processa importações demoradas sem bloquear a experiência de uso, com isolamento por escritório e permissões por empresa.",
      "Sobre essa base, o motor fiscal calcula cenários de IBS/CBS, diagnósticos, DRE fiscal e comparativos do Simples Nacional. Clientes, fornecedores, produtos e serviços entram nas análises de custo, crédito, margem e preço. Relatórios versionados e memórias de cálculo sustentam a consultoria prestada pelo escritório.",
      "O Argos conecta linguagem natural a ferramentas de leitura autorizadas. Primeiro obtém evidências do motor fiscal; depois recupera metodologia em um corpus versionado com busca híbrida. A explicação cita fontes e respeita cenário, regra e versão. Valores e fórmulas vêm do servidor, com limites de escopo, custo e acesso.",
    ],
    metrics: [
      { k: "IBS / CBS", v: "simulações de impacto", trend: "flat" },
      { k: "SWAS", v: "software como base da consultoria", trend: "flat" },
      { k: "Argos", v: "análise assistida com fontes", trend: "flat" },
      { k: "Por item", v: "memória e evidência de cálculo", trend: "flat" },
    ],
    stack: ["React", "TypeScript", "Fastify", "Drizzle", "PostgreSQL", "RAG híbrido", "Docker"],
    decision: {
      label: "Decisão de arquitetura · cálculo separado da explicação",
      body: "O motor fiscal calcula; o Argos explica com base em evidências e metodologia versionada. O modelo não inventa valores nem decide o regime tributário. O escritório mantém o julgamento profissional, com uma trilha verificável por trás de cada análise.",
    },
    visual: "reform",
  },
  {
    slug: "robo-paris",
    number: "03",
    year: "2024",
    role: "automação · dados",
    status: "ativo",
    client: "Financeiro B2B · multi-empresa",
    tag: "AUTOMAÇÃO",
    icon: Workflow,
    title: "Robô Paris — extratos bancários multi-empresa",
    problem:
      "Equipe financeira baixando extratos manualmente de múltiplos bancos e empresas via portal SS Parisi. 14 horas/semana em coleta repetitiva — tempo que deveria estar em análise, não em cliques.",
    approach: [
      "Robô Selenium em modo headless: login automatizado no portal, leitura de planilha Excel com a lista de CNPJs, navegação banco a banco, extração dos extratos, organização em estrutura de pastas por ano/mês/empresa. Relatório PDF lista apenas as empresas e bancos que tiveram erro — para auditoria e reexecução.",
      "Logging estruturado, retries com backoff exponencial, modo headless para rodar em servidor Linux sem monitor. Quando algo quebra, o relatório aponta exatamente onde — em vez de descobrir no fim do mês.",
    ],
    metrics: [
      { k: "14h/sem", v: "recuperadas da equipe", trend: "down" },
      { k: "0", v: "divergências/mês", trend: "flat" },
      { k: "100%", v: "headless em servidor", trend: "flat" },
      { k: "multi", v: "banco + multi-empresa", trend: "flat" },
    ],
    stack: ["Python", "Selenium", "Pandas", "WebDriver Manager"],
    decision: {
      label: "Trade-off · headless sobre UI local",
      body: "Rodar com navegador visível exige alguém olhando. Headless + servidor + relatório de exceções = o job roda à noite e o financeiro só olha o que falhou.",
    },
    visual: "banking",
  },
  {
    slug: "game-day-nexus",
    number: "04",
    year: "2023 → presente",
    role: "full-stack · produto",
    status: "ativo",
    client: "Plataforma SaaS · multi-clube",
    tag: "FULL-STACK",
    icon: Boxes,
    title: "Game Day Nexus — gestão multi-tenant para clubes",
    problem:
      "Clubes de futebol operando com planilha, sistema legado e dados espalhados entre departamento médico, técnico, financeiro e administrativo. Cada novo clube era uma reinstalação manual.",
    approach: [
      "Plataforma SaaS multi-tenant no Supabase com Row Level Security (RLS) por club_id em todas as queries, RBAC granular por departamento e função, sistema de convite com atribuição automática de permissões, e contexto de clube ativo que isola dados sem código extra na aplicação.",
      "Onboarding de um novo clube é uma checklist: criar org, semear roles, conectar a integração, gerar token. Tudo self-service a partir daí. Ao vivo em produção.",
    ],
    metrics: [
      { k: "99,95%", v: "uptime (12 meses)", trend: "flat" },
      { k: "RLS", v: "isolamento por tenant", trend: "flat" },
      { k: "multi", v: "clube + multi-usuário", trend: "up" },
      { k: "1p", v: "checklist de onboarding", trend: "flat" },
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "TailwindCSS", "RLS"],
    decision: {
      label: "Decisão · RLS sobre lógica de aplicação",
      body: "Segurança no banco, não no app. Se um dev esquecer um filtro, o RLS ainda barra — proteção por design, não por convenção.",
    },
    visual: "nexus",
  },
  {
    slug: "saas-sieg",
    number: "05",
    year: "2024",
    role: "full-stack · integrações",
    status: "produção",
    client: "Escritórios contábeis · multi-CNPJ",
    tag: "INTEGRAÇÃO",
    icon: Network,
    title: "SaaS-SIEG — XMLs fiscais multi-CNPJ",
    problem:
      "Escritórios contábeis gerenciando centenas de CNPJs baixando XMLs um a um, em horário comercial, com erros de credencial e planilha de controle que ninguém audita. 85% do tempo gasto em recuperação, não em análise.",
    approach: [
      "Plataforma SaaS que se integra com a API SIEG para baixar NFe, NFCe, CTe, MDFe e NFSe de múltiplos CNPJs em lote. Agendamento configurável, extração de metadados, indexação, armazenamento eficiente dos XMLs e relatórios abrangentes de status de download.",
      "Processamento assíncrono (Node Schedule + filas) com retry exponencial e dead-letter para falhas persistentes. Configuração avançada por cliente, segurança com JWT, e design responsivo para uso em campo.",
    ],
    metrics: [
      { k: "−85%", v: "tempo de recuperação", trend: "down" },
      { k: "5 tipos", v: "NFe · NFCe · CTe · MDFe · NFSe", trend: "flat" },
      { k: "multi", v: "CNPJ em lote recorrente", trend: "up" },
      { k: "0", v: "erro humano no download", trend: "flat" },
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Sequelize"],
    decision: {
      label: "Trade-off · polling + retry sobre webhook",
      body: "A integração usa consultas periódicas com retentativas e fila de exceção. O desenho prioriza previsibilidade, rastreabilidade e recuperação de falhas.",
    },
    visual: "stack-rows",
  },
];

const totals = [
  { k: "9", v: "projetos no portfólio" },
  { k: "1000h+", v: "automatizadas" },
  { k: "5", v: "estudos de caso em destaque" },
  { k: "PT/EN", v: "atendimento e código" },
];

const stackAggregate = [
  { group: "Linguagem & runtime", items: ["TypeScript", "Node.js", "Python"] },
  { group: "Frontend", items: ["React", "TanStack Router", "TailwindCSS"] },
  { group: "Backend & dados", items: ["PostgreSQL", "Fastify", "Drizzle", "Supabase", "Redis"] },
  { group: "Infra & edge", items: ["Cloudflare Workers", "Docker", "OpenTelemetry"] },
  { group: "IA & automação", items: ["RAG híbrido", "OpenAI", "Gemini", "Selenium", "PyAutoGUI"] },
];

type MoreProject = {
  title: string;
  blurb: string;
  stack: string[];
  year: string;
};

const moreProjects: MoreProject[] = [
  {
    title: "Inttax Contábil",
    blurb:
      "Conciliação contábil inteligente com integração a ERPs. Reduziu em 85% o tempo de fechamento mensal e em 95% os erros de classificação.",
    stack: ["Python", "Flask", "PostgreSQL", "SQLAlchemy"],
    year: "2023",
  },
  {
    title: "DCTFWeb Automação",
    blurb:
      "Robô PyAutoGUI para download e organização de declarações DCTFWeb do site da Receita Federal, com processamento em lote multi-CNPJ e certificado digital.",
    stack: ["Python", "PyAutoGUI", "Pandas", "Certificado A1"],
    year: "2024",
  },
  {
    title: "Assistente Financeiro WhatsApp",
    blurb:
      "Chatbot em WhatsApp com Gemini para registrar, consultar e interpretar movimentações financeiras em linguagem natural.",
    stack: ["Node.js", "whatsapp-web.js", "Gemini", "Markdown"],
    year: "2024",
  },
  {
    title: "Sistema de Otimização de Rotas",
    blurb:
      "Sistema web para otimizar rotas de vendas e entregas com algoritmo TSP, hierarquia de usuários e mapas em tempo real.",
    stack: ["Flask", "PostgreSQL", "Google OR-Tools", "Folium"],
    year: "2023",
  },
];

function Projetos() {
  return (
    <>
      <main id="conteudo" className="case-page min-h-dvh bg-background text-foreground">
        <SiteNav mode="projetos" />
        <PageHero />
        <CaseStudies />
        <Aggregate />
        <MoreProjects />
        <Contact />
        <SiteFooter />
      </main>
    </>
  );
}

function PageHero() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-20 noise">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_75%)]" />
      <div className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-[var(--cyan)]/10 blur-[120px]" />
      <div className="absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-[var(--lime)]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cyan"
        >
          <span className="h-px w-8 bg-[var(--cyan)]" />
          Portfólio de engenharia
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-display font-semibold leading-[1.02] tracking-tight text-balance"
        >
          Engenharia aplicada.
          <br />
          <span className="font-serif-display text-cyan">Impacto em operação.</span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Conheça o contexto, a solução construída e as decisões por trás de cada entrega. Da
          automação operacional à inteligência fiscal aplicada ao negócio.
        </motion.p>

        <motion.dl
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
        >
          {totals.map((t) => (
            <div key={t.v} className="bg-card p-5">
              <dt className="font-display text-2xl font-semibold text-foreground">{t.k}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {t.v}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.nav
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
          aria-label="Índice de case studies"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Explore os estudos de caso
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {projects.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#projeto-${p.slug}`}
                  className="group flex items-center gap-3 rounded-md border border-border bg-card/50 px-4 py-3 transition-all hover:border-[var(--cyan)]/60 hover:bg-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
                    {p.number}
                  </span>
                  <span className="flex-1 font-display text-sm font-semibold leading-tight">
                    {p.title}
                  </span>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-cyan" />
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <div id="cases" className="border-b border-border">
      {projects.map((p, i) => (
        <CaseStudy key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 === 1;
  return (
    <article
      id={`projeto-${project.slug}`}
      className="relative border-t border-border first:border-t-0 bg-background"
    >
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-28">
        {/* LEFT — meta + text */}
        <div className={isOdd ? "lg:order-2" : ""}>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-cyan"
          >
            <span className="h-px w-8 bg-[var(--cyan)]" />
            {project.tag}
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  project.status === "ativo"
                    ? "bg-[var(--lime)] animate-[pulse-dot_1.6s_ease-in-out_infinite]"
                    : project.status === "produção"
                      ? "bg-[var(--cyan)]"
                      : "bg-muted-foreground"
                }`}
              />
              {project.status}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-foreground/80">{project.client}</span>
          </motion.div>

          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
          >
            {project.title}
          </motion.h2>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-8"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              // o problema
            </div>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{project.problem}</p>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              // a abordagem
            </div>
            {project.approach.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </motion.div>

          {/* Stack tags */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-1.5"
            aria-label="Stack"
          >
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-border bg-[var(--slate-deep)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — metrics + visual + decision */}
        <div className={`space-y-6 ${isOdd ? "lg:order-1" : ""}`}>
          <CaseMetrics project={project} />
          <CaseVisual project={project} />
          <CaseDecision project={project} />
        </div>
      </div>
    </article>
  );
}

function CaseMetrics({ project }: { project: Project }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
          Resultado e capacidades
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          projeto
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
        {project.metrics.map((m) => (
          <div key={m.v}>
            <div className="flex items-baseline gap-1.5">
              <div className="font-display text-3xl font-semibold leading-none text-lime md:text-4xl">
                {m.k}
              </div>
              {m.trend && m.trend !== "flat" && (
                <span
                  aria-hidden="true"
                  className={`font-mono text-xs ${m.trend === "up" ? "text-lime" : "text-coral"}`}
                >
                  {m.trend === "up" ? "↑" : "↓"}
                </span>
              )}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CaseVisual({ project }: { project: Project }) {
  return project.visual === "stack-rows" ? (
    <StackRowsVisual />
  ) : (
    <ProjectArtwork kind={project.visual} />
  );
}

function StackRowsVisual() {
  const rows = [
    { layer: "source", items: ["webhook", "form", "api"] },
    { layer: "validation", items: ["zod schema", "rate limit", "auth"] },
    { layer: "queue", items: ["bullmq", "retry exp.", "dlq"] },
    { layer: "processor", items: ["adapter", "transformer", "logger"] },
    { layer: "sink", items: ["crm", "sheet", "alert"] },
  ];
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="rounded-2xl border border-border bg-[var(--slate-deep)] p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>// pipeline por evento</span>
        <span className="text-cyan">idempotente</span>
      </div>
      <ol className="mt-5 space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.layer}
            className="grid grid-cols-[110px_1fr] items-center gap-3 rounded border border-border bg-card px-3 py-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
              {r.layer}
            </span>
            <span className="flex flex-wrap gap-1.5">
              {r.items.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-[var(--slate-deep)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

function CaseDecision({ project }: { project: Project }) {
  return (
    <motion.aside
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border bg-steel/70 p-6"
      aria-label="Decisão de arquitetura"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-coral">
        {project.decision.label}
      </div>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{project.decision.body}</p>
    </motion.aside>
  );
}

function Aggregate() {
  return (
    <section className="relative border-b border-border bg-[var(--slate-deep)]/40 py-28">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Cross-section"
          title={
            <>
              O que esses projetos têm em{" "}
              <span className="font-serif-display text-cyan text-glow-cyan">comum.</span>
            </>
          }
          desc="Contextos diferentes, princípios consistentes: arquitetura explícita, operação observável e decisões que consideram o negócio."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stackAggregate.map((g) => (
            <div key={g.group} className="bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                {g.group}
              </div>
              <ul className="mt-4 space-y-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] uppercase tracking-widest text-foreground/90"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              k: "01",
              t: "Observabilidade desde o dia 1",
              b: "Logs e indicadores ajudam a entender a saúde do sistema e seu efeito na operação. A observabilidade acompanha o produto desde o início.",
            },
            {
              k: "02",
              t: "Decisões que ficam documentadas",
              b: "Por que essa stack, por que essa fila, por que esse tradeoff: tudo documentado antes de subir. O próximo dev (ou eu daqui a 6 meses) agradece.",
            },
            {
              k: "03",
              t: "Falhas com caminho de recuperação",
              b: "Retentativas, filas de exceção e alertas tornam falhas visíveis e recuperáveis, com contexto para quem vai resolver.",
            },
          ].map((p) => (
            <div key={p.k} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                padrão · {p.k}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-tight">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="relative border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Mais projetos"
          title={
            <>
              Outros sistemas que estão rodando em{" "}
              <span className="font-serif-display text-cyan text-glow-cyan">produção.</span>
            </>
          }
          desc="Outras soluções para operações contábeis, financeiras e comerciais."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {moreProjects.map((p) => (
            <li
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-[var(--cyan)]/40 hover:shadow-[var(--shadow-glow-cyan)]"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {p.year}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  produção
                </div>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border bg-[var(--slate-deep)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden border-b border-border bg-[var(--slate-deep)] py-28 noise"
    >
      <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--coral)]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
          Vamos conversar sobre o próximo desafio
        </div>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Um produto para construir ou um time para{" "}
          <span className="font-serif-display text-coral">fortalecer</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Tem um projeto em mente ou uma oportunidade no seu time? Me conte o que você está
          construindo. Respondo em até 24h.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:brugala@gmail.com?subject=Contato%20via%20portf%C3%B3lio"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--coral)] px-6 py-3.5 text-sm font-medium text-[var(--graphite)] shadow-[var(--shadow-glow-coral)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail className="h-4 w-4" />
            brugala@gmail.com
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://wa.me/5519987111198?text=Ol%C3%A1%2C%20Bruno.%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-steel/60 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[var(--cyan)] hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageSquare className="h-4 w-4" />
            Falar no WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
          <a
            href="https://github.com/Brunobosso98"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Bruno Martins"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-[var(--cyan)] hover:text-cyan focus-visible:border-[var(--cyan)] focus-visible:text-cyan focus-visible:outline-none"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/bruno-bosso-martins-9a1723270/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Bruno Martins"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-[var(--cyan)] hover:text-cyan focus-visible:border-[var(--cyan)] focus-visible:text-cyan focus-visible:outline-none"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
