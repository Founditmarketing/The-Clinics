import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Mail, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { PageRoute } from '../../types';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useUI();
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLoginModal();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      login('Jane Doe', email);
      setLoading(false);
      navigate(PageRoute.DASHBOARD);
    }, 700);
  };

  return (
    <div className="modal-backdrop" onClick={closeLoginModal} role="dialog" aria-modal="true" aria-label="Patient Portal sign in">
      <div className="login-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLoginModal} aria-label="Close">
          <X size={18} />
        </button>

        <div className="login-head">
          <span className="small-label" style={{ color: 'var(--terracotta-deep)' }}>Patient portal</span>
          <h2 className="font-display login-title">Sign in to your records.</h2>
          <p className="login-sub">Records, refills, lab results, and provider messages.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Email</span>
            <div className="login-input">
              <Mail size={18} strokeWidth={1.8} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
              />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="login-input">
              <Lock size={18} strokeWidth={1.8} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </label>

          <div className="login-row">
            <label className="login-check">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="login-forgot">
              Forgot password?
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn btn-terracotta login-submit">
            {loading ? (
              <span className="login-spinner" aria-label="Loading" />
            ) : (
              <>
                Sign in <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="login-foot">
          <span className="small-label">Demo</span>
          <span>Use any email to sign in.</span>
        </div>
      </div>

      <style>{`
        .login-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(28px) saturate(165%);
          -webkit-backdrop-filter: blur(28px) saturate(165%);
          border: 1px solid rgba(255,255,255,0.65);
          border-radius: 28px;
          padding: 1.8rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.85), var(--shadow-strong);
          animation: scale-in 320ms cubic-bezier(0.22,1,0.36,1) both;
        }
        .login-head { margin-bottom: 1.4rem; }
        .login-title { font-size: 1.7rem; line-height: 1.05; color: var(--forest-deep); margin: 0.4rem 0 0.4rem; }
        .login-sub { color: var(--ink-soft); margin: 0; }

        .login-form { display: grid; gap: 0.9rem; }
        .login-form label { display: grid; gap: 0.3rem; }
        .login-form span { font-size: 0.85rem; color: var(--ink-mute); font-weight: 600; }
        .login-input {
          display: grid;
          grid-template-columns: 22px 1fr;
          gap: 0.5rem;
          align-items: center;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: 1px solid var(--line-strong);
          background: rgba(255,255,255,0.78);
          color: var(--ink-mute);
        }
        .login-input:focus-within { border-color: var(--forest); box-shadow: var(--focus); }
        .login-input input { border: none; background: transparent; outline: none; font: inherit; color: var(--ink); width: 100%; min-height: 24px; }

        .login-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--ink-soft); }
        .login-check { display: inline-flex; align-items: center; gap: 0.4rem; cursor: pointer; }
        .login-forgot { background: none; border: none; color: var(--forest-deep); font: inherit; cursor: pointer; }
        .login-forgot:hover { text-decoration: underline; }

        .login-submit { width: 100%; }
        .login-spinner {
          width: 18px; height: 18px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: var(--bone);
          animation: spin-slow 0.8s linear infinite;
        }

        .login-foot {
          margin-top: 1.4rem;
          padding-top: 1rem;
          border-top: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--ink-soft);
        }
        .login-foot .small-label { color: var(--terracotta-deep); }

        @media (max-width: 600px) {
          .modal-backdrop { align-items: flex-end !important; padding: 0 !important; }
          .login-card {
            border-radius: 24px 24px 0 0;
            padding: 1.4rem 1.2rem calc(1.4rem + env(safe-area-inset-bottom));
          }
          .login-card::before {
            content: "";
            display: block;
            width: 40px;
            height: 4px;
            border-radius: 4px;
            background: rgba(21,76,130,0.16);
            margin: 0 auto 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
