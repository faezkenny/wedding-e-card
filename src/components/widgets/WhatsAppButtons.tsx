'use client';

import { Phone } from 'lucide-react';
import { ContactInfo } from '../templates/types';

interface WhatsAppButtonsProps {
  contacts?: ContactInfo[];
  className?: string;
}

export default function WhatsAppButtons({ contacts, className = '' }: WhatsAppButtonsProps) {
  if (!contacts || contacts.length === 0) return null;

  const handleWhatsApp = (whatsapp: string, name: string) => {
    const message = `Hello ${name}, I'm interested in your wedding invitation!`;
    const url = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`fixed bottom-6 left-6 z-50 flex flex-col gap-3 ${className}`}>
      {contacts.map((contact, index) => {
        const whatsapp = contact.whatsapp || contact.phone;
        if (!whatsapp) return null;

        return (
          <button
            key={index}
            onClick={() => handleWhatsApp(whatsapp, contact.name)}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            title={`Contact ${contact.name} on WhatsApp`}
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">{contact.name}</span>
          </button>
        );
      })}
    </div>
  );
}
