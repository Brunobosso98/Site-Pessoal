export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <div className="font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Bruno Martins · Full-stack & Automação
        </div>
        <div className="font-mono uppercase tracking-widest">
          Construído em sala de controle ·{" "}
          <span className="text-cyan">Itapira SP / Remoto</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
