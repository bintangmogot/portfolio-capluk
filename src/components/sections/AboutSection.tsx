'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Film, Tv, Palette } from 'lucide-react';
import { GlassEffect } from '@/components/ui/liquid-glass';

interface AboutSectionProps {
  isActive: boolean;
}

const STATS = [
  { value: '25+', label: 'Years' },
  { value: '80+', label: 'Films' },
  { value: '15',  label: 'Countries' },
];

const ROLES = [
  { text: 'Creative Director', side: 'left',  align: 'start', offset: '0%' },
  { text: 'Motion Designer',   side: 'left',  align: 'start', offset: '50%' },
  { text: 'VFX Artist',        side: 'right', align: 'end',   offset: '0%' },
  { text: 'Video Production',  side: 'right', align: 'end',   offset: '20%', sub: 'Specialist' },
];

export default function AboutSection({ isActive }: AboutSectionProps) {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const leftColRef   = useRef<HTMLDivElement>(null);
  const rightColRef  = useRef<HTMLDivElement>(null);
  const mobileRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (isActive) {
      gsap.set(sectionRef.current, { autoAlpha: 1 });

      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current, 
          { x: -40, autoAlpha: 0 }, 
          { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current, 
          { x: 40, autoAlpha: 0 }, 
          { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 }
        );
      }

      if (mobileRef.current) {
        gsap.fromTo(mobileRef.current, 
          { y: 20, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );
      }
    } else {
      gsap.to(sectionRef.current, { autoAlpha: 0, duration: 0.28, ease: 'power2.in' });
    }
  }, [isActive]);


  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 pointer-events-none select-none"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      {/* ══════════════════════════════════════════
          MOBILE / TABLET LAYOUT (< lg)
          ══════════════════════════════════════════ */}
      <div 
        ref={mobileRef}
        className="lg:hidden absolute inset-0 flex flex-col px-4 sm:px-8 pt-10 pb-4 gap-10 overflow-y-auto hide-scrollbar pointer-events-auto"
      >
        {/* Profile + Stats Row */}
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <GlassEffect className="flex flex-row justify-start p-3 w-full rounded-2xl border-[#FFD699]/30">
            <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 mb-2 mr-4 bg-black/30">
              <img 
                src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Frame_1" 
                alt="Profile" 
                className="w-full h-full object-cover"
                style={{ objectPosition: '48% 6%' }} 
              />
            </div>
            <div className="text-start sm:text-center">
              <p className="font-thick text-white text-md md:text-lg tracking-tight uppercase">Herdanius Larobu</p>
              <p className="font-body text-accent text-sm md:text-base uppercase tracking-widest">(Capluk)</p>
              <div className="w-full h-px bg-white/10 my-2" />
              <div className="flex sm:items-center items-start justify-start sm:justify-center gap-1 text-white/60 text-sm md:text-base">
                <MapPin size={16} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </GlassEffect>

          <div className="flex flex-row w-full justify-between sm:justify-center gap-3">
             {STATS.map(s => (
               <div key={s.label} className="flex flex-col leading-none">
                 <span className="font-display text-white" style={{ fontSize: 'clamp(64px, 15vw, 100px)' }}>{s.value}</span>
                 <span className="font-tagline text-white/50 uppercase tracking-widest" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>{s.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="flex flex-col gap-3">
          {ROLES.map(role => (
            <div 
              key={role.text} 
              className={`flex flex-col items-center ${role.side === 'left' ? 'md:items-start' : 'md:items-end'}`}
            >
              <div 
                className="font-display font-bold text-white uppercase leading-[0.85]" 
                style={{ fontSize: 'clamp(32px, 7vw, 64px)' }}
              >
                {role.text}
              </div>
              {role.sub && (
                <span className="font-display font-bold text-white/40 uppercase tracking-widest mt-1" style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}>{role.sub}</span>
              )}
            </div>
          ))}
        </div>


        {/* Bento Cards (Mobile) */}
        <div className="flex flex-col gap-3">
          <GlassEffect className="p-4 py-6 flex flex-col justify-between rounded-2xl">
            <div className="flex gap-2">
              <Film size={16} className="text-accent" />
              <Tv size={16} className="text-accent" />
            </div>
            <div>
              <p className="font-tagline text-white/70 text-[9px] uppercase tracking-widest mb-1">Expertise</p>
              <p className="font-body text-white/30 text-[11px] leading-tight">Film & Motion Direction</p>
            </div>
          </GlassEffect>

          <div className="grid grid-cols-2 gap-3">
            <GlassEffect className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1603516875773-9a4c1861d5ed?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Work" className="w-full h-full object-cover filter transition-all duration-700" />
            </GlassEffect>
            <GlassEffect className="aspect-4/3 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80" alt="Work" className="w-full h-full object-cover filter transition-all duration-700" />
            </GlassEffect>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT (≥ lg)
          ══════════════════════════════════════════ */}

      {/* Left Column: Bio -> Stats -> Left Roles */}
      <div 
        ref={leftColRef}
        className="hidden lg:flex absolute top-[32px] bottom-[20%] xl:bottom-[5%] left-[8%] xl:left-[12%] flex-col justify-between gap-5 w-[240px] xl:w-[280px] pointer-events-auto"
      >
        <div className="flex flex-col gap-5">
          <GlassEffect className="flex flex-col p-4 rounded-2xl border-[#FFD699]/30">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 mx-auto mb-2 bg-black/30">
              <img 
                src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Frame_1" 
                alt="Profile" 
                className="w-full h-full object-cover" 
                style={{ objectPosition: '48% 6%' }}
              />
            </div>
            <div className="text-center">
              <p className="font-thick text-white text-[13px] xl:text-[15px] tracking-tight uppercase">Herdanius Larobu</p>
              <p className="font-body text-accent text-sm xl:text-base uppercase tracking-widest">(Capluk)</p>
              <div className="w-full h-px bg-white/10 my-2" />
              <div className="flex items-center justify-center gap-1.5 text-white/40 text-[11px] xl:text-[12px]">
                <MapPin size={12} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </GlassEffect>

          <div className="flex flex-row gap-5">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col leading-none">
                <span className="font-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>{s.value}</span>
                <span className="font-tagline text-white/30 text-[10px] xl:text-[12px] uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          {ROLES.filter(r => r.side === 'left').map(role => (
            <div 
              key={role.text} 
              style={{ 
                paddingLeft: role.offset,
                alignSelf: role.align === 'start' ? 'flex-start' : 'flex-end' 
              }}
            >
              <div 
                className="font-display text-white uppercase leading-[0.88] whitespace-nowrap" 
                style={{ 
                  fontSize: 'clamp(32px, 5.5vw, 68px)', 
                  textShadow: '0 4px 32px rgba(0,0,0,0.8)' 
                }}
              >
                {role.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Bento Grid -> Right Roles */}
      <div 
        ref={rightColRef}
        className="hidden lg:flex absolute top-[32px] bottom-[5%] right-[8%] xl:right-[12%] flex-col justify-between gap-5 w-[300px] xl:w-[360px] pointer-events-auto"
      >
        <div className="flex flex-col gap-3">
          <GlassEffect className="p-4 flex flex-col justify-between rounded-2xl">
            <div className="flex gap-2">
              <Film size={16} className="text-accent" />
              <Tv size={16} className="text-accent" />
            </div>
            <div>
              <p className="font-tagline text-white/70 text-[9px] uppercase tracking-widest mb-1">Expertise</p>
              <p className="font-body text-white/30 text-[11px] leading-tight">Film & Motion Direction</p>
            </div>
          </GlassEffect>

          <div className="grid grid-cols-2 gap-3">
            <GlassEffect className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1603516875773-9a4c1861d5ed?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Work" className="w-full h-full object-cover filter transition-all duration-700" />
            </GlassEffect>
            <GlassEffect className="aspect-4/3 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80" alt="Work" className="w-full h-full object-cover filter transition-all duration-700" />
            </GlassEffect>
          </div>
        </div>

        <div className="flex flex-col items-end text-right gap-4 mt-auto">
          {ROLES.filter(r => r.side === 'right').map(role => (
            <div 
              key={role.text} 
              className="flex flex-col items-end"
              style={{ 
                paddingRight: role.offset,
                alignSelf: role.align === 'start' ? 'flex-start' : 'flex-end' 
              }}
            >
              <div 
                className="font-display text-white uppercase leading-[0.88] whitespace-nowrap" 
                style={{ 
                  fontSize: 'clamp(32px, 5.5vw, 68px)', 
                  textShadow: '0 4px 32px rgba(0,0,0,0.8)' 
                }}
              >
                {role.text}
              </div>
              {role.sub && (
                <span className="font-display text-white/40 uppercase text-[16px] xl:text-[24px] mt-1">{role.sub}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
