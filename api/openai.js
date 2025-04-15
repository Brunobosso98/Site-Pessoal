// Serverless function para proxy da OpenAI na Vercel
export default async function handler(req, res) {
  // Configurar CORS para permitir requisições da origem do site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder imediatamente a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Obter o endpoint da query string ou usar o caminho padrão
  const endpoint = req.query.endpoint || '/v1/chat/completions';

  try {
    // Log para debug
    console.log('Received request to OpenAI proxy:', {
      method: req.method,
      endpoint,
      bodyType: typeof req.body,
      hasApiKey: !!process.env.OPENAI_API_KEY,
    });

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

    // Verificar se a chave da API está definida
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not defined in environment variables');
      return res
        .status(500)
        .json({ error: 'OpenAI API key is not configured on the server' });
    }

    // Log do corpo da requisição para debug
    console.log('Request body:', body);

    // Fazer a requisição para a API da OpenAI
    const response = await fetch(`https://api.openai.com${endpoint}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: req.method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    // Log do status da resposta para debug
    console.log('OpenAI API response status:', response.status);

    // Obter os dados da resposta
    const data = await response.json();

    // Log resumido da resposta para debug
    console.log('OpenAI API response:', {
      status: response.status,
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      error: data.error,
    });

    // Retornar a resposta
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying para OpenAI:', error);

    // Log detalhado do erro para debug
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    res.status(500).json({
      error: 'Failed to proxy request to OpenAI',
      details: error.message,
      name: error.name,
    });
  }
}
