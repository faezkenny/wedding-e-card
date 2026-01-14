'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Music, Calendar, MapPin, Clock, MessageSquareQuote } from 'lucide-react';
import { useState, useRef } from 'react';
import { formatDateShort, formatTime } from '@/lib/date-utils';

interface TemplateProps {
  data: ECardData;
  wishes: Wish[];
  isPreview?: boolean;
}

export default function FormalTemplate({ data, wishes, isPreview }: TemplateProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleWishSubmit = async () => {
    if (!guestName || !message || !data.id) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/wishes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ecardId: data.id,
          guestName,
          message,
        }),
      });
      if (response.ok) {
        setGuestName('');
        setMessage('');
        alert('Wish sent successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#d4af37] font-serif overflow-x-hidden">
      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#d4af37] p-3 rounded-none shadow-xl text-black hover:bg-[#b8962f] transition-colors"
      >
        {isPlaying ? <Music size={24} /> : <Music size={24} className="opacity-50" />}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen border-[20px] border-[#d4af37]/20 flex flex-col items-center justify-center text-center p-6">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-[#d4af37] text-black py-2 font-sans font-black uppercase tracking-[0.5em] text-xs z-50">
            Official Preview • RM10 to Unlock
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="space-y-8 max-w-2xl"
        >
          <div className="border-t border-b border-[#d4af37] py-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-4">
              {data.groom_name.toUpperCase()} <br />
              <span className="text-2xl lowercase italic">&</span> <br />
              {data.bride_name.toUpperCase()}
            </h1>
          </div>

          <p className="text-lg tracking-[0.3em] font-sans">INVITE YOU TO CELEBRATE THEIR WEDDING</p>
          
          <div className="flex flex-col items-center gap-2">
            <Calendar className="opacity-50" size={20} />
            <p className="text-2xl tracking-widest">
              {formatDateShort(data.wedding_date).toUpperCase()}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Event Details */}
      <section className="py-24 px-6 bg-[#262626] border-t border-b border-[#d4af37]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col items-center text-center"
          >
            <MapPin size={32} strokeWidth={1} />
            <h3 className="text-xl tracking-[0.2em] uppercase">The Venue</h3>
            <p className="text-white/80 leading-loose tracking-widest">{data.wedding_venue}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col items-center text-center"
          >
            <Clock size={32} strokeWidth={1} />
            <h3 className="text-xl tracking-[0.2em] uppercase">The Time</h3>
            <p className="text-white/80 leading-loose tracking-widest">
              {formatTime(data.wedding_date)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guestbook */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <MessageSquareQuote size={40} className="mx-auto opacity-50" />
            <h2 className="text-3xl tracking-[0.3em] uppercase">Guest Book</h2>
          </div>

          <div className="space-y-8">
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="border-l-2 border-[#d4af37] pl-8 py-4"
              >
                <p className="text-white tracking-[0.1em] font-sans font-bold">{wish.guest_name.toUpperCase()}</p>
                <p className="text-[#d4af37]/70 mt-2 italic tracking-widest">"{wish.message}"</p>
              </motion.div>
            ))}
          </div>

          {!data.is_paid && !isPreview ? (
            <div className="text-center p-10 border-2 border-dashed border-[#d4af37]/30">
              <p className="text-[#d4af37] tracking-[0.2em] uppercase">Unlock this card to enable guest wishes!</p>
            </div>
          ) : (
            <div className="bg-[#262626] p-10 border border-[#d4af37]/20 space-y-8">
              <div className="grid gap-6">
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-transparent border-b border-[#d4af37]/30 py-4 outline-none focus:border-[#d4af37] transition-all tracking-[0.2em] text-white"
                />
                <textarea 
                  placeholder="YOUR MESSAGE TO THE COUPLE" 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-[#d4af37]/30 py-4 outline-none focus:border-[#d4af37] transition-all tracking-[0.2em] text-white resize-none"
                />
              </div>
              <button 
                onClick={handleWishSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#d4af37] text-black font-bold py-5 tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'Submit Message'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[#d4af37]/10 bg-[#111]">
        <p className="tracking-[0.5em] text-xs opacity-40 uppercase">E-Invitation by WeddingECard</p>
      </footer>
    </div>
  );
}
