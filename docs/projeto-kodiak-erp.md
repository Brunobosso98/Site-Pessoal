# Projeto Kodiak ERP - Documentação

## Visão Geral

O Kodiak ERP é um sistema de gestão empresarial (ERP) desenvolvido especificamente para o setor industrial. A plataforma oferece uma solução completa para automação, controle e eficiência operacional, integrando diversos módulos que atendem às necessidades específicas de indústrias.

O site apresenta a solução Kodiak ERP, destacando seus módulos, benefícios, processo de implementação e casos de sucesso, com o objetivo de atrair potenciais clientes e oferecer uma demonstração do sistema.

## Tecnologias Utilizadas

### Frontend
- **Next.js 13.5.1**: Framework React para desenvolvimento web com renderização do lado do servidor (SSR)
- **React 18.2.0**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript 5.2.2**: Superset tipado de JavaScript para desenvolvimento mais seguro
- **Tailwind CSS 3.3.3**: Framework CSS utilitário para estilização rápida e responsiva
- **GSAP (GreenSock Animation Platform)**: Biblioteca para animações avançadas e interativas
- **Framer Motion**: Biblioteca de animações para React
- **Embla Carousel**: Componente de carrossel para exibição de conteúdo deslizante
- **Radix UI**: Biblioteca de componentes primitivos acessíveis e não estilizados
- **Lucide React**: Biblioteca de ícones para React

### Backend
- **Next.js API Routes**: Endpoints serverless para funcionalidades backend
- **OpenAI API**: Integração com modelos de linguagem para o assistente virtual (Bear)
- **Node Fetch**: Biblioteca para fazer requisições HTTP

### Inteligência Artificial
- **OpenAI GPT-4o-mini**: Modelo de linguagem utilizado no assistente virtual
- **React Markdown**: Renderização de conteúdo markdown nas respostas do assistente

### Ferramentas de Desenvolvimento
- **ESLint**: Ferramenta de linting para JavaScript/TypeScript
- **PostCSS**: Ferramenta para transformar CSS com plugins JavaScript
- **Autoprefixer**: Plugin PostCSS para adicionar prefixos de navegador automaticamente

## Estrutura do Projeto

### Principais Diretórios
- **/app**: Estrutura principal do Next.js App Router
  - **/api**: Rotas de API serverless
  - **/globals.css**: Estilos globais da aplicação
  - **/layout.tsx**: Layout principal da aplicação
  - **/page.tsx**: Página principal do site
- **/components**: Componentes reutilizáveis
  - **/sections**: Seções principais da página (Hero, About, Modules, etc.)
  - **/ui**: Componentes de interface do usuário (botões, cards, etc.)
- **/data**: Dados estáticos como o prompt do assistente virtual
- **/hooks**: Hooks personalizados para funcionalidades específicas
- **/lib**: Utilitários e funções auxiliares
- **/public**: Arquivos estáticos (imagens, ícones, etc.)

## Funcionalidades Principais

### 1. Apresentação de Módulos do ERP
O site apresenta detalhadamente os diversos módulos do Kodiak ERP:
- Gestão de Estoque
- Compras
- Vendas
- Logística
- BI & Analytics
- Financeiro
- Gerencial
- Industrial
- Recebimento
- Faturamento

### 2. Seções Informativas
- **Hero Section**: Apresentação inicial com chamada para ação
- **About Section**: Informações sobre a empresa e sua missão/visão
- **Implementation Section**: Processo de implementação do sistema
- **Modules Section**: Detalhamento dos módulos disponíveis
- **Benefits Section**: Benefícios do uso do sistema
- **Evolution Section**: Evolução da plataforma ao longo do tempo
- **Stats Section**: Estatísticas e números relevantes
- **Clients Section**: Exibição de clientes e casos de sucesso
- **CTA Section**: Chamada final para ação (demonstração)

### 3. Assistente Virtual (Bear)
- Chat interativo com IA usando a API da OpenAI
- Responde perguntas sobre o sistema e seus módulos
- Direciona para atendimento humano quando necessário
- Interface amigável com efeito de digitação para respostas

### 4. Elementos Interativos
- Animações GSAP para melhorar a experiência do usuário
- Carrossel de clientes
- Modal de demonstração
- Botão de WhatsApp para contato direto

## Características Técnicas

### Animações e Interatividade
O projeto utiliza GSAP para criar animações sofisticadas que melhoram a experiência do usuário, incluindo:
- Animações de entrada de elementos
- Transições suaves entre seções
- Efeitos de hover em cards e botões

### Integração com IA
O assistente virtual Bear utiliza a API da OpenAI com o modelo GPT-4o-mini para fornecer respostas contextualizadas sobre o Kodiak ERP, seguindo um prompt detalhado que define seu comportamento e conhecimento.

### Responsividade
O site é totalmente responsivo, adaptando-se a diferentes tamanhos de tela através do uso de Tailwind CSS e hooks personalizados que detectam o tamanho da tela.

### Componentes Reutilizáveis
A arquitetura do projeto é baseada em componentes reutilizáveis, seguindo as melhores práticas de desenvolvimento React, o que facilita a manutenção e expansão do site.

## Conclusão

O projeto Kodiak ERP é um site moderno e interativo que apresenta de forma eficaz um sistema ERP para indústrias. Utilizando tecnologias de ponta como Next.js, React, TypeScript, Tailwind CSS e integração com IA, o site oferece uma experiência de usuário rica e informativa, com foco em converter visitantes em leads qualificados através de demonstrações do sistema.

A combinação de design atraente, animações fluidas e um assistente virtual inteligente cria uma plataforma de marketing digital eficiente para o produto Kodiak ERP.
