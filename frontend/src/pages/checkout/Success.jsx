import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const orderNumber = 'GG-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="max-w-xl mx-auto px-6 pt-40 pb-24 text-center space-y-6 font-sans">
      <div className="w-16 h-16 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center mx-auto">
        <ShieldCheck className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Payment Success!</h2>
        <p className="text-xs text-secondary tracking-widest uppercase">Thank you for shopping at Golden Glow</p>
      </div>

      <p className="text-xs text-[#BDBDBD] leading-relaxed max-w-sm mx-auto">
        Your order has been validated and our goldsmiths are preparing your selection. We have sent a confirmation details invoice to your email address.
      </p>

      <div className="bg-surface border border-surface-container rounded-xl p-4 max-w-sm mx-auto space-y-2 text-xs">
        <div className="flex justify-between border-b border-surface-container/40 pb-2 text-secondary">
          <span>Order Number</span>
          <span className="font-semibold text-white">{orderNumber}</span>
        </div>
        <div className="flex justify-between pt-1 text-secondary">
          <span>Est. Delivery</span>
          <span className="font-semibold text-white flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-primary-glow" /> 3-5 Business Days
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6 max-w-sm mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex-grow bg-primary-glow hover:bg-primary text-luxuryBlack py-3 text-xs uppercase font-semibold font-sans tracking-wider transition-colors rounded"
        >
          Track My Order
        </button>
        <button 
          onClick={() => navigate('/shop')}
          className="flex-grow border border-surface-container hover:bg-surface text-white py-3 text-xs uppercase font-semibold font-sans tracking-wider transition-colors rounded flex items-center justify-center gap-2"
        >
          Return Shop <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default Success;
