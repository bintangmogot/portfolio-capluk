'use client';

import { GlassEffect } from '@/components/ui/liquid-glass';

interface NavbarProps {
  sections: { id: string; bgText: string }[];
  activeSection: string;
  onNavigate: (index: number) => void;
}

export default function Navbar({ sections, activeSection, onNavigate }: NavbarProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <GlassEffect className="rounded-[2.5rem] p-2 flex items-center gap-2">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => onNavigate(idx)}
            className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-500 ${
              activeSection === section.id 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'hover:bg-white/10 text-white/50 hover:text-white'
            }`}
          >
            {section.id}
          </button>
        ))}
      </GlassEffect>
    </div>
  );
}
