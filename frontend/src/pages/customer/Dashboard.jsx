import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthBridge } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { User, MapPin, Heart, ListOrdered, Download, Plus, Trash2, Calendar, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthBridge();
  const { products, wishlist, toggleWishlist } = useShop();
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();

  const [activeTab, setActiveTab] = useState('orders');

  // Sync tab state from URL params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.fullName || '');
  
  // Address Book Form State
  const [addresses, setAddresses] = useState([
    { id: '1', fullName: user?.fullName || 'Eleanor Vance', phone: '+1 555-019-2834', addressLine1: '458 Park Avenue', city: 'New York', state: 'NY', postalCode: '10022', country: 'US', isDefault: true }
  ]);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    isDefault: false
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock Orders History
  const [orders, setOrders] = useState([
    { id: 'GG-892415', date: '2026-07-10', total: 1250, status: 'Shipped', tracking: 'UPS-982401258', items: [{ title: 'Geometric Signet Ring', qty: 1, price: 1250, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig' }] }
  ]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-center">
        <h3 className="font-serif text-lg font-bold">Access Denied</h3>
        <p className="text-xs text-secondary mt-2">Please sign in to access your customer dashboard.</p>
      </div>
    );
  }

  // Address logic
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine1 || !newAddr.city) {
      showError('Please complete required fields.');
      return;
    }
    const added = { ...newAddr, id: Date.now().toString() };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }
    setAddresses(prev => [...prev, added]);
    setShowAddForm(false);
    showSuccess('Address saved successfully.');
    setNewAddr({ fullName: '', phone: '', addressLine1: '', city: '', state: '', postalCode: '', country: 'US', isDefault: false });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showSuccess('Address deleted.');
  };

  // Get wishlist items
  const wishlistItems = products.filter(p => wishlist.includes(p._id));

  // Download Invoice Mock
  const triggerInvoiceDownload = (id) => {
    showSuccess(`Invoice Golden-Glow-${id}.pdf download initiated!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans flex flex-col md:flex-row gap-12">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4">
          <img src={user.avatar} alt={user.fullName} className="w-20 h-20 rounded-full border border-primary-glow object-cover mx-auto" />
          <div>
            <h3 className="font-serif text-md font-bold text-luxuryBlack">{user.fullName}</h3>
            <p className="text-[10px] text-secondary uppercase tracking-widest font-semibold">{user.role} profile</p>
          </div>

          <div className="border-t border-surface-container/60 pt-4 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors text-left ${
                activeTab === 'orders' ? 'bg-primary-glow/10 text-primary' : 'hover:bg-surface text-secondary'
              }`}
            >
              <ListOrdered className="w-4 h-4" /> My Orders
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors text-left ${
                activeTab === 'wishlist' ? 'bg-primary-glow/10 text-primary' : 'hover:bg-surface text-secondary'
              }`}
            >
              <Heart className="w-4 h-4" /> Wishlist
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors text-left ${
                activeTab === 'addresses' ? 'bg-primary-glow/10 text-primary' : 'hover:bg-surface text-secondary'
              }`}
            >
              <MapPin className="w-4 h-4" /> Address Book
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors text-left ${
                activeTab === 'profile' ? 'bg-primary-glow/10 text-primary' : 'hover:bg-surface text-secondary'
              }`}
            >
              <User className="w-4 h-4" /> Account details
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Content (Right side) */}
      <main className="flex-grow bg-white border border-surface-container/60 p-6 md:p-8 rounded-2xl">
        
        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold border-b border-surface-container/60 pb-3 text-luxuryBlack">Purchase Log History</h2>
            
            {orders.length === 0 ? (
              <p className="text-xs text-secondary py-12 text-center">You have not placed any orders yet.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-surface-container/60 rounded-xl p-4 md:p-6 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-surface-container/40 pb-4 gap-2">
                      <div>
                        <p className="text-xs font-bold text-luxuryBlack">{ord.id}</p>
                        <p className="text-[10px] text-secondary flex items-center gap-1 mt-1">
                          <Calendar className="w-3.5 h-3.5" /> Order placed: {ord.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className={`px-3 py-1 rounded-full text-[10px] tracking-wider font-semibold uppercase ${
                          ord.status === 'Shipped' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {ord.status}
                        </span>
                        <span className="text-sm font-semibold text-primary font-sans">${ord.total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Order items lists */}
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img src={item.img} alt={item.title} className="w-12 h-16 object-cover bg-surface-container rounded" />
                        <div>
                          <p className="text-xs font-bold text-luxuryBlack">{item.title}</p>
                          <p className="text-[10px] text-secondary mt-1">Quantity: {item.qty} | Price: ${item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-surface-container/40 justify-between items-start sm:items-center">
                      <p className="text-xs text-secondary font-medium">Tracking Code: <span className="font-semibold text-luxuryBlack font-sans">{ord.tracking}</span></p>
                      <button 
                        onClick={() => triggerInvoiceDownload(ord.id)}
                        className="text-xs font-semibold text-primary hover:text-luxuryBlack flex items-center gap-2 font-sans hover:underline"
                      >
                        <Download className="w-4 h-4" /> Download PDF Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold border-b border-surface-container/60 pb-3 text-luxuryBlack">Your Wishlist Selection</h2>
            
            {wishlistItems.length === 0 ? (
              <p className="text-xs text-secondary py-12 text-center">Your wishlist is currently empty.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlistItems.map((product) => (
                  <div key={product._id} className="flex gap-4 border border-surface-container/60 p-4 rounded-xl relative shadow-sm">
                    <img src={product.images[0]} alt={product.title} className="w-20 h-24 object-cover bg-surface-container rounded-lg" />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-luxuryBlack line-clamp-1">{product.title}</h4>
                        <p className="text-[10px] text-secondary mt-1">{product.material}</p>
                        <p className="text-xs font-semibold text-primary mt-2 font-sans">${product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => addToCart(product, 1)}
                          className="bg-luxuryBlack hover:bg-primary-glow text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded transition-colors flex-grow"
                        >
                          Add to Bag
                        </button>
                        <button 
                          onClick={() => toggleWishlist(product._id)}
                          className="text-secondary hover:text-red-600 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Address Book */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-surface-container/60 pb-3">
              <h2 className="font-serif text-xl font-bold text-luxuryBlack">Your Address Book</h2>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs text-primary hover:text-luxuryBlack flex items-center gap-1 font-semibold font-sans uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" /> Add Address
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddAddress} className="bg-surface p-4 rounded-xl border border-surface-container space-y-4 animate-scale-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="FULL NAME" value={newAddr.fullName} onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="text" placeholder="PHONE" value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="text" placeholder="ADDRESS LINE 1" value={newAddr.addressLine1} onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded md:col-span-2" required />
                  <input type="text" placeholder="CITY" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="text" placeholder="STATE" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="text" placeholder="POSTAL CODE" value={newAddr.postalCode} onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={newAddr.isDefault} onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })} />
                  <span>Set as default address</span>
                </label>
                <button type="submit" className="bg-luxuryBlack text-white hover:bg-primary-glow px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded">Save Address</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-surface-container/60 rounded-xl p-4 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-surface-container/40 pb-2">
                    <span className="text-xs font-bold text-luxuryBlack">{addr.fullName}</span>
                    {addr.isDefault && (
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-primary bg-primary-glow/10 px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="text-xs text-secondary space-y-1">
                    <p>{addr.addressLine1}</p>
                    <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                    <p>Phone: {addr.phone}</p>
                  </div>
                  <div className="flex justify-end pt-2 border-t border-surface-container/40">
                    <button 
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-secondary hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold border-b border-surface-container/60 pb-3 text-luxuryBlack">Account Information</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); showSuccess('Profile details saved!'); }} className="space-y-6 max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)}
                    className="border border-surface-container text-xs p-3 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase font-semibold mb-2">Email Address (Managed via Clerk)</label>
                  <input 
                    type="text" 
                    value={user.email} 
                    className="bg-surface border border-surface-container text-xs p-3 rounded w-full text-secondary cursor-not-allowed font-sans" 
                    disabled 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="bg-luxuryBlack hover:bg-primary-glow text-white py-3 px-8 text-xs uppercase tracking-wider font-semibold font-sans transition-colors rounded shadow-luxury"
              >
                Save Details
              </button>
            </form>
          </div>
        )}

      </main>

    </div>
  );
};

export default Dashboard;
