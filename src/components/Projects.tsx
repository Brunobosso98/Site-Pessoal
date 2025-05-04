import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'web' | 'automation' | 'ai' | 'all';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  detailUrl?: string;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!cardRef.current) return;

    if (isMobile) {
      gsap.set(cardRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(cardRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
      }
    });
  }, [index, isMobile]);

  return (
    <div
      ref={cardRef}
      className="bg-foreground/5 rounded-xl overflow-hidden card-hover flex flex-col animate-on-scroll"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-foreground/70 mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-foreground/10 px-2 py-1 rounded-md text-xs hover:bg-accent/20 hover:text-accent transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-all duration-300 hover:-translate-y-1"
            >
              <Github className="h-4 w-4" />
              <span>Código</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-all duration-300 hover:-translate-y-1"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Ver Projeto</span>
            </a>
          )}
          {project.detailUrl && (
            <Link
              to={project.detailUrl}
              className="flex items-center gap-1 text-sm font-medium ml-auto text-accent hover:text-accent/80 transition-all duration-300 hover:-translate-y-1"
            >
              <span>Ver Detalhes</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [category, setCategory] = useState<'all' | 'web' | 'automation' | 'ai'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      [titleRef.current, tabsRef.current].forEach(el => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    gsap.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
      }
    });

    gsap.from(tabsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: tabsRef.current,
        start: "top bottom-=100",
      }
    });
  }, [isMobile]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Game Day Nexus Platform",
      description: "SaaS completo para gestão de clubes de futebol com arquitetura multi-tenant e sistema avançado de permissões.",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      category: 'web',
      technologies: ['React', 'TypeScript', 'Supabase', 'TailwindCSS', 'PostgreSQL'],
      githubUrl: "#",
      liveUrl: "https://clubefut.vercel.app/",
      detailUrl: "/project/game-day-nexus"
    },
    {
      id: 2,
      title: "SaaS-SIEG",
      description: "Plataforma SaaS para automação de download e gerenciamento de documentos fiscais eletrônicos para escritórios contábeis.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      category: 'web',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
      githubUrl: "#",
      liveUrl: "#",
      detailUrl: "/project/saas-sieg"
    },
    {
      id: 3,
      title: "Assistente Financeiro no WhatsApp",
      description: "Chatbot para gerenciamento financeiro integrado ao WhatsApp usando a API do Google Gemini.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: 'ai',
      technologies: ['Node.js', 'JavaScript', 'WhatsApp API', 'Google Gemini'],
      githubUrl: "#",
      liveUrl: "#",
      detailUrl: "/project/assistente-financeiro"
    },
    {
      id: 4,
      title: "Robô Paris - Automação Bancária",
      description: "Sistema de automação para extração e gerenciamento de extratos bancários de múltiplos bancos.",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
      category: 'automation',
      technologies: ['Python', 'Selenium', 'Pandas', 'Automação'],
      githubUrl: "#",
      detailUrl: "/project/robo-paris"
    },
    {
      id: 5,
      title: "DCTFWeb Automação",
      description: "Ferramenta para automatizar o download de declarações DCTFWeb do site da Receita Federal.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: 'automation',
      technologies: ['Python', 'PyAutoGUI', 'Pandas', 'Certificado Digital'],
      githubUrl: "#",
      detailUrl: "/project/dctfweb"
    },
    {
      id: 6,
      title: "Sistema de Otimização de Rotas",
      description: "Sistema web para otimizar rotas de vendas e entregas com hierarquia de usuários.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: 'web',
      technologies: ['Flask', 'PostgreSQL', 'Google OR-Tools', 'Bootstrap'],
      githubUrl: "#",
      liveUrl: "https://rota.kodiakerp.com.br",
      detailUrl: "/project/sistema-rotas"
    },
    {
      id: 7,
      title: "Kodiak ERP",
      description: "Site para showcase de um sistema ERP industrial com assistente virtual baseado em IA.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: 'web',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'OpenAI'],
      githubUrl: "#",
      liveUrl: "https://kodiakerp.com.br",
      detailUrl: "/project/kodiak-erp"
    },
    {
      id: 8,
      title: "FGTS Digital - Automação",
      description: "Sistema end-to-end para download e organização de guias FGTS Digital para múltiplos CNPJs.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      category: 'automation',
      technologies: ['Python', 'PyAutoGUI', 'Pandas', 'Automação'],
      githubUrl: "#",
      detailUrl: "/project/fgts-digital"
    }
  ];

  const filteredProjects = projects.filter(
    (project) => category === 'all' || project.category === category
  );

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_50%)]"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Meus <span className="highlight-gradient">Projetos</span>
        </h2>

        <div ref={tabsRef} className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={category === 'all' ? 'default' : 'outline'}
            className={`rounded-full ${category === 'all' ? 'bg-accent text-white' : 'hover:border-accent/40'} transition-all duration-300 hover:-translate-y-1`}
            onClick={() => setCategory('all')}
          >
            Todos
          </Button>
          <Button
            variant={category === 'web' ? 'default' : 'outline'}
            className={`rounded-full ${category === 'web' ? 'bg-accent text-white' : 'hover:border-accent/40'} transition-all duration-300 hover:-translate-y-1`}
            onClick={() => setCategory('web')}
          >
            Web
          </Button>
          <Button
            variant={category === 'automation' ? 'default' : 'outline'}
            className={`rounded-full ${category === 'automation' ? 'bg-accent text-white' : 'hover:border-accent/40'} transition-all duration-300 hover:-translate-y-1`}
            onClick={() => setCategory('automation')}
          >
            Automação
          </Button>
          <Button
            variant={category === 'ai' ? 'default' : 'outline'}
            className={`rounded-full ${category === 'ai' ? 'bg-accent text-white' : 'hover:border-accent/40'} transition-all duration-300 hover:-translate-y-1`}
            onClick={() => setCategory('ai')}
          >
            IA & Chatbots
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
