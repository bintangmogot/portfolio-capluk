'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, X, Sparkles, Megaphone, Type, Layers, Palette, Box } from 'lucide-react';
import { GlassEffect } from '@/components/ui/liquid-glass';

gsap.registerPlugin(useGSAP);

/* ════════════════════════════════════════════════════
   DATA — YouTube video tutorials (portfolio items)
   ════════════════════════════════════════════════════ */
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId: string;
  icon: React.ElementType;
  /** Position on the hero background (% based) — avoids the person center */
  position: {
    top: string;
    left: string;
  };
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'intro-anim',
    title: 'Intro Animation',
    category: 'Motion Design',
    description: 'Cinematic intro sequences blending 3D elements with dynamic typography for branded content.',
    youtubeId: 'JC43XNJB2YY',
    icon: Sparkles,
    position: { top: '25%', left: '16%' },
  },
  /* Temporarily hidden per client request — uncomment to restore
  {
    id: 'social-ads',
    title: 'Social Media Ads',
    category: 'Advertising',
    description: 'Scroll-stopping ad creatives optimized for Instagram Reels, TikTok, and YouTube Shorts.',
    youtubeId: 'J-lQmA3C3fQ',
    icon: Megaphone,
    position: { top: '20%', left: '60%' },
  },
  */
  {
    id: 'title-design',
    title: 'Title Design Animation',
    category: 'Title Sequence',
    description: 'Film and series title sequences with layered compositing and custom typeface animation.',
    youtubeId: 'pjySNHbdjB0',
    icon: Type,
    position: { top: '64%', left: '20%' },
  },
  {
    id: 'visual-fx',
    title: 'Visual FX',
    category: 'VFX Compositing',
    description: 'Photorealistic compositing, green screen keying, and particle simulations for feature productions.',
    youtubeId: 't8Uvtf5SLA0',
    icon: Layers,
    position: { top: '80%', left: '64%' },
  },
  {
    id: 'social-ads',
    title: 'Social Media Ads',
    category: 'Advertising',
    description: 'Scroll-stopping ad creatives optimized for Instagram Reels, TikTok, and YouTube Shorts.',
    youtubeId: 'J-lQmA3C3fQ',
    icon: Megaphone,
    position: { top: '20%', left: '68%' },
  },
  /* Temporarily hidden until video is ready
  {
    id: 'dummy-media',
    title: 'Coming Soon',
    category: 'New Project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dummy text for a future video showcase.',
    youtubeId: 'dQw4w9WgXcQ', // Dummy video (Rick Roll is safe, or I can use an empty/placeholder ID, but let's just use a real one so it doesn't break)
    icon: Box,
    position: { top: '50%', left: '68%' },
  },
  */
  /* Temporarily hidden per client request — uncomment to restore
  {
    id: 'motion-track',
    title: '3D Compositing',
    category: 'VFX Pipeline',
    description: 'Camera tracking, 3D integration, and environment extension for seamless visual effects.',
    youtubeId: 't8Uvtf5SLA0',
    icon: Box,
    position: { top: '80%', left: '28%' },
  },
  */
];

/* ════════════════════════════════════════════════════
   DEVICE TYPE HOOK — mobile / tablet / desktop
   ════════════════════════════════════════════════════ */
type DeviceType = 'mobile' | 'tablet' | 'desktop';

function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setDevice('mobile');
      else if (w < 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return device;
}

/* ════════════════════════════════════════════════════
   CURSOR-FOLLOWING VIDEO PREVIEW — lerp-smoothed
   (desktop-only)
   ════════════════════════════════════════════════════ */
function CursorVideoPreview({
  youtubeId,
  title,
  isVisible,
  mouseX,
  mouseY,
}: {
  youtubeId: string;
  title: string;
  isVisible: boolean;
  mouseX: number;
  mouseY: number;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const smoothPos = useRef({ x: 0, y: 0 });
  const rawPos = useRef({ x: 0, y: 0 });
  const offsetPos = useRef({ x: 20, y: -140 });
  const rafRef = useRef<number | null>(null);
  const wasVisible = useRef(false);

  // Preview dimensions + viewport padding
  const PREVIEW_W = 300;
  const PREVIEW_H = 170;
  const EDGE_PAD = 12;
  const CURSOR_OFFSET_X = 20;
  const CURSOR_OFFSET_Y = -140;

  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowIframe(true);
    }
  }, [isVisible]);

  // Sync latest mouse position into a ref (no RAF restart)
  useEffect(() => {
    rawPos.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  // Snap smooth position when first becoming visible (avoids lerp from 0,0)
  useEffect(() => {
    if (isVisible && !wasVisible.current) {
      smoothPos.current = { x: mouseX, y: mouseY };
      offsetPos.current = { x: CURSOR_OFFSET_X, y: CURSOR_OFFSET_Y };
    }
    wasVisible.current = isVisible;
  }, [isVisible, mouseX, mouseY]);

  // Single stable RAF loop — only depends on [isVisible], reads coords from ref
  useEffect(() => {
    if (!isVisible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, rawPos.current.x, 0.15);
      smoothPos.current.y = lerp(smoothPos.current.y, rawPos.current.y, 0.15);

      if (previewRef.current) {
        // Default target offsets
        let targetOffsetX = CURSOR_OFFSET_X;
        let targetOffsetY = CURSOR_OFFSET_Y;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Check if default position would overflow right
        if (smoothPos.current.x + targetOffsetX + PREVIEW_W + EDGE_PAD > vw) {
          targetOffsetX = -PREVIEW_W - CURSOR_OFFSET_X;
        }

        // Check if default position would overflow top
        if (smoothPos.current.y + targetOffsetY < EDGE_PAD) {
          targetOffsetY = 30; // Place below cursor
        }

        // Lerp offsets for smooth flipping animation
        offsetPos.current.x = lerp(offsetPos.current.x, targetOffsetX, 0.12);
        offsetPos.current.y = lerp(offsetPos.current.y, targetOffsetY, 0.12);

        let px = smoothPos.current.x + offsetPos.current.x;
        let py = smoothPos.current.y + offsetPos.current.y;

        // Hard clamping to ensure it never goes off-screen
        if (px < EDGE_PAD) px = EDGE_PAD;
        if (py + PREVIEW_H + EDGE_PAD > vh) py = vh - PREVIEW_H - EDGE_PAD;

        previewRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isVisible]);

  // Fade in/out
  useGSAP(() => {
    if (!previewRef.current) return;
    if (isVisible) {
      gsap.to(previewRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.4)',
      });
    } else {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          // Erase it / place it outside the screen completely when fade out finishes
          setShowIframe(false); // Stop the video so it doesn't play in the background
          if (previewRef.current) {
            previewRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
            previewRef.current.style.visibility = 'hidden';
            previewRef.current.style.opacity = '0';
          }
        }
      });
    }
  }, [isVisible]);

  // Don't render the iframe if we have absolutely no youtubeId, but because we preserve it
  // on fade out, it will only be empty on the very first load.
  if (!youtubeId) return null;

  return (
    <div
      ref={previewRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        width: 300,
        height: 170,
        visibility: 'hidden',
        opacity: 0,
        transformOrigin: 'bottom left',
        transform: 'translate3d(-9999px, -9999px, 0)', // initial off-screen
      }}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black"
        style={{
          border: '1px solid var(--border-color)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
        }}
      >
        {/* YouTube embed as live preview with autoplay + sound */}
        {showIframe && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
            title={`Preview: ${title}`}
            className="w-full h-full"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-linear-to-t from-black/70 to-transparent">
          <p className="text-text-main text-[10px] font-heading tracking-widest uppercase opacity-90">{title}</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   FLOATING PILL BUTTON — desktop scattered layout
   ════════════════════════════════════════════════════ */
function FloatingPillButton({
  item,
  index,
  onHoverStart,
  onHoverEnd,
  onClick,
  isActive,
}: {
  item: PortfolioItem;
  index: number;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  onClick: (item: PortfolioItem) => void;
  isActive: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Infinite subtle float animation
  useGSAP(() => {
    if (!btnRef.current || !isActive) return;

    // Staggered entrance
    gsap.fromTo(
      btnRef.current,
      { autoAlpha: 0, scale: 0.6, y: 20 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.15 + index * 0.08,
      }
    );

    // Continuous subtle float
    gsap.to(btnRef.current, {
      y: -6 + Math.random() * 4,
      x: -3 + Math.random() * 6,
      duration: 2.5 + Math.random() * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3,
    });
  }, [isActive]);

  // Exit animation
  useGSAP(() => {
    if (!btnRef.current || isActive) return;
    gsap.to(btnRef.current, {
      autoAlpha: 0,
      scale: 0.6,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      delay: index * 0.04,
    });
  }, [isActive]);

  const handleMouseEnter = () => {
    onHoverStart(index);
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 1.08, duration: 0.3, ease: 'power2.out' });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    onHoverEnd();
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <button
      ref={btnRef}
      className="absolute pointer-events-auto cursor-pointer group z-10"
      style={{
        top: item.position.top,
        left: item.position.left,
        visibility: 'hidden',
        opacity: 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
    >
      <GlassEffect
        className="group flex items-center px-6 py-2.5 rounded-full transition-all duration-300
          hover:bg-white/10 active:bg-black/40 active:scale-[0.96]"
        style={{ border: '1px solid var(--border-color)' }}
      >
        {/* Play icon — white default, accent on hover */}
        <div
          ref={iconRef}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0
            bg-transparent border border-(--border-color)
            group-hover:bg-accent
            transition-all duration-300 mr-4"
        >
          <Play
            size={13}
            className="text-text-main ml-0.5 group-hover:text-black transition-colors duration-300"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
        {/* Label */}
        <span className="font-heading text-body text-text-main tracking-[0.12em] uppercase whitespace-nowrap
          group-hover:text-text-main transition-colors duration-300">
          {item.title}
        </span>
      </GlassEffect>
    </button>
  );
}

/* ════════════════════════════════════════════════════
   PORTFOLIO CARD — mobile/tablet horizontal scroll
   Flex column: thumbnail on top, details below
   ════════════════════════════════════════════════════ */
function PortfolioCard({
  item,
  index,
  onClick,
  isActive,
}: {
  item: PortfolioItem;
  index: number;
  onClick: (item: PortfolioItem) => void;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Staggered entrance — slide from right
  useGSAP(() => {
    if (!cardRef.current || !isActive) return;
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, x: 60, scale: 0.92 },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(1.3)',
        delay: 0.12 + index * 0.08,
      }
    );
  }, [isActive]);

  // Exit animation
  useGSAP(() => {
    if (!cardRef.current || isActive) return;
    gsap.to(cardRef.current, {
      autoAlpha: 0,
      x: -30,
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in',
      delay: index * 0.03,
    });
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="pointer-events-auto cursor-pointer group shrink-0 snap-center"
      style={{
        visibility: 'hidden',
        opacity: 0,
        width: 'clamp(260px, 72vw, 320px)',
      }}
      onClick={() => onClick(item)}
    >
      <GlassEffect
        className="flex flex-col pb-2 sm:pb-5 rounded-2xl overflow-hidden transition-all duration-300
          active:scale-[0.97] bg-black/40"
        style={{ border: '1px solid var(--border-color)' }}
      >
        {/* Thumbnail — 3:4 portrait ratio */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img
            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt={item.title}
            className="w-full h-full object-cover group-active:scale-105 transition-transform duration-500"
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GlassEffect
              className="w-14 h-14 rounded-full flex items-center justify-center border border-(--border-color)
                group-active:bg-accent group-active:border-(--border-color)
                transition-all duration-300"
              style={{ padding: 0 }}
            >
              <Play size={22} className="text-accent group-active:text-black ml-0.5 transition-colors" fill="currentColor" strokeWidth={0} />
            </GlassEffect>
          </div>
          {/* Category badge — liquid glass */}
          <div className="absolute top-3 left-3">
            <GlassEffect className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border border-(--border-color)" style={{ padding: '0.25rem 0.625rem' }}>
              <item.icon size={9} className="text-accent shrink-0" />
              <span className="font-body text-xs text-text-main leading-none">
                {item.category}
              </span>
            </GlassEffect>
          </div>
        </div>

        {/* Card details — title + description below the thumbnail */}
        <div className="px-4 py-3.5 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0
                bg-accent border border-(--border-color)"
            >
              <item.icon size={13} className="text-black" />
            </div>
            <h4 className="font-heading text-h5 text-text-main tracking-widest uppercase truncate">
              {item.title}
            </h4>
          </div>
          <p className="font-body text-body text-text-muted leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>
      </GlassEffect>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   HORIZONTAL SCROLL ROW — mobile & tablet
   Swipe left/right to browse cards
   ════════════════════════════════════════════════════ */
function PortfolioCardScroll({
  items,
  onClick,
  isActive,
}: {
  items: PortfolioItem[];
  onClick: (item: PortfolioItem) => void;
  isActive: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 flex items-center pointer-events-auto">
      <div
        ref={scrollRef}
        className="w-full flex gap-4 overflow-x-auto px-5 sm:px-8 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '16px',
          paddingTop: '16px',
        }}
      >
        {items.map((item, index) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            onClick={onClick}
            isActive={isActive}
          />
        ))}
        {/* End spacer for last card visibility */}
        <div className="shrink-0 w-4 sm:w-8" aria-hidden />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   VIDEO MODAL — almost full-width YouTube embed
   Uses useEffect (not useGSAP) for reliable open/close
   ════════════════════════════════════════════════════ */
function VideoModal({
  item,
  isOpen,
  onClose,
}: {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Open/close animation via useEffect for reliable state tracking
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;

    if (isOpen) {
      // Show overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      // Show modal content
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, scale: 0.9, y: 40 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
          delay: 0.1,
        }
      );
    } else {
      // Hide modal content
      gsap.to(modalRef.current, {
        autoAlpha: 0,
        scale: 0.92,
        y: 30,
        duration: 0.3,
        ease: 'power2.in',
      });
      // Hide overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.1,
      });
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop — tapping anywhere here closes the modal */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        style={{
          visibility: 'hidden',
          opacity: 0,
          zIndex: 9998,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Modal wrapper — fills screen, click on empty area (padding) closes */}
      <div
        ref={modalRef}
        className="fixed inset-0 flex flex-col items-center justify-center lg:justify-start p-0 sm:p-6 md:p-10"
        style={{
          visibility: 'hidden',
          opacity: 0,
          zIndex: 9999,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      >
        {item && (
          /* Inner content — stop propagation so clicking video/header doesn't close */
          <div
            className="relative w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[60vw]"
            onClick={(e) => e.stopPropagation()}
          >
          <GlassEffect
            className="flex flex-col w-full rounded-3xl p-4 pb-8 sm:p-5 md:p-15 md:pt-5 bg-black/80"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <div className="w-full flex flex-row justify-between pb-3">
            {/* ✦ FLOATING CLOSE BUTTON — always visible, above everything ✦ */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="order-2 mb-3 sm:mb-5
                w-12 h-12 sm:w-14 sm:h-14 rounded-full
                bg-black backdrop-blur-md
                flex items-center justify-center transition-all duration-300 cursor-pointer
                border border-(--border-color) hover:bg-accent group"
              style={{ zIndex: 10000 }}
            >
              <X size={22} className="text-accent group-hover:text-black transition-colors" />
            </button>

            {/* Header bar */}
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-accent border border-(--border-color)">
                  <item.icon size={16} className="text-black" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-accent text-h5 mb-2 tracking-[0.12em] uppercase">{item.title}</h3>
                  {/* Category badge — liquid glass */}
                  <GlassEffect className="flex items-center gap-1.5 mt-0.5 w-fit rounded-full px-2 py-0.5 border border-(--border-color)" style={{ padding: '0.125rem 0.5rem' }}>
                    <item.icon size={9} className="text-accent shrink-0" />
                    <span className="font-body text-sm sm:text-base text-text-muted">{item.category}</span>
                  </GlassEffect>
                </div>
              </div>
            </div>
            </div>

            {/* YouTube Embed */}
            <div className="relative rounded-2xl overflow-hidden border border-(--border-color)/20"
              style={{
                aspectRatio: '16/9',
                boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`}
                title={item.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </GlassEffect>
          </div>
        )}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════
   PORTFOLIO SECTION — Main export
   ════════════════════════════════════════════════════ */
interface PortfolioSectionProps {
  isActive: boolean;
}

export default function PortfolioSection({ isActive }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const device = useDeviceType();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePreviewItem, setActivePreviewItem] = useState<PortfolioItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track cursor position (desktop only)
  useEffect(() => {
    if (!isActive || device !== 'desktop') return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, device]);

  // Section enter/exit animation
  useGSAP(() => {
    if (!sectionRef.current) return;
    if (isActive) {
      gsap.set(sectionRef.current, { autoAlpha: 1 });
    } else {
      gsap.to(sectionRef.current, { autoAlpha: 0, duration: 0.28, ease: 'power2.in' });
    }
  }, [isActive]);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
    setActivePreviewItem(PORTFOLIO_ITEMS[index]);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Reset hover state when section becomes inactive to prevent stuck preview
  useEffect(() => {
    if (!isActive) {
      setHoveredIndex(null);
    }
  }, [isActive]);

  const handleClick = useCallback((item: PortfolioItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModalItem(null), 400);
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="absolute inset-0 pointer-events-none select-none"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        {/* ── DESKTOP: floating scattered pill buttons ── */}
        {device === 'desktop' && (
          <div className="absolute inset-0">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <FloatingPillButton
                key={item.id}
                item={item}
                index={index}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onClick={handleClick}
                isActive={isActive}
              />
            ))}
          </div>
        )}

        {/* ── MOBILE & TABLET: scrollable card grid ── */}
        {device !== 'desktop' && (
          <PortfolioCardScroll
            items={PORTFOLIO_ITEMS}
            onClick={handleClick}
            isActive={isActive}
          />
        )}

      </div>

      {/* Cursor-following video preview (desktop only) — outside wrapper to prevent visibility conflicts  */}
      {device === 'desktop' && (
        <CursorVideoPreview
          youtubeId={activePreviewItem?.youtubeId || ''}
          title={activePreviewItem?.title || ''}
          isVisible={hoveredIndex !== null && isActive}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      )}

      {/* Modal */}
      <VideoModal
        item={modalItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
