'use client';

interface ArabicCalligraphyProps {
  text: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

// Arabic Calligraphy Component
export function ArabicCalligraphy({ text, className = '', size = 'medium' }: ArabicCalligraphyProps) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl md:text-5xl',
    large: 'text-6xl md:text-8xl',
  };

  return (
    <div className={`${sizeClasses[size]} font-arabic ${className}`} dir="rtl">
      {text}
    </div>
  );
}

// Common Islamic Phrases
export const IslamicPhrases = {
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  barakallahu: 'بَارَكَ اللَّهُ لَكُمَا',
  mashaAllah: 'مَا شَاءَ اللَّهُ',
  tabarakAllah: 'تَبَارَكَ اللَّهُ',
  assalamualaikum: 'السَّلَامُ عَلَيْكُمْ',
  allahummaBarik: 'اللَّهُمَّ بَارِكْ',
  alhamdulillah: 'الْحَمْدُ لِلَّهِ',
};

// Islamic Greeting Component
export function IslamicGreeting({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <ArabicCalligraphy text={IslamicPhrases.assalamualaikum} size="small" />
      <p className="text-sm mt-2 opacity-70">Assalamualaikum</p>
    </div>
  );
}

// Blessing Component
export function IslamicBlessing({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <ArabicCalligraphy text={IslamicPhrases.barakallahu} size="medium" />
      <p className="text-sm mt-2 opacity-70">Barakallahu lakuma</p>
    </div>
  );
}

// Bismillah Header Component
export function BismillahHeader({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center mb-6 ${className}`}>
      <ArabicCalligraphy text={IslamicPhrases.bismillah} size="small" />
    </div>
  );
}
