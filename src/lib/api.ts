
/**
 * API service for making requests to OpenAI and other endpoints
 */
import { config } from './config';
import { systemPrompt } from './chatbot-prompt';
import { ChatbotContext } from './chatbot-context';

// Cria uma instância do contexto do chatbot
const chatContext = new ChatbotContext(systemPrompt);

// Função para limpar o contexto do chatbot
export const clearChatContext = (): void => {
  chatContext.clear();
};

// Function to send a message to OpenAI API
export const sendMessageToOpenAI = async (message: string) => {
  try {
    // Verifica se a chave da API está definida
    if (!config.openaiApiKey) {
      console.error('Chave da API OpenAI não definida. Verifique o arquivo .env');
      throw new Error('Chave da API OpenAI não definida');
    }

    // Adiciona a mensagem do usuário ao contexto
    chatContext.addUserMessage(message);

    // Obtém todas as mensagens do contexto para enviar à API
    const messages = chatContext.getMessages();

    // Determinar se estamos em produção ou desenvolvimento
    const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');

    // URL da API - em produção, usamos o endpoint serverless, em desenvolvimento, usamos o proxy do Vite
    const apiUrl = isProduction
      ? '/api/openai?endpoint=/v1/chat/completions'
      : '/api/openai/v1/chat/completions';

    // Cabeçalhos da requisição - em produção, não enviamos a chave da API, pois ela será usada pelo servidor
    const headers = {
      'Content-Type': 'application/json'
    };

    // Adicionar a chave da API apenas em desenvolvimento
    if (!isProduction && config.openaiApiKey) {
      headers['Authorization'] = `Bearer ${config.openaiApiKey}`;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;

    // Adiciona a resposta do assistente ao contexto
    chatContext.addAssistantMessage(assistantResponse);

    return assistantResponse;

    // Fallback response logic in case the API fails
    /*
    return new Promise((resolve) => {
      setTimeout(() => {
        const prompts: Record<string, string> = {
          "quem é bruno": "Bruno Martins é um desenvolvedor full-stack e especialista em automação com vasta experiência em desenvolvimento de sistemas web, automação de processos e criação de chatbots com IA.",
          "projetos": "Bruno desenvolveu diversos projetos, incluindo um Assistente Financeiro no WhatsApp, Robô Paris para automação bancária, sistemas de otimização de rotas, automação para FGTS Digital e DCTFWeb.",
          "habilidades": "Bruno é especialista em Python, JavaScript/TypeScript, React, Node.js, automação com Selenium e PyAutoGUI, integrações com IA, e desenvolvimento de sistemas web completos.",
          "contato": "Você pode entrar em contato com Bruno através do formulário na seção Contato do site ou pelos links de suas redes sociais.",
          "default": "Estou aqui para fornecer informações sobre Bruno Martins e seus projetos. Pergunte-me sobre suas habilidades, projetos desenvolvidos ou como entrar em contato."
        };

        let response = prompts.default;
        const messageLower = message.toLowerCase();

        if (messageLower.includes("quem") && messageLower.includes("bruno")) {
          response = prompts["quem é bruno"];
        } else if (messageLower.includes("projeto") || messageLower.includes("trabalho")) {
          response = prompts["projetos"];
        } else if (messageLower.includes("habilidade") || messageLower.includes("skill") || messageLower.includes("conhecimento")) {
          response = prompts["habilidades"];
        } else if (messageLower.includes("contato") || messageLower.includes("email") || messageLower.includes("mensagem")) {
          response = prompts["contato"];
        }

        resolve(response);
      }, 1000);
    });
    */
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);
    throw error;
  }
};
