'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import CountdownTimer from '../widgets/CountdownTimer';
import ItineraryTimeline from '../widgets/ItineraryTimeline';
import MapButtons from '../widgets/MapButtons';
import WhatsAppButtons from '../widgets/WhatsAppButtons';
import RSVPForm from '../widgets/RSVPForm';
import GiftSection from '../widgets/GiftSection';
import { formatDateShort, formatTime } from '@/lib/date-utils';
import { BatikFloral } from '../patterns/BatikPatterns';
import { IslamicPhrases, ArabicCalligraphy } from '../patterns/ArabicCalligraphy';
import { BungaRaya, CrescentStar } from '../patterns/MalaysianSymbols';

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
        alert('Doa berjaya dihantar!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4E1] to-[#FFF0F5] text-[#8B4A6B] font-sans overflow-x-hidden relative">
      {/* Background Floral Batik Pattern */}
      <div className="fixed inset-0 opacity-8 pointer-events-none z-0">
        <BatikFloral color="#FFB6C1" opacity={0.15} className="w-full h-full" />
      </div>

      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Floating Elements - Bunga Raya */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: ['0vh', '100vh'],
              opacity: [0, 0.3, 0],
              x: ['-10px', '10px', '-10px']
            }}
            transition={{ 
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6
            }}
            className="absolute"
            style={{ left: `${Math.random() * 100}%` }}
          >
            <BungaRaya size={20 + Math.random() * 15} color="#FFB6C1" />
          </motion.div>
        ))}
      </div>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#FFB6C1] to-[#FF91A4] p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform border-2 border-white"
      >
        {isPlaying ? <Sparkles size={24} className="animate-spin" /> : <Music size={24} />}
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 z-10">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-[#FFB6C1]/30 text-[#8B4A6B] py-2 font-bold uppercase tracking-widest text-sm z-50 border-y-2 border-[#FFB6C1]">
            Mod Demo ✨ Buka dengan RM10
          </div>
        )}
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10 }}
          className="bg-white/95 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border-4 border-[#FFB6C1] relative z-10 max-w-2xl mx-4"
        >
          {/* Arabic Calligraphy - Masha Allah */}
          <div className="mb-4">
            <ArabicCalligraphy text={IslamicPhrases.mashaAllah} size="small" />
            <p className="text-xs text-[#8B4A6B]/70 mt-1">Masha Allah</p>
          </div>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mb-4"
          >
            <Heart fill="#FFB6C1" size={48} className="text-[#FFB6C1]" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#8B4A6B]">
            {data.groom_name} <br />
            <span className="text-2xl md:text-3xl text-[#FFB6C1]">&</span> <br />
            {data.bride_name}
          </h1>
          
          <div className="flex justify-center gap-2 mb-6">
            <CrescentStar size={20} color="#FFD700" />
            <Star fill="#FFD700" className="text-[#FFD700]" size={20} />
            <CrescentStar size={20} color="#FFD700" />
          </div>

          <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#FFB6C1] to-[#FF91A4] text-white px-6 py-2 rounded-full inline-block">
            {formatDateShort(data.wedding_date)}
          </p>

          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-6">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}
        </motion.div>
      </section>

      {/* Details */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            whileInView={{ scale: [1, 1.02, 1] }}
            className="bg-white/95 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-xl border-4 border-[#FFB6C1] text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#8B4A6B]">Di Mana & Bila?</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] rounded-2xl border-2 border-[#FFB6C1]">
                <p className="text-sm uppercase font-bold text-[#FF91A4] mb-2">Tempat</p>
                <p className="text-2xl font-bold text-[#8B4A6B]">{data.wedding_venue}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] rounded-2xl border-2 border-[#FFB6C1]">
                <p className="text-sm uppercase font-bold text-[#FF91A4] mb-2">Masa</p>
                <p className="text-2xl font-bold text-[#8B4A6B]">
                  {formatTime(data.wedding_date)}
                </p>
              </div>
            </div>

            {/* Map Buttons */}
            <MapButtons 
              googleMapsUrl={data.google_maps_url}
              wazeUrl={data.waze_url}
              venue={data.wedding_venue}
              className="mt-6"
            />
          </motion.div>

          {/* Itinerary */}
          {data.itinerary && data.itinerary.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-xl border-4 border-[#FFB6C1]">
              <ItineraryTimeline items={data.itinerary} />
            </div>
          )}
        </div>
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-20 px-6 bg-white/80 backdrop-blur-sm relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 text-[#8B4A6B]">RSVP 💕</h2>
              <p className="text-[#8B4A6B]/80">Sila beritahu kami jika anda dapat hadir</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] p-8 rounded-[2.5rem] shadow-xl border-4 border-[#FFB6C1]">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-20 px-6 bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] relative z-10">
          <div className="max-w-2xl mx-auto">
            <GiftSection
              bankName={data.gift_bank_name}
              accountNo={data.gift_account_no}
              qrUrl={data.gift_qr_url}
            />
          </div>
        </section>
      )}

      {/* Guestbook */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2 text-[#8B4A6B]">Doa Manis 💕</h2>
            <p className="font-medium text-[#8B4A6B]/80">Tinggalkan mesej untuk pasangan bahagia!</p>
          </div>

          <div className="grid gap-4">
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-[#FFB6C1]"
              >
                <p className="font-bold text-lg mb-1 text-[#8B4A6B]">{wish.guest_name}</p>
                <p className="text-[#8B4A6B]/80 italic">{wish.message}</p>
              </motion.div>
            ))}
          </div>

          {data.is_paid && data.id ? (
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border-4 border-[#FFB6C1] space-y-4">
              <input 
                type="text" 
                placeholder="Nama Anda ✨" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#FFF0F5] border-2 border-transparent focus:border-[#FFB6C1] rounded-2xl p-4 outline-none transition-all placeholder:text-[#FF91A4] font-semibold"
              />
              <textarea 
                placeholder="Doa Manis Anda... 💕" 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#FFF0F5] border-2 border-transparent focus:border-[#FFB6C1] rounded-2xl p-4 outline-none transition-all resize-none placeholder:text-[#FF91A4] font-semibold"
              />
              <button 
                onClick={handleWishSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#FFB6C1] to-[#FF91A4] text-white font-bold py-4 rounded-2xl w-full shadow-lg shadow-[#FFB6C1]/30 hover:from-[#FF91A4] hover:to-[#FFB6C1] transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Menghantar...' : 'Hantar Doa! 💕'}
              </button>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-[#FFB6C1] rounded-3xl bg-white/50">
              <p className="text-[#8B4A6B] font-bold">Buka kad ini untuk membolehkan doa tetamu!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center font-bold opacity-60 text-[#8B4A6B] relative z-10">
        <div className="flex justify-center gap-2 mb-2">
          <BungaRaya size={20} color="#FFB6C1" />
        </div>
        <p>Dibuat dengan Cinta ✨ Kad Perkahwinan Digital</p>
      </footer>
    </div>
  );
}
