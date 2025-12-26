import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Para dispositivos móveis, mostrar o conteúdo diretamente sem animação ao scroll
    if (isMobile) {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        gsap.set(element, { opacity: 1, y: 0 });
      });

      // Limpe todas as animações ScrollTrigger existentes em dispositivos móveis
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      return;
    }

    // Configuração para desktop
    // Animate sections as they come into view, ignorando grupos com animações próprias
    const sections = document.querySelectorAll('section:not([data-skip-scroll-anim])');

    sections.forEach(section => {
      const elements = section.querySelectorAll('.animate-on-scroll');

      // Se não há elementos para animar, não crie o ScrollTrigger
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // Mudança para iniciar animação mais cedo
            toggleActions: "play none none none" // Alterado para não reverter
          }
        }
      );
    });

    // Add parallax effect to section backgrounds (apenas no desktop)
    if (!isMobile) {
      sections.forEach(section => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
          gsap.to(bg, {
            y: () => section.offsetHeight * 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });

    return () => {
      // Clean up any ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
