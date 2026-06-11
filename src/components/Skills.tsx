import { useEffect, useRef } from 'react';
import { Bot, Boxes, Cable, Code2, FileCheck2, Workflow } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const capabilityLanes = [
  {
    icon: Workflow,
    title: 'Automação operacional',
    outcome: 'Robôs, rotinas recorrentes, processamento em lote e redução de trabalho manual.',
    stack: ['Python', 'Selenium', 'PyAutoGUI', 'Pandas', 'Agendamentos', 'Relatórios'],
  },
  {
    icon: Code2,
    title: 'Produtos web internos',
    outcome: 'Aplicações para equipes operarem dados, aprovações, dashboards e fluxos de negócio.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'React Query', 'GSAP'],
  },
  {
    icon: Cable,
    title: 'Integrações e APIs',
    outcome: 'Pontes entre ERPs, serviços fiscais, bancos, mensageria e sistemas legados.',
    stack: ['Node.js', 'Flask', 'REST', 'PostgreSQL', 'Redis', 'JWT'],
  },
  {
    icon: Bot,
    title: 'IA aplicada',
    outcome: 'Classificação, assistência, leitura de documentos e conversa natural integrada a processos.',
    stack: ['OpenAI', 'Gemini', 'WhatsApp API', 'Prompts', 'RAG', 'Validação'],
  },
];

const operatingModes = [
  { icon: FileCheck2, label: 'Mapear regras e exceções' },
  { icon: Boxes, label: 'Modelar dados e permissões' },
  { icon: Workflow, label: 'Automatizar execução e alerta' },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lanesRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      [headerRef.current, lanesRef.current, modesRef.current].forEach((element) => {
        if (element) gsap.set(element, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=120',
        },
      });

      gsap.from(lanesRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lanesRef.current,
          start: 'top bottom-=80',
        },
      });

      gsap.from(modesRef.current?.children ?? [], {
        x: -18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: modesRef.current,
          start: 'top bottom-=70',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="skills" data-skip-scroll-anim className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.22em] text-rose-100">capacidades</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              Stack é importante. Mais importante é fechar o fluxo inteiro.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300 md:justify-self-end">
            Eu combino frontend, backend, automação e IA para entregar ferramentas que entram na rotina da equipe,
            com controle suficiente para crescer sem virar um script solto.
          </p>
        </div>

        <div ref={lanesRef} className="mt-10 grid gap-4 lg:grid-cols-4">
          {capabilityLanes.map((lane) => {
            const Icon = lane.icon;

            return (
              <article key={lane.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{lane.title}</h3>
                <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-300">{lane.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {lane.stack.map((item) => (
                    <span key={item} className="rounded-md bg-black/25 px-2.5 py-1.5 font-code text-[11px] text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 rounded-lg border border-white/10 bg-[#071014]/80 p-5 md:grid-cols-[0.8fr_1.2fr] md:p-7">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.2em] text-lime-100">modo de trabalho</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Da regra de negócio ao deploy útil.</h3>
          </div>

          <div ref={modesRef} className="grid gap-3 sm:grid-cols-3">
            {operatingModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <div key={mode.label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3">
                  <Icon className="h-5 w-5 shrink-0 text-cyan-100" />
                  <span className="text-sm font-medium leading-5 text-slate-200">{mode.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
