import React, { useEffect } from 'react';
import { Doctor } from '../../types';
import { CLINIC } from '../../data/clinicData';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook?: (doctorId: string) => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose, onBook }) => {
  useEffect(() => {
    if (!doctor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doctor, onClose]);

  if (!doctor) return null;

  const initials = doctor.name
    .split(' ')
    .filter((s) => /^[A-Z]/.test(s))
    .slice(-2)
    .map((s) => s[0])
    .join('');

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 fade-in"
      onClick={onClose}
      style={{ background: 'rgba(20, 35, 25, 0.7)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative" style={{ minHeight: '400px', background: 'var(--ivory-deep)' }}>
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-44 h-44 rounded-full flex items-center justify-center font-display"
                  style={{
                    background: 'var(--ivory-warm)',
                    color: 'var(--forest)',
                    fontSize: '4rem',
                    border: '1px solid var(--line)',
                  }}
                >
                  {initials}
                </div>
              </div>
            )}
            {doctor.featured && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold"
                style={{ background: 'var(--gold)', color: 'white' }}
              >
                Featured
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
              aria-label="Close provider details"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--forest)"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="p-8 lg:p-10">
            <div className="small-whisper mb-2" style={{ color: 'var(--terracotta)' }}>
              {doctor.role ?? doctor.specialty}
            </div>
            <h3
              id="doctor-modal-title"
              className="font-display text-3xl lg:text-4xl mb-2 leading-tight"
              style={{ color: 'var(--forest)' }}
            >
              {doctor.name}
            </h3>
            <div className="text-sm italic font-display mb-6" style={{ color: 'var(--ink-soft)' }}>
              {doctor.specialty}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {doctor.accepting && (
                <span
                  className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: '#dcfce7', color: '#166534' }}
                >
                  ✓ Accepting new patients
                </span>
              )}
              <span
                className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: 'var(--ivory-deep)', color: 'var(--forest)' }}
              >
                {CLINIC.city}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-soft)' }}>
              {doctor.bio}
            </p>

            {doctor.education && doctor.education.length > 0 && (
              <div className="mb-5">
                <div className="small-whisper mb-2" style={{ color: 'var(--ink-soft)' }}>
                  Education
                </div>
                <ul className="text-sm space-y-1.5" style={{ color: 'var(--forest)' }}>
                  {doctor.education.map((e, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--gold)' }}>·</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.languages && doctor.languages.length > 0 && (
              <div className="mb-5">
                <div className="small-whisper mb-2" style={{ color: 'var(--ink-soft)' }}>
                  Languages
                </div>
                <div className="text-sm" style={{ color: 'var(--forest)' }}>
                  {doctor.languages.join(' · ')}
                </div>
              </div>
            )}

            {doctor.lives && (
              <div className="mb-6">
                <div className="small-whisper mb-2" style={{ color: 'var(--ink-soft)' }}>
                  Lives in
                </div>
                <div className="text-sm" style={{ color: 'var(--forest)' }}>
                  {doctor.lives}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
              <button
                onClick={() => {
                  onBook?.(doctor.id);
                  onClose();
                }}
                className="flex-1 px-5 py-3 rounded-full text-sm font-medium text-center btn-primary"
              >
                Book with {doctor.name.split(' ').slice(-1)[0].replace(/[,.]/g, '')}
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
  );
};

export default DoctorModal;
