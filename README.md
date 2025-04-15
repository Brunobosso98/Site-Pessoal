# Currículo e Portfólio - Bruno Martins

Este projeto contém o site de currículo e portfólio de Bruno Martins, desenvolvedor full-stack e especialista em automação.

## Configuração do Ambiente

### Desenvolvimento Local

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com base no `.env.example`
4. Para desenvolvimento local, use o prefixo `VITE_` nas variáveis de ambiente:
   ```
   VITE_OPENAI_API_KEY=sua_chave_da_openai_aqui
   ```
5. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Deploy na Vercel

Ao fazer deploy na Vercel, configure as variáveis de ambiente nas configurações do projeto:

1. No dashboard da Vercel, vá para o seu projeto
2. Navegue até "Settings" > "Environment Variables"
3. Adicione a variável `OPENAI_API_KEY` (sem o prefixo `VITE_`)
4. Isso manterá sua chave API segura, pois não será exposta no cliente

#### Arquitetura na Vercel

O projeto usa uma arquitetura de API serverless na Vercel:

1. A pasta `api/` contém funções serverless que são executadas no servidor da Vercel
2. A função `api/openai.js` atua como um proxy para a API da OpenAI
3. O cliente envia requisições para `/api/openai` em vez de diretamente para a API da OpenAI
4. A chave da API é usada apenas no servidor, nunca exposta no cliente

## Recursos

- Site responsivo com design moderno
- Seção de projetos com detalhes sobre trabalhos anteriores
- Chatbot integrado com OpenAI para responder perguntas sobre Bruno
- Modal de contato via WhatsApp

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Vite
- OpenAI API
- GSAP para animações
