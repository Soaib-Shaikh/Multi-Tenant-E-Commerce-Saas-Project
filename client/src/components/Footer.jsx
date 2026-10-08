import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, ShieldCheck, Truck, RefreshCw, Headset, Heart } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Encrypted Payments</h4>
              <p className="text-xs text-slate-400">256-bit SSL Protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30 Days Easy Return</h4>
              <p className="text-xs text-slate-400">Money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400">Live chat & phone support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Aura<span className="text-indigo-400">Store</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curated premium lifestyle products designed for modern tech enthusiasts, fashion lovers, and minimalist homes.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Subscribe to our newsletter
              </p>

              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  ✓ Thank you for subscribing! Check your inbox for exclusive perks.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-indigo-500"
                  />

                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Featured Catalog
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Checkout Express
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link
                  to="/products?category=Electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics & Audio
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Fashion"
                  className="hover:text-white transition-colors"
                >
                  Modern Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Home%20%26%20Office"
                  className="hover:text-white transition-colors"
                >
                  Home & Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Account */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Account
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Order History & Tracking
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Customer Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal & Support
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/cancellation-refund"
                  className="hover:text-white transition-colors"
                >
                  Cancellation & Refunds
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AuraStore E-Commerce Platform. All rights reserved.</p>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for MERN Stack App</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;