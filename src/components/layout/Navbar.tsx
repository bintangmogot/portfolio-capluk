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
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setIsLargeScreen(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    media.addEventListener('change', listener);

    // Track content height to avoid empty space
    const inner = contentInnerRef.current;
    if (!inner) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use scrollHeight or height? scrollHeight is 0 if empty
        const currentHeight = entry.target.scrollHeight;
        setHasContent(currentHeight > 5); // 5px buffer
      }
    });

    observer.observe(inner);
    return () => {
      media.removeEventListener('change', listener);
      observer.disconnect();
    };
  }, []);

  // Maintain local state for children to enable slide-out animations
  const [displayChildren, setDisplayChildren] = useState(children);

  const isExpanded = activeSection !== null && hasContent;
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

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (isExpanded) {
      const targetWidth = gsap.utils.clamp(320, 1400, window.innerWidth - 32);

      gsap.to(containerRef.current, {
        width: targetWidth,
        borderRadius: isDesktop ? '40px' : '16px',
        duration: 0.65,
        ease: 'power3.inOut',
        clearProps: 'height',
      });

      // Standardize height on desktop for consistent tab switching
      const desktopHeight = 140; // Standardize expanded height for desktop

      gsap.to(contentWrapRef.current, {
        autoAlpha: 1,
        height: isDesktop ? desktopHeight : 'auto',
        marginTop: isDesktop ? '12px' : '8px',
        marginBottom: isDesktop ? '0px' : '12px',
        duration: 0.65,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(contentWrapRef.current, {
        autoAlpha: 0,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(containerRef.current, {
            width: 'auto',
            borderRadius: isDesktop ? '20px' : '12px',
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
    <GlassEffect
      ref={containerRef}
      className="flex flex-col-reverse lg:flex-col mx-4 p-2 pt-4 sm:p-4 shadow-2xl w-full max-w-7xl"
      style={{ borderRadius: isLargeScreen ? '20px' : '12px' }}
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
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'text-white/60 hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] border border-transparent'
              }`}
            >
              <span className="shrink-0">{SECTION_ICONS[section.id]}</span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-widest sm:tracking-[0.15em] leading-none">{section.id}</span>
            </button>
          ))}
          </div>
        </div>

        {/* Dynamic Inner Content */}
        <div
          ref={contentWrapRef}
          className="w-full flex flex-col overflow-hidden h-full"
          style={{ height: 0, opacity: 0, visibility: 'hidden' }}
        >
          <div
            ref={contentInnerRef}
            className="w-full h-full max-h-[20dvh] sm:max-h-[25dvh] md:max-h-[30dvh] relative px-2 sm:px-4 pb-1 hide-scrollbar flex flex-col md:w-full overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </GlassEffect>
  );
}
