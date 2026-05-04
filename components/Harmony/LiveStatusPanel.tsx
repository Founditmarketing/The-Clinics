import React from 'react';
import { CLINIC } from '../../data/clinicData';

interface LiveStatusPanelProps {
  isOpenNow: boolean;
  closeLabel: string;
  now: Date;
}

/**
 * Single-clinic adaptation of Harmony's live "Delta map" panel.
 * Renders an editorial illustration of the Cenla / Alexandria area
 * with animated dot, current wait, and next available appointment.
 */
const LiveStatusPanel: React.FC<LiveStatusPanelProps> = ({ isOpenNow, closeLabel, now }) => {
  const wait = isOpenNow ? 14 : 0;
  const waitColor = !isOpenNow ? '#94a3b8' : wait < 15 ? '#22c55e' : wait < 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-3xl opacity-30" style={{ background: 'var(--terracotta-pale)' }} />
      <div
        className="relative bg-white rounded-3xl p-6 lg:p-8 border"
        style={{ borderColor: 'var(--line)', boxShadow: '0 30px 60px -20px rgba(31, 58, 46, 0.15)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="small-whisper" style={{ color: 'var(--terracotta)' }}>
            Live · {CLINIC.region}
          </div>
          <div className="text-[10px] font-mono" style={{ color: 'var(--ink-mute)' }}>
            {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} CST
          </div>
        </div>

        <div className="aspect-[4/3]">
          <svg viewBox="0 0 100 90" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="lsp-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="lsp-dot" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#E8A085" />
                <stop offset="100%" stopColor="#A85F3F" />
              </radialGradient>
            </defs>

            {/* Red River sketch */}
            <path
              d="M 12 8 Q 22 22 28 32 Q 38 42 42 52 Q 50 62 56 72 Q 66 82 78 86"
              stroke="var(--sage-light)"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="0.8 0.8"
              opacity="0.55"
            />

            {/* Surrounding parishes — dotted ring */}
            <g
              stroke="var(--terracotta)"
              strokeWidth="0.3"
              fill="none"
              opacity="0.45"
              strokeDasharray="0.6 1"
            >
              <circle cx="50" cy="48" r="34" />
              <circle cx="50" cy="48" r="22" />
            </g>

            {/* Neighbor towns */}
            {[
              { x: 22, y: 30, label: 'Pineville' },
              { x: 78, y: 32, label: 'Boyce' },
              { x: 30, y: 70, label: 'Ball' },
              { x: 76, y: 66, label: 'Tioga' },
            ].map((t) => (
              <g key={t.label}>
                <circle cx={t.x} cy={t.y} r="0.9" fill="var(--sage)" opacity="0.7" />
                <text
                  x={t.x}
                  y={t.y - 2.5}
                  textAnchor="middle"
                  fontSize="2.2"
                  fontFamily="'JetBrains Mono', monospace"
                  fill="var(--ink-mute)"
                  letterSpacing="0.15"
                >
                  {t.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Clinic — Alexandria */}
            <g style={{ cursor: 'pointer' }}>
              <circle
                cx="50"
                cy="48"
                r="5"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="0.5"
                opacity="0.7"
              >
                <animate attributeName="r" values="3;8;3" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.05;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="48" r="1.8" fill="url(#lsp-dot)" filter="url(#lsp-glow)" />
              <text
                x="50"
                y="42"
                textAnchor="middle"
                fontSize="2.6"
                fontFamily="'JetBrains Mono', monospace"
                fill="var(--terracotta)"
                fontWeight="600"
                letterSpacing="0.18"
              >
                ALEXANDRIA · LA
              </text>
            </g>

            <text
              x="50"
              y="84"
              textAnchor="middle"
              fontSize="1.6"
              fontFamily="'JetBrains Mono', monospace"
              fill="var(--ink-mute)"
              letterSpacing="2.5"
              opacity="0.55"
            >
              CENTRAL LOUISIANA · CENLA
            </text>
          </svg>
        </div>

        <div
          className="mt-4 pt-4 border-t grid grid-cols-2 gap-3"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'var(--ivory-deep)' }}>
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-dot"
                style={{ background: waitColor }}
              />
              <span className="text-xs font-medium truncate" style={{ color: 'var(--forest)' }}>
                {isOpenNow ? 'Open now' : 'Closed'}
              </span>
            </div>
            <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--ink-mute)' }}>
              {isOpenNow ? `~${wait}m` : closeLabel}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg">
            <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--ink-soft)' }}>
              Next available
            </span>
            <span className="text-xs font-mono font-medium" style={{ color: 'var(--terracotta)' }}>
              Tomorrow 9:15a
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusPanel;
