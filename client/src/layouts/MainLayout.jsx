import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { X, ShoppingBag, Star, CheckCircle, Info, AlertTriangle, Heart } from 'lucide-react';

export const MainLayout = () => {
  const { toastMessage, quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Alert */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Flash Deal</span>
        <span>Use coupon code <strong className="text-amber-300 underline font-bold">SAVE20</strong> at checkout for 20% OFF all items!</span>
      </div>

      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Main Dynamic Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Quick View Modal Overlay */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 relative grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-slate-100 aspect-square md:aspect-auto flex items-center justify-center p-6">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-80 object-contain rounded-2xl drop-shadow-md"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{quickViewProduct.category}</span>
                <h3 className="text-xl font-extrabold text-slate-900">{quickViewProduct.name}</h3>
                
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-800 ml-1">{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-slate-400">({quickViewProduct.reviewsCount} customer reviews)</span>
                </div>

                <div className="pt-2">
                  <span className="text-2xl font-black text-slate-900">${quickViewProduct.price.toFixed(2)}</span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-slate-400 line-through ml-2">${quickViewProduct.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {quickViewProduct.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      wishlist.includes(quickViewProduct.id)
                        ? 'bg-rose-50 text-rose-500 border-rose-200'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(quickViewProduct.id) ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/products/${quickViewProduct.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs font-semibold text-indigo-600 hover:underline"
                >
                  View full specifications & detail page →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-bold text-white border ${
            toastMessage.type === 'error'
              ? 'bg-rose-600 border-rose-500'
              : toastMessage.type === 'info'
              ? 'bg-slate-900 border-slate-800'
              : 'bg-emerald-600 border-emerald-500'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
