'use client';

import React from 'react';

export const COMPANIES_ROW_1 = [
  { name: 'Starvision', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/starvision' },
  { name: 'Screenplay Films', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/screenplay' },
  { name: 'Vidio', logo: 'https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775104964/capluk-portfolio/Logo_Vidio.png' },
  { name: 'Netflix', logo: 'https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775104967/capluk-portfolio/logo-netflix.png' },
  { name: 'MD Entertainment', logo: 'https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775104961/capluk-portfolio/md-entertainment.png' },
  { name: 'MVP Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/mvp-pictures' },
  { name: 'Amadeus', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/amadeus' },
  { name: 'Sinemaku', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/sinemaku' },
  { name: 'Vision+', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/visionplus' },
  { name: 'Murnipictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/murnipictures' },
  { name: 'Behave', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/behave' },
  { name: 'Falcon', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/falcon' },
  { name: 'Atlas', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/atlas' },
];

export const COMPANIES_ROW_2 = [
  { name: 'Screenmedia Films', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/screenmedia' },
  { name: 'ViH Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/vih-pictures' },
  { name: 'Jak Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/jak-pictures' },
  { name: 'Giffard', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/giffard' },
  { name: "Pond's", logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/ponds' },
  { name: 'XP-Pen', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/xppen' },
  { name: 'Smartfren', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/smartfren' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/companies/ea7' },
];

export function MarqueeRow({ 
  companies, 
  direction, 
  speed = 30 
}: { 
  companies: { name: string; logo: string }[]; 
  direction: 'left' | 'right'; 
  speed?: number 
}) {
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';
  const items = [...companies, ...companies];

  return (
    <div 
      className="relative w-full overflow-hidden marquee-pause" 
      style={{ 
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', 
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' 
      }}
    >
      <div
        className="flex items-center w-max"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {items.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex items-center justify-center shrink-0 h-6 sm:h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 px-6 sm:px-10"
          >
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-auto object-contain max-w-[80px] sm:max-w-[100px] md:max-w-[110px]"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
            ) : null}
            <span 
              className={`${company.logo ? 'hidden' : 'block'} font-heading text-white/40 text-[10px] sm:text-[11px] uppercase tracking-widest whitespace-nowrap`}
            >
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeGroup({ className = "", speed1 = 35, speed2 = 38 }: { className?: string; speed1?: number; speed2?: number }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <MarqueeRow companies={COMPANIES_ROW_1} direction="left" speed={speed1} />
      <MarqueeRow companies={COMPANIES_ROW_2} direction="right" speed={speed2} />
    </div>
  );
}
