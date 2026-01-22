
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Choose Your Service",
      desc: "Select your vehicle type (2-wheeler, 4-wheeler, etc.) from our home page grid."
    },
    {
      title: "Submit Details",
      desc: "Provide your vehicle registration and contact info. Our team reviews the data for accuracy."
    },
    {
      title: "Confirmation Call",
      desc: "Our expert calls you to verify the manufacturing year and fuel type to ensure the correct plate is ordered."
    },
    {
      title: "Expert Booking",
      desc: "We handle the technical booking process on the official portals on your behalf."
    },
    {
      title: "Fitment Appointment",
      desc: "You receive an appointment date. Visit the authorized center or opt for home delivery (where available) to get the plates fitted."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Assistance Process</h1>
          <p className="text-lg text-gray-600">Making HSRP compliance simple and stress-free</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border flex flex-col md:flex-row gap-8 items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 opacity-80">Don't risk fines. Get your vehicle HSRP-compliant today with professional help.</p>
          <button className="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            View All Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
