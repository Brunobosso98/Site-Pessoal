// Este arquivo serve como um ponto de entrada para a pasta api
// Ele não faz nada por si só, mas ajuda a Vercel a reconhecer a pasta api

export default function handler(req, res) {
  res.status(200).json({ message: 'API endpoint is working' });
}
