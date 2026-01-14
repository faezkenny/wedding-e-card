'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Music, Calendar, MapPin, Clock, MessageSquareQuote } from 'lucide-react';
import { useState, useRef } from 'react';
import CountdownTimer from '../widgets/CountdownTimer';
import ItineraryTimeline from '../widgets/ItineraryTimeline';
import MapButtons from '../widgets/MapButtons';
import WhatsAppButtons from '../widgets/WhatsAppButtons';
import RSVPForm from '../widgets/RSVPForm';
import GiftSection from '../widgets/GiftSection';
import { formatDateShort, formatTime } from '@/lib/date-utils';
import { SongketPattern } from '../patterns/BatikPatterns';
import { IslamicPhrases, ArabicCalligraphy, IslamicGreeting } from '../patterns/ArabicCalligraphy';
import { CrescentStar, Ketupat } from '../patterns/MalaysianSymbols';

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
    <div className="min-h-screen bg-[#1a0000] text-[#FFD700] font-serif overflow-x-hidden relative">
      {/* Background Songket Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <SongketPattern color="#FFD700" opacity={0.15} className="w-full h-full" />
      </div>

      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#FFD700] p-3 rounded-none shadow-xl text-[#8B0000] hover:bg-[#FFED4E] transition-colors border-2 border-[#8B0000]"
      >
        {isPlaying ? <Music size={24} /> : <Music size={24} className="opacity-50" />}
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section */}
      <section className="relative h-screen border-[20px] border-[#FFD700]/30 flex flex-col items-center justify-center text-center p-6">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-[#FFD700] text-[#8B0000] py-2 font-sans font-black uppercase tracking-[0.5em] text-xs z-50">
            Mod Demo Rasmi • Buka dengan RM10
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="space-y-8 max-w-3xl"
        >
          {/* Islamic Greeting */}
          <IslamicGreeting className="mb-4" />

          {/* Decorative Ketupat */}
          <div className="flex justify-center gap-6 mb-4">
            <Ketupat size={30} color="#FFD700" />
            <Ketupat size={30} color="#FFD700" />
            <Ketupat size={30} color="#FFD700" />
          </div>

          <div className="border-t-2 border-b-2 border-[#FFD700] py-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4 text-[#FFD700]">
              {data.groom_name.toUpperCase()} <br />
              <span className="text-2xl lowercase italic text-[#FFD700]/80">&</span> <br />
              {data.bride_name.toUpperCase()}
            </h1>
          </div>

          <p className="text-lg tracking-[0.3em] font-sans text-[#FFD700]/90">MENJEMPUT TUAN/PUAN KE MAJLIS PERKAHWINAN MEREKA</p>
          
          <div className="flex flex-col items-center gap-4">
            <Calendar className="opacity-50 text-[#FFD700]" size={24} />
            <p className="text-2xl tracking-widest text-[#FFD700]">
              {formatDateShort(data.wedding_date).toUpperCase()}
            </p>
          </div>

          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-8">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}

          {/* Arabic Blessing */}
          <div className="mt-8">
            <ArabicCalligraphy text={IslamicPhrases.allahummaBarik} size="small" />
            <p className="text-sm mt-2 opacity-70">Allahumma Barik</p>
          </div>
        </motion.div>
      </section>

      {/* Event Details */}
      <section className="py-24 px-6 bg-[#2a0000] border-t-2 border-b-2 border-[#FFD700]/20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col items-center text-center border-2 border-[#FFD700]/30 p-8"
          >
            <MapPin size={32} strokeWidth={1} className="text-[#FFD700]" />
            <h3 className="text-xl tracking-[0.2em] uppercase text-[#FFD700]">Tempat</h3>
            <p className="text-white/90 leading-loose tracking-widest">{data.wedding_venue}</p>
            <MapButtons 
              googleMapsUrl={data.google_maps_url}
              wazeUrl={data.waze_url}
              venue={data.wedding_venue}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col items-center text-center border-2 border-[#FFD700]/30 p-8"
          >
            <Clock size={32} strokeWidth={1} className="text-[#FFD700]" />
            <h3 className="text-xl tracking-[0.2em] uppercase text-[#FFD700]">Masa</h3>
            <p className="text-white/90 leading-loose tracking-widest text-xl">
              {formatTime(data.wedding_date)}
            </p>
          </motion.div>
        </div>

        {/* Akad Nikah Section */}
        {data.akad_nikah_date && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 border-4 border-[#FFD700] p-10 bg-[#1a0000] text-center space-y-6"
          >
            <div className="flex justify-center mb-4">
              <CrescentStar size={50} color="#FFD700" />
            </div>
            <h3 className="text-2xl tracking-[0.3em] uppercase text-[#FFD700] font-bold">Akad Nikah</h3>
            <div className="space-y-4 text-white/90">
              <div>
                <p className="text-sm opacity-70 mb-1">Tarikh & Masa</p>
                <p className="text-xl font-semibold">{formatDateShort(data.akad_nikah_date).toUpperCase()}</p>
                <p className="text-lg">{formatTime(data.akad_nikah_date)}</p>
              </div>
              {data.akad_nikah_venue && (
                <div>
                  <p className="text-sm opacity-70 mb-1">Tempat</p>
                  <p className="text-xl font-semibold">{data.akad_nikah_venue}</p>
                </div>
              )}
              {data.wali_name && (
                <div>
                  <p className="text-sm opacity-70 mb-1">Wali</p>
                  <p className="text-xl font-semibold">{data.wali_name}</p>
                </div>
              )}
              {data.mas_kahwin && (
                <div>
                  <p className="text-sm opacity-70 mb-1">Mas Kahwin</p>
                  <p className="text-xl font-semibold">{data.mas_kahwin}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Itinerary */}
        {data.itinerary && data.itinerary.length > 0 && (
          <div className="mt-12 border-2 border-[#FFD700]/30 p-10">
            <ItineraryTimeline items={data.itinerary} />
          </div>
        )}
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-24 px-6 bg-[#1a0000]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <MessageSquareQuote size={40} className="mx-auto opacity-50 text-[#FFD700]" />
              <h2 className="text-3xl tracking-[0.3em] uppercase text-[#FFD700] font-bold">RSVP</h2>
              <p className="text-white/70 tracking-widest">SILA BERITAHU KAMI JIKA ANDA DAPAT HADIR</p>
            </div>
            <div className="bg-[#2a0000] p-10 border-2 border-[#FFD700]/30">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-24 px-6 bg-[#2a0000] border-t-2 border-[#FFD700]/20">
          <div className="max-w-3xl mx-auto">
            <GiftSection
              bankName={data.gift_bank_name}
              accountNo={data.gift_account_no}
              qrUrl={data.gift_qr_url}
            />
          </div>
        </section>
      )}

      {/* Guestbook */}
      <section className="py-24 px-6 bg-[#1a0000]">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <MessageSquareQuote size={40} className="mx-auto opacity-50 text-[#FFD700]" />
            <h2 className="text-3xl tracking-[0.3em] uppercase text-[#FFD700] font-bold">Buku Ucapan</h2>
          </div>

          <div className="space-y-8">
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="border-l-4 border-[#FFD700] pl-8 py-4 bg-[#2a0000]/50"
              >
                <p className="text-white tracking-[0.1em] font-sans font-bold uppercase">{wish.guest_name.toUpperCase()}</p>
                <p className="text-[#FFD700]/70 mt-2 italic tracking-widest">"{wish.message}"</p>
              </motion.div>
            ))}
          </div>

          {data.is_paid && data.id ? (
            <div className="bg-[#2a0000] p-10 border-2 border-[#FFD700]/30 space-y-8">
              <div className="grid gap-6">
                <input 
                  type="text" 
                  placeholder="NAMA PENUH" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#FFD700]/30 py-4 outline-none focus:border-[#FFD700] transition-all tracking-[0.2em] text-white placeholder:text-white/40"
                />
                <textarea 
                  placeholder="UCAPAN ANDA KEPADA PASANGAN" 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#FFD700]/30 py-4 outline-none focus:border-[#FFD700] transition-all tracking-[0.2em] text-white resize-none placeholder:text-white/40"
                />
              </div>
              <button 
                onClick={handleWishSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#FFD700] text-[#8B0000] font-bold py-5 tracking-[0.4em] uppercase hover:bg-[#FFED4E] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'MENGHANTAR...' : 'Hantar Ucapan'}
              </button>
            </div>
          ) : (
            <div className="text-center p-10 border-2 border-dashed border-[#FFD700]/30">
              <p className="text-[#FFD700] tracking-[0.2em] uppercase">Buka kad ini untuk membolehkan ucapan tetamu!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t-2 border-[#FFD700]/10 bg-[#0a0000]">
        <div className="flex justify-center gap-4 mb-4">
          <Ketupat size={20} color="#FFD700" />
          <CrescentStar size={20} color="#FFD700" />
          <Ketupat size={20} color="#FFD700" />
        </div>
        <p className="tracking-[0.5em] text-xs opacity-40 uppercase text-[#FFD700]">E-Jemputan oleh WeddingECard</p>
      </footer>
    </div>
  );
}
