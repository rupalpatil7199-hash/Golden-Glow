import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, HelpCircle } from 'lucide-react';

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-6 pt-40 pb-24 text-center space-y-6 font-sans">
      <div className="w-16 h-16 rounded-full bg-red-100/10 text-red-500 flex items-center justify-center mx-auto">
        <XCircle className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Payment Failed</h2>
        <p className="text-xs text-secondary tracking-widest uppercase">Transaction authorization declined</p>
      </div>

      <p className="text-xs text-[#BDBDBD] leading-relaxed max-w-sm mx-auto">
        We were unable to charge your card. Please verify that your billing address matches, check card expiration, or contact financial partners.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-6 max-w-sm mx-auto">
        <button 
          onClick={() => navigate('/checkout')}
          className="flex-grow bg-primary-glow hover:bg-primary text-luxuryBlack py-3 text-xs uppercase font-semibold font-sans tracking-wider transition-colors rounded"
        >
          Retry Checkout
        </button>
        <button 
          onClick={() => navigate('/contact')}
          className="flex-grow border border-surface-container hover:bg-surface text-white py-3 text-xs uppercase font-semibold font-sans tracking-wider transition-colors rounded flex items-center justify-center gap-2"
        >
          Customer Support <HelpCircle className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default Failed;
