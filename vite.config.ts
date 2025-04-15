import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import dotenv from 'dotenv';

// https://vitejs.dev/config/
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente com base no modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openai/, ''),
      }
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
});
