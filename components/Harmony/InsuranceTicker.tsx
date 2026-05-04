import React from 'react';
import { INSURANCE_CARRIERS } from '../../data/clinicData';

const InsuranceTicker: React.FC = () => (
  <section
    className="py-5 border-y overflow-hidden"
    style={{ borderColor: 'var(--line)', background: 'var(--ivory-deep)' }}
    aria-label="Accepted insurance carriers"
  >
    <div className="flex items-center gap-12 ticker-track whitespace-nowrap">
      {[0, 1].map((idx) => (
        <div
          key={idx}
          className="flex items-center gap-12 text-sm shrink-0"
          style={{ color: 'var(--ink-soft)' }}
          aria-hidden={idx === 1}
        >
          <span
            className="text-xs uppercase tracking-[0.25em] font-semibold shrink-0"
            style={{ color: 'var(--forest)' }}
          >
            In-network
          </span>
          {INSURANCE_CARRIERS.map((ins) => (
            <React.Fragment key={`${idx}-${ins}`}>
              <span className="font-display italic shrink-0">{ins}</span>
              <span style={{ color: 'var(--gold)' }} className="shrink-0">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default InsuranceTicker;
