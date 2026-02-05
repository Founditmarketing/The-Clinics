import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Award, Stethoscope, Heart, Activity, Baby, ChevronRight } from 'lucide-react';
import { useUI } from '../context/UIContext';

const Home: React.FC = () => {
  const { openBookingModal } = useUI();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80" 
            alt="Medical Team" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 border border-medical-100 text-medical-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-medical-500 animate-pulse"></span>
              Accepting New Patients
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif-heading font-bold text-slate-900 leading-tight mb-8">
              Your Health, <br />
              <span className="text-medical-800">Our Priority.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              Experience the future of healthcare at The Clinics. We combine state-of-the-art technology with compassionate, personalized care for you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openBookingModal}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:-translate-y-1"
              >
                Book an Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-semibold transition-all hover:border-slate-300"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-medical-900 py-12 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Extended Hours</h3>
                <p className="text-slate-300 text-sm">Open weekends and evenings for your convenience.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Top-Rated Care</h3>
                <p className="text-slate-300 text-sm">Consistently ranked #1 for patient satisfaction.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Expert Doctors</h3>
                <p className="text-slate-300 text-sm">Board-certified specialists in every field.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-4">Comprehensive Care</h2>
            <p className="text-slate-600">From routine check-ups to specialized treatments, our expert team is here to support your health journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Primary Care', icon: <Stethoscope size={32} />, desc: 'Preventive care, check-ups, and health management.' },
              { title: 'Cardiology', icon: <Heart size={32} />, desc: 'Expert heart health diagnostics and treatments.' },
              { title: 'Pediatrics', icon: <Baby size={32} />, desc: 'Compassionate care for infants, children, and teens.' },
              { title: 'Urgent Care', icon: <Activity size={32} />, desc: 'Immediate attention for non-life-threatening conditions.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-medical-200 transition-all group">
                <div className="w-14 h-14 bg-medical-50 text-medical-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link to="/services" className="text-medical-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="inline-block border-b-2 border-slate-900 pb-1 text-slate-900 font-semibold hover:text-medical-700 hover:border-medical-700 transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips Section (New) */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div>
               <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-4">Health & Wellness</h2>
               <p className="text-slate-600 max-w-xl">Stay informed with the latest health tips and news from our medical experts.</p>
             </div>
             <button className="hidden md:flex items-center text-medical-700 font-semibold hover:text-medical-900">
               Read all articles <ChevronRight size={20} />
             </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "5 Heart-Healthy Foods to Add to Your Diet", category: "Cardiology", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80" },
               { title: "Understanding Childhood Immunizations", category: "Pediatrics", img: "https://images.unsplash.com/photo-1632053001099-e68a416a445d?auto=format&fit=crop&q=80" },
               { title: "Managing Stress in the Modern World", category: "Mental Health", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80" }
             ].map((post, idx) => (
               <div key={idx} className="group cursor-pointer">
                 <div className="overflow-hidden rounded-xl mb-4">
                   <img src={post.img} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <div className="text-xs font-bold text-medical-600 uppercase mb-2">{post.category}</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-medical-700 transition-colors">{post.title}</h3>
                 <p className="text-slate-500 text-sm line-clamp-2">Read our latest expert advice on how to improve your lifestyle and long-term health outcomes...</p>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* Trust/Testimonial Section */}
      <section className="py-24 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80" alt="Doctor" className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8" />
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" alt="Patient Care" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-xl shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="flex items-center gap-2 mb-2 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="font-bold text-slate-900 text-lg">"Life Changing!"</p>
                <p className="text-slate-500 text-sm mt-1">Over 5,000 5-star reviews from our community.</p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-6">
                Why families trust <span className="text-medical-700">The Clinics</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We believe healthcare should be accessible, understandable, and deeply personal. Our team of dedicated professionals takes the time to listen, ensuring you never feel like just a number.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Patient-First Approach</h4>
                    <p className="text-slate-500 text-sm">We build treatment plans around your lifestyle and goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Advanced Technology</h4>
                    <p className="text-slate-500 text-sm">Utilizing the latest diagnostic tools for accurate results.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Seamless Coordination</h4>
                    <p className="text-slate-500 text-sm">Integrated specialists mean you don't have to chase referrals.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                 <Link to="/about" className="bg-medical-800 text-white px-6 py-3 rounded-lg hover:bg-medical-900 transition-colors inline-block font-medium">
                   Meet Our Team
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* CTA Strip */}
       <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif-heading font-bold mb-4">Ready to prioritize your health?</h2>
          <p className="text-medical-100 mb-8 max-w-2xl mx-auto">Book your appointment today or speak with our virtual assistant to find the right care for you.</p>
          <button 
            onClick={openBookingModal}
            className="inline-block bg-white text-medical-800 px-8 py-3 rounded-full font-bold hover:bg-medical-50 transition-colors shadow-lg"
          >
            Schedule Now
          </button>
        </div>
       </section>
    </div>
  );
};

export default Home;