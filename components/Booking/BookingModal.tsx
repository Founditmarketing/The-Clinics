import React, { useState, useEffect } from 'react';
import { X, Calendar, User, CheckCircle, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { SERVICES, DOCTORS } from '../../data/clinicData';
import { Appointment } from '../../types';

const steps = ['Service', 'Doctor', 'Time', 'Details'];

// Helper to get next 3 days dynamically
const getUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  }
  return dates;
};

const BookingModal: React.FC = () => {
  const { isBookingModalOpen, closeBookingModal, preselectedServiceId, preselectedDoctorId, user, addAppointment } = useUI();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<{date: string, time: string} | null>(null);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
  
  const dynamicDates = React.useMemo(() => getUpcomingDates(), []);

  useEffect(() => {
    if (isBookingModalOpen) {
      // Default reset
      setCurrentStep(0);
      setSelectedService(null);
      setSelectedDoctor(null);
      setSelectedTime(null);

      // Pre-fill user details if logged in
      if (user) {
        setUserDetails(prev => ({ ...prev, name: user.name, email: user.email }));
      }

      // Handle Context Pre-selections
      if (preselectedServiceId) {
        setSelectedService(preselectedServiceId);
        setCurrentStep(1); 
      }
      
      if (preselectedDoctorId) {
        setSelectedDoctor(preselectedDoctorId);
      }
    }
  }, [isBookingModalOpen, preselectedServiceId, preselectedDoctorId, user]);

  if (!isBookingModalOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new appointment object
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      serviceName: SERVICES.find(s => s.id === selectedService)?.title || 'General Consultation',
      doctorName: selectedDoctor === 'any' ? 'First Available' : DOCTORS.find(d => d.id === selectedDoctor)?.name || 'First Available',
      date: selectedTime?.date || 'TBD',
      time: selectedTime?.time || 'TBD',
      status: 'Confirmed'
    };

    // Save to context
    addAppointment(newAppointment);

    // Close
    setTimeout(() => {
      alert(`Appointment Confirmed!\nCheck your dashboard for details.`);
      closeBookingModal();
    }, 500);
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0: // Service Selection
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map(service => (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service.id); handleNext(); }}
                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                  selectedService === service.id 
                    ? 'border-medical-600 bg-medical-50 ring-1 ring-medical-600' 
                    : 'border-slate-200 hover:border-medical-300'
                }`}
              >
                <h4 className="font-bold text-slate-900">{service.title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.description}</p>
              </button>
            ))}
          </div>
        );
      case 1: // Doctor Selection
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 mb-2">Select a Specialist</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                 onClick={() => { setSelectedDoctor('any'); handleNext(); }}
                 className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                   selectedDoctor === 'any' ? 'border-medical-600 bg-medical-50 ring-1 ring-medical-600' : 'border-slate-200 hover:bg-slate-50'
                 }`}
              >
                 <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center text-medical-700">
                   <User size={24} />
                 </div>
                 <div className="text-left">
                   <h4 className="font-bold text-slate-900">First Available</h4>
                   <p className="text-xs text-slate-500">Earliest appointment with any qualified doctor</p>
                 </div>
              </button>
              {DOCTORS.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => { setSelectedDoctor(doc.id); handleNext(); }}
                  className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                    selectedDoctor === doc.id ? 'border-medical-600 bg-medical-50 ring-1 ring-medical-600' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-medical-600">{doc.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2: // Time Selection
        const times = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
        return (
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {dynamicDates.map((date, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedTime(prev => ({ ...prev, date, time: prev?.time || '' }))}
                  className={`px-4 py-3 rounded-lg border text-sm whitespace-nowrap font-medium transition-all ${
                    selectedTime?.date === date 
                    ? 'bg-medical-800 text-white border-medical-800 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-medical-400'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
            
            {selectedTime?.date ? (
              <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2">
                {times.map((time, i) => (
                  <button 
                    key={i}
                    onClick={() => { setSelectedTime(prev => ({ ...prev!, time })); }}
                    className={`py-2 px-2 rounded-lg text-sm border flex items-center justify-center gap-1 transition-all ${
                      selectedTime?.time === time
                      ? 'bg-accent-50 text-accent-700 border-accent-500 ring-1 ring-accent-500 font-semibold' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-medical-400'
                    }`}
                  >
                    <Clock size={14} /> {time}
                  </button>
                ))}
              </div>
            ) : (
                <div className="text-center py-8 text-slate-400 text-sm border border-dashed border-slate-200 rounded-lg">
                    Select a date above to see available times
                </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button 
                disabled={!selectedTime?.date || !selectedTime?.time}
                onClick={handleNext}
                className="bg-medical-800 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-medical-700 transition-colors shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 3: // Details
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="bg-medical-50 p-4 rounded-lg mb-6 text-sm text-slate-700 border border-medical-100">
               <p><span className="font-bold">Service:</span> {SERVICES.find(s => s.id === selectedService)?.title}</p>
               <p><span className="font-bold">Doctor:</span> {selectedDoctor === 'any' ? 'First Available' : DOCTORS.find(d => d.id === selectedDoctor)?.name}</p>
               <p><span className="font-bold">When:</span> {selectedTime?.date} at {selectedTime?.time}</p>
             </div>

             <div className="space-y-3">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                 <input 
                   required
                   value={userDetails.name}
                   onChange={e => setUserDetails({...userDetails, name: e.target.value})}
                   className="w-full p-3 rounded-lg border border-slate-200 focus:border-medical-500 outline-none"
                   placeholder="Jane Doe"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                 <input 
                   required
                   type="email"
                   value={userDetails.email}
                   onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                   className="w-full p-3 rounded-lg border border-slate-200 focus:border-medical-500 outline-none"
                   placeholder="jane@example.com"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                 <input 
                   required
                   type="tel"
                   value={userDetails.phone}
                   onChange={e => setUserDetails({...userDetails, phone: e.target.value})}
                   className="w-full p-3 rounded-lg border border-slate-200 focus:border-medical-500 outline-none"
                   placeholder="(555) 555-5555"
                 />
               </div>
             </div>

             <button type="submit" className="w-full py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-lg mt-4 transition-all transform active:scale-95">
               Confirm Appointment
             </button>
          </form>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={closeBookingModal}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="bg-white border-b border-slate-100 p-4 flex justify-between items-center">
           <div>
             <h2 className="text-lg font-serif-heading font-bold text-slate-900">Book Appointment</h2>
             <p className="text-xs text-slate-500">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
           </div>
           <button onClick={closeBookingModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
             <X size={20} />
           </button>
        </div>

        <div className="h-1 bg-slate-100 w-full">
          <div 
            className="h-full bg-medical-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 overflow-y-auto">
          {renderStepContent()}
        </div>

        {currentStep > 0 && currentStep < 3 && (
           <div className="p-4 border-t border-slate-50 flex justify-between bg-slate-50">
             <button 
               onClick={handleBack}
               className="text-slate-500 font-medium text-sm hover:text-slate-800 flex items-center gap-1 transition-colors"
             >
               <ChevronLeft size={16} /> Back
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;