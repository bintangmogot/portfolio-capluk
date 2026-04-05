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
    id: 'color-grade',
    title: 'Color Grading',
    category: 'Post Production',
    description: 'Advanced color science and look development for cinematic storytelling across formats.',
    youtubeId: 't8Uvtf5SLA0',
    icon: Palette,
    position: { top: '50%', left: '68%' },
  },
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
  const smoothPos = useRef({ x: mouseX, y: mouseY });
  const rafRef = useRef<number | null>(null);

  // Smooth lerp animation loop
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, mouseX, 0.12);
      smoothPos.current.y = lerp(smoothPos.current.y, mouseY, 0.12);

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${smoothPos.current.x + 20}px, ${smoothPos.current.y - 140}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

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
      });
    }
  }, [isVisible]);

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
      }}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
        style={{
          border: '1.5px solid #FFD699CC',
          boxShadow: '0 12px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,215,153,0.15), 0 0 30px rgba(255,180,80,0.12)',
        }}
      >
        {/* YouTube embed as live preview with autoplay + sound */}
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
          title={`Preview: ${title}`}
          className="w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-linear-to-t from-black/70 to-transparent">
          <p className="text-white text-[10px] font-heading tracking-widest uppercase opacity-90">{title}</p>
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
        className="flex items-center gap-4 rounded-full px-5 py-3
          hover:bg-white/15 active:scale-[0.96]
          transition-colors duration-300"
        style={{ border: '1.5px solid #FFD699CC' }}
      >
        {/* Play icon — white default, orange on hover */}
        <div
          ref={iconRef}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0
            bg-white/10 border border-white/30
            group-hover:bg-linear-to-br group-hover:from-orange-500/80 group-hover:to-orange-700/80
            group-hover:border-orange-400/40
            transition-all duration-300 mr-4"
        >
          <Play
            size={13}
            className="text-white ml-0.5 group-hover:text-orange-300 transition-colors duration-300"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
        {/* Label */}
        <span className="font-heading text-sm text-white/90 tracking-[0.12em] uppercase whitespace-nowrap
          group-hover:text-white transition-colors duration-300">
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
          active:scale-[0.97]"
        style={{ border: '1.5px solid #FFD699CC' }}
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
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center
                bg-white/15 backdrop-blur-sm border border-white/30
                group-active:bg-orange-500/30 group-active:border-orange-400/40
                transition-all duration-300"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              <Play size={22} className="text-white ml-0.5" fill="white" strokeWidth={0} />
            </div>
          </div>
          {/* Category badge — liquid glass */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1.5
              bg-white/10 backdrop-blur-md rounded-full px-2.5 py-1
              border border-white/20">
              <item.icon size={9} className="text-amber-300 shrink-0" />
              <span className="font-body text-xs text-white/90 leading-none">
                {item.category}
              </span>
            </div>
          </div>
        </div>

        {/* Card details — title + description below the thumbnail */}
        <div className="px-4 py-3.5 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0
                bg-linear-to-br from-orange-500/80 to-orange-700/80 border border-orange-400/40
                shadow-[0_0_10px_rgba(255,140,50,0.25)]"
            >
              <item.icon size={13} className="text-white" />
            </div>
            <h4 className="font-heading text-lg sm:text-xl text-white tracking-widest uppercase truncate">
              {item.title}
            </h4>
          </div>
          <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3">
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
            className="flex flex-col w-full rounded-3xl p-4 pb-8 sm:p-5 md:p-15 md:pt-5"
            style={{ border: '1.5px solid #FFD699CC' }}
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
                bg-black/60 hover:bg-red-500/40 backdrop-blur-md
                flex items-center justify-center transition-all duration-300 cursor-pointer
                border border-white/20 hover:border-red-400/40
                shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{ zIndex: 10000 }}
            >
              <X size={22} className="text-white" />
            </button>

            {/* Header bar */}
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-linear-to-br from-orange-500/80 to-orange-700/80 border border-orange-400/30">
                  <item.icon size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-white text-base sm:text-lg tracking-[0.12em] uppercase">{item.title}</h3>
                  {/* Category badge — liquid glass */}
                  <div className="flex items-center gap-1.5 mt-0.5
                    w-fit bg-white/10 backdrop-blur-md rounded-full px-2 py-0.5
                    border border-white/20">
                    <item.icon size={9} className="text-amber-300 shrink-0" />
                    <span className="font-body text-sm sm:text-base text-white/70">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* YouTube Embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: '16/9',
                boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
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
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

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

      {/* Cursor-following video preview (desktop only) */}
      {device === 'desktop' && (
        <CursorVideoPreview
          youtubeId={hoveredIndex !== null ? PORTFOLIO_ITEMS[hoveredIndex].youtubeId : ''}
          title={hoveredIndex !== null ? PORTFOLIO_ITEMS[hoveredIndex].title : ''}
          isVisible={hoveredIndex !== null}
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
