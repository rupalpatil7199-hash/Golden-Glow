import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuthBridge } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Check, CreditCard, ChevronRight, Lock, MapPin, ListOrdered, ShieldCheck } from 'lucide-react';

const steps = ['Shipping', 'Billing', 'Payment', 'Review'];

const CheckoutFlow = () => {
  const navigate = useNavigate();
  const { user } = useAuthBridge();
  const { showSuccess, showError } = useNotification();
  const {
    cartItems,
    total,
    subtotal,
    discount,
    shippingFee,
    tax,
    giftWrap,
    clearCart
  } = useCart();

  const [activeStep, setActiveStep] = useState(0);

  // Form states
  const [shippingForm, setShippingForm] = useState({
    fullName: user?.fullName || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });

  const [billingForm, setBillingForm] = useState({
    fullName: user?.fullName || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Card payment mockup states
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: user?.fullName || ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-center">
        <h3 className="font-serif text-lg font-bold">No Items to Checkout</h3>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 bg-luxuryBlack text-white px-6 py-3 text-xs tracking-wider uppercase font-semibold font-sans rounded"
        >
          View Collections
        </button>
      </div>
    );
  }

  const handleShippingChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (sameAsShipping) {
      setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
    }
  };

  const handleBillingChange = (e) => {
    setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (activeStep === 0) {
      if (!shippingForm.fullName || !shippingForm.addressLine1 || !shippingForm.city || !shippingForm.postalCode) {
        showError('Please complete all required shipping fields.');
        return;
      }
    }
    if (activeStep === 1) {
      if (!sameAsShipping && (!billingForm.fullName || !billingForm.addressLine1 || !billingForm.city)) {
        showError('Please complete all required billing fields.');
        return;
      }
    }
    if (activeStep === 2) {
      if (!cardForm.number || !cardForm.expiry || !cardForm.cvc) {
        showError('Please complete credit card details.');
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
  };

  const handleFinalOrderSubmit = async () => {
    setIsProcessing(true);
    // Simulate API authorization calls
    setTimeout(() => {
      setIsProcessing(false);
      showSuccess('Order processed successfully!');
      clearCart();
      navigate('/checkout/success');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans">
      
      {/* Step Progress Line */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                idx <= activeStep ? 'bg-primary-glow text-white' : 'bg-surface-container text-secondary'
              }`}>
                {idx < activeStep ? <Check className="w-3 h-3" /> : idx + 1}
              </span>
              <span className={`text-xs font-semibold ${
                idx === activeStep ? 'text-luxuryBlack' : 'text-secondary'
              }`}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-secondary/40" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Step Forms (Left side) */}
        <div className="lg:col-span-2 space-y-8 bg-white border border-surface-container/60 p-6 md:p-8 rounded-2xl">
          
          {activeStep === 0 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-luxuryBlack flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-glow" /> Shipping Destination Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={shippingForm.fullName} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Phone Number *</label>
                  <input type="text" name="phone" value={shippingForm.phone} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Address Line 1 *</label>
                  <input type="text" name="addressLine1" value={shippingForm.addressLine1} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Address Line 2</label>
                  <input type="text" name="addressLine2" value={shippingForm.addressLine2} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">City *</label>
                  <input type="text" name="city" value={shippingForm.city} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">State / Region *</label>
                  <input type="text" name="state" value={shippingForm.state} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Postal Code *</label>
                  <input type="text" name="postalCode" value={shippingForm.postalCode} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Country</label>
                  <select name="country" value={shippingForm.country} onChange={handleShippingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow">
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-luxuryBlack flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-glow" /> Billing Details Address
              </h3>
              
              <label className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-surface-container cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => {
                    setSameAsShipping(e.target.checked);
                    if (e.target.checked) setBillingForm({ ...shippingForm });
                  }}
                  className="rounded border-gray-300 text-primary-glow focus:ring-primary-glow"
                />
                <span className="text-xs font-medium text-luxuryBlack">Same as shipping address</span>
              </label>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Full Name *</label>
                    <input type="text" name="fullName" value={billingForm.fullName} onChange={handleBillingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Phone Number *</label>
                    <input type="text" name="phone" value={billingForm.phone} onChange={handleBillingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Address Line 1 *</label>
                    <input type="text" name="addressLine1" value={billingForm.addressLine1} onChange={handleBillingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">City *</label>
                    <input type="text" name="city" value={billingForm.city} onChange={handleBillingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Postal Code *</label>
                    <input type="text" name="postalCode" value={billingForm.postalCode} onChange={handleBillingChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-luxuryBlack flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-glow" /> Pay Securely via Stripe
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Cardholder Name *</label>
                  <input type="text" name="name" value={cardForm.name} onChange={handleCardChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Card Number *</label>
                  <input type="text" name="number" placeholder="4242 4242 4242 4242" value={cardForm.number} onChange={handleCardChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Expiration Date *</label>
                    <input type="text" name="expiry" placeholder="MM/YY" value={cardForm.expiry} onChange={handleCardChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">CVC Security Code *</label>
                    <input type="text" name="cvc" placeholder="123" value={cardForm.cvc} onChange={handleCardChange} className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow" required />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center text-secondary opacity-60 text-[10px] border-t border-surface-container pt-4">
                <Lock className="w-4 h-4 text-primary-glow" /> Your connection is encrypted. Financial actions processed by Stripe.
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-luxuryBlack flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-primary-glow" /> Review Your Selection
              </h3>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-center text-xs py-2 border-b border-surface-container/40">
                    <div>
                      <span className="font-semibold text-luxuryBlack">{item.product.title}</span>
                      <span className="text-secondary ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold text-primary font-sans">
                      ${(item.product.price * (1 - (item.product.discount || 0) / 100) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="bg-surface p-4 rounded-xl space-y-2 border border-surface-container/60">
                  <p className="text-xs font-semibold text-luxuryBlack">Shipping Address</p>
                  <p className="text-xs text-secondary">{shippingForm.fullName}</p>
                  <p className="text-xs text-secondary">{shippingForm.addressLine1}, {shippingForm.city}, {shippingForm.state} {shippingForm.postalCode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-surface-container">
            <button
              onClick={prevStep}
              disabled={activeStep === 0 || isProcessing}
              className="border border-surface-container py-3 px-6 text-xs uppercase tracking-wider font-semibold font-sans hover:bg-surface disabled:opacity-40 rounded"
            >
              Back
            </button>

            {activeStep === steps.length - 1 ? (
              <button
                onClick={handleFinalOrderSubmit}
                disabled={isProcessing}
                className="bg-primary-glow hover:bg-primary text-luxuryBlack hover:text-white py-3 px-8 text-xs uppercase tracking-[0.15em] font-semibold font-sans rounded shadow-luxury flex items-center gap-2"
              >
                {isProcessing ? 'CONFIRMING ORDER...' : 'PLACE ORDER'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="bg-luxuryBlack hover:bg-primary-glow text-white py-3 px-8 text-xs uppercase tracking-[0.15em] font-semibold font-sans rounded shadow-luxury"
              >
                Next Step
              </button>
            )}
          </div>

        </div>

        {/* Order Totals Summary (Right side) */}
        <div className="h-fit bg-surface border border-surface-container/60 p-6 rounded-2xl space-y-6">
          <h3 className="font-serif text-md font-bold border-b border-surface-container/60 pb-3">Order Summary</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-secondary">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary-glow font-semibold">
                <span>Discount Applied</span>
                <span>-${discount.toLocaleString()}</span>
              </div>
            )}
            {giftWrap && (
              <div className="flex justify-between text-secondary">
                <span>Gift Wrap Wrapping</span>
                <span>$15.00</span>
              </div>
            )}
            <div className="flex justify-between text-secondary">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Estimated Taxes (8%)</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-surface-container/60 pt-3 text-luxuryBlack">
              <span>Total Bill</span>
              <span className="text-primary font-sans">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-secondary opacity-60 text-[10px] pt-4 border-t border-surface-container/40 justify-center">
            <ShieldCheck className="w-4 h-4 text-primary-glow" /> SECURE SSL ENCRYPTED TRANSACTION
          </div>
        </div>

      </div>

    </div>
  );
};

export default CheckoutFlow;
