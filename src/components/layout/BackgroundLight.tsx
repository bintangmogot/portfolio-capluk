'use client';

interface BackgroundLightProps {
  mouseX: number;
  mouseY: number;
}

export default function BackgroundLight({ mouseX, mouseY }: BackgroundLightProps) {
  return (
    <div 
      className="fixed z-0 pointer-events-none w-[500px] h-[500px] rounded-full"
      style={{
        background: 'radial-gradient(circle, var(--mouse-glow) 0%, transparent 100%)',
        filter: 'blur(20px) saturate(110%)',
        opacity: 0.2,
        
        left: 250,
        top: 250,
        transform: `translate(calc(${mouseX}px - 500px), calc(${mouseY}px - 500px))`,
        transition: 'transform 0.1s ease-out',
        zIndex: 1,
      }}
    />
  );
}
