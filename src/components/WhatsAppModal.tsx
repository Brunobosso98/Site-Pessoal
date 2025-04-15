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
    const defaultMessage = encodeURIComponent('Olá, gostaria de saber mais sobre seus serviços e solicitar um orçamento.');

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
      <DialogContent className="sm:max-w-[425px] border-accent/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaWhatsapp className="h-5 w-5 text-green-500" />
            <span>Contato via WhatsApp</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center mb-4">
            Clique no botão abaixo para iniciar uma conversa no WhatsApp e solicitar um orçamento ou tirar dúvidas sobre os serviços.
          </p>

          <div className="flex justify-center">
            <img
              src="/eu.jpeg"
              alt="Bruno Martins"
              className="w-24 h-24 rounded-full object-cover border-2 border-accent/20"
              style={{ objectPosition: '20% 0%' }} // Ajustado para focar mais na parte superior (rosto)
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleWhatsAppRedirect}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 w-full flex items-center justify-center gap-2"
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
