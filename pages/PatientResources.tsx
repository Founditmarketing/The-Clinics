import React from 'react';
import { FileText, CreditCard, User, ExternalLink, Download } from 'lucide-react';

const PatientResources: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="bg-medical-900 text-white py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-5xl font-serif-heading font-bold mb-4">Patient Resources</h1>
                    <p className="text-medical-100 max-w-2xl text-lg">
                        Access forms, pay your bill, and manage your health information conveniently online.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <a
                        href="https://healowpay.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center p-8 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-medical-200 transition-all group"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                            <CreditCard size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                                Pay Your Bill <ExternalLink size={16} className="text-slate-400" />
                            </h2>
                            <p className="text-slate-500">Secure online bill payment via Healow.</p>
                        </div>
                    </a>

                    <a
                        href="https://mycw11.eclinicalweb.com/portal351/jsp/100mp/login_otp.jsp"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center p-8 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-medical-200 transition-all group"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                                Patient Portal <ExternalLink size={16} className="text-slate-400" />
                            </h2>
                            <p className="text-slate-500">View records, lab results, and message your doctor.</p>
                        </div>
                    </a>
                </div>

                {/* Downloadable Forms */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <h2 className="text-2xl font-serif-heading font-bold text-slate-900 mb-8">Patient Forms</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="border border-slate-200 rounded-lg p-6 hover:bg-slate-50 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Gastroenterology (AGA)
                            </h3>
                            <div className="space-y-3">
                                <a href="https://theclinics.us/wp-content/uploads/2024/03/NEW-PT-COMBINED-PAPERWORK.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> New Patient Packet
                                </a>
                                <a href="https://theclinics.us/wp-content/uploads/2024/03/RET-PT-COMBINED-PAPERWORK.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> Returning Patient
                                </a>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-lg p-6 hover:bg-slate-50 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Podiatry
                            </h3>
                            <div className="space-y-3">
                                <a href="https://theclinics.us/wp-content/uploads/2021/05/Podiatry-New-Patient-Packet-2021.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> New Patient Packet
                                </a>
                                <a href="https://theclinics.us/wp-content/uploads/2021/05/Podiatry-Update-Only-2021.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> Patient Update Form
                                </a>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-lg p-6 hover:bg-slate-50 transition-colors">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Primary Care
                            </h3>
                            <div className="space-y-3">
                                <a href="https://theclinics.us/wp-content/uploads/2021/09/CFMA-New-Patient-Packet-2021-updated.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> New Patient Packet
                                </a>
                                <a href="https://theclinics.us/wp-content/uploads/2021/05/CFMA-Update-Only-2021.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-medical-700 hover:underline">
                                    <Download size={16} /> Update Information
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PatientResources;
