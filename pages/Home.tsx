
import React from 'react';
import { SERVICE_CATEGORIES } from '../constants';
import ServiceCard from '../components/ServiceCard';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Compliance Focus */}
      <section className="bg-white border-b py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            Third-Party Assistance Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Get Professional Help with your <span className="text-blue-600">HSRP Booking</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Avoid the technical complexity. Our experts assist you in navigating the High Security Registration Plate (HSRP) process, ensuring compliance and hassle-free installation support for your vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Independent Support
            </div>
            <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Installation Assistance
            </div>
            <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Expert Guidance
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Tri-color Divider (Symbolic but safe) */}
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-green-500"></div>
      </div>

      {/* Grid Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <ServiceCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why use an assistance service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Category Accuracy</h3>
              <p className="text-sm text-gray-600">We help you identify the exact plate and sticker requirement based on your vehicle's fuel type and manufacturing year.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Installation Support</h3>
              <p className="text-sm text-gray-600">Guidance on where and how to get your new plates fitted securely as per regulatory guidelines.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Technical Resolution</h3>
              <p className="text-sm text-gray-600">Issues with database records? We provide support in coordinating with the right channels to get your request processed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
