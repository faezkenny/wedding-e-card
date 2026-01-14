'use client';

import { ECardData, Wish } from './types';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import CountdownTimer from '../widgets/CountdownTimer';
import ItineraryTimeline from '../widgets/ItineraryTimeline';
import MapButtons from '../widgets/MapButtons';
import WhatsAppButtons from '../widgets/WhatsAppButtons';
import RSVPForm from '../widgets/RSVPForm';
import GiftSection from '../widgets/GiftSection';
import { formatDateLong, formatTime } from '@/lib/date-utils';
import { BatikFloral, IslamicBorder } from '../patterns/BatikPatterns';
import { IslamicBlessing, IslamicPhrases, ArabicCalligraphy } from '../patterns/ArabicCalligraphy';
import { CrescentStar } from '../patterns/MalaysianSymbols';

interface TemplateProps {
  data: ECardData;
  wishes: Wish[];
  isPreview?: boolean;
}

export default function ElegantTemplate({ data, wishes, isPreview }: TemplateProps) {
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
    <div className="min-h-screen bg-[#F5F5DC] text-[#2C2416] font-serif overflow-x-hidden relative">
      {/* Prominent Batik Pattern Background */}
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0">
        <BatikFloral color="#D4AF37" opacity={0.3} className="w-full h-full" />
      </div>

      {/* Islamic Border Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <IslamicBorder color="#006B3C" opacity={0.12} className="w-full h-full" />
      </div>

      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#D4AF37]/90 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-[#006B3C]/30 text-[#006B3C] hover:bg-[#D4AF37] transition-all"
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section with Batik Border */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 z-10 border-b-8 border-[#006B3C]">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-red-500/10 text-red-700 py-2 font-sans font-bold uppercase tracking-widest text-sm z-50 border-y-2 border-red-500/20">
            Mod Demo - Buka dengan RM10
          </div>
        )}
        
        {/* Large Arabic Calligraphy - Khat Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 space-y-6"
        >
          {/* Bismillahirrahmanirrahim */}
          <div>
            <ArabicCalligraphy text={IslamicPhrases.bismillah} size="medium" />
            <p className="text-xs mt-2 text-[#006B3C] opacity-70">Bismillahirrahmanirrahim</p>
          </div>
          
          {/* Assalamualaikum */}
          <div>
            <ArabicCalligraphy text={IslamicPhrases.assalamualaikum} size="small" />
            <p className="text-xs mt-2 text-[#006B3C] opacity-70">Assalamualaikum</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 max-w-4xl"
        >
          {/* Decorative Batik Border */}
          <div className="relative py-8 px-12 border-4 border-[#D4AF37] bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 opacity-20">
              <BatikFloral color="#006B3C" opacity={0.2} className="w-full h-full" />
            </div>
            
            <p className="uppercase tracking-[0.3em] text-sm text-[#006B3C] font-semibold mb-4">Majlis Perkahwinan</p>
            <h1 className="text-5xl md:text-7xl font-bold text-[#2C2416] leading-tight">
              {data.groom_name} <br />
              <span className="text-3xl md:text-4xl text-[#D4AF37]">&</span> <br />
              {data.bride_name}
            </h1>
            
            {/* Batik Pattern Divider */}
            <div className="my-6 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            
            <p className="text-xl md:text-2xl text-[#2C2416] font-medium">
              {formatDateLong(data.wedding_date)}
            </p>
          </div>

          {/* Arabic Blessing in Khat Style */}
          <div className="mt-8">
            <ArabicCalligraphy text={IslamicPhrases.barakallahu} size="medium" />
            <p className="text-sm mt-2 opacity-70">Barakallahu lakuma</p>
          </div>

          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-8">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}
        </motion.div>
      </section>

      {/* Details Section with Batik Accents */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#006B3C]">Dengan Izin & Restu</h2>
          <p className="text-lg leading-relaxed text-[#2C2416]">
            Kami dengan penuh hormat mempersilakan <br />
            kehadiran tuan/puan ke majlis perkahwinan anak-anak kami.
          </p>
        </motion.div>

        {/* Akad Nikah Section */}
        {data.akad_nikah_date && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#006B3C] to-[#004d2a] p-12 rounded-lg shadow-xl border-4 border-[#D4AF37] text-white space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <BatikFloral color="#D4AF37" opacity={0.3} className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <CrescentStar size={50} color="#D4AF37" />
              </div>
              <h3 className="text-2xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6">Akad Nikah</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80 mb-1">Tarikh & Masa</p>
                  <p className="text-xl font-semibold">{formatDateLong(data.akad_nikah_date)}</p>
                  <p className="text-lg">{formatTime(data.akad_nikah_date)}</p>
                </div>
                {data.akad_nikah_venue && (
                  <div>
                    <p className="text-sm opacity-80 mb-1">Tempat</p>
                    <p className="text-xl font-semibold">{data.akad_nikah_venue}</p>
                  </div>
                )}
                {data.wali_name && (
                  <div>
                    <p className="text-sm opacity-80 mb-1">Wali</p>
                    <p className="text-xl font-semibold">{data.wali_name}</p>
                  </div>
                )}
                {data.mas_kahwin && (
                  <div>
                    <p className="text-sm opacity-80 mb-1">Mas Kahwin</p>
                    <p className="text-xl font-semibold">{data.mas_kahwin}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reception Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-lg shadow-lg border-4 border-[#D4AF37] space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#006B3C] via-[#D4AF37] to-[#006B3C]" />
          <h3 className="text-2xl font-bold text-[#006B3C] uppercase tracking-wider mb-6">Majlis Resepsi</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="uppercase tracking-widest text-sm text-[#D4AF37] font-semibold">Tempat</h4>
              <p className="text-2xl text-[#2C2416] font-medium">{data.wedding_venue}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="uppercase tracking-widest text-sm text-[#D4AF37] font-semibold">Masa</h4>
              <p className="text-2xl text-[#2C2416] font-medium">
                {formatTime(data.wedding_date)}
              </p>
            </div>

            <MapButtons 
              googleMapsUrl={data.google_maps_url}
              wazeUrl={data.waze_url}
              venue={data.wedding_venue}
              className="mt-6"
            />
          </div>
        </motion.div>

        {/* Itinerary */}
        {data.itinerary && data.itinerary.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-lg shadow-lg border-2 border-[#006B3C]"
          >
            <ItineraryTimeline items={data.itinerary} />
          </motion.div>
        )}
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-24 px-6 bg-gradient-to-br from-[#F5F5DC] to-[#FFF8DC] relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#006B3C] mb-2">RSVP</h2>
              <p className="text-[#2C2416]">Sila beritahu kami jika anda dapat hadir</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#D4AF37]">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-24 px-6 bg-white relative z-10">
          <div className="max-w-2xl mx-auto">
            <GiftSection
              bankName={data.gift_bank_name}
              accountNo={data.gift_account_no}
              qrUrl={data.gift_qr_url}
            />
          </div>
        </section>
      )}

      {/* Guestbook Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#F5F5DC] to-[#FFF8DC] relative z-10">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Heart className="mx-auto text-[#006B3C]" fill="#D4AF37" size={40} />
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B3C]">Guestbook</h2>
          </div>

          <div className="space-y-6">
            {wishes.length > 0 ? (
              wishes.map((wish) => (
                <motion.div 
                  key={wish.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#D4AF37]"
                >
                  <p className="font-semibold text-[#006B3C] text-lg">{wish.guest_name}</p>
                  <p className="text-[#2C2416] mt-2 italic">"{wish.message}"</p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-[#2C2416]/60 italic">Belum ada ucapan lagi. Jadilah yang pertama!</p>
            )}
          </div>

          {/* Wish Form */}
          {data.is_paid && data.id ? (
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#006B3C] space-y-4">
              <h3 className="text-xl font-bold text-[#006B3C]">Sampaikan Ucapan</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border-b-2 border-[#D4AF37] py-2 focus:outline-none focus:border-[#006B3C] bg-transparent text-[#2C2416]"
                />
                <textarea 
                  placeholder="Ucapan Anda" 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b-2 border-[#D4AF37] py-2 focus:outline-none focus:border-[#006B3C] bg-transparent resize-none text-[#2C2416]"
                />
                <button 
                  onClick={handleWishSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#006B3C] to-[#004d2a] text-white px-8 py-3 w-full hover:from-[#004d2a] hover:to-[#006B3C] transition-all font-semibold uppercase tracking-wider text-sm disabled:opacity-50 rounded-lg"
                >
                  {isSubmitting ? 'Menghantar...' : 'Hantar Ucapan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-[#D4AF37] rounded-lg bg-white/50">
              <p className="text-[#006B3C] font-semibold">Buka kad ini untuk membolehkan ucapan tetamu!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-[#2C2416]/60 text-sm bg-white relative z-10 border-t-2 border-[#D4AF37]/20">
        <div className="flex justify-center gap-2 mb-2">
          <CrescentStar size={20} color="#D4AF37" />
        </div>
        <p>© {new Date().getFullYear()} {data.groom_name} & {data.bride_name}</p>
        <p className="mt-2 tracking-widest uppercase text-[10px] text-[#006B3C]">Kad Perkahwinan Digital</p>
      </footer>
    </div>
  );
}
