import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Bot, Database, ExternalLink, FileCode2, Github, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

type ProjectCategory = 'all' | 'web' | 'automation' | 'ai';

type Project = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  impact: string;
  role: string;
  category: Exclude<ProjectCategory, 'all'>;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  detailUrl: string;
};

const categories: Array<{ id: ProjectCategory; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'ai', label: 'IA aplicada' },
  { id: 'automation', label: 'Automação' },
  { id: 'web', label: 'Web apps' },
];

const projects: Project[] = [
  {
    id: 'audittei-fiscal',
    title: 'Inttax Fiscal',
    shortTitle: 'Auditoria fiscal com IA',
    description:
      'Sistema de auditoria fiscal que cruza documentos, cenários e produtos para reduzir análise manual em rotinas tributárias.',
    impact: 'Até 80% menos tempo de auditoria',
    role: 'Arquitetura, backend, frontend e fluxos de IA',
    category: 'ai',
    technologies: ['Python', 'Flask', 'React', 'PostgreSQL', 'Redis', 'Machine Learning'],
    image: '/images/audittei-dashboard.jpg',
    detailUrl: '/project/audittei-fiscal',
  },
  {
    id: 'audittei-contabil',
    title: 'Inttax Contábil',
    shortTitle: 'Conciliação contábil inteligente',
    description:
      'Plataforma para conciliar dados contábeis, integrar ERPs e transformar fechamento mensal em um fluxo rastreável.',
    impact: 'Até 90% menos processo manual',
    role: 'Produto, integração, banco de dados e dashboards',
    category: 'ai',
    technologies: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'Chart.js'],
    image: '/images/audittei-contabil-dashboard.jpg',
    detailUrl: '/project/audittei-contabil',
  },
  {
    id: 'saas-sieg',
    title: 'SaaS-SIEG',
    shortTitle: 'Documentos fiscais automatizados',
    description:
      'SaaS para baixar, organizar e gerenciar XMLs fiscais de múltiplos CNPJs sem operação manual repetitiva.',
    impact: 'Rotina fiscal em modo recorrente',
    role: 'Frontend, API, autenticação e jobs agendados',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    detailUrl: '/project/saas-sieg',
  },
  {
    id: 'game-day-nexus',
    title: 'Game Day Nexus Platform',
    shortTitle: 'Gestão multi-tenant para clubes',
    description:
      'Produto web para gestão de clubes com permissões por departamento, dados isolados e rotinas operacionais centralizadas.',
    impact: 'Operação multi-clube com RLS',
    role: 'Arquitetura front-end, dados e controle de acesso',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    liveUrl: 'https://clubefut.vercel.app/',
    detailUrl: '/project/game-day-nexus',
  },
  {
    id: 'robo-paris',
    title: 'Robô Paris',
    shortTitle: 'Automação bancária',
    description:
      'Robô para extrair, organizar e reportar extratos bancários de múltiplas empresas com tratamento de exceções.',
    impact: 'Coleta bancária em lote',
    role: 'Automação, relatório PDF, logs e modo headless',
    category: 'automation',
    technologies: ['Python', 'Selenium', 'Pandas', 'WebDriver Manager'],
    detailUrl: '/project/robo-paris',
  },
  {
    id: 'dctfweb',
    title: 'DCTFWeb Automação',
    shortTitle: 'Declarações da Receita Federal',
    description:
      'Ferramenta para automatizar downloads e organização de declarações DCTFWeb com certificado digital e rastreabilidade.',
    impact: 'Menos repetição em obrigações fiscais',
    role: 'Robô desktop, planilhas, arquivos e exceções',
    category: 'automation',
    technologies: ['Python', 'PyAutoGUI', 'Pandas', 'Certificado Digital'],
    detailUrl: '/project/dctfweb',
  },
  {
    id: 'assistente-financeiro',
    title: 'Assistente Financeiro',
    shortTitle: 'Finanças no WhatsApp',
    description:
      'Chatbot para registrar, consultar e interpretar movimentações financeiras usando conversa natural no WhatsApp.',
    impact: 'Interface simples para rotina financeira',
    role: 'Bot, integração, IA generativa e persistência',
    category: 'ai',
    technologies: ['Node.js', 'JavaScript', 'WhatsApp API', 'Google Gemini'],
    detailUrl: '/project/assistente-financeiro',
  },
  {
    id: 'sistema-rotas',
    title: 'Sistema de Otimização de Rotas',
    shortTitle: 'Planejamento de vendas e entregas',
    description:
      'Sistema web para otimizar rotas, hierarquia de usuários e execução de equipes em campo.',
    impact: 'Rotas melhores para operação real',
    role: 'Backend, mapas, regras e telas administrativas',
    category: 'web',
    technologies: ['Flask', 'PostgreSQL', 'Google OR-Tools', 'Bootstrap'],
    liveUrl: 'https://rota.kodiakerp.com.br',
    detailUrl: '/project/sistema-rotas',
  },
];

const categoryIcon = {
  ai: Bot,
  automation: ShieldCheck,
  web: FileCode2,
};

const ProjectVisual = ({ project, index }: { project: Project; index: number }) => {
  if (project.image) {
    return (
      <div className="relative h-full min-h-[240px] overflow-hidden rounded-lg border border-white/10 bg-black/40">
        <img src={project.image} alt={`Tela do projeto ${project.title}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,8,10,0.72))]" />
        <div className="absolute bottom-4 left-4 rounded-md border border-cyan-200/20 bg-black/60 px-3 py-2 font-code text-xs text-cyan-100 backdrop-blur">
          dashboard real
        </div>
      </div>
    );
  }

  const Icon = categoryIcon[project.category];

  return (
    <div className="relative h-full min-h-[240px] overflow-hidden rounded-lg border border-white/10 bg-[#071014] p-5">
      <div className="matrix-grid absolute inset-0 opacity-70" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-md border border-cyan-200/20 bg-cyan-200/10 p-3 text-cyan-100">
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-code text-xs uppercase tracking-[0.18em] text-slate-400">case 0{index + 1}</span>
        </div>

        <div className="space-y-3">
          {[92, 76, 64].map((width, lineIndex) => (
            <span
              key={width}
              className={`block h-2 rounded bg-cyan-200/20 ${lineIndex === 1 ? 'bg-lime-200/20' : ''}`}
              style={{ width: `${width}%` }}
            />
          ))}
          <div className="grid grid-cols-3 gap-2 pt-4">
            {[0, 1, 2].map((item) => (
              <span key={item} className="h-16 rounded-md border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 font-code text-xs text-lime-100">
          <Database className="h-4 w-4" />
          processo modelado
        </div>
      </div>
    </div>
  );
};

const ProjectCase = ({ project, index }: { project: Project; index: number }) => {
  const articleRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const Icon = categoryIcon[project.category];

  useEffect(() => {
    if (!articleRef.current) return;

    if (isMobile) {
      gsap.set(articleRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(articleRef.current, {
      y: 42,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: articleRef.current,
        start: 'top bottom-=80',
      },
    });
  }, [isMobile]);

  return (
    <article
      ref={articleRef}
      className="group grid gap-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] md:grid-cols-[0.95fr_1.05fr]"
    >
      <div className="flex flex-col justify-between p-6 md:p-8">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/25 px-3 py-2 font-code text-xs uppercase tracking-[0.16em] text-slate-300">
              <Icon className="h-3.5 w-3.5 text-cyan-100" />
              {project.shortTitle}
            </span>
            <span className="rounded-md bg-lime-300/[0.12] px-3 py-2 text-xs font-bold text-lime-100">
              {project.impact}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">{project.description}</p>

          <div className="mt-6 rounded-md border-l-2 border-cyan-300 bg-cyan-300/[0.06] px-4 py-3">
            <p className="text-sm font-medium text-cyan-50">{project.role}</p>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-white/10 px-2.5 py-1.5 font-code text-xs text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-10 rounded-md bg-cyan-300 text-sm font-bold text-slate-950 hover:bg-cyan-200">
              <Link to={project.detailUrl} className="inline-flex items-center gap-2">
                Ver detalhes
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            {project.liveUrl && (
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-md border-white/[0.15] bg-transparent text-sm font-bold text-slate-100 hover:border-cyan-200/50 hover:bg-cyan-200/10"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Ver online
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-[260px] border-t border-white/10 p-4 md:border-l md:border-t-0">
        <ProjectVisual project={project} index={index} />
      </div>
    </article>
  );
};

const Projects = () => {
  const [category, setCategory] = useState<ProjectCategory>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const filteredProjects = useMemo(
    () => projects.filter((project) => category === 'all' || project.category === category),
    [category],
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      [headerRef.current, tabsRef.current].forEach((element) => {
        if (element) gsap.set(element, { opacity: 1, y: 0 });
      });
      return;
    }

    gsap.from([headerRef.current, tabsRef.current], {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=120',
      },
    });
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="projects" data-skip-scroll-anim className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.22em] text-lime-100">prova antes da promessa</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              Projetos que mostram como eu transformo processo em sistema.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300 md:justify-self-end">
            A primeira conversa fica mais objetiva quando você já vê o tipo de problema que eu costumo resolver:
            fiscal, contábil, automação, produtos web e IA conectada à operação.
          </p>
        </div>

        <div
          ref={tabsRef}
          className="mt-10 inline-flex max-w-full flex-wrap gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-1"
          role="tablist"
          aria-label="Filtrar projetos"
        >
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                category === item.id
                  ? 'bg-cyan-300 text-slate-950'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-cyan-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          {filteredProjects.map((project, index) => (
            <ProjectCase key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-[#071014]/80 p-5">
          <Github className="h-5 w-5 text-cyan-100" />
          <p className="flex-1 text-sm leading-6 text-slate-300">
            Alguns projetos comerciais têm repositório privado. Nos detalhes, priorizo arquitetura, decisões técnicas e impacto operacional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
