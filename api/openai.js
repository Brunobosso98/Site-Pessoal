// Serverless function para proxy da OpenAI na Vercel
export default async function handler(req, res) {
  // Obter o endpoint da query string ou usar o caminho padrão
  const endpoint = req.query.endpoint || '/v1/chat/completions';

  try {
    // Parsear o corpo da requisição
    let body;
    if (req.method !== 'GET') {
      // Se o corpo já for um objeto, use-o diretamente
      if (typeof req.body === 'object') {
        body = req.body;
      }
      // Se o corpo for uma string, tente fazer o parse como JSON
      else if (typeof req.body === 'string') {
        try {
          body = JSON.parse(req.body);
        } catch (e) {
          console.error('Error parsing request body:', e);
          return res.status(400).json({ error: 'Invalid request body' });
        }
      }
    }

    // Fazer a requisição para a API da OpenAI
    const response = await fetch(`https://api.openai.com${endpoint}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: req.method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    // Obter os dados da resposta
    const data = await response.json();

    // Retornar a resposta
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying to OpenAI:', error);
    res.status(500).json({
      error: 'Failed to proxy request to OpenAI',
      details: error.message,
    });
  }
}
