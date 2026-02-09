import React from 'react';
import { Stethoscope, Heart, Baby, Brain, Eye, Activity, Bone, Smile, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/clinicData';
import { useUI } from '../context/UIContext';

// Helper to map icon names to components
const IconMap: Record<string, React.FC<any>> = {
  'Stethoscope': Stethoscope,
  'Heart': Heart,
  'Baby': Baby,
  'Brain': Brain,
  'Eye': Eye,
  'Activity': Activity,
  'Clock': Clock
};

const Services: React.FC = () => {
  const { openBookingWithService } = useUI();

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="bg-medical-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif-heading font-bold mb-4">Our Medical Services</h1>
          <p className="text-medical-100 max-w-2xl text-lg">
            We offer a wide range of specialized medical services to ensure that you and your family receive the best possible care under one roof.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = IconMap[service.iconName] || Stethoscope;
            return (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col h-full">
                <div className="w-16 h-16 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center mb-6 group-hover:bg-medical-600 group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <button
                    onClick={() => openBookingWithService(service.id)}
                    className="w-full py-3 rounded-lg border-2 border-medical-100 text-medical-700 font-semibold hover:border-medical-600 hover:bg-medical-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} /> Book Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insurance Section */}
      <div className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Accepted Insurance Plans</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text placeholders for logos */}
            {['BlueCross', 'Aetna', 'Cigna', 'UnitedHealth', 'Medicare', 'Humana'].map(name => (
              <span key={name} className="text-xl font-bold text-slate-400 hover:text-medical-600 cursor-default transition-colors">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-8 text-slate-500 text-sm">
            Don't see your provider? <Link to="/contact" className="text-medical-600 underline">Contact us</Link> to verify coverage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;