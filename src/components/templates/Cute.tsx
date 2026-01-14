'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { formatDateShort, formatTime } from '@/lib/date-utils';

interface TemplateProps {
  data: ECardData;
  wishes: Wish[];
  isPreview?: boolean;
}

export default function CuteTemplate({ data, wishes, isPreview }: TemplateProps) {
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
    <div className="min-h-screen bg-[#fff5f8] text-[#ff7eb9] font-sans overflow-x-hidden">
      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0],
              x: ['-10px', '10px', '-10px']
            }}
            transition={{ 
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute"
            style={{ left: `${Math.random() * 100}%` }}
          >
            <Heart size={20 + Math.random() * 20} fill="#ffb7d5" className="opacity-30" />
          </motion.div>
        ))}
      </div>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#ff7eb9] p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform"
      >
        {isPlaying ? <Sparkles size={24} className="animate-spin" /> : <Music size={24} />}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-[#ff7eb9]/20 text-[#ff7eb9] py-2 font-bold uppercase tracking-widest text-sm z-50">
            Preview Mode ✨ RM10 to Unlock
          </div>
        )}
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10 }}
          className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border-4 border-white relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mb-4"
          >
            <Heart fill="#ff7eb9" size={48} />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {data.groom_name} <br />
            <span className="text-3xl">&</span> <br />
            {data.bride_name}
          </h1>
          
          <div className="flex justify-center gap-2 mb-6">
            <Star fill="#ffb7d5" className="text-[#ffb7d5]" />
            <Star fill="#ffb7d5" className="text-[#ffb7d5]" />
            <Star fill="#ffb7d5" className="text-[#ffb7d5]" />
          </div>

          <p className="text-xl font-medium bg-[#ff7eb9] text-white px-6 py-2 rounded-full inline-block">
            {formatDateShort(data.wedding_date)}
          </p>
        </motion.div>
      </section>

      {/* Details */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            whileInView={{ scale: [1, 1.02, 1] }}
            className="bg-white/90 p-10 rounded-[2.5rem] shadow-lg border-2 border-[#ffb7d5] text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Where & When?</h2>
            <div className="space-y-6">
              <div className="p-4 bg-[#fff5f8] rounded-2xl">
                <p className="text-sm uppercase font-bold text-[#ffb7d5]">Venue</p>
                <p className="text-2xl font-bold">{data.wedding_venue}</p>
              </div>
              <div className="p-4 bg-[#fff5f8] rounded-2xl">
                <p className="text-sm uppercase font-bold text-[#ffb7d5]">Time</p>
                <p className="text-2xl font-bold">
                  {formatTime(data.wedding_date)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guestbook */}
      <section className="py-20 px-6 bg-[#ffdef0] relative z-10">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">Sweet Wishes 🍬</h2>
            <p className="font-medium">Leave a message for the happy couple!</p>
          </div>

          <div className="grid gap-4">
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-[#ff7eb9]"
              >
                <p className="font-bold text-lg mb-1">{wish.guest_name}</p>
                <p className="text-[#ff7eb9]/80 italic">{wish.message}</p>
              </motion.div>
            ))}
          </div>

          {!data.is_paid && !isPreview ? (
            <div className="text-center p-8 border-2 border-dashed border-[#ff7eb9] rounded-3xl">
              <p className="text-[#ff7eb9] font-bold">Unlock this card to enable guest wishes!</p>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border-4 border-white space-y-4">
              <input 
                type="text" 
                placeholder="Your Name ✨" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#fff5f8] border-2 border-transparent focus:border-[#ff7eb9] rounded-2xl p-4 outline-none transition-all placeholder:text-[#ffb7d5] font-bold"
              />
              <textarea 
                placeholder="Your Sweet Message... 🍬" 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#fff5f8] border-2 border-transparent focus:border-[#ff7eb9] rounded-2xl p-4 outline-none transition-all resize-none placeholder:text-[#ffb7d5] font-bold"
              />
              <button 
                onClick={handleWishSubmit}
                disabled={isSubmitting}
                className="bg-[#ff7eb9] text-white font-bold py-4 rounded-2xl w-full shadow-lg shadow-[#ff7eb9]/30 hover:bg-[#ff5ca8] transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Love! ❤️'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center font-bold opacity-60">
        <p>Created with Love ✨ Wedding E-Card</p>
      </footer>
    </div>
  );
}
