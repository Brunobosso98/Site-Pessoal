import { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  Github,
  Linkedin,
  MessageCircle,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import WhatsAppModal from './WhatsAppModal';

const proofPoints = [
  'Automação fiscal e contábil',
  'Produtos web com backend real',
  'IA aplicada a processos',
];

const nodes = [
  { label: 'ERP', className: 'left-[8%] top-[18%]', tone: 'cyan' },
  { label: 'Fiscal', className: 'right-[12%] top-[16%]', tone: 'lime' },
  { label: 'APIs', className: 'left-[15%] bottom-[22%]', tone: 'coral' },
  { label: 'IA', className: 'right-[18%] bottom-[18%]', tone: 'cyan' },
  { label: 'Dados', className: 'left-[43%] top-[44%]', tone: 'lime' },
];

const toneClasses = {
  cyan: 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100 shadow-[0_0_32px_rgba(0,229,255,0.14)]',
  lime: 'border-lime-300/50 bg-lime-300/10 text-lime-100 shadow-[0_0_32px_rgba(190,255,0,0.12)]',
  coral: 'border-rose-300/50 bg-rose-300/10 text-rose-100 shadow-[0_0_32px_rgba(255,77,94,0.12)]',
};

const SystemMap = () => {
  return (
    <div className="hero-visual relative mx-auto h-[420px] w-full max-w-[560px] md:h-[520px]">
      <div className="absolute inset-0 rounded-lg border border-white/10 bg-[#071014]/[0.88] shadow-[0_28px_90px_rgba(0,0,0,0.5)] [transform:perspective(1200px)_rotateX(7deg)_rotateY(-10deg)]">
        <div className="matrix-grid absolute inset-0 rounded-lg opacity-80" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 520" fill="none" aria-hidden="true">
          <path className="route-line" d="M78 108 C178 72 258 118 316 248 C358 342 442 370 504 294" />
          <path className="route-line route-line-delay-1" d="M92 410 C176 288 278 288 364 116 C410 32 474 64 506 104" />
          <path className="route-line route-line-delay-2" d="M78 108 C152 202 222 252 316 248 C404 244 466 202 506 104" />
          <path className="route-line route-line-delay-3" d="M92 410 C172 432 246 384 316 248 C370 142 440 136 506 104" />
        </svg>

        <div className="absolute left-6 top-6 rounded-md border border-white/10 bg-black/[0.35] px-4 py-3">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-100/70">
            <Network className="h-3.5 w-3.5" />
            fluxo ativo
          </div>
          <div className="font-code text-sm text-white">processos: 12</div>
          <div className="mt-1 font-code text-xs text-lime-200">erros manuais -82%</div>
        </div>

        <div className="absolute bottom-6 right-6 w-[220px] rounded-md border border-white/10 bg-black/40 px-4 py-3">
          <div className="mb-3 flex items-center justify-between text-xs text-white/60">
            <span className="font-code">pipeline</span>
            <span className="rounded-sm bg-lime-300/[0.15] px-2 py-1 text-lime-100">online</span>
          </div>
          <div className="space-y-2">
            <span className="block h-1.5 w-full rounded bg-cyan-300/[0.35]" />
            <span className="block h-1.5 w-10/12 rounded bg-lime-300/[0.35]" />
            <span className="block h-1.5 w-8/12 rounded bg-rose-300/[0.35]" />
          </div>
        </div>

        <div className="absolute right-8 top-[38%] hidden w-[178px] rounded-md border border-cyan-200/20 bg-[#061114]/80 p-3 md:block">
          <div className="flex items-center gap-2 text-xs text-cyan-100/70">
            <Bot className="h-4 w-4" />
            assistente IA
          </div>
          <p className="mt-2 font-code text-xs leading-5 text-white/80">
            classifica XMLs<br />
            cruza regras<br />
            reporta exceções
          </p>
        </div>

        <div className="absolute bottom-24 left-8 hidden w-[168px] rounded-md border border-rose-200/20 bg-[#12090b]/70 p-3 sm:block">
          <div className="flex items-center gap-2 text-xs text-rose-100/75">
            <ShieldCheck className="h-4 w-4" />
            auditoria
          </div>
          <p className="mt-2 font-code text-xs leading-5 text-white/80">logs, filas, retry</p>
        </div>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-cyan-200/[0.35] bg-cyan-300/10 text-cyan-50 shadow-[0_0_70px_rgba(0,229,255,0.22)]">
          <Braces className="h-9 w-9" />
        </div>

        {nodes.map((node) => (
          <div
            key={node.label}
            className={`signal-node absolute rounded-md border px-3 py-2 font-code text-xs ${node.className} ${toneClasses[node.tone as keyof typeof toneClasses]}`}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.6 })
        .from(headingRef.current, { y: 28, opacity: 0, duration: 0.9 }, '-=0.35')
        .from(textRef.current, { y: 18, opacity: 0, duration: 0.7 }, '-=0.45')
        .from(actionsRef.current, { y: 18, opacity: 0, duration: 0.65 }, '-=0.35')
        .from(proofRef.current?.children ?? [], { y: 14, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.25')
        .from(visualRef.current, { x: 44, opacity: 0, rotateY: -8, duration: 1 }, '-=0.85');

      gsap.to('.signal-node', {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
        ease: 'sine.inOut',
      });

      gsap.to(scrollDownRef.current, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[92svh] items-center overflow-hidden pb-12 pt-28 md:pt-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="max-w-3xl">
            <div
              ref={eyebrowRef}
              className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-cyan-200/[0.08] px-3 py-2 font-code text-xs uppercase tracking-[0.2em] text-cyan-100"
            >
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,255,0,0.9)]" />
              full-stack + automação
            </div>

            <h1
              ref={headingRef}
              className="max-w-[12ch] text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Bruno Martins
            </h1>

            <p
              ref={textRef}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl"
            >
              Desenvolvo sistemas full-stack e automações que tiram processos críticos do improviso:
              integrações, robôs, IA aplicada e produtos internos que economizam tempo de operação.
            </p>

            <div ref={actionsRef} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-md bg-cyan-300 px-6 text-sm font-bold text-slate-950 hover:bg-cyan-200">
                <a href="#projects" className="inline-flex items-center gap-2">
                  Ver projetos
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <WhatsAppModal>
                <Button
                  variant="outline"
                  className="h-12 rounded-md border-rose-300/[0.35] bg-rose-300/10 px-6 text-sm font-bold text-rose-50 hover:border-rose-200 hover:bg-rose-300/[0.18]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar comigo
                </Button>
              </WhatsAppModal>
            </div>

            <div ref={proofRef} className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point} className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-5 text-slate-200">
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://github.com/Brunobosso98"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 hover:border-cyan-200/50 hover:text-cyan-100"
                aria-label="GitHub de Bruno Martins"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-bosso-martins-9a1723270/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 hover:border-cyan-200/50 hover:text-cyan-100"
                aria-label="LinkedIn de Bruno Martins"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div ref={visualRef} className="relative">
            <SystemMap />
          </div>
        </div>

        <a
          ref={scrollDownRef}
          href="#projects"
          className="mt-8 inline-flex items-center gap-2 font-code text-xs uppercase tracking-[0.18em] text-slate-400 hover:text-cyan-100"
        >
          Casos em produção
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
