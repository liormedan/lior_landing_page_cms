'use client';

import React, { useEffect, useState } from 'react';

// אלמנטים צפים ברקע
export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* עיגולים צפים */}
      <div 
        className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"
        style={{
          top: '10%',
          left: '10%',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-float"
        style={{
          top: '60%',
          right: '10%',
          animationDelay: '2s',
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      />
      
      <div 
        className="absolute w-48 h-48 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
        style={{
          bottom: '20%',
          left: '30%',
          animationDelay: '4s',
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
        }}
      />

      {/* נקודות קטנות מנצנצות */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}

// פרטיקלים אינטראקטיביים
export function InteractiveParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  }>>([]);

  const createParticle = (x: number, y: number) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1
    };
    
    setParticles(prev => [...prev.slice(-19), newParticle]);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02
        })).filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
            transform: `scale(${particle.life})`
          }}
        />
      ))}
    </div>
  );
}

// אפקט מעקב עכבר
export function MouseTracker() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setTrail(prev => [...prev.slice(-10), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
}

// גלים אנימטיביים
export function AnimatedWaves() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        className="relative block w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="animate-wave">
          <use href="#wave" x="48" y="0" fill="rgba(59, 130, 246, 0.1)" />
          <use href="#wave" x="48" y="3" fill="rgba(147, 51, 234, 0.1)" />
          <use href="#wave" x="48" y="5" fill="rgba(236, 72, 153, 0.1)" />
          <use href="#wave" x="48" y="7" fill="rgba(59, 130, 246, 0.05)" />
        </g>
      </svg>
    </div>
  );
}