import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShoppingBag, Flame, Headphones, Shirt, Armchair, ShieldCheck, Zap, Star } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, MOCK_CATEGORIES } from '../services/api';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live Flash Sale Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getFeatured = async () => {
      setLoading(true);
      const res = await fetchProducts();
      setProducts(res.data);
      setLoading(false);
    };
    getFeatured();
  }, []);

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Next-Gen Shopping Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Elevate Your Lifestyle With <span className="gradient-text">Premium Tech</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Discover cutting-edge audio, smart wearables, and sleek home essentials. Fast 2-day delivery with 100% satisfaction guarantee.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Shop Catalog Now
              </Link>
              <Link
                to="/products?category=Electronics"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs sm:text-sm font-bold border border-white/10 backdrop-blur-md transition-all flex items-center gap-2"
              >
                View Electronics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
              <span className="absolute -top-3 -right-3 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                HOT SELLER
              </span>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="Featured Product"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-300 font-semibold uppercase">Featured Highlight</p>
                  <h3 className="text-base font-bold text-white">Aura Sound Pro Wireless</h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-white">$249.99</span>
                  <span className="block text-xs text-slate-400 line-through">$299.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-slate-500 text-xs mt-1">Browse our top curated product collections</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/products?category=Electronics"
            className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                Electronics & Audio
              </h3>
              <p className="text-xs text-slate-400">Headphones, watches, gadgets</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/products?category=Fashion"
            className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                Modern Fashion
              </h3>
              <p className="text-xs text-slate-400">Leather bags, jackets, apparel</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/products?category=Home%20%26%20Office"
            className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Armchair className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                Home & Office
              </h3>
              <p className="text-xs text-slate-400">Ergonomic chairs, sofa sets</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>

      {/* Flash Sale Banner with Live Timer */}
      <section className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <Flame className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">Flash Sale Ending Soon</span>
            <h3 className="text-2xl font-black">Up To 40% OFF Selected Products</h3>
          </div>
        </div>

        {/* Timer Blocks */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-md px-3 py-2 rounded-2xl min-w-[55px]">
            <span className="text-xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-bold text-slate-200">Hours</span>
          </div>
          <span className="text-xl font-bold">:</span>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-md px-3 py-2 rounded-2xl min-w-[55px]">
            <span className="text-xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-bold text-slate-200">Mins</span>
          </div>
          <span className="text-xl font-bold">:</span>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-md px-3 py-2 rounded-2xl min-w-[55px]">
            <span className="text-xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-bold text-slate-200">Secs</span>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-6">
        <ProductGrid
          products={products}
          loading={loading}
          title="Trending Products"
        />
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Testimonials</span>
          <h2 className="text-2xl font-black text-slate-900">Loved by 50,000+ Customers</h2>
          <p className="text-slate-500 text-xs">Read real reviews from our satisfied shoppers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The Aura Sound Headphones arrived in just 2 days. The ANC performance rivals premium $400 brands at half the cost!"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Reviewer" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-800">Sarah Jenkins</p>
                <p className="text-[10px] text-slate-400">Verified Buyer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Super smooth checkout and instant tracking updates. Loved the minimalist leather backpack quality!"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Reviewer" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-800">Michael Chang</p>
                <p className="text-[10px] text-slate-400">Verified Buyer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Customer support resolved my address change request in under 5 minutes. Amazing service overall!"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Reviewer" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-800">Jessica Miller</p>
                <p className="text-[10px] text-slate-400">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
