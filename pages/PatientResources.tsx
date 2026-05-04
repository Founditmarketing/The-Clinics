import React from 'react';
import {
  ArrowRight,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Phone,
  Shield,
  User,
} from 'lucide-react';
import { CLINIC } from '../data/clinicData';
import { Reveal, useLocale } from '../components/Harmony/i18n';
import { useUI } from '../context/UIContext';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';

const FORM_GROUPS = [
  {
    title: 'Gastroenterology (AGA)',
    forms: [
      {
        label: 'New Patient Packet',
        href: 'https://theclinics.us/wp-content/uploads/2024/03/NEW-PT-COMBINED-PAPERWORK.pdf',
      },
      {
        label: 'Returning Patient',
        href: 'https://theclinics.us/wp-content/uploads/2024/03/RET-PT-COMBINED-PAPERWORK.pdf',
      },
    ],
  },
  {
    title: 'Podiatry',
    forms: [
      {
        label: 'New Patient Packet',
        href: 'https://theclinics.us/wp-content/uploads/2021/05/Podiatry-New-Patient-Packet-2021.pdf',
      },
      {
        label: 'Patient Update Form',
        href: 'https://theclinics.us/wp-content/uploads/2021/05/Podiatry-Update-Only-2021.pdf',
      },
    ],
  },
  {
    title: 'Primary Care',
    forms: [
      {
        label: 'New Patient Packet',
        href: 'https://theclinics.us/wp-content/uploads/2021/09/CFMA-New-Patient-Packet-2021-updated.pdf',
      },
      {
        label: 'Update Information',
        href: 'https://theclinics.us/wp-content/uploads/2021/05/CFMA-Update-Only-2021.pdf',
      },
    ],
  },
];

const PatientResources: React.FC = () => {
  const { t } = useLocale();
  const { openBookingModal } = useUI();

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">{t.resources.eyebrow}</span>
            <h1 className="font-display hh-page-title">
              Tools to manage your <span className="hh-em">care.</span>
            </h1>
            <p className="lead lead-lg">
              Pay your bill, log into the patient portal, or download forms before your visit. All
              in one place. No login walls.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hh-resources-actions">
        <div className="container hh-resources-grid">
          <Reveal as="a"
            href="https://healowpay.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hh-resource-card"
            delay={0}
          >
            <div className="hh-resource-icon hh-resource-icon-pay">
              <CreditCard size={28} strokeWidth={1.6} />
            </div>
            <div>
              <span className="small-label">Payments</span>
              <h2 className="font-display hh-resource-title">
                Pay your bill <ExternalLink size={16} className="hh-resource-ext" />
              </h2>
              <p>Secure, fast online payment via Healow.</p>
            </div>
            <ArrowRight size={20} className="hh-resource-arrow" />
          </Reveal>

          <Reveal as="a"
            href={CLINIC.patientPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hh-resource-card"
            delay={100}
          >
            <div className="hh-resource-icon hh-resource-icon-portal">
              <User size={28} strokeWidth={1.6} />
            </div>
            <div>
              <span className="small-label">Records</span>
              <h2 className="font-display hh-resource-title">
                Patient Portal <ExternalLink size={16} className="hh-resource-ext" />
              </h2>
              <p>Records, lab results, refills, and messages with your provider.</p>
            </div>
            <ArrowRight size={20} className="hh-resource-arrow" />
          </Reveal>

          <Reveal as="a"
            href={`tel:${CLINIC.tel}`}
            className="hh-resource-card"
            delay={180}
          >
            <div className="hh-resource-icon hh-resource-icon-call">
              <Phone size={28} strokeWidth={1.6} />
            </div>
            <div>
              <span className="small-label">Front desk</span>
              <h2 className="font-display hh-resource-title">Call us</h2>
              <p>{CLINIC.phone} · {CLINIC.hoursLabel}</p>
            </div>
            <ArrowRight size={20} className="hh-resource-arrow" />
          </Reveal>
        </div>
      </section>

      <section className="hh-resources-forms">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">Patient forms</span>
            <h2 className="font-display hh-section-title">
              Save time. <span className="hh-em">Fill it out at home.</span>
            </h2>
            <p className="lead">
              Download, print, complete, and bring with you. Or arrive 15 minutes early and we will
              hand you the iPad.
            </p>
          </Reveal>

          <div className="hh-resources-forms-grid">
            {FORM_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 100} className="hh-resources-form-card hh-glass-surface">
                <div className="hh-resources-form-icon">
                  <FileText size={20} strokeWidth={1.6} />
                </div>
                <h3 className="font-display hh-resources-form-title">{g.title}</h3>
                <ul className="hh-resources-form-list">
                  {g.forms.map((f) => (
                    <li key={f.label}>
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hh-resources-form-link"
                      >
                        <Download size={14} strokeWidth={1.8} /> <span>{f.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hh-resources-cta">
        <div className="container hh-resources-cta-card">
          <Shield size={28} strokeWidth={1.6} />
          <div>
            <span className="small-label">Privacy</span>
            <h3 className="font-display hh-resources-cta-title">Your information stays yours.</h3>
            <p>
              theCLINICS handles your data per HIPAA standards. We will never sell or share your
              records without your consent.
            </p>
          </div>
          <button onClick={openBookingModal} className="btn btn-terracotta">
            Book a visit <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-page-hero { padding: clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem); }
        .hh-page-title { font-size: clamp(2.4rem, 6vw, 4.4rem); line-height: 1.02; letter-spacing: -0.022em; color: var(--forest-deep); margin: 0; font-weight: 400; }
        .hh-em { color: var(--terracotta-deep); font-style: italic; }
        .hh-section-header { display: grid; gap: 0.8rem; max-width: 60ch; }
        .hh-section-title { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.05; color: var(--forest-deep); margin: 0; font-weight: 400; }

        .hh-resources-actions { padding: 1rem 0 clamp(2rem, 4vw, 3rem); }
        .hh-resources-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        @media (max-width: 980px) { .hh-resources-grid { grid-template-columns: 1fr; } }
        .hh-resource-card {
          display: grid;
          grid-template-columns: 56px 1fr 24px;
          gap: 1rem;
          padding: 1.4rem 1.6rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 22px;
          align-items: center;
          text-decoration: none;
          color: inherit;
          transition: 280ms cubic-bezier(0.22,1,0.36,1);
        }
        .hh-resource-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-strong); }
        .hh-resource-icon { width: 56px; height: 56px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; }
        .hh-resource-icon-pay { background: rgba(34,197,94,0.18); color: #166534; }
        .hh-resource-icon-portal { background: rgba(31,58,91,0.14); color: var(--forest-deep); }
        .hh-resource-icon-call { background: rgba(2,132,199,0.18); color: var(--forest-deep); }
        .hh-resource-title { font-size: 1.2rem; color: var(--forest-deep); margin: 0.3rem 0 0.4rem; line-height: 1.1; display: inline-flex; align-items: center; gap: 0.5rem; }
        .hh-resource-ext { color: var(--ink-mute); }
        .hh-resource-card p { color: var(--ink-soft); margin: 0; font-size: 0.95rem; }
        .hh-resource-arrow { color: var(--forest-deep); }

        .hh-resources-forms { padding: clamp(3rem, 5vw, 4.5rem) 0; background: linear-gradient(165deg, var(--ivory-deep), var(--sand-soft)); }
        .hh-resources-forms-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 1.4rem; }
        @media (max-width: 880px) { .hh-resources-forms-grid { grid-template-columns: 1fr; } }
        .hh-resources-form-card { padding: 1.4rem 1.6rem; border-radius: 22px; display: grid; gap: 0.6rem; align-content: start; }
        .hh-resources-form-icon { width: 38px; height: 38px; border-radius: 12px; background: rgba(225, 27, 27,0.10); color: var(--terracotta-deep); display: inline-flex; align-items: center; justify-content: center; }
        .hh-resources-form-title { font-size: 1.15rem; color: var(--forest-deep); margin: 0.4rem 0 0.4rem; }
        .hh-resources-form-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.4rem; }
        .hh-resources-form-link { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--forest-deep); font-weight: 500; padding: 0.4rem 0; }
        .hh-resources-form-link:hover { color: var(--terracotta-deep); }

        .hh-resources-cta { padding: clamp(2rem, 4vw, 3rem) 0 clamp(3rem, 5vw, 5rem); }
        .hh-resources-cta-card {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 1.4rem;
          align-items: center;
          padding: 1.6rem 1.8rem;
          background: linear-gradient(165deg, #07172d 0%, #0b2747 60%, #134075 100%);
          color: var(--bone);
          border-radius: 28px;
        }
        @media (max-width: 720px) { .hh-resources-cta-card { grid-template-columns: 1fr; text-align: left; } }
        .hh-resources-cta-card svg { color: var(--terracotta-pale); }
        .hh-resources-cta-card .small-label { color: var(--terracotta-pale); }
        .hh-resources-cta-title { font-size: 1.4rem; color: var(--bone); margin: 0.3rem 0 0.4rem; line-height: 1.1; }
        .hh-resources-cta-card p { color: var(--sage-light); margin: 0; max-width: 50ch; }
      `}</style>
    </>
  );
};

export default PatientResources;
