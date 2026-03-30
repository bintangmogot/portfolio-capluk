'use client';

import { useRef, useState, useEffect } from 'react';
import { GlassEffect, GlassFilter } from '@/components/ui/liquid-glass';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import CollabBadge from '@/components/layout/CollabBadge';
import BackgroundText from '@/components/layout/BackgroundText';
import BackgroundLight from '@/components/layout/BackgroundLight';

// Static Data
const SECTIONS = [
  { id: 'hero', bgText: 'CAPLUK.' },
  { id: 'about', bgText: 'ABOUT.' },
  { id: 'portfolio', bgText: 'WORK.' },
];

const SOCIAL_ICONS = [
  { src: 'https://img.icons8.com/ios-filled/100/ffffff/instagram-new.png', alt: 'Instagram', href: '#' },
  { src: 'https://img.icons8.com/ios-filled/100/ffffff/vimeo.png', alt: 'Vimeo', href: '#' },
  { src: 'https://img.icons8.com/ios-filled/100/ffffff/behance.png', alt: 'Behance', href: '#' },
  { src: 'https://img.icons8.com/ios-filled/100/ffffff/linkedin.png', alt: 'LinkedIn', href: '#' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });



  // Smooth mouse tracking for ambient light/cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth non-blocking updates
      requestAnimationFrame(() => {
        setMousePos({
          x: e.clientX,
          y: e.clientY
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentBgText = SECTIONS.find((s) => s.id === activeSection)?.bgText || 'CAPLUK.';

  const navTo = (index: number) => {
    const newSectionId = SECTIONS[index].id;
    setActiveSection(newSectionId);
    // GSAP animations will trigger based on activeSection changes
  };

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-[#0a0a0b] text-white">
      {/* 
        This single filter definition is required for the GlassEffect to work 
        We use the exact filter requested by user, tuned to scale 20.
      */}
      <GlassFilter />

      {/* Ambient Mouse Light */}
      <BackgroundLight mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Massive Background Text moving behind glass */}
      <BackgroundText text={currentBgText} mouseX={mousePos.x} />

      {/* FIXED UI: Theme/Collab */}
      <ThemeToggle />
      <CollabBadge />

      {/* FIXED UI: Navigation Dock */}
      <Navbar sections={SECTIONS} activeSection={activeSection} onNavigate={navTo} />

      {/* BACKGROUND IMAGE - Fixed & Dynamic via GSAP */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop"
          alt="Herdanius"
          className="w-full h-full object-cover opacity-80"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent to-[#0a0a0b]/80" />
      </div>

      {/* Main Container */}
      <main 
        ref={containerRef}
        className="relative z-10 w-full h-full"
      >
        {/* Sections will be mounted here dynamically inside their respective GSAP views */}
      </main>
    </div>
  );
}
