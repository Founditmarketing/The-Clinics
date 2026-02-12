import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DOCTORS } from '../data/clinicData';
import { useUI } from '../context/UIContext';
import { Calendar, MapPin, Clock, Phone, ArrowLeft, Star, Shield, Award } from 'lucide-react';
import { Doctor } from '../types';

const DoctorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const { openBookingWithDoctor } = useUI();

    const doctor = DOCTORS.find(d => d.id === id);

    useEffect(() => {
        if (doctor) {
            document.title = `${doctor.name} - theCLINICS`;
            // In a real app with SSR, we'd set meta tags here too
        }
    }, [doctor]);

    if (!doctor) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Doctor Not Found</h1>
                <Link to="/about" className="text-medical-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Team
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-100 py-4">
                <div className="container mx-auto px-4 md:px-6">
                    <Link to="/about" className="text-slate-500 text-sm hover:text-medical-600 flex items-center gap-1 inline-flex">
                        <ArrowLeft size={14} /> Back to Team
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Column */}
                        <div className="md:w-1/3 lg:w-1/4 relative">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover min-h-[300px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
                                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                                <p className="font-medium opacity-90">{doctor.specialty}</p>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="md:w-2/3 lg:w-3/4 p-8 md:p-12">
                            <div className="hidden md:block mb-6">
                                <h1 className="text-3xl md:text-4xl font-serif-heading font-bold text-slate-900 mb-2">{doctor.name}</h1>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 text-medical-700 font-medium text-sm">
                                    <Star size={14} fill="currentColor" />
                                    {doctor.specialty}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
                                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                                        {doctor.bio}
                                    </p>

                                    <h2 className="text-xl font-bold text-slate-900 mb-4">Certifications & Expertise</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-500 shadow-sm">
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">Board Certified</p>
                                                <p className="text-slate-500 text-xs text-xs">Medical Board of Louisiana</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-500 shadow-sm">
                                                <Award size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">Top Rated</p>
                                                <p className="text-slate-500 text-xs text-xs">Patient Choice Award</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <h3 className="font-bold text-slate-900 mb-4">Practice Details</h3>

                                        <ul className="space-y-4 mb-6">
                                            <li className="flex items-start gap-3">
                                                <MapPin size={18} className="text-medical-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Location</p>
                                                    <p className="text-sm text-slate-700">{doctor.location}</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Phone size={18} className="text-medical-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Direct Phone</p>
                                                    <a href={`tel:${doctor.phone?.replace(/[^0-9]/g, '')}`} className="text-sm text-medical-700 font-medium hover:underline">
                                                        {doctor.phone}
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Clock size={18} className="text-medical-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Hours</p>
                                                    <ul className="text-sm text-slate-700 space-y-1">
                                                        {doctor.officeHours?.map((hours, i) => (
                                                            <li key={i}>{hours}</li>
                                                        )) || <li>Mon-Fri: 8am - 5pm</li>}
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>

                                        <a
                                            href={`tel:${doctor.phone?.replace(/[^0-9]/g, '') || '3184459823'}`}
                                            className="w-full bg-medical-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-medical-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Phone size={18} /> Call to Schedule
                                        </a>

                                        {doctor.patientPortalUrl && (
                                            <a
                                                href={doctor.patientPortalUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full mt-3 bg-white text-medical-700 border border-medical-200 font-bold py-3 rounded-lg hover:bg-medical-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                Patient Portal
                                            </a>
                                        )}
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

export default DoctorProfile;
