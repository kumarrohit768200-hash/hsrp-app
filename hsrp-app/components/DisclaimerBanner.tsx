
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';

const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-red-50 border-t border-red-100 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xs md:text-sm text-red-800 font-medium leading-relaxed">
          <span className="font-bold uppercase tracking-wider mr-1">Important Notice:</span>
          {DISCLAIMER_TEXT}
        </p>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
