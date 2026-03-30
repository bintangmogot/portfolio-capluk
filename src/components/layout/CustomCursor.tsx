'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      el.style.display = 'none';
      return;
    }

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    const onEnterClickable = () => {
      if (!expandedRef.current) {
        expandedRef.current = true;
        el.classList.add('custom-cursor--expand');
      }
    };

    const onLeaveClickable = () => {
      if (expandedRef.current) {
        expandedRef.current = false;
        el.classList.remove('custom-cursor--expand');
      }
    };

    window.addEventListener('mousemove', onMove);

    // Use MutationObserver to handle dynamically added clickable elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-hover').forEach((node) => {
        node.addEventListener('mouseenter', onEnterClickable);
        node.addEventListener('mouseleave', onLeaveClickable);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.body.style.cursor = '';
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
