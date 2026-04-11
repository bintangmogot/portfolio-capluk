'use client';

import React from 'react';

export const COMPANIES_ROW_1 = [
  { name: 'Starvision', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864477/capluk-portfolio/Logo/starvision.png' },
  { name: 'Screenplay Films', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864475/capluk-portfolio/Logo/screenplay.png' },
  { name: 'Vidio', logo: 'https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775104964/capluk-portfomlio/Logo_Vidio.png' },
  { name: 'Netflix', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864473/capluk-portfolio/Logo/04.png' },
  { name: 'MD Entertainment', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864468/capluk-portfolio/Logo/05.png' },
  { name: 'MVP Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864467/capluk-portfolio/Logo/06.png' },
  { name: 'Amadeus', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864466/capluk-portfolio/Logo/07.png' },
  { name: 'Sinemaku', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864465/capluk-portfolio/Logo/08.png' },
  { name: 'Vision+', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864463/capluk-portfolio/Logo/09.png' },
  { name: 'Moviesta', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864462/capluk-portfolio/Logo/10.png' },
  { name: 'Behave', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864460/capluk-portfolio/Logo/11.png' },
  { name: 'Falcon', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864459/capluk-portfolio/Logo/12.png' },
  { name: 'Atlas', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864458/capluk-portfolio/Logo/13.png' },
];

export const COMPANIES_ROW_2 = [
  { name: 'Screenmedia Films', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864456/capluk-portfolio/Logo/14.png' },
  { name: 'ViH Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864455/capluk-portfolio/Logo/15.png' },
  { name: 'Jak Pictures', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864454/capluk-portfolio/Logo/16.png' },
  { name: 'Giffard', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864453/capluk-portfolio/Logo/17.png' },
  { name: "Pond's", logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864452/capluk-portfolio/Logo/18.png' },
  { name: 'XP-Pen', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864451/capluk-portfolio/Logo/19.png' },
  { name: 'Smartfren', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864450/capluk-portfolio/Logo/20.png' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864449/capluk-portfolio/Logo/21.png' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864449/capluk-portfolio/Logo/22.png' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864449/capluk-portfolio/Logo/23.png' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864449/capluk-portfolio/Logo/24.png' },
  { name: 'EA7', logo: 'https://res.cloudinary.com/workstation-/image/upload/v1775864449/capluk-portfolio/Logo/25.png' },
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
