/**
 * Configuration file for environment variables
 */

// In Vite, environment variables are accessed via import.meta.env
// and need to be prefixed with VITE_
export const config = {
  // Acessa a chave da API a partir da variável de ambiente
  openaiApiKey: import.meta.env.OPENAI_API_KEY || ''
};
