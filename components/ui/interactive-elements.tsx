'use client';

import React, { useState } from 'react';

// כפתור עם אנימציות מתקדמות
export function AnimatedButton({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative overflow-hidden font-semibold rounded-lg
    transition-all duration-300 ease-out
    transform-gpu active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    group
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600 text-white
      hover:from-blue-600 hover:to-purple-700
      hover:shadow-lg hover:shadow-blue-500/25
      focus:ring-blue-500
      before:absolute before:inset-0 before:bg-white before:opacity-0
      before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
    secondary: `
      bg-white text-gray-900 border-2 border-gray-200
      hover:border-blue-500 hover:text-blue-600
      hover:shadow-md
      focus:ring-blue-500
    `,
    ghost: `
      text-gray-600 hover:text-blue-600 hover:bg-blue-50
      focus:ring-blue-500
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* אפקט גלים */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className={`
          absolute inset-0 bg-white opacity-0 
          transition-all duration-500 ease-out
          ${isPressed ? 'opacity-20 scale-150' : 'scale-0'}
        `} />
      </span>
      
      {/* תוכן הכפתור */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

// כרטיס עם אנימציות hover מתקדמות
export function AnimatedCard({ 
  children, 
  className = '',
  hoverEffect = 'lift' 
}: {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'scale';
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'lift':
        return isHovered ? 'transform translate-y-[-8px] shadow-2xl' : '';
      case 'tilt':
        return isHovered 
          ? `transform rotate3d(1, 1, 0, ${mousePosition.y * 0.5}deg) translate-y-[-4px]` 
          : '';
      case 'glow':
        return isHovered ? 'shadow-2xl shadow-blue-500/20' : '';
      case 'scale':
        return isHovered ? 'transform scale-105' : '';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl border border-gray-200
        transition-all duration-300 ease-out
        ${getHoverStyles()}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: hoverEffect === 'tilt' && isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateZ(20px)`
          : undefined
      }}
    >
      {/* אפקט זוהר */}
      {hoverEffect === 'glow' && (
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
          opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-10' : ''}
        `} />
      )}
      
      {children}
    </div>
  );
}

// אינדיקטור טעינה מתקדם
export function LoadingSpinner({ 
  size = 'md',
  color = 'blue' 
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green';
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      border-2 ${colorClasses[color]} border-t-transparent 
      rounded-full animate-spin
    `} />
  );
}

// פרוגרס בר מתקדם
export function AnimatedProgressBar({ 
  progress, 
  className = '' 
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      >
        {/* אפקט זוהר נע */}
        <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
      </div>
    </div>
  );
}