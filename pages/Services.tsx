import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  ChevronDown,
  Clock,
  Eye,
  FlaskConical,
  Heart,
  Monitor,
  Phone,
  Scan,
  Stethoscope,
  Syringe,
  Wind,
  Zap,
} from 'lucide-react';
import { CLINIC, SERVICES, INSURANCE_PLANS } from '../data/clinicData';
import { ServiceItem } from '../types';
import { Reveal, useLocale } from '../components/Harmony/i18n';
import { useUI } from '../context/UIContext';
import InsuranceChecker from '../components/Harmony/InsuranceChecker';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';

const renderIcon = (name: ServiceItem['iconName'], size = 18) => {
  const props = { size, strokeWidth: 1.6 } as const;
  switch (name) {
    case 'Stethoscope': return <Stethoscope {...props} />;
    case 'Heart':       return <Heart {...props} />;
    case 'Activity':    return <Activity {...props} />;
    case 'Clock':       return <Clock {...props} />;
    case 'Bone':        return <Bone {...props} />;
    case 'Wind':        return <Wind {...props} />;
    case 'Zap':         return <Zap {...props} />;
    case 'Scan':        return <Scan {...props} />;
    case 'Monitor':     return <Monitor {...props} />;
    case 'Lab':         return <FlaskConical {...props} />;
    case 'Baby':        return <Baby {...props} />;
    case 'Brain':       return <Brain {...props} />;
    case 'Eye':         return <Eye {...props} />;
    case 'Syringe':     return <Syringe {...props} />;
    default:            return <ArrowRight {...props} />;
  }
};

const Services: React.FC = () => {
  const { openBookingModal } = useUI();
  const { t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h1 className="font-display hh-page-title">
              Twelve services. <br />
              <span className="hh-em">One Bolton Avenue.</span> <br />
              No referrals to drive across town.
            </h1>
            <p className="lead lead-lg">
              From annual physicals to cardiac diagnostics, in-house labs, and X-ray. Same provider,
              same visit, same answers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hh-services-table-section">
        <div className="container">
          <ul className="hh-services-table" role="list">
            {SERVICES.map((s, i) => {
              const isOpen = openId === s.id;
              const isFeatured = s.feature;
              return (
                <li
                  key={s.id}
                  className={`hh-service-row ${isFeatured ? 'is-featured' : ''} ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    className="hh-service-row-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="editorial-num hh-service-row-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hh-service-row-icon" aria-hidden>
                      {renderIcon(s.iconName)}
                    </span>
                    <span className="hh-service-row-title font-display">{s.title}</span>
                    <span className="hh-service-row-tagline">{s.tagline}</span>
                    <span className="hh-service-row-expect small-label">{s.expect}</span>
                    <span className="hh-service-row-toggle">
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 240ms ease',
                        }}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="hh-service-row-detail fade-in">
                      <p className="hh-service-row-desc">{s.description}</p>
                      <div className="hh-service-row-actions">
                        <button onClick={openBookingModal} className="btn btn-primary">
                          Book {s.title.toLowerCase()} <ArrowRight size={14} />
                        </button>
                        <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost">
                          <Phone size={16} strokeWidth={1.8} /> Call to ask
                        </a>
                        <Link
                          to={`/service/${s.id}`}
                          className="underline-grow"
                          style={{ color: 'var(--forest-deep)', alignSelf: 'center' }}
                        >
                          Read full overview →
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Don't see what you need band */}
      <section className="hh-services-call">
        <div className="container hh-services-call-grid">
          <div>
            <h2 className="font-display hh-services-call-title">
              Don&rsquo;t see what you need?
            </h2>
            <p className="hh-services-call-lead">
              Call us. We likely cover it, or we&rsquo;ll route you to a partner who does.
            </p>
          </div>
          <a href={`tel:${CLINIC.tel}`} className="hh-services-call-phone font-mono">
            {CLINIC.phone}
          </a>
        </div>
      </section>

      <InsuranceChecker t={t} plans={INSURANCE_PLANS as any} callTel={CLINIC.tel} />

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-page-hero {
          padding-block: clamp(3.5rem, 6vw, 6rem) clamp(2.5rem, 4vw, 4rem);
        }
        .hh-page-title {
          font-size: var(--type-h1);
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-page-title .hh-em { color: var(--terracotta-deep); font-style: italic; }

        .hh-services-table-section {
          padding-block: 0 var(--space-section);
        }
        .hh-services-table {
          list-style: none;
          padding: 0;
          margin: 0;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        .hh-service-row { border-top: 1px solid var(--line); }
        .hh-service-row:first-child { border-top: none; }
        .hh-service-row.is-featured { background: rgba(225, 27, 27,0.06); }
        .hh-service-row.is-open { background: rgba(255,255,255,0.85); }

        .hh-service-row-btn {
          width: 100%;
          display: grid;
          grid-template-columns: 56px 44px minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1.2fr) 24px;
          align-items: center;
          gap: 1.2rem;
          padding: 1.2rem 1.6rem;
          background: none;
          border: none;
          text-align: left;
          font: inherit;
          color: inherit;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .hh-service-row-btn:hover { background: rgba(255,255,255,0.65); }
        .hh-service-row.is-open .hh-service-row-btn:hover { background: transparent; }
        .hh-service-row-num { color: var(--sage-light); font-size: 1.5rem; }
        .hh-service-row.is-open .hh-service-row-num { color: var(--terracotta-deep); }
        .hh-service-row-icon {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: rgba(225, 27, 27,0.10);
          color: var(--forest-deep);
        }
        .hh-service-row-title { font-size: 1.1rem; color: var(--forest-deep); line-height: 1.1; letter-spacing: -0.01em; }
        .hh-service-row-tagline { font-style: italic; color: var(--ink-soft); font-size: 0.95rem; }
        .hh-service-row-expect {
          color: var(--ink-mute);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
        }
        .hh-service-row-toggle { color: var(--forest-deep); justify-self: end; }

        @media (max-width: 880px) {
          .hh-service-row-btn {
            grid-template-columns: 36px 36px 1fr 24px;
            row-gap: 0.4rem;
            padding: 1rem 1.1rem;
          }
          .hh-service-row-tagline,
          .hh-service-row-expect {
            grid-column: 3;
            font-size: 0.78rem;
          }
        }

        .hh-service-row-detail {
          padding: 0 1.6rem 1.6rem 6.4rem;
          display: grid;
          gap: 1rem;
        }
        @media (max-width: 880px) {
          .hh-service-row-detail { padding: 0 1.1rem 1.4rem; }
        }
        .hh-service-row-desc { color: var(--ink-soft); line-height: 1.6; max-width: 70ch; margin: 0; }
        .hh-service-row-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

        .hh-services-call {
          padding-block: clamp(2.8rem, 4.5vw, 4rem);
          background: var(--forest-deep);
          color: var(--bone);
        }
        .hh-services-call-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .hh-services-call-title {
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          line-height: 1.05;
          color: var(--bone);
          margin: 0;
        }
        .hh-services-call-lead { color: var(--sage-light); margin: 0.5rem 0 0; max-width: 50ch; }
        .hh-services-call-phone {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: var(--terracotta-pale);
          letter-spacing: 0.02em;
        }

        .hh-em { color: var(--terracotta-deep); font-style: italic; }
      `}</style>
    </>
  );
};

export default Services;
