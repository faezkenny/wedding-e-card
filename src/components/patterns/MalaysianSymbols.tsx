'use client';

interface MalaysianSymbolProps {
  className?: string;
  size?: number;
  color?: string;
}

// Bunga Raya (Hibiscus) - Malaysia's National Flower
export function BungaRaya({ className = '', size = 40, color = '#FF6B9D' }: MalaysianSymbolProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Petals */}
      <ellipse cx="50" cy="40" rx="20" ry="30" fill={color} opacity="0.8" transform="rotate(-20 50 50)" />
      <ellipse cx="50" cy="40" rx="20" ry="30" fill={color} opacity="0.8" transform="rotate(20 50 50)" />
      <ellipse cx="50" cy="40" rx="20" ry="30" fill={color} opacity="0.8" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="40" rx="20" ry="30" fill={color} opacity="0.8" transform="rotate(-60 50 50)" />
      {/* Center */}
      <circle cx="50" cy="40" r="8" fill="#FFD700" />
      {/* Stem */}
      <line x1="50" y1="70" x2="50" y2="90" stroke="#006B3C" strokeWidth="3" />
      {/* Leaves */}
      <ellipse cx="40" cy="75" rx="8" ry="15" fill="#006B3C" transform="rotate(-30 40 75)" />
      <ellipse cx="60" cy="75" rx="8" ry="15" fill="#006B3C" transform="rotate(30 60 75)" />
    </svg>
  );
}

// Ketupat (Rice Dumpling) - Traditional Symbol
export function Ketupat({ className = '', size = 40, color = '#8B4513' }: MalaysianSymbolProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Woven pattern */}
      <path d="M 20 20 L 50 50 L 80 20 L 50 50 L 20 80 L 50 50 L 80 80 Z" 
            fill="none" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" />
      <path d="M 20 20 L 50 50 L 20 80 M 80 20 L 50 50 L 80 80" 
            fill="none" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" />
    </svg>
  );
}

// Crescent and Star - Islamic Symbol
export function CrescentStar({ className = '', size = 40, color = '#FFD700' }: MalaysianSymbolProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Crescent */}
      <path d="M 30 50 A 20 20 0 1 1 30 30 Z" fill={color} />
      <circle cx="35" cy="40" r="18" fill="#F5F5DC" />
      {/* Star */}
      <path d="M 70 30 L 72 38 L 80 38 L 73 43 L 75 51 L 70 45 L 65 51 L 67 43 L 60 38 L 68 38 Z" fill={color} />
    </svg>
  );
}
