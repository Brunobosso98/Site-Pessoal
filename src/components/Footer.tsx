import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Bruno Martins. Sistemas, automação e IA aplicada.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-200/40 hover:text-cyan-100"
        >
          Voltar ao topo
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
