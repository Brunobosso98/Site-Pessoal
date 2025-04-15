/**
 * Respostas de fallback para o chatbot quando a API da OpenAI não está disponível
 */

// Mapeamento de palavras-chave para respostas
const fallbackResponses: Record<string, string> = {
  "quem é bruno": "Bruno Martins é um desenvolvedor full-stack e especialista em automação com vasta experiência em desenvolvimento de sistemas web, automação de processos e criação de chatbots com IA.",
  "projetos": "Bruno desenvolveu diversos projetos, incluindo um Assistente Financeiro no WhatsApp, Robô Paris para automação bancária, sistemas de otimização de rotas, automação para FGTS Digital e DCTFWeb.",
  "habilidades": "Bruno é especialista em Python, JavaScript/TypeScript, React, Node.js, automação com Selenium e PyAutoGUI, integrações com IA, e desenvolvimento de sistemas web completos.",
  "contato": "Você pode entrar em contato com Bruno através do botão de WhatsApp no site ou pelos links de suas redes sociais.",
  "default": "Estou aqui para fornecer informações sobre Bruno Martins e seus projetos. Pergunte-me sobre suas habilidades, projetos desenvolvidos ou como entrar em contato."
};

/**
 * Obtém uma resposta de fallback com base na mensagem do usuário
 * @param message Mensagem do usuário
 * @returns Resposta de fallback
 */
export const getFallbackResponse = (message: string): string => {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes("quem") && (messageLower.includes("bruno") || messageLower.includes("você"))) {
    return fallbackResponses["quem é bruno"];
  } 
  
  if (messageLower.includes("projeto") || messageLower.includes("trabalho") || messageLower.includes("portfolio")) {
    return fallbackResponses["projetos"];
  } 
  
  if (messageLower.includes("habilidade") || messageLower.includes("skill") || 
      messageLower.includes("conhecimento") || messageLower.includes("tecnologia") || 
      messageLower.includes("linguagem") || messageLower.includes("programa")) {
    return fallbackResponses["habilidades"];
  } 
  
  if (messageLower.includes("contato") || messageLower.includes("email") || 
      messageLower.includes("mensagem") || messageLower.includes("whatsapp") || 
      messageLower.includes("telefone")) {
    return fallbackResponses["contato"];
  }
  
  return fallbackResponses["default"];
};
