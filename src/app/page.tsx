'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { GlassFilter, GlassEffect } from '@/components/ui/liquid-glass';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
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

  const [activeSection, setActiveSection] = useState<string | null>('about');
  const [prevSectionIndex, setPrevSectionIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ─── Background and Card Logic ───
  useGSAP(() => {
    if (!bgWrapRef.current || !bgRef.current) return;
    const isMobile = window.innerWidth < 768;
    
    // Always maintain rounded corner and slightly inset appearance for all sections
    gsap.to(bgWrapRef.current, {
      width: '99%',
      height: '99%',
      x: 7,
      y: 5,
      // Always maintain rounded corner and slightly inset appearance for all sections
      borderRadius: isMobile ? '24px' : '100px', // Using soft, consistent radius
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
  }, [activeSection]);

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
        className="absolute top-0 left-0 z-0 overflow-hidden bg-(--bg-premium) will-change-transform shadow-2xl transition-colors duration-700"
        style={{ width: '99%', height: '99%', transform: 'translate(7px, 5px)', borderRadius: '48px' }}
      >
        <div className="absolute inset-0 z-0">
          <img
            ref={bgRef}
            src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Desktop_-_1"
            alt="Herdanius"
            className="w-full h-full object-cover opacity-90"
            style={{ objectPosition: 'center 20%', transformOrigin: 'center center' }}
          />
          {/* Global Dark Radial Overlay for both themes */}
          <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none transition-opacity duration-700" />
        </div>
        <div
          ref={vignetteRef}
          className="absolute inset-0 z-1 bg-radial-[circle_at_center] from-transparent to-(--bg-premium)/80 opacity-0 invisible"
        />

        <ThemeToggle isVisible={true} />


        {/* ═══════════════════════════════════════════════════════
            LAYOUT WRAPPER — flex-col, fixed at bottom
           ════════════════════════════════════════════════════════ */}
        <div className="fixed inset-x-0 top-0 bottom-4 sm:bottom-8 z-5 flex flex-col items-center pointer-events-none">

          {/* Content area */}
          <div className="relative flex-1 w-full">
            <PortfolioSection isActive={activeSection === 'portfolio'} />
            <AboutSection isActive={activeSection === 'about'} />
            <ExpertiseSection isActive={activeSection === 'expertise'} />
            <ConnectSection isActive={activeSection === 'connect'} />
            <JourneySection isActive={activeSection === 'journey'} />
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
                  <h2 className="font-display text-h4 font-h1 text-white tracking-wide uppercase mb-3">WORK.</h2>
                  <p className="font-body text-sm md:text-[15px] font-w-body text-white/80 leading-relaxed max-w-4xl mx-auto">
                    A curated portfolio of cinematic storytelling, visual effects, and motion graphics workflow, spanning feature films, television series, and digital platforms. Integrates traditional filmmaking craft with generative image/video processes and streamlined post-production pipelines. Emphasizes leadership in directing, visual effects supervision, and scalable creative production.
                  </p>
                </div>
              )}

              {/* ── EXPERTISE ── */}
              {activeSection === 'expertise' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-2">
                  <h2 className="font-display text-h4 font-h1 text-white tracking-wide uppercase mb-3">SKILLS.</h2>
                  <p className="font-body text-sm md:text-[15px] font-w-body text-white/80 leading-relaxed max-w-4xl mx-auto">
                    Proficient in After Effects, Cinema 4D, Unreal Engine, and Nuke. Specializing in title design animation,
                    social media ads, and intricate visual FX that emphasize leadership in directing and scalable creative production.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-6">
                    {['After Effects', 'Cinema 4D', 'Nuke', 'Unreal Engine', 'DaVinci Resolve', 'Premiere Pro'].map((tool) => (
                      <GlassEffect
                        key={tool}
                        className="
                          rounded-full px-4 py-2
                          font-body text-white/60 text-[11px] tracking-wider
                          transition-colors hover:bg-(--accent)/10 hover:text-white/90
                          cursor-default border border-(--accent)/30
                        "
                        style={{ padding: '0.5rem 1rem' }}
                      >
                        {tool}
                      </GlassEffect>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ABOUT ── */}
              {activeSection === 'about' && (
                <div className="w-full flex flex-col text-center px-2 md:px-12 py-1 gap-2">
                  <p className="font-thick font-h1 text-h5 tracking-[0.35em] uppercase text-white mb-0.5">
                    Analog Roots. Digital Future.
                  </p>
                  <p className="font-body text-sm md:text-[14px] font-w-body text-white/80 leading-relaxed max-w-4xl mx-auto">
                    Filmmaker, motion designer, and visual storyteller with over two decades navigating the evolution
                    of screen media. From 8-bit gaming and film reels to today&apos;s AI-driven workflow and immersive
                    production pipelines.
                  </p>
                  <p className="font-body text-xs md:text-[13px] font-w-tagline text-white/50 leading-relaxed max-w-4xl mx-auto">
                    Translating traditional cinematic storytelling into modern digital formats, combining craft,
                    technology, and creative strategy to produce visuals that resonate with contemporary audiences.
                  </p>
                </div>
              )}

              {/* ── JOURNEY ── */}
              {activeSection === 'journey' && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-2 md:px-12">
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
