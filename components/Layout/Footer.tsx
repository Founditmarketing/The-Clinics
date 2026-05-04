import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC, AFFILIATIONS, DOCTORS } from '../../data/clinicData';
import { PageRoute } from '../../types';

const Footer: React.FC = () => {
  return (
    <footer
      className="pt-20 pb-10 relative overflow-hidden"
      style={{ background: 'var(--forest-deep)', color: 'var(--ivory)' }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Big numbers */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 mb-16 border-b"
          style={{ borderColor: 'rgba(184, 146, 74, 0.3)' }}
        >
          <div>
            <div
              className="font-display text-5xl lg:text-7xl leading-none"
              style={{ color: 'var(--gold-pale)' }}
            >
              01
            </div>
            <div className="small-whisper mt-3" style={{ color: 'var(--sage-light)' }}>
              Location · Cenla
            </div>
          </div>
          <div>
            <div
              className="font-display text-5xl lg:text-7xl leading-none"
              style={{ color: 'var(--gold-pale)' }}
            >
              {String(DOCTORS.length).padStart(2, '0')}
            </div>
            <div className="small-whisper mt-3" style={{ color: 'var(--sage-light)' }}>
              Providers
            </div>
          </div>
          <div>
            <div
              className="font-display text-5xl lg:text-7xl leading-none"
              style={{ color: 'var(--gold-pale)' }}
            >
              {CLINIC.annualVisits}
            </div>
            <div className="small-whisper mt-3" style={{ color: 'var(--sage-light)' }}>
              Annual visits
            </div>
          </div>
          <div>
            <div
              className="font-display text-5xl lg:text-7xl leading-none"
              style={{ color: 'var(--gold-pale)' }}
            >
              {CLINIC.rating}★
            </div>
            <div className="small-whisper mt-3" style={{ color: 'var(--sage-light)' }}>
              Patient rating
            </div>
          </div>
        </div>

        {/* Affiliations */}
        <div
          className="pb-12 mb-12 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="small-whisper mb-6" style={{ color: 'var(--gold-pale)' }}>
            Affiliated with
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 items-center">
            {AFFILIATIONS.map((p) => (
              <div key={p.name} className="text-center">
                <div className="font-display text-lg tracking-tight" style={{ color: 'var(--ivory)' }}>
                  {p.name}
                </div>
                <div
                  className="text-[9px] uppercase tracking-wider mt-1"
                  style={{ color: 'var(--sage-light)' }}
                >
                  {p.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand + contact + nav */}
        <div
          className="grid lg:grid-cols-12 gap-12 pb-12 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="var(--ivory)" strokeWidth="1.5" />
                <path
                  d="M13 14v12M27 14v12M13 20h14"
                  stroke="var(--ivory)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="2.8" fill="var(--terracotta)" />
              </svg>
              <div>
                <div className="font-display text-2xl">theCLINICS</div>
                <div className="small-whisper mt-0.5" style={{ color: 'var(--sage-light)' }}>
                  Cenla · Modern healthcare
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--sage-light)' }}>
              Modern primary care, on-site cardiac diagnostics, gastro, podiatry, and labs in Central
              Louisiana. Built for Cenla. Welcoming all.
            </p>
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="small-whisper mb-2" style={{ color: 'var(--gold-pale)' }}>
                Quarterly
              </div>
              <div className="font-display text-lg mb-3">Health notes from your clinic</div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 rounded-full text-sm bg-transparent border focus:outline-none focus:border-white transition"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--ivory)' }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: 'var(--terracotta)', color: 'var(--ivory)' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="font-display text-base mb-4">Visit us</div>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--sage-light)' }}>
              {CLINIC.address}
              <br />
              <a href={`tel:${CLINIC.tel}`} className="font-mono underline-grow">
                {CLINIC.phone}
              </a>
              <br />
              <a href={`mailto:${CLINIC.email}`} className="underline-grow">
                {CLINIC.email}
              </a>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-xs" style={{ color: 'var(--sage-light)' }}>
              <div>
                <div className="small-whisper mb-1" style={{ color: 'var(--gold-pale)' }}>
                  Mon – Thu
                </div>
                <div className="font-mono">7:45a – 5:00p</div>
              </div>
              <div>
                <div className="small-whisper mb-1" style={{ color: 'var(--gold-pale)' }}>
                  Friday
                </div>
                <div className="font-mono">7:45a – 12:00p</div>
              </div>
              <div>
                <div className="small-whisper mb-1" style={{ color: 'var(--gold-pale)' }}>
                  Sat – Sun
                </div>
                <div className="font-mono">Closed</div>
              </div>
              <div>
                <div className="small-whisper mb-1" style={{ color: 'var(--gold-pale)' }}>
                  Walk-ins
                </div>
                <div className="font-mono">Same-day for established</div>
              </div>
            </div>
            <a
              href={CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-xs underline-grow"
              style={{ color: 'var(--gold-pale)' }}
            >
              Get directions ↗
            </a>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display text-base mb-4">Quick links</div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--sage-light)' }}>
              <li>
                <Link to={PageRoute.SERVICES} className="underline-grow">
                  Services
                </Link>
              </li>
              <li>
                <Link to={PageRoute.ABOUT} className="underline-grow">
                  About / Care team
                </Link>
              </li>
              <li>
                <Link to={PageRoute.PATIENT_RESOURCES} className="underline-grow">
                  Patient Resources
                </Link>
              </li>
              <li>
                <Link to={PageRoute.CONTACT} className="underline-grow">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={CLINIC.patientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                >
                  Patient Portal ↗
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

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
          style={{ color: 'var(--sage-light)' }}
        >
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} theCLINICS.</span>
            <span style={{ color: 'var(--gold)' }}>·</span>
            <span>Built with care for Cenla.</span>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="underline-grow">
              Privacy Policy
            </a>
            <a href="#" className="underline-grow">
              Accessibility
            </a>
            <a href="#" className="underline-grow">
              HIPAA Notice
            </a>
            <a href="#" className="underline-grow">
              Good Faith Estimate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
