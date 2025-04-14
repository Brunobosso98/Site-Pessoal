
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 border-t border-foreground/10">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/60 text-sm">
              &copy; {new Date().getFullYear()} Bruno Martins. Todos os direitos reservados.
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors text-sm"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
