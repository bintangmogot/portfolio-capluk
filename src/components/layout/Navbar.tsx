'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { GlassEffect } from '@/components/ui/liquid-glass';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Clapperboard,
  Sparkles,
  User,
  Route,
  MessageCircle,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

// Icon map for each section
const SECTION_ICONS: Record<string, React.ReactNode> = {
  portfolio: <Clapperboard size={16} strokeWidth={1.8} />,
  expertise: <Sparkles size={16} strokeWidth={1.8} />,
  about: <User size={16} strokeWidth={1.8} />,
  journey: <Route size={16} strokeWidth={1.8} />,
  connect: <MessageCircle size={16} strokeWidth={1.8} />,
};

interface NavbarProps {
  sections: { id: string; bgText: string }[];
  activeSection: string | null;
  prevSectionIndex: number | null;
  onNavigate: (index: number) => void;
  children?: React.ReactNode;
}

export default function Navbar({
  sections,
  activeSection,
  prevSectionIndex,
  onNavigate,
  children,
}: NavbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);

  // Maintain local state for children to enable slide-out animations
  const [displayChildren, setDisplayChildren] = useState(children);

  const isExpanded = activeSection !== null;
  const activeSectionIndex = activeSection
    ? sections.findIndex((s) => s.id === activeSection)
    : null;

  // Determine slide direction: positive = slide from right, negative = slide from left
  const getSlideDirection = useCallback((): number => {
    if (prevSectionIndex === null || activeSectionIndex === null) return 0;
    return activeSectionIndex > prevSectionIndex ? 1 : -1;
  }, [prevSectionIndex, activeSectionIndex]);

  // GSAP: Container expand/collapse
  useGSAP(() => {
    if (!containerRef.current || !contentWrapRef.current) return;

    if (isExpanded) {
      const targetWidth = gsap.utils.clamp(320, 1400, window.innerWidth - 32);

      gsap.to(containerRef.current, {
        width: targetWidth,
        borderRadius: '40px',
        duration: 0.65,
        ease: 'power3.inOut',
        clearProps: 'height',
      });

      gsap.to(contentWrapRef.current, {
        autoAlpha: 1,
        height: 'auto',
        marginTop: '12px',
        duration: 0.65,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(contentWrapRef.current, {
        autoAlpha: 0,
        height: 0,
        marginTop: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(containerRef.current, {
            width: 'auto',
            borderRadius: '20px',
            duration: 0.5,
            ease: 'power3.inOut',
            clearProps: 'width',
          });
          setDisplayChildren(null); // Clear content only after collapse
        },
      });
    }
  }, [isExpanded]);

  // GSAP: Slide content when switching between tabs (not on first open/close)
  useGSAP(() => {
    if (!contentInnerRef.current || !isExpanded) return;
    const dir = getSlideDirection();
    if (dir === 0) return;

    const slideDistance = 60;

    // Animate: slide in from direction
    gsap.fromTo(
      contentInnerRef.current,
      { x: dir * slideDistance, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeSection]);

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-16px)] sm:w-max sm:max-w-[calc(100vw-64px)] flex justify-center">
      <GlassEffect
        ref={containerRef}
        className="flex flex-col p-1.5 sm:p-2 shadow-2xl w-max max-w-full"
        style={{ borderRadius: '20px' }}
      >
        {/* Navigation Buttons */}
        <div className="flex items-center justify-center shrink-0 w-full overflow-visible py-2 px-1 sm:px-3">
          
          {/* Logo - Hidden on mobile */}
          <button 
            onClick={() => onNavigate(-1)}
            className="hidden md:flex items-center shrink-0 pr-3 mr-1 border-r border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Desktop_-_1" 
              alt="Capluk Logo" 
              className="w-auto h-7 sm:w-auto sm:h-8 hover:saturate-150 rounded-lg transition-all duration-300" 
            />
          </button>

          {/* Buttons List */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 shrink-0">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => onNavigate(idx)}
                className={`flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full font-heading cursor-pointer transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-linear-to-r from-orange-700/90 to-orange-900 text-amber-400 border border-[#9f7657]'
                  : 'text-white/60 hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] border border-transparent'
              }`}
            >
              <span className="shrink-0">{SECTION_ICONS[section.id]}</span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-none">{section.id}</span>
            </button>
          ))}
          </div>
        </div>

        {/* Dynamic Inner Content */}
        <div
          ref={contentWrapRef}
          className="w-full flex flex-col overflow-hidden"
          style={{ height: 0, opacity: 0, visibility: 'hidden' }}
        >
          <div
            ref={contentInnerRef}
            className="w-full max-h-[55vh] sm:max-h-[45vh] relative px-3 sm:px-4 pb-4 hide-scrollbar flex flex-col overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </GlassEffect>
    </div>
  );
}
