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
    <div className="min-h-screen bg-[#fdfaf6] text-[#4a4a4a] font-serif overflow-x-hidden">
      {/* Background Music */}
      {data.music_url && (
        <audio ref={audioRef} src={data.music_url} loop />
      )}

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-[#e5d5c5] text-[#8e735b]"
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>

      {/* WhatsApp Buttons */}
      {data.contact_info && data.contact_info.length > 0 && (
        <WhatsAppButtons contacts={data.contact_info} />
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white to-[#fdfaf6]">
        {isPreview && (
          <div className="absolute top-10 left-0 w-full bg-red-500/10 text-red-600 py-2 font-sans font-bold uppercase tracking-widest text-sm z-50">
            Demo Mode - Unlock for RM10
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-[#8e735b]">The Wedding of</p>
          <h1 className="text-6xl md:text-8xl font-light text-[#2d2d2d]">
            {data.groom_name} <br />
            <span className="text-4xl italic font-serif">&</span> <br />
            {data.bride_name}
          </h1>
          <div className="w-12 h-px bg-[#8e735b] mx-auto" />
          <p className="text-xl md:text-2xl italic">
            {formatDateLong(data.wedding_date)}
          </p>
          
          {/* Countdown Timer */}
          {data.countdown_date && (
            <div className="mt-8">
              <CountdownTimer targetDate={data.countdown_date} />
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 animate-bounce"
        >
          <p className="text-xs uppercase tracking-widest text-[#8e735b]">Scroll</p>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-light">Join us in celebrating</h2>
          <p className="text-lg leading-relaxed text-[#6b6b6b]">
            With joyful hearts, we request the honor of your presence <br />
            at the marriage of our children.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 border border-[#e5d5c5] shadow-sm space-y-8"
        >
          <div className="space-y-2">
            <h3 className="uppercase tracking-widest text-sm text-[#8e735b]">Venue</h3>
            <p className="text-2xl">{data.wedding_venue}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="uppercase tracking-widest text-sm text-[#8e735b]">Time</h3>
            <p className="text-2xl">
              {formatTime(data.wedding_date)}
            </p>
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 border border-[#e5d5c5] shadow-sm"
          >
            <ItineraryTimeline items={data.itinerary} />
          </motion.div>
        )}
      </section>

      {/* RSVP Section */}
      {data.is_paid && data.id && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light mb-2">RSVP</h2>
              <p className="text-[#6b6b6b]">Please let us know if you can attend</p>
            </div>
            <div className="bg-[#f7f3ef] p-8 rounded-lg">
              <RSVPForm ecardId={data.id} rsvpDeadline={data.rsvp_deadline} />
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {(data.gift_bank_name || data.gift_account_no || data.gift_qr_url) && (
        <section className="py-24 px-6 bg-[#f7f3ef]">
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
      <section className="py-24 px-6 bg-[#f7f3ef]">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Heart className="mx-auto text-[#8e735b]" fill="#8e735b" size={32} />
            <h2 className="text-3xl font-light">Wishes</h2>
          </div>

          <div className="space-y-6">
            {wishes.length > 0 ? (
              wishes.map((wish) => (
                <motion.div 
                  key={wish.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#e5d5c5]/30"
                >
                  <p className="font-medium text-[#2d2d2d]">{wish.guest_name}</p>
                  <p className="text-[#6b6b6b] mt-1 italic">"{wish.message}"</p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-[#9b9b9b] italic">No wishes yet. Be the first to leave one!</p>
            )}
          </div>

          {/* Wish Form */}
          {data.is_paid && data.id ? (
            <div className="bg-white p-8 border border-[#e5d5c5] shadow-sm space-y-4">
              <h3 className="text-xl font-light">Leave a Wish</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border-b border-[#e5d5c5] py-2 focus:outline-none focus:border-[#8e735b] bg-transparent"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-[#e5d5c5] py-2 focus:outline-none focus:border-[#8e735b] bg-transparent resize-none"
                />
                <button 
                  onClick={handleWishSubmit}
                  disabled={isSubmitting}
                  className="bg-[#8e735b] text-white px-8 py-3 w-full hover:bg-[#7a624d] transition-colors font-sans uppercase tracking-widest text-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Wish'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-[#e5d5c5] rounded-xl">
              <p className="text-[#8e735b]">Unlock this card to enable guest wishes!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-[#9b9b9b] text-sm">
        <p>© {new Date().getFullYear()} {data.groom_name} & {data.bride_name}</p>
        <p className="mt-2 tracking-widest uppercase text-[10px]">Wedding E-Card</p>
      </footer>
    </div>
  );
}
