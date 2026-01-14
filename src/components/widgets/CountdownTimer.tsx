'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-bold tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm opacity-70 uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
