'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use a ref for mouse position to avoid re-renders while still allowing GSAP to read it
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      // Direct update for the dot (no delay)
      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('mouseenter', handleMouseEnterWindow);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => (el as HTMLElement).style.cursor = 'none');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  useGSAP(() => {
    if (!followerRef.current) return;

    // Follower smooth movement
    const moveFollower = () => {
      gsap.to(followerRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    gsap.ticker.add(moveFollower);
    return () => gsap.ticker.remove(moveFollower);
  });

  // Reactions to state changes
  useGSAP(() => {
    if (!followerRef.current || !dotRef.current) return;

    // Hover state
    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 1.5,
        backgroundColor: 'rgba(255, 214, 153, 0.1)',
        borderColor: '#FFD699',
        borderWidth: '1px',
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 0.5,
        backgroundColor: '#FFD699',
        duration: 0.3,
      });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 214, 153, 0.4)',
        borderWidth: '1px',
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: '#FFD699',
        duration: 0.3,
      });
    }

    // Click state
    if (isClicking) {
      gsap.to([followerRef.current, dotRef.current], {
        scale: 0.8,
        duration: 0.1,
      });
    }
  }, [isHovering, isClicking]);

  if (typeof window === 'undefined') return null;

  return (
    <div 
      className="fixed inset-0 z-99999 pointer-events-none mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      {/* Outer Follower Ring */}
      <div 
        ref={followerRef}
        className="absolute top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#FFD699]/40 flex items-center justify-center"
      >
        {/* Kinetic Brackets (Motion Graphic Vibe) */}
        <div className={`absolute inset-0 transition-transform duration-500 ${isHovering ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
           <div className="absolute top-0 left-1/2 -ml-[0.5px] w-px h-1 bg-[#FFD699]/30" />
           <div className="absolute bottom-0 left-1/2 -ml-[0.5px] w-px h-1 bg-[#FFD699]/30" />
           <div className="absolute left-0 top-1/2 -mt-[0.5px] h-px w-1 bg-[#FFD699]/30" />
           <div className="absolute right-0 top-1/2 -mt-[0.5px] h-px w-1 bg-[#FFD699]/30" />
        </div>
      </div>

      {/* Central Dot */}
      <div 
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#FFD699] shadow-[0_0_10px_rgba(255,214,153,0.5)]"
      />
    </div>
  );
}
