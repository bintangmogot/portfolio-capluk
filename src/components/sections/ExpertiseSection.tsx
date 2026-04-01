'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface ExpertiseSectionProps {
  isActive: boolean;
}

type Category = {
  id: string;
  title: string;
  items: string[];
  desktopPosition: string;
  mobileAlign: 'left' | 'right';
};

const CATEGORIES: Category[] = [
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
    desktopPosition: 'lg:absolute lg:top-[12%] lg:left-[8%] xl:left-[12%] lg:text-left',
    mobileAlign: 'left',
  },
  {
    id: 'tools',
    title: 'Technical Tools',
    items: [
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Blender 3D',
      'Final Cut Pro',
      'Digital Camera Production',
    ],
    desktopPosition: 'lg:absolute lg:top-[38%] lg:right-[8%] xl:right-[12%] lg:text-right',
    mobileAlign: 'right',
  },
  {
    id: 'motion',
    title: 'Motion Graphics & Visual Effects',
    items: [
      'Motion graphics design',
      '2D/3D animation',
      'Compositing of live-action and CG elements',
      'Rotoscoping & camera tracking',
      'Particle system',
    ],
    desktopPosition: 'lg:absolute lg:top-[48%] lg:left-[12%] xl:left-[16%] lg:text-left',
    mobileAlign: 'left',
  },
];

export default function ExpertiseSection({ isActive }: ExpertiseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (isActive) {
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.45,
        ease: 'power2.out',
      });

      blockRefs.current.forEach((block, i) => {
        if (!block) return;
        const dir = i % 2 === 0 ? -32 : 32;

        gsap.fromTo(
          block,
          { x: dir, y: 14, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: 0.12 + i * 0.1,
            ease: 'power3.out',
          }
        );

        const items = block.querySelectorAll('.expertise-item');
        gsap.fromTo(
          items,
          { y: 8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.04,
            duration: 0.55,
            delay: 0.26 + i * 0.1,
            ease: 'power2.out',
          }
        );
      });

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
        );
      }

      return;
    }

    gsap.to(containerRef.current, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
  }, [isActive]);

  return (
    <section
      ref={containerRef}
      className="absolute inset-0 z-10 overflow-y-auto px-4 pt-12 pb-4 sm:px-10 sm:pt-16 lg:px-0 pointer-events-none select-none opacity-0 invisible hide-scrollbar"
    >
      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col gap-8 lg:pb-8">
        {CATEGORIES.map((cat, i) => {
          const isRight = cat.mobileAlign === 'right';

          return (
            <div
              key={cat.id}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className={`group flex max-w-[680px] flex-col opacity-0 ${
                isRight ? 'ml-auto items-end text-right' : 'mr-auto items-start text-left'
              } ${cat.desktopPosition}`}
            >
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide leading-none">
                {cat.title}
              </h3>
              <div
                className={`mt-2 h-px w-24 bg-linear-to-r transition-all duration-500 group-hover:w-full ${
                  isRight ? 'from-transparent to-amber-400/80' : 'from-amber-400/80 to-transparent'
                }`}
              />

              <ul className="mt-2 space-y-0.5 sm:space-y-1">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="expertise-item font-body text-[clamp(1.1rem,1.4vw,2.7rem)] leading-tight text-white/84 transition-colors duration-300 group-hover:text-white"
                    style={{ textShadow: '0 2px 18px rgba(0,0,0,0.35)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div
          ref={footerRef}
          className="mt-auto w-full rounded-3xl border border-white/18 bg-black/20 px-6 py-6 backdrop-blur-md sm:px-10 pointer-events-auto"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
            <div className="h-px w-14 bg-white/35" />
            <p className="font-thick text-xl uppercase tracking-wider text-white sm:text-3xl">Exploring new tech for visual.</p>
            <p className="font-body text-sm leading-relaxed text-white/70 sm:text-[1.05rem]">
              Focused on integrating AI into end-to-end production workflows to improve efficiency, while maintaining
              manual creative control to ensure best video quality. Experienced in AI-assisted visual concept
              development and building AI-supported creative pipelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
