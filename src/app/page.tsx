'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { GlassFilter } from '@/components/ui/liquid-glass';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import CollabBadge from '@/components/layout/CollabBadge';
import BackgroundText from '@/components/layout/BackgroundText';
import BackgroundLight from '@/components/layout/BackgroundLight';
import AboutSection from '@/components/sections/AboutSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import ConnectSection from '@/components/sections/ConnectSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import JourneySection from '@/components/sections/JourneySection';
import MarqueeGroup from '@/components/ui/Marquee';


import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// Static Data
const SECTIONS = [
  { id: 'portfolio', bgText: 'WORK.' },
  { id: 'expertise', bgText: 'SKILLS.' },
  { id: 'about', bgText: 'ABOUT.' },
  { id: 'journey', bgText: 'STORY.' },
  { id: 'connect', bgText: 'HELLO.' },
];

const ROLES = [
  'Creative Director',
  'Motion Designer',
  'VFX Artist',
  'Film Director',
];


export default function Home() {
  const bgRef = useRef<HTMLImageElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const roleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [prevSectionIndex, setPrevSectionIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ─── Looping Role Animation ───
  useGSAP(() => {
    if (!heroRef.current) return;

    // Animate each role text with a staggered infinite loop
    const validRefs = roleRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (validRefs.length === 0) return;

    // Initial stagger entrance
    gsap.fromTo(
      validRefs,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    // Infinite subtle float on each role
    validRefs.forEach((el, i) => {
      gsap.to(el, {
        y: -4,
        duration: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }, []);

  // ─── Name entrance ───
  useGSAP(() => {
    if (!nameRef.current) return;
    gsap.fromTo(
      nameRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  // ─── Tagline entrance ───
  useGSAP(() => {
    if (!taglineRef.current) return;
    gsap.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
    );
  }, []);

  // ─── Background parallax and Card Scale ───
  useGSAP(() => {
    if (!bgWrapRef.current || !bgRef.current) return;
    const isMobile = window.innerWidth < 768;
    
    // Significantly more padding for further zoom out
    const paddingX = isMobile ? 12 : 20; 
    const paddingY = isMobile ? 12 : 20;
    
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    if (activeSection === null) {
      // Full screen state
      gsap.to(bgWrapRef.current, {
        width: '99%',
        height: '99%',
        x: 7,
        y: 5,
        borderRadius: isMobile ? '20px' : '100px',
        duration: 1,
        ease: 'power3.inOut',
      });
      gsap.to(bgRef.current, {
        scale: 1.05, // Slight bleed by default
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.inOut',
      });
    } else {
      // fullscreen background
      gsap.to(bgWrapRef.current, {
        width: '100%',
        height: '100%',
        x: 0,
        y: 0,
        borderRadius: '0',
        duration: 1,
        ease: 'power3.inOut',
      });
      gsap.to(bgRef.current, {
        scale: 1.05,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  }, [activeSection]);

  // ─── Hero fade when dock expands ───
  useGSAP(() => {
    if (!heroRef.current) return;
    if (activeSection === null) {
      gsap.to(heroRef.current, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(heroRef.current, { autoAlpha: 0, y: -30, duration: 0.5, ease: 'power2.in' });
    }
  }, [activeSection]);

  // ─── Vignette overlay ───
  useGSAP(() => {
    if (!vignetteRef.current) return;
    gsap.to(vignetteRef.current, {
      autoAlpha: activeSection !== null ? 1 : 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  }, [activeSection]);

  // ─── Mouse tracking ───
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background text
  const currentBgText = SECTIONS.find((s) => s.id === activeSection)?.bgText || 'CAPLUK.';

  // Navigation handler — tracks previous index for slide direction
  const navTo = useCallback(
    (index: number) => {
      if (index === -1) {
        setPrevSectionIndex(null);
        setActiveSection(null);
        return;
      }
      const newSectionId = SECTIONS[index].id;
      const currentIndex = activeSection
        ? SECTIONS.findIndex((s) => s.id === activeSection)
        : null;

      if (activeSection === newSectionId) {
        // Toggle off
        setPrevSectionIndex(null);
        setActiveSection(null);
      } else {
        setPrevSectionIndex(currentIndex);
        setActiveSection(newSectionId);
      }
    },
    [activeSection]
  );

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-white text-[#0a0a0b] cursor-default">
      <GlassFilter />

      {/* Ambient Mouse Light (Hidden because it's a white bg now, but left intact for architecture) */}
      <BackgroundLight mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Massive Background Text (Black with low opacity) */}
      <div className="text-black opacity-[0.06]">
        <BackgroundText text={currentBgText} mouseX={mousePos.x} />
      </div>

      {/* Fixed UI */}
      {/* Moved inside bgWrapRef to maintain contrast and layout when zoomed out */}
      
      {/* Background Image Card — Transforms into a rounded card during navigation */}
      <div 
        ref={bgWrapRef}
        className="absolute top-0 left-0 z-0 overflow-hidden bg-[#0a0a0b] will-change-transform shadow-2xl"
        style={{ width: '100%', height: '100%', borderRadius: '0px' }}
      >
        <div className="absolute inset-0">
          <img
            ref={bgRef}
            src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Desktop_-_1"
            alt="Herdanius"
            className="w-full h-full object-cover opacity-90"
            style={{ objectPosition: 'center 20%', transformOrigin: 'center center' }}
          />
        </div>
        <div
          ref={vignetteRef}
          className="absolute inset-0 z-1 bg-radial-[circle_at_center] from-transparent to-[#0a0a0b]/80 opacity-0 invisible"
        />

        <ThemeToggle isVisible={activeSection === null} />
        <CollabBadge isVisible={activeSection === null} />


        {/* ═══════════════════════════════════════════════════════
            LAYOUT WRAPPER — flex-col, fixed at bottom
            [ content-area (flex-1) ] fills height above dock
            [ Navbar (shrink-0) ] sits at bottom
           ════════════════════════════════════════════════════════ */}
        <div className="fixed inset-x-0 top-0 bottom-4 sm:bottom-8 z-5 flex flex-col items-center pointer-events-none">

          {/* Content area: fills all vertical space above the navbar */}
          <div className="relative flex-1 w-full">
            <PortfolioSection isActive={activeSection === 'portfolio'} />
            <AboutSection isActive={activeSection === 'about'} />
            <ExpertiseSection isActive={activeSection === 'expertise'} />
            <ConnectSection isActive={activeSection === 'connect'} />
            <JourneySection isActive={activeSection === 'journey'} />
          </div>

          {/* Navbar: sits at the bottom of the flex container */}
          <div className="w-full flex justify-center pointer-events-auto shrink-0">
            <Navbar
              sections={SECTIONS}
              activeSection={activeSection}
              prevSectionIndex={prevSectionIndex}
              onNavigate={navTo}
            >
              {/* ── PORTFOLIO ── */}
              {activeSection === 'portfolio' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-2">
                  <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase mb-3">WORK.</h2>
                  <p className="font-body text-sm md:text-[15px] text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
                    A curated portfolio of cinematic storytelling, visual effects, and motion graphics workflow, spanning feature films, television series, and digital platforms. Integrates traditional filmmaking craft with generative image/video processes and streamlined post-production pipelines. Emphasizes leadership in directing, visual effects supervision, and scalable creative production.
                  </p>
                </div>
              )}

              {/* ── EXPERTISE ── */}
              {activeSection === 'expertise' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-2">
                  <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase mb-3">SKILLS.</h2>
                  <p className="font-body text-sm md:text-[15px] text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
                    Proficient in After Effects, Cinema 4D, Unreal Engine, and Nuke. Specializing in title design animation,
                    social media ads, and intricate visual FX that emphasize leadership in directing and scalable creative production.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-6">
                    {['After Effects', 'Cinema 4D', 'Nuke', 'Unreal Engine', 'DaVinci Resolve', 'Premiere Pro'].map((tool) => (
                      <span
                        key={tool}
                        className="
                          backdrop-blur-sm bg-white/5 border border-white/10
                          rounded-full px-4 py-2
                          font-body text-white/60 text-[11px] tracking-wider
                          transition-colors hover:bg-white/10 hover:text-white/90
                          cursor-default
                        "
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ABOUT — bio text only; overlays live in content-area above ── */}
              {activeSection === 'about' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-1 gap-2">
                  <p className="font-thick text-bold text-[12px] sm:text-lg tracking-[0.35em] uppercase text-white mb-0.5">
                    Analog Roots. Digital Future.
                  </p>
                  <p className="font-body text-sm md:text-[14px] text-white/80 leading-relaxed max-w-3xl mx-auto font-light">
                    Filmmaker, motion designer, and visual storyteller with over two decades navigating the evolution
                    of screen media. From 8-bit gaming and film reels to today&apos;s AI-driven workflow and immersive
                    production pipelines.
                  </p>
                  <p className="font-body text-xs md:text-[13px] text-white/50 leading-relaxed max-w-3xl mx-auto font-light">
                    Translating traditional cinematic storytelling into modern digital formats, combining craft,
                    technology, and creative strategy to produce visuals that resonate with contemporary audiences.
                  </p>
                </div>
              )}

              {/* ── JOURNEY ── */}
              {activeSection === 'journey' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 lg:py-2">
                  <div className="lg:hidden flex flex-col">
                    {/* <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase mb-3">STORY.</h2>
                    <p className="font-body text-sm md:text-[15px] text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
                      From humble beginnings in indie projects to leading visual effects supervision for major
                      blockbusters. This is the story of passion, grit, and relentless innovation in motion graphics.
                    </p> */}
                  </div>
                  
                  {/* Desktop Portal Target */}
                  <div 
                    id="journey-desktop-portal" 
                    className="hidden lg:flex w-full items-center justify-center min-h-[80px] relative pointer-events-auto"
                  />
                </div>
              )}

              {/* ── CONNECT ── */}
              {activeSection === 'connect' && (
                <div className="w-full flex flex-col items-center text-center px-4 sm:px-12 py-3 gap-6">
                  <div className="w-full max-w-4xl opacity-100">
                    <MarqueeGroup />
                  </div>
                </div>
              )}
            </Navbar>
          </div>
        </div>
        {/* ═══════════════════════════════════════════════
            HERO SECTION — Kinetic Typography
           ═══════════════════════════════════════════════ */}
        <main className="relative z-10 w-full h-full pointer-events-none">
          <div
            ref={heroRef}
            className="absolute inset-0 flex flex-col items-center justify-center select-none"
          >
            {/* Tagline — small, above the name */}
            <div
              ref={taglineRef}
              className="font-tagline text-xs sm:text-sm lg:text-lg tracking-[0.4em] uppercase text-white/40 mb-4 sm:mb-6"
            >
              Herdanius Larobu.
            </div>

            {/* Name — massive display font */}
            <h1
              ref={nameRef}
              className="font-display text-[18vw] sm:text-[14vw] md:text-[12vw] leading-[0.95] tracking-wide text-white uppercase"
              style={{
                textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.1)',
              }}
            >
              Capluk
            </h1>

            {/* Role titles — staggered, looping float animation */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-10 gap-x-2 md:gap-x-4 mt-3 sm:mt-8">
              {ROLES.map((role, i) => (
                <span
                  key={role}
                  ref={(el) => { roleRefs.current[i] = el; }}
                  className="font-heading text-lg sm:text-lg md:text-xl lg:text-2xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 leading-relaxed sm:leading-normal"
                >
                  {role}
                  {i < ROLES.length - 1 && (
                    <span className="text-white/20 ml-1.5 sm:ml-4 hidden sm:inline">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
