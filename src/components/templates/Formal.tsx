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
    <div className="min-h-screen bg-white text-[#2C2416] font-serif overflow-x-hidden">
      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Simple Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#8B0000] p-3 rounded-full shadow-md text-white hover:bg-[#A00000] transition-colors"
      >
        <Music size={20} className={isPlaying ? 'opacity-100' : 'opacity-60'} />
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section - Simple & Clean */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-red-500/10 text-red-700 py-2 font-sans font-semibold uppercase tracking-widest text-xs z-50">
            Mod Demo • Buka dengan RM10
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6 max-w-2xl"
        >
          {/* Simple Arabic Calligraphy */}
          <div className="mb-6">
            <ArabicCalligraphy text={IslamicPhrases.assalamualaikum} size="small" />
            <p className="text-xs mt-2 text-gray-500">Assalamualaikum</p>
          </div>

          {/* Simple Typography */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B0000] leading-tight">
              {data.groom_name} <br />
              <span className="text-2xl">&</span> <br />
              {data.bride_name}
            </h1>
            
            <div className="h-px w-24 bg-[#8B0000] mx-auto my-6" />
            
            <p className="text-lg text-gray-700">
              {formatDateShort(data.wedding_date)}
            </p>
          </div>

          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-8">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}
        </motion.div>
      </section>

      {/* Simple Details Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">Dengan penuh kesyukuran kehadrat Illahi, kami mempersilakan</p>
          <p className="text-gray-700">kehadiran tuan/puan ke majlis perkahwinan anakanda kesayangan kami</p>
        </div>

        {/* Simple Event Details */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-gray-500">Tarikh</h3>
            <p className="text-xl text-[#8B0000]">{formatDateShort(data.wedding_date)}</p>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-gray-500">Masa</h3>
            <p className="text-xl text-[#8B0000]">{formatTime(data.wedding_date)}</p>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-gray-500">Tempat</h3>
            <p className="text-lg text-gray-700">{data.wedding_venue}</p>
            <MapButtons 
              googleMapsUrl={data.google_maps_url}
              wazeUrl={data.waze_url}
              venue={data.wedding_venue}
              className="mt-4"
            />
          </div>
        </div>

        {/* Simple Itinerary */}
        {data.itinerary && data.itinerary.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6 text-center">Aturcara Majlis</h3>
            <ItineraryTimeline items={data.itinerary} />
          </div>
        )}
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-[#8B0000]">RSVP</h2>
              <p className="text-gray-600">Sila beritahu kami jika anda dapat hadir</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <GiftSection
              bankName={data.gift_bank_name}
              accountNo={data.gift_account_no}
              qrUrl={data.gift_qr_url}
            />
          </div>
        </section>
      )}

      {/* Guestbook - Simple */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#8B0000]">Guestbook</h2>
          </div>

          <div className="space-y-4">
            {wishes.map((wish) => (
              <div 
                key={wish.id}
                className="bg-white p-5 rounded-lg shadow-sm border-l-2 border-[#8B0000]"
              >
                <p className="font-semibold text-gray-900 mb-1">{wish.guest_name}</p>
                <p className="text-gray-700 italic">"{wish.message}"</p>
              </div>
            ))}
          </div>

          {data.is_paid && data.id ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Sampaikan Ucapan</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#8B0000] text-gray-900"
                />
                <textarea 
                  placeholder="Ucapan Anda" 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#8B0000] text-gray-900 resize-none"
                />
                <button 
                  onClick={handleWishSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#8B0000] text-white font-semibold py-3 rounded hover:bg-[#A00000] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menghantar...' : 'Hantar Ucapan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg bg-white">
              <p className="text-gray-600">Buka kad ini untuk membolehkan ucapan tetamu!</p>
            </div>
          )}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200">
        <p>© {new Date().getFullYear()} {data.groom_name} & {data.bride_name}</p>
      </footer>
    </div>
  );
}
