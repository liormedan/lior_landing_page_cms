'use client'

import { useEffect, useRef } from 'react'

export default function SpinningPlus3D() {
  const plusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = plusRef.current
    if (!element) return

    // Add color animation to all layers
    const layers = element.querySelectorAll('div')
    layers.forEach((layer, index) => {
      layer.style.animation = `colorFlow 3s ease-in-out infinite ${index * 0.1}s, glow 3s ease-in-out infinite ${index * 0.1}s`
    })
  }, [])

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
      <style jsx>{`
        @keyframes colorFlow {
          0% {
            background: linear-gradient(45deg, #0ea5e9, #3b82f6, #06b6d4);
          }
          25% {
            background: linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6);
          }
          50% {
            background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899);
          }
          75% {
            background: linear-gradient(45deg, #8b5cf6, #ec4899, #0ea5e9);
          }
          100% {
            background: linear-gradient(45deg, #ec4899, #0ea5e9, #3b82f6);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.4), 0 0 40px rgba(14, 165, 233, 0.2);
          }
          25% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2);
          }
          75% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2);
          }
        }
      `}</style>
      
      <div
        ref={plusRef}
        className="relative w-full h-full transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Layer 1 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-400 via-blue-500 to-cyan-400 shadow-2xl"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(8px)',
            boxShadow: '0 0 30px rgba(14, 165, 233, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        />
        
        {/* Layer 1 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 shadow-2xl"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(8px)',
            boxShadow: '0 0 30px rgba(14, 165, 233, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        />

        {/* Layer 2 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-420 via-blue-520 to-cyan-420"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(7px)'
          }}
        />
        
        {/* Layer 2 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-420 via-blue-520 to-cyan-420"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(7px)'
          }}
        />

        {/* Layer 3 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-440 via-blue-540 to-cyan-440"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(6px)'
          }}
        />
        
        {/* Layer 3 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-440 via-blue-540 to-cyan-440"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(6px)'
          }}
        />

        {/* Layer 4 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-460 via-blue-560 to-cyan-460"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(5px)'
          }}
        />
        
        {/* Layer 4 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-460 via-blue-560 to-cyan-460"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(5px)'
          }}
        />

        {/* Layer 5 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-480 via-blue-580 to-cyan-480"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(4px)'
          }}
        />
        
        {/* Layer 5 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-480 via-blue-580 to-cyan-480"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(4px)'
          }}
        />

        {/* Layer 6 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-500 via-blue-600 to-cyan-500"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(3px)'
          }}
        />
        
        {/* Layer 6 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(3px)'
          }}
        />

        {/* Layer 7 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-520 via-blue-620 to-cyan-520"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(2px)'
          }}
        />
        
        {/* Layer 7 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-520 via-blue-620 to-cyan-520"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(2px)'
          }}
        />

        {/* Layer 8 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-540 via-blue-640 to-cyan-540"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(1px)'
          }}
        />
        
        {/* Layer 8 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-540 via-blue-640 to-cyan-540"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(1px)'
          }}
        />

        {/* Center layer - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-560 via-blue-660 to-cyan-560"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(0px)'
          }}
        />
        
        {/* Center layer - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-560 via-blue-660 to-cyan-560"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(0px)'
          }}
        />

        {/* Layer 9 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-580 via-blue-680 to-cyan-580"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-1px)'
          }}
        />
        
        {/* Layer 9 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-580 via-blue-680 to-cyan-580"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-1px)'
          }}
        />

        {/* Layer 10 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-600 via-blue-700 to-cyan-600"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-2px)'
          }}
        />
        
        {/* Layer 10 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-600 via-blue-700 to-cyan-600"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-2px)'
          }}
        />

        {/* Layer 11 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-620 via-blue-720 to-cyan-620"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-3px)'
          }}
        />
        
        {/* Layer 11 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-620 via-blue-720 to-cyan-620"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-3px)'
          }}
        />

        {/* Layer 12 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-640 via-blue-740 to-cyan-640"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-4px)'
          }}
        />
        
        {/* Layer 12 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-640 via-blue-740 to-cyan-640"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-4px)'
          }}
        />

        {/* Layer 13 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-660 via-blue-760 to-cyan-660"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-5px)'
          }}
        />
        
        {/* Layer 13 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-660 via-blue-760 to-cyan-660"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-5px)'
          }}
        />

        {/* Layer 14 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-680 via-blue-780 to-cyan-680"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-6px)'
          }}
        />
        
        {/* Layer 14 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-680 via-blue-780 to-cyan-680"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-6px)'
          }}
        />

        {/* Layer 15 - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-700 via-blue-800 to-cyan-700"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-7px)'
          }}
        />
        
        {/* Layer 15 - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-700 via-blue-800 to-cyan-700"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-7px)'
          }}
        />

        {/* Back layer - Vertical bar */}
        <div
          className="absolute bg-gradient-to-b from-sky-720 via-blue-820 to-cyan-720"
          style={{
            width: '20%',
            height: '100%',
            left: '40%',
            top: '0%',
            borderRadius: '4px',
            transform: 'translateZ(-8px)'
          }}
        />
        
        {/* Back layer - Horizontal bar */}
        <div
          className="absolute bg-gradient-to-r from-sky-720 via-blue-820 to-cyan-720"
          style={{
            width: '100%',
            height: '20%',
            left: '0%',
            top: '40%',
            borderRadius: '4px',
            transform: 'translateZ(-8px)'
          }}
        />
      </div>
    </div>
  )
}