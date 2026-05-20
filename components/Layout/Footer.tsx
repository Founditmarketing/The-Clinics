import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC, AFFILIATIONS, LOCATIONS, PROVIDER_COUNT } from '../../data/clinicData';
import { PageRoute } from '../../types';
import { useLocale } from '../Harmony/i18n';

const Footer: React.FC = () => {
  const { t } = useLocale();

  return (
    <footer className="hh-footer" aria-labelledby="footer-title">
      <div className="hh-footer-glow" aria-hidden="true" />
      <div className="container hh-footer-inner">
        <div className="hh-footer-stats">
          <div>
            <div className="hh-footer-stat-num font-display">
              {String(LOCATIONS.length).padStart(2, '0')}
            </div>
            <div className="small-label">Locations · Cenla</div>
          </div>
          <div>
            <div className="hh-footer-stat-num font-display">{PROVIDER_COUNT}</div>
            <div className="small-label">Providers</div>
          </div>
          <div>
            <div className="hh-footer-stat-num font-display">90%</div>
            <div className="small-label">Primary care visits</div>
          </div>
          <div>
            <div className="hh-footer-stat-num font-display">{CLINIC.rating}★</div>
            <div className="small-label">Patient rating</div>
          </div>
        </div>

        <div className="hh-footer-affiliations">
          <div className="small-label">Affiliated with</div>
          <div className="hh-affiliations-grid">
            {AFFILIATIONS.map((a) => (
              <div key={a.name} className="hh-affiliation">
                <div className="font-display hh-affiliation-name">{a.name}</div>
                <div className="small-label">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hh-footer-grid">
          <div className="hh-footer-brand">
            <div className="hh-footer-logo">
              <img src="/logo.png" alt="theCLINICS" className="hh-footer-logo-img" />
              <div>
                <div id="footer-title" className="small-label" style={{ color: 'var(--terracotta-pale)' }}>
                  Cenla
                </div>
                <div className="font-display hh-footer-name">Modern healthcare.</div>
              </div>
            </div>
            <p className="hh-footer-blurb">
              Comprehensive care first — plus gastro, podiatry, and
              on-site labs. Two clinics in Central Louisiana. Built for Cenla. Welcoming all.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="hh-newsletter"
              aria-label="Quarterly clinic notes"
            >
              <div className="small-label">Quarterly notes</div>
              <div className="hh-newsletter-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email"
                  className="hh-newsletter-input"
                />
                <button type="submit" className="btn btn-terracotta hh-newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="hh-footer-col">
            <div className="hh-footer-col-title font-display">Visit us</div>
            <div className="hh-footer-locations">
              {LOCATIONS.map((loc) => (
                <div key={loc.key} className="hh-footer-location">
                  <div className="small-label" style={{ color: 'var(--terracotta-pale)' }}>
                    {loc.city}{loc.flagship ? ' · Flagship' : ''}
                  </div>
                  <div className="hh-footer-text">
                    {loc.address}
                    <br />
                    <a href={`tel:${loc.tel}`} className="font-mono underline-grow">
                      {loc.phone}
                    </a>
                  </div>
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-grow hh-footer-link"
                  >
                    Get directions ↗
                  </a>
                </div>
              ))}
            </div>
            <div className="hh-footer-hours">
              <div>
                <div className="small-label">Mon – Thu</div>
                <div className="font-mono">7:45a – 5:00p</div>
              </div>
              <div>
                <div className="small-label">Friday</div>
                <div className="font-mono">7:45a – 12:00p</div>
              </div>
              <div>
                <div className="small-label">Sat – Sun</div>
                <div className="font-mono">Closed</div>
              </div>
              <div>
                <div className="small-label">Walk-ins</div>
                <div className="font-mono">Same-day for established</div>
              </div>
            </div>
          </div>

          <div className="hh-footer-col">
            <div className="hh-footer-col-title font-display">{t.footer.patients}</div>
            <ul className="hh-footer-list">
              <li>
                <Link to={PageRoute.SERVICES} className="underline-grow">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to={PageRoute.ABOUT} className="underline-grow">
                  {t.nav.team}
                </Link>
              </li>
              <li>
                <Link to={PageRoute.PATIENT_RESOURCES} className="underline-grow">
                  Patient Resources
                </Link>
              </li>
              <li>
                <Link to={PageRoute.CONTACT} className="underline-grow">
                  Contact / Visit
                </Link>
              </li>
              <li>
                <a
                  href={CLINIC.patientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                >
                  {t.nav.portal} ↗
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                >
                  Leave a review ↗
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                >
                  Follow on Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hh-footer-legal">
          <div className="hh-footer-legal-left">
            <span>© {new Date().getFullYear()} {t.footer.copy}.</span>
            <span className="hh-footer-dot">·</span>
            <span>Built with care for Cenla.</span>
          </div>
          <div className="hh-footer-legal-right">
            <a href="#" className="underline-grow">{t.footer.privacy}</a>
            <a href="#" className="underline-grow">{t.footer.access}</a>
            <a href="#" className="underline-grow">{t.footer.hipaa}</a>
            <a href="#" className="underline-grow">Good Faith Estimate</a>
          </div>
        </div>
      </div>

      <style>{`
        .hh-footer {
          position: relative;
          padding-block: clamp(4.5rem, 7vw, 7rem) 2.6rem;
          background: linear-gradient(170deg, #07172d 0%, #0b2747 60%, #134075 100%);
          color: var(--bone);
          overflow: hidden;
        }
        .hh-footer-glow {
          position: absolute;
          inset: -10% -10% auto -10%;
          height: 50%;
          background: radial-gradient(60% 100% at 30% 0%, rgba(225, 27, 27,0.22), transparent 70%);
          pointer-events: none;
        }
        .hh-footer-inner { position: relative; z-index: 1; }

        .hh-footer-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2rem;
          padding-bottom: clamp(2.4rem, 4vw, 3.4rem);
          margin-bottom: clamp(2.4rem, 4vw, 3.4rem);
          border-bottom: 1px solid rgba(184,146,74,0.3);
        }
        @media (max-width: 720px) {
          .hh-footer-stats { grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }
        }
        .hh-footer-stat-num {
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          line-height: 1;
          color: var(--terracotta-pale);
          letter-spacing: -0.02em;
        }
        .hh-footer-stat-num + .small-label { margin-top: 0.7rem; color: var(--sage-light); }

        .hh-footer-affiliations {
          padding-bottom: clamp(2.4rem, 4vw, 3rem);
          margin-bottom: clamp(2.4rem, 4vw, 3rem);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hh-footer-affiliations .small-label { color: var(--terracotta-pale); margin-bottom: 1.4rem; }
        .hh-affiliations-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 1.6rem;
        }
        @media (max-width: 880px) { .hh-affiliations-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px) { .hh-affiliations-grid { grid-template-columns: repeat(2, 1fr); } }
        .hh-affiliation { text-align: center; }
        .hh-affiliation-name { font-size: 1.08rem; line-height: 1.15; color: var(--bone); }
        .hh-affiliation .small-label { color: var(--sage-light); margin-top: 0.4rem; }

        .hh-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.1fr 0.9fr;
          gap: clamp(2rem, 4vw, 3.4rem);
          padding-bottom: clamp(2.4rem, 4vw, 3rem);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 880px) {
          .hh-footer-grid { grid-template-columns: 1fr; gap: 2.4rem; }
        }

        .hh-footer-logo { display: inline-flex; align-items: center; gap: 1.1rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
        .hh-footer-logo-img {
          height: 64px;
          width: auto;
          object-fit: contain;
          background: var(--bone);
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-sm);
          box-shadow: 0 10px 24px -10px rgba(0,0,0,0.55);
        }
        .hh-footer-name { font-size: 1.35rem; line-height: 1.05; color: var(--bone); margin-top: 0.25rem; letter-spacing: -0.01em; }
        .hh-footer-blurb { color: var(--sage-light); font-size: 0.95rem; line-height: 1.65; max-width: 38ch; margin: 0 0 1.2rem; }

        .hh-newsletter {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 1rem 1.1rem;
        }
        .hh-newsletter .small-label { color: var(--terracotta-pale); margin-bottom: 0.6rem; }
        .hh-newsletter-row { display: flex; gap: 0.5rem; }
        .hh-newsletter-input {
          flex: 1;
          padding: 0.6rem 0.8rem;
          border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--bone);
          font: inherit;
        }
        .hh-newsletter-input:focus {
          outline: none;
          border-color: var(--terracotta);
          box-shadow: 0 0 0 3px rgba(225, 27, 27,0.32);
        }
        .hh-newsletter-btn { padding: 0.55rem 1.1rem; min-height: 0; }

        .hh-footer-col-title { font-size: 1.05rem; margin-bottom: 0.9rem; color: var(--bone); }
        .hh-footer-text { color: var(--sage-light); font-size: 0.92rem; line-height: 1.7; }
        .hh-footer-text a { color: var(--bone); }

        .hh-footer-locations { display: grid; gap: 1rem; margin-bottom: 0.5rem; }
        .hh-footer-location { display: grid; gap: 0.25rem; }
        .hh-footer-location .small-label { margin-bottom: 0.1rem; }

        .hh-footer-hours {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 1.4rem;
          margin-top: 1rem;
          color: var(--sage-light);
          font-size: 0.85rem;
        }
        .hh-footer-hours .small-label { color: var(--terracotta-pale); margin-bottom: 0.15rem; }
        .hh-footer-link { display: inline-block; margin-top: 1rem; color: var(--terracotta-pale); font-size: 0.85rem; }

        .hh-footer-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.45rem; color: var(--sage-light); font-size: 0.92rem; }

        .hh-footer-legal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 1.6rem;
          color: var(--sage-light);
          font-size: 0.78rem;
          flex-wrap: wrap;
        }
        .hh-footer-legal-right { display: flex; gap: 1.4rem; flex-wrap: wrap; }
        .hh-footer-dot { color: var(--terracotta); }
      `}</style>
    </footer>
  );
};

export default Footer;
