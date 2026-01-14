'use client';

import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapButtonsProps {
  googleMapsUrl?: string;
  wazeUrl?: string;
  venue: string;
  className?: string;
}

export default function MapButtons({ googleMapsUrl, wazeUrl, venue, className = '' }: MapButtonsProps) {
  if (!googleMapsUrl && !wazeUrl) return null;

  const handleGoogleMaps = () => {
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    } else {
      // Fallback: search on Google Maps
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`, '_blank');
    }
  };

  const handleWaze = () => {
    if (wazeUrl) {
      window.open(wazeUrl, '_blank');
    } else {
      // Fallback: search on Waze
      window.open(`https://waze.com/ul?q=${encodeURIComponent(venue)}`, '_blank');
    }
  };

  return (
    <div className={`flex gap-3 justify-center flex-wrap ${className}`}>
      {googleMapsUrl && (
        <Button
          onClick={handleGoogleMaps}
          variant="outline"
          className="gap-2"
        >
          <MapPin className="h-4 w-4" />
          Google Maps
        </Button>
      )}
      {wazeUrl && (
        <Button
          onClick={handleWaze}
          variant="outline"
          className="gap-2"
        >
          <MapPin className="h-4 w-4" />
          Waze
        </Button>
      )}
    </div>
  );
}
