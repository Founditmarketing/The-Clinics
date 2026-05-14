import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, Phone, X } from 'lucide-react';
import { PageRoute } from '../../types';
import { useUI } from '../../context/UIContext';
import { CLINIC } from '../../data/clinicData';
import { useClinicStatus } from '../Harmony/useClinicStatus';
import { useLocale, Locale } from '../Harmony/i18n';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUI();
  const { isOpenNow, closeLabel } = useClinicStatus();
  const { locale, setLocale, t } = useLocale();

  const openPortal = () => {
    window.open(CLINIC.patientPortalUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const NAV = [
    { key: 'services', name: t.nav.services, path: PageRoute.SERVICES },
    { key: 'team', name: t.nav.team, path: PageRoute.ABOUT },
    { key: 'locations', name: t.nav.locations, path: PageRoute.CONTACT },
    { key: 'resources', name: t.nav.portal, path: PageRoute.PATIENT_RESOURCES },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top bar — desktop only, dark glass */}
      <div className="hh-top-bar">
        <div className="hh-top-inner">
          <div className="hh-top-left">
            <span className={`tag ${isOpenNow ? 'tag-live' : 'tag-closed'} tag-on-dark`} style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'var(--bone)' }}>
              {isOpenNow ? `${t.locations.open_now} · closing in ${closeLabel}` : `${t.locations.closed_now} · opens ${closeLabel}`}
            </span>
            <span className="hh-top-divider" aria-hidden>·</span>
            <a
              href={CLINIC.patientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow"
            >
              {t.nav.portal} ↗
            </a>
          </div>
          <div className="hh-top-right">
            <div className="hh-lang">
              {(['en', 'es'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`hh-lang-btn ${locale === l ? 'is-active' : ''}`}
                  aria-pressed={locale === l}
                  aria-label={t.sr.lang_toggle}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={`tel:${CLINIC.tel}`} className="font-mono hh-top-phone">
              {CLINIC.phone}
            </a>
          </div>
        </div>
      </div>

      <header className={`hh-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="hh-nav-inner">
          <Link to={PageRoute.HOME} className="hh-brand" aria-label="theCLINICS — home">
            <img src="/logo.png" alt="theCLINICS" className="hh-brand-logo" />
          </Link>

          <nav className="hh-links" aria-label="Primary">
            {NAV.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className="underline-grow hh-link"
                style={{ fontWeight: isActive(link.path) ? 600 : 400 }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hh-actions">
            {user && (
              <div className="hh-user">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hh-user-btn"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  {user.avatar && <img src={user.avatar} alt="" className="hh-avatar" />}
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="hh-user-menu fade-in" role="menu">
                    <div className="hh-user-meta">
                      <div className="small-label">Signed in as</div>
                      <div className="hh-user-email">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        navigate(PageRoute.DASHBOARD);
                        setUserMenuOpen(false);
                      }}
                      className="hh-user-item"
                    >
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        navigate(PageRoute.HOME);
                      }}
                      className="hh-user-item is-danger"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <a href={`tel:${CLINIC.tel}`} className="btn btn-ghost hh-call-btn">
              <Phone size={16} strokeWidth={1.8} />
              <span className="hidden md:inline">Call</span>
            </a>
            <button onClick={openPortal} className="btn btn-terracotta hh-book-btn">
              {t.nav.book}
            </button>
            <button
              className="hh-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.sr.open_menu}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="hh-mobile-menu">
            <div className="hh-mobile-inner">
              {NAV.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="hh-mobile-link"
                  style={{
                    color: isActive(link.path) ? 'var(--terracotta-deep)' : 'var(--forest-deep)',
                    fontWeight: isActive(link.path) ? 600 : 400,
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={CLINIC.patientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hh-mobile-link"
              >
                {t.nav.portal} ↗
              </a>
              <div className="hh-mobile-lang">
                {(['en', 'es'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`hh-lang-btn ${locale === l ? 'is-active' : ''}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openPortal();
                }}
                className="btn btn-terracotta"
                style={{ width: '100%' }}
              >
                {t.nav.book}
              </button>
              <a
                href={`tel:${CLINIC.tel}`}
                className="btn btn-ghost"
                style={{ width: '100%' }}
              >
                <Phone size={16} strokeWidth={1.8} /> {CLINIC.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .hh-top-bar {
          display: none;
          background: var(--forest-deep);
          color: var(--bone);
          font-size: 0.78rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 1024px) {
          .hh-top-bar { display: block; }
        }
        .hh-top-inner {
          width: var(--container);
          margin: 0 auto;
          padding: 0.6rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .hh-top-left, .hh-top-right { display: flex; align-items: center; gap: 1.2rem; }
        .hh-top-divider { color: rgba(255,255,255,0.28); }
        .hh-top-phone { color: var(--bone); opacity: 0.92; letter-spacing: 0.01em; }

        .hh-lang { display: inline-flex; gap: 0.15rem; padding: 0.15rem; border-radius: 999px; background: rgba(255,255,255,0.08); }
        .hh-lang-btn {
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          cursor: pointer;
          transition: 200ms ease;
        }
        .hh-lang-btn:hover { color: var(--bone); }
        .hh-lang-btn.is-active { background: var(--bone); color: var(--forest-deep); }

        .hh-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(248,251,254,0.55);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid transparent;
          transition: 280ms ease;
        }
        .hh-nav.is-scrolled {
          background: rgba(248,251,254,0.88);
          border-bottom: 1px solid var(--line);
          box-shadow: 0 8px 28px -18px rgba(7,46,88,0.22);
        }
        .hh-nav-inner {
          width: var(--container);
          margin: 0 auto;
          padding: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
        }
        .hh-brand { display: inline-flex; align-items: center; gap: 0.8rem; flex-shrink: 0; }
        .hh-brand-logo {
          height: 56px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hh-brand:hover .hh-brand-logo { transform: scale(1.04); }
        @media (max-width: 600px) {
          .hh-brand-logo { height: 44px; }
        }

        .hh-links {
          display: none;
          gap: 2rem;
          align-items: center;
          font-size: 0.92rem;
          color: var(--ink-soft);
        }
        @media (min-width: 1024px) { .hh-links { display: flex; } }
        .hh-link { color: var(--ink-soft); transition: color 180ms ease; }
        .hh-link:hover { color: var(--forest-deep); }

        .hh-actions { display: flex; align-items: center; gap: 0.55rem; }
        .hh-call-btn { padding: 0.7rem 1rem; min-height: 44px; }
        .hh-book-btn { padding: 0.7rem 1.3rem; min-height: 44px; }
        @media (max-width: 1023px) { .hh-book-btn { display: none; } }

        .hh-menu-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: rgba(255,255,255,0.6);
          border: 1px solid var(--line);
          cursor: pointer;
          color: var(--forest-deep);
          backdrop-filter: blur(8px);
        }
        @media (min-width: 1024px) { .hh-menu-toggle { display: none; } }

        .hh-user { position: relative; }
        .hh-user-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.85rem 0.4rem 0.4rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          font-size: 0.85rem;
          color: var(--forest-deep);
          cursor: pointer;
        }
        .hh-avatar { width: 28px; height: 28px; border-radius: 999px; object-fit: cover; }
        .hh-user-menu {
          position: absolute;
          top: calc(100% + 0.4rem);
          right: 0;
          width: 220px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(18px);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 0.55rem;
          box-shadow: var(--shadow-card);
          z-index: 60;
        }
        .hh-user-meta { padding: 0.5rem 0.7rem 0.6rem; border-bottom: 1px solid var(--line); }
        .hh-user-email { font-size: 0.85rem; font-weight: 600; color: var(--forest-deep); margin-top: 0.2rem; word-break: break-all; }
        .hh-user-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          width: 100%;
          padding: 0.55rem 0.7rem;
          border: none;
          background: none;
          text-align: left;
          font: inherit;
          color: var(--forest-deep);
          border-radius: 10px;
          cursor: pointer;
        }
        .hh-user-item:hover { background: rgba(225, 27, 27,0.10); }
        .hh-user-item.is-danger { color: #b91c1c; }

        .hh-mobile-menu {
          background: rgba(248,251,254,0.97);
          backdrop-filter: blur(22px);
          border-top: 1px solid var(--line);
        }
        .hh-mobile-inner {
          width: var(--container);
          margin: 0 auto;
          padding: 1.2rem 0 1.6rem;
          display: grid;
          gap: 0.7rem;
        }
        .hh-mobile-link {
          display: block;
          padding: 0.5rem 0;
          font-size: 1rem;
          color: var(--forest-deep);
        }
        .hh-mobile-lang {
          padding-top: 0.6rem;
          border-top: 1px solid var(--line);
          display: flex;
          gap: 0.4rem;
        }
        .hh-mobile-lang .hh-lang-btn {
          background: rgba(225, 27, 27,0.10);
          color: var(--forest-deep);
          padding: 0.4rem 1rem;
        }
        .hh-mobile-lang .hh-lang-btn.is-active {
          background: var(--forest);
          color: var(--bone);
        }
      `}</style>
    </>
  );
};

export default Header;
