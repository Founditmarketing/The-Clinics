import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Phone, Shield } from 'lucide-react';
import { CLINIC, DOCTORS } from '../data/clinicData';
import { useUI } from '../context/UIContext';
import { Reveal } from '../components/Harmony/i18n';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';

const initialsFor = (name: string) =>
  name
    .split(' ')
    .filter((s) => /^[A-Z]/.test(s))
    .slice(-2)
    .map((s) => s[0])
    .join('');

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = DOCTORS.find((d) => d.id === id);
  const { openBookingModal, openBookingWithDoctor } = useUI();

  useEffect(() => {
    if (doctor) document.title = `${doctor.name} — theCLINICS`;
  }, [doctor]);

  if (!doctor) {
    return (
      <section className="hh-page-hero grain">
        <div className="container">
          <h1 className="font-display hh-page-title">Provider not found</h1>
          <Link to="/about" className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
            <ArrowLeft size={16} style={{ display: 'inline', marginRight: 4 }} /> Back to the team
          </Link>
        </div>
      </section>
    );
  }

  const others = DOCTORS.filter((d) => d.id !== doctor.id).slice(0, 3);

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container">
          <Link to="/about" className="hh-doc-back underline-grow">
            <ArrowLeft size={14} /> Back to the team
          </Link>

          <div className="hh-doc-hero-grid">
            <Reveal as="div" className="hh-doc-portrait-wrap">
              {doctor.image ? (
                <img src={doctor.image} alt={doctor.name} className="hh-doc-portrait" />
              ) : (
                <div className="hh-doc-portrait hh-doc-initials font-display">
                  {initialsFor(doctor.name)}
                </div>
              )}
              {doctor.featured && <span className="hh-doc-badge">Founder</span>}
              {doctor.accepting && !doctor.featured && (
                <span className="hh-doc-badge hh-doc-badge-accepting">Accepting new patients</span>
              )}
            </Reveal>

            <Reveal as="div" delay={120} className="hh-doc-meta">
              <span className="eyebrow">{doctor.role || doctor.specialty}</span>
              <h1 className="font-display hh-doc-name">{doctor.name}</h1>
              <div className="hh-doc-specialty font-display">{doctor.specialty}</div>

              <p className="hh-doc-bio">{doctor.bio}</p>

              <div className="hh-doc-actions">
                <button
                  onClick={() => openBookingWithDoctor(doctor.id)}
                  className="btn btn-terracotta"
                >
                  Book with {doctor.name.split(' ').slice(-1)[0].replace(/[,.]/g, '')}
                  <ArrowRight size={14} />
                </button>
                <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost">
                  <Phone size={16} strokeWidth={1.8} /> {CLINIC.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hh-doc-detail">
        <div className="container hh-doc-detail-grid">
          <div className="hh-doc-detail-main">
            {doctor.education && doctor.education.length > 0 && (
              <Reveal as="div" className="hh-doc-block">
                <span className="eyebrow">Education</span>
                <ul className="hh-doc-list">
                  {doctor.education.map((e, i) => (
                    <li key={i}>
                      <span className="editorial-num">0{i + 1}</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {doctor.languages && doctor.languages.length > 0 && (
              <Reveal as="div" className="hh-doc-block" delay={80}>
                <span className="eyebrow">Languages</span>
                <div className="hh-doc-chips">
                  {doctor.languages.map((l) => (
                    <span key={l} className="hh-doc-chip">
                      {l}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {doctor.lives && (
              <Reveal as="div" className="hh-doc-block" delay={120}>
                <span className="eyebrow">Lives in</span>
                <p className="hh-doc-lives">{doctor.lives}</p>
              </Reveal>
            )}

            <Reveal as="div" className="hh-doc-block" delay={160}>
              <span className="eyebrow">Credentials</span>
              <div className="hh-doc-creds">
                <div className="hh-doc-cred">
                  <Shield size={20} strokeWidth={1.8} />
                  <div>
                    <div className="hh-doc-cred-title">Board Certified</div>
                    <div className="hh-doc-cred-sub">Louisiana State Board of Medical Examiners</div>
                  </div>
                </div>
                <div className="hh-doc-cred">
                  <Calendar size={20} strokeWidth={1.8} />
                  <div>
                    <div className="hh-doc-cred-title">Practicing in Cenla</div>
                    <div className="hh-doc-cred-sub">Cenla Family Medicine Associates</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal as="div" delay={200} className="hh-doc-sidebar">
            <div className="hh-glass-surface hh-doc-sidebar-card">
              <span className="small-label">Practice</span>
              <ul className="hh-doc-sidebar-list">
                <li>
                  <MapPin size={18} strokeWidth={1.8} />
                  <div>
                    <div className="small-label">Location</div>
                    <div>{doctor.location || CLINIC.address}</div>
                  </div>
                </li>
                <li>
                  <Phone size={18} strokeWidth={1.8} />
                  <div>
                    <div className="small-label">Direct phone</div>
                    <a href={`tel:${(doctor.phone || CLINIC.phone).replace(/[^0-9]/g, '')}`} className="font-mono">
                      {doctor.phone || CLINIC.phone}
                    </a>
                  </div>
                </li>
                <li>
                  <Clock size={18} strokeWidth={1.8} />
                  <div>
                    <div className="small-label">Hours</div>
                    <ul className="hh-doc-sidebar-hours">
                      {(doctor.officeHours || ['Mon – Thu: 7:45a – 5:00p', 'Friday: 7:45a – 12:00p']).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
              <button
                onClick={() => openBookingWithDoctor(doctor.id)}
                className="btn btn-terracotta"
                style={{ width: '100%' }}
              >
                Book with {doctor.name.split(' ').slice(-1)[0].replace(/[,.]/g, '')}
              </button>
              <a
                href={CLINIC.patientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ width: '100%' }}
              >
                Patient Portal ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hh-doc-related">
        <div className="container">
          <Reveal as="div" className="hh-section-header hh-section-header-row">
            <div>
              <span className="eyebrow">More providers</span>
              <h2 className="font-display hh-section-title">
                Browse the rest of <span className="hh-em">your team.</span>
              </h2>
            </div>
            <Link to="/about" className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
              See all providers →
            </Link>
          </Reveal>

          <div className="hh-doc-related-grid">
            {others.map((p) => (
              <Link key={p.id} to={`/doctor/${p.id}`} className="hh-doc-related-card card-lift">
                <div className="hh-doc-related-portrait">
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" />
                  ) : (
                    <div className="hh-doc-related-initials font-display">{initialsFor(p.name)}</div>
                  )}
                </div>
                <div>
                  <h3 className="font-display hh-doc-related-name">{p.name}</h3>
                  <div className="small-label hh-doc-related-role">{p.role || p.specialty}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-page-hero { padding: clamp(2.5rem, 5vw, 4.5rem) 0 clamp(2rem, 4vw, 4rem); }
        .hh-page-title { font-size: clamp(2.4rem, 6vw, 4.4rem); line-height: 1.02; letter-spacing: -0.022em; color: var(--forest-deep); margin: 0; font-weight: 400; }
        .hh-em { color: var(--terracotta-deep); font-style: italic; }

        .hh-doc-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--ink-soft); font-size: 0.9rem; margin-bottom: 1.6rem; }
        .hh-doc-hero-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.4fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }
        @media (max-width: 980px) { .hh-doc-hero-grid { grid-template-columns: 1fr; } }

        .hh-doc-portrait-wrap { position: relative; border-radius: 28px; overflow: hidden; aspect-ratio: 4/5; box-shadow: var(--shadow-strong); background: var(--ivory-deep); }
        .hh-doc-portrait { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hh-doc-initials { display: flex; align-items: center; justify-content: center; font-size: clamp(4rem, 10vw, 7rem); color: var(--forest-deep); background: linear-gradient(135deg, var(--ivory-deep), var(--sage-pale)); }
        .hh-doc-badge { position: absolute; top: 1rem; left: 1rem; background: var(--gold); color: var(--bone); font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.35rem 0.7rem; border-radius: 999px; font-weight: 700; }
        .hh-doc-badge-accepting { background: rgba(255,255,255,0.95); color: var(--forest-deep); }

        .hh-doc-meta { display: grid; gap: 1rem; align-content: start; }
        .hh-doc-name { font-size: clamp(2rem, 4.5vw, 3.4rem); line-height: 1; color: var(--forest-deep); margin: 0; font-weight: 400; }
        .hh-doc-specialty { font-style: italic; color: var(--ink-soft); font-size: 1.05rem; }
        .hh-doc-bio { color: var(--ink-soft); line-height: 1.7; max-width: 60ch; margin: 0; }

        .hh-doc-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

        .hh-doc-detail {
          padding: clamp(2rem, 4vw, 3.4rem) 0;
          background: linear-gradient(165deg, var(--ivory-deep), var(--sand-soft));
        }
        .hh-doc-detail-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(2rem, 4vw, 3rem);
          align-items: start;
        }
        @media (max-width: 980px) { .hh-doc-detail-grid { grid-template-columns: 1fr; } }

        .hh-doc-block { display: grid; gap: 0.6rem; padding: 1.4rem 1.6rem; background: rgba(255,255,255,0.6); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.55); border-radius: 20px; margin-bottom: 1rem; }
        .hh-doc-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; color: var(--ink-soft); }
        .hh-doc-list li { display: grid; grid-template-columns: 36px 1fr; gap: 0.5rem; align-items: baseline; }
        .hh-doc-list .editorial-num { color: var(--sage-light); font-size: 1rem; }
        .hh-doc-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .hh-doc-chip { padding: 0.35rem 0.8rem; border-radius: 999px; background: rgba(225, 27, 27,0.10); color: var(--terracotta-deep); font-size: 0.85rem; }
        .hh-doc-lives { color: var(--ink-soft); margin: 0; }

        .hh-doc-creds { display: grid; gap: 0.7rem; }
        .hh-doc-cred { display: grid; grid-template-columns: 28px 1fr; gap: 0.6rem; align-items: start; color: var(--ink-soft); }
        .hh-doc-cred-title { color: var(--forest-deep); font-weight: 600; }
        .hh-doc-cred-sub { font-size: 0.85rem; color: var(--ink-mute); margin-top: 0.1rem; }

        .hh-doc-sidebar { position: sticky; top: 100px; }
        @media (max-width: 980px) { .hh-doc-sidebar { position: static; } }
        .hh-doc-sidebar-card { padding: 1.6rem; border-radius: 24px; display: grid; gap: 0.8rem; }
        .hh-doc-sidebar-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
        .hh-doc-sidebar-list li { display: grid; grid-template-columns: 22px 1fr; gap: 0.6rem; align-items: start; color: var(--ink-soft); }
        .hh-doc-sidebar-list a { color: var(--forest-deep); }
        .hh-doc-sidebar-list .small-label { display: block; color: var(--ink-mute); margin-bottom: 0.15rem; }
        .hh-doc-sidebar-hours { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.2rem; font-size: 0.92rem; color: var(--ink-soft); }

        .hh-doc-related { padding: clamp(3rem, 5vw, 5rem) 0; }
        .hh-section-header-row { display: flex; align-items: end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .hh-section-title { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.05; color: var(--forest-deep); margin: 0; font-weight: 400; }

        .hh-doc-related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 1.6rem; }
        @media (max-width: 720px) { .hh-doc-related-grid { grid-template-columns: 1fr; } }
        .hh-doc-related-card {
          display: grid;
          grid-template-columns: 88px 1fr;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 18px;
          align-items: center;
        }
        .hh-doc-related-portrait { width: 88px; height: 88px; border-radius: 14px; overflow: hidden; background: var(--ivory-deep); }
        .hh-doc-related-portrait img { width: 100%; height: 100%; object-fit: cover; }
        .hh-doc-related-initials { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: var(--forest-deep); background: linear-gradient(135deg, var(--ivory-deep), var(--sage-pale)); }
        .hh-doc-related-name { margin: 0; font-size: 1.05rem; color: var(--forest-deep); line-height: 1.1; }
        .hh-doc-related-role { color: var(--terracotta-deep); margin-top: 0.4rem; }
      `}</style>
    </>
  );
};

export default DoctorProfile;
