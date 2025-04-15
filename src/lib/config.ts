/**
 * Configuration file for environment variables
 */

// Determinar se estamos em produção ou desenvolvimento
const isProduction = typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  !window.location.hostname.includes('127.0.0.1');

// Em produção, não precisamos da chave da API no cliente, pois ela será usada pelo servidor
// Em desenvolvimento, precisamos da chave da API no cliente para o proxy do Vite
export const config = {
  // Acessa a chave da API a partir da variável de ambiente
  openaiApiKey: isProduction ? '' : import.meta.env.VITE_OPENAI_API_KEY || ''
};
