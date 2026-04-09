'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
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
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

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
            <h4 className="font-heading text-[11px] sm:text-xs text-white tracking-widest uppercase font-bold drop-shadow-md">
              {card.title}
            </h4>
          </div>
        )}
      </div>
    </GlassEffect>
  );
}

// ─── Info Card ───
function InfoCard({ card }: { card: MilestoneCard }) {
  return (
    <GlassEffect className="rounded-[20px] p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full">
      {/* Date & Location Header */}
      <div className="flex flex-col">
        {card.role && (
          <div className="inline-flex items-center gap-2.5">
            <Briefcase size={15} className="text-accent drop-shadow-[0_0_8px_var(--accent-glow)]" />
            <h3 className="font-heading text-h5 font-bold tracking-wide text-white">
              {card.role}
            </h3>
          </div>
        )}
        {card.company && (
          <p className="font-body text-sm text-white/80 tracking-wide font-light pl-[20px] border-l border-white/5 ml-1.5">
            {card.company}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="relative pt-2 border-t border-accent/80">
        <p className="font-body text-sm text-white/70 font-light leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Achievements Pills */}
      {card.achievements && card.achievements.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {card.achievements.map((ach, i) => (
            <div key={i} className="inline-flex items-center gap-3 px-3 py-1.5 text-[10px] sm:text-xs font-medium tracking-wider text-accent bg-black/40 border border-accent/40 rounded-full">
              <Award size={14} className="text-accent" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      )}
    </GlassEffect>
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
function DesktopTimeline({ isActive, milestones }: { isActive: boolean, milestones: Milestone[] }) {
  const { t } = useLanguage();
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
    milestones.forEach((m, idx) => {
      const el = cardGroupRefs.current[m.id];
      const extraEl = extraGroupRefs.current[m.id];
      const isLeftHalf = idx < milestones.length / 2;

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

      {milestones.map((milestone, idx) => {
        const IconComponent = milestone.icon;
        const isActive = activeId === milestone.id;
        const position = 20 + (idx / (milestones.length - 1)) * 60; // Map to 20%-80% range

        return (
          <div
            key={milestone.id}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
            style={{ left: `${position}%` }}
            onMouseEnter={() => { if (!pinnedId) setHoveredId(milestone.id); }}
            onMouseLeave={() => { if (!pinnedId) setHoveredId(null); }}
            onClick={() => handleClick(milestone.id)}
          >
            {/* Icon Node */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isActive
                  ? 'bg-[#1B1D1D66] border-(--border-color) shadow-[0_0_20px_rgba(255,214,153,0.3)]'
                  : 'bg-white/5 border-(--border-color)/20 group-hover:border-(--border-color) group-hover:bg-white/10'
              }`}
            >
              <IconComponent
                size={16}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-white/50 group-hover:text-white/80'
                }`}
              />
            </div>

            {/* Year Label */}
            <span
              className={`font-heading text-xs tracking-widest uppercase transition-colors duration-300 whitespace-nowrap ${
                isActive ? 'text-accent' : 'text-white/90 group-hover:text-white'
              }`}
            >
              {milestone.year}
            </span>

            {/* Role Label */}
            <span className="font-body text-xs text-white/60 tracking-wider whitespace-nowrap">
              {milestone.role}
            </span>
          </div>
        );
      })}
    </div>
  );

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
            <div className="font-tagline text-body font-w-tagline tracking-[0.4em] uppercase text-white/40 mb-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {t('journey.tagline')}
            </div>
            <h2
              className="font-display font-w-display text-h2 leading-[0.9] tracking-wide text-white uppercase text-center cursor-default select-none"
              style={{
                textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.1)',
              }}
            >
              {t('journey.title')}
            </h2>
            <div className="mt-8 w-40 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }} />
          </div>
        </div>

        {/* ── Card Containers (float above) ── */}
          <div className="relative w-full h-full" style={{ minHeight: '300px' }}>
            {milestones.map((milestone, idx) => {
            // Updated range to match timeline icons (20% - 80%)
              const position = 20 + (idx / (milestones.length - 1)) * 60;
              
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
                            {t('journey.milestones.films_count', { count: extraImages.length })}
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
function MobileTimeline({ isActive, milestones }: { isActive: boolean, milestones: Milestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const milestone = milestones[activeIndex];

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(milestones.length - 1, index));
    setActiveIndex(clamped);
  }, [milestones.length]);

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
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-(--border-color)/30" />
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          const isActive = idx === activeIndex;
          return (
            <button
              key={m.id}
              onClick={() => goTo(idx)}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-accent/20 border-accent/50 shadow-[0_0_16px_var(--accent-glow)] scale-110'
                  : 'bg-white/10 border-white/25'
              }`}
            >
              <Icon size={14} className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/80'}`} />
            </button>
          );
        })}
      </div>

      {/* ── Active Milestone Info ── */}
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="font-heading text-h5 tracking-widest uppercase text-accent">{milestone.year}</span>
          <span className="font-body text-body text-white/80 tracking-wider">{milestone.role} — {milestone.company}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} className="w-7 h-7 rounded-full bg-white/10 border border-(--border-color) flex items-center justify-center cursor-pointer disabled:opacity-30">
            <ChevronLeft size={14} className="text-white/80" />
          </button>
          <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === milestones.length - 1} className="w-7 h-7 rounded-full bg-white/10 border border-(--border-color) flex items-center justify-center cursor-pointer disabled:opacity-30">
            <ChevronRight size={14} className="text-white/80" />
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
                <span className="font-heading text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/50 pr-3">{t('journey.milestones.films_count', { count: extraImages.length })}</span>
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
        {milestones.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-5 bg-accent/70' : 'w-1 bg-white/20'}`} />
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
  const { t } = useLanguage();

  const MILESTONES: Milestone[] = useMemo(() => [
    {
      id: 'edu-smk',
      year: '2011 – 2014',
      role: t('journey.milestones.edu-smk.role'),
      company: t('journey.milestones.edu-smk.company'),
      companyType: t('journey.milestones.edu-smk.companyType'),
      icon: GraduationCap,
      accentColor: 'from-purple-500/20 to-pink-600/20',
      cards: [
        {
          type: 'media',
          title: t('journey.milestones.edu-smk.card0.title'),
          imageSrc: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80',
          imageAlt: 'Early broadcasting days',
        },
        {
          type: 'info',
          role: t('journey.milestones.edu-smk.role'),
          company: t('journey.milestones.edu-smk.company'),
          title: t('journey.milestones.edu-smk.card1.title'),
          description: t('journey.milestones.edu-smk.card1.description'),
          achievements: [
            t('journey.milestones.edu-smk.card1.ach1'),
            t('journey.milestones.edu-smk.card1.ach2'),
            t('journey.milestones.edu-smk.card1.ach3')
          ],
        },
      ],
    },
    {
      id: 'starvision',
      year: '2015 – 2018',
      role: t('journey.milestones.starvision.role'),
      company: t('journey.milestones.starvision.company'),
      companyType: t('journey.milestones.starvision.companyType'),
      icon: Clapperboard,
      accentColor: 'from-amber-500/20 to-orange-600/20',
      cards: [
        {
          type: 'media',
          title: t('journey.milestones.starvision.card0.title'),
          images: [
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
            'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
            'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80',
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80',
            'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80',
            'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&q=80',
          ],
          imageAlt: 'Featured Film - Starvision Plus',
        },
        {
          type: 'info',
          role: t('journey.milestones.starvision.role'),
          company: t('journey.milestones.starvision.company'),
          title: t('journey.milestones.starvision.card1.title'),
          description: t('journey.milestones.starvision.card1.description'),
          achievements: [
            t('journey.milestones.starvision.card1.ach1'),
            t('journey.milestones.starvision.card1.ach2'),
            t('journey.milestones.starvision.card1.ach3')
          ],
        },
      ],
    },
    {
      id: 'freelance',
      year: '2019 – 2021',
      role: t('journey.milestones.freelance.role'),
      company: t('journey.milestones.freelance.company'),
      companyType: t('journey.milestones.freelance.companyType'),
      icon: Film,
      accentColor: 'from-blue-500/20 to-indigo-600/20',
      cards: [
        {
          type: 'media',
          imageSrc: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Desktop_-_1',
          imageAlt: 'Independent Film Direction',
          title: t('journey.milestones.freelance.card0.title'),
        },
        {
          type: 'info',
          role: t('journey.milestones.freelance.role'),
          company: t('journey.milestones.freelance.company'),
          title: t('journey.milestones.freelance.card1.title'),
          description: t('journey.milestones.freelance.card1.description'),
          achievements: [
            t('journey.milestones.freelance.ach1'),
            t('journey.milestones.freelance.ach2'),
            t('journey.milestones.freelance.ach3')
          ],
        },
      ],
    },
    {
      id: 'mataque',
      year: '2022 – Present',
      role: t('journey.milestones.mataque.role'),
      company: t('journey.milestones.mataque.company'),
      companyType: t('journey.milestones.mataque.companyType'),
      icon: Palette,
      accentColor: 'from-emerald-500/20 to-teal-600/20',
      cards: [
        {
          type: 'media',
          imageSrc: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Desktop_-_1',
          imageAlt: 'Mataque Studio Projects',
          title: t('journey.milestones.mataque.card0.title'),
        },
        {
          type: 'info',
          role: t('journey.milestones.mataque.role'),
          company: t('journey.milestones.mataque.company'),
          title: t('journey.milestones.mataque.card1.title'),
          description: t('journey.milestones.mataque.card1.description'),
          achievements: [
            t('journey.milestones.mataque.ach1'),
            t('journey.milestones.mataque.ach2'),
            t('journey.milestones.mataque.ach3')
          ],
        },
      ],
    },
  ], [t]);

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
        {isLargeScreen ? <DesktopTimeline isActive={isActive} milestones={MILESTONES} /> : <MobileTimeline isActive={isActive} milestones={MILESTONES} />}
      </div>
    </div>
  );
}
