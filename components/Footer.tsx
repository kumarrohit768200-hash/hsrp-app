
import React from 'react';
import { Link } from 'react-router-dom';
import { DISCLAIMER_TEXT } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">HSRP Assistance Hub</h3>
            <p className="text-sm leading-relaxed mb-6 italic opacity-80">
              {DISCLAIMER_TEXT}
            </p>
            <div className="flex space-x-4">
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">100% Policy Compliant</span>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">SSL Secured</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Installation Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition-colors">Full Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs">
            &copy; {currentYear} HSRP Assistance Hub (Third-Party Service). All rights reserved.
          </p>
          <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest">
            Made for assistance purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
