import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = ({ icon: Icon, title, content }: {
  icon: React.ElementType,
  title: string,
  content: string
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="bg-accent/10 p-3 rounded-lg h-fit">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-foreground/70">{content}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Em dispositivos móveis, mostrar os elementos imediatamente
    if (isMobile) {
      [titleRef.current, formRef.current, infoRef.current].forEach(el => {
        if (el) gsap.set(el, { opacity: 1, x: 0, y: 0 });
      });
      return;
    }

    gsap.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
      }
    });

    gsap.from(formRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom-=100",
      }
    });

    gsap.from(infoRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top bottom-=100",
      }
    });
  }, [isMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_50%)]"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-12 text-center animate-on-scroll">
          Entre em <span className="highlight-gradient">Contato</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 animate-on-scroll">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensagem
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Sua mensagem..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <div ref={infoRef} className="flex flex-col justify-between animate-on-scroll">
            <div>
              <h3 className="text-xl font-semibold mb-6">Informações de Contato</h3>

              <ContactInfo
                icon={Mail}
                title="Email"
                content="bruno.martins@exemplo.com"
              />

              <ContactInfo
                icon={Phone}
                title="Telefone"
                content="+55 (11) 98765-4321"
              />

              <ContactInfo
                icon={MapPin}
                title="Localização"
                content="São Paulo, SP - Brasil"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
