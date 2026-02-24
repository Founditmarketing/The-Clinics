import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Award, Stethoscope, Heart, Activity, Baby, ChevronRight, Phone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useUI } from '../context/UIContext';

const Home: React.FC = () => {
  // const { openBookingModal } = useUI();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0">
            <img
              src="/largeclinicshospitalpic.jpeg"
              alt="The Clinics Mobile"
              className="w-full h-full object-cover object-top opacity-90 md:hidden"
            />
            <img
              src="/largeclinicshospitalpic.jpeg"
              alt="The Clinics Desktop"
              className="w-full h-full object-cover object-top opacity-90 hidden md:block"
            />
          </motion.div>
          <div className="absolute inset-0 bg-white/80 md:bg-transparent md:bg-gradient-to-r md:from-white md:to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 border border-medical-100 text-medical-800 text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-medical-500 animate-pulse"></span>
              Accepting New Patients
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-serif-heading font-bold text-slate-900 leading-tight mb-8"
            >
              Your Health, <br />
              <span className="text-medical-800">Our Priority.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-black mb-10 leading-relaxed max-w-2xl font-medium"
            >
              Experience the future of healthcare at theCLINICS. We combine state-of-the-art technology with compassionate, personalized care for you and your family.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:3184459823"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:-translate-y-1"
              >
                Call to Book
                <Phone className="ml-2 w-5 h-5" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-semibold transition-all hover:border-slate-300"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-medical-900 py-12 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Extended Hours</h3>
                <p className="text-slate-300 text-sm">Open weekends and evenings for your convenience.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Top-Rated Care</h3>
                <p className="text-slate-300 text-sm">Consistently ranked #1 for patient satisfaction.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent-500">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Expert Doctors</h3>
                <p className="text-slate-300 text-sm">Board-certified specialists in every field.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-4">Comprehensive Care</h2>
            <p className="text-slate-600">From routine check-ups to specialized treatments, our expert team is here to support your health journey.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: 'Primary Care', icon: <Stethoscope size={32} />, desc: 'Comprehensive health management for individuals and families.' },
              { title: 'Gastroenterology', icon: <Activity size={32} />, desc: 'Specialized care for digestive health and disease management.' },
              { title: 'Podiatry', icon: <Shield size={32} />, desc: 'Expert diagnosis and surgical treatment for foot and ankle disorders.' },
              { title: 'Access2Day Health', icon: <Clock size={32} />, desc: 'Convenient access to healthcare services when you need them.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-medical-200 transition-all group"
              >
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
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/services" className="inline-block border-b-2 border-slate-900 pb-1 text-slate-900 font-semibold hover:text-medical-700 hover:border-medical-700 transition-all">
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Health Tips Section (New) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-4">Patient Resources</h2>
              <p className="text-slate-600 max-w-xl">Quick access to the tools and information you need to manage your healthcare journey.</p>
            </div>
            <Link to="/patient-resources" className="hidden md:flex items-center text-medical-700 font-semibold hover:text-medical-900">
              View all resources <ChevronRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Pay Your Bill", category: "Payments", img: "/pay_bill.png", desc: "Safe and secure online bill payment for your convenience." },
              {
                title: "Patient Portal",
                category: "Records",
                img: "/patient_portal_v2.png",
                desc: "Access your medical records and communicate directly with your care team.",
                link: "https://mycw11.eclinicalweb.com/portal351/jsp/100mp/login_otp.jsp",
                isExternal: true
              },
              { title: "Patient Forms", category: "Paperwork", img: "/patient_forms.png", desc: "Complete your required forms online before your visit to save time." }
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => {
                  if (resource.isExternal && resource.link) {
                    window.open(resource.link, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = '#/patient-resources';
                  }
                }}
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img src={resource.img} alt={resource.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-xs font-bold text-medical-600 uppercase mb-2">{resource.category}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-medical-700 transition-colors">{resource.title}</h3>
                <p className="text-slate-500 text-sm">{resource.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust/Testimonial Section */}
      <section className="py-24 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img src="/clinicsdoctor.png" alt="Doctor" className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8" />
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" alt="Patient Care" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                className="absolute z-20 -top-10 left-1/2 bg-white p-6 rounded-xl shadow-2xl min-w-[240px] text-center"
                initial={{ opacity: 0, y: 20, x: "-50%" }}
                whileInView={{ opacity: 1, y: 0, x: "-50%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="font-bold text-slate-900 text-lg">"Life Changing!"</p>
                <p className="text-slate-500 text-sm mt-1">Over 5,000 5-star reviews from our community.</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-6">
                Why families trust <span className="text-medical-700">theCLINICS</span>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <motion.section
        className="py-16 bg-gradient-to-r from-medical-600 to-medical-800 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif-heading font-bold mb-4">Ready to prioritize your health?</h2>
          <p className="text-medical-100 mb-8 max-w-2xl mx-auto">Book your appointment today or speak with our virtual assistant to find the right care for you.</p>
          <a
            href="tel:3184459823"
            className="inline-flex items-center justify-center gap-2 bg-white text-medical-800 px-8 py-3 rounded-full font-bold hover:bg-medical-50 transition-colors shadow-lg mx-auto w-fit"
          >
            Call to Schedule Now
            <Phone size={20} />
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;