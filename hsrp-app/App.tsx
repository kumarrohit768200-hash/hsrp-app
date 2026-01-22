import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DisclaimerBanner from './components/DisclaimerBanner';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import AssistanceRequest from './pages/AssistanceRequest';
import { PrivacyPolicy, TermsConditions } from './pages/LegalPages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/assistance/:id" element={<AssistanceRequest />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<About />} />
            {/* Fallback to Home if route is not found to prevent blank screen */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <DisclaimerBanner />
        <Footer />
      </div>
    </Router>
  );
};

export default App;