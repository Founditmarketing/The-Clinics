import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Clock,
  Eye,
  FlaskConical,
  Heart,
  MapPin,
  Monitor,
  Phone,
  Scan,
  Shield,
  Stethoscope,
  Syringe,
  Wind,
  Zap,
} from 'lucide-react';

import { useUI } from '../context/UIContext';
import {
  CLINIC,
  DOCTORS,
  LOCATIONS,
  PROVIDER_COUNT,
  SERVICES,
  TESTIMONIALS,
} from '../data/clinicData';
import { Doctor, ServiceItem } from '../types';

import StatCounter from '../components/Harmony/StatCounter';
import DoctorModal from '../components/Harmony/DoctorModal';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';
import LocationsMap from '../components/Harmony/LocationsMap';
import { useClinicStatus } from '../components/Harmony/useClinicStatus';
import { useLocale, Reveal } from '../components/Harmony/i18n';

const renderServiceIcon = (name: ServiceItem['iconName'], size = 22) => {
  const props = { size, strokeWidth: 1.5 } as const;
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

const initialsFor = (name: string) =>
  name
    .split(' ')
    .filter((s) => /^[A-Z]/.test(s))
    .slice(-2)
    .map((s) => s[0])
    .join('');

const Home: React.FC = () => {
  const { openBookingModal, openBookingWithDoctor } = useUI();
  const { t } = useLocale();
  const { now, isOpenNow, greeting, closeLabel } = useClinicStatus();

  const heroRef = useRef<HTMLElement | null>(null);

  const [openProvider, setOpenProvider] = useState<Doctor | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const tid = window.setTimeout(() => setHeroVisible(true), 350);
    return () => window.clearTimeout(tid);
  }, []);

  useEffect(() => {
    const id = window.setInterval(
      () => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (openProvider) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openProvider]);

  const heroFeatured = SERVICES.find((s) => s.feature);
  const restServices = SERVICES.filter((s) => !s.feature).slice(0, 4);

  const intentCards = [
    { key: 'primary',     copy: t.intent.primary,     icon: <Stethoscope size={26} strokeWidth={1.5} /> },
    { key: 'sick',        copy: t.intent.sick,        icon: <Zap size={26} strokeWidth={1.5} /> },
    { key: 'pediatrics',  copy: t.intent.pediatrics,  icon: <Baby size={26} strokeWidth={1.5} /> },
  ];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} id="top" className="hh-hero grain">
        <div className="hh-hero-bg" aria-hidden>
          <div className="hh-hero-orb hh-orb-a" />
          <div className="hh-hero-orb hh-orb-b" />
        </div>

        <div className="container hh-hero-grid">
          <div className="hh-hero-copy">
            <Reveal as="span" className="eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--terracotta-deep)' }} />
              {greeting}, Cenla
            </Reveal>

            <h1 className="font-display hh-hero-headline">
              <span className="word-rise-stage"><span style={{ animationDelay: '0.05s' }}>Comprehensive</span></span>{' '}
              <span className="word-rise-stage"><span className="hh-hero-em" style={{ animationDelay: '0.18s' }}>care.</span></span>
              <br />
              <span className="word-rise-stage"><span style={{ animationDelay: '0.48s' }}>Built for</span></span>{' '}
              <span className="word-rise-stage hh-hero-place">
                <span style={{ animationDelay: '0.62s' }}>Cenla.</span>
              </span>
            </h1>

            <Reveal as="p" className="lead lead-lg hh-hero-lead" delay={400}>
              {t.hero.lead}
            </Reveal>

            <Reveal as="div" className="hh-hero-actions" delay={550}>
              <button onClick={openBookingModal} className="btn btn-terracotta btn-lg">
                {t.hero.cta_primary}
                <ArrowRight size={18} />
              </button>
              <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost btn-lg">
                <Phone size={16} strokeWidth={1.8} />
                <span className="font-mono">{CLINIC.phone}</span>
              </a>
            </Reveal>
          </div>

          <Reveal as="div" className="hh-hero-frame" delay={250}>
            <div className="hh-hero-image-wrap">
              <img
                src="/largeclinicshospitalpic.jpeg"
                alt="theCLINICS in Cenla, Louisiana"
                className="hh-hero-image"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="hh-hero-frame-overlay">
                <div className={`tag ${isOpenNow ? 'tag-live' : 'tag-closed'}`}>
                  {isOpenNow ? `${t.locations.open_now}, closing in ${closeLabel}` : `${t.locations.closed_now}, opens ${closeLabel}`}
                </div>
                <div className="font-mono small-label">
                  {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} CST
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero footer band — stats + portal CTA */}
        <div className="container hh-hero-footer">
          <div className="hh-hero-stats">
            <div>
              <div className="hh-hero-stat-num font-display">
                <StatCounter target={PROVIDER_COUNT} trigger={heroVisible} />
              </div>
              <div className="small-label">{t.hero.stats_providers}</div>
            </div>
            <div>
              <div className="hh-hero-stat-num font-display">
                <StatCounter target={LOCATIONS.length} trigger={heroVisible} />
              </div>
              <div className="small-label">{t.hero.stats_locations}</div>
            </div>
            <div>
              <div className="hh-hero-stat-num font-display">
                <StatCounter target={CLINIC.rating} decimals={1} trigger={heroVisible} />
                <span style={{ color: 'var(--terracotta-deep)' }}>★</span>
              </div>
              <div className="small-label">patient rating</div>
            </div>
          </div>

          <div className="hh-hero-next hh-glass-surface">
            <div>
              <div className="small-label">{t.hero.proof_title}</div>
              <div className="font-display hh-hero-next-title">
                {t.hero.proof_loc}
                <span className="hh-hero-next-time font-mono">{t.hero.proof_time}</span>
              </div>
            </div>
            <button onClick={openBookingModal} className="btn btn-primary hh-hero-next-cta">
              Request <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== INTENT GRID ==================== */}
      <section className="hh-intent hh-section-tight" id="intent">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">{t.intent.eyebrow}</span>
            <h2 className="font-display hh-section-title">{t.intent.title}</h2>
          </Reveal>

          <div className="hh-intent-grid">
            {intentCards.map((card, i) => (
              <Reveal as="div" key={card.key} delay={120 * i} className="hh-intent-card">
                <div className="hh-intent-icon" aria-hidden>
                  {card.icon}
                </div>
                <h3 className="font-display hh-intent-title">{card.copy.t}</h3>
                <p className="hh-intent-desc">{card.copy.d}</p>
                <button onClick={openBookingModal} className="hh-intent-cta">
                  {card.copy.cta} <ArrowRight size={14} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="hh-section">
        <div className="container">
          <Reveal as="div" className="hh-section-header hh-section-header-row">
            <div>
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2 className="font-display hh-section-title">
                {t.services.title_a} <span className="hh-em">{t.services.title_em}</span>
                {t.services.title_b}
              </h2>
              <p className="lead hh-section-lead">{t.services.lead}</p>
            </div>
            <Link to="/services" className="underline-grow hh-section-link">
              {t.services.all} →
            </Link>
          </Reveal>

          <div className="hh-services-stack">
            {heroFeatured && (
              <Reveal as="div" className="hh-service-feature card-lift">
                <div className="hh-service-feature-image">
                  <img
                    src="/clinicsdoctor.png"
                    alt="theCLINICS primary care"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1666214280165-c0bcc1c4b78f?auto=format&fit=crop&w=1100&q=80';
                    }}
                  />
                  <div className="hh-service-feature-tag">Featured · Most visits</div>
                </div>
                <div className="hh-service-feature-body">
                  <span className="small-label" style={{ color: 'var(--terracotta-deep)' }}>
                    {heroFeatured.tagline}
                  </span>
                  <h3 className="font-display hh-service-title-lg">{heroFeatured.title}</h3>
                  <p className="hh-service-desc">{heroFeatured.description}</p>
                  <div className="hh-service-expect">
                    <div className="small-label">What to expect</div>
                    <div className="hh-service-expect-text">{heroFeatured.expect}</div>
                  </div>
                  <div className="hh-service-feature-actions">
                    <button onClick={openBookingModal} className="btn btn-primary">
                      Request a primary care visit
                      <ArrowRight size={14} />
                    </button>
                    <Link to={`/service/${heroFeatured.id}`} className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
                      Read more →
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            <div className="hh-services-row">
              {restServices.map((s, i) => (
                <Reveal as="div" key={s.id} delay={80 * i} className="hh-service-card card-lift">
                  <div className="hh-service-card-head">
                    <div className="hh-service-icon" aria-hidden>
                      {renderServiceIcon(s.iconName, 22)}
                    </div>
                    <div className="editorial-num hh-service-num">0{i + 2}</div>
                  </div>
                  <span className="small-label hh-service-tagline">{s.tagline}</span>
                  <h3 className="font-display hh-service-title">{s.title}</h3>
                  <p className="hh-service-desc-sm">{s.description}</p>
                  <div className="hh-service-foot">
                    <span className="small-label">{s.expect}</span>
                    <button onClick={openBookingModal} className="hh-service-link">
                      Book →
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* ==================== TEAM (compact strip) ==================== */}
      <section id="team" className="hh-team hh-section-tight">
        <div className="container">
          <div className="hh-team-strip">
            <Reveal as="div" className="hh-team-strip-copy">
              <span className="eyebrow">{t.team.eyebrow}</span>
              <h2 className="font-display hh-team-strip-title">
                {PROVIDER_COUNT} providers, <span className="hh-em">two clinics in Cenla.</span>
              </h2>
              <p className="hh-team-strip-lead">{t.team.lead}</p>
              <Link to="/about" className="btn btn-ghost hh-team-strip-cta">
                Meet the team <ArrowRight size={14} />
              </Link>
            </Reveal>

            <Reveal as="div" delay={120} className="hh-team-strip-side">
              <div className="hh-avatar-row" role="list">
                {DOCTORS.slice(0, 5).map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setOpenProvider(p)}
                    className="hh-avatar"
                    style={{ zIndex: 5 - i }}
                    aria-label={`${p.name} — ${p.role ?? p.specialty}`}
                  >
                    {p.image ? (
                      <img src={p.image} alt="" loading="lazy" />
                    ) : (
                      <span className="hh-avatar-initials font-display">
                        {initialsFor(p.name)}
                      </span>
                    )}
                  </button>
                ))}
                {PROVIDER_COUNT > 5 && (
                  <Link to="/about" className="hh-avatar hh-avatar-more font-display">
                    +{PROVIDER_COUNT - 5}
                  </Link>
                )}
              </div>
              <div className="hh-team-strip-meta">
                <span className="hh-team-strip-pill">
                  <span className="hh-team-strip-dot" aria-hidden />
                  All accepting new patients
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== LOCATION + MAP ==================== */}
      <section id="location" className="hh-location hh-section">
        <div className="container">
          <Reveal as="div" className="hh-section-header hh-section-header-row">
            <div>
              <span className="eyebrow">{t.locations.eyebrow}</span>
              <h2 className="font-display hh-section-title">
                {t.locations.title_a} <span className="hh-em">{t.locations.title_em}</span>{' '}
                {t.locations.title_b}
              </h2>
              <p className="lead hh-section-lead">{t.locations.lead}</p>
            </div>
            <div className="font-mono small-label hh-section-meta">
              Updated {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} CST
            </div>
          </Reveal>

          <div className="hh-location-grid">
            <div className="hh-location-cards">
              {LOCATIONS.map((loc, i) => (
                <Reveal as="div" key={loc.key} delay={i * 100} className="hh-location-card hh-glass-surface">
                  <div className="hh-location-card-row">
                    <span className={`tag ${isOpenNow ? 'tag-live' : 'tag-closed'}`}>
                      {isOpenNow ? t.locations.open_now : t.locations.closed_now}
                    </span>
                    {loc.flagship && (
                      <span className="small-label">Flagship</span>
                    )}
                  </div>
                  <h3 className="font-display hh-location-title">
                    {loc.city}, {loc.state}
                  </h3>
                  <div className="hh-location-meta">
                    <div>
                      <div className="small-label">Address</div>
                      <div>{loc.address}</div>
                    </div>
                    <div>
                      <div className="small-label">Phone</div>
                      <a href={`tel:${loc.tel}`} className="font-mono">
                        {loc.phone}
                      </a>
                    </div>
                    <div>
                      <div className="small-label">Hours</div>
                      <div>{loc.hoursLabel}</div>
                    </div>
                  </div>

                  <div className="hh-location-actions">
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <MapPin size={16} strokeWidth={1.8} /> {t.locations.directions}
                    </a>
                    <a href={`tel:${loc.tel}`} className="btn btn-primary">
                      <Phone size={16} strokeWidth={1.8} /> {t.locations.call}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="hh-location-map">
              <LocationsMap
                locations={LOCATIONS.map((l) => ({
                  key: l.key,
                  name: l.city,
                  coords: l.coords,
                }))}
                activeKey={LOCATIONS[0]?.key}
                center={[LOCATIONS[0]?.coords.lng ?? -92.4693, LOCATIONS[0]?.coords.lat ?? 31.3146]}
                zoom={10.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="hh-reviews hh-section grain">
        <div className="container">
          <Reveal as="div" className="hh-section-header hh-section-header-row">
            <div>
              <span className="eyebrow">{t.reviews.eyebrow}</span>
              <h2 className="font-display hh-section-title">
                {t.reviews.title_a} <span className="hh-em">{t.reviews.title_em}</span>
                {t.reviews.title_b}
              </h2>
            </div>
            <div className="hh-reviews-summary">
              <div>
                <div className="font-display hh-reviews-num">{CLINIC.rating}</div>
                <div className="hh-reviews-stars">{'★★★★★'}</div>
              </div>
              <div>
                <div className="small-label">Average across</div>
                <div className="hh-reviews-source">
                  Verified Google reviews
                </div>
                <a
                  href={CLINIC.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                  style={{ color: 'var(--terracotta-deep)' }}
                >
                  {t.reviews.readmore} →
                </a>
              </div>
            </div>
          </Reveal>

          <div className="hh-reviews-grid">
            <div className="hh-review-feature hh-glass-surface">
              <svg
                width="48"
                height="36"
                viewBox="0 0 32 24"
                fill="var(--terracotta-deep)"
                opacity="0.5"
                aria-hidden
              >
                <path d="M0 24V12C0 5.4 5.4 0 12 0v4c-4.4 0-8 3.6-8 8h8v12H0zm20 0V12c0-6.6 5.4-12 12-12v4c-4.4 0-8 3.6-8 8h8v12H20z" />
              </svg>
              <p className="font-display hh-review-feature-quote">
                &ldquo;{TESTIMONIALS[activeTestimonial].q}&rdquo;
              </p>
              <div className="hh-review-feature-meta">
                <div>
                  <div className="font-display hh-review-feature-name">
                    {TESTIMONIALS[activeTestimonial].n}
                  </div>
                  <div className="small-label">
                    {TESTIMONIALS[activeTestimonial].l} · {TESTIMONIALS[activeTestimonial].visit}
                  </div>
                </div>
                <div className="hh-review-stars">{'★★★★★'}</div>
              </div>
              <div className="hh-review-feature-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`hh-review-dot ${i === activeTestimonial ? 'is-active' : ''}`}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hh-reviews-col">
              {TESTIMONIALS.slice(1, 4).map((tx) => (
                <div key={tx.n} className="hh-review-card card-lift">
                  <div className="hh-review-card-row">
                    <div className="hh-review-stars">{'★★★★★'}</div>
                    <div className="small-label">{tx.visit}</div>
                  </div>
                  <p className="font-display hh-review-quote">&ldquo;{tx.q}&rdquo;</p>
                  <div className="hh-review-meta">
                    <div className="hh-review-name">{tx.n}</div>
                    <div className="small-label">{tx.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="hh-cta hh-section-tight">
        <div className="container">
          <div className="hh-cta-card">
            <span className="eyebrow eyebrow-light">{t.cta.eyebrow}</span>
            <h2 className="font-display hh-cta-title">
              {t.cta.title_a} <span className="hh-cta-em">{t.cta.title_em}</span>
              {t.cta.title_b}
            </h2>
            <p className="hh-cta-lead">{t.cta.lead}</p>
            <div className="hh-cta-actions">
              <button onClick={openBookingModal} className="btn btn-terracotta btn-lg">
                {t.cta.btn_a}
                <ArrowRight size={18} />
              </button>
              <a
                href={CLINIC.patientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light btn-lg"
              >
                {t.cta.btn_b} ↗
              </a>
            </div>
            <div className="hh-cta-trust">
              <Shield size={14} strokeWidth={1.8} />
              <span>HIPAA-compliant request · We call within 1 business hour</span>
            </div>
          </div>
        </div>
      </section>

      <DoctorModal
        doctor={openProvider}
        onClose={() => setOpenProvider(null)}
        onBook={(id) => openBookingWithDoctor(id)}
      />

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        /* ============= HERO ============= */
        .hh-hero {
          position: relative;
          padding-block: clamp(2.4rem, 5vw, 5.5rem) clamp(2rem, 4vw, 4rem);
          overflow: hidden;
        }
        .hh-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .hh-hero-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.55;
          mix-blend-mode: screen;
        }
        .hh-orb-a { top: -160px; right: -120px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(251, 218, 218,0.62), transparent 70%); }
        .hh-orb-b { bottom: -180px; left: -120px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(237,225,200,0.5), transparent 70%); animation: drift 16s ease-in-out infinite; }

        .hh-hero-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
          padding-block: clamp(1rem, 3vw, 2rem);
        }
        @media (max-width: 980px) { .hh-hero-grid { grid-template-columns: 1fr; gap: 2rem; } }

        .hh-hero-copy { display: grid; gap: clamp(1.4rem, 2.4vw, 2.2rem); max-width: 640px; }
        .hh-hero-headline {
          font-size: var(--type-hero);
          line-height: 0.96;
          letter-spacing: -0.03em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-hero-em { color: var(--forest); }
        .hh-hero-place { color: var(--terracotta-deep); }

        .hh-hero-lead { color: var(--ink-soft); max-width: 52ch; }

        .hh-hero-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; }

        /* hero right column */
        .hh-hero-frame {
          position: relative;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: var(--ivory-deep);
          box-shadow: var(--shadow-strong);
        }
        @media (max-width: 980px) { .hh-hero-frame { aspect-ratio: 16 / 11; } }
        .hh-hero-image-wrap { position: relative; width: 100%; height: 100%; }
        .hh-hero-image { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hh-hero-frame-overlay {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.7rem 0.95rem;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.6);
          color: var(--forest-deep);
        }
        .hh-hero-frame-overlay .small-label { color: var(--ink-mute); }

        /* hero footer band */
        .hh-hero-footer {
          margin-top: clamp(2rem, 3.5vw, 3.2rem);
          padding-top: clamp(1.6rem, 3vw, 2.4rem);
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(1.4rem, 3vw, 3rem);
          align-items: center;
        }
        @media (max-width: 980px) { .hh-hero-footer { grid-template-columns: 1fr; } }

        .hh-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, auto);
          justify-content: start;
          gap: clamp(1.4rem, 4vw, 3.6rem);
        }
        @media (max-width: 600px) { .hh-hero-stats { grid-template-columns: repeat(3, 1fr); gap: 0.8rem; } }
        .hh-hero-stat-num {
          font-size: clamp(1.6rem, 3.4vw, 2.6rem);
          line-height: 1;
          color: var(--forest-deep);
          display: flex;
          align-items: baseline;
          gap: 0.1em;
          letter-spacing: -0.015em;
        }
        .hh-hero-stats .small-label { margin-top: 0.45rem; color: var(--ink-mute); display: block; }

        .hh-hero-next {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.2rem;
          align-items: center;
          padding: 0.9rem 1.1rem;
          border-radius: var(--radius-lg);
          min-width: 0;
        }
        @media (max-width: 600px) { .hh-hero-next { grid-template-columns: 1fr; gap: 0.7rem; } }
        .hh-hero-next-title {
          font-size: 1.18rem;
          color: var(--forest-deep);
          margin: 0.3rem 0 0;
          line-height: 1.1;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.6rem;
        }
        .hh-hero-next-time { color: var(--terracotta-deep); font-size: 0.92rem; }
        .hh-hero-next-cta { padding: 0.65rem 1.1rem; min-height: 0; }

        /* ============= SECTION HEADER ============= */
        .hh-section-header {
          display: grid;
          gap: 0.9rem;
          margin-bottom: clamp(2rem, 3.5vw, 3rem);
          max-width: 60ch;
        }
        .hh-section-header-row {
          max-width: none;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .hh-section-header-row > div { display: grid; gap: 0.9rem; max-width: 60ch; }
        .hh-section-header-center { text-align: center; margin-left: auto; margin-right: auto; }
        .hh-section-title {
          font-size: var(--type-h2);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-em { color: var(--terracotta-deep); font-style: italic; font-weight: 400; }
        .hh-section-lead { margin-top: 0.2rem; }
        .hh-section-link { color: var(--forest-deep); align-self: flex-end; }
        .hh-section-meta { color: var(--ink-mute); }

        /* ============= INTENT GRID ============= */
        .hh-intent-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 1.6vw, 1.4rem);
        }
        @media (max-width: 880px) { .hh-intent-grid { grid-template-columns: 1fr; } }
        .hh-intent-card {
          padding: clamp(1.5rem, 2.5vw, 2rem);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(18px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: var(--radius-xl);
          box-shadow: var(--glass-inner), var(--glass-shadow);
          display: grid;
          gap: 0.9rem;
          align-content: start;
        }
        .hh-intent-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: rgba(225, 27, 27,0.12);
          color: var(--terracotta-deep);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hh-intent-title { font-size: var(--type-h3); color: var(--forest-deep); margin: 0; line-height: 1.1; }
        .hh-intent-desc { color: var(--ink-soft); line-height: 1.65; margin: 0; }
        .hh-intent-cta {
          margin-top: 0.4rem;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0;
          background: none;
          border: none;
          color: var(--forest-deep);
          font: inherit;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 1px solid currentColor;
        }

        /* ============= SERVICES ============= */
        .hh-services-stack { display: grid; gap: clamp(1rem, 2vw, 1.4rem); }
        .hh-service-feature {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.65);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        @media (max-width: 880px) { .hh-service-feature { grid-template-columns: 1fr; } }
        .hh-service-feature-image { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        @media (max-width: 880px) { .hh-service-feature-image { aspect-ratio: 16/10; } }
        .hh-service-feature-image img { width: 100%; height: 100%; object-fit: cover; }
        .hh-service-feature-tag {
          position: absolute; top: 1rem; left: 1rem;
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          background: var(--gold);
          color: var(--forest-deep);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hh-service-feature-body {
          padding: clamp(1.6rem, 3vw, 2.5rem);
          display: grid;
          gap: 0.9rem;
          align-content: center;
        }
        .hh-service-title-lg { font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--forest-deep); margin: 0; line-height: 1.05; letter-spacing: -0.02em; }
        .hh-service-desc { color: var(--ink-soft); line-height: 1.65; margin: 0; }
        .hh-service-expect {
          padding-top: 0.9rem;
          border-top: 1px solid var(--line);
          display: grid;
          gap: 0.3rem;
        }
        .hh-service-expect-text { font-size: 0.95rem; color: var(--ink-soft); }
        .hh-service-feature-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; padding-top: 0.4rem; }

        .hh-services-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(0.8rem, 1.4vw, 1.2rem);
        }
        @media (max-width: 1024px) { .hh-services-row { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px)  { .hh-services-row { grid-template-columns: 1fr; } }

        .hh-service-card {
          position: relative;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.65);
          padding: clamp(1.2rem, 1.8vw, 1.5rem);
          display: grid;
          align-content: start;
          gap: 0.5rem;
        }
        .hh-service-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
        .hh-service-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(225, 27, 27,0.10);
          color: var(--terracotta-deep);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hh-service-num { font-size: 1.3rem; color: var(--sage-light); }
        .hh-service-tagline { color: var(--terracotta-deep); }
        .hh-service-title { font-size: 1.18rem; color: var(--forest-deep); line-height: 1.15; margin: 0; }
        .hh-service-desc-sm { font-size: 0.9rem; color: var(--ink-soft); line-height: 1.6; margin: 0.2rem 0 0; }
        .hh-service-foot { margin-top: 0.9rem; padding-top: 0.8rem; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; }
        .hh-service-link { background: none; border: none; padding: 0; font: inherit; color: var(--forest-deep); font-weight: 600; cursor: pointer; }

        /* ============= SPOTLIGHT ============= */
        .hh-spotlight {
          margin-top: clamp(3.5rem, 6vw, 6rem);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }
        @media (max-width: 980px) { .hh-spotlight { grid-template-columns: 1fr; gap: 2rem; } }
        .hh-spotlight-copy { display: grid; gap: 1.2rem; }
        .hh-spotlight-title {
          font-size: var(--type-h2);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: var(--forest-deep);
          margin: 0;
        }
        .hh-spotlight-stats { display: grid; gap: 0.7rem; margin: 0.4rem 0 0.6rem; }
        .hh-spotlight-stat {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--line);
          color: var(--ink-soft);
        }
        .hh-spotlight-num { font-size: clamp(1.4rem, 2.6vw, 1.9rem); color: var(--terracotta-deep); flex-shrink: 0; min-width: 9ch; }
        .hh-spotlight-caption { text-align: center; margin-top: 0.7rem; }

        .hh-spotlight-figure {
          padding: clamp(1.8rem, 3vw, 2.8rem);
          border-radius: var(--radius-2xl);
          background:
            radial-gradient(120% 80% at 85% 0%, rgba(225, 27, 27, 0.18), transparent 58%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.72), rgba(237, 225, 200, 0.45));
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.62);
          box-shadow: var(--glass-inner), var(--shadow-card);
          display: grid;
          gap: 1.4rem;
          justify-items: center;
          align-content: center;
        }
        .hh-spotlight-figure-ring {
          width: clamp(180px, 22vw, 240px);
          height: clamp(180px, 22vw, 240px);
          border-radius: 999px;
          background:
            conic-gradient(var(--terracotta-deep) 0% 90%, rgba(31, 58, 91, 0.10) 90% 100%);
          display: grid;
          place-items: center;
          position: relative;
          padding: 14px;
        }
        .hh-spotlight-figure-ring::before {
          content: '';
          position: absolute;
          inset: 14px;
          border-radius: 999px;
          background: var(--ivory-deep);
        }
        .hh-spotlight-figure-num {
          position: relative;
          font-size: clamp(2.6rem, 5vw, 3.6rem);
          color: var(--forest-deep);
          line-height: 1;
          letter-spacing: -0.025em;
        }
        .hh-spotlight-figure-num span { font-size: 0.55em; color: var(--terracotta-deep); margin-left: 0.05em; }
        .hh-spotlight-figure-ring .small-label {
          position: relative;
          margin-top: 0.4rem;
          color: var(--ink-mute);
        }
        .hh-spotlight-figure-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.5rem;
          color: var(--ink-soft);
          font-size: 0.95rem;
          width: 100%;
          max-width: 320px;
        }
        .hh-spotlight-figure-list li { display: flex; align-items: center; gap: 0.7rem; }
        .hh-spotlight-figure-dot {
          width: 6px; height: 6px; border-radius: 999px;
          background: var(--terracotta-deep);
          flex-shrink: 0;
        }

        /* ============= TEAM (compact strip on home) ============= */
        .hh-team {
          background: linear-gradient(180deg, var(--ivory-deep), var(--sand-soft));
        }
        .hh-team-strip {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }
        @media (max-width: 880px) { .hh-team-strip { grid-template-columns: 1fr; gap: 1.6rem; } }
        .hh-team-strip-copy { display: grid; gap: 1rem; align-content: start; max-width: 50ch; }
        .hh-team-strip-title {
          font-size: var(--type-h2);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-team-strip-lead { color: var(--ink-soft); line-height: 1.65; margin: 0; }
        .hh-team-strip-cta { align-self: flex-start; }

        .hh-team-strip-side { display: grid; gap: 1rem; align-content: center; justify-items: start; }
        @media (max-width: 880px) { .hh-team-strip-side { justify-items: start; } }

        .hh-avatar-row { display: inline-flex; align-items: center; padding-left: 12px; }
        .hh-avatar {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          overflow: hidden;
          background: var(--ivory-deep);
          border: 3px solid var(--bone);
          box-shadow: 0 6px 18px -8px rgba(28, 24, 22, 0.35);
          margin-left: -16px;
          padding: 0;
          cursor: pointer;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0s 240ms;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--forest-deep);
        }
        @media (max-width: 480px) {
          .hh-avatar { width: 60px; height: 60px; border-width: 2.5px; margin-left: -14px; }
          .hh-avatar-row { padding-left: 10px; }
        }
        .hh-avatar:first-child { margin-left: 0; }
        .hh-avatar:hover, .hh-avatar:focus-visible {
          transform: translateY(-4px) scale(1.06);
          z-index: 20 !important;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hh-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hh-avatar-initials {
          font-size: 1.1rem;
          background: linear-gradient(135deg, var(--ivory-deep), var(--sage-pale));
          width: 100%;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--forest-deep);
        }
        .hh-avatar-more {
          background: var(--forest-deep);
          color: var(--bone);
          font-size: 0.95rem;
          letter-spacing: 0;
          text-decoration: none;
        }
        .hh-avatar-more:hover { color: var(--bone); }

        .hh-team-strip-meta { display: inline-flex; align-items: center; gap: 0.5rem; }
        .hh-team-strip-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.10);
          color: #166534;
          border: 1px solid rgba(34, 197, 94, 0.22);
          font-size: 0.8rem;
          font-weight: 600;
        }
        .hh-team-strip-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #16a34a;
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.55);
          animation: live-pulse 1.6s ease-in-out infinite;
        }

        /* ============= LOCATION ============= */
        .hh-location-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(1.2rem, 2vw, 1.6rem);
        }
        @media (max-width: 980px) { .hh-location-grid { grid-template-columns: 1fr; } }

        .hh-location-cards {
          display: grid;
          gap: clamp(0.8rem, 1.4vw, 1.1rem);
          align-content: start;
        }

        .hh-location-card {
          padding: clamp(1.4rem, 2.2vw, 1.9rem);
          border-radius: var(--radius-2xl);
          display: grid;
          gap: 1rem;
          align-content: start;
        }
        .hh-location-card-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
        .hh-location-title {
          font-size: clamp(1.6rem, 3.4vw, 2.2rem);
          color: var(--forest-deep);
          margin: 0;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .hh-location-meta { display: grid; gap: 0.85rem; }
        .hh-location-meta > div { display: grid; gap: 0.2rem; font-size: 0.95rem; color: var(--ink-soft); }
        .hh-location-meta a { color: var(--forest-deep); }
        .hh-location-services-list { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.5rem; }
        .hh-location-chip { padding: 0.32rem 0.75rem; border-radius: 999px; background: rgba(225, 27, 27,0.10); color: var(--terracotta-deep); font-size: 0.78rem; }
        .hh-location-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .hh-location-actions .btn { flex: 1; min-width: 140px; }

        /* ============= REVIEWS ============= */
        .hh-reviews { background: linear-gradient(165deg, var(--ivory-deep), var(--sand-soft)); }
        .hh-reviews-summary { display: flex; gap: 1.4rem; align-items: end; }
        .hh-reviews-summary > div { display: grid; gap: 0.25rem; }
        .hh-reviews-num { font-size: 2.8rem; line-height: 1; color: var(--forest-deep); }
        .hh-reviews-stars { color: var(--terracotta-deep); letter-spacing: 0.05em; }
        .hh-reviews-source { font-size: 0.95rem; color: var(--forest-deep); font-weight: 600; }

        .hh-reviews-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(1rem, 1.8vw, 1.4rem);
          align-items: stretch;
        }
        @media (max-width: 980px) { .hh-reviews-grid { grid-template-columns: 1fr; } }

        .hh-review-feature {
          padding: clamp(1.8rem, 3vw, 2.6rem);
          border-radius: var(--radius-2xl);
          display: grid;
          gap: 1.4rem;
          align-content: space-between;
        }
        .hh-review-feature-quote { font-size: clamp(1.25rem, 2.4vw, 1.7rem); line-height: 1.35; color: var(--forest-deep); margin: 0; letter-spacing: -0.01em; }
        .hh-review-feature-meta { display: flex; justify-content: space-between; align-items: end; padding-top: 1rem; border-top: 1px solid var(--line); }
        .hh-review-feature-name { font-size: 1.08rem; color: var(--forest-deep); margin: 0; }
        .hh-review-stars { color: var(--terracotta-deep); letter-spacing: 0.04em; }
        .hh-review-feature-dots { display: flex; gap: 0.45rem; margin-top: 0.4rem; }
        .hh-review-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: var(--line-strong);
          border: none; padding: 0; cursor: pointer;
          transition: 200ms ease;
        }
        .hh-review-dot.is-active { background: var(--forest); transform: scale(1.2); }

        .hh-reviews-col { display: grid; gap: 1rem; }
        .hh-review-card {
          padding: clamp(1.2rem, 1.8vw, 1.6rem);
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.78);
          border: 1px solid var(--line);
          display: grid;
          gap: 0.7rem;
        }
        .hh-review-card-row { display: flex; justify-content: space-between; align-items: center; }
        .hh-review-quote { font-size: 1rem; line-height: 1.5; color: var(--forest-deep); margin: 0; }
        .hh-review-name { font-size: 0.94rem; font-weight: 600; color: var(--forest-deep); }

        /* ============= FINAL CTA ============= */
        .hh-cta-card {
          position: relative;
          padding: clamp(1.8rem, 4.5vw, 4.5rem);
          border-radius: var(--radius-2xl);
          background:
            radial-gradient(120% 80% at 85% 0%, rgba(225, 27, 27,0.42), transparent 58%),
            linear-gradient(160deg, #0c1c2e 0%, #1f3a5b 55%, #a81313 100%);
          color: var(--bone);
          overflow: hidden;
          display: grid;
          gap: 1.2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .hh-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(60% 100% at 0% 100%, rgba(251, 218, 218,0.18), transparent 60%);
          pointer-events: none;
        }
        .hh-cta-title {
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 1.05;
          margin: 0;
          letter-spacing: -0.025em;
          color: var(--bone);
          font-weight: 400;
          position: relative;
        }
        .hh-cta-em { color: var(--terracotta-pale); font-style: italic; }
        .hh-cta-lead { max-width: 60ch; color: var(--sage-light); font-size: 1.08rem; line-height: 1.7; margin: 0; position: relative; }
        .hh-cta-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; position: relative; }
        .hh-cta-trust { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--sage-light); position: relative; }
      `}</style>
    </>
  );
};

export default Home;
