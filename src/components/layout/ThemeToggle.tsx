'use client';

import { useRef } from 'react';
import { GlassEffect } from '@/components/ui/liquid-glass';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface ThemeToggleProps {
  isVisible?: boolean;
}

export default function ThemeToggle({ isVisible = true }: ThemeToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      y: isVisible ? 0 : -20,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-8 left-8 z-50 pointer-events-auto"
    >
      <GlassEffect className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95">
         <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30" />
      </GlassEffect>
    </div>
  );
}
