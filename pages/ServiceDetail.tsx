import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  CheckCircle,
  Clock,
  Eye,
  FlaskConical,
  Heart,
  Monitor,
  Phone,
  Scan,
  Shield,
  Stethoscope,
  Syringe,
  Wind,
  Zap,
} from 'lucide-react';
import { CLINIC, SERVICES, DOCTORS } from '../data/clinicData';
import { ServiceItem } from '../types';
import { Reveal } from '../components/Harmony/i18n';
import { useUI } from '../context/UIContext';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';

const renderIcon = (name: ServiceItem['iconName']) => {
  const props = { size: 28, strokeWidth: 1.5 } as const;
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

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);
  const { openBookingModal, openBookingWithService } = useUI();

  useEffect(() => {
    if (service) document.title = `${service.title} — theCLINICS`;
  }, [service]);

  if (!service) {
    return (
      <section className="hh-page-hero grain">
        <div className="container">
          <h1 className="font-display hh-page-title">Service not found</h1>
          <Link to="/services" className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
            <ArrowLeft size={16} style={{ display: 'inline', marginRight: 4 }} /> Back to services
          </Link>
        </div>
      </section>
    );
  }

  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
  const relatedProviders = DOCTORS.slice(0, 3);

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container">
          <Link to="/services" className="hh-doc-back underline-grow">
            <ArrowLeft size={14} /> Back to services
          </Link>

          <div className="hh-svc-hero-grid">
            <Reveal as="div" className="hh-svc-hero-copy">
              <span className="eyebrow">{service.tagline}</span>
              <h1 className="font-display hh-page-title">
                {service.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="hh-em">
                  {service.title.split(' ').slice(-1)[0].replace(/[()]/g, '')}.
                </span>
              </h1>
              <p className="lead lead-lg">{service.description}</p>
              <div className="hh-svc-actions">
                <button
                  onClick={() => openBookingWithService(service.id)}
                  className="btn btn-terracotta"
                >
                  Book this visit <ArrowRight size={14} />
                </button>
                <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost">
                  <Phone size={16} strokeWidth={1.8} /> {CLINIC.phone}
                </a>
              </div>
            </Reveal>

            <Reveal as="div" delay={120} className="hh-svc-hero-card hh-glass-surface">
              <div className="hh-svc-hero-icon" aria-hidden>
                {renderIcon(service.iconName)}
              </div>
              <span className="small-label">What to expect</span>
              <p className="hh-svc-hero-expect font-display">{service.expect}</p>
              <ul className="hh-svc-hero-bullets">
                {[
                  'Comprehensive evaluation in one visit',
                  'On-site labs and imaging when relevant',
                  'Plain-English review of your results',
                  'Coordinated follow-up by your provider',
                ].map((b) => (
                  <li key={b}>
                    <CheckCircle size={16} strokeWidth={1.8} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hh-svc-content">
        <div className="container hh-svc-content-grid">
          <div className="hh-svc-main">
            <Reveal as="div" className="hh-svc-block">
              <span className="eyebrow">About this service</span>
              <p className="lead">
                {service.description} Our team uses the same equipment, the same protocols, and the
                same standards you would expect in a city hospital, with the speed and continuity of
                a clinic that knows your name.
              </p>
            </Reveal>

            <Reveal as="div" className="hh-svc-block" delay={80}>
              <span className="eyebrow">Common reasons people book</span>
              <ul className="hh-svc-list">
                {[
                  'New-patient evaluation and history review',
                  'Follow-up on a chronic condition or recent test',
                  'Pre-operative clearance from a hospital',
                  'A symptom that needs a structured workup',
                ].map((item, i) => (
                  <li key={i}>
                    <span className="editorial-num">0{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="div" className="hh-svc-block" delay={120}>
              <span className="eyebrow">Our commitment</span>
              <blockquote className="hh-svc-quote font-display">
                We treat every visit like the first one. The room is ready, the chart is read, and
                the answers actually arrive in the same hour.
              </blockquote>
              <div className="small-label" style={{ color: 'var(--terracotta-deep)' }}>
                — theCLINICS care team
              </div>
            </Reveal>
          </div>

          <div className="hh-svc-side">
            <Reveal as="div" className="hh-svc-side-card hh-glass-surface">
              <span className="small-label">Schedule</span>
              <ul className="hh-svc-side-list">
                <li><Clock size={18} strokeWidth={1.8} /> <span>{CLINIC.hoursLabel}</span></li>
                <li><Shield size={18} strokeWidth={1.8} /> <span>Most insurance accepted</span></li>
                <li><Phone size={18} strokeWidth={1.8} /> <a href={`tel:${CLINIC.tel}`} className="font-mono">{CLINIC.phone}</a></li>
              </ul>
              <button
                onClick={() => openBookingWithService(service.id)}
                className="btn btn-terracotta"
                style={{ width: '100%' }}
              >
                Book this visit <ArrowRight size={14} />
              </button>
              <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost" style={{ width: '100%' }}>
                <Phone size={16} strokeWidth={1.8} /> Call to ask
              </a>
            </Reveal>

            <Reveal as="div" delay={120} className="hh-svc-side-providers">
              <span className="small-label">Providers who handle this</span>
              <div className="hh-svc-side-providers-list">
                {relatedProviders.map((p) => (
                  <Link key={p.id} to={`/doctor/${p.id}`} className="hh-svc-side-provider">
                    {p.image ? (
                      <img src={p.image} alt={p.name} />
                    ) : (
                      <div className="hh-svc-side-provider-initials font-display">
                        {p.name.split(' ').filter((s) => /^[A-Z]/.test(s)).slice(-2).map((s) => s[0]).join('')}
                      </div>
                    )}
                    <div>
                      <div className="font-display hh-svc-side-provider-name">{p.name}</div>
                      <div className="small-label">{p.role || p.specialty}</div>
                    </div>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hh-svc-related">
        <div className="container">
          <Reveal as="div" className="hh-section-header hh-section-header-row">
            <div>
              <span className="eyebrow">Other services</span>
              <h2 className="font-display hh-section-title">
                You might also need <span className="hh-em">these.</span>
              </h2>
            </div>
            <Link to="/services" className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
              All services →
            </Link>
          </Reveal>

          <div className="hh-svc-related-grid">
            {relatedServices.map((s) => (
              <Link key={s.id} to={`/service/${s.id}`} className="hh-svc-related-card card-lift">
                <div className="hh-svc-related-icon">{renderIcon(s.iconName)}</div>
                <div>
                  <div className="small-label" style={{ color: 'var(--terracotta-deep)' }}>
                    {s.tagline}
                  </div>
                  <h3 className="font-display hh-svc-related-title">{s.title}</h3>
                  <p className="hh-svc-related-desc">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-page-hero { padding: clamp(2.5rem, 5vw, 4.5rem) 0 clamp(2rem, 4vw, 3rem); }
        .hh-page-title { font-size: clamp(2.4rem, 6vw, 4.4rem); line-height: 1.02; letter-spacing: -0.022em; color: var(--forest-deep); margin: 0; font-weight: 400; }
        .hh-em { color: var(--terracotta-deep); font-style: italic; }

        .hh-doc-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--ink-soft); font-size: 0.9rem; margin-bottom: 1.6rem; }

        .hh-svc-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: clamp(2rem, 4vw, 3rem);
          align-items: start;
        }
        @media (max-width: 980px) { .hh-svc-hero-grid { grid-template-columns: 1fr; } }
        .hh-svc-hero-copy { display: grid; gap: 1rem; }
        .hh-svc-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.4rem; }

        .hh-svc-hero-card { padding: 1.8rem; border-radius: 28px; display: grid; gap: 0.8rem; }
        .hh-svc-hero-icon {
          width: 60px; height: 60px;
          border-radius: 18px;
          background: rgba(56,189,248,0.18);
          color: var(--forest-deep);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hh-svc-hero-expect { font-size: 1.25rem; line-height: 1.2; color: var(--forest-deep); margin: 0; }
        .hh-svc-hero-bullets { list-style: none; padding: 0; margin: 0.6rem 0 0; display: grid; gap: 0.5rem; color: var(--ink-soft); }
        .hh-svc-hero-bullets li { display: grid; grid-template-columns: 22px 1fr; gap: 0.5rem; align-items: start; }
        .hh-svc-hero-bullets svg { color: var(--terracotta-deep); margin-top: 0.18rem; }

        .hh-svc-content {
          padding: clamp(2rem, 4vw, 4rem) 0 clamp(3rem, 5vw, 5rem);
          background: linear-gradient(165deg, var(--ivory-deep), var(--sand-soft));
        }
        .hh-svc-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: clamp(2rem, 4vw, 3rem);
          align-items: start;
        }
        @media (max-width: 980px) { .hh-svc-content-grid { grid-template-columns: 1fr; } }

        .hh-svc-main { display: grid; gap: 1rem; }
        .hh-svc-block {
          padding: 1.4rem 1.6rem;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 20px;
          display: grid;
          gap: 0.7rem;
        }
        .hh-svc-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; color: var(--ink-soft); }
        .hh-svc-list li { display: grid; grid-template-columns: 36px 1fr; gap: 0.5rem; align-items: baseline; }
        .hh-svc-list .editorial-num { color: var(--sage-light); font-size: 1.1rem; }
        .hh-svc-quote {
          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--forest-deep);
          margin: 0;
          padding-left: 1rem;
          border-left: 3px solid var(--terracotta);
        }

        .hh-svc-side { position: sticky; top: 100px; display: grid; gap: 1rem; align-content: start; }
        @media (max-width: 980px) { .hh-svc-side { position: static; } }
        .hh-svc-side-card { padding: 1.4rem; border-radius: 22px; display: grid; gap: 0.8rem; }
        .hh-svc-side-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.6rem; color: var(--ink-soft); font-size: 0.95rem; }
        .hh-svc-side-list li { display: grid; grid-template-columns: 22px 1fr; gap: 0.6rem; align-items: center; }
        .hh-svc-side-list svg { color: var(--forest-deep); }
        .hh-svc-side-list a { color: var(--forest-deep); }

        .hh-svc-side-providers { display: grid; gap: 0.5rem; }
        .hh-svc-side-providers-list { display: grid; gap: 0.4rem; }
        .hh-svc-side-provider {
          display: grid;
          grid-template-columns: 56px 1fr 16px;
          gap: 0.7rem;
          padding: 0.6rem 0.8rem;
          align-items: center;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 14px;
          color: var(--forest-deep);
        }
        .hh-svc-side-provider:hover { background: rgba(255,255,255,0.85); }
        .hh-svc-side-provider img { width: 56px; height: 56px; border-radius: 999px; object-fit: cover; }
        .hh-svc-side-provider-initials { width: 56px; height: 56px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: var(--ivory-deep); color: var(--forest-deep); font-size: 1.05rem; }
        .hh-svc-side-provider-name { font-size: 0.95rem; line-height: 1.1; }

        .hh-svc-related { padding: clamp(3rem, 5vw, 5rem) 0; }
        .hh-section-header-row { display: flex; align-items: end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .hh-section-title { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.05; color: var(--forest-deep); margin: 0; font-weight: 400; }

        .hh-svc-related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 1.6rem; }
        @media (max-width: 720px) { .hh-svc-related-grid { grid-template-columns: 1fr; } }
        .hh-svc-related-card {
          padding: 1.4rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 22px;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 0.9rem;
          align-items: start;
        }
        .hh-svc-related-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(56,189,248,0.18);
          color: var(--forest-deep);
        }
        .hh-svc-related-title { font-size: 1.1rem; color: var(--forest-deep); margin: 0.2rem 0 0.4rem; line-height: 1.1; }
        .hh-svc-related-desc { color: var(--ink-soft); font-size: 0.92rem; line-height: 1.5; margin: 0; }
      `}</style>
    </>
  );
};

export default ServiceDetail;
