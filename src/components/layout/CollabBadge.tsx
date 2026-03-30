'use client';

import { GlassEffect } from '@/components/ui/liquid-glass';

export default function CollabBadge() {
  return (
    <div className="fixed top-8 right-8 z-50">
      <GlassEffect className="rounded-full px-5 py-2.5 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs uppercase tracking-widest font-semibold">Open for Collab</span>
      </GlassEffect>
    </div>
  );
}
