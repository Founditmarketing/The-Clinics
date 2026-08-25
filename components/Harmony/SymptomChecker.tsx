import React, { useEffect, useState } from 'react';
import { checkSymptom } from '../../services/geminiService';
import { CLINIC, DOCTORS } from '../../data/clinicData';
import { Doctor, TriageRecommendation, TriageService } from '../../types';

const SERVICE_LABEL: Record<TriageService, string> = {
  primary: 'Primary Care',
  urgent: 'Same-day Visit',
  gastro: 'Gastroenterology',
  podiatry: 'Podiatry',
  imaging: 'Lab & Imaging',
  emergency: 'Call 911 immediately',
};

const SERVICE_TAG: Record<TriageService, string> = {
  primary: 'primary',
  urgent: 'access2day',
  gastro: 'gastro',
  podiatry: 'podiatry',
  imaging: 'primary',
  emergency: 'primary',
};

const EXAMPLES = [
  'Annual physical',
  'Sore throat & fever',
  'Blood pressure follow-up',
  'Refill request',
  'Heel pain when walking',
];

interface SymptomCheckerProps {
  onOpenProvider?: (doctor: Doctor) => void;
  onBook?: () => void;
  /** Briefly flash a red emergency overlay when triage returns 911. */
  onEmergency?: () => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onOpenProvider, onBook, onEmergency }) => {
  const [symptom, setSymptom] = useState('');
  const [checking, setChecking] = useState(false);
  const [recommendation, setRecommendation] = useState<TriageRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recommendation?.service === 'emergency' && onEmergency) onEmergency();
  }, [recommendation, onEmergency]);

  const run = async () => {
    if (!symptom.trim()) return;
    setChecking(true);
    setError(null);
    setRecommendation(null);
    try {
      const res = await checkSymptom(symptom);
      setRecommendation(res);
    } catch {
      setError(`Couldn't connect right now. Please call ${CLINIC.phone} and we'll help.`);
    } finally {
      setChecking(false);
    }
  };

  const recommendedProviders = recommendation
    ? DOCTORS.filter((d) => d.tags?.includes(SERVICE_TAG[recommendation.service])).slice(0, 3)
    : [];

  return (
    <section id="symptom" className="hh-section relative">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="eyebrow" style={{ marginBottom: '1.4rem' }}>
              AI symptom guide
            </div>
            <h2
              className="font-display"
              style={{ color: 'var(--forest-deep)', fontSize: 'var(--type-h2)', lineHeight: 1.04, letterSpacing: '-0.025em', margin: 0 }}
            >
              Tell us what&rsquo;s <br />
              going on. <br />
              <span className="hh-em">We&rsquo;ll guide you.</span>
            </h2>
            <p className="lead" style={{ marginTop: '1.4rem', color: 'var(--ink-soft)' }}>
              Describe what&rsquo;s bringing you in. Our care guide will recommend the right kind
              of visit and connect you with a provider on our team.
            </p>
            <div className="mt-8 space-y-2 text-xs" style={{ color: 'var(--ink-mute)' }}>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Private — never stored
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Takes 30 seconds
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64" />
                </svg>
                Not a diagnosis
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              className="rounded-3xl p-8 lg:p-10 grain relative overflow-hidden"
              style={{ background: 'var(--ivory-deep)' }}
            >
              <svg
                className="absolute -top-12 -right-12 opacity-10 spin-slow pointer-events-none"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="99" stroke="var(--forest)" />
                <circle cx="100" cy="100" r="60" stroke="var(--forest)" />
              </svg>
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--forest)', color: 'var(--ivory)' }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="font-display text-base" style={{ color: 'var(--forest)' }}>
                    theCLINICS Care Guide
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--terracotta-pale)', color: 'var(--terracotta-deep)' }}
                  >
                    AI
                  </span>
                </div>

                <label className="small-whisper mb-3 block" style={{ color: 'var(--ink-soft)' }}>
                  What's bringing you in?
                </label>
                <textarea
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="e.g. 'I've had chest tightness when walking up stairs the last few days'"
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border bg-white focus:outline-none focus:border-current transition resize-none text-base"
                  style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
                  disabled={checking}
                />

                <div className="flex items-center justify-between mt-3 mb-6 flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex}
                        onClick={() => setSymptom(ex)}
                        disabled={checking}
                        className="text-xs px-3 py-1.5 rounded-full border transition hover:bg-white"
                        style={{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }}
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={run}
                    disabled={checking || !symptom.trim()}
                    className="px-6 py-3 rounded-full font-medium text-sm btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checking ? (
                      <>
                        <span className="flex gap-1">
                          <span className="thinking-dot inline-block w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="thinking-dot inline-block w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="thinking-dot inline-block w-1.5 h-1.5 rounded-full bg-current" />
                        </span>
                        Thinking
                      </>
                    ) : (
                      <>
                        Get guidance
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
                      </>
                    )}
                  </button>
                </div>

                {checking && (
                  <div
                    className="p-6 rounded-2xl fade-in"
                    style={{ background: 'white', border: '1px solid var(--line)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1.5">
                        <span
                          className="thinking-dot inline-block w-2 h-2 rounded-full"
                          style={{ background: 'var(--terracotta)' }}
                        />
                        <span
                          className="thinking-dot inline-block w-2 h-2 rounded-full"
                          style={{ background: 'var(--terracotta)' }}
                        />
                        <span
                          className="thinking-dot inline-block w-2 h-2 rounded-full"
                          style={{ background: 'var(--terracotta)' }}
                        />
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--forest)' }}>
                        Reviewing your concern…
                      </span>
                    </div>
                    <div className="h-3 rounded shimmer-bg" style={{ background: 'var(--ivory-deep)' }} />
                    <div className="h-3 rounded shimmer-bg mt-2 w-4/5" style={{ background: 'var(--ivory-deep)' }} />
                  </div>
                )}

                {error && (
                  <div
                    className="p-5 rounded-2xl fade-in"
                    style={{ background: 'var(--terracotta-pale)', color: 'var(--terracotta-deep)' }}
                  >
                    <div className="font-medium mb-1">{error}</div>
                    <a href={`tel:${CLINIC.tel}`} className="text-sm underline-static font-mono">
                      {CLINIC.phone}
                    </a>
                  </div>
                )}

                {recommendation && !checking && (
                  <div className="fade-in space-y-4">
                    {recommendation.service === 'emergency' ? (
                      <div
                        className="p-6 lg:p-8 rounded-2xl relative overflow-hidden"
                        style={{ background: '#dc2626', color: 'white' }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                          </svg>
                          <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">Emergency</div>
                        </div>
                        <div className="font-display text-2xl lg:text-3xl mb-3">Call 911 immediately</div>
                        <p className="text-sm leading-relaxed mb-5 opacity-90">
                          {recommendation.summary} {recommendation.action}
                        </p>
                        <a
                          href="tel:911"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-sm font-bold"
                          style={{ color: '#dc2626' }}
                        >
                          Call 911 now →
                        </a>
                      </div>
                    ) : (
                      <div
                        className="p-6 lg:p-8 rounded-2xl relative overflow-hidden"
                        style={{ background: 'var(--forest)', color: 'var(--ivory)' }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10" aria-hidden>
                          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                            <circle cx="50" cy="50" r="49" stroke="var(--ivory)" />
                          </svg>
                        </div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            <div
                              className="text-[10px] font-mono uppercase tracking-[0.2em]"
                              style={{ color: 'var(--sage-light)' }}
                            >
                              Recommended for you
                            </div>
                            <div
                              className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full"
                              style={{
                                background:
                                  recommendation.severity === 'high'
                                    ? 'var(--terracotta)'
                                    : 'rgba(255,255,255,0.1)',
                                color: 'var(--ivory)',
                              }}
                            >
                              {recommendation.urgency_label}
                            </div>
                          </div>
                          <div className="font-display text-2xl lg:text-3xl mb-3">
                            {SERVICE_LABEL[recommendation.service]}
                          </div>
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--sage-light)' }}>
                            {recommendation.summary}
                          </p>
                          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--sage-light)' }}>
                            {recommendation.action}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => onBook && onBook()}
                              className="px-5 py-3 rounded-full bg-white text-sm font-medium transition hover:scale-[1.02]"
                              style={{ color: 'var(--forest)' }}
                            >
                              Book a {SERVICE_LABEL[recommendation.service].toLowerCase()} →
                            </button>
                            <a
                              href={`tel:${CLINIC.tel}`}
                              className="px-5 py-3 rounded-full border text-sm font-medium"
                              style={{ borderColor: 'var(--sage-light)', color: 'var(--ivory)' }}
                            >
                              Call {CLINIC.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {recommendation.service !== 'emergency' && recommendedProviders.length > 0 && (
                      <div
                        className="rounded-2xl p-6 bg-white border"
                        style={{ borderColor: 'var(--line)' }}
                      >
                        <div className="small-whisper mb-4" style={{ color: 'var(--terracotta)' }}>
                          Providers who can help
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {recommendedProviders.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => onOpenProvider && onOpenProvider(p)}
                              className="group flex gap-3 items-center text-left"
                            >
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                                />
                              ) : (
                                <div
                                  className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0"
                                  style={{ background: 'var(--ivory-deep)', color: 'var(--forest)' }}
                                >
                                  {p.name
                                    .split(' ')
                                    .filter((s) => /^[A-Z]/.test(s))
                                    .slice(-2)
                                    .map((s) => s[0])
                                    .join('')}
                                </div>
                              )}
                              <div className="min-w-0">
                                <div
                                  className="font-display text-sm leading-tight truncate"
                                  style={{ color: 'var(--forest)' }}
                                >
                                  {p.name}
                                </div>
                                <div
                                  className="text-[10px] uppercase tracking-wider mt-1 truncate"
                                  style={{ color: 'var(--terracotta)' }}
                                >
                                  {p.role?.split(' · ')[0] ?? p.specialty}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setRecommendation(null);
                        setSymptom('');
                      }}
                      className="text-xs underline-grow"
                      style={{ color: 'var(--ink-soft)' }}
                    >
                      Ask another question →
                    </button>
                  </div>
                )}

                {!recommendation && !checking && !error && (
                  <div
                    className="text-xs flex items-center gap-2 mt-2"
                    style={{ color: 'var(--ink-mute)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Care guidance, not a medical diagnosis. Always seek professional care for serious concerns.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
