import React, { useEffect, useRef, useState } from 'react';
import {
  Stethoscope,
  Activity,
  Clock,
  Heart,
  Bone,
  Wind,
  Zap,
  Scan,
  Monitor,
  FlaskConical,
  Baby,
  Brain,
  Eye,
  Syringe,
  ArrowRight,
} from 'lucide-react';
import { useUI } from '../context/UIContext';
import {
  CLINIC,
  DOCTORS,
  SERVICES,
  FAQS,
  TESTIMONIALS,
  PROVIDER_FILTER_TABS,
} from '../data/clinicData';
import { Doctor, ServiceItem } from '../types';

import StatCounter from '../components/Harmony/StatCounter';
import Preloader from '../components/Harmony/Preloader';
import InsuranceTicker from '../components/Harmony/InsuranceTicker';
import LiveStatusPanel from '../components/Harmony/LiveStatusPanel';
import BeforeAfterSlider from '../components/Harmony/BeforeAfterSlider';
import SymptomChecker from '../components/Harmony/SymptomChecker';
import DoctorModal from '../components/Harmony/DoctorModal';
import SectionDotNav from '../components/Harmony/SectionDotNav';
import MobileBottomBar from '../components/Harmony/MobileBottomBar';
import { useClinicStatus } from '../components/Harmony/useClinicStatus';

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'symptom', label: 'Symptom checker' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'location', label: 'Location' },
  { id: 'faq', label: 'FAQ' },
  { id: 'book', label: 'Book' },
];

const PROVIDER_HEIGHTS = ['3/4', '4/5', '3/4', '5/6', '3/4', '4/5', '5/6', '3/4'];

const renderServiceIcon = (name: ServiceItem['iconName'], size = 22) => {
  const props = { size } as { size?: number };
  switch (name) {
    case 'Stethoscope':
      return <Stethoscope {...props} strokeWidth={1.6} />;
    case 'Heart':
      return <Heart {...props} strokeWidth={1.6} />;
    case 'Activity':
      return <Activity {...props} strokeWidth={1.6} />;
    case 'Clock':
      return <Clock {...props} strokeWidth={1.6} />;
    case 'Bone':
      return <Bone {...props} strokeWidth={1.6} />;
    case 'Wind':
      return <Wind {...props} strokeWidth={1.6} />;
    case 'Zap':
      return <Zap {...props} strokeWidth={1.6} />;
    case 'Scan':
      return <Scan {...props} strokeWidth={1.6} />;
    case 'Monitor':
      return <Monitor {...props} strokeWidth={1.6} />;
    case 'Lab':
      return <FlaskConical {...props} strokeWidth={1.6} />;
    case 'Baby':
      return <Baby {...props} strokeWidth={1.6} />;
    case 'Brain':
      return <Brain {...props} strokeWidth={1.6} />;
    case 'Eye':
      return <Eye {...props} strokeWidth={1.6} />;
    case 'Syringe':
      return <Syringe {...props} strokeWidth={1.6} />;
    default:
      return <ArrowRight {...props} />;
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

  // Section spy + scroll
  const [activeSection, setActiveSection] = useState('top');
  const [scrolled, setScrolled] = useState(false);

  // Hero
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorInHero, setCursorInHero] = useState(false);

  // Mission stats reveal
  const missionRef = useRef<HTMLDivElement | null>(null);
  const [missionVisible, setMissionVisible] = useState(false);

  // Provider grid
  const [providerFilter, setProviderFilter] = useState('all');
  const [openProvider, setOpenProvider] = useState<Doctor | null>(null);

  // FAQ
  const [openFaq, setOpenFaq] = useState(0);

  // Preloader / emergency flash
  const [loading, setLoading] = useState(true);
  const [emergencyFlash, setEmergencyFlash] = useState(false);

  const { now, isOpenNow, greeting, closeLabel, fluSeason } = useClinicStatus();

  // Preloader timer
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // Hero reveal slightly delayed for theatrics
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mission stats intersection
  useEffect(() => {
    if (!missionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setMissionVisible(true),
      { threshold: 0.3 },
    );
    observer.observe(missionRef.current);
    return () => observer.disconnect();
  }, []);

  // Cursor glow in hero
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setCursorInHero(true);
        setCursorPos({ x: e.clientX, y: e.clientY - rect.top });
      } else {
        setCursorInHero(false);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Lock body when modal open or loading
  useEffect(() => {
    if (openProvider || loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openProvider, loading]);

  const filteredProviders =
    providerFilter === 'all'
      ? DOCTORS
      : DOCTORS.filter((d) => d.tags?.includes(providerFilter));

  const heroFeatured = SERVICES.find((s) => s.feature);
  const restServices = SERVICES.filter((s) => !s.feature).slice(0, 5);

  return (
    <>
      {loading && <Preloader />}
      {emergencyFlash && (
        <div className="fixed inset-0 pointer-events-none z-[60] emergency-flash-active" />
      )}

      <SectionDotNav active={activeSection} sections={SECTIONS} />

      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        id="top"
        className="relative pt-24 lg:pt-32 pb-20 overflow-hidden grain"
        style={{ minHeight: '85vh' }}
      >
        <div
          className="cursor-glow"
          style={{ left: cursorPos.x, top: cursorPos.y, opacity: cursorInHero ? 1 : 0 }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
          <svg
            className="absolute -top-40 -right-40 spin-slower"
            width="900"
            height="900"
            viewBox="0 0 900 900"
            fill="none"
          >
            <circle cx="450" cy="450" r="449" stroke="var(--forest)" strokeWidth="1" />
            <circle cx="450" cy="450" r="350" stroke="var(--forest)" strokeWidth="1" strokeDasharray="2 8" />
            <circle cx="450" cy="450" r="250" stroke="var(--forest)" strokeWidth="1" />
            <circle cx="450" cy="450" r="150" stroke="var(--forest)" strokeWidth="1" strokeDasharray="2 8" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4 reveal">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium"
                style={{ background: 'var(--ivory-deep)', color: 'var(--forest)' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full pulse-dot"
                  style={{ background: 'var(--terracotta)' }}
                />
                {greeting}, Cenla
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-soft)' }}>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="var(--gold)">
                      <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" />
                    </svg>
                  ))}
                </div>
                <span className="font-medium" style={{ color: 'var(--forest)' }}>
                  {CLINIC.rating}
                </span>
                <span>· {CLINIC.reviewCount} reviews</span>
              </span>
            </div>
            <div className="small-whisper">Alexandria · Pineville · Ball · Tioga</div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 relative z-10">
              <h1
                className="font-display tracking-tight"
                style={{
                  color: 'var(--forest)',
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  lineHeight: '0.88',
                  letterSpacing: '-0.035em',
                }}
              >
                <span className="word-rise inline-block">Same-day</span>{' '}
                <span className="word-rise delay-1 inline-block">care.</span>
                <br />
                <span className="word-rise delay-2 mega-italic inline-block" style={{ color: 'var(--terracotta)' }}>
                  Same-roof
                </span>{' '}
                <span className="word-rise delay-3 mega-italic inline-block">answers.</span>
                <br />
                <span className="word-rise delay-4 inline-block">Built for</span>{' '}
                <span className="word-rise delay-5 mega-italic inline-block ml-1 relative">
                  Cenla.
                  <svg
                    className="absolute -bottom-2 left-0 w-full scribble"
                    height="14"
                    viewBox="0 0 200 14"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9 Q 50 2 100 7 T 198 5"
                      stroke="var(--terracotta)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <div className="mt-10 max-w-md word-rise delay-6">
                <div className="small-whisper mb-3">A different kind of healthcare</div>
                <p
                  className="text-base leading-relaxed text-balance"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {isOpenNow
                    ? `Primary care, on-site cardiac diagnostics, gastro, podiatry, and labs — all under one roof on N Bolton Ave. We're open right now.`
                    : `We're currently closed. Doors open ${closeLabel}. For emergencies, call 911. For non-urgent advice, our care guide is below.`}
                </p>
              </div>

              <div className="word-rise delay-7 mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${CLINIC.tel}`}
                  className="px-7 py-4 rounded-full font-medium btn-primary inline-flex items-center gap-2.5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Call now <span className="font-mono opacity-80">{CLINIC.phone}</span>
                </a>
                <button
                  onClick={openBookingModal}
                  className="px-7 py-4 rounded-full font-medium btn-terracotta inline-flex items-center gap-2"
                >
                  Book a visit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative reveal delay-4">
              <LiveStatusPanel isOpenNow={isOpenNow} closeLabel={closeLabel} now={now} />
            </div>
          </div>

          <div
            className="mt-20 pt-12 border-t flex justify-between items-end flex-wrap gap-8"
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="flex items-end gap-12 flex-wrap">
              <div>
                <div className="font-display text-5xl lg:text-6xl font-medium" style={{ color: 'var(--forest)' }}>
                  <StatCounter target={DOCTORS.length} trigger={heroVisible} />
                </div>
                <div className="small-whisper mt-2" style={{ color: 'var(--ink-soft)' }}>
                  Providers
                </div>
              </div>
              <div>
                <div
                  className="font-display text-5xl lg:text-6xl font-medium flex items-baseline gap-1"
                  style={{ color: 'var(--forest)' }}
                >
                  <StatCounter target={20} trigger={heroVisible} />
                  <span style={{ fontSize: '0.5em' }}>K+</span>
                </div>
                <div className="small-whisper mt-2" style={{ color: 'var(--ink-soft)' }}>
                  Visits / year
                </div>
              </div>
              <div>
                <div
                  className="font-display text-5xl lg:text-6xl font-medium flex items-baseline gap-1"
                  style={{ color: 'var(--forest)' }}
                >
                  <StatCounter target={CLINIC.rating} decimals={1} trigger={heroVisible} />
                  <span style={{ color: 'var(--gold)' }}>★</span>
                </div>
                <div className="small-whisper mt-2" style={{ color: 'var(--ink-soft)' }}>
                  Patient rating
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="small-whisper" style={{ color: 'var(--ink-soft)' }}>
                Founded {CLINIC.foundedYear} · Cenla Family Medicine
              </div>
              <a
                href="#about"
                className="font-display italic text-base mt-1 inline-block underline-grow"
                style={{ color: 'var(--terracotta)' }}
              >
                The theCLINICS story →
              </a>
            </div>
          </div>
        </div>
      </section>

      <InsuranceTicker />

      {/* ===================== SYMPTOM CHECKER ===================== */}
      <SymptomChecker
        onOpenProvider={(d) => setOpenProvider(d)}
        onBook={openBookingModal}
        onEmergency={() => {
          setEmergencyFlash(true);
          setTimeout(() => setEmergencyFlash(false), 600);
        }}
      />

      {/* ===================== MISSION ===================== */}
      <section
        id="about"
        ref={missionRef}
        className="py-24 lg:py-32 relative grain overflow-hidden"
        style={{ background: 'var(--forest)', color: 'var(--ivory)' }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg
            className="absolute top-20 left-20 opacity-[0.06] spin-slow"
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
          >
            <circle cx="150" cy="150" r="149" stroke="var(--ivory)" />
            <circle cx="150" cy="150" r="120" stroke="var(--ivory)" />
            <circle cx="150" cy="150" r="90" stroke="var(--ivory)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="ornament-divider mb-16">
            <div className="small-whisper" style={{ color: 'var(--gold-pale)' }}>
              The Mission
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
            <div className="lg:col-span-7">
              <h2
                className="font-display tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '0.95' }}
              >
                We started this <br />
                because <span className="italic font-light" style={{ color: 'var(--gold-pale)' }}>Cenla</span>{' '}
                <br />
                deserved better.
              </h2>
              <p
                className="drop-cap mt-12 text-lg leading-relaxed max-w-xl"
                style={{ color: 'var(--sage-light)' }}
              >
                For decades, getting good medical care in Central Louisiana meant a long drive, a longer wait,
                and an even longer bill. Our team built theCLINICS so your neighbors get same-day primary
                care, on-site cardiac diagnostics, gastro, podiatry, and labs — coordinated by a provider who
                actually knows you.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-20">
              <div
                className="font-display italic text-2xl lg:text-3xl leading-snug"
                style={{ color: 'var(--gold-pale)' }}
              >
                "By recognizing patients as individuals, we focus on the experience and respecting their
                time."
              </div>
              <div className="mt-4 small-whisper" style={{ color: 'var(--sage)' }}>
                — The theCLINICS team
              </div>
            </div>
          </div>

          <div className="gold-rule mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: 1, label: 'Location', sub: '1587 N Bolton Ave, Alexandria, LA' },
              { num: DOCTORS.length, label: 'Providers', sub: 'MDs and nurse practitioners' },
              { num: 20, suffix: 'K+', label: 'Annual visits', sub: 'Across primary, cardiac, GI, and labs' },
              {
                num: CLINIC.rating,
                decimals: 1,
                suffix: '★',
                label: 'Patient rating',
                sub: `From ${CLINIC.reviewCount}+ verified reviews`,
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display text-6xl lg:text-7xl xl:text-8xl font-medium leading-none"
                  style={{ color: 'var(--ivory)' }}
                >
                  <StatCounter
                    target={stat.num}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ''}
                    trigger={missionVisible}
                  />
                </div>
                <div className="small-whisper mt-4 mb-2" style={{ color: 'var(--gold-pale)' }}>
                  {stat.label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--sage-light)' }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
          <div className="gold-rule mt-12" />

          <div className="mt-20 text-center max-w-2xl mx-auto">
            <div className="small-whisper mb-4" style={{ color: 'var(--gold-pale)' }}>
              Founded {CLINIC.foundedYear} · Cenla Family Medicine Associates
            </div>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--sage-light)' }}>
              A care team training and partnering with{' '}
              <span className="font-medium" style={{ color: 'var(--ivory)' }}>
                LSU Health, Rapides Regional, and Christus St. Frances Cabrini
              </span>{' '}
              — practicing right here at home.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                Services
              </div>
              <h2
                className="font-display leading-[0.95] tracking-tight max-w-2xl text-balance"
                style={{ color: 'var(--forest)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Everything your family needs <span className="italic font-light">under one roof.</span>
              </h2>
            </div>
            <a href="#/services" className="text-sm underline-grow" style={{ color: 'var(--forest)' }}>
              View all services →
            </a>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-5"
            style={{ minHeight: '640px' }}
          >
            {/* Featured tile */}
            {heroFeatured && (
              <div
                key={heroFeatured.id}
                className="card-lift rounded-3xl border bg-white relative overflow-hidden group flex flex-col lg:col-span-2 lg:row-span-2"
                style={{ borderColor: 'var(--line)' }}
              >
                <div className="relative" style={{ aspectRatio: '16/10' }}>
                  <img
                    src="/clinicsdoctor.png"
                    alt="theCLINICS primary care provider"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1666214280165-c0bcc1c4b78f?w=900&q=80&auto=format&fit=crop';
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(31,58,46,0.7), transparent 50%)' }}
                  />
                  <div
                    className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold"
                    style={{ background: 'var(--gold)', color: 'white' }}
                  >
                    Featured · Most visits
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex-1 flex flex-col">
                  <div className="small-whisper mb-2" style={{ color: 'var(--terracotta)' }}>
                    {heroFeatured.tagline}
                  </div>
                  <h3
                    className="font-display text-3xl lg:text-4xl mb-4 leading-tight"
                    style={{ color: 'var(--forest)' }}
                  >
                    {heroFeatured.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--ink-soft)' }}>
                    {heroFeatured.description}
                  </p>
                  <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                    <div className="small-whisper mb-2" style={{ color: 'var(--ink-mute)' }}>
                      What to expect
                    </div>
                    <div className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
                      {heroFeatured.expect}
                    </div>
                    <button
                      onClick={openBookingModal}
                      className="inline-flex items-center gap-2 text-sm font-medium underline-grow"
                      style={{ color: 'var(--forest)' }}
                    >
                      Book a {heroFeatured.title.toLowerCase()} visit
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Smaller tiles */}
            {restServices.map((s, i) => (
              <div
                key={s.id}
                className="card-lift rounded-3xl border bg-white relative overflow-hidden group flex flex-col"
                style={{ borderColor: 'var(--line)' }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <svg
                    className="absolute top-0 right-0 opacity-50 pointer-events-none"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <circle cx="60" cy="0" r="40" stroke="var(--ivory-deep)" strokeWidth="1" />
                  </svg>
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors group-hover:bg-[var(--forest)] group-hover:text-[var(--ivory)]"
                        style={{ background: 'var(--ivory-deep)', color: 'var(--forest)' }}
                      >
                        {renderServiceIcon(s.iconName, 20)}
                      </div>
                      <div className="editorial-num text-xl" style={{ color: 'var(--sage-light)' }}>
                        0{i + 2}
                      </div>
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] mb-1.5"
                      style={{ color: 'var(--terracotta)' }}
                    >
                      {s.tagline}
                    </div>
                    <h3
                      className="font-display text-xl lg:text-2xl mb-2 leading-tight"
                      style={{ color: 'var(--forest)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
                      {s.description}
                    </p>
                    <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
                      <div
                        className="text-[9px] font-mono uppercase tracking-wider mb-1"
                        style={{ color: 'var(--ink-mute)' }}
                      >
                        What to expect
                      </div>
                      <div className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--ink-soft)' }}>
                        {s.expect}
                      </div>
                      <button
                        onClick={openBookingModal}
                        className="inline-flex items-center gap-1 text-xs font-medium underline-grow"
                        style={{ color: 'var(--forest)' }}
                      >
                        Book →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cardiac diagnostics spotlight */}
          <div className="mt-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                  Spotlight · Cardiac Diagnostics
                </div>
                <h3
                  className="font-display leading-[0.95] tracking-tight"
                  style={{ color: 'var(--forest)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  Answers in <br />
                  <span className="italic font-light">the same visit.</span>
                </h3>
                <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                  EKG, Holter monitor, stress test, cardiac ultrasound — read on-site by your provider before
                  you leave. No second appointment, no mailed-in strip three days later, no waiting for results
                  to make a plan.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    { num: 'Same-visit', label: 'EKG read by your provider' },
                    { num: '24–48h', label: 'Holter rhythm capture' },
                    { num: '0', label: 'Hospital trips for routine cardiac diagnostics' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline gap-4 pb-3 border-b"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div
                        className="font-display text-2xl lg:text-3xl"
                        style={{ color: 'var(--terracotta)' }}
                      >
                        {s.num}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={openBookingModal}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm btn-primary"
                >
                  Book a cardiac visit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="lg:col-span-7">
                <BeforeAfterSlider />
                <div className="mt-3 small-whisper text-center">
                  Illustrated representation · Diagnostic clarity will vary by case
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section id="team" className="py-24 lg:py-32" style={{ background: 'var(--ivory-deep)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-7">
              <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                Care Team
              </div>
              <h2
                className="font-display leading-[0.95] tracking-tight"
                style={{ color: 'var(--forest)', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
              >
                Trained well. <br />
                <span className="italic font-light">Practicing at home.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                Our providers came back to Central Louisiana to take care of their neighbors — your family.
                Same-day visits, real continuity, plain-English answers.
              </p>
              <div className="mt-4 text-xs flex items-center gap-2" style={{ color: 'var(--ink-mute)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                Click any provider for full bio
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-2 mb-10 pb-2 border-b"
            style={{ borderColor: 'var(--line)' }}
          >
            {PROVIDER_FILTER_TABS.map((tab) => {
              const count =
                tab.id === 'all'
                  ? DOCTORS.length
                  : DOCTORS.filter((d) => d.tags?.includes(tab.id)).length;
              const isActive = providerFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProviderFilter(tab.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition"
                  style={{
                    background: isActive ? 'var(--forest)' : 'transparent',
                    color: isActive ? 'var(--ivory)' : 'var(--ink-soft)',
                    border: `1px solid ${isActive ? 'var(--forest)' : 'var(--line)'}`,
                  }}
                >
                  {tab.label}
                  {isActive && <span className="ml-2 opacity-60">{count}</span>}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProviders.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setOpenProvider(p)}
                className={`card-lift group text-left ${
                  i % 4 === 0 ? 'lg:mt-0' : i % 4 === 1 ? 'lg:mt-12' : i % 4 === 2 ? 'lg:mt-4' : 'lg:mt-16'
                }`}
              >
                <div
                  className="relative arched overflow-hidden mb-4"
                  style={{
                    aspectRatio: PROVIDER_HEIGHTS[i % PROVIDER_HEIGHTS.length],
                    background: 'var(--ivory-deep)',
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="font-display"
                        style={{ color: 'var(--forest)', fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                      >
                        {initialsFor(p.name)}
                      </div>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(31,58,46,0.85), transparent 60%)' }}
                  />
                  {p.featured && (
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold"
                      style={{ background: 'var(--gold)', color: 'white' }}
                    >
                      Featured
                    </div>
                  )}
                  {p.accepting && !p.featured && (
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold"
                      style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--forest)' }}
                    >
                      Accepting
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      Click for full bio
                    </div>
                    <div className="text-xs leading-relaxed text-white">{p.bio.slice(0, 100)}…</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg leading-tight" style={{ color: 'var(--forest)' }}>
                    {p.name}
                  </h3>
                  <div
                    className="text-[10px] uppercase tracking-[0.15em] mt-1.5 mb-2"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    {p.role ?? p.specialty}
                  </div>
                  <div className="text-xs italic font-display" style={{ color: 'var(--ink-soft)' }}>
                    {p.specialty}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LOCATION ===================== */}
      <section id="location" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                Find us
              </div>
              <h2
                className="font-display leading-[0.95] tracking-tight"
                style={{ color: 'var(--forest)', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
              >
                One roof in <br />
                <span className="italic font-light">Cenla.</span>
              </h2>
            </div>
            <div className="text-xs font-mono" style={{ color: 'var(--ink-mute)' }}>
              Updated{' '}
              {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} CST
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white border" style={{ borderColor: 'var(--line)' }}>
            <div className="grid md:grid-cols-2">
              <div
                className="relative"
                style={{ minHeight: '360px', background: 'var(--ivory-deep)' }}
              >
                <img
                  src="/largeclinicshospitalpic.jpeg"
                  alt="theCLINICS in Alexandria, LA"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop';
                  }}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--forest)' }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2 pulse-dot"
                    style={{ background: isOpenNow ? '#22c55e' : '#fbbf24' }}
                  />
                  {isOpenNow ? 'Open today' : `Closed · Opens ${closeLabel}`}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <a
                    href={CLINIC.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 rounded-full text-xs font-medium text-center"
                    style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--forest)' }}
                  >
                    Get directions ↗
                  </a>
                  <a
                    href={`tel:${CLINIC.tel}`}
                    className="flex-1 px-4 py-2 rounded-full text-xs font-medium text-center"
                    style={{ background: 'rgba(31,58,46,0.85)', color: 'var(--ivory)' }}
                  >
                    Call clinic
                  </a>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <h3 className="font-display text-3xl mb-1" style={{ color: 'var(--forest)' }}>
                  {CLINIC.city}, {CLINIC.state}
                </h3>
                <div className="small-whisper mb-6" style={{ color: 'var(--terracotta)' }}>
                  theCLINICS · Cenla
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Address
                    </div>
                    <div style={{ color: 'var(--forest)' }}>{CLINIC.address}</div>
                  </div>
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Phone
                    </div>
                    <a
                      href={`tel:${CLINIC.tel}`}
                      className="font-medium font-mono"
                      style={{ color: 'var(--forest)' }}
                    >
                      {CLINIC.phone}
                    </a>
                  </div>
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Hours
                    </div>
                    <div style={{ color: 'var(--forest)' }}>{CLINIC.hoursLabel} · Sat–Sun closed</div>
                  </div>
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Services on-site
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {CLINIC.services.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--ivory-deep)', color: 'var(--forest)' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <button
                    onClick={openBookingModal}
                    className="flex-1 px-5 py-3 rounded-full text-sm font-medium text-center btn-primary"
                  >
                    Book a visit
                  </button>
                  <a
                    href={`tel:${CLINIC.tel}`}
                    className="px-5 py-3 rounded-full border text-sm font-medium"
                    style={{ borderColor: 'var(--line)', color: 'var(--forest)' }}
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-24 lg:py-32 grain" style={{ background: 'var(--ivory-deep)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                Patient stories
              </div>
              <h2
                className="font-display leading-[0.95] tracking-tight max-w-2xl"
                style={{ color: 'var(--forest)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                What our patients <span className="italic font-light">are saying.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="font-display text-5xl" style={{ color: 'var(--forest)' }}>
                  {CLINIC.rating}
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--gold)">
                      <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" />
                    </svg>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>
                  Average across
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>
                  {CLINIC.reviewCount}+ verified Google reviews
                </div>
                <a
                  href={CLINIC.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline-grow"
                  style={{ color: 'var(--terracotta)' }}
                >
                  Read all on Google →
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              className="md:col-span-2 lg:col-span-2 p-10 lg:p-12 rounded-3xl relative overflow-hidden"
              style={{ background: 'var(--forest)', color: 'var(--ivory)' }}
            >
              <svg
                className="absolute top-0 right-0 opacity-10 spin-slow"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="99" stroke="var(--ivory)" />
              </svg>
              <div className="relative">
                <svg
                  width="48"
                  height="36"
                  viewBox="0 0 32 24"
                  fill="var(--gold-pale)"
                  opacity="0.9"
                  className="mb-6"
                >
                  <path d="M0 24V12C0 5.4 5.4 0 12 0v4c-4.4 0-8 3.6-8 8h8v12H0zm20 0V12c0-6.6 5.4-12 12-12v4c-4.4 0-8 3.6-8 8h8v12H20z" />
                </svg>
                <p className="font-display text-2xl lg:text-4xl leading-snug mb-8 text-balance">
                  "{TESTIMONIALS[0].q}"
                </p>
                <div
                  className="flex items-center justify-between pt-6 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div>
                    <div className="font-display text-lg">{TESTIMONIALS[0].n}</div>
                    <div className="small-whisper mt-1" style={{ color: 'var(--gold-pale)' }}>
                      {TESTIMONIALS[0].l} · {TESTIMONIALS[0].visit}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                        <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={CLINIC.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl relative overflow-hidden border group card-lift block"
              style={{
                borderColor: 'var(--line)',
                minHeight: '320px',
                background: 'var(--forest)',
                color: 'var(--ivory)',
              }}
            >
              <svg
                className="absolute -top-12 -right-12 opacity-10 spin-slow"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="99" stroke="var(--ivory)" />
                <circle cx="100" cy="100" r="60" stroke="var(--ivory)" />
              </svg>
              <div className="relative h-full flex flex-col justify-between p-6">
                <div>
                  <div className="small-whisper opacity-80" style={{ color: 'var(--gold-pale)' }}>
                    Verified reviews
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <div className="font-display text-6xl" style={{ color: 'var(--ivory)' }}>
                      {CLINIC.rating}
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                          <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs mt-2" style={{ color: 'var(--sage-light)' }}>
                    Average from {CLINIC.reviewCount}+ patient reviews
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-lg leading-tight">Read on Google</div>
                    <div className="text-xs opacity-80 mt-1">Every review · Unfiltered</div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition group-hover:scale-110"
                    style={{ background: 'var(--terracotta)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {TESTIMONIALS.slice(1).map((tx, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl border bg-white card-lift"
                style={{ borderColor: 'var(--line)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="var(--gold)">
                        <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" />
                      </svg>
                    ))}
                  </div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-[0.2em]"
                    style={{ color: 'var(--ink-mute)' }}
                  >
                    {tx.visit}
                  </div>
                </div>
                <p
                  className="font-display text-lg leading-snug mb-5 text-balance"
                  style={{ color: 'var(--forest)' }}
                >
                  "{tx.q}"
                </p>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                  <div className="font-medium text-sm" style={{ color: 'var(--forest)' }}>
                    {tx.n}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>
                    {tx.l}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
              Frequently asked
            </div>
            <h2
              className="font-display leading-[0.95] tracking-tight"
              style={{ color: 'var(--forest)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              The questions <br />
              <span className="italic font-light">we hear most often.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border overflow-hidden"
                style={{ borderColor: openFaq === i ? 'var(--forest)' : 'var(--line)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full text-left p-6 flex items-start justify-between gap-6"
                >
                  <div className="flex items-start gap-5 flex-1">
                    <div
                      className="editorial-num text-2xl flex-shrink-0"
                      style={{ color: openFaq === i ? 'var(--terracotta)' : 'var(--sage-light)' }}
                    >
                      0{i + 1}
                    </div>
                    <div className="font-display text-lg lg:text-xl pt-0.5" style={{ color: 'var(--forest)' }}>
                      {faq.q}
                    </div>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition"
                    style={{
                      background: openFaq === i ? 'var(--forest)' : 'var(--ivory-deep)',
                      color: openFaq === i ? 'var(--ivory)' : 'var(--forest)',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform"
                      style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pl-[5.25rem] fade-in">
                    <p
                      className="text-base leading-relaxed text-balance"
                      style={{ color: 'var(--ink-soft)' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              Still have questions?
            </p>
            <a
              href={`tel:${CLINIC.tel}`}
              className="font-display text-2xl mt-2 inline-block underline-static"
              style={{ color: 'var(--forest)' }}
            >
              Call us at {CLINIC.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===================== BOOK ===================== */}
      <section
        id="book"
        className="py-24 lg:py-32 relative grain overflow-hidden"
        style={{ background: 'var(--ivory-warm)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
          <svg
            className="absolute bottom-0 right-0 spin-slower"
            width="600"
            height="600"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="500" cy="500" r="450" stroke="var(--forest)" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="350" stroke="var(--forest)" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="250" stroke="var(--forest)" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                Book your visit
              </div>
              <h2
                className="font-display tracking-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  lineHeight: '0.95',
                  color: 'var(--forest)',
                }}
              >
                Ready when <br />
                <span className="italic font-light">you are.</span>
              </h2>
              <p
                className="mt-8 text-base lg:text-lg leading-relaxed text-balance"
                style={{ color: 'var(--ink-soft)' }}
              >
                Walk us through what you need and we'll handle the rest. For same-day care, give us a ring or
                walk in.
              </p>
              <div className="mt-10 space-y-4">
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--terracotta)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Need same-day care?
                    </div>
                    <a
                      href={`tel:${CLINIC.tel}`}
                      className="font-display text-2xl font-mono"
                      style={{ color: 'var(--forest)' }}
                    >
                      {CLINIC.phone}
                    </a>
                    <div className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>
                      {CLINIC.hoursLabel} · Walk-ins welcome for established patients
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--ivory-deep)' }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--forest)"
                      strokeWidth="2"
                    >
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <path d="M3 10l9 5 9-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="small-whisper mb-1" style={{ color: 'var(--ink-soft)' }}>
                      Existing patient?
                    </div>
                    <a
                      href={CLINIC.patientPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-xl"
                      style={{ color: 'var(--forest)' }}
                    >
                      Patient Portal ↗
                    </a>
                    <div className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>
                      Message providers · Refills · Records
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div
                className="rounded-3xl p-8 lg:p-10 bg-white border"
                style={{
                  borderColor: 'var(--line)',
                  boxShadow: '0 30px 60px -20px rgba(31, 58, 46, 0.1)',
                }}
              >
                <div className="small-whisper mb-2" style={{ color: 'var(--terracotta)' }}>
                  Quick start
                </div>
                <h3
                  className="font-display text-3xl lg:text-4xl leading-tight"
                  style={{ color: 'var(--forest)' }}
                >
                  Pick a time that works for you.
                </h3>
                <p className="mt-4 text-sm" style={{ color: 'var(--ink-soft)' }}>
                  Open the booking flow and we'll walk you through service, provider, and time in under a
                  minute.
                </p>
                <button
                  onClick={openBookingModal}
                  className="mt-8 w-full px-6 py-4 rounded-full font-medium text-base btn-terracotta inline-flex items-center justify-center gap-2"
                >
                  Open booking
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-xs"
                  style={{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }}
                >
                  <div>
                    <div
                      className="font-display text-2xl"
                      style={{ color: 'var(--forest)' }}
                    >
                      &lt; 1 min
                    </div>
                    <div className="small-whisper mt-1">To book</div>
                  </div>
                  <div>
                    <div
                      className="font-display text-2xl"
                      style={{ color: 'var(--forest)' }}
                    >
                      24h
                    </div>
                    <div className="small-whisper mt-1">Response</div>
                  </div>
                  <div>
                    <div
                      className="font-display text-2xl"
                      style={{ color: 'var(--forest)' }}
                    >
                      0
                    </div>
                    <div className="small-whisper mt-1">Pressure</div>
                  </div>
                </div>
              </div>
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

      {fluSeason && (
        <div
          className="hidden md:block fixed bottom-6 left-6 z-40 max-w-xs rounded-2xl p-4 fade-in"
          style={{
            background: 'var(--terracotta-pale)',
            color: 'var(--terracotta-deep)',
            border: '1px solid rgba(168, 95, 63, 0.25)',
            boxShadow: '0 16px 32px -12px rgba(168, 95, 63, 0.35)',
          }}
        >
          <div className="small-whisper mb-1">Seasonal note</div>
          <div className="text-sm font-medium leading-snug">
            Flu &amp; cold season is here.
          </div>
          <a
            href="#symptom"
            className="text-xs mt-2 inline-block underline-static"
            style={{ color: 'var(--terracotta-deep)' }}
          >
            Check your symptoms →
          </a>
        </div>
      )}
    </>
  );
};

export default Home;
