import axios from 'axios';

// Create base Axios instance
export const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with real API URL when connected
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initial mock products database
export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aura Sound Pro Wireless Headphones',
    category: 'Electronics',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
    ],
    description: 'Immerse yourself in high-fidelity audio with active noise cancellation, 40-hour battery life, and spatial audio precision engineered for audiophiles.',
    colors: ['#1e293b', '#64748b', '#f8fafc'],
    sizes: ['Standard'],
    specs: {
      'Battery Life': '40 Hours',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Jack',
      'Noise Cancellation': 'Active ANC with Ambient Mode',
      'Weight': '250g'
    },
    reviews: [
      { id: 'rev-1', author: 'Alex Rivera', rating: 5, date: '2026-02-15', text: 'Best noise cancellation headphones I have ever owned! Crisp bass and ultra clear highs.' },
      { id: 'rev-2', author: 'Sophia Chen', rating: 4, date: '2026-02-10', text: 'Extremely comfortable for long working hours. Battery easily lasts 3 days.' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Lumix Horizon Smart Watch Ultra',
    category: 'Electronics',
    price: 399.00,
    originalPrice: 449.00,
    rating: 4.9,
    reviewsCount: 89,
    stock: 12,
    isNew: true,
    isFeatured: true,
    isFlashSale: false,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    description: 'Advanced health metrics, titanium casing, sapphire crystal display, and multi-band GPS precision. Designed for athletes and tech enthusiasts.',
    colors: ['#0f172a', '#94a3b8', '#d97706'],
    sizes: ['44mm', '49mm'],
    specs: {
      'Display': '1.92" OLED Always-On',
      'Water Resistance': '100m Waterproof',
      'Sensors': 'ECG, Heart Rate, SpO2, Temperature',
      'Battery': 'Up to 60h in Low Power Mode'
    },
    reviews: [
      { id: 'rev-3', author: 'Marcus Vance', rating: 5, date: '2026-01-20', text: 'Build quality is top notch. Titanium feel is awesome.' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Minimalist Leather Urban Backpack',
    category: 'Fashion',
    price: 129.50,
    originalPrice: 160.00,
    rating: 4.7,
    reviewsCount: 64,
    stock: 30,
    isNew: false,
    isFeatured: true,
    isFlashSale: true,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    description: 'Handcrafted full-grain leather backpack featuring a padded 16-inch laptop compartment, hidden security pockets, and water-resistant finish.',
    colors: ['#78350f', '#1e293b'],
    sizes: ['Medium', 'Large'],
    specs: {
      'Material': '100% Full Grain Genuine Leather',
      'Laptop Sleeve': 'Fits up to 16" MacBook Pro',
      'Capacity': '22 Liters',
      'Dimensions': '45cm x 30cm x 15cm'
    },
    reviews: [
      { id: 'rev-4', author: 'Elena Rostova', rating: 5, date: '2026-02-01', text: 'Beautiful craftsmanship! Smells great and carries everything cleanly.' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Desk Pro Executive Chair',
    category: 'Home & Office',
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.6,
    reviewsCount: 112,
    stock: 8,
    isNew: false,
    isFeatured: true,
    isFlashSale: false,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800&q=80'
    ],
    description: 'Dynamic lumbar support, breathable mesh backrest, and 4D adjustable armrests designed to prevent posture fatigue during long work sessions.',
    colors: ['#0f172a', '#64748b'],
    sizes: ['Standard Fit'],
    specs: {
      'Weight Capacity': '150 kg / 330 lbs',
      'Recline Angle': '90° to 135°',
      'Warranty': '10 Years Manufacturer Warranty'
    },
    reviews: [
      { id: 'rev-5', author: 'David Kim', rating: 5, date: '2026-01-14', text: 'My lower back pain vanished after 1 week with this chair!' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Vortex Mechanical Gaming Keyboard RGB',
    category: 'Electronics',
    price: 159.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewsCount: 205,
    stock: 45,
    isNew: true,
    isFeatured: false,
    isFlashSale: true,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'
    ],
    description: 'Hot-swappable mechanical switches, per-key RGB backlight customizable via software, CNC aluminum chassis, and ultra-fast wireless 2.4GHz receiver.',
    colors: ['#0f172a', '#e2e8f0'],
    sizes: ['75% Compact', 'Full Size'],
    specs: {
      'Switch Type': 'Linear Red Silent Switches',
      'Keycaps': 'PBT Double-shot',
      'Battery': '4000mAh (Up to 200 hours)'
    },
    reviews: []
  },
  {
    id: 'prod-6',
    name: 'Velvet Soft Cushion Modern Sofa Set',
    category: 'Home & Office',
    price: 899.00,
    originalPrice: 1099.00,
    rating: 4.9,
    reviewsCount: 48,
    stock: 5,
    isNew: false,
    isFeatured: true,
    isFlashSale: false,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    description: 'Plush velvet upholstery, solid oak wooden legs, high-density foam cushions that offer unparalleled comfort for your living room aesthetic.',
    colors: ['#065f46', '#1e3a8a', '#701a75'],
    sizes: ['3-Seater'],
    specs: {
      'Frame': 'Solid Kiln-Dried Hardwood',
      'Fabric': 'Stain-Resistant Italian Velvet',
      'Assembly': 'Tool-Free Easy Assembly'
    },
    reviews: []
  },
  {
    id: 'prod-7',
    name: 'Nordic Ceramic Coffee Set with Tray',
    category: 'Home & Office',
    price: 74.99,
    originalPrice: 89.99,
    rating: 4.5,
    reviewsCount: 37,
    stock: 50,
    isNew: true,
    isFeatured: false,
    isFlashSale: false,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    description: 'Elegantly sculpted ceramic mugs with bamboo coasters and a gold-trimmed pouring carafe. Microwave and dishwasher safe.',
    colors: ['#ffffff', '#1e293b'],
    sizes: ['6-Piece Set'],
    specs: {
      'Material': 'High-Fired Matte Ceramic',
      'Capacity': '350ml per cup'
    },
    reviews: []
  },
  {
    id: 'prod-8',
    name: 'Classic Vintage Denim Jacket',
    category: 'Fashion',
    price: 89.95,
    originalPrice: 110.00,
    rating: 4.6,
    reviewsCount: 93,
    stock: 22,
    isNew: false,
    isFeatured: false,
    isFlashSale: true,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'
    ],
    description: 'Timeless heavy-duty denim cotton jacket with classic copper hardware buttons, relaxed modern fit, and durable double-stitched seams.',
    colors: ['#2563eb', '#1e293b'],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: {
      'Material': '100% Premium Organic Cotton Denim',
      'Fit': 'Regular Relaxed Cut'
    },
    reviews: []
  }
];

export const MOCK_CATEGORIES = [
  { id: 'cat-all', name: 'All Categories', icon: 'Sparkles', count: 8 },
  { id: 'cat-1', name: 'Electronics', icon: 'Headphones', count: 3 },
  { id: 'cat-2', name: 'Fashion', icon: 'Shirt', count: 2 },
  { id: 'cat-3', name: 'Home & Office', icon: 'Armchair', count: 3 }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-02-24',
    total: 379.49,
    status: 'Delivered',
    trackingNumber: 'TRK-882194012',
    shippingAddress: '124 Tech Boulevard, Suite 400, San Francisco, CA 94107',
    paymentMethod: 'Visa ending in 4242',
    items: [
      { id: 'prod-1', name: 'Aura Sound Pro Wireless Headphones', price: 249.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
      { id: 'prod-3', name: 'Minimalist Leather Urban Backpack', price: 129.50, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' }
    ]
  },
  {
    id: 'ORD-87103',
    date: '2026-02-18',
    total: 399.00,
    status: 'Shipped',
    trackingNumber: 'TRK-441092815',
    shippingAddress: '124 Tech Boulevard, Suite 400, San Francisco, CA 94107',
    paymentMethod: 'UPI Payment',
    items: [
      { id: 'prod-2', name: 'Lumix Horizon Smart Watch Ultra', price: 399.00, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' }
    ]
  }
];

// Helper API functions
export const fetchProducts = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];

      if (filters.category && filters.category !== 'All Categories') {
        filtered = filtered.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
      }

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      }

      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
      }

      if (filters.minRating) {
        filtered = filtered.filter(p => p.rating >= Number(filters.minRating));
      }

      if (filters.sortBy) {
        if (filters.sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
        if (filters.sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
        if (filters.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        if (filters.sortBy === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      resolve({ data: filtered });
    }, 200);
  });
};

export const fetchProductById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (product) resolve({ data: product });
      else reject(new Error('Product not found'));
    }, 150);
  });
};
