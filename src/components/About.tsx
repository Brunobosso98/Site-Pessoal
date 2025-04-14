import { useEffect, useRef } from 'react';
import { Zap, Code, BarChart, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ icon: Icon, title, description, delay }: {
  icon: React.ElementType,
  title: string,
  description: string,
  delay: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!cardRef.current) return;

    // Em dispositivos móveis, mostrar o card imediatamente
    if (isMobile) {
      gsap.set(cardRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(cardRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: delay * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
      }
    });
  }, [delay, isMobile]);

  return (
    <div
      ref={cardRef}
      className="bg-foreground/5 hover:bg-foreground/10 p-6 rounded-xl transition-all duration-300 hover:shadow-md card-hover animate-on-scroll"
    >
      <div className="bg-accent/10 rounded-lg p-3 w-fit mb-4">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Em dispositivos móveis, mostrar o conteúdo imediatamente
    if (isMobile) {
      [titleRef.current, textRef.current, imageRef.current].forEach(el => {
        if (el) gsap.set(el, { opacity: 1, y: 0, x: 0 });
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

    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom-=100",
      }
    });

    gsap.from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom-=100",
      }
    });
  }, [isMobile]);

  const services = [
    {
      icon: Code,
      title: "Desenvolvimento Full-Stack",
      description: "Construção de sistemas web completos utilizando as mais modernas tecnologias do mercado."
    },
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Criação de soluções automatizadas para otimizar fluxos de trabalho e reduzir erros humanos."
    },
    {
      icon: BarChart,
      title: "Integração de Sistemas",
      description: "Integração de plataformas para garantir a comunicação eficiente entre diferentes sistemas."
    },
    {
      icon: Rocket,
      title: "Soluções de IA & Chatbots",
      description: "Desenvolvimento de assistentes virtuais e implementação de soluções baseadas em inteligência artificial."
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_50%)]"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6 text-center animate-on-scroll">
          Sobre <span className="highlight-gradient">Mim</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div ref={textRef} className="flex flex-col justify-center animate-on-scroll">
            <p className="text-lg mb-4">
              Olá! Sou Bruno Martins, um desenvolvedor full-stack apaixonado por criar soluções tecnológicas inovadoras que resolvem problemas reais.
            </p>
            <p className="text-lg mb-4">
              Minha especialidade está em desenvolver sistemas de automação que economizam tempo e recursos, além de aplicações web modernas e intuitivas.
            </p>
            <p className="text-lg mb-6">
              Com experiência em diversas tecnologias e linguagens, busco sempre entregar projetos de alta qualidade que superem as expectativas dos clientes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Node.js</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Python</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Next.js</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Flask</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">TypeScript</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">PostgreSQL</span>
            </div>
          </div>

          <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] group bg-gradient-to-br from-background to-muted animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src="/eu.jpeg"
              alt="Bruno Martins"
              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
