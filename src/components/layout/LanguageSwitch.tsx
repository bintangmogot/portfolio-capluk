'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { GlassEffect } from '@/components/ui/liquid-glass';

gsap.registerPlugin(useGSAP);

interface LanguageSwitchProps {
  isVisible?: boolean;
}

export default function LanguageSwitch({ isVisible = true }: LanguageSwitchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!mounted || !containerRef.current) return;
    
    gsap.to(containerRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [isVisible, mounted]);

  if (!mounted) return null;

  const isID = language === 'id';

  const toggleLanguage = () => {
    const nextLang = isID ? 'en' : 'id';
    setLanguage(nextLang);
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed top-6 sm:top-8 left-[80px] sm:left-[130px] lg:left-[150px] xl:left-[170px] z-50 pointer-events-auto"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <div className="group relative">
        <button
          onClick={toggleLanguage}
          className="relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90"
        > 
          <span className="relative z-10 text-3xl md:text-4xl ml-2 lg:ml-4 transition-transform duration-500 ease-out group-hover:rotate-12">
            {isID ? '🇮🇩' : '🇺🇸'}
          </span>

          {/* Glow Effect */}
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm bg-linear-to-br transition-all duration-500",
            isID ? "from-red-500/20 to-white/20" : "from-blue-500/20 to-white/20"
          )} />
        </button>

        {/* Tooltip */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-white bg-black/80 backdrop-blur-md rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
          {isID ? 'Bahasa Indonesia' : 'English'}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/80 border-t border-l border-white/10" />
        </div>
      </div>
    </div>
  );
}
