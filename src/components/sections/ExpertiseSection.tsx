'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  title: string;
  items: string[];
  align: 'start' | 'end';
  desktopStyle: { top?: string; bottom?: string; left?: string; right?: string };
  tabletStyle?: { top?: string; bottom?: string; left?: string; right?: string };
}

const ALL_CATEGORIES: Category[] = [
  {
    id: 'multimedia',
    title: 'Multimedia Production',
    items: [
      'Visual Storytelling',
      'Creative Direction',
      'Video Editing & Post Production',
      'Cinematic Video Production',
      'Digital Content Development',
      'Post production pipeline',
      'Media Asset management',
    ],
    align: 'start',
    desktopStyle: { bottom: '5%', left: '5%' },
    tabletStyle: { bottom: '10%', left: '8%' }
  },
  {
    id: 'vfx-motion',
    title: 'Motion Graphics &\nVisual Effects',
    items: [
      'Motion graphics design',
      '2D/3D animation',
      'Compositing of live-action and CG elements',
      'Rotoscoping & camera tracking',
      'Particle system',
    ],
    align: 'end',
    desktopStyle: { top: '12%', right: '8%' },
    tabletStyle: { top: '15%', right: '10%' }
  },
  {
    id: 'ai-emerging',
    title: 'Emerging Tech & AI',
    items: [
      'AI-Assisted Visual Concepting',
      'Generative Video & Image Synthesis',
      'ComfyUI & Stable Diffusion Pipelines',
      'Real-time Virtual Production',
      'AI-Driven Workflow Automation',
    ],
    align: 'start',
    desktopStyle: { bottom: '10%', left: '0%' },
    tabletStyle: { bottom: '10%', left: '4%' }
  },
  {
    id: 'tools',
    title: 'Toolkits & Software',
    items: [
      'Adobe After Effect',
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Blender 3D',
      'Final Cut Pro',
      'Digital Camera Production',
    ],
    align: 'end',
    desktopStyle: { top: '15%', right: '12%' },
    tabletStyle: { top: '12%', right: '12%' }
  },
];


export default function ExpertiseSection({ isActive }: { isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrolling = useRef(false);
  const currentPage = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1200);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    if (isActive) {
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: 'auto',
        onComplete: () => ScrollTrigger.refresh()
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        blockRefs.current.forEach((block, i) => {
          if (!block || i >= ALL_CATEGORIES.length) return;
          const align = block.dataset.align;
          const startX = align === 'start' ? -40 : 40;
          const items = block.querySelectorAll('.expertise-item');

          ScrollTrigger.create({
            trigger: block,
            scroller: scrollContainerRef.current,
            horizontal: true,
            start: 'left 95%',
            onEnter: () => {
              gsap.fromTo(block, { x: startX, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' });
              gsap.fromTo(items, { x: startX === -40 ? -15 : 15, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.04, duration: 0.4, delay: 0.1, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              gsap.to(block, { x: startX, autoAlpha: 0, duration: 0.3 });
            }
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        blockRefs.current.forEach((block) => {
          if (!block) return;
          const items = block.querySelectorAll('.expertise-item');

          ScrollTrigger.create({
            trigger: block,
            scroller: scrollContainerRef.current,
            horizontal: true,
            start: 'left 85%',
            onEnter: () => {
              gsap.fromTo(block, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' });
              gsap.fromTo(items, { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4, delay: 0.1, ease: 'power2.out' });
            },
            onLeaveBack: () => gsap.to(block, { y: 30, autoAlpha: 0, duration: 0.3 })
          });
        });
      });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.in', pointerEvents: 'none' });
      setTimeout(() => { 
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0;
          currentPage.current = 0;
          setActivePage(0);
        }
      }, 400);
    }

    return () => { ScrollTrigger.getAll().forEach(st => { if (st.scroller === scrollContainerRef.current) st.kill(); }); };
  }, [isActive]);

  const scrollToPageIndex = (index: number) => {
    const scroller = scrollContainerRef.current;
    if (!scroller || isScrolling.current) return;

    isScrolling.current = true;
    currentPage.current = index;
    setActivePage(index);
    
    // Use clientWidth for accurate viewport-relative placement
    const targetLeft = index * scroller.clientWidth;
    
    gsap.to(scroller, {
      scrollLeft: targetLeft,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // Reinforced lock to prevent skipped pages
        setTimeout(() => { isScrolling.current = false; }, 400);
      }
    });
  };

  const scrollToPage = (dir: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const maxPages = isMobile ? ALL_CATEGORIES.length : 2;
    const nextIndex = Math.max(0, Math.min(currentPage.current + dir, maxPages - 1));
    
    if (nextIndex !== currentPage.current) {
      scrollToPageIndex(nextIndex);
    }
  };

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller || !isActive) return;

    let touchStartY = 0;
    let touchStartX = 0;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 20) {
        scrollToPage(delta > 0 ? 1 : -1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isActive && e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - endY;
      const deltaX = touchStartX - endX;
      
      if (Math.abs(deltaX) > 40 || Math.abs(deltaY) > 40) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY) 
          ? (deltaX > 0 ? 1 : -1) 
          : (deltaY > 0 ? 1 : -1);
        
        scrollToPage(direction);
      }
    };

    const handleResize = () => {
      if (scroller) {
        scroller.scrollLeft = currentPage.current * scroller.clientWidth;
      }
    };

    scroller.addEventListener('wheel', handleWheel, { passive: false });
    scroller.addEventListener('touchstart', handleTouchStart, { passive: true });
    scroller.addEventListener('touchmove', handleTouchMove, { passive: false });
    scroller.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      scroller.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('touchmove', handleTouchMove);
      scroller.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none select-none invisible opacity-0 bg-transparent overflow-hidden">
      <div 
        ref={scrollContainerRef} 
        className="h-full w-full flex flex-row overflow-hidden hide-scrollbar pointer-events-auto items-center"
      >
        
        {/* DESKTOP VIEW */}
        <div className="hidden md:flex flex-row h-full">
           {/* PAGE 1 */}
           <div className="shrink-0 w-screen h-full flex items-center justify-center">
             <div className="max-w-7xl max-h-[800px] mx-auto w-full h-full relative">
               {ALL_CATEGORIES.slice(0, 2).map((cat, i) => (
                  <div key={cat.id} ref={el => { blockRefs.current[i] = el; }} data-align={cat.align} className={`absolute flex flex-col group opacity-0 ${cat.align === 'start' ? 'items-start text-left' : 'items-end text-right'}`} style={isTablet && cat.tabletStyle ? cat.tabletStyle : cat.desktopStyle}>
                    <div className={`relative mb-4 flex flex-col ${cat.align === 'start' ? 'items-start' : 'items-end'}`}>
                      <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-accent transition-colors duration-300 whitespace-pre-line">{cat.title}</h3>
                      <div className={`h-[2px] ${cat.align === 'start' ? 'bg-linear-to-r' : 'bg-linear-to-l'} from-accent/80 to-transparent w-48 group-hover:w-full transition-all duration-500 ease-in-out`} />
                    </div>
                    <ul className="flex flex-col space-y-2">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className={`expertise-item font-body text-body text-white/60 hover:text-white transition-all duration-300 flex items-center gap-3 group/item ${cat.align === 'end' ? 'justify-end' : 'justify-start'}`}>
                          {cat.align === 'start' && <span className="w-2 h-2 rounded-full bg-accent/30 group-hover/item:bg-accent shrink-0" />}
                          <span>{item}</span>
                          {cat.align === 'end' && <span className="w-2 h-2 rounded-full bg-accent/30 group-hover/item:bg-accent shrink-0" />}
                        </li>
                      ))}
                    </ul>
                  </div>
               ))}
             </div>
           </div>

           {/* PAGE 2 */}
           <div className="shrink-0 w-screen h-full flex items-center justify-center">
             <div className="max-w-7xl max-h-[800px] mx-auto w-full h-full relative">
               {ALL_CATEGORIES.slice(2).map((cat, i) => (
                  <div key={cat.id} ref={el => { blockRefs.current[i+2] = el; }} data-align={cat.align} className={`absolute flex flex-col group opacity-0 ${cat.align === 'start' ? 'items-start text-left' : 'items-end text-right'}`} style={isTablet && cat.tabletStyle ? cat.tabletStyle : cat.desktopStyle}>
                    <div className={`relative mb-2 flex flex-col ${cat.align === 'start' ? 'items-start' : 'items-end'}`}>
                      <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-accent transition-colors duration-500 whitespace-pre-line">{cat.title}</h3>
                      <div className={`h-[2px] ${cat.align === 'start' ? 'bg-linear-to-r' : 'bg-linear-to-l'} from-accent/80 to-transparent w-48 group-hover:w-full transition-all duration-700 ease-in-out`} />
                    </div>
                    <ul className="flex flex-col space-y-2">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className={`expertise-item font-body text-body text-white/60 hover:text-white transition-all duration-300 flex items-center gap-3 group/item leading-tight ${cat.align === 'end' ? 'justify-end' : 'justify-start'}`}>
                          {cat.align === 'start' && <span className="w-2 h-2 rounded-full bg-accent/30 group-hover/item:bg-accent shrink-0" />}
                          <span>{item}</span>
                          {cat.align === 'end' && <span className="w-2 h-2 rounded-full bg-accent/30 group-hover/item:bg-accent shrink-0" />}
                        </li>
                      ))}
                    </ul>
                  </div>
               ))}
             </div>
           </div>
        </div>


        {/* MOBILE VIEW — pages directly in scroll container for pixel-perfect scroll alignment */}
        {ALL_CATEGORIES.map((cat, i) => (
          <div key={`mobile-${cat.id}`} className="shrink-0 w-full h-full md:hidden relative flex flex-col items-center justify-center px-3">
            <div ref={el => { blockRefs.current[i+4] = el; }} className="flex flex-col items-center text-center opacity-0 group">
              <div className="relative mb-6 flex flex-col items-center">
                <h3 className="font-display font-bold text-h4 text-white uppercase tracking-wider mb-2 group-hover:text-accent transition-colors duration-500 whitespace-pre-line">{cat.title}</h3>
                <div className="h-[2px] bg-linear-to-r from-transparent via-accent to-transparent w-48 group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>
              <ul className="flex flex-col space-y-3">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="expertise-item font-body text-body text-white/70 hover:text-white transition-colors duration-300 px-4 leading-tight">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* SCROLL DOTS INDICATOR (Both Desktop & Mobile) */}
      <div className="absolute bottom-6 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 pointer-events-auto">
        {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? ALL_CATEGORIES.length : 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPageIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activePage === i 
                ? 'bg-accent w-4 shadow-[0_0_12px_rgba(255,214,153,0.5)]' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
