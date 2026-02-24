import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../../types';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useUI();
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      login('Jane Doe', email);
      setIsLoading(false);
      navigate(PageRoute.DASHBOARD);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={closeLoginModal}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-serif-heading font-bold text-slate-900">Patient Portal</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to view your health records</p>
            </div>
            <button onClick={closeLoginModal} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-medical-600 focus:ring-medical-500" />
                Remember me
              </label>
              <button type="button" className="text-medical-600 font-medium hover:underline">Forgot password?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-medical-800 hover:bg-medical-900 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <button className="text-medical-600 font-bold hover:underline">Register Now</button>
            </p>
          </div>
        </div>
        
        <div className="bg-medical-50 p-4 text-center border-t border-medical-100">
          <p className="text-xs text-medical-600 font-medium">
            <span className="bg-white border border-medical-200 px-2 py-0.5 rounded text-[10px] mr-2 uppercase tracking-wide">Demo</span> 
            Use any email to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;