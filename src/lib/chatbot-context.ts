/**
 * Contexto do chatbot para armazenar histórico de mensagens
 */

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Classe para gerenciar o contexto do chatbot
export class ChatbotContext {
  private messages: ChatMessage[] = [];
  private maxMessages: number = 10; // Número máximo de mensagens para manter no contexto

  constructor(systemPrompt: string) {
    // Inicializa com o prompt do sistema
    this.messages.push({
      role: 'system',
      content: systemPrompt
    });
  }

  // Adiciona uma mensagem do usuário ao contexto
  addUserMessage(content: string): void {
    this.messages.push({
      role: 'user',
      content
    });
    this.trimMessages();
  }

  // Adiciona uma resposta do assistente ao contexto
  addAssistantMessage(content: string): void {
    this.messages.push({
      role: 'assistant',
      content
    });
    this.trimMessages();
  }

  // Obtém todas as mensagens do contexto
  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  // Limita o número de mensagens no contexto para evitar tokens excessivos
  private trimMessages(): void {
    // Mantém a mensagem do sistema e as últimas (maxMessages - 1) mensagens
    if (this.messages.length > this.maxMessages + 1) {
      const systemMessage = this.messages[0];
      const recentMessages = this.messages.slice(-(this.maxMessages));
      this.messages = [systemMessage, ...recentMessages];
    }
  }

  // Limpa o histórico de mensagens, mantendo apenas o prompt do sistema
  clear(): void {
    const systemMessage = this.messages[0];
    this.messages = [systemMessage];
  }
}
