
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '../types';

interface ServiceCardProps {
  category: ServiceCategory;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ category }) => {
  const isYellow = category.color === 'yellow';
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border ${
      isYellow ? 'bg-amber-100 border-amber-200' : 'bg-indigo-800 border-indigo-900 text-white'
    }`}>
      <div className="p-6 flex-grow">
        <h3 className={`text-xl font-bold mb-3 leading-tight ${isYellow ? 'text-gray-800' : 'text-white'}`}>
          {category.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isYellow ? 'text-gray-600' : 'text-indigo-100 opacity-80'}`}>
          {category.description}
        </p>
      </div>
      
      <div className="p-4 pt-0">
        <Link 
          to={`/assistance/${category.id}`}
          className={`block w-full text-center py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 ${
            isYellow 
              ? 'bg-white text-amber-900 hover:bg-gray-50 border border-gray-200' 
              : 'bg-white text-indigo-900 hover:bg-indigo-50 border border-transparent'
          }`}
        >
          Proceed
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
