'use client';

interface BackgroundTextProps {
  text: string;
  mouseX: number;
}

export default function BackgroundText({ text, mouseX }: BackgroundTextProps) {
  // We use window.innerWidth safely by checking document/window existence
  // but since mouseX is passed down from a generic listener, we can just use it directly.
  const shift = typeof window !== 'undefined' ? (mouseX - window.innerWidth / 2) * -0.05 : 0;

  return (
    <h1 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[25vw] tracking-tighter opacity-[0.03] whitespace-nowrap z-0 pointer-events-none transition-all duration-1000 ease-out uppercase"
      style={{ transform: `translate(-50%, -50%) translateX(${shift}px)` }}
    >
      {text}
    </h1>
  );
}
