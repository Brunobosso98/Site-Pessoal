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
    if (isMobile) {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        gsap.set(element, { opacity: 1, y: 0 });
      });

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      return;
    }

    const sections = document.querySelectorAll('section:not([data-skip-scroll-anim])');

    sections.forEach(section => {
      const elements = section.querySelectorAll('.animate-on-scroll');

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
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 100,
          behavior: 'smooth'
        });
    };

    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, [isMobile]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
