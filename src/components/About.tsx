import { useEffect, useRef } from 'react';
import { CheckCircle2, Compass, Handshake, TimerReset } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: Compass,
    title: 'Entendo o processo antes da tela',
    text: 'Fluxo, exceções e operação vêm antes de layout bonito. Isso evita sistema que impressiona no começo e falha no uso real.',
  },
  {
    icon: TimerReset,
    title: 'Automação com rastreabilidade',
    text: 'Robôs e integrações precisam de logs, retries, alertas e caminhos claros para quando algo sair do esperado.',
  },
  {
    icon: Handshake,
    title: 'Entrega orientada a negócio',
    text: 'O foco é reduzir tempo, erro e dependência manual. Código é meio; o resultado precisa aparecer na rotina.',
  },
];

const stack = ['Python', 'Node.js', 'React', 'TypeScript', 'Flask', 'PostgreSQL', 'Supabase', 'Redis', 'GSAP', 'APIs de IA'];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      [contentRef.current, portraitRef.current, principlesRef.current].forEach((element) => {
        if (element) gsap.set(element, { opacity: 1, y: 0, x: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from([contentRef.current, portraitRef.current], {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=120',
        },
      });

      gsap.from(principlesRef.current?.children ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: principlesRef.current,
          start: 'top bottom-=80',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div ref={contentRef}>
            <p className="font-code text-xs uppercase tracking-[0.22em] text-cyan-100">perfil</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              Desenvolvedor para quando o problema envolve sistema, integração e operação real.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Sou Bruno Martins. Trabalho na interseção entre desenvolvimento full-stack, automação e IA aplicada,
                principalmente em rotinas fiscais, contábeis, financeiras e operacionais.
              </p>
              <p>
                Meu diferencial está em transformar processos manuais em produtos internos: telas, APIs, bancos,
                robôs, filas, relatórios e pontos de controle para a equipe confiar na entrega.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 font-code text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div ref={portraitRef} className="relative">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071014]">
              <div className="grid gap-0 md:grid-cols-[0.78fr_1fr]">
                <div className="relative min-h-[360px] border-b border-white/10 bg-black/30 md:border-b-0 md:border-r">
                  <img
                    src="/eu.jpeg"
                    alt="Bruno Martins"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(5,8,10,0.92))] p-5">
                    <p className="font-display text-xl font-bold text-white">Bruno Martins</p>
                    <p className="mt-1 text-sm text-slate-300">Full-stack developer + automação</p>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-lime-100" />
                    <span className="font-code text-xs uppercase tracking-[0.18em] text-lime-100">o que entra no pacote</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      'Levantamento do fluxo e das exceções críticas',
                      'Arquitetura simples de manter e evoluir',
                      'Interface objetiva para rotina de trabalho',
                      'Integrações, logs e documentação prática',
                      'Acompanhamento para estabilizar a entrega',
                    ].map((item) => (
                      <div key={item} className="flex gap-3 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <p className="text-sm leading-6 text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={principlesRef} className="mt-10 grid gap-4 md:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-5 inline-flex rounded-md border border-cyan-200/20 bg-cyan-200/10 p-3 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
