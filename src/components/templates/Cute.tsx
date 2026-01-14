'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useState, useRef } from 'react';
import CountdownTimer from '../widgets/CountdownTimer';
import ItineraryTimeline from '../widgets/ItineraryTimeline';
import MapButtons from '../widgets/MapButtons';
import WhatsAppButtons from '../widgets/WhatsAppButtons';
import RSVPForm from '../widgets/RSVPForm';
import GiftSection from '../widgets/GiftSection';
import { formatDateShort, formatTime } from '@/lib/date-utils';
import { IslamicPhrases, ArabicCalligraphy } from '../patterns/ArabicCalligraphy';

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
        alert('Ucapan berjaya dihantar!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2332] to-[#0a1929] text-white font-sans overflow-x-hidden relative">
      {/* Luxury Gold Accent Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Music Toggle - Luxury Style */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] p-4 rounded-full shadow-2xl text-[#0a1929] hover:bg-[#FFD700] transition-all border-2 border-white/20 backdrop-blur-sm"
      >
        <Music size={24} className={isPlaying ? 'opacity-100' : 'opacity-60'} />
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section - Premium Luxury */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 z-10">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-[#D4AF37]/20 text-[#D4AF37] py-3 font-sans font-semibold uppercase tracking-widest text-xs z-50 border-y border-[#D4AF37]/30 backdrop-blur-sm">
            Mod Demo • Buka dengan RM10
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-8 max-w-3xl"
        >
          {/* Premium Arabic Calligraphy */}
          <div className="mb-8 space-y-6">
            {/* Bismillahirrahmanirrahim */}
            <div>
              <ArabicCalligraphy text={IslamicPhrases.bismillah} size="large" />
              <p className="text-sm mt-3 text-[#D4AF37] tracking-widest uppercase">Bismillahirrahmanirrahim</p>
            </div>
            
            {/* Assalamualaikum */}
            <div>
              <ArabicCalligraphy text={IslamicPhrases.assalamualaikum} size="medium" />
              <p className="text-sm mt-3 text-[#D4AF37] tracking-widest uppercase">Assalamualaikum</p>
            </div>
          </div>

          {/* Luxury Card Design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-3xl" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md p-12 md:p-16 rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
              <div className="space-y-6">
                <p className="text-sm tracking-[0.5em] uppercase text-[#D4AF37] font-light">Walimatulurus</p>
                
                <h1 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
                  {data.groom_name} <br />
                  <span className="text-2xl md:text-3xl text-[#D4AF37] font-light">&</span> <br />
                  {data.bride_name}
                </h1>
                
                <div className="flex items-center justify-center gap-4 my-8">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>

                <p className="text-xl md:text-2xl text-white/90 font-light">
                  {formatDateShort(data.wedding_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-12">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}
        </motion.div>
      </section>

      {/* Details Section - Premium Layout */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37]">ASSALAMUALAIKUM WBT & SALAM SEJAHTERA</p>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Dengan penuh kesyukuran kehadrat Illahi, kami mempersilakan Dato'/Datin/Dr/Tuan/Puan/Encik/Cik ke walimatulurus anakanda kesayangan kami
          </p>
        </motion.div>

        {/* Event Details - Luxury Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20"
          >
            <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4">Tarikh</h3>
            <p className="text-2xl font-light text-white">{formatDateShort(data.wedding_date)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20"
          >
            <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4">Masa</h3>
            <p className="text-2xl font-light text-white">{formatTime(data.wedding_date)}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20 mb-8"
        >
          <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4">Tempat</h3>
          <p className="text-xl font-light text-white mb-4">{data.wedding_venue}</p>
          <MapButtons 
            googleMapsUrl={data.google_maps_url}
            wazeUrl={data.waze_url}
            venue={data.wedding_venue}
          />
        </motion.div>

        {/* Itinerary */}
        {data.itinerary && data.itinerary.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20">
            <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-6">Aturcara Majlis</h3>
            <ItineraryTimeline items={data.itinerary} />
          </div>
        )}
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-24 px-6 bg-gradient-to-br from-[#0a1929] to-[#1a2332] relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light mb-2 text-white">RSVP</h2>
              <p className="text-white/70">Sila beritahu kami jika anda dapat hadir</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-24 px-6 bg-[#0a1929] relative z-10">
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
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1929] to-[#1a2332] relative z-10">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-2 text-white">Guestbook</h2>
            <p className="text-white/70">Tinggalkan ucapan untuk pasangan bahagia</p>
          </div>

          <div className="space-y-6">
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-[#D4AF37]/20"
              >
                <p className="text-[#D4AF37] font-semibold mb-2">{wish.guest_name}</p>
                <p className="text-white/80 italic">{wish.message}</p>
              </motion.div>
            ))}
          </div>

          {data.is_paid && data.id ? (
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[#D4AF37]/20 space-y-4">
              <h3 className="text-xl font-light text-white">Sampaikan Ucapan</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white/10 border-b border-[#D4AF37]/30 py-3 focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-white/40"
                />
                <textarea 
                  placeholder="Ucapan Anda..." 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/10 border-b border-[#D4AF37]/30 py-3 focus:outline-none focus:border-[#D4AF37] text-white resize-none placeholder:text-white/40"
                />
                <button 
                  onClick={handleWishSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-[#0a1929] font-semibold py-4 rounded-lg hover:bg-[#FFD700] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Menghantar...' : 'Hantar Ucapan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed border-[#D4AF37]/30 rounded-xl bg-white/5">
              <p className="text-white/70">Buka kad ini untuk membolehkan ucapan tetamu!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/40 text-sm relative z-10 border-t border-[#D4AF37]/10">
        <p>© {new Date().getFullYear()} {data.groom_name} & {data.bride_name}</p>
        <p className="mt-2 tracking-widest uppercase text-[10px] text-[#D4AF37]/60">Kad Perkahwinan Digital</p>
      </footer>
    </div>
  );
}
