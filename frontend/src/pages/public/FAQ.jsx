import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: 'How long does shipping take?', a: 'All shipments inside North America and Western Europe are dispatched via complimentary express delivery. Shipping takes 3-5 business days.' },
  { q: 'Can I resize my signet ring?', a: 'Yes. Golden Glow provides complimentary ring resizing within the first 60 days of purchase. Simply contact our Bond Street atelier support desk.' },
  { q: 'What is your refund return policy?', a: 'We accept returns on all standard pieces within 30 days of shipment. The jewelry piece must remain unworn, in its original velvet-lined box packaging, and with protective security seals intact.' },
  { q: 'Are your diamonds conflict-free?', a: 'Absolutely. Every diamond sold at Golden Glow is conflict-free and complies with the Kimberley Process certification schemes.' }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 font-sans space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs tracking-[0.3em] font-semibold text-primary-glow uppercase">Customer Care</span>
        <h1 className="font-serif text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h1>
        <p className="text-sm text-[#BDBDBD] leading-relaxed">
          Quick details regarding orders, shipping conditions, resizing, and warranties.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="border border-surface-container rounded-xl overflow-hidden shadow-sm bg-surface"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex justify-between items-center p-5 text-left text-xs font-bold text-white tracking-wider uppercase font-sans hover:bg-surface-low transition-colors"
            >
              <span>{faq.q}</span>
              {openIdx === idx ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
            </button>
            
            {openIdx === idx && (
              <div className="p-5 border-t border-surface-container bg-surface-dim text-xs text-[#BDBDBD] leading-relaxed font-sans animate-scale-up">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;
