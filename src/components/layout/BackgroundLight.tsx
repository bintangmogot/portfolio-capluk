'use client';

interface BackgroundLightProps {
  mouseX: number;
  mouseY: number;
}

export default function BackgroundLight({ mouseX, mouseY }: BackgroundLightProps) {
  return (
    <div 
      className="fixed z-0 pointer-events-none w-[1000px] h-[1000px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)',
        left: 0,
        top: 0,
        transform: `translate(calc(${mouseX}px - 500px), calc(${mouseY}px - 500px))`,
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
}
