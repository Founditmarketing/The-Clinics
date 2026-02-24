import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="theCLINICS" className="h-12 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Providing world-class healthcare with a personal touch. Our multi-specialty clinics are dedicated to your well-being.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/cenlafamilymedicineassociates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-600 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={16} />
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
              <li><Link to="/patient-resources" className="text-sm hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-white font-semibold mb-6">Office Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-slate-400">Mon - Thu:</span>
                <span>7:45 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-400">Friday:</span>
                <span>7:45 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-400">Sat - Sun:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          {/* Our Specialties */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Specialties</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Primary Care</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Gastroenterology</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Podiatry</Link></li>
              <li><Link to="/services" className="text-sm hover:text-white transition-colors">Access2Day Health</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-medical-500 mt-0.5" />
                <span className="text-sm">1587 N Bolton Ave<br />Alexandria, LA 71303</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-medical-500" />
                <span className="text-sm">(318) 445-9823</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-medical-500" />
                <span className="text-sm">info@theclinics.us</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2024 theCLINICS. All rights reserved.</p>
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