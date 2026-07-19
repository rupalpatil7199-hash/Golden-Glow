import React, { useState, useEffect } from 'react';
import { useAuthBridge } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { useNotification } from '../../context/NotificationContext';
import { ShieldAlert, Plus, Trash2, PackageCheck, ToggleLeft, ToggleRight, DollarSign, Users, Award, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuthBridge();
  const { products, categories } = useShop();
  const { showSuccess, showError } = useNotification();

  const [activeTab, setActiveTab] = useState('products');
  const [adminProducts, setAdminProducts] = useState(products);

  // Stats Metrics
  const totalRevenue = 284500;
  const totalOrders = 142;
  const totalUsers = 89;
  const lowStockCount = products.filter(p => p.stock <= 3).length;

  // Mock Orders State
  const [orders, setOrders] = useState([
    { id: 'GG-892415', customer: 'Eleanor Vance', date: '2026-07-10', total: 1250, status: 'Shipped' },
    { id: 'GG-901458', customer: 'Diana Prince', date: '2026-07-15', total: 890, status: 'Pending' }
  ]);

  // Mock Coupons State
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'GLOW10', discount: 10, active: true },
    { id: '2', code: 'ETERNAL20', discount: 20, active: true }
  ]);

  // Product Creator Form State
  const [newProd, setNewProd] = useState({
    title: '',
    category: 'Rings',
    price: '',
    material: '18K Yellow Gold',
    weight: '5.0 grams',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
    sku: 'GG-RG-999'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync initial product states
  useEffect(() => {
    setAdminProducts(products);
  }, [products]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-center">
        <h3 className="font-serif text-lg font-bold text-red-600">Access Denied</h3>
        <p className="text-xs text-secondary mt-2">Administrator privileges are required.</p>
      </div>
    );
  }

  // Create coupon logic
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDisc, setNewCouponDisc] = useState(15);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const code = newCouponCode.toUpperCase().trim();
    if (coupons.find(c => c.code === code)) {
      showError('Coupon code already exists.');
      return;
    }
    const added = { id: Date.now().toString(), code, discount: newCouponDisc, active: true };
    setCoupons(prev => [added, ...prev]);
    setNewCouponCode('');
    showSuccess('Coupon generated.');
  };

  const toggleCoupon = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    showSuccess('Coupon status updated.');
  };

  // Create product logic
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.title || !newProd.price || !newProd.sku) {
      showError('Please complete required fields.');
      return;
    }
    const added = {
      _id: 'prod_' + Date.now(),
      title: newProd.title,
      category: newProd.category,
      price: Number(newProd.price),
      material: newProd.material,
      weight: newProd.weight,
      stock: Number(newProd.stock),
      images: [newProd.image],
      sku: newProd.sku,
      rating: 5,
      reviewsCount: 0,
      isNewArrival: true,
      occasion: ['Daily Wear']
    };
    setAdminProducts(prev => [added, ...prev]);
    setShowAddForm(false);
    showSuccess('Product added to catalog.');
    // Reset form
    setNewProd({ title: '', category: 'Rings', price: '', material: '18K Yellow Gold', weight: '5.0 grams', stock: 10, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80', sku: 'GG-RG-999' });
  };

  const handleDeleteProduct = (id) => {
    setAdminProducts(prev => prev.filter(p => p._id !== id));
    showSuccess('Product removed from catalog.');
  };

  const handleUpdateOrderStatus = (id, nextStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    showSuccess(`Order status updated to ${nextStatus}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans space-y-12">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-luxuryBlack">Analytics Atelier Dashboard</h1>
        <p className="text-xs text-secondary mt-1 font-medium tracking-wider uppercase font-sans">Fine jewelry control center</p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-surface-container rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-xl font-bold text-primary font-sans mt-2">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-surface-container rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Total Sales</p>
            <h3 className="text-xl font-bold text-luxuryBlack font-sans mt-2">{totalOrders} Orders</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-surface-container rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Active Customers</p>
            <h3 className="text-xl font-bold text-luxuryBlack font-sans mt-2">{totalUsers} Users</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-surface-container rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Inventory Alerts</p>
            <h3 className={`text-xl font-bold font-sans mt-2 ${lowStockCount > 0 ? 'text-amber-600' : 'text-luxuryBlack'}`}>
              {lowStockCount} Low Stock
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex gap-4 border-b border-surface-container pb-4">
        <button onClick={() => setActiveTab('products')} className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-secondary'}`}>Manage Products</button>
        <button onClick={() => setActiveTab('orders')} className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-secondary'}`}>Manage Orders</button>
        <button onClick={() => setActiveTab('coupons')} className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${activeTab === 'coupons' ? 'border-primary text-primary' : 'border-transparent text-secondary'}`}>Coupons Editor</button>
      </div>

      {/* Main Tab Panel Grid */}
      <div className="bg-white border border-surface-container/60 rounded-2xl p-6 shadow-sm">
        
        {/* Tab 1: Product Manager */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-luxuryBlack">Product Catalog List ({adminProducts.length})</h3>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-luxuryBlack hover:bg-primary-glow text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1 font-sans uppercase tracking-wider shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            {/* Product form creator */}
            {showAddForm && (
              <form onSubmit={handleAddProductSubmit} className="bg-surface border border-surface-container p-6 rounded-xl space-y-4 animate-scale-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" placeholder="PRODUCT NAME" value={newProd.title} onChange={(e) => setNewProd({ ...newProd, title: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="number" placeholder="PRICE ($)" value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  <input type="text" placeholder="SKU CODE" value={newProd.sku} onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" required />
                  
                  <select value={newProd.category} onChange={(e) => setNewProd({ ...newProd, category: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded">
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Bangles">Bangles</option>
                  </select>

                  <input type="text" placeholder="METAL SPEC" value={newProd.material} onChange={(e) => setNewProd({ ...newProd, material: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" />
                  <input type="text" placeholder="WEIGHT SPEC" value={newProd.weight} onChange={(e) => setNewProd({ ...newProd, weight: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" />
                  <input type="number" placeholder="INITIAL STOCK" value={newProd.stock} onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded" />
                  
                  <input type="text" placeholder="IMAGE WEB URL" value={newProd.image} onChange={(e) => setNewProd({ ...newProd, image: e.target.value })} className="bg-white border border-surface-container text-xs p-3 rounded md:col-span-2" />
                </div>

                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowAddForm(false)} className="border border-surface-container hover:bg-surface text-xs uppercase px-4 py-2 font-semibold font-sans rounded">Cancel</button>
                  <button type="submit" className="bg-luxuryBlack text-white hover:bg-primary-glow text-xs uppercase px-4 py-2 font-semibold font-sans rounded">Create Piece</button>
                </div>
              </form>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-surface-container/60 bg-surface">
                    <th className="py-3 px-4 text-secondary">Piece</th>
                    <th className="py-3 px-4 text-secondary">SKU</th>
                    <th className="py-3 px-4 text-secondary">Category</th>
                    <th className="py-3 px-4 text-secondary">Price</th>
                    <th className="py-3 px-4 text-secondary">Stock</th>
                    <th className="py-3 px-4 text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminProducts.map((p) => (
                    <tr key={p._id} className="border-b border-surface-container/40 hover:bg-surface-low transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-8 h-10 object-cover bg-surface-container rounded" />
                        <span className="font-semibold text-luxuryBlack truncate max-w-[150px]">{p.title}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-secondary">{p.sku}</td>
                      <td className="py-3 px-4 text-secondary">{p.category}</td>
                      <td className="py-3 px-4 font-semibold text-primary font-sans">${p.price.toLocaleString()}</td>
                      <td className={`py-3 px-4 font-semibold ${p.stock <= 3 ? 'text-red-600' : 'text-secondary'}`}>{p.stock}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteProduct(p._id)}
                          className="text-secondary hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Order Manager */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-luxuryBlack">Client Sales History Logs</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-surface-container/60 bg-surface">
                    <th className="py-3 px-4 text-secondary">Order ID</th>
                    <th className="py-3 px-4 text-secondary">Customer</th>
                    <th className="py-3 px-4 text-secondary">Date</th>
                    <th className="py-3 px-4 text-secondary">Total</th>
                    <th className="py-3 px-4 text-secondary">Status</th>
                    <th className="py-3 px-4 text-secondary">Action Update</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} className="border-b border-surface-container/40 hover:bg-surface-low transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-luxuryBlack">{ord.id}</td>
                      <td className="py-3 px-4 text-secondary font-medium">{ord.customer}</td>
                      <td className="py-3 px-4 text-secondary">{ord.date}</td>
                      <td className="py-3 px-4 font-semibold text-primary font-sans">${ord.total.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          ord.status === 'Shipped' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-white border border-surface-container rounded p-1 text-[11px] focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Coupon Editor */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-luxuryBlack">Active Promo Coupons</h3>
            
            <form onSubmit={handleCreateCoupon} className="flex gap-4 max-w-md items-end">
              <div className="flex-grow">
                <label className="block text-[10px] text-secondary font-semibold uppercase mb-1">Coupon Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. GLOW15" 
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="border border-surface-container text-xs p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-secondary font-semibold uppercase mb-1">Discount %</label>
                <input 
                  type="number" 
                  value={newCouponDisc}
                  onChange={(e) => setNewCouponDisc(Number(e.target.value))}
                  className="border border-surface-container text-xs p-2 rounded w-20 focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-luxuryBlack text-white hover:bg-primary-glow text-xs uppercase px-4 py-3 font-semibold rounded font-sans transition-colors"
              >
                Create
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-surface-container/60 bg-surface">
                    <th className="py-3 px-4 text-secondary">Coupon Code</th>
                    <th className="py-3 px-4 text-secondary">Discount</th>
                    <th className="py-3 px-4 text-secondary">Status</th>
                    <th className="py-3 px-4 text-secondary">Action Toggle</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id} className="border-b border-surface-container/40 hover:bg-surface-low transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-luxuryBlack">{c.code}</td>
                      <td className="py-3 px-4 text-secondary font-semibold">{c.discount}% OFF</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          c.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {c.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => toggleCoupon(c.id)}
                          className="text-secondary hover:text-primary-glow transition-colors"
                        >
                          {c.active ? <ToggleRight className="w-6 h-6 text-primary-glow" /> : <ToggleLeft className="w-6 h-6" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;
