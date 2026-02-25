import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../data/clinicData';
import { Stethoscope, Heart, Activity, Baby, Brain, Eye, Clock, Bone, Wind, Zap, Scan, Monitor, FlaskConical, ArrowLeft, Phone, Calendar, Shield, CheckCircle } from 'lucide-react';

const IconMap: Record<string, React.FC<any>> = {
    'Stethoscope': Stethoscope,
    'Heart': Heart,
    'Baby': Baby,
    'Brain': Brain,
    'Eye': Eye,
    'Activity': Activity,
    'Clock': Clock,
    'Bone': Bone,
    'Lab': FlaskConical,
    'Wind': Wind,
    'Zap': Zap,
    'Scan': Scan,
    'Monitor': Monitor,
};

const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const service = SERVICES.find(s => s.id === id);

    useEffect(() => {
        if (service) {
            document.title = `${service.title} - theCLINICS`;
        }
    }, [service]);

    if (!service) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h1>
                <Link to="/services" className="text-medical-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Services
                </Link>
            </div>
        );
    }

    const Icon = IconMap[service.iconName] || Stethoscope;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Section with Header Clearance */}
            <div className="bg-white border-b border-slate-100 pt-24">
                <div className="container mx-auto px-4 md:px-6 pt-[30px] pb-4">
                    <Link to="/services" className="text-slate-500 text-sm hover:text-medical-600 flex items-center gap-1 inline-flex">
                        <ArrowLeft size={14} /> Back to Services
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Header / Hero area for service */}
                        <div className="bg-medical-900 text-white p-8 md:p-16 text-center">
                            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-400">
                                <Icon size={48} />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif-heading font-bold mb-4">{service.title}</h1>
                            <p className="text-medical-100 text-lg max-w-2xl mx-auto">
                                Providing expert care and advanced treatment solutions for your health and wellness.
                            </p>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="md:col-span-2">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif-heading">About This Service</h2>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                        {service.description} Our team of experienced healthcare professionals is dedicated to providing personalized care tailored to your specific needs. We utilize the latest medical advancements and diagnostic tools to ensure the best possible outcomes for our patients.
                                    </p>

                                    <h3 className="text-xl font-bold text-slate-900 mb-4">What to Expect</h3>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            'Comprehensive initial evaluation',
                                            'Personalized treatment planning',
                                            'State-of-the-art diagnostic facilities',
                                            'Compassionate and professional staff',
                                            'Clear communication and follow-up care'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle size={20} className="text-medical-500 mt-1 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-medical-50 rounded-2xl p-8 border border-medical-100">
                                        <h3 className="text-xl font-bold text-medical-900 mb-4">Our Commitment</h3>
                                        <p className="text-medical-800 leading-relaxed italic">
                                            "At theCLINICS, we believe that high-quality healthcare should be accessible and patient-centered. Our {service.title.toLowerCase()} department is built on a foundation of excellence, empathy, and integrity."
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <div className="sticky top-24 space-y-6">
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
                                            <h3 className="font-bold text-slate-900 mb-6">Schedule Appointment</h3>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <Clock size={18} className="text-medical-600" />
                                                    <span className="text-sm">Quick access scheduling</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <Shield size={18} className="text-medical-600" />
                                                    <span className="text-sm">Insured & self-pay options</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <Calendar size={18} className="text-medical-600" />
                                                    <span className="text-sm">Multiple locations available</span>
                                                </div>
                                            </div>

                                            <a
                                                href="tel:3184459823"
                                                className="w-full bg-medical-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-medical-600/20 hover:bg-medical-700 transition-all flex items-center justify-center gap-2 mb-4"
                                            >
                                                <Phone size={18} /> Call (318) 445-9823
                                            </a>

                                            <p className="text-center text-xs text-slate-500">
                                                Our team is available Mon-Fri, 8AM - 5PM to assist with your booking.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                            <h4 className="font-bold text-slate-900 mb-4">Patient Portal</h4>
                                            <p className="text-slate-500 text-sm mb-4">
                                                Existing patients can access records and message doctors through our secure portal.
                                            </p>
                                            <a
                                                href="https://mycw11.eclinicalweb.com/portal351/jsp/100mp/login_otp.jsp"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-medical-600 font-semibold text-sm hover:underline flex items-center gap-1"
                                            >
                                                Log in to Portal <ArrowLeft size={14} className="rotate-180" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
