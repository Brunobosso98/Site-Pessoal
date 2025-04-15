
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Send, Bot, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { sendMessageToOpenAI, clearChatContext } from '@/lib/api';
import { getFallbackResponse } from '@/lib/fallback-responses';
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
    { id: '1', content: '## Olá! 👋\n\nSou o **Assistente Virtual de Bruno Martins**. Posso fornecer informações sobre Bruno, suas habilidades, projetos desenvolvidos e formas de contato.\n\nVocê pode perguntar sobre "Quem é Bruno" para ver a foto dele e conhecer mais sobre o desenvolvedor.\n\nComo posso ajudar você hoje?', isUser: false }  ]);
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

      // Usar a função de fallback para obter uma resposta
      const botResponse = getFallbackResponse(input);

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
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none chatbot-message'
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

        /* Estilos para o conteúdo Markdown - limitados ao chatbot */
        .chatbot-message p {
          margin-bottom: 0.5rem;
        }
        .chatbot-message p:last-child {
          margin-bottom: 0;
        }
        .chatbot-message ul,
        .chatbot-message ol {
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
        .chatbot-message ul {
          list-style-type: disc;
        }
        .chatbot-message ol {
          list-style-type: decimal;
        }
        .chatbot-message li {
          margin-bottom: 0.25rem;
        }
        .chatbot-message a {
          color: #3b82f6;
          text-decoration: none;
        }
        .chatbot-message a:hover {
          text-decoration: underline;
        }
        .chatbot-message strong {
          font-weight: bold;
        }
        .chatbot-message em {
          font-style: italic;
        }
        .chatbot-message h1,
        .chatbot-message h2,
        .chatbot-message h3 {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .chatbot-message h1 {
          font-size: 1.125rem;
        }
        .chatbot-message h2 {
          font-size: 1rem;
        }
        .chatbot-message h3 {
          font-size: 0.875rem;
        }
        .chatbot-message code {
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-size: 0.875rem;
        }
        .chatbot-message pre {
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          padding: 0.5rem;
          margin: 0.5rem 0;
          overflow-x: auto;
        }
        .chatbot-message pre code {
          padding: 0;
          background-color: transparent;
        }
        .chatbot-message blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 0.5rem;
          margin-left: 0.5rem;
          color: #6b7280;
        }
        .chatbot-message hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 0.5rem 0;
        }
        .chatbot-message table {
          border-collapse: collapse;
          width: 100%;
          margin: 0.5rem 0;
        }
        .chatbot-message th,
        .chatbot-message td {
          border: 1px solid #e5e7eb;
          padding: 0.25rem 0.5rem;
          text-align: left;
        }
        .chatbot-message th {
          background-color: #f3f4f6;
        }
        .chatbot-message img {
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
