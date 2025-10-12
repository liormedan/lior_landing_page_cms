'use client';

import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gradient' | 'wave' | 'pulse' | 'rainbow' | 'light';
}

export default function AnimatedText({ 
  children, 
  className = '', 
  variant = 'gradient' 
}: AnimatedTextProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return 'text-white drop-shadow-[0_12px_30px_rgba(15,23,42,0.55)]';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x';
      case 'wave':
        return 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-wave';
      case 'pulse':
        return 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent animate-pulse-color';
      case 'rainbow':
        return 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-rainbow';
      default:
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x';
    }
  };

  return (
    <span className={`${getVariantClasses()} ${className}`}>
      {children}
    </span>
  );
}

// קומפוננט נוסף לטקסט עם אפקט הקלדה
export function TypingAnimatedText({ 
  text, 
  className = '',
  variant = 'gradient',
  speed = 100 
}: {
  text: string;
  className?: string;
  variant?: 'gradient' | 'wave' | 'pulse' | 'rainbow' | 'light';
  speed?: number;
}) {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <AnimatedText variant={variant} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </AnimatedText>
  );
}
