'use client';

import { ItineraryItem } from '../templates/types';
import { Clock } from 'lucide-react';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
  className?: string;
}

export default function ItineraryTimeline({ items, className = '' }: ItineraryTimelineProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-2xl font-semibold mb-6 text-center">Event Itinerary</h3>
      <div className="relative">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Timeline line */}
            {index < items.length - 1 && (
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-current opacity-20" />
            )}
            {/* Timeline dot */}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-current">
              <Clock className="h-4 w-4" />
            </div>
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm opacity-80">{item.description}</p>
                  )}
                </div>
                <div className="text-sm font-medium opacity-70 whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
