import mongoose from 'mongoose';

const categoriesData = [
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80', description: 'Graceful statements for your fingers' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', description: 'Frame your face with delicate shimmer' },
  { name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80', description: 'Sculptured details to grace the collar' },
  { name: 'Bracelets', slug: 'bracelets', image: 'https://images.unsplash.com/photo-1667013829921-b1c1719a0cfa?auto=format&fit=crop&w=800&q=80', description: 'Elegance that flows with every movement' },
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80', description: 'Timeless circular gold cuffs' }
];

const productsData = [
  {
    title: 'Geometric Signet Ring',
    description: 'A stunning gold signet ring with a minimalist geometric design, crafted in solid 18K Yellow Gold. Features clean architecture and micro-polished lines reflecting a warm, golden glow. Perfect for standard styling or stack sets.',
    price: 1250,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Rings',
    material: '18K Yellow Gold',
    weight: '5.2 grams',
    stoneInfo: 'None',
    sku: 'GG-RG-001',
    stock: 12,
    rating: 4.8,
    reviewsCount: 16,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    occasion: ['Daily Wear', 'Anniversary']
  },
  {
    title: 'Floating Pearl Choker',
    description: 'A delicate gold chain necklace holding a single, premium saltwater Akoya pearl. The pearls luster matches perfectly with the hand-drawn gold chain. A romantic tribute to ocean treasures.',
    price: 890,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Necklaces',
    material: '14K Rose Gold',
    weight: '3.8 grams',
    stoneInfo: '8.5mm Akoya Saltwater Pearl',
    sku: 'GG-NK-002',
    stock: 8,
    rating: 4.9,
    reviewsCount: 22,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: true,
    occasion: ['Wedding', 'Bridal']
  },
  {
    title: 'Filigree Gold Hoops',
    description: 'Artisanal hand-crafted hoop earrings displaying intricate gold filigree pattern lines. Delicate circular curves that highlight gold craftsmanship. A classic piece representing heritage styling.',
    price: 1400,
    discount: 15,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Earrings',
    material: '18K Yellow Gold',
    weight: '6.5 grams',
    stoneInfo: 'None',
    sku: 'GG-ER-003',
    stock: 5,
    rating: 4.7,
    reviewsCount: 14,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Anniversary', 'Daily Wear']
  },
  {
    title: 'Architectural Gold Bangle',
    description: 'Sleek, heavy, modern gold bangle featuring a hidden mechanical clasp lock. Structured with a flat mirror finish that captures reflections beautifully.',
    price: 2100,
    discount: 5,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Bangles',
    material: '18K Yellow Gold',
    weight: '12.4 grams',
    stoneInfo: 'None',
    sku: 'GG-BR-004',
    stock: 2,
    rating: 5.0,
    reviewsCount: 8,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Wedding', 'Anniversary']
  },
  {
    title: 'Diamond Starlight Studs',
    description: 'Breathtaking 1 carat round-cut laboratory diamonds mounted in platinum prongs. Designed to reflect light with spectacular fire and scintillation.',
    price: 3500,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Earrings',
    material: 'Platinum 950',
    weight: '3.1 grams',
    stoneInfo: '1.0 ct VVS1 Ideal Cut Round Diamond',
    sku: 'GG-ER-005',
    stock: 4,
    rating: 4.9,
    reviewsCount: 31,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    occasion: ['Anniversary', 'Wedding']
  },
  {
    title: 'Solitaire Diamond Promise Ring',
    description: 'An iconic symbol of devotion. High-set 0.75 ct cushion cut diamond nestled on a thin band of polished 18K Yellow Gold. An elegant luxury masterpiece.',
    price: 2800,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
    category: 'Rings',
    material: '18K Yellow Gold',
    weight: '4.2 grams',
    stoneInfo: '0.75 ct Cushion Cut Diamond VVS2',
    sku: 'GG-RG-006',
    stock: 6,
    rating: 4.8,
    reviewsCount: 19,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Anniversary', 'Wedding']
  },
  {
    title: 'Minimalist Chain Bracelet',
    description: 'A classic chain bracelet featuring delicate interlocking links in solid 18K Yellow Gold. Designed for simple elegance.',
    price: 950,
    discount: 0,
    images: ['https://images.unsplash.com/photo-1667013829921-b1c1719a0cfa?auto=format&fit=crop&w=800&q=80'],
    category: 'Bracelets',
    material: '18K Yellow Gold',
    weight: '4.8 grams',
    stoneInfo: 'None',
    sku: 'GG-BR-007',
    stock: 15,
    rating: 4.8,
    reviewsCount: 10,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    occasion: ['Daily Wear']
  }
];

const couponsData = [
  { code: 'GLOW10', discountType: 'percentage', discountAmount: 10, minPurchaseAmount: 100, expiryDate: '2028-12-31' },
  { code: 'ETERNAL20', discountType: 'percentage', discountAmount: 20, minPurchaseAmount: 500, expiryDate: '2028-12-31' },
  { code: 'WELCOME250', discountType: 'fixed', discountAmount: 250, minPurchaseAmount: 2000, expiryDate: '2028-12-31' }
];

// In-memory collections state
const store = {
  Product: productsData.map((p, i) => ({
    _id: `mock_prod_${i + 1}`,
    id: `mock_prod_${i + 1}`,
    ...p,
    createdAt: new Date()
  })),
  Category: categoriesData.map((c, i) => ({
    _id: `mock_cat_${i + 1}`,
    id: `mock_cat_${i + 1}`,
    ...c
  })),
  Coupon: couponsData.map((cp, i) => ({
    _id: `mock_coup_${i + 1}`,
    id: `mock_coup_${i + 1}`,
    ...cp
  })),
  Order: [],
  Cart: [],
  User: [
    {
      _id: 'user_customer_67890',
      id: 'user_customer_67890',
      clerkId: 'user_customer_67890',
      fullName: 'Eleanor Vance',
      email: 'buyer@goldenglow.com',
      password: '$2a$10$/vuuyD3s.rMmD4wwQV8e/OGWJevUdwRM0IOP9XaLLHkvs4pOQlfOS',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      _id: 'user_admin_12345',
      id: 'user_admin_12345',
      clerkId: 'user_admin_12345',
      fullName: 'Alexander Thorne',
      email: 'admin@goldenglow.com',
      password: '$2a$10$/vuuyD3s.rMmD4wwQV8e/OGWJevUdwRM0IOP9XaLLHkvs4pOQlfOS',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    }
  ],
  Review: []
};

// Helper to wrap raw objects with save / custom methods
function makeDoc(modelName, data) {
  if (!data) return null;
  const doc = { ...data };
  doc.save = async function() {
    const list = store[modelName];
    const idx = list.findIndex(x => x._id === doc._id);
    if (idx >= 0) {
      list[idx] = doc;
    } else {
      list.push(doc);
    }
    return doc;
  };
  doc.toObject = function() { return { ...this }; };
  doc.toJSON = function() { return { ...this }; };
  return doc;
}

class MockQuery {
  constructor(modelName, executor) {
    this.modelName = modelName;
    this.executor = executor;
    this._sort = null;
    this._skip = 0;
    this._limit = null;
  }
  sort(s) { this._sort = s; return this; }
  skip(n) { this._skip = n; return this; }
  limit(n) { this._limit = n; return this; }
  select() { return this; }
  populate() { return this; }
  
  async exec() {
    let result = await this.executor();
    if (Array.isArray(result)) {
      if (this._sort) {
        const key = Object.keys(this._sort)[0];
        const dir = this._sort[key];
        result.sort((a, b) => {
          if (a[key] < b[key]) return dir === 1 ? -1 : 1;
          if (a[key] > b[key]) return dir === 1 ? 1 : -1;
          return 0;
        });
      }
      if (this._skip) {
        result = result.slice(this._skip);
      }
      if (this._limit) {
        result = result.slice(0, this._limit);
      }
      return result.map(x => makeDoc(this.modelName, x));
    }
    return makeDoc(this.modelName, result);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }
}

export const setupMockDB = () => {
  console.log('===================================================');
  console.log('   Mongoose Mock DB Engine Hook Active');
  console.log('===================================================');

  // Override Model constructor save method
  mongoose.Model.prototype.save = async function() {
    const modelName = this.constructor.modelName;
    const docData = this.toObject();
    if (!docData._id) {
      docData._id = `mock_${modelName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    const doc = makeDoc(modelName, docData);
    if (!store[modelName]) store[modelName] = [];
    store[modelName].push(doc);
    return doc;
  };

  // Override static find
  mongoose.Model.find = function(query = {}) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      return list.filter(item => {
        for (const key of Object.keys(query)) {
          if (key.startsWith('$')) continue; 
          if (query[key] !== undefined && item[key] !== query[key]) {
            if (typeof query[key] === 'object' && query[key].$regex) {
              const regex = new RegExp(query[key].$regex, query[key].$options || '');
              if (!regex.test(item[key])) return false;
            } else {
              return false;
            }
          }
        }
        return true;
      });
    });
  };

  // Override static findOne
  mongoose.Model.findOne = function(query = {}) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const item = list.find(x => {
        for (const key of Object.keys(query)) {
          if (query[key] !== undefined && x[key] !== query[key]) return false;
        }
        return true;
      });
      return item || null;
    });
  };

  // Override static findById
  mongoose.Model.findById = function(id) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const item = list.find(x => x._id === id || x.id === id);
      return item || null;
    });
  };

  // Override static findByIdAndUpdate
  mongoose.Model.findByIdAndUpdate = function(id, update, options = {}) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const idx = list.findIndex(x => x._id === id || x.id === id);
      if (idx === -1) return null;
      let doc = { ...list[idx] };
      if (update.$inc) {
        for (const k of Object.keys(update.$inc)) {
          doc[k] = (doc[k] || 0) + update.$inc[k];
        }
      }
      if (update.$set) {
        doc = { ...doc, ...update.$set };
      } else {
        doc = { ...doc, ...update };
      }
      list[idx] = doc;
      return makeDoc(modelName, doc);
    });
  };

  // Override static findByIdAndDelete
  mongoose.Model.findByIdAndDelete = function(id) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const idx = list.findIndex(x => x._id === id || x.id === id);
      if (idx === -1) return null;
      const item = list.splice(idx, 1)[0];
      return makeDoc(modelName, item);
    });
  };

  // Override static countDocuments
  mongoose.Model.countDocuments = function(query = {}) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const filtered = list.filter(item => {
        for (const key of Object.keys(query)) {
          if (key.startsWith('$')) continue;
          if (query[key] !== undefined && item[key] !== query[key]) return false;
        }
        return true;
      });
      return filtered.length;
    });
  };

  // Override static findOneAndUpdate
  mongoose.Model.findOneAndUpdate = function(query, update, options = {}) {
    const modelName = this.modelName;
    return new MockQuery(modelName, async () => {
      const list = store[modelName] || [];
      const idx = list.findIndex(x => {
        for (const key of Object.keys(query)) {
          if (x[key] !== query[key]) return false;
        }
        return true;
      });
      if (idx === -1) {
        if (options.upsert) {
          const newDoc = {
            _id: `mock_${modelName.toLowerCase()}_${Date.now()}`,
            ...query,
            ...(update.$set || update)
          };
          list.push(newDoc);
          return makeDoc(modelName, newDoc);
        }
        return null;
      }
      let doc = { ...list[idx] };
      if (update.$set) {
        doc = { ...doc, ...update.$set };
      } else {
        doc = { ...doc, ...update };
      }
      list[idx] = doc;
      return makeDoc(modelName, doc);
    });
  };
  
  // Override insertMany
  mongoose.Model.insertMany = async function(docs) {
    const modelName = this.modelName;
    const results = [];
    for (const d of docs) {
      const docData = { ...d };
      if (!docData._id) {
        docData._id = `mock_${modelName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      const doc = makeDoc(modelName, docData);
      if (!store[modelName]) store[modelName] = [];
      store[modelName].push(doc);
      results.push(doc);
    }
    return results;
  };

  // Override static create
  mongoose.Model.create = async function(doc) {
    const modelName = this.modelName;
    const docs = Array.isArray(doc) ? doc : [doc];
    const results = [];
    for (const d of docs) {
      const docData = { ...d };
      if (!docData._id) {
        docData._id = `mock_${modelName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      const instance = makeDoc(modelName, docData);
      if (!store[modelName]) store[modelName] = [];
      store[modelName].push(instance);
      results.push(instance);
    }
    return Array.isArray(doc) ? results : results[0];
  };
};
