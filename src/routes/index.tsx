import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Cpu,
  Database,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Network,
  Workflow,
  Zap,
} from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import portrait from "@/assets/bruno-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bruno Martins — Full-stack & Automação" },
      {
        name: "description",
        content:
          "Desenvolvedor full-stack e especialista em automação. Sistemas, integrações, assistentes de IA e workflows que reduzem trabalho manual e entregam resultado.",
      },
      { property: "og:title", content: "Bruno Martins — Full-stack & Automação" },
      {
        property: "og:description",
        content:
          "Sistemas, integrações e automações com IA — construídos para reduzir trabalho manual e gerar resultado.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const projects = [
  {
    tag: "AI · FISCAL",
    title: "Inttax Fiscal — auditoria com ML",
    summary:
      "Plataforma que audita XMLs, SPEDs e cruzamentos entre documentos fiscais com matching de produtos por aprendizado de máquina. Reduziu 80% do tempo de revisão manual e eliminou 95% dos erros de classificação.",
    metrics: [
      { k: "−80%", v: "tempo de auditoria" },
      { k: "99,7%", v: "precisão matching" },
    ],
    stack: ["Python", "Flask", "React", "PostgreSQL", "ML"],
    icon: Bot,
  },
  {
    tag: "AUTOMAÇÃO",
    title: "Robô Paris — extratos bancários",
    summary:
      "Robô Selenium em modo headless que puxa extratos de múltiplos bancos e empresas via portal SS Parisi. Substituiu 14 horas/semana de coleta manual por um job noturno com relatório de exceções em PDF.",
    metrics: [
      { k: "14h/sem", v: "recuperadas" },
      { k: "0", v: "divergências/mês" },
    ],
    stack: ["Python", "Selenium", "Pandas", "WebDriver"],
    icon: Workflow,
  },
  {
    tag: "FULL-STACK",
    title: "Game Day Nexus — multi-tenant",
    summary:
      "Plataforma SaaS para gestão de clubes de futebol com Row Level Security no Supabase, RBAC por departamento e isolamento total por tenant. Operação multi-clube em produção ao vivo.",
    metrics: [
      { k: "99,95%", v: "uptime (12 meses)" },
      { k: "RLS", v: "isolamento por tenant" },
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS"],
    icon: Boxes,
  },
  {
    tag: "INTEGRAÇÃO",
    title: "SaaS-SIEG — XMLs fiscais multi-CNPJ",
    summary:
      "Sistema de download e gerenciamento automatizado de documentos fiscais eletrônicos (NFe, NFCe, CTe, MDFe, NFSe) para escritórios contábeis. Multi-CNPJ, agendamento automático, retry exponencial e auditoria.",
    metrics: [
      { k: "−85%", v: "tempo de recuperação" },
      { k: "5 tipos", v: "NFe · NFCe · CTe · MDFe" },
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    icon: Network,
  },
];

const capabilities = [
  {
    icon: Cpu,
    title: "Sistemas full-stack",
    body: "Apps web sólidos do schema ao deploy, com performance, observabilidade e código que outro dev consegue ler.",
  },
  {
    icon: Workflow,
    title: "Automação operacional",
    body: "Python + Selenium + PyAutoGUI em modo headless. Roda em servidor, sem intervenção, com logs, retries e relatório de exceções.",
  },
  {
    icon: Network,
    title: "Integrações & APIs",
    body: "CRMs, gateways, ERPs e ferramentas internas conversando por eventos — com retries, dead-letter e auditoria.",
  },
  {
    icon: Bot,
    title: "Assistentes com IA",
    body: "Agentes que consultam dados internos e executam ações reais — não chatbots decorativos.",
  },
  {
    icon: Database,
    title: "Fiscal & contábil",
    body: "XML, SPED, NFe, NFCe, CTe, MDFe, NFSe. Conciliação, fechamento mensal, regras tributárias, integração com ERP. É onde a maioria erra por não entender o domínio.",
  },
  {
    icon: Zap,
    title: "Entrega comercial",
    body: "Foco em prazo, escopo claro e métrica de resultado: tempo poupado, risco reduzido, sistema entregue.",
  },
];

const stack = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Postgres",
  "Supabase",
  "n8n",
  "OpenAI",
  "Cloudflare",
  "Docker",
  "TanStack",
  "TailwindCSS",
];

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-dvh bg-background text-foreground">
        <SiteNav mode="home" />
        <Hero />
        <Marquee />
        <About />
        <Capabilities />
        <Projects />
        <Process />
        <Contact />
        <SiteFooter />
      </main>
    </MotionConfig>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 noise">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[var(--cyan)]/10 blur-[120px]" />
      <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-[var(--lime)]/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-steel/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--lime)]" />
            Disponível · Q2 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
          >
            Sistemas, integrações
            <br />e <span className="font-serif-display text-cyan text-glow-cyan">automações</span> que
            <br />
            <span className="relative inline-block">
              entregam resultado.
              <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-[var(--lime)]" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Sou Bruno Martins, desenvolvedor full-stack e especialista em automação.
            Construo software que reduz trabalho manual, conecta sistemas e coloca IA
            para fazer coisa útil — não slide bonito.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-steel/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-[var(--cyan)] hover:text-cyan"
            >
              <MessageSquare className="h-4 w-4" />
              Conversar sobre um projeto
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="font-display text-base text-foreground">Seis anos</span>
            <span aria-hidden="true">·</span>
            <span>8 sistemas em produção</span>
            <span aria-hidden="true">·</span>
            <span>1000h+ automatizadas</span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--slate-deep)]/80 p-4 shadow-[var(--shadow-card)]">
            <div className="relative z-10 flex items-center justify-between border-b border-border/60 px-2 pb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--lime)]" />
                entrega.live
              </span>
              <span>4 estágios · briefing → operação</span>
            </div>
            <div className="relative aspect-[16/11]">
              <HeroScene />
            </div>
            <div className="relative z-10 flex items-center justify-between border-t border-border/60 px-2 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="text-cyan">in · briefing</span>
              <span className="text-coral">out · operação</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...stack, ...stack];
  return (
    <div aria-hidden="true" className="relative border-y border-border bg-[var(--slate-deep)]/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-12 pr-12"
          style={{ animation: "ticker 40s linear infinite" }}
        >
          {items.map((s, i) => (
            <span
              key={i}
              className="font-mono text-sm uppercase tracking-widest text-muted-foreground"
            >
              {s}
              <span className="ml-12 text-[var(--cyan)]/40">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Capabilities() {
  return (
    <section id="capacidades" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeader
        eyebrow="Capacidades"
        title={
          <>
            O que entrego, <span className="font-serif-display text-cyan text-glow-cyan">na prática.</span>
          </>
        }
        desc="Cada bloco abaixo é trabalho que já está rodando em produção em algum lugar. Sem genérico."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => {
          const isLead = i === 0;
          const isClosing = i === capabilities.length - 1;
          const span = isLead
            ? "md:col-span-2 lg:col-span-2"
            : isClosing
            ? "md:col-span-2 lg:col-span-3"
            : "";

          if (isClosing) {
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative col-span-full flex flex-col gap-3 bg-steel p-8 transition-colors hover:bg-[var(--slate-deep)] md:col-span-2 lg:col-span-3"
              >
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-lime">
                  <span className="h-px w-6 bg-[var(--lime)]" />
                  promessa de entrega
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {c.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <div className="mt-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
                  <span>resultado mensurável</span>
                  <span className="text-lime">→</span>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative bg-card p-8 transition-colors hover:bg-steel ${span}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-[var(--slate-deep)] text-cyan transition-colors group-hover:border-[var(--cyan)]">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projetos" className="relative border-y border-border bg-[var(--slate-deep)]/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Projetos · Selecionados"
          title={
            <>
              Provas, não <span className="font-serif-display text-lime text-glow-lime">promessas.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:border-[var(--cyan)]/40 hover:shadow-[var(--shadow-glow-cyan)]"
            >
              <div className="absolute right-6 top-6 opacity-30 transition-opacity group-hover:opacity-100">
                <p.icon className="h-10 w-10 text-cyan" />
              </div>

              <div className="font-mono text-[11px] uppercase tracking-widest text-cyan">{p.tag}</div>
              <h3 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                {p.metrics.map((m) => (
                  <div key={m.v}>
                    <div className="font-display text-2xl font-semibold text-lime">{m.k}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border bg-[var(--slate-deep)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/projetos"
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-steel/60 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[var(--cyan)] hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ver todos os projetos · dossiê completo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      body: "Conversa curta para entender o processo, o gargalo real e o que conta como sucesso.",
    },
    {
      n: "02",
      title: "Proposta enxuta",
      body: "Escopo, prazo e métrica de resultado em uma página. Sem proposta de 30 slides.",
    },
    {
      n: "03",
      title: "Build em ciclos curtos",
      body: "Entregas semanais funcionando, com acesso a ambiente de teste desde o dia 1.",
    },
    {
      n: "04",
      title: "Operação",
      body: "Deploy, observabilidade, documentação e suporte para o sistema rodar sozinho.",
    },
  ];

  return (
    <section id="processo" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeader
        eyebrow="Como trabalho"
        title={
          <>
            Do <span className="font-serif-display text-coral">problema</span> ao sistema rodando.
          </>
        }
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative bg-card p-8"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-cyan">{s.n}</div>
            <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-border bg-[var(--slate-deep)] py-28 noise">
      <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--coral)]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
          Contato é onde a conversa começa
        </div>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Tem um processo travado ou um sistema para
          <span className="font-serif-display text-coral"> construir</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Resposta em até 24h, em português direto. Sem proposta enrolada, sem reunião só para marcar reunião.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:brugala@gmail.com?subject=Contato%20via%20portf%C3%B3lio"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--coral)] px-6 py-3.5 text-sm font-medium text-[var(--graphite)] shadow-[var(--shadow-glow-coral)] transition-transform hover:scale-[1.02]"
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

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  const tagY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const facts = [
    { k: "PT/EN", v: "atendimento" },
    { k: "Remoto", v: "Itapira SP · Brasil" },
    { k: "Fiscal", v: "contábil · ops" },
    { k: "Senior", v: "full-stack & IA" },
  ];

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-background py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--cyan)]/8 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            style={{ y: tagY }}
            className="absolute -left-4 -top-4 z-20 rounded-md border border-border bg-[var(--slate-deep)]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--lime)]" />
            online · operando
          </motion.div>

          <motion.div
            style={{ y: tagY }}
            className="absolute -right-3 bottom-10 z-20 max-w-[180px] rounded-md border border-border bg-[var(--slate-deep)]/90 p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shadow-[var(--shadow-card)]"
          >
            <div className="text-coral">latency</div>
            <div className="mt-1 font-display text-base text-foreground normal-case tracking-tight">
              &lt; 24h resposta
            </div>
          </motion.div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-steel shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay bg-gradient-to-br from-[var(--cyan)]/15 via-transparent to-[var(--coral)]/10" />
            <motion.img
              src={portrait}
              alt="Bruno Martins, desenvolvedor full-stack e especialista em automação"
              width={1024}
              height={1024}
              loading="lazy"
              style={{ y: imgY, scale: imgScale }}
              className="h-full w-full object-cover grayscale-[15%]"
            />
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>bruno_martins.jpg</span>
              <span className="text-lime">● rec</span>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cyan"
          >
            <span className="h-px w-8 bg-[var(--cyan)]" />
            Sobre · Bruno Martins
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            Engenheiro de{" "}
            <span className="font-serif-display text-cyan text-glow-cyan">
              software
            </span>{" "}
            com cabeça de{" "}
            <span className="text-lime">operação.</span>
          </motion.h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {[
              <>
                Há mais de <span className="text-foreground">seis anos</span> construindo
                sistemas para empresas que precisam{" "}
                <span className="font-serif-display text-foreground">parar de remendar planilha</span>{" "}
                em rotinas fiscais, contábeis, financeiras e operacionais — e começar a
                operar com software de verdade.
              </>,
              <>
                Minha especialidade é a interseção entre{" "}
                <span className="text-cyan">full-stack, automação e IA aplicada</span>: auditei
                XMLs com ML, fiz robô Selenium rodar em servidor, integrei WhatsApp com Gemini
                e construí um ERP multi-tenant com RLS no Supabase.
              </>,
              <>
                Trabalho{" "}
                <span className="font-serif-display text-foreground">direto com quem decide.</span>{" "}
                Sem camadas de gerência, sem proposta enrolada, sem demo bonito que não vira
                produção.
              </>,
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.v} className="bg-card p-4">
                <dt className="font-display text-base font-semibold text-foreground">
                  {f.k}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
