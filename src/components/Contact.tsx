import { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/use-mobile';
import WhatsAppModal from './WhatsAppModal';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { icon: Mail, label: 'Email', value: 'brugala@gmail.com', href: 'mailto:brugala@gmail.com' },
  { icon: Phone, label: 'Telefone', value: '+55 (19) 98711-1198', href: 'tel:+5519987111198' },
  { icon: MapPin, label: 'Base', value: 'Itapira, SP - Brasil' },
];

const conversationStarters = [
  'Tenho um processo manual que precisa virar sistema.',
  'Preciso integrar ferramentas e organizar dados.',
  'Quero validar uma ideia de produto interno ou SaaS.',
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      [headingRef.current, panelRef.current].forEach((element) => {
        if (element) gsap.set(element, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, panelRef.current], {
        y: 34,
        opacity: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=120',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mx-auto max-w-4xl text-center">
          <p className="font-code text-xs uppercase tracking-[0.22em] text-cyan-100">fechamento</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
            Se você viu um problema parecido, o próximo passo é conversar.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Me chame com contexto do processo, dores atuais e objetivo do sistema. Eu ajudo a transformar isso em
            escopo técnico, caminho de entrega e orçamento.
          </p>
        </div>

        <div
          ref={panelRef}
          className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#071014]/90 shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
        >
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white">Uma boa primeira mensagem</h3>
              <div className="mt-6 space-y-3">
                {conversationStarters.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-300 font-code text-xs font-bold text-slate-950">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppModal>
                  <Button className="h-12 rounded-md bg-rose-400 px-6 text-sm font-bold text-slate-950 hover:bg-rose-300">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar no WhatsApp
                  </Button>
                </WhatsAppModal>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-md border-cyan-200/25 bg-cyan-200/10 px-6 text-sm font-bold text-cyan-50 hover:border-cyan-100/50 hover:bg-cyan-200/[0.15]"
                >
                  <a href="mailto:brugala@gmail.com?subject=Projeto%20de%20sistema%20ou%20automacao" className="inline-flex items-center gap-2">
                    Enviar email
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-black/25 p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <h3 className="text-xl font-bold text-white">Contato direto</h3>
              <div className="mt-6 space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400">{item.label}</p>
                        <p className="mt-1 font-medium text-slate-100">{item.value}</p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block rounded-md p-1 hover:bg-white/[0.04]">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-4 text-sm font-medium text-slate-400">Redes</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/bruno-bosso-martins-9a1723270/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 hover:border-cyan-200/50 hover:text-cyan-100"
                    aria-label="LinkedIn de Bruno Martins"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/Brunobosso98"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-slate-200 hover:border-cyan-200/50 hover:text-cyan-100"
                    aria-label="GitHub de Bruno Martins"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
