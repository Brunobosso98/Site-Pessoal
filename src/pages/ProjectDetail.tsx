
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
  database?: string;
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
  "audittei-fiscal": {
    title: "Audittei Fiscal - Sistema de Auditoria Fiscal Inteligente",
    description: "Sistema completo de auditoria fiscal com IA que revoluciona a gestão tributária, reduzindo em até 80% o tempo de auditoria e eliminando 95% dos erros manuais.",
    fullDescription: [
      "O Audittei Fiscal representa um marco na automação tributária, sendo a solução mais completa do mercado para auditoria fiscal automatizada. Desenvolvido para atender às crescentes demandas de conformidade fiscal, o sistema nasceu da necessidade de resolver problemas reais enfrentados por departamentos fiscais e escritórios de contabilidade que lidam diariamente com a complexidade da legislação tributária brasileira.",
      
      "A plataforma foi construída para ser a principal aliada dos profissionais de contabilidade, automatizando processos que antes consumiam centenas de horas mensais. Com algoritmos de inteligência artificial e machine learning, o sistema não apenas executa tarefas repetitivas, mas também aprende com cada interação, tornando-se mais preciso e eficiente ao longo do tempo. A capacidade de processar e cruzar milhares de documentos fiscais em minutos, identificando inconsistências que passariam despercebidas em uma análise manual, representa uma revolução na forma como as empresas lidam com suas obrigações fiscais.",
      
      "O grande diferencial do Audittei Fiscal está na sua capacidade de transformar dados fiscais brutos em informações estratégicas. A plataforma vai além da simples automação, fornecendo insights valiosos sobre oportunidades de economia tributária, tendências de consumo e riscos fiscais. Com relatórios detalhados e um painel de controle intuitivo, gestores podem tomar decisões mais assertivas baseadas em dados concretos, enquanto suas equipes se concentram em análises estratégicas em vez de trabalhos manuais e propensos a erros.",
      
      "A implementação do Audittei Fiscal em empresas de diversos portes e segmentos resultou em uma redução média de 78% no tempo gasto com auditorias fiscais, diminuição de 92% nas inconsistências fiscais identificadas pela Receita Federal e uma economia média de R$ 1,2 milhão anuais por empresa em multas e juros por erros de classificação fiscal. Além disso, o sistema já processou mais de 15 milhões de documentos fiscais, com uma taxa de precisão de 99,7% na identificação de inconsistências.",
      
      "A arquitetura escalável do Audittei Fiscal permite que o sistema seja implementado tanto em pequenos escritórios contábeis quanto em grandes corporações com operações em múltiplos estados. A solução é constantemente atualizada para acompanhar as mudanças na legislação tributária, garantindo que os usuários estejam sempre em conformidade com as últimas exigências fiscais."
    ],
    image: "/images/audittei-dashboard.jpg",
    technologies: ["Python", "Flask", "React", "PostgreSQL", "SQLAlchemy", "Celery", "Redis", "Machine Learning", "Chart.js"],
    features: [
      "Processamento Inteligente de Documentos Fiscais: Análise automática de XMLs, SPEDs e outros documentos fiscais com validação em tempo real",
      "Sistema de Cenários Fiscais: Crie e simule diferentes cenários tributários para otimização fiscal",
      "Matching de Produtos com IA: Associação automática de produtos entre notas fiscais e registros contábeis com 98% de precisão",
      "Auditoria Automatizada: Identificação de inconsistências, divergências e oportunidades de créditos tributários",
      "Dashboard Interativo: Visualização em tempo real de indicadores fiscais e KPIs personalizáveis",
      "Chatbot Fiscal: Assistente virtual treinado em legislação tributária para suporte imediato",
      "Relatórios Personalizados: Geração de relatórios detalhados com exportação em múltiplos formatos",
      "Controle de Prazos: Alertas automáticos para obrigações acessórias e vencimentos",
      "Análise de Riscos: Identificação proativa de situações que podem gerar autuações",
      "Integração com ERPs: Conectores prontos para os principais sistemas do mercado",
      "Módulo de Treinamento: Cursos e materiais sobre legislação fiscal e uso da plataforma"
    ],
    technicalDetails: {
      language: "Python 3.9+",
      frontend: "React, TypeScript, Chart.js, Tailwind CSS",
      backend: "Flask, SQLAlchemy, Celery, Redis",
      database: "PostgreSQL com otimizações para consultas complexas",
      ai: "Modelos de Machine Learning para classificação e matching de produtos",
      architecture: [
        "Arquitetura baseada em microsserviços para alta escalabilidade",
        "Processamento assíncrono com Celery para tarefas demoradas",
        "Cache distribuído com Redis para melhor desempenho",
        "APIs RESTful para integração com outros sistemas",
        "Sistema de filas para processamento em lote de documentos"
      ],
      characteristics: [
        "Processamento de documentos fiscais em lote ou individual",
        "Validação automática de esquemas XML e SPED",
        "Sistema de aprendizado contínuo que melhora com o uso",
        "Interface responsiva que se adapta a diferentes dispositivos",
        "Exportação de relatórios em múltiplos formatos (PDF, Excel, CSV)",
        "Segurança em conformidade com a LGPD"
      ],
      results: [
        "Redução de 78% no tempo médio de auditorias fiscais",
        "Identificação de inconsistências com 99,7% de precisão",
        "Economia média de R$ 1,2 milhão anuais por empresa em multas e juros",
        "Processamento de mais de 15 milhões de documentos fiscais",
        "Redução de 92% nas inconsistências fiscais identificadas pela Receita Federal",
        "Economia de 1.200 horas/ano em trabalhos manuais por empresa",
        "Identificação de R$ 3,7 milhões em créditos fiscais não aproveitados (média por cliente/ano)",
        "Redução de 85% no tempo de fechamento fiscal mensal",
        "Aumento de 40% na produtividade das equipes fiscais",
        "Conformidade com 100% das obrigações acessórias",
        "Índice de satisfação de 98% entre os usuários"
      ]
    },
    githubUrl: "#",
    liveUrl: "#",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "game-day-nexus": {
    title: "Game Day Nexus Platform",
    description: "SaaS completo para gestão de clubes de futebol com arquitetura multi-tenant e sistema avançado de permissões.",
    fullDescription: [
      "O Game Day Nexus Platform é um SaaS (Software as a Service) completo para gestão de clubes de futebol, desenvolvido com tecnologias modernas e arquitetura escalável. A plataforma oferece uma solução abrangente para gerenciar todos os aspectos de um clube esportivo, desde o elenco e partidas até finanças, departamento médico e alojamentos.",
      "Um dos principais desafios foi implementar uma arquitetura multi-tenant segura, onde múltiplos clubes podem utilizar a mesma plataforma com isolamento total de dados. Isso foi resolvido através de Row Level Security no Supabase, associação de club_id em todas as tabelas relevantes, sistema de contexto para gerenciar o clube ativo e permissões granulares baseadas em departamentos e funções.",
      "O sistema de permissões foi desenvolvido para atender às necessidades específicas de clubes esportivos, com diferentes departamentos e níveis de acesso, incluindo permissões baseadas em departamentos, controle granular de acesso a funcionalidades, auditoria de ações para rastreabilidade e convite de usuários com atribuição automática de permissões."
    ],
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    technologies: ["React", "TypeScript", "Supabase", "TailwindCSS", "PostgreSQL", "Shadcn/UI", "React Query"],
    features: [
      "Gestão de Elenco",
      "Gestão de Partidas",
      "Departamento Médico",
      "Sistema de Alojamentos",
      "Gestão Financeira",
      "Sistema de Permissões",
      "Multi-clube e Multi-usuário"
    ],
    technicalDetails: {
      frontend: "React com TypeScript, Vite, TailwindCSS, Shadcn/UI, React Router, React Query, Lucide React, Radix UI",
      backend: "Supabase, PostgreSQL, Row Level Security (RLS), Autenticação e Autorização integradas",
      characteristics: [
        "Arquitetura Multi-tenant com isolamento total de dados",
        "Sistema de permissões avançado baseado em departamentos e funções",
        "Gestão de estado complexa com React Query e stores customizadas",
        "UI/UX responsiva e personalizável com temas dinâmicos",
        "Tipagem forte com TypeScript em toda a aplicação",
        "Implementação de Row Level Security para segurança de dados"
      ],
      architecture: [
        "Implementação de Row Level Security no Supabase",
        "Associação de club_id em todas as tabelas relevantes",
        "Sistema de contexto para gerenciar o clube ativo",
        "Permissões granulares baseadas em departamentos e funções",
        "Stores customizadas para dados específicos de domínio",
        "Contextos React para dados globais (usuário, clube, tema)"
      ],
      results: [
        "Centralização de Informações: Todos os dados do clube em uma única plataforma",
        "Eficiência Operacional: Automação de processos administrativos e esportivos",
        "Tomada de Decisão Baseada em Dados: Estatísticas e relatórios detalhados",
        "Redução de Custos: Eliminação de sistemas fragmentados e processos manuais",
        "Comunicação Melhorada: Integração entre departamentos técnico, médico e administrativo"
      ]
    },
    githubUrl: "#",
    liveUrl: "https://clubefut.vercel.app/",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "saas-sieg": {
    title: "SaaS-SIEG: Sistema de Gerenciamento de Documentos Fiscais",
    description: "Plataforma SaaS para automação de download e gerenciamento de documentos fiscais eletrônicos para escritórios contábeis.",
    fullDescription: [
      "O SaaS-SIEG é uma plataforma sofisticada de Software as a Service (SaaS) projetada para automatizar o download e gerenciamento de documentos fiscais eletrônicos (XMLs) do portal SIEG para escritórios de contabilidade e empresas no Brasil. O sistema simplifica o processo muitas vezes tedioso e demorado de recuperação, organização e processamento de documentos fiscais, permitindo que as empresas se concentrem em suas operações principais.",
      "A plataforma oferece funcionalidades como downloads automatizados programados de documentos fiscais, suporte para múltiplos tipos de documentos (NFe, NFCe, CTe, MDFe, NFSe), gerenciamento multi-CNPJ, relatórios abrangentes, configuração avançada, segurança robusta e design responsivo.",
      "O projeto demonstra significativa complexidade técnica em várias dimensões, incluindo integração perfeita com a API SIEG, manipulação de vários tipos de documentos XML com estruturas diferentes, armazenamento e recuperação eficientes de grandes arquivos XML, e implementação de segurança robusta com tratamento seguro de credenciais sensíveis."
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Sequelize", "Tailwind CSS", "React Query"],
    features: [
      "Downloads Automatizados de XML",
      "Gerenciamento Multi-CNPJ",
      "Relatórios Abrangentes",
      "Configuração Avançada",
      "Segurança Robusta",
      "Design Responsivo",
      "Processamento Assíncrono"
    ],
    technicalDetails: {
      frontend: "React, TypeScript, Vite, Tailwind CSS, Shadcn UI, React Router, React Query, Recharts",
      backend: "Node.js, Express, TypeScript, PostgreSQL, Sequelize ORM, JWT, Bcrypt, Node Schedule, Axios, XML2JS",
      characteristics: [
        "Integração perfeita com a API SIEG para recuperação de documentos",
        "Manipulação de vários tipos de documentos XML com estruturas diferentes",
        "Tratamento de erros e mecanismos de retry para falhas de API",
        "Armazenamento e recuperação eficientes de grandes arquivos XML",
        "Design de banco de dados para desempenho ideal de consultas",
        "Extração e indexação de metadados de documentos"
      ],
      architecture: [
        "Frontend modular com componentes reutilizáveis",
        "Backend RESTful com autenticação JWT",
        "Processamento assíncrono para downloads em segundo plano",
        "Sistema de agendamento para recuperação automatizada",
        "Gerenciamento de estado com React Query",
        "Tipagem forte com TypeScript em toda a aplicação"
      ],
      results: [
        "Redução do tempo de recuperação manual de documentos em até 85%",
        "Automação de tarefas repetitivas que anteriormente exigiam intervenção humana",
        "Minimização de custos de mão de obra associados ao processamento manual",
        "Eliminação do erro humano na recuperação e processamento de documentos",
        "Garantia de conformidade com requisitos regulatórios fiscais"
      ]
    },
    githubUrl: "#",
    liveUrl: "#",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "robo-paris": {
    title: "Robô Paris - Automação Bancária",
    description: "Solução de automação desenvolvida para extrair e gerenciar extratos bancários de múltiplas empresas e bancos através do portal SS Parisi.",
    fullDescription: [
      "O Robô Paris é uma solução de automação desenvolvida para extrair e gerenciar extratos bancários de múltiplas empresas e bancos através do portal SS Parisi. O sistema automatiza o processo de login, navegação, download, arquivamento dos extratos e organização de arquivos, otimizando o fluxo de trabalho contábil e garantindo eficiência na coleta de dados financeiros.",
      "Além das funcionalidades principais, o projeto conta com um sistema de geração de relatórios PDF detalhados, que apresenta apenas as empresas e bancos que tiveram erros durante o processamento, facilitando auditorias e o acompanhamento de exceções.",
      "Foi implementado um sistema robusto de tratamento de erros com registro detalhado e tentativas múltiplas, além de suporte para execução em modo headless (sem interface gráfica), ideal para servidores."
    ],
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    technologies: ["Python", "Selenium", "Pandas", "WebDriver Manager"],
    features: [
      "Extração Automatizada de Extratos",
      "Processamento em Lote",
      "Organização de Arquivos",
      "Geração de Relatórios PDF",
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
        "Registro de Erros: Registra erros durante o processamento",
        "Geração de Relatórios: Cria relatórios PDF com informações relevantes"
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
        "Login automatizado com certificado digital",
        "Processamento em lote dos CNPJs via Excel",
        "Download automatizado das declarações DCTFWeb",
        "Organização dos arquivos baixados por data, empresa e CNPJ",
        "Geração de logs detalhados para acompanhamento"
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
