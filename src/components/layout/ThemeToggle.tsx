'use client';

import { GlassEffect } from '@/components/ui/liquid-glass';

export default function ThemeToggle() {
  return (
    <div className="fixed top-8 left-8 z-50">
      <GlassEffect className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95">
        <span className="font-heading font-bold text-xl">C</span>
      </GlassEffect>
    </div>
  );
}
