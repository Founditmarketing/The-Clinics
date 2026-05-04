import React from 'react';

const Preloader: React.FC = () => (
  <div
    className="preloader fixed inset-0 z-[100] flex items-center justify-center"
    style={{ background: 'var(--ivory)' }}
  >
    <div className="text-center">
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" className="draw-logo mx-auto mb-6">
        <circle cx="20" cy="20" r="19" stroke="var(--forest)" strokeWidth="1.5" fill="none" />
        <path
          d="M13 14v12M27 14v12M13 20h14"
          stroke="var(--forest)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="20" cy="20" r="2.8" fill="var(--terracotta)" stroke="var(--terracotta)" />
      </svg>
      <div className="font-display text-3xl tracking-tight reveal" style={{ color: 'var(--forest)' }}>
        theCLINICS
      </div>
      <div className="small-whisper mt-2 reveal delay-2" style={{ color: 'var(--ink-mute)' }}>
        Modern healthcare · Cenla
      </div>
    </div>
  </div>
);

export default Preloader;
