import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { PageRoute } from '../../types';
import { useUI } from '../../context/UIContext';
import { CLINIC } from '../../data/clinicData';
import { useClinicStatus } from '../Harmony/useClinicStatus';

const NAV = [
  { name: 'Home', path: PageRoute.HOME },
  { name: 'Services', path: PageRoute.SERVICES },
  { name: 'About', path: PageRoute.ABOUT },
  { name: 'Patient Resources', path: PageRoute.PATIENT_RESOURCES },
  { name: 'Contact', path: PageRoute.CONTACT },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, openBookingModal } = useUI();
  const { isOpenNow, closeLabel } = useClinicStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* TOP BAR — desktop only */}
      <div
        className="hidden lg:block py-2 text-xs"
        style={{
          background: 'var(--forest-deep)',
          color: 'var(--sage-light)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full pulse-dot"
                style={{ background: isOpenNow ? '#34d399' : '#fbbf24' }}
              />
              {isOpenNow ? `Open · Closing in ${closeLabel}` : `Currently closed · Opens ${closeLabel}`}
            </span>
            <span style={{ color: 'var(--sage)' }}>·</span>
            <span>Established patients welcome same-day</span>
            <span style={{ color: 'var(--sage)' }}>·</span>
            <a
              href={CLINIC.patientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow"
            >
              Patient Portal ↗
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setLang('en')}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider transition"
                style={{
                  background: lang === 'en' ? 'var(--ivory)' : 'transparent',
                  color: lang === 'en' ? 'var(--forest)' : 'var(--sage-light)',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider transition"
                style={{
                  background: lang === 'es' ? 'var(--ivory)' : 'transparent',
                  color: lang === 'es' ? 'var(--forest)' : 'var(--sage-light)',
                }}
              >
                ES
              </button>
            </div>
            <a href={`tel:${CLINIC.tel}`} className="font-mono">
              {CLINIC.phone}
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAV — sticky w/ backdrop blur */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250, 247, 242, 0.92)' : 'rgba(250, 247, 242, 0.5)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to={PageRoute.HOME} className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="var(--forest)" strokeWidth="1.5" />
              <path
                d="M13 14v12M27 14v12M13 20h14"
                stroke="var(--forest)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="20" r="2.8" fill="var(--terracotta)" />
            </svg>
            <div className="leading-none">
              <div className="font-display text-xl tracking-tight" style={{ color: 'var(--forest)' }}>
                theCLINICS
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.22em] mt-0.5"
                style={{ color: 'var(--ink-soft)' }}
              >
                Cenla · Modern healthcare
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            {NAV.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="underline-grow"
                style={{
                  color: 'var(--ink)',
                  fontWeight: isActive(link.path) ? 600 : 400,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {user.avatar && (
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                  )}
                  <span className="font-medium text-xs" style={{ color: 'var(--forest)' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 rounded-2xl py-2 fade-in"
                    style={{
                      background: 'var(--ivory)',
                      border: '1px solid var(--line)',
                      boxShadow: '0 24px 48px -20px rgba(31, 58, 46, 0.28)',
                    }}
                  >
                    <div className="px-4 py-2 border-b mb-2" style={{ borderColor: 'var(--line)' }}>
                      <div className="small-whisper" style={{ color: 'var(--ink-mute)' }}>
                        Signed in as
                      </div>
                      <div
                        className="font-medium text-sm truncate"
                        style={{ color: 'var(--forest)' }}
                      >
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigate(PageRoute.DASHBOARD);
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center gap-2"
                      style={{ color: 'var(--forest)' }}
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        navigate(PageRoute.HOME);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center gap-2"
                      style={{ color: 'var(--terracotta-deep)' }}
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <a
              href={`tel:${CLINIC.tel}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full btn-call"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden md:inline">Call</span>
            </a>
            <button
              onClick={openBookingModal}
              className="hidden md:inline-block px-5 py-2.5 text-sm font-medium rounded-full btn-primary"
            >
              Book a Visit
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={22} color="var(--forest)" />
              ) : (
                <Menu size={22} color="var(--forest)" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden border-t"
            style={{ borderColor: 'var(--line)', background: 'var(--ivory)' }}
          >
            <div className="px-6 py-6 space-y-4 text-base">
              {NAV.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                  style={{
                    color: isActive(link.path) ? 'var(--terracotta)' : 'var(--forest)',
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
                className="block"
                style={{ color: 'var(--forest)' }}
              >
                Patient Portal ↗
              </a>
              {user ? (
                <Link
                  to={PageRoute.DASHBOARD}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2"
                  style={{ color: 'var(--terracotta)' }}
                >
                  <LayoutDashboard size={18} /> My Dashboard
                </Link>
              ) : null}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full mt-2 px-5 py-3 text-center font-medium rounded-full btn-primary"
              >
                Book a Visit
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
