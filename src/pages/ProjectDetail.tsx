
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TechnicalDetails = {
  language?: string;
  mainLibraries?: string[];
  otherLibraries?: string[];
  backend?: string;
  frontend?: string;
  ai?: string;
  whatsapp?: string;
  storage?: string;
  algorithms?: string;
  integrations?: string;
  configuration?: string;
  architecture?: string[];
  execution?: string[];
  workflow?: string[];
  characteristics?: string[];
  results?: string[];
}

type Project = {
  title: string;
  description: string;
  fullDescription: string[];
  image: string;
  technologies: string[];
  features: string[];
  technicalDetails: TechnicalDetails;
  githubUrl?: string;
  liveUrl?: string;
  videoDemo?: string;
}

// Definição dos dados dos projetos
const projectsData: Record<string, Project> = {
  "robo-paris": {
    title: "Robô Paris - Automação Bancária",
    description: "Solução de automação desenvolvida para extrair e gerenciar extratos bancários de múltiplas empresas e bancos através do portal SS Parisi.",
    fullDescription: [
      "O Robô Paris é uma solução de automação desenvolvida para extrair e gerenciar extratos bancários de múltiplas empresas e bancos através do portal SS Parisi. O sistema automatiza o processo de login, navegação, extração de dados e organização de arquivos, permitindo a coleta eficiente de informações financeiras para fins contábeis.",
      "O sistema processa várias empresas sequencialmente a partir de uma planilha Excel, organizando os extratos baixados em uma estrutura de diretórios por ano e mês.",
      "Foi implementado um sistema robusto de tratamento de erros com registro detalhado e tentativas múltiplas, além de suporte para execução em modo headless (sem interface gráfica), ideal para servidores."
    ],
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    technologies: ["Python", "Selenium", "Pandas", "WebDriver Manager"],
    features: [
      "Extração Automatizada de Extratos", 
      "Processamento em Lote", 
      "Organização de Arquivos", 
      "Tratamento de Erros", 
      "Modo Headless", 
      "Logging Detalhado"
    ],
    technicalDetails: {
      language: "Python",
      mainLibraries: ["Selenium", "Pandas", "WebDriver Manager"],
      otherLibraries: ["datetime", "os/shutil", "logging", "re"],
      architecture: [
        "roboParis.py: Versão principal do robô com interface gráfica",
        "roboParisHeadless.py: Versão do robô para execução sem interface gráfica",
        "relacionamentos.py: Módulo para processamento de relacionamentos entre empresas"
      ],
      execution: [
        "Inicialização: Configuração de logging e inicialização do driver",
        "Login: Autenticação no portal SS Parisi",
        "Processamento de Empresas: Leitura da planilha Excel",
        "Identificação de Bancos: Para cada empresa, identifica bancos disponíveis",
        "Extração de Dados: Para cada banco, extrai os extratos",
        "Organização de Arquivos: Move arquivos para estrutura apropriada",
        "Registro de Erros: Registra erros durante o processamento"
      ]
    },
    githubUrl: "#",
    liveUrl: null,
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "assistente-financeiro": {
    title: "Assistente Financeiro no WhatsApp",
    description: "Assistente financeiro pessoal integrado ao WhatsApp que utiliza a API do Google Gemini para processamento de linguagem natural.",
    fullDescription: [
      "Este projeto implementa um assistente financeiro pessoal que se integra ao WhatsApp e utiliza a API do Google Gemini para processamento de linguagem natural. O assistente permite que o usuário registre e consulte suas finanças diretamente pelo WhatsApp, usando linguagem natural.",
      "O sistema permite registrar despesas por categoria, registrar entradas de dinheiro, consultar o saldo atual disponível, e analisar gastos por categoria específica.",
      "A implementação utiliza Node.js como plataforma, Google Gemini API para processamento de linguagem natural, e whatsapp-web.js para integração com WhatsApp."
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    technologies: ["Node.js", "JavaScript", "Google Gemini API", "whatsapp-web.js"],
    features: [
      "Registro de Gastos", 
      "Registro de Receitas", 
      "Consulta de Saldo", 
      "Análise por Categoria", 
      "Processamento de Linguagem Natural", 
      "Integração com WhatsApp"
    ],
    technicalDetails: {
      backend: "Node.js, JavaScript",
      ai: "Google Gemini API, Modelo: gemini-2.0-flash",
      whatsapp: "whatsapp-web.js, qrcode-terminal",
      storage: "Sistema de Arquivos, Formato Markdown",
      configuration: "dotenv, Configuração Modular",
      architecture: [
        "Módulo Principal (index.js): Inicializa o sistema",
        "Módulo WhatsApp (whatsapp.js): Gerencia conexões",
        "Módulo de Finanças (finance.js): Processa comandos",
        "Módulo de Armazenamento (storage.js): Gerencia dados",
        "Módulo de IA (gemini.js): Integra com Google Gemini",
        "Módulo de Configuração (config.js): Centraliza configurações"
      ],
      workflow: [
        "Usuário envia mensagem pelo WhatsApp",
        "Sistema verifica se a mensagem é do usuário autorizado",
        "Sistema identifica comandos usando regex ou IA",
        "Executa a ação correspondente",
        "Atualiza arquivo de dados financeiros",
        "Responde ao usuário com confirmação ou informação"
      ]
    },
    githubUrl: "#",
    liveUrl: "#",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "sistema-rotas": {
    title: "Sistema de Otimização de Rotas",
    description: "Sistema web completo para otimização e gerenciamento de rotas de vendas e entregas, projetado para aumentar a eficiência operacional.",
    fullDescription: [
      "Sistema web completo para otimização e gerenciamento de rotas de vendas e entregas, projetado para aumentar a eficiência operacional e reduzir custos logísticos.",
      "O sistema oferece benefícios como redução de custos através da otimização inteligente de rotas, aumento de produtividade com rotas mais eficientes, e melhor controle e gestão com acompanhamento em tempo real.",
      "A implementação inclui gestão hierárquica (Administradores, Gerentes regionais, Equipe de campo), otimização inteligente com algoritmos avançados de roteamento, monitoramento em tempo real, e relatórios e análises detalhados."
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    technologies: ["Flask", "SQLAlchemy", "PostgreSQL", "Google OR-Tools", "Folium"],
    features: [
      "Gestão Hierárquica", 
      "Otimização Inteligente", 
      "Monitoramento em Tempo Real", 
      "Relatórios e Análises", 
      "Interface Intuitiva", 
      "Suporte para Múltiplas Filiais"
    ],
    technicalDetails: {
      backend: "Flask (Python), SQLAlchemy, PostgreSQL",
      frontend: "Jinja2, Bootstrap, jQuery, Folium",
      algorithms: "TSP (Google OR-Tools), OSRM, K-means clustering",
      integrations: "OpenStreetMap/OSRM, Serviços de email, Geolocalização",
      characteristics: [
        "Multitenancy com isolamento por empresa",
        "Hierarquia de usuários (Admin/Gerente/Vendedor)",
        "Geocoding e Geofencing para validação de proximidade",
        "Importação em lote via Excel",
        "CSRF Protection e JWT para segurança",
        "Arquitetura modular para escalabilidade"
      ],
      results: [
        "Redução de 20-30% em custos de combustível",
        "Aumento de 25% em produtividade",
        "Melhor satisfação do cliente",
        "ROI positivo em 3-6 meses"
      ]
    },
    githubUrl: "#",
    liveUrl: "#",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "fgts-digital": {
    title: "FGTS Digital - Automação",
    description: "Sistema end-to-end para download e organização de guias FGTS Digital para múltiplos CNPJs, reduzindo drasticamente o tempo de processamento.",
    fullDescription: [
      "Projetei e implementei uma solução de automação end-to-end para download e organização de guias do FGTS Digital para múltiplos CNPJs, superando desafios de segurança e autenticação do sistema governamental.",
      "O sistema possibilita a extração automatizada de guias FGTS Digital para múltiplos CNPJs a partir de planilhas Excel, resultando em economia significativa de tempo e eliminação de erros no processo.",
      "A implementação inclui tratamento robusto de erros, sistema de logs para rastreabilidade completa e estrutura organizada de arquivos por ano/mês/analista para fácil acesso."
    ],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    technologies: ["Python", "PyAutoGUI", "Pandas", "OpenPyXL"],
    features: [
      "Automação End-to-End", 
      "Processamento Multi-CNPJ", 
      "Organização Inteligente de Arquivos", 
      "Tratamento Robusto de Erros", 
      "Logs Detalhados", 
      "Contorno de Mecanismos Anti-Automação"
    ],
    technicalDetails: {
      language: "Python",
      mainLibraries: ["PyAutoGUI", "Pandas", "OpenPyXL"],
      otherLibraries: ["datetime", "os/shutil", "logging", "re"],
      architecture: [
        "fgts_digital.py: Script principal do sistema",
        "mouse_config.json: Configuração de posições de mouse",
        "excel_handler.py: Processamento de planilhas",
        "file_organizer.py: Organização de arquivos"
      ],
      execution: [
        "Leitura da planilha Excel com CNPJs",
        "Acesso ao portal FGTS Digital via navegador",
        "Login com certificado digital",
        "Seleção e processamento de cada CNPJ",
        "Download das guias disponíveis",
        "Organização dos arquivos baixados",
        "Geração de relatório de processamento"
      ]
    },
    githubUrl: "#",
    liveUrl: null,
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "dctfweb": {
    title: "DCTFWeb Automação",
    description: "Ferramenta para automatizar o download de declarações DCTFWeb do site da Receita Federal, com processamento em lote de múltiplos CNPJs.",
    fullDescription: [
      "O DCTFWeb Automation é uma ferramenta de automação desenvolvida para facilitar o processo de download de declarações da DCTFWeb diretamente do site da Receita Federal do Brasil.",
      "Este projeto utiliza automação de interface gráfica para navegar pelo portal da Receita Federal, realizar login com certificado digital, selecionar empresas por CNPJ e baixar as declarações correspondentes.",
      "A solução inclui funcionalidades como processamento em lote de múltiplos CNPJs via Excel, assistência para resolução de captcha, download automatizado e organização inteligente de arquivos."
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    technologies: ["Python", "PyAutoGUI", "Pandas", "Pyperclip"],
    features: [
      "Automação de Login", 
      "Processamento em Lote", 
      "Resolução de Captcha", 
      "Download Automático", 
      "Organização de Arquivos", 
      "Logging Detalhado"
    ],
    technicalDetails: {
      language: "Python",
      mainLibraries: ["PyAutoGUI", "Pandas", "Pyperclip"],
      otherLibraries: ["json", "logging", "datetime", "os", "shutil", "re"],
      architecture: [
        "dctfweb_automation.py: Script principal com a lógica de automação",
        "mouse_positions.json: Configuração de coordenadas de clique",
        "criar_excel_teste.py: Script auxiliar para criar arquivo Excel de teste",
        "teste.xlsx: Arquivo Excel com CNPJs de exemplo"
      ],
      execution: [
        "Configuração inicial e carregamento de parâmetros",
        "Acesso ao portal da Receita Federal",
        "Login com certificado digital",
        "Processamento de CNPJs a partir de arquivo Excel",
        "Download de declarações DCTFWeb",
        "Organização de arquivos por data e CNPJ",
        "Geração de logs detalhados"
      ]
    },
    githubUrl: "#",
    liveUrl: null,
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "kodiak-erp": {
    title: "Kodiak ERP",
    description: "Site para showcase de um sistema ERP industrial com assistente virtual baseado em IA, desenvolvido com tecnologias modernas e foco em experiência do usuário.",
    fullDescription: [
      "O Kodiak ERP é um sistema de gestão empresarial (ERP) desenvolvido especificamente para o setor industrial. A plataforma oferece uma solução completa para automação, controle e eficiência operacional, integrando diversos módulos que atendem às necessidades específicas de indústrias.",
      "O site apresenta a solução Kodiak ERP, destacando seus módulos, benefícios, processo de implementação e casos de sucesso, com o objetivo de atrair potenciais clientes e oferecer uma demonstração do sistema.",
      "A implementação inclui um assistente virtual (Bear) baseado em IA, carrossel de clientes, animações sofisticadas com GSAP e um design responsivo e moderno."
    ],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "OpenAI"],
    features: [
      "Assistente Virtual com IA", 
      "Apresentação de Módulos", 
      "Carrossel de Clientes", 
      "Animações Interativas", 
      "Design Responsivo", 
      "Modal de Demonstração"
    ],
    technicalDetails: {
      backend: "Next.js API Routes, OpenAI API, Node Fetch",
      frontend: "React 18.2.0, TypeScript 5.2.2, Tailwind CSS 3.3.3, GSAP",
      ai: "OpenAI GPT-4o-mini, React Markdown",
      characteristics: [
        "Animações GSAP para melhor experiência do usuário",
        "Integração com IA para assistente virtual",
        "Responsividade completa para diferentes dispositivos",
        "Arquitetura baseada em componentes reutilizáveis",
        "Chat interativo com efeito de digitação",
        "Carrossel de clientes com Embla Carousel"
      ],
      architecture: [
        "/app: Estrutura principal do Next.js App Router",
        "/components: Componentes reutilizáveis",
        "/data: Dados estáticos como o prompt do assistente",
        "/hooks: Hooks personalizados para funcionalidades específicas",
        "/lib: Utilitários e funções auxiliares",
        "/public: Arquivos estáticos (imagens, ícones)"
      ]
    },
    githubUrl: "#",
    liveUrl: "#",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId as keyof typeof projectsData];
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    if (!headerRef.current || !contentRef.current || !featuresRef.current || !technicalRef.current) return;

    // Animation timeline
    const tl = gsap.timeline();
    
    tl.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4")
    .from(featuresRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.out"
    }, "-=0.2");

    // Technical details section animation with ScrollTrigger
    gsap.from(technicalRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: technicalRef.current,
        start: "top bottom-=100",
      }
    });

    // Demo section animation with ScrollTrigger
    if (demoRef.current) {
      gsap.from(demoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: demoRef.current,
          start: "top bottom-=100",
        }
      });
    }

    return () => {
      // Clean up animations
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
            <p className="mb-6">O projeto que você está procurando não existe ou foi removido.</p>
            <Link to="/"><Button>Voltar para Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-6">
            <Link to="/#projects" className="inline-flex items-center text-foreground/70 hover:text-accent transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Voltar para Projetos</span>
            </Link>
          </div>
          
          {/* Header Section */}
          <div ref={headerRef} className="mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-foreground/5 mb-8">
              <img 
                src={project.image} 
                alt={project.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground/10 hover:bg-foreground/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={18} />
                  <span>Código no GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Ver Projeto</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div ref={contentRef} className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
                {project.fullDescription.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground/80">{paragraph}</p>
                ))}
              </div>
              
              {/* Features Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Principais Funcionalidades</h2>
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="bg-foreground/5 p-4 rounded-lg hover:bg-foreground/10 transition-colors">
                      <span className="text-accent font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Technical Details Section */}
              <div ref={technicalRef}>
                <h2 className="text-2xl font-bold mb-6">Detalhes Técnicos</h2>
                
                {project.technicalDetails.language && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Linguagem Principal</h3>
                    <p className="text-foreground/80">{project.technicalDetails.language}</p>
                  </div>
                )}
                
                {project.technicalDetails.backend && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Backend</h3>
                    <p className="text-foreground/80">{project.technicalDetails.backend}</p>
                  </div>
                )}
                
                {project.technicalDetails.frontend && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Frontend</h3>
                    <p className="text-foreground/80">{project.technicalDetails.frontend}</p>
                  </div>
                )}
                
                {project.technicalDetails.mainLibraries && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Principais Bibliotecas</h3>
                    <ul className="list-disc list-inside text-foreground/80">
                      {project.technicalDetails.mainLibraries.map((lib, index) => (
                        <li key={index} className="mb-1">{lib}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.technicalDetails.otherLibraries && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Outras Bibliotecas</h3>
                    <ul className="list-disc list-inside text-foreground/80">
                      {project.technicalDetails.otherLibraries.map((lib, index) => (
                        <li key={index} className="mb-1">{lib}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.technicalDetails.ai && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Inteligência Artificial</h3>
                    <p className="text-foreground/80">{project.technicalDetails.ai}</p>
                  </div>
                )}
                
                {project.technicalDetails.whatsapp && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Integração WhatsApp</h3>
                    <p className="text-foreground/80">{project.technicalDetails.whatsapp}</p>
                  </div>
                )}
                
                {project.technicalDetails.storage && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Armazenamento</h3>
                    <p className="text-foreground/80">{project.technicalDetails.storage}</p>
                  </div>
                )}
                
                {project.technicalDetails.algorithms && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Algoritmos</h3>
                    <p className="text-foreground/80">{project.technicalDetails.algorithms}</p>
                  </div>
                )}
                
                {project.technicalDetails.architecture && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Arquitetura</h3>
                    <ul className="list-disc list-inside text-foreground/80">
                      {project.technicalDetails.architecture.map((item, index) => (
                        <li key={index} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.technicalDetails.execution && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Fluxo de Execução</h3>
                    <ol className="list-decimal list-inside text-foreground/80">
                      {project.technicalDetails.execution.map((step, index) => (
                        <li key={index} className="mb-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {project.technicalDetails.workflow && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Fluxo de Trabalho</h3>
                    <ol className="list-decimal list-inside text-foreground/80">
                      {project.technicalDetails.workflow.map((step, index) => (
                        <li key={index} className="mb-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {project.technicalDetails.characteristics && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Características Técnicas</h3>
                    <ul className="list-disc list-inside text-foreground/80">
                      {project.technicalDetails.characteristics.map((char, index) => (
                        <li key={index} className="mb-1">{char}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.technicalDetails.results && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Resultados Típicos</h3>
                    <ul className="list-disc list-inside text-foreground/80">
                      {project.technicalDetails.results.map((result, index) => (
                        <li key={index} className="mb-1">{result}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-foreground/5 hover:bg-foreground/7 transition-colors duration-300 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Resumo do Projeto</h3>
                <p className="text-foreground/80 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Tecnologias</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-foreground/10 hover:bg-foreground/15 transition-colors duration-300 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Funcionalidades</h4>
                  <ul className="list-disc list-inside text-sm text-foreground/80">
                    {project.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                    {project.features.length > 5 && <li>...</li>}
                  </ul>
                </div>
                
                <div className="flex flex-col gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-foreground/10 hover:bg-foreground/20 px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full"
                    >
                      <Github size={18} />
                      <span>Código no GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full"
                    >
                      <ExternalLink size={18} />
                      <span>Ver Projeto</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Demo Section */}
          {project.videoDemo && (
            <div ref={demoRef} className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Demonstração em Vídeo</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-foreground/5">
                <iframe
                  src={project.videoDemo}
                  title={`${project.title} video demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
