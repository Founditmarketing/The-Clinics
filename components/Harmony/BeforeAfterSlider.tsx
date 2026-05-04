import React, { useRef, useState } from 'react';

/**
 * Editorial before/after slider — diagnostic clarity.
 * Left: noisy mailed-in EKG strip. Right: clean digital read in-visit.
 * Cool-blue palette to match the rest of the design system.
 */
const BeforeAfterSlider: React.FC = () => {
  const [pos, setPos] = useState(50);
  const dragRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl overflow-hidden cursor-ew-resize select-none"
      style={{ aspectRatio: '16/10', background: 'var(--ivory-deep)' }}
      onMouseDown={() => (dragRef.current = true)}
      onMouseUp={() => (dragRef.current = false)}
      onMouseLeave={() => (dragRef.current = false)}
      onMouseMove={(e) => dragRef.current && handleMove(e.clientX)}
      onTouchStart={() => (dragRef.current = true)}
      onTouchEnd={() => (dragRef.current = false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* AFTER — clean digital read */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f7f3ec 0%, #ede1c8 100%)' }}
      >
        <svg viewBox="0 0 200 125" className="w-full h-full">
          <defs>
            <linearGradient id="ba-clean-grid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#e11b1b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#e11b1b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="200" height="125" fill="url(#ba-clean-grid)" />
          {[20, 40, 60, 80, 100].map((y) => (
            <line key={`h-${y}`} x1="10" x2="190" y1={y} y2={y} stroke="#e11b1b" strokeWidth="0.2" opacity="0.45" />
          ))}
          {[20, 50, 80, 110, 140, 170].map((x) => (
            <line key={`v-${x}`} x1={x} x2={x} y1="20" y2="100" stroke="#e11b1b" strokeWidth="0.2" opacity="0.45" />
          ))}
          <path
            d="M 10 60 L 30 60 L 35 60 L 38 55 L 42 65 L 46 30 L 50 90 L 54 45 L 58 60 L 80 60 L 95 60 L 100 50 L 110 70 L 115 60 L 140 60 L 145 55 L 150 65 L 155 30 L 159 90 L 163 45 L 167 60 L 190 60"
            stroke="#0c1c2e"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontSize="6"
            fontFamily="'JetBrains Mono', monospace"
            fill="#a81313"
            letterSpacing="1"
          >
            DIGITAL EKG · READ IN-VISIT
          </text>
        </svg>
      </div>

      {/* BEFORE — paper strip */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          background: 'linear-gradient(135deg, #f5f0e6 0%, #e8dcc3 100%)',
        }}
      >
        <svg viewBox="0 0 200 125" className="w-full h-full">
          <defs>
            <pattern id="ba-noise" patternUnits="userSpaceOnUse" width="3" height="3">
              <rect width="3" height="3" fill="#f0e6d2" />
              <circle cx="0.5" cy="0.5" r="0.4" fill="#7c5b2c" opacity="0.22" />
              <circle cx="2" cy="2" r="0.3" fill="#604421" opacity="0.18" />
            </pattern>
          </defs>
          <rect width="200" height="125" fill="url(#ba-noise)" />
          <path
            d="M 10 62 L 22 60 L 28 64 L 35 58 L 39 66 L 43 50 L 48 78 L 52 42 L 56 70 L 65 60 L 78 58 L 88 64 L 96 50 L 102 72 L 110 56 L 120 62 L 132 58 L 142 60 L 148 50 L 154 72 L 160 42 L 168 70 L 176 58 L 190 62"
            stroke="#7c5b2c"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontSize="6"
            fontFamily="'JetBrains Mono', monospace"
            fill="#7c5b2c"
            letterSpacing="1"
          >
            PAPER STRIP · MAILED 3 DAYS LATER
          </text>
        </svg>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
        style={{ left: `${pos}%`, background: 'white', boxShadow: '0 0 20px rgba(7,23,45,0.3)' }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl"
        style={{ left: `${pos}%`, boxShadow: '0 8px 24px rgba(7,23,45,0.35)' }}
        onMouseDown={() => (dragRef.current = true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2">
          <path d="M9 5l-7 7 7 7M15 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold pointer-events-none"
        style={{ background: 'rgba(124, 91, 44, 0.95)', color: 'white' }}
      >
        Before
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold pointer-events-none"
        style={{ background: 'rgba(151, 31, 21, 0.95)', color: 'white' }}
      >
        After · same visit
      </div>
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--ink-soft)' }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
