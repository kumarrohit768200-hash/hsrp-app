
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue">
    <h1>Privacy Policy</h1>
    <p>Last Updated: October 2023</p>
    <p>This Privacy Policy describes how HSRP Assistance Hub ("we", "us", "our") collects, uses, and shares your personal information when you use our website to request third-party assistance for HSRP booking.</p>
    
    <h3>1. Information We Collect</h3>
    <p>We collect information necessary to provide assistance services, including vehicle registration numbers, owner names, contact numbers, and email addresses. We do NOT collect or store sensitive government IDs like Aadhaar or PAN cards.</p>

    <h3>2. How We Use Information</h3>
    <p>The information is used solely to facilitate the HSRP booking process on your behalf, providing customer support, and communicating status updates.</p>

    <h3>3. Third-Party Sharing</h3>
    <p>We share vehicle data with official manufacturer portals only as required to complete the booking request you have authorized us to handle. We do not sell your data to marketers.</p>

    <h3>4. Compliance</h3>
    <p>This site is designed to be fully compliant with Google Ads and modern security standards. We use HTTPS and secure server practices.</p>
  </div>
);

export const TermsConditions: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue">
    <h1>Terms & Conditions</h1>
    <p>By using this website, you agree to the following terms:</p>
    
    <div className="bg-red-50 p-4 border rounded font-bold text-red-800 mb-6">
      {DISCLAIMER_TEXT}
    </div>

    <h3>1. Scope of Service</h3>
    <p>HSRP Assistance Hub provides administrative assistance for the booking of High Security Registration Plates. We are a private consulting firm and NOT a government entity.</p>

    <h3>2. Fees</h3>
    <p>Users agree to pay a service fee for our assistance. This fee is separate from the mandatory product cost set by plate manufacturers and government authorities.</p>

    <h3>3. Accuracy of Data</h3>
    <p>You are responsible for providing correct vehicle registration details. We are not liable for bookings failed due to incorrect user input.</p>

    <h3>4. Cancellations</h3>
    <p>Once a booking is finalized with the manufacturer portal through our assistance, it may be non-refundable as per manufacturer policies.</p>
  </div>
);
