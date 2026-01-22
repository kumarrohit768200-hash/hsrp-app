
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">About Our Assistance Service</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-10">
          <p className="text-lg font-semibold text-blue-800 leading-relaxed italic">
            "{DISCLAIMER_TEXT}"
          </p>
        </div>

        <div className="prose prose-blue lg:prose-lg text-gray-700 space-y-6">
          <p>
            The transition to High Security Registration Plates (HSRP) is a significant move for vehicle safety and standardization in India. However, many vehicle owners find the digital booking process complex or confusing.
          </p>
          
          <p>
            Our mission is to bridge this gap. As a private service agency, we provide expert administrative assistance to individuals and businesses. We help you choose the right product, prepare your request, and offer post-booking support to ensure your vehicle is compliant.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Expert Advisory:</strong> Guidance on which plates and stickers apply to your specific vehicle model.</li>
            <li><strong>Form Preparation:</strong> Assistance in accurately filling out the details required for your HSRP request.</li>
            <li><strong>Installation Scheduling:</strong> Helping you find and schedule installation at authorized fitment centers.</li>
            <li><strong>Customer Support:</strong> A dedicated team to answer your questions about the HSRP mandate and process.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Commitment to Policy</h2>
          <p>
            We operate with 100% transparency. We are not a government portal. We do not claim to issue plates ourselves. We charge a service fee for our professional time, guidance, and assistance, which is separate from any government or mandatory manufacturer fees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
