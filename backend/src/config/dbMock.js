import mongoose from 'mongoose';

const categoriesData = [
  { name: 'Rings', slug: 'rings', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig', description: 'Graceful statements for your fingers' },
  { name: 'Earrings', slug: 'earrings', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-j05MfHAu32diN6AF776Wd6WWOiB0XnFY4XrUaeXxvDTHTE2q2dp5WIPuvMODDCYzzuIwn3ZSk84KnDDjy0w3o7lV8wXwhM463wPoD1QMABoRO-rhYT0d6NdRgb-RXqfshE8Xdu6-Yw_HLoxu_8KDMFZvY_MmRtu1adRl7RkT1Mip88rgAIhlKQeIonYhxbjtTTZVYhfDzOZbkSd2cc1XnqoPTsMwdxyuKULrgrPZHUwEJ2bJRi9Twa6NtEK7YUNr25gZWQJxhcU', description: 'Frame your face with delicate shimmer' },
  { name: 'Necklaces', slug: 'necklaces', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBl2l6Tz-HYvqOA_Bo3lYks5rPPUfQOEinnEj9cQDrGDhCUJKGzGnowSImR1R7E7V1o4BcODUqSGo6oR5gqQLnUB-SBtpNvnZsDGlbIoFxfq6YIMPgyGkcRV-ZxWj4T0NDmIa8fo0BVcs8u8AcbKPYfeI-Hrc01vPBaJnVFNQcZSod6TPi-5PviNZOlcXXrhq-U3ShyXkcDVqSECsaDe4pgPy58fufjZlhRpB40V1a3JF3bu00CuGrEnt1zaMpPdUKDFyRK6llY', description: 'Sculptured details to grace the collar' },
  { name: 'Bracelets', slug: 'bracelets', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb5TFOhzutiWC1yEPv7IwIgA8Mrfr5MQqk59Oh26IMFn3n4_jgn5YNwgmEeoBfuR35HrQvzLnaSfRHFqua1wao5SlovzK771t6mDgzDtvucAU78WHLqXA3RTpVqqAe0O-NNsxVjix5oDdOujccTWW_Da-Mk5jw_noUjB6fPpULUPa7BIKYYNQgwdv5RvJ4vRDrPTgncm728IkxM_x6FUZrg5qRGrnnouuvc7pLJaS3ZAvC7iB-59zXEIhHoC4_tMP_kFyhSxXMp7U', description: 'Elegance that flows with every movement' },
  { name: 'Bangles', slug: 'bangles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVEnwYcLsPZ2260kfauZHwykNM4NBuZPkWiQdagtIyx9SWgfDX9fSY3ckB2sVVlHXpYA5joX1kjqrTFU1yPpAt2PgBop84isV6ZpOfy9M0gy1ZZtlPQ_LEDbTm_7aw7s-PKnYeETKI0fFIYxRzE_TiRZH_9T_UrobFJ6zQHqxzygjXpc0J4eWXngu0yUPQgvyWQNMLSYKQm579tNcM4j-6ampqhDmNQXsVmMd64hrP-gwmhdgbGmsNfrQcyiUWLNbfRogIH_QOzQs', description: 'Timeless circular gold cuffs' }
];

const productsData = [
  {
    title: 'Geometric Signet Ring',
    description: 'A stunning gold signet ring with a minimalist geometric design, crafted in solid 18K Yellow Gold. Features clean architecture and micro-polished lines reflecting a warm, golden glow. Perfect for standard styling or stack sets.',
    price: 1250,
    discount: 10,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOckzl1rf34oYBqeYu4_FsuyBeqgAt3Uu46Salfr_MCQLibQ8UnlU2yvQErTQQnwCMb7ipZwyd9-E7nPwar6gEFgFzLaU0WB-Bbu-WRD_VjzhfLeJsH98QU9wPmymBSIdISrQC6uJ6xvByY1y_05QLYLHAOdUvlCD5LbAfIDBtHFV1LRAzLQ7dUN7ugtqYu0nUkknwNaMAM3sCNcRXUtwWfkq_nnIEFC512WOKVUsbHj2NrAWR4JebJbNaZxvVNkufr02gaomWEko'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBl2l6Tz-HYvqOA_Bo3lYks5rPPUfQOEinnEj9cQDrGDhCUJKGzGnowSImR1R7E7V1o4BcODUqSGo6oR5gqQLnUB-SBtpNvnZsDGlbIoFxfq6YIMPgyGkcRV-ZxWj4T0NDmIa8fo0BVcs8u8AcbKPYfeI-Hrc01vPBaJnVFNQcZSod6TPi-5PviNZOlcXXrhq-U3ShyXkcDVqSECsaDe4pgPy58fufjZlhRpB40V1a3JF3bu00CuGrEnt1zaMpPdUKDFyRK6llY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZw670Mo6vvHmqFz-l-1YV2xR6wS3_Xi148RlrXMosXE8kAfW3XrzfXWbruqpkNcKL8v2vvxBlO2Egf1wqfufz8Kjt0whUuAf3-Nq4Kfy2CsrNmQM1EDzO2NRKoKkVY5yU9qO0w7_TpISVFboURIMMSOw9yLbpuvPIBkGCr8FZgFSFC2nqG8HcSjwvXkgJ0nCJufjJsATYxoAa9tiM13r458qA_HUbIbf3xe3witECl4oA3D5oPXDvyJIrC4z6OzzYPvW9Rf8LQ7s'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlhgs2Cb6GAs-lnJ5MXEykScInAFmBtVQbVaQrITHVcTuBH9nQwL8_Tt3eBe4qJkd3o2yEDUGXPLZPybxFUO4flX6mn2Mv7Rqi7nSwo14pUrbgI-7TvWbaMs4z94ejnBS-QylFuVXJcr-RL5-q0OXQs7buBPcbn_OAF3y4FZYC4hiHU4OypSWEKqAp1XlS4hYx_WkG3-eneKYSY8F5p_KY2kieKDajBlL7rFhclV5ZmmfgzlFyHVP00z4hYjHTuzwihjk-OOlCnqA'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBb5TFOhzutiWC1yEPv7IwIgA8Mrfr5MQqk59Oh26IMFn3n4_jgn5YNwgmEeoBfuR35HrQvzLnaSfRHFqua1wao5SlovzK771t6mDgzDtvucAU78WHLqXA3RTpVqqAe0O-NNsxVjix5oDdOujccTWW_Da-Mk5jw_noUjB6fPpULUPa7BIKYYNQgwdv5RvJ4vRDrPTgncm728IkxM_x6FUZrg5qRGrnnouuvc7pLJaS3ZAvC7iB-59zXEIhHoC4_tMP_kFyhSxXMp7U',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7kBbqJ0zfV3TZtfJT-7m8QXy7Z56zSnkDGXlxBz7kW0l90I3Pyfdwwf0sJwLy_FAPB0ZrWVKthQZ6UCHxVLbB4I1K7VaZgz4iB4qsGpFXRmKgKUmBwId8NojAEZWlmF4KnH9KEcyVxvBXyRcNKHuJeBhhJh2JtnJ_KQ7UTK7RxBRWieK0XfJ_FeX-GV3xQglof1G3D9aCQAoG2Sn5d-BQwhzz97ZNwjBF9KPR2SaQMzEKUb3-LXIWujxQ41lVvXylzTWBsUL5AU'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-j05MfHAu32diN6AF776Wd6WWOiB0XnFY4XrUaeXxvDTHTE2q2dp5WIPuvMODDCYzzuIwn3ZSk84KnDDjy0w3o7lV8wXwhM463wPoD1QMABoRO-rhYT0d6NdRgb-RXqfshE8Xdu6-Yw_HLoxu_8KDMFZvY_MmRtu1adRl7RkT1Mip88rgAIhlKQeIonYhxbjtTTZVYhfDzOZbkSd2cc1XnqoPTsMwdxyuKULrgrPZHUwEJ2bJRi9Twa6NtEK7YUNr25gZWQJxhcU'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZgXK7gX_jZ_WDTtm7UCbroS8kZzVO3FHlU5qcOJ0asnPFsaWFmKp5VRFbsykjo3z2yDSLMF8hm3YpGsuVcouOFucmJQrJ2Ss6wcPz1VmIRlY_93aWFY7Mk3czD9JnXiwuUoPpPmhmyHcSU9UHl8qC2etfsLcXvkaw9s5auUOX9a94ezYFKtx1Wy_S0bsrcAPamkmgN_KUiOoaIReuHZUv5aAR1h30F5JN3fMcLJzMNtP0WrnNE25HWwA2czPuLE53Obreh0NhGE'
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
