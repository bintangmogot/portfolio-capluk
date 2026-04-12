'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Mail, Globe, Download } from 'lucide-react';
import { GlassEffect } from '@/components/ui/liquid-glass';

interface ConnectSectionProps {
  isActive: boolean;
}

/* ═══════════════════════════════════════════════════
   SVG ICON COMPONENTS
   ═══════════════════════════════════════════════════ */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.5 11C8.88 11 10 9.88 10 8.5S8.88 6 7.5 6H3v5h4.5zm0 2H3v5h4.5C8.88 18 10 16.88 10 15.5S8.88 13 7.5 13zM1 4h6.5C9.98 4 12 6.02 12 8.5c0 1.27-.53 2.42-1.38 3.24C11.85 12.65 12.5 13.96 12.5 15.5 12.5 17.98 10.48 20 8 20H1V4zm13 7h8c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.97 0 3.68-1.15 4.48-2.81H19.1c-.57.87-1.55 1.44-2.63 1.44-1.73 0-3.14-1.4-3.14-3.13 0-.11.01-.22.02-.33H22c.01-.11.02-.23.02-.34C22.02 8.24 19.78 6 17 6s-5 2.24-5 5h2zm1.33-1.33c.34-1.24 1.48-2.14 2.83-2.14s2.49.9 2.83 2.14h-5.66zM15 3h5v1.5h-5V3z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const SOCIAL_LINKS = [
  { id: 'ig', renderIcon: (cls: string) => <InstagramIcon className={cls} />, label: '@capluk', href: 'https://instagram.com/capluk' },
  { id: 'yt', renderIcon: (cls: string) => <YoutubeIcon className={cls} />, label: 'Herdanius Larobu', href: 'https://youtube.com/@herdaniuslarobu' },
  { id: 'li', renderIcon: (cls: string) => <LinkedinIcon className={cls} />, label: 'Herdanius Larobu', href: 'https://linkedin.com/in/herdaniuslarobu' },
  { id: 'be', renderIcon: (cls: string) => <BehanceIcon className={cls} />, label: 'Herdanius Capluk', href: 'https://behance.net/herdaniuscapluk' },
];

const CONTACT_INFO = [
  { icon: MapPin, text: 'Bali, Indonesia', href: 'https://www.google.com/maps/search/?api=1&query=Dalung,+North+Kuta,+Badung+Regency,+Bali' },
  { icon: Phone, text: '+62 8159070977', href: 'tel:+628159070977' },
  { icon: Mail, text: 'Herdaniuslarobu@gmail.com', href: 'mailto:Herdaniuslarobu@gmail.com' },
  { icon: Globe, text: 'mataquestudio.com', href: 'https://mataquestudio.com' },
];

import { MarqueeRow, COMPANIES_ROW_1, COMPANIES_ROW_2 } from '@/components/ui/Marquee';



/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export default function ConnectSection({ isActive }: ConnectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (isActive) {
      gsap.set(sectionRef.current, { autoAlpha: 1 });

      // Desktop animations
      if (profileRef.current) {
        gsap.fromTo(profileRef.current,
          { x: -100, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );
      }
      if (socialRef.current) {
        gsap.fromTo(socialRef.current,
          { x: 100, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', delay: 0.15 }
        );
      }
      if (cvRef.current) {
        gsap.fromTo(cvRef.current,
          { x: 100, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.25 }
        );
      }
      if (statusRef.current) {
        gsap.fromTo(statusRef.current,
          { y: -20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Mobile animations
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
      className="absolute inset-0 pointer-events-none select-none max-w-7xl mx-auto"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      {/* ══════════════════════════════════════════
          MOBILE / TABLET LAYOUT (< lg)
          ══════════════════════════════════════════ */}
      <div
        ref={mobileRef}
        className="lg:hidden absolute inset-0 flex flex-col px-4 sm:px-8 pt-6 pb-4 gap-4 overflow-y-auto hide-scrollbar pointer-events-auto"
      >

        {/* Contact Info */}
        <GlassEffect className="flex flex-col p-4 sm:p-5 rounded-2xl gap-3 border-(--border-color) shrink-0">
          <div className="flex flex-col items-center justify-center gap-3 mb-1 w-full">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-(--border-color) bg-black/10 shadow-lg shrink-0 text-center">
              <img
                src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Frame_1"
                alt="Profile"
                className="w-full h-full object-cover"
                style={{ objectPosition: '48% 6%' }}
              />
            </div>
          </div>
          
          <div className="w-full h-px bg-(--border-color)/20 mb-1" />
          
          <div className="flex flex-col w-full">
            {CONTACT_INFO.map((info, i) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              return (
                <div key={info.text} className="flex flex-col">
                  <Wrapper
                    {...(info.href ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                    className="flex items-center justify-between w-full px-3 py-2.5 pointer-events-auto hover:bg-[#FFD69911] active:bg-[#1B1D1D66] active:scale-[0.98] rounded-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={15} className="text-accent/80 shrink-0 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                      <span className="font-body text-white/80 text-body group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{info.text}</span>
                    </div>
                    {info.href && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
                        <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                      </svg>
                    )}
                  </Wrapper>
                  {i !== CONTACT_INFO.length - 1 && <div className="w-full h-px bg-(--border-color)/10 my-0.5 ml-8" />}
                </div>
              );
            })}
          </div>

          <a
            href="https://wa.me/+628159070977?text=Hi%20Capluk!%20I'm%20ready%20for%20collab.%20I'd%20like%20to%20collaborate%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 pointer-events-auto"
          >
            <GlassEffect 
              solidOnHover={true}
              className="w-full rounded-xl px-4 py-2.5 flex flex-row items-center justify-center gap-3 cursor-pointer transition-all duration-300 group shadow-inner"
            >
              <div className="flex h-1.5 w-1.5 relative mt-0.5">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </div>
              <span className="text-[12px] text-white/90 group-hover:text-accent sm:text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors">
                Open for Collab
              </span>
            </GlassEffect>
          </a>
        </GlassEffect>
        
        <GlassEffect className="flex flex-col p-2.5 rounded-2xl border-(--border-color) shrink-0">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.id} className="flex flex-col">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 active:bg-black/40 active:scale-[0.98] transition-all duration-300 group pointer-events-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD69908] border border-(--border-color)/40 flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                    {link.renderIcon(`w-4 h-4 text-white/60 group-hover:text-black group-hover:scale-110 transition-all duration-300`)}
                  </div>
                  <span className="font-body text-white/80 text-body group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{link.label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
                  <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                </svg>
              </a>
            </div>
          ))}
        </GlassEffect>

        {/* Download CV */}
        <GlassEffect 
          href="/cv-herdanius-larobu.pdf" 
          solidOnHover={true}
          className="w-full relative overflow-hidden flex items-center justify-center gap-3 px-4 py-3 sm:px-6 sm:py-4 mt-2 rounded-lg md:rounded-2xl active:scale-[0.98] transition-all duration-500 pointer-events-auto shrink-0 group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="font-heading group-hover:text-accent text-body tracking-widest text-center w-full uppercase transition-colors z-10 font-bold">Download Full CV</span>
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent transition-all duration-300 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 group-hover:stroke-black! transition-transform duration-300">
              <path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>
            </svg>
          </div>
        </GlassEffect>


      </div>


      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT (≥ lg)
          ══════════════════════════════════════════ */}

      {/* Right Column: Social Links and CV */}
      <div
        className="hidden lg:flex absolute bottom-[48px] right-[6%] xl:right-[1%] flex-col gap-18 items-end w-[280px] xl:w-[320px] pointer-events-auto"
      >
        {/* Social Links */}
        <div
          ref={socialRef}
          className="w-full"
        >
          <GlassEffect className="flex flex-col p-5 rounded-2xl gap-3 border-(--border-color)">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 active:bg-black/40 active:scale-[0.98] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FFD69908] border border-(--border-color)/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(255,214,153,0.1)] transition-all duration-300">
                  {link.renderIcon(`w-4 h-4 text-white/50 group-hover:text-black group-hover:scale-110 transition-all duration-300`)}
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-white/80 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{link.label}</span>
                </div>
              </a>
            ))}
          </GlassEffect>
        </div>

        {/* Download CV (Right side, below socials) */}
        <div 
          ref={cvRef}
          className="w-full flex justify-start mr-20">
          <GlassEffect 
            href="/cv-herdanius-larobu.pdf" 
            solidOnHover={true}
            className="relative overflow-hidden flex items-center justify-center gap-3 px-10 py-3 rounded-xl active:scale-[0.98] transition-all duration-500 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="font-body tracking-[0.05em] group-hover:text-accent transition-colors z-10 relative pr-2 font-bold">Download CV</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-120 group-hover:bg-accent transition-all duration-300 z-10 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 group-hover:stroke-black! transition-transform duration-300">
                <path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>
              </svg>
            </div>
          </GlassEffect>
        </div>
      </div>

      {/* Left Column: Profile Info Card */}
      <div
        ref={profileRef}
        className="hidden lg:flex absolute bottom-[24px] left-[6%] flex-col justify-end gap-4 w-[320px] pointer-events-auto"
      >
        <GlassEffect className="flex flex-col items-center p-5 rounded-2xl gap-3 border-(--border-color)">
          {/* Profile Image */}
          <div className="w-20 h-20 md:w-30 md:h-30 xl:w-auto xl:h-32 rounded-full overflow-hidden border-2 border-(--border-color) bg-black/10 shadow-lg">
            <img
              src="https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Frame_1"
              alt="Herdanius Larobu"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center gap-2 w-full">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={info.text}
                  {...(info.href ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-2.5 w-full justify-center px-3 py-1.5 rounded-lg hover:bg-[#FFD69911] active:bg-[#1B1D1D66] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
                >
                  <Icon size={14} className="text-accent/60 shrink-0 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                  <span className="font-body text-white/70 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{info.text}</span>
                </Wrapper>
              );
            })}
          </div>

          <div className="w-full h-px bg-(--border-color)/10 my-1" />

          <a
            href="https://wa.me/+628159070977?text=Hi%20Capluk!%20I'm%20ready%20for%20collab.%20I'd%20like%20to%20collaborate%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 pointer-events-auto"
          >
            <GlassEffect 
              solidOnHover={true} 
              className="w-full rounded-xl px-4 py-3 flex flex-row items-center justify-center gap-3 cursor-pointer transition-all duration-300 group shadow-inner"
            >
              <div className="w-2 h-2 mr-1 rounded-full bg-emerald-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[11px] text-white/90 group-hover:text-accent sm:text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors">
                Open for Collab
              </span>
            </GlassEffect>
          </a>
        </GlassEffect>
      </div>

    </div>
  );
}
