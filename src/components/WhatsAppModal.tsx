import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppModalProps {
  children: React.ReactNode;
}

const WhatsAppModal = ({ children }: WhatsAppModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppRedirect = () => {
    // WhatsApp phone number
    const phoneNumber = '5519987111198';

    // Default message
    const defaultMessage = encodeURIComponent('Olá, Bruno. Vi seu portfólio e quero conversar sobre um projeto de sistema, automação ou IA aplicada.');

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Close the modal
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-cyan-200/20 bg-[#071014] text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaWhatsapp className="h-5 w-5 text-lime-300" />
            <span>Conversar sobre um projeto</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-5 text-center leading-7 text-slate-300">
            Abra uma conversa com contexto do processo, objetivo e urgência. Isso já ajuda a transformar a ideia em escopo.
          </p>

          <div className="flex justify-center">
            <img
              src="/eu.jpeg"
              alt="Bruno Martins"
              className="h-24 w-24 rounded-lg border border-cyan-200/20 object-cover"
              style={{ objectPosition: '20% 0%' }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleWhatsAppRedirect}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-300 px-6 font-bold text-slate-950 hover:bg-lime-200"
          >
            <FaWhatsapp className="h-5 w-5" />
            Falar no WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
