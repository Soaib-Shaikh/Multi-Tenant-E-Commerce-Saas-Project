import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Tag, Truck, ShieldCheck, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';

export const Cart = () => {
  const {
    cartItems,
    clearCart,
    subtotal,
    discount,
    shippingCost,
    tax,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto my-12 space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our latest products and deals!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">
            You have <strong className="text-slate-800">{cartItems.length}</strong> unique item(s) in your bag
          </p>
        </div>
        
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" /> Clear Shopping Cart
        </button>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100/60 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-indigo-600" />
            {remainingForFreeShipping > 0
              ? `Add $${remainingForFreeShipping.toFixed(2)} more for FREE Express Shipping!`
              : '🎉 You have unlocked FREE Express Shipping!'}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Item Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">Order Summary</h3>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-600" /> Promo / Coupon Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-bold text-emerald-700">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> {appliedCoupon.code} Applied
                  </span>
                  <button onClick={removeCoupon} className="text-rose-500 hover:underline text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try SAVE20"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-900">
                  {shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-100 pt-3">
                <span>Total Amount</span>
                <span className="text-indigo-600">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
