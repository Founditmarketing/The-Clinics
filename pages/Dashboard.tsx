import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Pill,
  User,
} from 'lucide-react';
import { useUI } from '../context/UIContext';
import { CLINIC } from '../data/clinicData';
import { PageRoute } from '../types';
import { Reveal } from '../components/Harmony/i18n';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';

const Dashboard: React.FC = () => {
  const { user, appointments, openBookingModal } = useUI();

  if (!user) return <Navigate to={PageRoute.HOME} />;

  const upcoming = appointments.filter((a) => a.status !== 'Completed');
  const next = upcoming.length > 0 ? upcoming[0] : null;

  return (
    <>
      <section className="hh-dash-hero grain">
        <div className="container hh-dash-hero-inner">
          <Reveal as="div" className="hh-dash-hero-row">
            <div className="hh-dash-greet">
              {user.avatar && (
                <img src={user.avatar} alt="" className="hh-dash-avatar" />
              )}
              <div>
                <span className="small-label">Patient · ID 8829-TC</span>
                <h1 className="font-display hh-dash-title">Welcome, {user.name.split(' ')[0]}.</h1>
              </div>
            </div>
            <div className="hh-dash-hero-actions">
              <button className="hh-dash-bell" aria-label="Notifications">
                <Bell size={18} strokeWidth={1.6} />
                <span className="hh-dash-bell-dot" />
              </button>
              <button onClick={openBookingModal} className="btn btn-terracotta">
                Book a visit <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hh-dash-content">
        <div className="container hh-dash-grid">
          <div className="hh-dash-main">
            {next ? (
              <Reveal as="div" className="hh-dash-next hh-glass-surface">
                <div className="hh-dash-next-row">
                  <div>
                    <span className="small-label" style={{ color: 'var(--terracotta-deep)' }}>
                      Up next
                    </span>
                    <h2 className="font-display hh-dash-next-title">
                      {next.serviceName}
                    </h2>
                  </div>
                  <div className="hh-dash-next-icon">
                    <Calendar size={22} strokeWidth={1.6} />
                  </div>
                </div>
                <div className="hh-dash-next-meta">
                  <div className="hh-dash-next-meta-item">
                    <User size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">Provider</div>
                      <div>{next.doctorName}</div>
                    </div>
                  </div>
                  <div className="hh-dash-next-meta-item">
                    <Clock size={20} strokeWidth={1.6} />
                    <div>
                      <div className="small-label">When</div>
                      <div className="font-mono">{next.date} · {next.time}</div>
                    </div>
                  </div>
                  <div className="hh-dash-next-actions">
                    <button className="btn btn-ghost">Reschedule</button>
                    <a href={`tel:${CLINIC.tel}`} className="btn btn-primary">
                      <Phone size={16} strokeWidth={1.8} /> Call clinic
                    </a>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal as="div" className="hh-dash-empty hh-glass-surface">
                <Calendar size={32} strokeWidth={1.5} />
                <h3 className="font-display">No upcoming appointments.</h3>
                <p>Book your next visit when you are ready.</p>
                <button onClick={openBookingModal} className="btn btn-terracotta">
                  Book a visit <ArrowRight size={14} />
                </button>
              </Reveal>
            )}

            <Reveal as="div" delay={100} className="hh-dash-vitals">
              {[
                { label: 'Heart rate', value: '72', unit: 'bpm', tone: 'rose' },
                { label: 'Blood pressure', value: '120/80', unit: '', tone: 'sky' },
                { label: 'Weight', value: '165', unit: 'lbs', tone: 'amber' },
              ].map((v) => (
                <div key={v.label} className={`hh-dash-vital hh-dash-vital-${v.tone}`}>
                  <div className="hh-dash-vital-icon">
                    <Activity size={18} strokeWidth={1.8} />
                  </div>
                  <div className="small-label">{v.label}</div>
                  <div className="hh-dash-vital-num font-display">
                    {v.value}{' '}
                    {v.unit && <span className="hh-dash-vital-unit">{v.unit}</span>}
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal as="div" delay={140} className="hh-dash-history hh-glass-surface">
              <div className="hh-dash-section-row">
                <h3 className="font-display hh-dash-section-title">Recent activity</h3>
                <Link to="/services" className="underline-grow" style={{ color: 'var(--forest-deep)' }}>
                  Book again →
                </Link>
              </div>
              <ul className="hh-dash-history-list">
                {appointments.map((a) => (
                  <li key={a.id} className={`hh-dash-history-row ${a.status === 'Completed' ? 'is-done' : ''}`}>
                    <div className="hh-dash-history-date">
                      {a.date.split(' ').slice(-1)[0]}
                    </div>
                    <div className="hh-dash-history-meta">
                      <div className="hh-dash-history-name">{a.serviceName}</div>
                      <div className="small-label">
                        {a.doctorName} · {a.status}
                      </div>
                    </div>
                    <ChevronRight size={18} strokeWidth={1.8} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="hh-dash-side">
            <Reveal as="div" delay={120} className="hh-dash-side-card hh-glass-surface">
              <h3 className="font-display hh-dash-section-title">Quick actions</h3>
              <ul className="hh-dash-quick">
                <li>
                  <a href={CLINIC.patientPortalUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hh-dash-quick-icon hh-dash-quick-icon-blue">
                      <MessageSquare size={16} strokeWidth={1.8} />
                    </span>
                    <span>Message provider</span>
                    <ChevronRight size={14} strokeWidth={1.8} />
                  </a>
                </li>
                <li>
                  <a href={CLINIC.patientPortalUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hh-dash-quick-icon hh-dash-quick-icon-green">
                      <Pill size={16} strokeWidth={1.8} />
                    </span>
                    <span>Refill prescriptions</span>
                    <ChevronRight size={14} strokeWidth={1.8} />
                  </a>
                </li>
                <li>
                  <a href={CLINIC.patientPortalUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hh-dash-quick-icon hh-dash-quick-icon-purple">
                      <FileText size={16} strokeWidth={1.8} />
                    </span>
                    <span>Lab results</span>
                    <ChevronRight size={14} strokeWidth={1.8} />
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal as="div" delay={180} className="hh-dash-help">
              <h3 className="font-display hh-dash-help-title">Need help right now?</h3>
              <p>Front desk is open during business hours.</p>
              <a href={`tel:${CLINIC.tel}`} className="btn btn-light" style={{ width: '100%' }}>
                <Phone size={16} strokeWidth={1.8} /> {CLINIC.phone}
              </a>
            </Reveal>
          </aside>
        </div>
      </section>

      <MobileBottomBar onBook={openBookingModal} />

      <style>{`
        .hh-dash-hero { padding: clamp(2rem, 4vw, 3rem) 0 clamp(1rem, 2vw, 2rem); }
        .hh-dash-hero-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .hh-dash-greet { display: flex; align-items: center; gap: 1rem; }
        .hh-dash-avatar { width: 64px; height: 64px; border-radius: 999px; object-fit: cover; border: 2px solid rgba(255,255,255,0.7); box-shadow: var(--shadow-card); }
        .hh-dash-title { font-size: clamp(1.8rem, 3.6vw, 2.4rem); color: var(--forest-deep); margin: 0.25rem 0 0; line-height: 1; }
        .hh-dash-hero-actions { display: flex; align-items: center; gap: 0.5rem; }
        .hh-dash-bell { width: 44px; height: 44px; border-radius: 999px; background: rgba(255,255,255,0.7); border: 1px solid var(--line); position: relative; cursor: pointer; color: var(--forest-deep); display: inline-flex; align-items: center; justify-content: center; }
        .hh-dash-bell-dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; border-radius: 999px; background: #ef4444; border: 2px solid #fff; }

        .hh-dash-content { padding: 0 0 clamp(3rem, 5vw, 5rem); }
        .hh-dash-grid {
          display: grid;
          grid-template-columns: 1.6fr 0.8fr;
          gap: 1.4rem;
        }
        @media (max-width: 980px) { .hh-dash-grid { grid-template-columns: 1fr; } }

        .hh-dash-main { display: grid; gap: 1rem; }
        .hh-dash-next { padding: 1.6rem; border-radius: 28px; }
        .hh-dash-next-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .hh-dash-next-title { font-size: 1.5rem; color: var(--forest-deep); margin: 0.3rem 0 0; }
        .hh-dash-next-icon { width: 44px; height: 44px; border-radius: 14px; background: rgba(193,53,42,0.10); color: var(--terracotta-deep); display: inline-flex; align-items: center; justify-content: center; }
        .hh-dash-next-meta { display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: center; margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid var(--line); }
        @media (max-width: 720px) { .hh-dash-next-meta { grid-template-columns: 1fr; } }
        .hh-dash-next-meta-item { display: grid; grid-template-columns: 26px 1fr; gap: 0.6rem; align-items: center; color: var(--ink-soft); }
        .hh-dash-next-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

        .hh-dash-empty { padding: 2.4rem 1.6rem; border-radius: 24px; text-align: center; display: grid; gap: 0.5rem; justify-items: center; }
        .hh-dash-empty h3 { font-size: 1.4rem; color: var(--forest-deep); margin: 0; }
        .hh-dash-empty p { color: var(--ink-soft); margin: 0; }

        .hh-dash-vitals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
        @media (max-width: 720px) { .hh-dash-vitals { grid-template-columns: 1fr; } }
        .hh-dash-vital {
          padding: 1rem 1.1rem;
          border-radius: 18px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.55);
          display: grid;
          gap: 0.4rem;
          align-content: start;
        }
        .hh-dash-vital-icon { width: 32px; height: 32px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; }
        .hh-dash-vital-rose .hh-dash-vital-icon { background: #fee2e2; color: #b91c1c; }
        .hh-dash-vital-sky .hh-dash-vital-icon { background: #dbeafe; color: #1d4ed8; }
        .hh-dash-vital-amber .hh-dash-vital-icon { background: #fef3c7; color: #b45309; }
        .hh-dash-vital-num { font-size: 1.5rem; line-height: 1; color: var(--forest-deep); }
        .hh-dash-vital-unit { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--ink-mute); }

        .hh-dash-history { padding: 1.4rem; border-radius: 24px; }
        .hh-dash-section-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .hh-dash-section-title { font-size: 1.2rem; color: var(--forest-deep); margin: 0; }
        .hh-dash-history-list { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; gap: 0.8rem; }
        .hh-dash-history-row {
          display: grid;
          grid-template-columns: 44px 1fr 24px;
          gap: 0.7rem;
          align-items: center;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--line);
        }
        .hh-dash-history-row:last-child { border-bottom: none; }
        .hh-dash-history-date {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--ivory-deep);
          color: var(--forest-deep);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .hh-dash-history-row.is-done .hh-dash-history-date { background: rgba(148,163,184,0.18); color: var(--ink-mute); }
        .hh-dash-history-name { font-weight: 600; color: var(--forest-deep); }
        .hh-dash-history-row svg { color: var(--ink-mute); }

        .hh-dash-side { display: grid; gap: 1rem; align-content: start; }
        .hh-dash-side-card { padding: 1.4rem; border-radius: 24px; }
        .hh-dash-quick { list-style: none; padding: 0; margin: 0.6rem 0 0; display: grid; gap: 0.4rem; }
        .hh-dash-quick a {
          display: grid;
          grid-template-columns: 32px 1fr 16px;
          gap: 0.6rem;
          align-items: center;
          padding: 0.7rem 0.8rem;
          background: rgba(255,255,255,0.5);
          border: 1px solid var(--line);
          border-radius: 14px;
          color: var(--forest-deep);
          font: inherit;
          font-weight: 500;
        }
        .hh-dash-quick a:hover { background: rgba(255,255,255,0.85); }
        .hh-dash-quick-icon { width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; }
        .hh-dash-quick-icon-blue { background: #dbeafe; color: #1d4ed8; }
        .hh-dash-quick-icon-green { background: #dcfce7; color: #166534; }
        .hh-dash-quick-icon-purple { background: #ede9fe; color: #6d28d9; }

        .hh-dash-help {
          padding: 1.6rem;
          border-radius: 24px;
          background: linear-gradient(165deg, #07172d 0%, #0b2747 60%, #134075 100%);
          color: var(--bone);
          display: grid;
          gap: 0.6rem;
        }
        .hh-dash-help-title { font-size: 1.2rem; color: var(--bone); margin: 0; }
        .hh-dash-help p { color: var(--sage-light); margin: 0; font-size: 0.95rem; }
      `}</style>
    </>
  );
};

export default Dashboard;
