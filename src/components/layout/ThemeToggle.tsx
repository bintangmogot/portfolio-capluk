'use client';

import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { GlassEffect } from '@/components/ui/liquid-glass';
import { PremiumToggle } from '@/components/ui/bouncy-toggle';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface ThemeToggleProps {
  isVisible?: boolean;
}

export default function ThemeToggle({ isVisible = true }: ThemeToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      y: isVisible ? 0 : -20,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [isVisible]);

  const isCinematic = theme === 'cinematic';

  return (
    <div 
      ref={containerRef} 
      className="fixed top-6 sm:top-8 left-4 sm:left-10 lg:left-15 xl:left-20 z-50 pointer-events-auto"
    >
      <div className="group relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
        {mounted && (
          <PremiumToggle
            checked={isCinematic}
            onChange={(checked) => setTheme(checked ? 'cinematic' : 'dark')}
          />
        )}
      </div>
    </div>
  );
}
