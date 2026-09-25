/** Public portfolio summaries. Outcomes reuse the owner's existing case evidence. */
export const featuredProjects = [
  {
    slug: "inttax-fiscal",
    kind: "audit" as const,
    tag: "INTELIGÊNCIA FISCAL · IA APLICADA",
    title: "INTTAX Fiscal",
    headline: "Do documento à evidência.",
    summary:
      "XMLs e SPEDs entram. Cruzamentos, inconsistências e oportunidades de crédito saem organizados para revisão. Uma operação de auditoria apoiada por machine learning, com menos trabalho manual e mais rastreabilidade.",
    metrics: [
      { k: "−80%", v: "tempo de auditoria" },
      { k: "99,7%", v: "precisão de matching" },
    ],
    stack: ["Python", "Flask", "React", "PostgreSQL", "ML"],
    contribution: "Ingestão documental, matching com ML e experiência de auditoria.",
  },
  {
    slug: "inttax-reforma",
    kind: "reform" as const,
    tag: "SOFTWARE + CONSULTORIA · PRODUTO EM OPERAÇÃO",
    title: "INTTAX Reforma Tributária",
    headline: "Análise que vira consultoria.",
    summary:
      "Escritórios contábeis e tributários transformam dados fiscais em um serviço de consultoria para seus clientes. A plataforma compara cenários, revela impactos em custo e margem e sustenta conversas sobre regimes, preços e negociação com fornecedores.",
    metrics: [
      { k: "IBS / CBS", v: "cenários de impacto" },
      { k: "Argos", v: "IA com evidências e fontes" },
    ],
    stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "RAG"],
    contribution: "Da ingestão ao relatório: motor fiscal, plataforma analítica e Argos.",
  },
  {
    slug: "robo-paris",
    kind: "banking" as const,
    tag: "AUTOMAÇÃO · OPERAÇÃO FINANCEIRA",
    title: "Robô Paris",
    headline: "A rotina anda. A equipe avança.",
    summary:
      "O robô coleta extratos de múltiplos bancos e empresas, organiza arquivos por período e entrega um relatório de exceções. O financeiro recebe o trabalho pronto para análise, com clareza sobre o que precisa de atenção.",
    metrics: [
      { k: "14h/sem", v: "de trabalho manual recuperadas" },
      { k: "Headless", v: "execução em servidor" },
    ],
    stack: ["Python", "Selenium", "Pandas", "WebDriver"],
    contribution: "Automação de ponta a ponta, organização documental e tratamento de falhas.",
  },
  {
    slug: "game-day-nexus",
    kind: "nexus" as const,
    tag: "FULL-STACK · PRODUTO MULTI-TENANT",
    title: "Game Day Nexus",
    headline: "Vários clubes. Uma plataforma.",
    summary:
      "Uma operação conectada entre departamentos, com permissões por função e dados isolados por clube. A arquitetura permite evoluir o produto e atender novas organizações sem replicar toda a aplicação.",
    metrics: [
      { k: "RLS", v: "isolamento no banco de dados" },
      { k: "RBAC", v: "permissões por departamento" },
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    contribution: "Arquitetura multi-tenant, controle de acesso e fluxos de gestão.",
  },
];
