'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { GlassFilter, GlassEffect } from '@/components/ui/liquid-glass';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { useTheme } from 'next-themes';
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

export default function Home() {
  const bgRef = useRef<HTMLImageElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [activeSection, setActiveSection] = useState<string | null>('about');
  const [prevSectionIndex, setPrevSectionIndex] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Background and Card Logic ───
  useGSAP(() => {
    if (!bgWrapRef.current || !bgRef.current) return;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Always maintain rounded corner and slightly inset appearance for all sections
    gsap.to(bgWrapRef.current, {
      width: isMobile ? '97%' : isTablet ? '97%' : '97%',
      height: isMobile ? '97%' : isTablet ? '95%' : '92%',
      // Always maintain rounded corner and slightly inset appearance for all sections
      borderRadius: isMobile ? '40px' : isTablet ? '80px' : '150px', // Responsive corner radius hierarchy
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
  }, [activeSection, windowSize]);

  // ─── Vignette overlay ───
  useGSAP(() => {
    if (!vignetteRef.current) return;
    gsap.to(vignetteRef.current, {
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  }, []);

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

  // Navigation handler
  const navTo = useCallback(
    (index: number) => {
      if (index === -1) {
        // Logo click goes to about section
        const currentIndex = activeSection ? SECTIONS.findIndex((s) => s.id === activeSection) : null;
        setPrevSectionIndex(currentIndex);
        setActiveSection('about');
        return;
      }
      
      const newSectionId = SECTIONS[index].id;
      const currentIndex = activeSection
        ? SECTIONS.findIndex((s) => s.id === activeSection)
        : null;

      if (activeSection === newSectionId) {
        // Prevent toggling off active section per instructions (at least one active tab)
        return;
      } else {
        setPrevSectionIndex(currentIndex);
        setActiveSection(newSectionId);
      }
    },
    [activeSection]
  );

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-(--bg-premium) text-(--text-main) cursor-default transition-colors duration-700">
      <GlassFilter />

      <BackgroundLight mouseX={mousePos.x} mouseY={mousePos.y} />

      <div className="text-black opacity-[0.06]">
        <BackgroundText text={currentBgText} mouseX={mousePos.x} />
      </div>

      <div 
        ref={bgWrapRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 overflow-hidden bg-(--bg-premium) will-change-transform shadow-2xl transition-colors duration-700"
        style={{ width: '99%', height: '99%', borderRadius: '48px' }}
      >
        <div className="absolute inset-0 z-0">
          {mounted && (
            <img
              ref={bgRef}
              src={theme === 'cinematic' 
                ? "https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775753416/capluk-portfolio/Profile_BG_Wide_Dark.webp"
                : "https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775752765/capluk-portfolio/Profile_BG_Wide_White.jpg"
              }
              alt="Herdanius"
              className="w-full h-full object-cover opacity-90 main-bg-img saturate-150"
              style={{ 
                objectPosition: windowSize.width < 768 ? 'center 15%' : 'center 20%', 
                transformOrigin: 'center center' 
              }}
            />
          )}
          {/* Global Dark Radial Overlay for both themes */}
          <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_100%)] pointer-events-none transition-opacity duration-700" />
          
          {/* Light Center Glow Overlay */}
          <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,var(--center-glow)_0%,transparent_50%)] pointer-events-none transition-opacity duration-700" />
        </div>
        <div
          ref={vignetteRef}
          className="absolute inset-0 z-1 bg-radial-[circle_at_center] from-transparent to-(--bg-premium)/80 opacity-0 invisible"
        />

        <ThemeToggle isVisible={activeSection === 'about'} />


        {/* ═══════════════════════════════════════════════════════
            LAYOUT WRAPPER — flex-col, fixed at bottom
           ════════════════════════════════════════════════════════ */}
        <div className="fixed inset-x-0 top-0 bottom-4 sm:bottom-8 z-5 flex flex-col items-center pointer-events-none">

          {/* Content area */}
          <div className="relative flex-1 w-full">
            <div className="portfolio-section-active">
              <PortfolioSection isActive={activeSection === 'portfolio'} />
            </div>
            <AboutSection isActive={activeSection === 'about'} />
            <ExpertiseSection isActive={activeSection === 'expertise'} />
            <ConnectSection isActive={activeSection === 'connect'} />
            <div className="journey-section-active">
              <JourneySection isActive={activeSection === 'journey'} />
            </div>
          </div>

          {/* Navbar */}
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
                  <p className="font-body text-sm md:text-[14px] font-w-body text-text-muted leading-6 max-w-5xl mx-auto tracking-widest">
                      A curated portfolio of cinematic storytelling, visual effects, and motion graphics workflow, spanning feature films, television series, and digital platforms. Integrates traditional filmmaking craft with generative image/video processes and streamlined post-production pipelines. Emphasizes leadership in directing, visual effects supervision, and scalable creative production.
                  </p>
                </div>
              )}

              {/* ── EXPERTISE ── */}
              {activeSection === 'expertise' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-2 gap-2">
                  <p className="font-thick font-h5 text-md tracking-widest text-text-main">
                    Exploring new tech for visual.
                  </p>
                  <p className="font-body text-sm md:text-[14px] font-w-body text-text-muted leading-6 max-w-5xl mx-auto tracking-widest">
                    Focused on integrating AI into end-to-end production workflows to improve efficiency, while maintaining manual creative control to ensure best video quality. Experienced in AI-assisted visual concept development and building AI-supported creative pipelines. Continuously exploring emerging technologies and their applications to expand possibilities in visual production.
                  </p>
                </div>
              )}

              {/* ── ABOUT ── */}
              {activeSection === 'about' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-1 gap-2">
                  <p className="font-thick font-h5 text-md tracking-widest text-text-main">
                    Analog Roots. Digital Future.
                  </p>
                  <p className="font-body text-sm md:text-[14px] font-w-body text-text-muted leading-6 max-w-5xl mx-auto tracking-widest">
                    Filmmaker, motion designer, and visual storyteller with over two decades navigating the evolution of screen media. From 8-bit gaming and film reels to today&apos;s AI-driven workflow and immersive production pipelines. Translating traditional cinematic storytelling into modern digital formats, combining craft, technology, and creative strategy to produce visuals that resonate with contemporary audiences.
                  </p>
                </div>
              )}

              {/* ── JOURNEY ── */}
              {activeSection === 'journey' && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-2 md:px-12 py-0">
                   <p className="lg:hidden font-thick font-h1 text-h6 tracking-[0.2em] uppercase text-(--accent) mb-2 opacity-80">
                    Project Timeline
                  </p>
                  <div id="journey-desktop-portal" className="hidden lg:flex w-full items-center justify-center min-h-[100px] relative pointer-events-auto" />
                </div>
              )}

              {/* ── CONNECT ── */}
              {activeSection === 'connect' && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-12 py-2">
                  <div className="w-full max-w-4xl opacity-100">
                    <MarqueeGroup />
                  </div>
                </div>
              )}
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}
