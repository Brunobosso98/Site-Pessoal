
import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(subheadingRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(scrollDownRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.2");

    // Create a floating animation for the scroll button
    gsap.to(scrollDownRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_50%)]"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center text-center">
        <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl">
          Full-Stack Developer & <br />
          <span className="highlight-gradient">Especialista em Automação</span>
        </h1>
        
        <p ref={subheadingRef} className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10">
          Transformando ideias em soluções tecnológicas inovadoras. 
          Especializado em automação, integração de sistemas e desenvolvimento web.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6">
            Ver Projetos
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 border-accent/20 hover:border-accent/40">
            Contato
          </Button>
        </div>

        <div className="flex gap-4 mb-16">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
             className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
             className="bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div ref={scrollDownRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-foreground/60 mb-2">Scroll para explorar</span>
        <ArrowDown className="h-6 w-6 animate-bounce text-foreground/60" />
      </div>
    </section>
  );
};

export default Hero;
