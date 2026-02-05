import React from 'react';
import { useUI } from '../context/UIContext';
import { Calendar, Clock, User, Activity, FileText, MessageSquare, ChevronRight, Pill, Bell } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { PageRoute } from '../types';

const Dashboard: React.FC = () => {
  const { user, appointments } = useUI();

  if (!user) {
    return <Navigate to={PageRoute.HOME} />;
  }

  // Get next upcoming appointment
  const upcomingAppointments = appointments.filter(a => a.status !== 'Completed');
  const nextAppt = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="bg-medical-900 text-white pb-24 pt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-white/20 shadow-lg" />
              <div>
                <h1 className="text-2xl md:text-3xl font-serif-heading font-bold">Welcome, {user.name}</h1>
                <p className="text-medical-200">Patient ID: #8829-TC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-medical-900"></span>
              </button>
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg">
                New Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Next Appointment Card */}
            {nextAppt ? (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-medical-600 to-medical-800 p-6 text-white flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Up Next</div>
                    <h2 className="text-xl font-bold">{nextAppt.serviceName} Consultation</h2>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <Calendar size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-full flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Doctor</div>
                        <div className="font-bold text-slate-900">{nextAppt.doctorName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-full flex items-center justify-center">
                        <Clock size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Date & Time</div>
                        <div className="font-bold text-slate-900">{nextAppt.date} • {nextAppt.time}</div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ) : (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
                 <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Calendar size={32} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900">No Upcoming Appointments</h3>
                 <p className="text-slate-500 mb-6">You are all caught up!</p>
                 <Link to="/services" className="text-medical-600 font-medium hover:underline">Browse Services</Link>
               </div>
            )}

            {/* Health Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg"><Activity size={18} /></div>
                  <span className="text-sm font-bold text-slate-500">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">72 <span className="text-sm font-normal text-slate-400">bpm</span></div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[70%]"></div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Activity size={18} /></div>
                  <span className="text-sm font-bold text-slate-500">Blood Pressure</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">120/80</div>
                <div className="mt-2 text-xs text-green-600 font-medium">Normal</div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Activity size={18} /></div>
                  <span className="text-sm font-bold text-slate-500">Weight</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">165 <span className="text-sm font-normal text-slate-400">lbs</span></div>
                <div className="mt-2 text-xs text-slate-400">-2 lbs since last visit</div>
              </div>
            </div>

            {/* Appointment History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {appointments.map((appt) => (
                  <div key={appt.id} className="flex items-center justify-between border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                         ${appt.status === 'Completed' ? 'bg-slate-100 text-slate-500' : 'bg-medical-100 text-medical-700'}
                       `}>
                         {appt.date.split(' ')[1]}
                       </div>
                       <div>
                         <div className="font-bold text-slate-900">{appt.serviceName}</div>
                         <div className="text-xs text-slate-500">{appt.doctorName} • {appt.status}</div>
                       </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-medical-600 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors text-left group">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100"><MessageSquare size={18} /></div>
                  <span className="font-medium text-sm">Message Doctor</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors text-left group">
                   <div className="bg-green-50 text-green-600 p-2 rounded-lg group-hover:bg-green-100"><Pill size={18} /></div>
                   <span className="font-medium text-sm">Refill Prescriptions</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors text-left group">
                   <div className="bg-purple-50 text-purple-600 p-2 rounded-lg group-hover:bg-purple-100"><FileText size={18} /></div>
                   <span className="font-medium text-sm">Lab Results</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-medical-800 to-medical-900 p-6 rounded-xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-medical-100 text-sm mb-4">Our AI assistant Clara is available 24/7 to answer your health questions.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors">
                Start Chat
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;