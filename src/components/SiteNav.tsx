import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logomark } from "@/components/Logomark";

type NavLink = { label: string; to: string; hash?: string; isRoute?: boolean };

const HOME_LINKS: NavLink[] = [
  { label: "Sobre", to: "/", hash: "#sobre" },
  { label: "Capacidades", to: "/", hash: "#capacidades" },
  { label: "Projetos", to: "/", hash: "#projetos" },
  { label: "Processo", to: "/", hash: "#processo" },
];

const PAGE_LINKS: NavLink[] = [
  { label: "Home", to: "/", isRoute: true },
];

export function SiteNav({ mode = "home" }: { mode?: "home" | "projetos" }) {
  const links = mode === "home" ? HOME_LINKS : PAGE_LINKS;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-sm font-semibold text-foreground"
          aria-label="Bruno Martins — voltar ao início"
        >
          <Logomark className="h-8 w-8" />
          <span>
            bruno<span className="text-cyan">.martins</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Principal">
          {links.map((l) => {
            if (l.isRoute) {
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                >
                  {l.label}
                </Link>
              );
            }
            return (
              <a
                key={l.label}
                href={`${l.to}${l.hash ?? ""}`}
                className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <a
          href="mailto:brugala@gmail.com?subject=Contato%20via%20portf%C3%B3lio"
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--coral)] px-5 py-3 text-sm font-medium text-[var(--graphite)] shadow-[var(--shadow-glow-coral)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Conversar
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

export default SiteNav;
