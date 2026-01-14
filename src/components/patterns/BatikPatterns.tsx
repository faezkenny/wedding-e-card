'use client';

interface BatikPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

// Traditional Batik Floral Pattern
export function BatikFloral({ className = '', color = '#D4AF37', opacity = 0.1 }: BatikPatternProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="batik-floral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="8" fill={color} opacity={opacity} />
          <circle cx="75" cy="25" r="8" fill={color} opacity={opacity} />
          <circle cx="50" cy="50" r="12" fill={color} opacity={opacity} />
          <path d="M 25 75 Q 50 60, 75 75 Q 50 90, 25 75" fill={color} opacity={opacity} />
          <path d="M 20 50 Q 30 40, 40 50 Q 30 60, 20 50" fill={color} opacity={opacity} />
          <path d="M 60 50 Q 70 40, 80 50 Q 70 60, 60 50" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#batik-floral)" />
    </svg>
  );
}

// Songket-inspired Geometric Pattern
export function SongketPattern({ className = '', color = '#8B0000', opacity = 0.15 }: BatikPatternProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="songket" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" />
          <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke={color} strokeWidth="1" opacity={opacity} />
          <circle cx="20" cy="20" r="3" fill={color} opacity={opacity} />
          <rect x="15" y="15" width="10" height="10" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#songket)" />
    </svg>
  );
}

// Islamic Geometric Border Pattern
export function IslamicBorder({ className = '', color = '#006B3C', opacity = 0.2 }: BatikPatternProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="islamic-border" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 25 25 L 50 0 M 0 50 L 25 25 L 50 50" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
          <circle cx="25" cy="25" r="8" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#islamic-border)" />
    </svg>
  );
}
