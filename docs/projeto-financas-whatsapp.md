# Assistente Financeiro WhatsApp com IA

## Visão Geral do Projeto

Este projeto implementa um assistente financeiro pessoal que se integra ao WhatsApp e utiliza a API do Google Gemini para processamento de linguagem natural. O assistente permite que o usuário registre e consulte suas finanças diretamente pelo WhatsApp, usando linguagem natural.

## Funcionalidades Principais

- **Registro de Gastos**: Permite registrar despesas por categoria
- **Registro de Receitas**: Permite registrar entradas de dinheiro
- **Consulta de Saldo**: Mostra o saldo atual disponível
- **Análise por Categoria**: Permite consultar gastos por categoria específica
- **Processamento de Linguagem Natural**: Interpreta comandos em linguagem natural usando IA
- **Integração com WhatsApp**: Funciona diretamente no WhatsApp do usuário

## Tecnologias Utilizadas

### Backend
- **Node.js**: Plataforma de execução JavaScript
- **JavaScript**: Linguagem de programação principal

### Inteligência Artificial
- **Google Gemini API**: API de IA generativa para processamento de linguagem natural
- **Modelo**: gemini-2.0-flash

### Integração com WhatsApp
- **whatsapp-web.js**: Biblioteca não oficial para interação com WhatsApp Web
- **qrcode-terminal**: Geração de QR code para autenticação no WhatsApp

### Armazenamento de Dados
- **Sistema de Arquivos**: Dados armazenados em arquivos Markdown
- **Formato Markdown**: Estrutura tabular para armazenar transações financeiras

### Configuração e Ambiente
- **dotenv**: Gerenciamento de variáveis de ambiente
- **Configuração Modular**: Sistema de configuração baseado em arquivos .env

## Arquitetura do Sistema

O projeto é organizado em módulos com responsabilidades específicas:

1. **Módulo Principal (index.js)**: Inicializa o sistema e coordena os outros módulos
2. **Módulo WhatsApp (whatsapp.js)**: Gerencia a conexão e interações com o WhatsApp
3. **Módulo de Finanças (finance.js)**: Processa comandos financeiros e extrai informações
4. **Módulo de Armazenamento (storage.js)**: Gerencia a persistência dos dados financeiros
5. **Módulo de IA (gemini.js)**: Integra com a API do Google Gemini para processamento de linguagem natural
6. **Módulo de Configuração (config.js)**: Centraliza as configurações do sistema

## Fluxo de Funcionamento

1. O usuário envia uma mensagem pelo WhatsApp
2. O sistema verifica se a mensagem é do usuário autorizado
3. O sistema tenta identificar comandos específicos usando expressões regulares
4. Se não identificar um comando específico, utiliza a IA para interpretar a intenção
5. Executa a ação correspondente (registrar gasto/receita, consultar saldo, etc.)
6. Atualiza o arquivo de dados financeiros
7. Responde ao usuário com a confirmação da ação ou informação solicitada

## Estrutura de Dados

Os dados financeiros são armazenados em um arquivo Markdown (`data/finances.md`) com a seguinte estrutura:

```markdown
# Registro Financeiro

## Saldo Atual
0.00

## Transações
| Data | Tipo | Categoria | Valor | Descrição |
|------|------|-----------|-------|-----------|
| 01/01/2023 | Receita | Entrada | 1000.00 | Salário |
| 02/01/2023 | Gasto | Comida | 50.00 | Restaurante |
```

## Configuração e Variáveis de Ambiente

O sistema utiliza as seguintes variáveis de ambiente:

- **GEMINI_API_KEY**: Chave de API do Google Gemini
- **WHATSAPP_NUMBER**: Número de telefone do usuário
- **WHATSAPP_CHAT_ID**: ID do chat específico para responder (opcional)
- **USE_SPECIFIC_CHAT**: Se deve usar apenas um chat específico (true/false)
- **WHATSAPP_GROUP_ID**: ID do grupo específico (opcional)

## Requisitos do Sistema

- Node.js v18.0.0 ou superior
- Conexão com a internet
- WhatsApp instalado no celular do usuário
- Chave de API do Google Gemini

## Limitações e Considerações

- Utiliza uma biblioteca não oficial do WhatsApp (whatsapp-web.js)
- Requer que o WhatsApp Web esteja conectado durante a execução
- A API do Google Gemini tem limites de uso gratuito
- O bot responde apenas a mensagens do número configurado
- Os dados são armazenados localmente, sem backup em nuvem

## Exemplos de Uso

- Para registrar um gasto: "Gastei R$ 50 com comida"
- Para registrar uma receita: "Recebi R$ 1000"
- Para verificar o saldo: "Qual é o meu saldo?"
- Para consultar gastos por categoria: "Quanto gastei com comida?"
- Para ajuda: "Ajuda" ou "Help"
