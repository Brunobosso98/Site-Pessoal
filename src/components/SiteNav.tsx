import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { Logomark } from "@/components/Logomark";
import { useMotionExperience } from "@/hooks/use-motion-experience";

const homeLinks = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Expertise", href: "/#capacidades" },
  { label: "Processo", href: "/#processo" },
];

export function SiteNav({ mode = "home" }: { mode?: "home" | "projetos" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { paused, staticMotion, toggle } = useMotionExperience();
  const { scrollYProgress } = useScroll();
  const links =
    mode === "home"
      ? homeLinks
      : [
          { label: "Início", href: "/" },
          { label: "Projetos", href: "#cases" },
          { label: "Contato", href: "#contato" },
        ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [mode]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-nav">
        <div className="nav-inner">
          <Link to="/" className="brand-link" aria-label="Bruno Martins — voltar ao início">
            <Logomark className="h-8 w-8" />
            <span>
              bruno<span className="text-cyan">.martins</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Principal">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={active && link.href.endsWith(`#${active}`) ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="motion-toggle"
              onClick={toggle}
              aria-pressed={paused}
              aria-label={paused ? "Retomar animações" : "Pausar animações"}
              title={paused ? "Retomar animações" : "Pausar animações"}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <a href="#contato" className="nav-contact">
              Vamos conversar <ArrowUpRight size={16} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Navegação móvel">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <ArrowUpRight size={20} />
            </a>
          ))}
          {mode === "home" && (
            <a href="#contato" onClick={() => setOpen(false)}>
              Vamos conversar
              <ArrowUpRight size={20} />
            </a>
          )}
        </nav>
        <motion.div
          aria-hidden="true"
          className="reading-progress"
          style={{ scaleX: staticMotion ? 0 : scrollYProgress }}
        />
      </header>
    </>
  );
}
export default SiteNav;
