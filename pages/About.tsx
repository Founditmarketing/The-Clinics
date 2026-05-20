import React, { useState } from 'react';
import { DOCTORS, AFFILIATIONS, PROVIDER_FILTER_TABS, PROVIDER_COUNT } from '../data/clinicData';
import { Doctor } from '../types';
import { Reveal, useLocale } from '../components/Harmony/i18n';
import DoctorModal from '../components/Harmony/DoctorModal';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';
import { useUI } from '../context/UIContext';

const initialsFor = (name: string) =>
  name
    .split(' ')
    .filter((s) => /^[A-Z]/.test(s))
    .slice(-2)
    .map((s) => s[0])
    .join('');

const About: React.FC = () => {
  const { openBookingModal, openBookingWithDoctor } = useUI();
  const { t } = useLocale();
  const [providerFilter, setProviderFilter] = useState('all');
  const [openProvider, setOpenProvider] = useState<Doctor | null>(null);

  const filtered =
    providerFilter === 'all'
      ? DOCTORS
      : DOCTORS.filter((d) => d.tags?.includes(providerFilter));

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container hh-about-hero-grid">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">About</span>
            <h1 className="font-display hh-page-title">
              We started this <br />
              because <span className="hh-em">Cenla</span> <br />
              deserved better.
            </h1>
            <p className="lead lead-lg">
              For decades, getting good medical care in Central Louisiana meant a long drive,
              a longer wait, and an even longer bill. theCLINICS was built so your neighbors
              get great primary care — physicals, pediatrics, women&rsquo;s health, chronic
              care — plus gastro, podiatry, and on-site labs, across two clinics, coordinated
              by a provider who actually knows you.
            </p>
          </Reveal>
          <Reveal as="div" delay={120} className="hh-about-hero-image-wrap">
            <img
              src="/the-clinics-pic-1.png"
              alt="theCLINICS waiting room"
              className="hh-about-hero-image"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="hh-about-pillars">
        <div className="container hh-about-pillars-grid">
          {[
            {
              num: '01',
              title: 'Comprehensive care',
              body: 'About 90% of what we do is family medicine — physicals, pediatrics, women\u2019s health, chronic-condition care, refills, and same-day sick visits. The bread and butter, done well.',
            },
            {
              num: '02',
              title: 'Two clinics, one team',
              body: `${PROVIDER_COUNT} providers across our Alexandria and Pineville clinics. The same standard of care, the same charts, the same warm front desk. Pick whichever is closer.`,
            },
            {
              num: '03',
              title: 'Plain-English bills',
              body: 'Most insurance accepted. Transparent self-pay pricing if you do not have coverage. Zero phone-tree gymnastics to ask a question.',
            },
          ].map((p, i) => (
            <Reveal as="div" key={p.num} delay={i * 100} className="hh-about-pillar">
              <div className="editorial-num hh-about-pillar-num">{p.num}</div>
              <h3 className="font-display hh-about-pillar-title">{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hh-team hh-about-team">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">{t.team.eyebrow}</span>
            <h2 className="font-display hh-section-title">
              {t.team.title_a} <span className="hh-em">{t.team.title_em}</span>
              {t.team.title_b}
            </h2>
            <p className="lead hh-section-lead">{t.team.lead}</p>
          </Reveal>

          <div className="hh-team-filters">
            {PROVIDER_FILTER_TABS.map((tab) => {
              const isActive = providerFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProviderFilter(tab.id)}
                  className={`hh-team-filter ${isActive ? 'is-active' : ''}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hh-team-grid">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenProvider(p)}
                className="hh-provider card-lift"
              >
                <div className="hh-provider-portrait">
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" />
                  ) : (
                    <div className="hh-provider-initials font-display">{initialsFor(p.name)}</div>
                  )}
                  {p.featured && (
                    <span className="hh-provider-badge hh-provider-badge-gold">Founder</span>
                  )}
                  {p.accepting && !p.featured && (
                    <span className="hh-provider-badge">Accepting</span>
                  )}
                </div>
                <div className="hh-provider-meta">
                  <h3 className="font-display hh-provider-name">{p.name}</h3>
                  <div className="small-label hh-provider-role">{p.role || p.specialty}</div>
                  <div className="hh-provider-specialty font-display">{p.specialty}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="hh-about-affiliations">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow eyebrow-light">Partnerships</span>
            <h2 className="font-display hh-section-title hh-about-affil-title">
              We work with the right people.
            </h2>
          </Reveal>
          <div className="hh-about-affil-grid">
            {AFFILIATIONS.map((a) => (
              <div key={a.name} className="hh-about-affil-card hh-glass-dark">
                <div className="font-display hh-about-affil-name">{a.name}</div>
                <div className="small-label">{a.sub}</div>
              </div>
            ))}
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
        .hh-page-hero { padding: clamp(3rem, 6vw, 5rem) 0; }
        .hh-page-title {
          font-size: clamp(2.4rem, 6vw, 4.4rem);
          line-height: 1.02;
          letter-spacing: -0.022em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-em { color: var(--terracotta-deep); font-style: italic; }

        .hh-about-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }
        @media (max-width: 980px) { .hh-about-hero-grid { grid-template-columns: 1fr; } }

        .hh-about-hero-image-wrap {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 5/6;
          box-shadow: var(--shadow-strong);
          background: var(--ivory-deep);
        }
        @media (max-width: 980px) { .hh-about-hero-image-wrap { aspect-ratio: 16/10; } }
        .hh-about-hero-image { width: 100%; height: 100%; object-fit: cover; display: block; }

        .hh-about-pillars {
          padding: clamp(3rem, 5vw, 4.5rem) 0;
          background: linear-gradient(165deg, var(--ivory-deep), var(--sand-soft));
        }
        .hh-about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.4rem;
        }
        @media (max-width: 880px) { .hh-about-pillars-grid { grid-template-columns: 1fr; } }
        .hh-about-pillar {
          padding: 1.6rem 1.6rem 1.4rem;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 22px;
          box-shadow: var(--glass-inner), var(--glass-shadow);
          display: grid;
          gap: 0.6rem;
          align-content: start;
        }
        .hh-about-pillar-num { font-size: 2rem; color: var(--terracotta-deep); }
        .hh-about-pillar-title { font-size: 1.4rem; line-height: 1.1; color: var(--forest-deep); margin: 0; }
        .hh-about-pillar p { color: var(--ink-soft); line-height: 1.6; margin: 0; }

        .hh-about-team { padding: clamp(3rem, 6vw, 6rem) 0; }

        .hh-about-affiliations {
          padding: clamp(3rem, 6vw, 6rem) 0;
          background: linear-gradient(170deg, #07172d 0%, #0b2747 60%, #134075 100%);
          color: var(--bone);
        }
        .hh-about-affil-title { color: var(--bone); }
        .hh-about-affil-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
          margin-top: 1.4rem;
        }
        @media (max-width: 880px) { .hh-about-affil-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .hh-about-affil-grid { grid-template-columns: 1fr; } }
        .hh-about-affil-card {
          padding: 1.4rem;
          border-radius: 20px;
          display: grid;
          gap: 0.5rem;
        }
        .hh-about-affil-name { font-size: 1.2rem; color: var(--bone); line-height: 1.1; }
        .hh-about-affil-card .small-label { color: var(--terracotta-pale); }

        /* Reuse team grid styles from Home */
        .hh-section-header { display: grid; gap: 0.8rem; max-width: 60ch; }
        .hh-section-title {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: var(--forest-deep);
          margin: 0;
          font-weight: 400;
        }
        .hh-section-lead { margin-top: 0.4rem; }

        .hh-team-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.6rem 0 2rem; padding-bottom: 0.8rem; border-bottom: 1px solid var(--line); }
        .hh-team-filter { padding: 0.55rem 1rem; border-radius: 999px; border: 1px solid var(--line); background: rgba(255,255,255,0.6); backdrop-filter: blur(10px); color: var(--ink-soft); font: inherit; font-size: 0.9rem; cursor: pointer; }
        .hh-team-filter.is-active { background: var(--forest); color: var(--bone); border-color: var(--forest); }

        .hh-team-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
        @media (max-width: 1024px) { .hh-team-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .hh-team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .hh-team-grid { grid-template-columns: 1fr; } }

        .hh-provider {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.62);
          border-radius: 24px;
          padding: 0;
          text-align: left;
          font: inherit;
          color: inherit;
          cursor: pointer;
          overflow: hidden;
          display: grid;
          align-content: start;
        }
        .hh-provider-portrait { position: relative; aspect-ratio: 4/5; background: var(--ivory-deep); overflow: hidden; }
        .hh-provider-portrait img { width: 100%; height: 100%; object-fit: cover; transition: 600ms ease; }
        .hh-provider:hover .hh-provider-portrait img { transform: scale(1.04); }
        .hh-provider-initials { width: 100%; height: 100%; display: inline-flex; align-items: center; justify-content: center; font-size: clamp(2.5rem, 5vw, 4rem); color: var(--forest-deep); background: linear-gradient(135deg, var(--ivory-deep), var(--sage-pale)); }
        .hh-provider-badge { position: absolute; top: 0.7rem; left: 0.7rem; background: rgba(255,255,255,0.95); color: var(--forest-deep); font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.25rem 0.55rem; border-radius: 999px; font-weight: 700; }
        .hh-provider-badge-gold { background: var(--gold); color: var(--bone); }
        .hh-provider-meta { padding: 1rem 1.1rem 1.2rem; }
        .hh-provider-name { font-size: 1.05rem; color: var(--forest-deep); margin: 0; line-height: 1.2; }
        .hh-provider-role { color: var(--terracotta-deep); margin-top: 0.45rem; }
        .hh-provider-specialty { color: var(--ink-soft); font-size: 0.85rem; font-style: italic; margin-top: 0.5rem; }
      `}</style>
    </>
  );
};

export default About;
