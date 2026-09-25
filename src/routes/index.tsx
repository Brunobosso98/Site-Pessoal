import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  Bot,
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
import { KineticTitle, MagneticLink } from "@/components/MotionExperience";
import { useMotionExperience } from "@/hooks/use-motion-experience";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { featuredProjects } from "@/lib/portfolio";
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

const capabilities = [
  {
    icon: Cpu,
    title: "Sistemas full-stack",
    body: "Produtos web do modelo de dados à experiência final. Arquitetura, interface, APIs e entrega em produção.",
  },
  {
    icon: Workflow,
    title: "Automação operacional",
    body: "Rotinas que deixam de depender de cliques: coleta, processamento e entrega, com logs, retentativas e revisão de exceções.",
  },
  {
    icon: Network,
    title: "Integrações & APIs",
    body: "ERPs, APIs e ferramentas internas conectados com validação, retentativas e rastreabilidade de ponta a ponta.",
  },
  {
    icon: Bot,
    title: "Assistentes com IA",
    body: "Assistentes conectados a ferramentas e fontes autorizadas. RAG, evidências, escopo de acesso e limites de custo fazem parte da arquitetura.",
  },
  {
    icon: Database,
    title: "Fiscal & contábil",
    body: "Ingestão XML e SPED, cruzamento de documentos e análises fiscais. Conhecimento de domínio para traduzir regras complexas em software utilizável.",
  },
  {
    icon: Zap,
    title: "Engenharia orientada ao negócio",
    body: "Escopo claro, entregas frequentes e resultados que a operação consegue reconhecer: tempo recuperado, informações confiáveis e novos serviços.",
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
    <>
      <main id="conteudo" className="min-h-dvh bg-background text-foreground">
        <SiteNav mode="home" />
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Capabilities />
        <Process />
        <Contact />
        <SiteFooter />
      </main>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { staticMotion } = useMotionExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  return (
    <section id="top" ref={ref} className="portfolio-hero">
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-intro">
            <span className="signal-dot" /> Bruno Martins{" "}
            <span className="hero-role">Full-stack & automação</span>
          </div>
          <KineticTitle>
            <span className="title-line">
              <span>Complexidade,</span>
            </span>
            <span className="title-line">
              <span>transformada</span>
            </span>
            <span className="title-line">
              <span>
                em <em>resultado.</em>
              </span>
            </span>
          </KineticTitle>
          <p className="hero-description">
            Conecto sistemas, automatizo operações e construo produtos com IA. Da primeira conversa
            ao software em produção.
          </p>
          <div className="hero-actions">
            <MagneticLink href="#projetos" className="button-primary">
              Explorar projetos <ArrowUpRight size={18} />
            </MagneticLink>
            <MagneticLink
              href="https://www.linkedin.com/in/bruno-bosso-martins-9a1723270/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-text"
            >
              Meu LinkedIn <ArrowUpRight size={16} />
            </MagneticLink>
          </div>
          <p className="hero-availability">
            <span /> Aberto a projetos e oportunidades profissionais
          </p>
        </div>
        <motion.div className="hero-object" style={staticMotion ? undefined : { y, rotate }}>
          <HeroScene />
        </motion.div>
      </div>
      <div className="hero-baseline">
        <span>6+ anos construindo soluções reais</span>
        <span>Full-stack · Automação · IA aplicada</span>
        <a href="#projetos">
          Conheça meu trabalho <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...stack, ...stack];
  return (
    <div
      aria-hidden="true"
      className="relative border-y border-border bg-[var(--slate-deep)]/60 py-5"
    >
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
    <section id="capacidades" className="expertise-section">
      <div className="expertise-intro">
        <p className="section-caption">Como posso contribuir</p>
        <h2>
          Visão de produto.
          <br />
          <span className="text-cyan">Profundidade técnica.</span>
        </h2>
        <p>
          Do banco de dados à experiência de quem usa. Construção de ponta a ponta, com atenção ao
          que a operação precisa.
        </p>
      </div>
      <div className="expertise-list">
        {capabilities.map((capability) => (
          <div className="expertise-row" key={capability.title}>
            <capability.icon size={22} />
            <div>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projetos" className="selected-work">
      <div className="work-heading">
        <div>
          <p className="section-caption">Trabalho selecionado</p>
          <h2>
            Problemas reais.
            <br />
            <span className="text-cyan">Software à altura.</span>
          </h2>
        </div>
        <p>
          Sistemas em operação. Processos que ganharam escala. Produtos que abrem novas frentes de
          negócio.
        </p>
      </div>
      <div className="project-stories">
        {featuredProjects.map((project) => (
          <article key={project.title} className="project-story">
            <div className="project-visual-link">
              <ProjectArtwork kind={project.kind} />
            </div>
            <div className="project-story-copy">
              <span className="project-category">{project.tag}</span>
              <h3>
                <Link to="/projetos" hash={"projeto-" + project.slug}>
                  {project.title}
                </Link>
              </h3>
              <p className="project-headline">{project.headline}</p>
              <p>{project.summary}</p>
              <dl className="project-results">
                {project.metrics.map((metric) => (
                  <div key={metric.v}>
                    <dt>{metric.k}</dt>
                    <dd>{metric.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="project-contribution">
                <span>Minha atuação</span>
                {project.contribution}
              </p>
              <div className="project-technologies">{project.stack.join(" / ")}</div>
              <Link
                className="case-link"
                to="/projetos"
                hash={"projeto-" + project.slug}
                aria-label={"Explorar estudo de caso: " + project.title}
              >
                Explorar o case <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Link to="/projetos" className="all-projects-link">
        Todos os projetos e decisões de arquitetura <ArrowUpRight size={20} />
      </Link>
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
      body: "Escopo, prioridades e critérios de sucesso alinhados antes da implementação.",
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
      <ol className="process-steps mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={false}
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
    <section
      id="contato"
      className="relative overflow-hidden border-t border-border bg-[var(--slate-deep)] py-28 noise"
    >
      <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--coral)]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
          Projetos, parcerias e novas oportunidades
        </div>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Vamos construir <span className="font-serif-display text-coral">o próximo passo</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Tem um projeto em mente ou uma oportunidade no seu time? Me conte o que você está
          construindo. Respondo em até 24h.
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
  const { staticMotion } = useMotionExperience();
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
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            style={staticMotion ? undefined : { y: tagY }}
            className="absolute -left-4 -top-4 z-20 rounded-md border border-border bg-[var(--slate-deep)]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--lime)]" />
            Bruno Martins · Itapira, SP
          </motion.div>

          <motion.div
            style={staticMotion ? undefined : { y: tagY }}
            className="absolute -right-3 bottom-10 z-20 max-w-[180px] rounded-md border border-border bg-[var(--slate-deep)]/90 p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shadow-[var(--shadow-card)]"
          >
            <div className="text-coral">Vamos conversar</div>
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
              style={staticMotion ? undefined : { y: imgY, scale: imgScale }}
              className="h-full w-full object-cover grayscale-[15%]"
            />
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Engenharia com visão de negócio</span>
              <span className="text-lime">Brasil / remoto</span>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <div>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cyan"
          >
            <span className="h-px w-8 bg-[var(--cyan)]" />
            Sobre · Bruno Martins
          </motion.div>

          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            Engenheiro de{" "}
            <span className="font-serif-display text-cyan text-glow-cyan">software</span> com cabeça
            de <span className="text-lime">operação.</span>
          </motion.h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {[
              <>
                Há mais de <span className="text-foreground">seis anos</span> construindo sistemas
                para rotinas fiscais, contábeis e financeiras. Transformo processos complexos em
                produtos que as pessoas conseguem usar, entender e incorporar ao trabalho.
              </>,
              <>
                Minha especialidade é a interseção entre{" "}
                <span className="text-cyan">full-stack, automação e IA aplicada</span>: da ingestão
                de documentos e auditoria com ML ao Argos, um assistente que explica análises
                fiscais com evidências e fontes.
              </>,
              <>
                Trabalho{" "}
                <span className="font-serif-display text-foreground">direto com quem decide.</span>{" "}
                Colaboro com times e lideranças para transformar necessidades de negócio em software
                confiável, documentado e pronto para evoluir.
              </>,
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.dl
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.v} className="bg-card p-4">
                <dt className="font-display text-base font-semibold text-foreground">{f.k}</dt>
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
