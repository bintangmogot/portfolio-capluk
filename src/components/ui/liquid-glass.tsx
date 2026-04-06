"use client";

import React from "react";

// Types
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

// Glass Effect Wrapper Component — elastic, springy, alive
const GlassEffect = React.forwardRef<HTMLDivElement, GlassEffectProps>(
  ({ children, className = "", style = {}, href, target = "_blank" }, ref) => {
    const glassStyle: React.CSSProperties = {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      background: "var(--glass-bg, rgba(255, 255, 255, 0.05))",
      backdropFilter: "blur(20px) saturate(110%)",
      WebkitBackdropFilter: "blur(20px) saturate(110%)",
      border: "2px solid var(--border-color)",
      transition: "all 0.5s ease-in-out",
      ...style,
    };

    const content = (
      <div
        ref={ref}
        className={`relative flex overflow-hidden ${className}`}
        style={glassStyle}
      >
        {/* Subtle background layer */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(255, 255, 255, 0.02)" }}
        />

        {/* Content wrapper */}
        <div
          className="relative z-30 w-full h-full flex"
          style={{
            flexDirection: "inherit" as "row",
            alignItems: "inherit",
            justifyContent: "inherit",
          }}
        >
          {children}
        </div>
      </div>
    );

    return href ? (
      <a
        href={href}
        target={target}
        rel="noopener noreferrer"
        className="block outline-none"
        style={{ transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.275)" }}
      >
        {content}
      </a>
    ) : (
      content
    );
  }
);
GlassEffect.displayName = "GlassEffect";

// Dock Component — icons bounce on hover, elastic padding
const GlassDock: React.FC<{ icons: DockIcon[]; href?: string }> = ({
  icons,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl p-3 hover:p-4 hover:rounded-[36px] active:scale-[0.97] active:p-3"
  >
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="w-12 h-12 md:w-16 md:h-16 transition-all duration-700 hover:scale-110 hover:-translate-y-2 active:scale-95 cursor-pointer object-cover rounded-full"
          style={{
            transformOrigin: "center bottom",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.275)",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
          }}
          onClick={icon.onClick}
        />
      ))}
    </div>
  </GlassEffect>
);

// Button Component — elastic press down + release
const GlassButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}> = ({ children, href, onClick }) => {
  const content = (
    <GlassEffect className="rounded-3xl px-8 py-5 hover:px-9 hover:py-6 hover:rounded-[36px] active:scale-[0.96] active:px-8 active:py-5 overflow-hidden">
      <div
        className="transition-all duration-700 hover:scale-[0.98] active:scale-[0.95]"
        style={{
          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.275)",
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </GlassEffect>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="inline-block cursor-pointer"
    >
      {content}
    </div>
  );
};

// SVG Filter Component (Must be rendered once in the app)
const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.012 0.018"
        numOctaves="2"
        seed="17"
        result="turbulence"
      />
      <feGaussianBlur in="turbulence" stdDeviation="6" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="8"
        specularConstant="1.5"
        specularExponent="45"
        lightingColor="#ffffff"
        result="specLight"
      >
        <fePointLight x="-300" y="-300" z="400" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0.5"
        k2="1"
        k3="0.2"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="35"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export { GlassEffect, GlassDock, GlassButton, GlassFilter };
export type { GlassEffectProps, DockIcon };
