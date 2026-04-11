'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface AboutSectionProps {
  isActive: boolean;
}

const ROLES = [
  'Creative Director',
  'Motion Designer',
  'VFX Artist',
  'Film Director',
];

export default function AboutSection({ isActive }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const roleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    if (isActive) {
      gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power2.out', overwrite: true });

      // Run entrance animations
      if (nameRef.current) {
        gsap.fromTo(nameRef.current, 
          { autoAlpha: 0, y: 60, scale: 0.9, filter: 'blur(10px)' }, 
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', overwrite: true }
        );
      }
      if (taglineRef.current) {
        gsap.fromTo(taglineRef.current, 
          { autoAlpha: 0, y: 20, filter: 'blur(0px)' }, 
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6, overwrite: true }
        );
      }
      
      const validRefs = roleRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (validRefs.length > 0) {
        gsap.fromTo(
          validRefs,
          { autoAlpha: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }, 
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
            overwrite: true,
          }
        );
        validRefs.forEach((el, i) => {
          // Fluid floating effect with ±8px range (Issue #32)
          gsap.to(el, {
            y: -8,
            duration: 2.5 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
            overwrite: 'auto',
          });
        });
      }
    } else {
      // Staggered exit animation resembling the Journey title style (Issue #32)
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          autoAlpha: 0,
          y: -40,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.35,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      if (taglineRef.current) {
        gsap.to(taglineRef.current, {
          autoAlpha: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
          overwrite: true,
          delay: 0.05,
        });
      }

      const validRefs = roleRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (validRefs.length > 0) {
        gsap.to(validRefs, {
          y: -15,
          autoAlpha: 0,
          scale: 0.95,
          filter: 'blur(4px)',
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      gsap.to(sectionRef.current, { 
        autoAlpha: 0, 
        duration: 0.5, 
        delay: 0.15, 
        ease: 'power2.in',
        overwrite: true 
      });
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 pointer-events-none select-none"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div
          ref={heroRef}
          className="absolute inset-0 flex flex-col items-center justify-center select-none"
        >
          {/* Tagline — small, above the name */}
          <div
            ref={taglineRef}
            className="font-tagline text-body font-w-tagline tracking-[0.4em] uppercase text-white/40 mb-4 sm:mb-6"
          >
            Herdanius Larobu.
          </div>

          {/* Name — massive display font */}
          <h1
            ref={nameRef}
            className="font-display font-w-display text-h1 leading-[0.95] tracking-wide text-white uppercase text-center"
            style={{
              textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.1)',
            }}
          >
            Capluk
          </h1>

          {/* Role titles — staggered, looping float animation */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-10 gap-x-2 md:gap-x-4 mt-3 sm:mt-8 px-4">
            {ROLES.map((role, i) => (
              <span
                key={role}
                ref={(el) => { roleRefs.current[i] = el; }}
                className="font-heading text-h5 font-h5 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 leading-relaxed sm:leading-normal whitespace-nowrap"
              >
                {role}
                {i < ROLES.length - 1 && (
                  <span className="text-white/20 ml-1.5 sm:ml-4 hidden sm:inline">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
