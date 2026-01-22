
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICE_CATEGORIES, DISCLAIMER_TEXT, STATES_LIST, DEFAULT_UPI_ID } from '../constants';

const AssistanceRequest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = SERVICE_CATEGORIES.find(c => c.id === id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    regNumber: '',
    chassis: '',
    engine: '',
    fuelType: '',
    plateCount: '',
    installType: '',
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    trackId: '',
    customUpiId: category?.upiId || DEFAULT_UPI_ID, 
    paymentProof: null as File | null
  });

  // Ensure UPI ID updates if category changes or mounts
  useEffect(() => {
    if (category?.upiId) {
      setFormData(prev => ({ ...prev, customUpiId: category.upiId || DEFAULT_UPI_ID }));
    }
  }, [category]);

  const referenceId = useMemo(() => {
    return `HSRP-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  const assistanceFee = useMemo(() => {
    if (!category) return 0;
    const { min, max } = category.priceRange;
    if (min === 0) return 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [category]);

  if (!category) return <div className="p-20 text-center">Category not found. <Link to="/" className="text-blue-600">Go Home</Link></div>;

  const isSupportFlow = category.id === 'support';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetUpi = () => {
    setFormData(prev => ({ ...prev, customUpiId: category?.upiId || DEFAULT_UPI_ID }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentProof: e.target.files![0] }));
    }
  };

  const steps = [
    { num: 1, label: 'Vehicle Details', icon: '🚗' },
    { num: 2, label: 'Owner Details', icon: '👤' },
    { num: 3, label: 'Checkout', icon: '💳' }
  ];

  const upiUrl = useMemo(() => {
    const payeeName = "HSRP Assistance Hub";
    const transactionNote = encodeURIComponent(`Assistance for ${formData.regNumber || 'Vehicle'}`);
    return `upi://pay?pa=${formData.customUpiId}&pn=${encodeURIComponent(payeeName)}&am=${assistanceFee}&cu=INR&tn=${transactionNote}&mc=0000`;
  }, [formData.customUpiId, assistanceFee, formData.regNumber]);

  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=${encodeURIComponent(upiUrl)}&bgcolor=ffffff&color=1e3a8a&qzone=1`;
  }, [upiUrl]);

  return (
    <div className="min-h-screen bg-slate-50 py-4 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link to="/" className="text-blue-600 font-bold flex items-center gap-2 hover:text-blue-800 transition-colors text-xs uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Change Service
          </Link>
          {step < 4 && !isSupportFlow && (
            <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm self-start md:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Request Ref: {referenceId}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {!isSupportFlow && step < 4 && (
            <aside className="w-full md:w-72 flex-shrink-0 sticky top-24 hidden lg:block">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Application Flow</h2>
                </div>
                <div className="p-8 space-y-10">
                  {steps.map((s) => (
                    <div key={s.num} className="flex items-start gap-5 relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 ${
                          step === s.num ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 
                          step > s.num ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {step > s.num ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          ) : s.num}
                        </div>
                        {s.num !== 3 && (
                          <div className={`w-0.5 h-12 mt-2 transition-colors duration-500 ${step > s.num ? 'bg-green-500' : 'bg-slate-100'}`} />
                        )}
                      </div>
                      <div className="pt-2">
                        <p className={`text-sm font-black transition-colors ${step === s.num ? 'text-slate-900' : 'text-slate-400'}`}>
                          {s.label}
                        </p>
                        {step === s.num && (
                          <div className="mt-1 h-1 w-8 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <main className="flex-grow w-full">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-slate-200 overflow-hidden flex flex-col min-h-[500px] md:min-h-[700px] relative">
              
              <div className="p-6 md:p-12 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                  <div>
                    <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">{category.title}</h1>
                    <p className="text-slate-500 text-xs md:text-base mt-2 md:mt-3 font-medium opacity-80">
                      {isSupportFlow ? "Track your existing request status." : "Complete details for HSRP booking assistance."}
                    </p>
                  </div>
                  {!isSupportFlow && step < 4 && (
                    <div className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2 self-start md:self-auto">
                      <span className="opacity-50">STEP</span> {step} / 3
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-12 flex-grow">
                
                {isSupportFlow ? (
                  <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-xl mx-auto py-6 md:py-10">
                    <div className="text-center space-y-4 mb-6 md:mb-10">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 text-blue-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto text-3xl md:text-4xl shadow-inner">🔍</div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-800">Track Assistance Status</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Reference ID or Mobile</label>
                        <input 
                          type="text" 
                          name="trackId"
                          placeholder="e.g. HSRP-123456"
                          value={formData.trackId}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 md:px-6 md:py-5 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-base md:text-lg text-slate-900 shadow-sm"
                        />
                      </div>
                      <button className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                        Search Database
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div className="space-y-6 md:space-y-10 animate-fadeIn">
                        <div className="flex items-center gap-3 md:gap-4">
                          <span className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">🚗</span>
                          <h3 className="text-lg md:text-2xl font-black text-slate-800">Vehicle Identification</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Registration State</label>
                            <select 
                              name="state" 
                              value={formData.state} 
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 shadow-sm appearance-none"
                            >
                              <option value="">Choose State</option>
                              {STATES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Registration No.</label>
                            <input 
                              type="text" 
                              name="regNumber"
                              placeholder="e.g. DL 01 AB 1234"
                              value={formData.regNumber}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all uppercase font-black tracking-widest shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Chassis No. (Last 5)</label>
                            <input 
                              type="text" 
                              name="chassis"
                              maxLength={5}
                              value={formData.chassis}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all uppercase font-mono tracking-[0.2em] text-base md:text-lg shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Engine No. (Last 5)</label>
                            <input 
                              type="text" 
                              name="engine"
                              maxLength={5}
                              value={formData.engine}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all uppercase font-mono tracking-[0.2em] text-base md:text-lg shadow-sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Fuel Type</label>
                            <select 
                              name="fuelType" 
                              value={formData.fuelType} 
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 shadow-sm appearance-none"
                            >
                              <option value="">Select Fuel Type</option>
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                              <option value="CNG">CNG</option>
                              <option value="CNG + Petrol">CNG + Petrol</option>
                              <option value="Electric">Electric</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Number of Plates</label>
                            <select 
                              name="plateCount" 
                              value={formData.plateCount} 
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 shadow-sm appearance-none"
                            >
                              <option value="">Select Option</option>
                              <option value="2 Plates (Front + Rear)">2 Plates (Front + Rear)</option>
                              <option value="1 Plate (Front Only)">1 Plate (Front Only)</option>
                              <option value="1 Plate (Rear Only)">1 Plate (Rear Only)</option>
                            </select>
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Installation Type</label>
                            <select 
                              name="installType" 
                              value={formData.installType} 
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 shadow-sm appearance-none"
                            >
                              <option value="">Choose Installation Method</option>
                              <option value="Home Installation">Home Installation (Doorstep)</option>
                              <option value="Fitment Center">Fitment Installation (At Authorized Center)</option>
                            </select>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1 leading-relaxed">Note: Validation of installation slot is required post-booking.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6 md:space-y-10 animate-fadeIn">
                        <div className="flex items-center gap-3 md:gap-4">
                          <span className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">👤</span>
                          <h3 className="text-lg md:text-2xl font-black text-slate-800">Ownership Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Name (As per RC)</label>
                            <input 
                              type="text" 
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-black text-slate-900 shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Mobile Number</label>
                            <input 
                              type="tel" 
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-black text-base md:text-lg shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-black shadow-sm"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Address</label>
                            <textarea 
                              name="address"
                              rows={3}
                              value={formData.address}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium shadow-sm leading-relaxed"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 md:space-y-10 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                          
                          <div className="space-y-6 md:space-y-8">
                            <div className="flex items-center gap-3 md:gap-4">
                              <span className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">💳</span>
                              <h3 className="text-lg md:text-2xl font-black text-slate-800">Checkout Assistance</h3>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Receiver UPI ID</label>
                                <button 
                                  onClick={resetUpi}
                                  className="text-[9px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider underline underline-offset-4"
                                >
                                  Reset Default
                                </button>
                              </div>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  name="customUpiId"
                                  value={formData.customUpiId}
                                  onChange={handleInputChange}
                                  placeholder="Enter UPI ID (e.g. name@bank)"
                                  className="w-full px-5 py-4 md:px-6 md:py-5 bg-white border-2 border-slate-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-900 shadow-sm"
                                />
                              </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden group shadow-xl md:shadow-2xl">
                              <div className="relative z-10 space-y-6 md:space-y-8">
                                <div>
                                  <p className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Service Breakdown</p>
                                  <p className="text-white font-black text-lg md:text-xl leading-tight uppercase tracking-tight">{category.title}</p>
                                </div>
                                <div className="h-px bg-white/10 w-full" />
                                <div>
                                  <p className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Assistance Fee Total</p>
                                  <p className="text-4xl md:text-6xl font-black text-white flex items-center gap-1 tracking-tighter">
                                    <span className="text-xl md:text-3xl opacity-50 font-medium">₹</span>{assistanceFee}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6 md:space-y-8">
                            <div className="flex flex-col items-center justify-center bg-blue-600 rounded-[2rem] md:rounded-[4rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full -mr-30 -mt-30 md:-mr-40 md:-mt-40 blur-3xl transition-transform group-hover:scale-150 duration-1000" />
                              
                              <div className="relative z-10 text-center space-y-6 md:space-y-10 w-full">
                                <div className="space-y-2 md:space-y-3">
                                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-90">Universal UPI Payment</p>
                                  <div className="inline-block bg-white/10 px-4 py-2 md:px-6 md:py-2.5 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-xl max-w-full overflow-hidden shadow-sm">
                                    <p className="text-[9px] md:text-[10px] font-mono truncate font-black text-white tracking-[0.1em] uppercase">{formData.customUpiId}</p>
                                  </div>
                                </div>
                                
                                <div className="bg-white p-4 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.05] group-hover:rotate-1 mx-auto w-full max-w-[240px] md:max-w-[340px] relative">
                                  <img key={qrCodeUrl} src={qrCodeUrl} alt="Real-time UPI QR" className="w-full aspect-square rounded-2xl md:rounded-3xl" />
                                  <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 md:gap-3">
                                    <div className="flex gap-1">
                                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500"></span>
                                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500/50"></span>
                                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500/20"></span>
                                    </div>
                                    <p className="text-[8px] md:text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Verified Secure QR</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-6 md:space-y-8">
                                  <div className="flex flex-wrap gap-2 justify-center items-center opacity-90">
                                    {['G-Pay', 'PhonePe', 'Paytm'].map(app => (
                                      <span key={app} className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black border border-white/10 uppercase tracking-widest">{app}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block ml-1">Proof of Payment</label>
                              <div className="relative group">
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-slate-200 group-hover:border-blue-400 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 flex flex-col items-center justify-center transition-all bg-slate-50 group-hover:bg-blue-50/50 shadow-inner">
                                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-lg flex items-center justify-center mb-3 md:mb-5 text-slate-400 group-hover:text-blue-600 transition-all group-hover:scale-110">
                                    <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-5-8l-5-5m0 0l-5 5m5-5v12" /></svg>
                                  </div>
                                  <span className="text-xs md:text-sm text-slate-900 font-black text-center px-4 leading-relaxed">
                                    {formData.paymentProof ? formData.paymentProof.name : "Select or Snap Screenshot"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

              {!isSupportFlow && step < 4 && (
                <div className="p-6 md:p-12 border-t bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                  {step > 1 ? (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="px-6 md:px-12 py-4 md:py-5 font-black text-slate-400 hover:text-slate-900 transition-all uppercase text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] w-full md:w-auto text-center"
                    >
                      ← Back
                    </button>
                  ) : <div className="hidden md:block" />}

                  {step < 3 ? (
                    <button 
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 && (!formData.state || !formData.regNumber || !formData.fuelType || !formData.plateCount || !formData.installType || formData.chassis.length < 5)}
                      className="bg-blue-600 text-white px-8 md:px-16 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-blue-700 transition-all shadow-xl md:shadow-2xl active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button 
                      onClick={() => setStep(4)}
                      disabled={!formData.paymentProof}
                      className="bg-green-600 text-white px-8 md:px-16 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-green-700 transition-all shadow-xl md:shadow-2xl active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      Confirm & Submit ✓
                    </button>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="absolute inset-0 bg-white z-[100] flex flex-col items-center justify-start md:justify-center text-center p-6 md:p-24 animate-fadeIn overflow-y-auto">
                  <div className="w-20 h-20 md:w-36 md:h-36 bg-green-50 text-green-500 rounded-3xl md:rounded-[5rem] flex items-center justify-center mb-8 md:mb-12 shadow-inner animate-bounce shrink-0 border-4 border-white mt-8 md:mt-0">
                    <svg className="w-10 h-10 md:w-18 md:h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto mb-10 md:mb-14">
                    <h2 className="text-2xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight mb-2">Request Processed!</h2>
                    
                    <div className="py-5 md:py-8 px-8 md:px-14 bg-slate-50 border border-slate-200 rounded-2xl md:rounded-[3rem] inline-flex flex-col items-center gap-2 md:gap-3 mb-4 md:mb-6 shadow-sm border-dashed">
                      <p className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.4em]">Reference ID</p>
                      <p className="text-2xl md:text-4xl font-black text-blue-600 tracking-[0.1em] md:tracking-[0.25em] font-mono">{referenceId}</p>
                    </div>

                    <p className="text-slate-600 font-bold text-sm md:text-xl leading-relaxed px-4 md:px-6">
                      Your vehicle <span className="text-slate-900 font-black bg-blue-50 px-2 md:px-3 py-1 rounded-lg md:rounded-xl">{formData.regNumber.toUpperCase()}</span> is now in our verification queue.
                    </p>
                    
                    <div className="bg-blue-50/50 border border-blue-100 p-6 md:p-10 rounded-2xl md:rounded-[3.5rem] mt-6 md:mt-10 shadow-inner">
                      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <h4 className="text-blue-900 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px]">What happens next?</h4>
                      </div>
                      <p className="text-xs md:text-base text-blue-800 font-medium leading-relaxed">
                        Our assistance desk is reviewing your payment and registration data. Expect a message on <span className="font-bold underline text-blue-700 underline-offset-4">{formData.mobile}</span> within <span className="font-black">7 to 10 business days</span> for the official booking delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 w-full justify-center px-4 md:px-6 mb-8 md:mb-12">
                    <Link to="/" className="bg-slate-900 text-white px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] shadow-xl md:shadow-2xl hover:bg-slate-800 transition-all active:scale-95 text-center w-full md:min-w-[240px]">
                      Return Home
                    </Link>
                    <button onClick={() => window.print()} className="bg-white border-2 border-slate-200 text-slate-600 px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] shadow-lg hover:bg-slate-50 transition-all text-center w-full md:min-w-[240px]">
                      Download PDF
                    </button>
                  </div>
                  
                  <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] opacity-50 pb-8">Independent Assistance Service Receipt</p>
                </div>
              )}

              <div className="px-6 md:px-10 py-6 md:py-8 bg-slate-100 border-t border-slate-200">
                <p className="text-[9px] md:text-[10px] text-slate-400 text-center leading-relaxed font-bold uppercase tracking-widest opacity-60">
                  {DISCLAIMER_TEXT}
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AssistanceRequest;
