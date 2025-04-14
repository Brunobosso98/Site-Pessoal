
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'automation' | 'tools';
};

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || !progressRef.current) return;

    gsap.from(barRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top bottom-=50",
      }
    });

    gsap.fromTo(
      progressRef.current,
      { width: 0 },
      {
        width: `${level}%`,
        duration: 1,
        delay: 0.2 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top bottom-=50",
        }
      }
    );
  }, [index, level]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium text-foreground/60">{level}%</span>
      </div>
      <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-accent rounded-full"
          style={{ width: 0 }}
        ></div>
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills, category }: { 
  title: string; 
  skills: Skill[];
  category: Skill['category'];
}) => {
  const filteredSkills = skills.filter(skill => skill.category === category);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.from(titleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=50",
      }
    });
  }, []);

  return (
    <div>
      <h3 ref={titleRef} className="text-xl font-bold mb-6">{title}</h3>
      {filteredSkills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={index}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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
  }, []);

  const skills: Skill[] = [
    // Frontend
    { name: "React / Next.js", level: 90, category: 'frontend' },
    { name: "JavaScript / TypeScript", level: 95, category: 'frontend' },
    { name: "HTML / CSS", level: 90, category: 'frontend' },
    { name: "Tailwind CSS", level: 85, category: 'frontend' },
    { name: "GSAP", level: 80, category: 'frontend' },
    
    // Backend
    { name: "Node.js", level: 85, category: 'backend' },
    { name: "Python", level: 90, category: 'backend' },
    { name: "Flask", level: 80, category: 'backend' },
    { name: "PostgreSQL", level: 75, category: 'backend' },
    { name: "REST APIs", level: 85, category: 'backend' },
    
    // Automation
    { name: "Python Automation", level: 95, category: 'automation' },
    { name: "Selenium", level: 90, category: 'automation' },
    { name: "PyAutoGUI", level: 85, category: 'automation' },
    { name: "Web Scraping", level: 90, category: 'automation' },
    { name: "Pandas", level: 80, category: 'automation' },
    
    // Tools & Others
    { name: "Git / GitHub", level: 85, category: 'tools' },
    { name: "Docker", level: 75, category: 'tools' },
    { name: "AI APIs (Google, OpenAI)", level: 80, category: 'tools' },
    { name: "Figma / UI Design", level: 70, category: 'tools' },
    { name: "Algoritmos de Otimização", level: 85, category: 'tools' },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.08),transparent_50%)]"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Minhas <span className="highlight-gradient">Habilidades</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <SkillCategory title="Frontend" skills={skills} category="frontend" />
          <SkillCategory title="Backend" skills={skills} category="backend" />
          <SkillCategory title="Automação" skills={skills} category="automation" />
          <SkillCategory title="Ferramentas & Outros" skills={skills} category="tools" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
