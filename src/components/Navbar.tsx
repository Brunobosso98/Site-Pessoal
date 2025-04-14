
import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="#home" className="text-xl md:text-2xl font-display font-bold highlight-gradient">
              Bruno Martins
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="nav-item font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button className="btn-gradient rounded-full flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-foreground hover:text-accent"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm animate-fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 px-3 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              ))}
              <Button className="w-full btn-gradient rounded-full mt-4 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
