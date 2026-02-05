import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { PageRoute } from '../../types';
import { useUI } from '../../context/UIContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { openBookingModal, openLoginModal, user, logout } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: PageRoute.HOME },
    { name: 'Services', path: PageRoute.SERVICES },
    { name: 'About Us', path: PageRoute.ABOUT },
    { name: 'Contact', path: PageRoute.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-medical-800 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-medical-600 transition-colors">
            TC
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif-heading font-bold text-slate-800 leading-none">The Clinics</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">Excellence in Care</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-medical-600 ${
                isActive(link.path) ? 'text-medical-800 font-semibold' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+15551234567" className="flex items-center gap-2 text-slate-600 hover:text-medical-800 transition-colors">
            <Phone size={18} />
            <span className="font-medium text-sm">(555) 123-4567</span>
          </a>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="font-medium text-sm text-slate-700">{user.name.split(' ')[0]}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-50 mb-2">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="font-bold text-slate-900 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { navigate(PageRoute.DASHBOARD); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-medical-700 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </button>
                  <button 
                    onClick={() => { logout(); setIsUserMenuOpen(false); navigate('/'); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
             <button 
               onClick={openLoginModal}
               className="text-slate-700 font-medium text-sm hover:text-medical-700"
             >
               Patient Login
             </button>
          )}

          <button 
            onClick={openBookingModal}
            className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Calendar size={16} />
            Book Appointment
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium py-2 border-b border-slate-50 last:border-0 ${
                isActive(link.path) ? 'text-medical-800' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <Link 
              to={PageRoute.DASHBOARD}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 text-medical-800 flex items-center gap-2"
            >
              <LayoutDashboard size={18} /> My Dashboard
            </Link>
          ) : (
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openLoginModal(); }}
              className="text-base font-medium py-2 text-slate-600 text-left"
            >
              Patient Login
            </button>
          )}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBookingModal();
            }}
            className="bg-medical-800 text-white w-full py-3 rounded-lg text-center font-medium mt-2"
          >
            Book Appointment Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;