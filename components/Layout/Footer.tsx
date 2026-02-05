import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold">
                TC
              </div>
              <span className="text-xl font-serif-heading font-bold text-white">The Clinics</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Providing world-class healthcare with a personal touch. Our multi-specialty clinics are dedicated to your well-being.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-600 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Medical Services</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Specialties</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Primary Care</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Cardiology</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Pediatrics</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Neurology</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Urgent Care</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-medical-500 mt-0.5" />
                <span className="text-sm">123 Health Ave, Suite 100<br />Marksville, LA 71351</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-medical-500" />
                <span className="text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-medical-500" />
                <span className="text-sm">info@theclinics.us</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2024 The Clinics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;