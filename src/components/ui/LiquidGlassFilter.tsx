'use client';

/**
 * LiquidGlassFilter
 * 
 * Renders a hidden SVG with displacement map filters for
 * real refractive distortion on glass elements.
 * 
 * - #liquid-glass-filter: subtle distortion for large panels
 * - #liquid-glass-filter-strong: stronger for hero cards
 * 
 * Only apply to .liquid-glass cards, NOT to nav/badges.
 * Small elements use backdrop-filter only (no SVG filter).
 */
export default function LiquidGlassFilter() {
  // The displacement map is a noise texture encoded as a data URI.
  // Reducing stdDeviation (blur) and scale (displacement) keeps
  // the effect visible but not overpowering.
  const noiseMap = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {/* Subtle liquid glass — for glass cards and panels */}
        <filter id="liquid-glass-filter" x="-5%" y="-5%" width="110%" height="110%">
          <feImage
            result="noise"
            width="200"
            height="200"
            x="0"
            y="0"
            href={noiseMap}
          />
          <feTile in="noise" result="tiledNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="tiledNoise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.4" result="softDisplaced" />
          <feMerge>
            <feMergeNode in="softDisplaced" />
          </feMerge>
        </filter>

        {/* Stronger refraction — for hero glass cards on hover */}
        <filter id="liquid-glass-filter-strong" x="-5%" y="-5%" width="110%" height="110%">
          <feImage
            result="noise"
            width="200"
            height="200"
            x="0"
            y="0"
            href={noiseMap}
          />
          <feTile in="noise" result="tiledNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="tiledNoise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.6" result="softDisplaced" />
          <feMerge>
            <feMergeNode in="softDisplaced" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
