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
const SECTION_ICONS: Record<string, any> = {
  portfolio: Clapperboard,
  expertise: Sparkles,
  about: User,
  journey: Route,
  connect: MessageCircle,
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
  // Initialize hasContent based on whether children are present to avoid initial jumps
  const [hasContent, setHasContent] = useState(!!children);
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverNavTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP: Premium Container expand/collapse
  useGSAP(() => {
    if (!containerRef.current || !contentWrapRef.current) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (isExpanded) {
      const targetWidth = gsap.utils.clamp(320, 1400, window.innerWidth - 32);
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      gsap.to(containerRef.current, {
        width: targetWidth,
        borderRadius: isDesktop ? '60px' : isTablet ? '40px' : '24px',
        duration: 0.8,
        ease: 'expo.out',
        clearProps: 'height',
      });

      // Standardize height on desktop for consistent tab switching
      const desktopHeight = 140; // Standardize expanded height for desktop

      gsap.to(contentWrapRef.current, {
        autoAlpha: 1,
        height: isDesktop ? desktopHeight : 'auto',
        marginTop: isDesktop ? '12px' : '8px',
        marginBottom: isDesktop ? '0px' : '12px',
        duration: 0.7,
        ease: 'power3.in',
      });
    } else {
      gsap.to(contentWrapRef.current, {
        autoAlpha: 0,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.5,
        ease: 'power3.in',
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
  }, [isExpanded, windowWidth]);

  // GSAP: Staggered Button Reveal on Mount for a premium entrance
  useGSAP(() => {
    const buttons = containerRef.current?.querySelectorAll('.nav-btn-target');
    if (buttons && buttons.length > 0) {
      gsap.fromTo(buttons, 
        { y: 25, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.5 }
      );
    }
  }, []);

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

  const handleHoldStart = (id: string) => {
    if (isLargeScreen) return;
    holdTimerRef.current = setTimeout(() => {
      setHoldingId(id);
    }, 400); // Trigger after 400ms
  };

  const handleHoldEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldingId(null);
  };

  const handleHoverEnter = (idx: number) => {
    if (!isLargeScreen) return;
    if (hoverNavTimerRef.current) clearTimeout(hoverNavTimerRef.current);
    hoverNavTimerRef.current = setTimeout(() => {
      onNavigate(idx);
    }, 150);
  };

  const handleHoverLeave = () => {
    if (hoverNavTimerRef.current) {
      clearTimeout(hoverNavTimerRef.current);
      hoverNavTimerRef.current = null;
    }
    handleHoldEnd();
  };

  return (
    <GlassEffect
      ref={containerRef}
      className="flex flex-col-reverse lg:flex-col mx-4 p-2 pt-4 shadow-2xl w-full max-w-7xl"
      style={{ borderRadius: isLargeScreen ? '20px' : '12px' }}
    >
        {/* Navigation Buttons */}
        <div className="flex items-center justify-center shrink-0 w-full overflow-visible py-1 px-1">
          {/* Buttons List */}
          <div className="flex items-center w-full lg:w-auto lg:justify-center shrink-0 px-2 lg:px-0 gap-[2px] sm:gap-1.5">
          {sections.map((section, idx) => (
            <div key={section.id} className="flex-1 lg:flex-none relative group h-full">
              {/* Tooltip Label — visible on mobile when holding */}
              <div 
                className={`
                  md:hidden absolute -top-10 left-1/2 -translate-x-1/2 
                  px-3 py-1.5 rounded-lg bg-black/80 border border-(--border-color)
                  text-white text-[10px] tracking-widest uppercase font-bold
                  transition-all duration-300 pointer-events-none z-50
                  ${holdingId === section.id ? 'opacity-100 -top-6 scale-100' : 'opacity-0 -top-8 scale-90'}
                `}
              >
                {section.id}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-r border-b border-(--border-color)" />
              </div>

              <button
                onClick={() => onNavigate(idx)}
                onMouseEnter={() => handleHoverEnter(idx)}
                onMouseDown={() => handleHoldStart(section.id)}
                onMouseUp={handleHoldEnd}
                onMouseLeave={handleHoverLeave}
                onTouchStart={() => handleHoldStart(section.id)}
                onTouchEnd={handleHoldEnd}
                className={`nav-btn-target w-full flex items-center justify-center gap-1.5 px-3 py-3 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full font-heading cursor-pointer transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-black/40 text-(--accent) border border-(--border-color) shadow-[0_0_15px_rgba(255,214,153,0.1)]'
                    : 'text-white/60 hover:text-white hover:bg-white/10 hover:border hover:border-(--border-color)'
                }`}
              >
                <span className="shrink-0">
                  {React.createElement(SECTION_ICONS[section.id], {
                    size: isLargeScreen ? 16 : 22, // Slightly larger on mobile
                    strokeWidth: 1.8
                  })}
                </span>
                <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.15em] leading-none">{section.id}</span>
              </button>
            </div>
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
