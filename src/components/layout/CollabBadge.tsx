'use client';

import { GlassEffect } from '@/components/ui/liquid-glass';

export default function CollabBadge() {
  return (
    <div className="fixed top-6 sm:top-8 right-4 sm:right-8 z-50">
      <a
        href="https://wa.me/+628159070977?text=Hi%20Capluk!%20I'm%20ready%20for%20collab.%20I'd%20like%20to%20collaborate%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlassEffect className="rounded-full px-4 sm:px-5 py-2 flex flex-row items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <div className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span className="text-[11px] text-white sm:text-xs uppercase tracking-widest font-semibold whitespace-nowrap">
            Open for Collab
          </span>
        </GlassEffect>
      </a>
    </div>
  );
}
