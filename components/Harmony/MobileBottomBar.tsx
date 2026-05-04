import React, { useState } from 'react';
import { CLINIC } from '../../data/clinicData';

interface MobileBottomBarProps {
  onBook: () => void;
}

const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onBook }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 rounded-full shadow-2xl flex overflow-hidden"
        style={{ background: 'var(--forest)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)' }}
      >
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-4 text-sm font-medium flex items-center justify-center gap-2"
          style={{ color: 'var(--ivory)' }}
          aria-label="Quick actions"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <a
          href={`tel:${CLINIC.tel}`}
          className="flex-1 px-5 py-4 text-center text-sm font-medium flex items-center justify-center gap-2"
          style={{ color: 'var(--ivory)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Call
        </a>
        <button
          onClick={onBook}
          className="px-5 py-4 text-sm font-medium flex items-center gap-2"
          style={{ background: 'var(--terracotta)', color: 'var(--ivory)' }}
        >
          Book →
        </button>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex items-end fade-in"
          onClick={() => setOpen(false)}
          style={{ background: 'rgba(0,0,0,0.5)' }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full bg-white rounded-t-3xl slide-up p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ background: 'var(--line-strong)' }} />
            <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
              Quick actions
            </div>
            <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--forest)' }}>
              How can we help?
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${CLINIC.tel}`}
                className="flex items-center justify-between p-4 rounded-2xl border"
                style={{ borderColor: 'var(--line)' }}
              >
                <div>
                  <div className="font-display text-base" style={{ color: 'var(--forest)' }}>
                    Call {CLINIC.name.split(' · ')[1] ?? 'theCLINICS'}
                  </div>
                  <div className="text-xs font-mono mt-1" style={{ color: 'var(--terracotta)' }}>
                    {CLINIC.phone}
                  </div>
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--forest)"
                  strokeWidth="2"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setOpen(false);
                    onBook();
                  }}
                  className="p-4 rounded-2xl text-center"
                  style={{ background: 'var(--forest)', color: 'var(--ivory)' }}
                >
                  <div className="font-display text-base">Book</div>
                  <div className="text-xs opacity-80 mt-1">Request appointment</div>
                </button>
                <a
                  href="#symptom"
                  onClick={() => setOpen(false)}
                  className="p-4 rounded-2xl text-center"
                  style={{ background: 'var(--terracotta)', color: 'var(--ivory)' }}
                >
                  <div className="font-display text-base">Symptom check</div>
                  <div className="text-xs opacity-80 mt-1">AI care guide</div>
                </a>
              </div>
              <a
                href={CLINIC.patientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border"
                style={{ borderColor: 'var(--line)' }}
              >
                <div>
                  <div className="font-display text-base" style={{ color: 'var(--forest)' }}>
                    Patient Portal
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>
                    Records · Refills · Messages
                  </div>
                </div>
                <span className="text-xs" style={{ color: 'var(--terracotta)' }}>
                  ↗
                </span>
              </a>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-6 py-3 text-sm"
              style={{ color: 'var(--ink-mute)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomBar;
