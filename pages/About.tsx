import React from 'react';
import { Calendar } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { useUI } from '../context/UIContext';

const About: React.FC = () => {
  const { openBookingWithDoctor } = useUI();

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero Mission */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif-heading font-bold text-slate-900 mb-6">Our Mission</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              "To improve the health and well-being of the communities we serve through compassionate, high-quality, and accessible medical care."
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" 
                alt="Clinic Waiting Room" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif-heading font-bold text-slate-900 mb-6">A Legacy of Care</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Founded in 2010, The Clinics began with a simple idea: that visiting the doctor should be a comfortable, reassuring experience. We have grown from a single family practice into a multi-specialty medical group, but our core values remain the same.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We believe in treating the whole person, not just the symptoms. Our integrated approach ensures that your primary care physician communicates seamlessly with specialists, providing a unified path to better health.
              </p>
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-3xl font-serif-heading font-bold text-slate-900 mb-12 text-center">Meet Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DOCTORS.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1 flex flex-col">
                  <div className="overflow-hidden relative">
                    <img src={doc.image} alt={doc.name} className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <button 
                          onClick={() => openBookingWithDoctor(doc.id)}
                          className="w-full bg-white text-slate-900 font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                           <Calendar size={16} /> Book Appointment
                        </button>
                    </div>
                  </div>
                  <div className="p-6 text-center flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                    <p className="text-medical-600 font-medium mb-3">{doc.specialty}</p>
                    <p className="text-slate-500 text-sm mb-4 flex-grow">{doc.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;