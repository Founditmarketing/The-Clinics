import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from './i18n';

const CursorDot: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = dotRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const target = e.target as Element | null;
      const isLink =
        target instanceof Element &&
        target.closest("a, button, [role='button'], input, select, textarea");
      el.classList.toggle('is-link', Boolean(isLink));
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  if (reduced) return null;
  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

export default CursorDot;
