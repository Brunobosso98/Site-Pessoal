import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppModal from './WhatsAppModal';

const navItems = [
  { name: 'Início', href: '#home' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Capacidades', href: '#skills' },
  { name: 'Perfil', href: '#about' },
  { name: 'Contato', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#05080a]/90 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between md:h-20">
          <a href="#home" className="group flex items-center gap-3" aria-label="Voltar ao início">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-200/25 bg-cyan-200/10 font-display text-sm font-bold text-cyan-50 shadow-[0_0_24px_rgba(0,229,255,0.13)]">
              BM
            </span>
            <span className="hidden text-sm font-semibold text-white sm:inline">Bruno Martins</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item text-sm font-medium text-slate-300 hover:text-cyan-100"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <WhatsAppModal>
              <Button className="h-10 rounded-md bg-rose-400 px-4 text-sm font-bold text-slate-950 hover:bg-rose-300">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar comigo
              </Button>
            </WhatsAppModal>
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-100 md:hidden"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden">
            <div className="mb-4 rounded-lg border border-white/10 bg-[#071014]/95 p-3 shadow-2xl backdrop-blur-xl">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-slate-200 hover:bg-cyan-200/10 hover:text-cyan-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <WhatsAppModal>
                <Button className="mt-3 h-11 w-full rounded-md bg-rose-400 text-sm font-bold text-slate-950 hover:bg-rose-300">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar comigo
                </Button>
              </WhatsAppModal>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
