import React from 'react';
import { useLocation } from 'react-router-dom';

const Policy = () => {
  const { pathname } = useLocation();

  const getPolicyContent = () => {
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        tag: 'Data protection policies',
        body: 'At Golden Glow, we respect your personal data. We collect customer profile details and payment data exclusively to process orders and improve boutique recommendations. We do not sell information to third-party brokers. Transactions are secure and encrypted via Stripe.'
      };
    }
    if (pathname.includes('terms')) {
      return {
        title: 'Terms of Service',
        tag: 'Boutique use conditions',
        body: 'Welcome to Golden Glow. By using our website and purchasing handcrafted jewelry, you agree to comply with our commercial terms. All catalog designs, editorial photographs, and logo signatures are the exclusive intellectual property of Golden Glow.'
      };
    }
    if (pathname.includes('shipping')) {
      return {
        title: 'Shipping Policy',
        tag: 'Express courier delivery',
        body: 'Golden Glow offers complimentary express shipping inside North America and Western Europe for all orders above $1,500. Orders are packaged in velvet-lined gift boxes and ship via secure signature-required courier deliveries. Standard orders ship within 3 business days.'
      };
    }
    return {
      title: 'Refunds & Returns',
      tag: 'Boutique exchange warranties',
      body: 'We accept refund returns or exchanges on all standard jewelry inventory within 30 days of delivery. The item must be unused, with all original security tags, and inside the original luxury packaging box. Resized or customized pieces are non-refundable.'
    };
  };

  const content = getPolicyContent();

  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24 font-sans space-y-6">
      <span className="text-[10px] tracking-[0.3em] font-semibold text-primary-glow uppercase block text-center">
        {content.tag}
      </span>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-luxuryBlack text-center tracking-tight">
        {content.title}
      </h1>
      <p className="text-sm text-secondary-text leading-relaxed font-sans pt-6 border-t border-surface-container/60">
        {content.body}
      </p>
    </div>
  );
};

export default Policy;
