import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { CLINIC, LOCATIONS } from '../data/clinicData';
import LocationsMap from '../components/Harmony/LocationsMap';
import { Reveal, useLocale } from '../components/Harmony/i18n';
import { useClinicStatus } from '../components/Harmony/useClinicStatus';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';
import { useUI } from '../context/UIContext';

const Contact: React.FC = () => {
  const { t } = useLocale();
  const { isOpenNow, closeLabel } = useClinicStatus();
  const { openBookingModal } = useUI();

  const [activeLocation, setActiveLocation] = useState<string>(LOCATIONS[0]?.key ?? 'alexandria');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Family Practice',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 8000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <section className="hh-page-hero grain">
        <div className="container">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">{t.locations.eyebrow}</span>
            <h1 className="font-display hh-page-title">
              Two clinics in <span className="hh-em">Cenla.</span>
            </h1>
            <p className="lead lead-lg">
              Alexandria and Pineville. Ample parking. Wheelchair accessible. Open status updated live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hh-contact">
        <div className="container hh-contact-grid">
          <Reveal as="div" className="hh-contact-info">
            <div className="hh-contact-tabs" role="tablist" aria-label="Choose a clinic">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.key}
                  type="button"
                  role="tab"
                  aria-selected={activeLocation === loc.key}
                  onClick={() => setActiveLocation(loc.key)}
                  className={`hh-contact-tab ${activeLocation === loc.key ? 'is-active' : ''}`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            {LOCATIONS.filter((l) => l.key === activeLocation).map((loc) => (
              <div key={loc.key} className="hh-glass-surface hh-contact-card">
                <div className="hh-contact-card-row">
                  <span className={`tag ${isOpenNow ? 'tag-live' : 'tag-closed'}`}>
                    {isOpenNow ? `${t.locations.open_now}, closing in ${closeLabel}` : `${t.locations.closed_now}, opens ${closeLabel}`}
                  </span>
                  {loc.flagship && <span className="small-label">Flagship</span>}
                </div>

                <div className="hh-contact-list">
                  <div className="hh-contact-item">
                    <MapPin size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">Address</div>
                      <div>{loc.address}</div>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-grow hh-contact-link"
                      >
                        Get directions ↗
                      </a>
                    </div>
                  </div>
                  <div className="hh-contact-item">
                    <Phone size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">Phone</div>
                      <a href={`tel:${loc.tel}`} className="font-mono">
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                  <div className="hh-contact-item">
                    <Mail size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">Email</div>
                      <a href={`mailto:${loc.email}`} className="underline-grow">
                        {loc.email}
                      </a>
                    </div>
                  </div>
                  <div className="hh-contact-item">
                    <Clock size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">Hours</div>
                      <ul className="hh-contact-hours">
                        <li><span>Mon – Thu</span><span className="font-mono">7:45a – 5:00p</span></li>
                        <li><span>Friday</span><span className="font-mono">7:45a – 12:00p</span></li>
                        <li><span>Sat – Sun</span><span className="font-mono">Closed</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hh-contact-actions">
                  <a href={`tel:${loc.tel}`} className="btn btn-primary">
                    <Phone size={16} strokeWidth={1.8} /> Call {loc.city}
                  </a>
                  <button onClick={openBookingModal} className="btn btn-terracotta">
                    Request a visit <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div className="hh-contact-drive">
              <div className="small-label">Not sure which to pick?</div>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--ink-soft)', fontSize: '0.92rem' }}>
                Both clinics share the same providers, hours, and standard of care. Choose the
                one closer to you, or call and we will route you.
              </p>
            </div>
          </Reveal>

          <Reveal as="div" delay={150} className="hh-contact-map">
            <LocationsMap
              locations={LOCATIONS.map((l) => ({
                key: l.key,
                name: l.city,
                coords: l.coords,
              }))}
              activeKey={activeLocation}
              onPick={(key) => setActiveLocation(key)}
              center={[LOCATIONS[0]?.coords.lng ?? -92.4693, LOCATIONS[0]?.coords.lat ?? 31.3146]}
              zoom={11}
            />
          </Reveal>
        </div>
      </section>

      <section className="hh-contact-form-section">
        <div className="container hh-contact-form-grid">
          <Reveal as="div" className="hh-section-header">
            <span className="eyebrow">Reach the team</span>
            <h2 className="font-display hh-section-title">
              For non-urgent questions. <br />
              <span className="hh-em">For care, please call.</span>
            </h2>
            <p className="lead">
              Front desk replies within one business day. For same-day visits, walk in or call.
            </p>
          </Reveal>

          <div className="hh-contact-form-card hh-glass-surface">
            {submitted ? (
              <div className="hh-contact-success">
                <div className="hh-contact-success-mark" aria-hidden="true">
                  <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                    <circle cx="30" cy="30" r="28" stroke="var(--sage)" strokeWidth="2" />
                    <path
                      d="M18 31 L26 39 L42 22"
                      stroke="var(--forest)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-display">Message sent.</h3>
                <p className="lead">Thank you. The team will reply within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="hh-contact-form">
                <div className="hh-contact-form-row">
                  <label>
                    <span>Full name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>
                <div className="hh-contact-form-row">
                  <label>
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </label>
                  <label>
                    <span>Department</span>
                    <select name="department" value={form.department} onChange={handleChange}>
                      <option>Family Practice</option>
                      <option>Pediatrics</option>
                      <option>Women&rsquo;s Health</option>
                      <option>Gastroenterology</option>
                      <option>Podiatry</option>
                      <option>Lab &amp; Imaging</option>
                      <option>Billing</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label>
                  <span>How can we help?</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="A brief note. Do not include sensitive medical details."
                  />
                </label>
                <button type="submit" className="btn btn-terracotta hh-contact-form-submit">
                  Send message <ArrowRight size={14} />
                </button>
                <p className="small-label hh-contact-form-note">
                  This form is for non-emergency questions. For urgent care, call us. For
                  emergencies, call 911.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-page-hero { padding: clamp(3rem, 6vw, 5rem) 0; }
        .hh-page-title { font-size: clamp(2.4rem, 6vw, 4.4rem); line-height: 1.02; letter-spacing: -0.022em; color: var(--forest-deep); margin: 0; font-weight: 400; }
        .hh-em { color: var(--terracotta-deep); font-style: italic; }
        .hh-section-header { display: grid; gap: 0.8rem; max-width: 60ch; }
        .hh-section-title { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.05; letter-spacing: -0.02em; color: var(--forest-deep); margin: 0; font-weight: 400; }

        .hh-contact { padding: clamp(2rem, 4vw, 3rem) 0 clamp(3rem, 5vw, 5rem); }
        .hh-contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.3fr;
          gap: 1.4rem;
        }
        @media (max-width: 980px) { .hh-contact-grid { grid-template-columns: 1fr; } }

        .hh-contact-tabs {
          display: inline-flex;
          padding: 0.25rem;
          gap: 0.2rem;
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid var(--line);
          border-radius: 999px;
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
          align-self: flex-start;
          width: fit-content;
        }
        .hh-contact-tab {
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: var(--ink-soft);
          font: inherit;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: 180ms ease;
        }
        .hh-contact-tab:hover { color: var(--forest-deep); }
        .hh-contact-tab.is-active {
          background: var(--forest);
          color: var(--bone);
          box-shadow: 0 6px 18px -8px rgba(7, 23, 45, 0.4);
        }

        .hh-contact-card {
          border-radius: 28px;
          padding: 1.6rem 1.6rem 1.4rem;
          display: grid;
          gap: 1.2rem;
          align-content: start;
        }
        .hh-contact-card-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }

        .hh-contact-list { display: grid; gap: 1.1rem; }
        .hh-contact-item { display: grid; grid-template-columns: 28px 1fr; gap: 0.8rem; align-items: start; color: var(--ink-soft); font-size: 0.95rem; }
        .hh-contact-item .small-label { display: block; color: var(--ink-mute); margin-bottom: 0.15rem; }
        .hh-contact-item a { color: var(--forest-deep); }
        .hh-contact-link { display: inline-block; margin-top: 0.4rem; color: var(--terracotta-deep); font-size: 0.85rem; }
        .hh-contact-hours { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.25rem; }
        .hh-contact-hours li { display: flex; justify-content: space-between; gap: 1rem; }

        .hh-contact-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .hh-contact-actions .btn { flex: 1; min-width: 140px; }

        .hh-contact-drive {
          margin-top: 1.2rem;
          padding: 1rem 1.3rem;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 20px;
        }
        .hh-contact-drive .small-label { color: var(--terracotta-deep); margin-bottom: 0.6rem; }
        .hh-contact-drive-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem 1.6rem; color: var(--ink-soft); }
        .hh-contact-drive-list li { display: flex; justify-content: space-between; gap: 1rem; }

        .hh-contact-map { position: sticky; top: 100px; }
        @media (max-width: 980px) { .hh-contact-map { position: static; } }

        .hh-contact-form-section {
          padding: clamp(3rem, 6vw, 5rem) 0;
          background: linear-gradient(165deg, rgba(224,242,254,0.65), var(--sand-soft));
        }
        .hh-contact-form-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: start;
        }
        @media (max-width: 980px) { .hh-contact-form-grid { grid-template-columns: 1fr; } }

        .hh-contact-form-card { border-radius: 28px; padding: 2rem; }
        .hh-contact-form { display: grid; gap: 0.9rem; }
        .hh-contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
        @media (max-width: 600px) { .hh-contact-form-row { grid-template-columns: 1fr; } }
        .hh-contact-form label { display: grid; gap: 0.3rem; }
        .hh-contact-form span { font-size: 0.85rem; color: var(--ink-mute); font-weight: 600; }
        .hh-contact-form input,
        .hh-contact-form textarea,
        .hh-contact-form select {
          padding: 0.85rem 0.95rem;
          border-radius: 14px;
          border: 1px solid var(--line-strong);
          font: inherit;
          background: rgba(255,255,255,0.78);
          color: var(--ink);
        }
        .hh-contact-form textarea { resize: vertical; min-height: 110px; }
        .hh-contact-form input:focus,
        .hh-contact-form textarea:focus,
        .hh-contact-form select:focus { outline: none; border-color: var(--forest); box-shadow: var(--focus); }
        .hh-contact-form-submit { width: 100%; }
        .hh-contact-form-note { color: var(--ink-mute); margin-top: 0.4rem; }

        .hh-contact-success { text-align: center; padding: 1rem; }
        .hh-contact-success h3 { font-size: 1.6rem; color: var(--forest-deep); margin: 1rem 0 0.4rem; }
      `}</style>
    </>
  );
};

export default Contact;
