import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, MapPin, CheckCircle, ArrowRight, Lock, Sparkles, Building, Phone } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { api, loadRazorpay } from '../api/client';

export const Checkout = () => {
  const { cartItems, grandTotal, subtotal, discount, shippingCost, tax, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.johnson@example.com',
    phone: user?.phone || '+1 (555) 234-5678',
    street: user?.addresses?.[0]?.street || '124 Tech Boulevard, Suite 400',
    city: user?.addresses?.[0]?.city || 'San Francisco',
    state: user?.addresses?.[0]?.state || 'CA',
    zip: user?.addresses?.[0]?.zip || '94107',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '123'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentLoading) return;

    if (formData.paymentMethod === "cod") {
      alert(
        "Cash on Delivery is not available yet. Please select Credit Card or UPI / Wallet."
      );
      return;
    }

    const tenantId = cartItems?.[0]?.tenantId;

    if (!tenantId) {
      alert(
        "Store information is missing. Please refresh the page and try again."
      );
      return;
    }

    setPaymentLoading(true);

    try {
      const shippingAddress = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.zip.trim(),
        country: formData.country,
      };

      const order = await api.orders.create(
        shippingAddress,
        tenantId
      );

      const realOrderId = order?.id || order?._id;

      if (!realOrderId) {
        throw new Error(
          "Order was created but order ID was not returned."
        );
      }

      const paymentData =
        await api.payments.create(realOrderId);

      if (!paymentData?.razorpayOrder?.id) {
        throw new Error(
          "Razorpay order was not created."
        );
      }

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded || !window.Razorpay) {
        throw new Error(
          "Razorpay failed to load. Please check your internet connection."
        );
      }

      const options = {
        key: paymentData.keyId,

        amount:
          paymentData.razorpayOrder.amount,

        currency:
          paymentData.razorpayOrder.currency || "INR",

        name: "E-Commerce SaaS",

        description:
          `Payment for Order ${realOrderId}`,

        order_id:
          paymentData.razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyResult =
              await api.payments.verify({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                orderId: realOrderId,
              });

            if (!verifyResult?.success) {
              throw new Error(
                verifyResult?.message ||
                "Payment verification failed."
              );
            }

            clearCart();

            setPlacedOrderId(
              realOrderId
            );

            setOrderPlaced(true);

          } catch (error) {
            console.error(
              "PAYMENT VERIFY ERROR:",
              error
            );

            alert(
              error.message ||
              "Payment verification failed."
            );

          } finally {
            setPaymentLoading(false);
          }
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        notes: {
          orderId: realOrderId,
        },

        theme: {
          color: "#4f46e5",
        },

        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response?.error
          );

          setPaymentLoading(false);

          alert(
            response?.error?.description ||
            "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "CHECKOUT PAYMENT ERROR:",
        error
      );

      setPaymentLoading(false);

      alert(
        error.message ||
        "Something went wrong while placing the order."
      );
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl max-w-xl mx-auto my-12 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Order Confirmed</span>
          <h2 className="text-3xl font-black text-slate-900">Thank You For Your Order!</h2>
          <p className="text-xs text-slate-500">
            Order Reference: <strong className="text-slate-800 font-mono">{placedOrderId}</strong>
          </p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          We have sent a confirmation email to <strong>{formData.email}</strong>. Your items are being packed and prepared for shipment.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
          >
            Track Order Status
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition-all"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900">Checkout Express</h1>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-600" /> Complete your shipping & payment info securely
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Step 1 & 2 & 3: Shipping & Payment Controls */}
        <div className="lg:col-span-2 space-y-6">

          {/* Section 1: Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-indigo-600" /> 1. Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-600">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Options */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Truck className="w-4 h-4 text-indigo-600" /> 2. Delivery Speed
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-indigo-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Standard Delivery (3-5 Business Days)</p>
                    <p className="text-[11px] text-slate-400">Reliable doorstep shipping</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">FREE</span>
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-indigo-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Express Priority (1-2 Business Days)</p>
                    <p className="text-[11px] text-slate-400">Airmail priority dispatch</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800">$15.00</span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-indigo-600" /> 3. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, paymentMethod: 'card' }))}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${formData.paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <CreditCard className="w-5 h-5" /> Credit Card
              </button>

              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, paymentMethod: 'upi' }))}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${formData.paymentMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Sparkles className="w-5 h-5" /> UPI / Wallet
              </button>

              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, paymentMethod: 'cod' }))}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${formData.paymentMethod === 'cod'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Building className="w-5 h-5" /> Cash on Delivery
              </button>
            </div>

            {/* Card Inputs preview if card selected */}
            {formData.paymentMethod === 'card' && (
              <div className="space-y-3 pt-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">CVC Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Live Order Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 sticky top-24">
            <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">Review Items</h3>

            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-slate-50 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-4 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-100 pt-3">
                <span>Total Due</span>
                <span className="text-indigo-600">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={paymentLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              {paymentLoading
                ? "Processing Payment..."
                : `Place Order ($${grandTotal.toFixed(2)})`}

              {!paymentLoading && (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
