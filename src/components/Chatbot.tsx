
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Send, Bot, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { sendMessageToOpenAI, clearChatContext } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: '## Olá! 👋\n\nSou o **Assistente Virtual de Bruno Martins**. Posso fornecer informações sobre Bruno, suas habilidades, projetos desenvolvidos e formas de contato.\n\nVocê pode perguntar sobre "Quem é Bruno" para ver a foto dele e conhecer mais sobre o desenvolvedor.\n\nComo posso ajudar você hoje?', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleRefs = useRef<HTMLDivElement[]>([]);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Animate button and chatbox
  useEffect(() => {
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 1
      });

      // Add floating animation to button
      gsap.to(buttonRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      if (isOpen) {
        gsap.fromTo(
          chatboxRef.current,
          {
            scale: 0.9,
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out"
          }
        );

        // Create particles animation when chat opens
        createParticles();
      }
    }
  }, [isOpen]);

  // Animate message bubbles when they appear
  useEffect(() => {
    bubbleRefs.current.forEach((bubble, index) => {
      if (bubble) {
        gsap.fromTo(
          bubble,
          {
            scale: 0.8,
            opacity: 0,
            x: messages[index].isUser ? 20 : -20
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: 0.1
          }
        );
      }
    });
  }, [messages]);

  // Function to create particles animation
  const createParticles = () => {
    if (!chatboxRef.current) return;

    const container = chatboxRef.current;
    const particleCount = 20;

    // Clean any existing particles
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = `hsl(${Math.random() * 30 + 250}, 70%, 70%)`;
      particle.style.borderRadius = '50%';
      particle.style.zIndex = '40';

      // Random starting position around the center
      const startX = Math.random() * 300 - 150;
      const startY = Math.random() * 300 - 150;

      container.appendChild(particle);

      gsap.fromTo(
        particle,
        {
          opacity: 1,
          scale: 0,
          x: 0,
          y: 0,
        },
        {
          opacity: 0,
          scale: Math.random() * 2 + 1,
          x: startX,
          y: startY,
          duration: Math.random() * 1 + 0.5,
          ease: "power2.out",
          onComplete: () => {
            particle.remove();
          }
        }
      );
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Função para limpar o histórico de conversa
  const handleClearChat = () => {
    // Limpa o contexto no backend
    clearChatContext();

    // Mantém apenas a mensagem inicial no frontend
    setMessages([
      { id: '1', content: '## Olá! 👋\n\nSou o **Assistente Virtual de Bruno Martins**. Posso fornecer informações sobre Bruno, suas habilidades, projetos desenvolvidos e formas de contato.\n\nVocê pode perguntar sobre "Quem é Bruno" para ver a foto dele e conhecer mais sobre o desenvolvedor.\n\nComo posso ajudar você hoje?', isUser: false }
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call the OpenAI API
      const response = await sendMessageToOpenAI(input);
      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);

      // Fallback to predefined responses if API fails
      const prompts = {
        "quem é bruno": "![Bruno Martins](/eu.jpeg)\n\n**Bruno Martins** é um desenvolvedor full-stack e especialista em automação com vasta experiência em desenvolvimento de sistemas web, automação de processos e criação de chatbots com IA. Ele combina conhecimentos técnicos avançados com uma compreensão profunda de processos de negócio.",

        "projetos": "### Projetos Desenvolvidos por Bruno Martins\n\n**Bruno desenvolveu diversos projetos, incluindo:**\n\n1. **Assistente Financeiro WhatsApp com IA** - Sistema de gerenciamento financeiro via WhatsApp\n2. **Robô Paris** - Automação bancária para extração de extratos\n3. **Sistema de Otimização de Rotas** - Solução para otimização logística\n4. **Automação FGTS Digital** - Sistema para download e organização de guias\n5. **DCTFWeb Automation** - Ferramenta para automação de declarações fiscais\n6. **Site Institucional Kodiak ERP** - Apresentação de sistema ERP com IA",

        "habilidades": "### Habilidades Técnicas de Bruno Martins\n\n**Linguagens de Programação:**\n- Python\n- JavaScript/TypeScript\n- HTML/CSS\n- SQL\n\n**Frameworks e Bibliotecas:**\n- Frontend: React, Next.js, Tailwind CSS, GSAP\n- Backend: Node.js, Flask, Express\n- Automação: Selenium, PyAutoGUI, Pandas\n- IA: Integrações com OpenAI e Google Gemini\n\n**Bancos de Dados:**\n- SQL e NoSQL",

        "contato": "Para entrar em contato com **Bruno Martins**, você pode utilizar o formulário na seção **Contato** do site ou através dos links de suas redes sociais disponíveis na página.",

        "assistente whatsapp": "### Assistente Financeiro WhatsApp\n\nO **Assistente Financeiro WhatsApp** é um sistema que integra WhatsApp com IA para gerenciamento financeiro pessoal.\n\n**Funcionalidades:**\n- Registro de gastos e receitas\n- Consulta de saldo\n- Análise por categoria\n- Processamento de linguagem natural\n\n**Tecnologias utilizadas:**\n- Node.js\n- JavaScript\n- Google Gemini API\n- whatsapp-web.js",

        "robo paris": "### Robô Paris - Automação Bancária\n\nO **Robô Paris** é uma solução de automação para extração e gerenciamento de extratos bancários de múltiplas empresas através do portal SS Parisi.\n\n**Tecnologias utilizadas:**\n- Python\n- Selenium\n- Pandas\n- WebDriver Manager\n\n**Principais funcionalidades:**\n- Extração automatizada de extratos\n- Processamento em lote\n- Organização de arquivos\n- Tratamento de erros",

        "otimizacao rotas": "### Sistema de Otimização de Rotas\n\nO **Sistema de Otimização de Rotas** é uma solução web completa para otimização e gerenciamento de rotas de vendas e entregas.\n\n**Tecnologias utilizadas:**\n- Flask (Python)\n- SQLAlchemy\n- PostgreSQL\n- Algoritmos TSP e OSRM\n\n**Resultados:**\n- Redução de 20-30% em custos operacionais\n- Aumento de 25% em produtividade\n- ROI positivo em 3-6 meses",

        "fgts digital": "### Automação FGTS Digital\n\nA **Automação FGTS Digital** é um sistema para download e organização de guias do FGTS Digital para múltiplos CNPJs.\n\n**Tecnologias utilizadas:**\n- Python\n- PyAutoGUI\n- Pandas\n- OpenPyXL\n\n**Resultados:**\n- Redução de 95% no tempo de processamento\n- Eliminação completa de erros humanos\n- Sistema de logs para rastreabilidade",

        "dctfweb": "### DCTFWeb Automation\n\nO **DCTFWeb Automation** é uma ferramenta para automatizar o download de declarações DCTFWeb do site da Receita Federal.\n\n**Tecnologias utilizadas:**\n- Python\n- PyAutoGUI\n- Pandas\n- Pyperclip\n\n**Funcionalidades:**\n- Automação de login\n- Processamento em lote de múltiplos CNPJs\n- Download automático\n- Organização de arquivos",

        "kodiak erp": "### Kodiak ERP - Site Institucional\n\nO **Kodiak ERP** é um site institucional moderno e interativo para apresentação de um sistema ERP para indústrias.\n\n**Tecnologias utilizadas:**\n- Next.js\n- React\n- TypeScript\n- Tailwind CSS\n- GSAP\n- OpenAI API\n\n**Funcionalidades:**\n- Apresentação de módulos\n- Assistente virtual com IA\n- Elementos interativos\n- Design responsivo",

        "default": "## Olá! 👋\n\nSou o **Assistente Virtual de Bruno Martins**. Posso fornecer informações sobre Bruno, suas habilidades, projetos desenvolvidos e formas de contato.\n\nComo posso ajudar você hoje?"
      };

      let botResponse = prompts.default;

      const userMessageLower = input.toLowerCase();

      if (userMessageLower.includes("quem") && userMessageLower.includes("bruno")) {
        botResponse = prompts["quem é bruno"];
      } else if (userMessageLower.includes("projeto")) {
        botResponse = prompts["projetos"];
      } else if (userMessageLower.includes("habilidade") || userMessageLower.includes("skill") || userMessageLower.includes("conhecimento") || userMessageLower.includes("tecnologia")) {
        botResponse = prompts["habilidades"];
      } else if (userMessageLower.includes("contato") || userMessageLower.includes("email") || userMessageLower.includes("mensagem")) {
        botResponse = prompts["contato"];
      } else if (userMessageLower.includes("whatsapp") && (userMessageLower.includes("assistente") || userMessageLower.includes("financeiro"))) {
        botResponse = prompts["assistente whatsapp"];
      } else if (userMessageLower.includes("paris") || (userMessageLower.includes("robo") && userMessageLower.includes("banco"))) {
        botResponse = prompts["robo paris"];
      } else if (userMessageLower.includes("rota") || userMessageLower.includes("otimiza")) {
        botResponse = prompts["otimizacao rotas"];
      } else if (userMessageLower.includes("fgts")) {
        botResponse = prompts["fgts digital"];
      } else if (userMessageLower.includes("dctf")) {
        botResponse = prompts["dctfweb"];
      } else if (userMessageLower.includes("kodiak") || userMessageLower.includes("erp")) {
        botResponse = prompts["kodiak erp"];
      }

      // Add fallback message
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        isUser: false
      };

      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        ref={buttonRef}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg z-50 p-0 flex items-center justify-center"
        onClick={toggleChat}
      >
        <Bot size={24} className="text-white" />
      </Button>

      {/* Chatbox */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className="fixed bottom-24 right-6 w-80 sm:w-96 max-w-[90vw] h-[500px] max-h-[80vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 bg-accent text-white flex items-center justify-between relative">
            <div className="flex items-center">
              <Bot size={20} className="mr-2" />
              <div className="flex flex-col">
                <span className="font-semibold">Assistente Virtual</span>
                <span className="text-xs text-white/80">Powered by OpenAI</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearChat}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-accent-foreground/10"
                title="Limpar conversa"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                ref={(el) => {
                  if (el) bubbleRefs.current[index] = el;
                }}
              >
                {!msg.isUser && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent mr-2 flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-accent text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  {msg.isUser ? (
                    <span>{msg.content}</span>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Estilização personalizada para elementos markdown
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                        li: ({children}) => <li className="mb-1">{children}</li>,
                        a: ({href, children}) => <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                        img: ({src, alt}) => <img src={src} alt={alt} className="rounded-md my-2 max-w-full mx-auto" style={{ maxHeight: '180px', objectFit: 'cover' }} />,
                        strong: ({children}) => <strong className="font-bold">{children}</strong>,
                        em: ({children}) => <em className="italic">{children}</em>,
                        h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                        code: ({children, className}) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <code className="block bg-gray-100 p-2 rounded text-sm overflow-x-auto my-2">{children}</code>
                          ) : (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
                          );
                        },
                        pre: ({children}) => <pre className="bg-gray-100 p-2 rounded overflow-x-auto my-2">{children}</pre>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent mr-2 flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-3 rounded-lg rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 px-4 border rounded-l-full focus:outline-none focus:ring-1 focus:ring-accent bg-gray-50"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-accent hover:bg-accent/90 text-white rounded-l-none rounded-r-full transition-colors"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add a style tag for the particle animation and markdown styles */}
      <style>
        {`
        .particle {
          position: absolute;
          pointer-events: none;
        }

        /* Estilos para o conteúdo Markdown */
        p {
          margin-bottom: 0.5rem;
        }
        p:last-child {
          margin-bottom: 0;
        }
        ul, ol {
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
        ul {
          list-style-type: disc;
        }
        ol {
          list-style-type: decimal;
        }
        li {
          margin-bottom: 0.25rem;
        }
        a {
          color: #3b82f6;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        strong {
          font-weight: bold;
        }
        em {
          font-style: italic;
        }
        h1, h2, h3 {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        h1 {
          font-size: 1.125rem;
        }
        h2 {
          font-size: 1rem;
        }
        h3 {
          font-size: 0.875rem;
        }
        code {
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-size: 0.875rem;
        }
        pre {
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          padding: 0.5rem;
          margin: 0.5rem 0;
          overflow-x: auto;
        }
        pre code {
          padding: 0;
          background-color: transparent;
        }
        blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 0.5rem;
          margin-left: 0.5rem;
          color: #6b7280;
        }
        hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 0.5rem 0;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 0.5rem 0;
        }
        th, td {
          border: 1px solid #e5e7eb;
          padding: 0.25rem 0.5rem;
          text-align: left;
        }
        th {
          background-color: #f3f4f6;
        }
        img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 0.75rem 0;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        `}
      </style>
    </>
  );
};

export default Chatbot;
