'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GlassEffect } from '@/components/ui/liquid-glass';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Clapperboard,
  Film,
  Palette,
  Briefcase,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

// ─── Types ───
interface MilestoneCard {
  type: 'media' | 'info' | 'video';
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  images?: string[]; 
  videoSrc?: string;
  role?: string;
  company?: string;
  achievements?: string[];
  icon?: string;
}

interface Milestone {
  id: string;
  year: string;
  role: string;
  company: string;
  companyType: string;
  icon: React.ElementType;
  accentColor: string;
  cards: MilestoneCard[];
}

// ─── Data ───
const MILESTONES: Milestone[] = [
  {
    id: 'edu-smk',
    year: '2011 – 2014',
    role: 'Broadcasting Student',
    company: 'Vocational School',
    companyType: 'Education',
    icon: GraduationCap,
    accentColor: 'from-purple-500/20 to-pink-600/20',
    cards: [
      {
        type: 'info',
        role: 'Student',
        company: 'Vocational School',
        title: 'The Foundation',
        icon: 'https://res.cloudinary.com/workstation-/image/upload/v1782779666/capluk-portfolio/Icon/witness.png',
        description: `Bachelor of Information Technology
Bina Nusantara University.
Foundation in digital media,
computer graphic,
software systems
and information technology.`,
        achievements: ['Worked on over 80 major motion pictures', 'Double-nominated as best visual effect (2019)', 'Nominated as best visual effect (2021)', 'https://id.wikipedia.org/wiki/Penata_Efek_Visual_Terbaik_Festival_Film_Indonesia'],
      },
    ],
  },
  {
    id: 'starvision',
    year: '2015 – 2018',
    role: 'Visual FX Artist',
    company: 'Starvision Plus',
    companyType: 'Film Company',
    icon: Clapperboard,
    accentColor: 'from-amber-500/20 to-orange-600/20',
    cards: [
      {
        type: 'info',
        role: 'Visual FX Artist',
        company: 'Starvision Plus',
        title: 'The Craftsman',
        icon: 'https://res.cloudinary.com/workstation-/image/upload/v1782779664/capluk-portfolio/Icon/play.png',
        description: `Experience crafting visual effects for broadcast television, feature films,
and commercial productions.
Skilled in integrating technical execution with cinematic storytelling.
Delivering visuals that enhance narrative impact while
meeting cinema production and broadcast standards.`,
        achievements: ['Worked on over 80 major motion pictures', 'Double-nominated as best visual effect (2019)', 'Nominated as best visual effect (2021)', 'https://id.wikipedia.org/wiki/Penata_Efek_Visual_Terbaik_Festival_Film_Indonesia'],
      },
    ],
  },
  {
    id: 'freelance',
    year: '2019 – 2021',
    role: 'Film Director',
    company: 'Freelance',
    companyType: 'Independent',
    icon: Film,
    accentColor: 'from-blue-500/20 to-indigo-600/20',
    cards: [
      {
        type: 'info',
        role: 'Film Director',
        company: 'Freelance',
        title: 'The Story Architect',
        icon: 'https://res.cloudinary.com/workstation-/image/upload/v1782779664/capluk-portfolio/Icon/director-chair.png',
        description: `Leading creative and technical teams to transform scripts and ideas
into cinematic experiences. Combining storytelling, production expertise,
and strategic leadership across every stage of filmmaking
to deliver stories that resonate beyond the screen.
`,
        achievements: ['5-time Feature Film Director', 'Filmography includes over 30 film television', 'Directed Music Videos', 'Making TVC and Ad Campaigns', 'https://id.wikipedia.org/wiki/Herdanius_Larobu']
      },
    ],
  },
  {
    id: 'mataque',
    year: '2022 – Present',
    role: 'Creative Director',
    company: 'Mataque Studio',
    companyType: 'Creative Agency',
    icon: Palette,
    accentColor: 'from-emerald-500/20 to-teal-600/20',
    cards: [
      {
        type: 'info',
        role: 'Creative Director',
        company: 'Mataque Studio',
        title: 'The Visionary',
        icon: 'https://res.cloudinary.com/workstation-/image/upload/v1782779662/capluk-portfolio/Icon/brain.png',
        description: `Setting creative direction, combining storytelling and recent technologies to shape innovative ideas.
Producing various types of content that are relatable,
meaningful, and emotionally connect with the audience.

Leading agile multidisciplinary teams to produce impactful experiences
through the alignment of vision, strategy, and execution.`,
        achievements: ['Founded and led Mataque Studio in Bali',],
      },
    ],
  },
];

// ─── Media Card ───
function MediaCard({ card }: { card: MilestoneCard }) {
  const imgSrc = card.imageSrc || (card.images && card.images.length > 0 ? card.images[0] : null);
  if (!imgSrc) return null;

  return (
    <GlassEffect className="rounded-[20px] overflow-hidden border-(--border-color) w-full sm:w-1/2 lg:w-full sm:mx-auto bg-black/40 shrink-0 shadow-xl group relative">
      <div className="relative w-full h-auto lg:h-[180px]">
        <img
          src={imgSrc}
          alt={card.imageAlt || card.title || ''}
          className="w-full h-auto lg:h-[180px] object-cover transition-transform duration-700 group-hover:scale-105 block"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        {card.title && (
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" />
            <h4 className="font-heading text-[11px] sm:text-xs text-text-main tracking-widest uppercase font-bold drop-shadow-md">
              {card.title}
            </h4>
          </div>
        )}
      </div>
    </GlassEffect>
  );
}

function InfoCard({ card }: { card: MilestoneCard }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full md:w-auto">
      <GlassEffect className="rounded-[20px] p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full sm:w-[320px] shrink-0">
        {/* Date & Location Header */}
        <div className="flex flex-col mb-1 sm:mb-2">
          {card.role && (
            <div className="inline-flex items-center gap-3">
              {card.icon ? (
                <div 
                  className="w-[26px] h-[26px] bg-accent drop-shadow-[0_0_8px_var(--accent-glow)] shrink-0"
                  style={{
                    WebkitMaskImage: `url(${card.icon})`,
                    maskImage: `url(${card.icon})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                />
              ) : (
                <Briefcase size={26} className="text-accent drop-shadow-[0_0_8px_var(--accent-glow)] shrink-0" />
              )}
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-wide text-white">
                {card.title || card.role}
              </h3>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="relative pt-2 border-t border-accent/80">
          <p className="font-body text-sm text-text-muted font-light leading-relaxed whitespace-pre-line">
            {card.description}
          </p>
        </div>
      </GlassEffect>

      {/* Achievements List */}
      {card.achievements && card.achievements.length > 0 && (
        <div className="flex flex-col gap-3 pt-2 md:pt-4 shrink-0 w-full sm:w-[280px]">
          <h4 className="font-heading text-white text-sm md:text-base font-bold tracking-widest pl-2">
            Achievements
          </h4>
          <div className="flex flex-col gap-2">
            {card.achievements.map((ach, i) => {
              if (ach.startsWith('http')) {
                return (
                  <GlassEffect 
                    key={i}
                    href={ach}
                    target="_blank"
                    solidOnHover={true}
                    className="relative overflow-hidden flex items-center justify-center gap-3 px-4 sm:px-6 py-2 sm:py-2.5 mt-2 rounded-xl active:scale-[0.98] transition-all duration-500 group cursor-pointer w-fit"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="font-body tracking-[0.05em] text-text-main group-hover:text-accent transition-colors z-10 relative pr-2 font-bold text-[10px] sm:text-xs">VIEW REFERENCE</span>
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-120 group-hover:bg-accent transition-all duration-300 z-10 relative">
                      <ExternalLink size={12} strokeWidth={2.5} className="text-black group-hover:-translate-y-[1px] group-hover:translate-x-[1px] transition-transform duration-300" />
                    </div>
                  </GlassEffect>
                );
              }

              return (
                <div key={i} className="inline-flex items-center gap-3 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-wider text-accent bg-black/40 backdrop-blur-md border border-accent/40 rounded-full w-fit">
                  <Award size={14} className="text-accent shrink-0" />
                  <span>{ach}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Render Card ───
function RenderCard({ card }: { card: MilestoneCard }) {
  if (card.type === 'media') return <MediaCard card={card} />;
  if (card.type === 'info') return <InfoCard card={card} />;
  return null;
}


// ═══════════════════════════════════════════
//  DESKTOP: Hover/Click Timeline
// ═══════════════════════════════════════════
function DesktopTimeline({ isActive }: { isActive: boolean }) {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const cardGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const extraGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  const activeId = pinnedId || hoveredId;

  // Mount/Find portal target whenever active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      const checkPortal = () => {
        const el = document.getElementById('journey-desktop-portal');
        if (el) {
          setPortalTarget(el);
          clearInterval(interval);
        }
      };
      
      checkPortal(); // Check immediately
      interval = setInterval(checkPortal, 50); // Fallback watch if node delays
    } else {
      // Clear target and state when leaving the tab
      setPortalTarget(null);
      setPinnedId(null);
      setHoveredId(null);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Animate card visibility
  useGSAP(() => {
    MILESTONES.forEach((m, idx) => {
      const el = cardGroupRefs.current[m.id];
      const extraEl = extraGroupRefs.current[m.id];
      const isLeftHalf = idx < MILESTONES.length / 2;

      if (activeId === m.id) {
        if (el) gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          pointerEvents: 'auto',
        });
        if (extraEl) gsap.to(extraEl, {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          ease: 'power3.out',
          pointerEvents: 'auto',
          delay: 0.05
        });
      } else {
        if (el) gsap.to(el, {
          autoAlpha: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
          pointerEvents: 'none',
        });
        if (extraEl) gsap.to(extraEl, {
          autoAlpha: 0,
          x: isLeftHalf ? 20 : -20,
          duration: 0.3,
          ease: 'power2.in',
          pointerEvents: 'none',
        });
      }
    });
  }, [activeId]);

  // Dismiss all on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (pinnedId || hoveredId) {
        setPinnedId(null);
        setHoveredId(null);
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [pinnedId, hoveredId]);

  // Cleanup on section change (Issue #31)
  useEffect(() => {
    if (!isActive) {
      setPinnedId(null);
      setHoveredId(null);
    }
  }, [isActive]);

  const handleClick = (id: string) => {
    setPinnedId((prev) => (prev === id ? null : id));
  };

  const Timeline = (
    <div ref={timelineRef} className="relative flex items-center justify-between w-full max-w-5xl mx-auto px-6 h-full">
      {/* Line */}
      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-accent/50" />

      {MILESTONES.map((milestone, idx) => {
        const IconComponent = milestone.icon;
        const isActive = activeId === milestone.id;
        const position = 20 + (idx / (MILESTONES.length - 1)) * 60; // Map to 20%-80% range

        return (
          <div
            key={milestone.id}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center cursor-pointer group"
            style={{ left: `${position}%` }}
            onMouseEnter={() => { if (!pinnedId) setHoveredId(milestone.id); }}
            onMouseLeave={() => { if (!pinnedId) setHoveredId(null); }}
            onClick={() => handleClick(milestone.id)}
          >
            {/* Role Label */}
            <span
              className={`absolute bottom-[calc(100%+16px)] font-heading text-sm tracking-widest transition-colors duration-300 whitespace-nowrap ${
                isActive ? 'text-accent' : 'text-text-main group-hover:text-accent'
              }`}
            >
              {milestone.role}
            </span>

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 bg-black ${
                isActive
                  ? 'border-(--border-color) shadow-[0_0_20px_rgba(255,214,153,0.3)]'
                  : 'border-(--border-color)/20 group-hover:border-(--border-color)'
              }`}
            >
              <IconComponent
                size={16}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-white/50 group-hover:text-white'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const activeMilestone = MILESTONES.find(m => m.id === activeId);

  return (
    <>
      <div className="relative w-full h-full pointer-events-none overflow-visible">
        {/* ── BACKGROUND LAYER (Opening Title) ── z-0 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <div 
            className={`flex flex-col items-center justify-center transition-all ease-out-expo ${
              activeId 
                ? 'duration-150 opacity-0 scale-95 -translate-y-4 blur-sm' 
                : 'duration-500 opacity-100 scale-100 translate-y-0 blur-0 delay-500'
            }`}
          >
            <div className="font-tagline text-body font-w-tagline tracking-[0.4em] uppercase text-text-muted mb-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              The Timeline.
            </div>
            <h2
              className="font-display font-w-display text-h2 leading-[0.9] tracking-wide text-text-main uppercase text-center cursor-default select-none"
              style={{
                textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.1)',
              }}
            >
              Journey
            </h2>
            <div className="mt-8 w-40 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }} />
          </div>
        </div>

        {/* ── Card Containers (float above) ── */}
          <div className="relative w-full h-full" style={{ minHeight: '300px' }}>
            {MILESTONES.map((milestone, idx) => {
            // Updated range to match timeline icons (20% - 80%)
              const position = 20 + (idx / (MILESTONES.length - 1)) * 60;
            const isLeftHalf = idx < MILESTONES.length / 2;
              
            // Find extra images
               const extraImages: string[] = [];
               milestone.cards.forEach(c => {
                  if (c.type === 'media' && c.images && c.images.length > 1) {
                  extraImages.push(...c.images.slice(1)); // Show all extra images
                  }
               });

              return (
                <React.Fragment key={milestone.id}>
                {/* ── MAIN CONTENT (Anchored to node) ── */}
                  <div
                    ref={(el) => { cardGroupRefs.current[milestone.id] = el; }}
                    className="absolute bottom-5 z-20 flex flex-col justify-end"
                    style={{
                      left: `${position}%`,
                      transform: 'translateX(-50%)',
                      opacity: 0,
                      visibility: 'hidden',
                      width: 'max-content',
                      maxWidth: 'min(350px, 90vw)',
                    }}
                  >
                    <div className="flex flex-col gap-3 pointer-events-auto pb-2 items-center">
                      {milestone.cards.map((card, cardIdx) => (
                        <div key={cardIdx} className={card.type === 'media' ? 'w-[200px] sm:w-[260px]' : 'w-full'}>
                          <RenderCard card={card} />
                        </div>
                      ))}
                    </div>
                  </div>

                {/* ── EXTRA CONTENT (Anchored to opposite screen edge) ── */}
                  {extraImages.length > 0 && (
                    <div
                      ref={(el) => { extraGroupRefs.current[milestone.id] = el; }}
                      className="absolute bottom-20 right-0 z-10 flex flex-col justify-end pointer-events-none"
                      style={{
                        opacity: 0,
                        visibility: 'hidden',
                        width: 'fit-content',
                        maxHeight: '90%',
                      }}
                    >
                      <GlassEffect 
                        className="p-5 rounded-[24px] w-fit border-accent/50 shadow-xl pointer-events-auto mb-2 flex flex-col items-center"
                        style={{ background: 'linear-gradient(135deg, rgba(30,15,5,0.7), rgba(0,0,0,0.8))' }}
                      >
                        <div className="flex flex-wrap items-center justify-center gap-[10px] w-[260px]">
                          {extraImages.map((img, i) => (
                            <div key={i} className="relative w-[75px] aspect-2/3 rounded-[8px] overflow-hidden group/poster shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-(--border-color)">
                              <img src={img} alt="Extra" className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-110" />
                              <div className="absolute inset-0 bg-black/40 group-hover/poster:bg-transparent transition-colors duration-300" />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-accent/50 w-full text-center">
                          <span className="font-heading text-body font-light tracking-wide text-[#ffedd5]">
                            {extraImages.length} Feature Films
                          </span>
                        </div>
                      </GlassEffect>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>

      {portalTarget && createPortal(Timeline, portalTarget)}
    </>
  );
}


// ═══════════════════════════════════════════
//  MOBILE: Swipe Carousel
// ═══════════════════════════════════════════
function MobileTimeline({ isActive }: { isActive: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const milestone = MILESTONES[activeIndex];

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(MILESTONES.length - 1, index));
    setActiveIndex(clamped);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 40) {
        touchStartRef.current = null;
        return;
      }

      if (absDx >= absDy) {
        if (dx < 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);
      }
      touchStartRef.current = null;
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, goTo]);

  useGSAP(() => {
    if (!cardsContainerRef.current) return;
    gsap.fromTo(
      cardsContainerRef.current,
      { opacity: 0, x: 30, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col gap-4">
      <div className="relative flex items-center justify-between px-2 mt-6 mb-4">
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-(--border-color)/30" />
        {MILESTONES.map((m, idx) => {
          const Icon = m.icon;
          const isActive = idx === activeIndex;
          const textPosition = idx === 0 
            ? 'left-0' 
            : idx === MILESTONES.length - 1 
            ? 'right-0' 
            : 'left-1/2 -translate-x-1/2';

          return (
            <div key={m.id} className="relative z-10 flex flex-col items-center justify-center">
              {/* Role Label */}
              <span
                className={`absolute bottom-[calc(100%+12px)] font-heading text-xs tracking-widest transition-all duration-300 whitespace-nowrap ${textPosition} ${
                  isActive ? 'text-accent opacity-100 translate-y-0' : 'text-text-main opacity-0 translate-y-2'
                }`}
              >
                {m.role}
              </span>

              <button
                onClick={() => goTo(idx)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer bg-black ${
                  isActive
                    ? 'border-accent shadow-[0_0_16px_var(--accent-glow)] scale-110'
                    : 'border-text-main/25'
                }`}
              >
                <Icon size={16} className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/50'}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Navigation Buttons ── */}
      <div className="flex items-center justify-end px-1 -mt-2">
        <div className="flex items-center gap-1">
          <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} className="w-7 h-7 rounded-full bg-white/10 border border-(--border-color) flex items-center justify-center cursor-pointer disabled:opacity-30">
            <ChevronLeft size={14} className="text-text-main" />
          </button>
          <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === MILESTONES.length - 1} className="w-7 h-7 rounded-full bg-white/10 border border-(--border-color) flex items-center justify-center cursor-pointer disabled:opacity-30">
            <ChevronRight size={14} className="text-text-main" />
          </button>
        </div>
      </div>

      <div ref={cardsContainerRef} className="flex flex-col gap-4 w-full pb-[40px] lg:pb-0 lg:overflow-y-auto no-scrollbar">
        {milestone.cards.map((card, cardIdx) => (
          <RenderCard key={`${milestone.id}-${cardIdx}`} card={card} />
        ))}
        {(() => {
          const extraImages: string[] = [];
          milestone.cards.forEach(c => {
             if (c.type === 'media' && c.images && c.images.length > 1) {
                extraImages.push(...c.images.slice(1));
             }
          });
          if (extraImages.length === 0) return null;
          return (
            <div className="w-full mt-1">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="font-heading text-[10px] sm:text-xs tracking-[0.2em] uppercase text-text-muted pr-3">Feature Films ({extraImages.length})</span>
                <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
              </div>
              <div className="flex overflow-x-auto no-scrollbar gap-3 w-full snap-x snap-mandatory px-2 pb-2">
                {extraImages.map((img, i) => (
                  <div key={i} className="relative shrink-0 w-[90px] aspect-2/3 rounded-xl overflow-hidden border border-(--border-color) snap-center shadow-lg bg-black/50">
                    <img src={img} alt={`Poster ${i + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      <div className="flex justify-center gap-1.5 mt-1">
        {MILESTONES.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-5 bg-accent/70' : 'w-1 bg-text-main/20'}`} />
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════
interface JourneySectionProps {
  isActive: boolean;
}

export default function JourneySection({ isActive }: JourneySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setIsLargeScreen(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (isActive) {
      gsap.to(sectionRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        delay: 0.15,
        overwrite: true,
      });
    } else {
      gsap.to(sectionRef.current, {
        autoAlpha: 0,
        y: 60,
        duration: 0.05,
        ease: 'power2.in',
        overwrite: true,
      });
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 flex flex-col items-center justify-start px-4 sm:px-8 pb-1 pt-20 sm:pt-16 pointer-events-none"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <div className="w-full max-w-5xl h-full flex flex-col justify-start relative pointer-events-auto overflow-y-auto lg:overflow-visible no-scrollbar pt-4">
        {isLargeScreen ? <DesktopTimeline isActive={isActive} /> : <MobileTimeline isActive={isActive} />}
      </div>
    </div>
  );
}
