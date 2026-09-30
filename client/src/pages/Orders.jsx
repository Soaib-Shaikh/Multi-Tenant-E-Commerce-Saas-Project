import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp, Download, RotateCcw, ExternalLink } from 'lucide-react';
import { MOCK_ORDERS } from '../services/api';
import { useCart } from '../hooks/useCart';

export const Orders = () => {
  const { addToCart, showToast } = useCart();
  const [expandedOrderId, setExpandedOrderId] = useState(MOCK_ORDERS[0]?.id || null);

  const toggleOrder = (orderId) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  const handleReorder = (item) => {
    addToCart(item);
    showToast(`Added "${item.name}" back to cart!`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-3xl font-black">My Order History</h1>
          <p className="text-slate-400 text-xs mt-1">Track shipments, view receipts, and reorder previous items</p>
        </div>
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md hidden sm:block">
          <Package className="w-8 h-8 text-indigo-400" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => {
          const isExpanded = expandedOrderId === order.id;

          return (
            <div key={order.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all">
              
              {/* Order Header Summary Row */}
              <div
                onClick={() => toggleOrder(order.id)}
                className="p-6 cursor-pointer hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-900 text-sm">{order.id}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle className="w-3 h-3" /> : <Truck className="w-3 h-3 animate-pulse" />}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Placed on {order.date} • {order.items.length} item(s)</p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-400">Total Price</p>
                    <p className="text-base font-black text-slate-900">${order.total.toFixed(2)}</p>
                  </div>

                  <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Order Expanded Details Drawer */}
              {isExpanded && (
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 space-y-6 animate-fade-in">
                  
                  {/* Tracking Stepper */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Tracking Status: <strong className="text-indigo-600 font-mono">{order.trackingNumber}</strong></span>
                      <span className="text-slate-400 font-normal">Carrier: FedEx Express</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="space-y-1">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-slate-800">Order Placed</p>
                      </div>

                      <div className="space-y-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                          order.status === 'Delivered' || order.status === 'Shipped' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          <Truck className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-slate-800">Shipped</p>
                      </div>

                      <div className="space-y-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                          order.status === 'Delivered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-slate-800">Delivered</p>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ordered Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl bg-slate-50 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400">Qty: {item.quantity} • ${item.price.toFixed(2)} each</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleReorder(item)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Buy Again
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info & Invoice Download */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
                    <div className="text-slate-500 space-y-0.5">
                      <p><strong className="text-slate-800">Shipped To:</strong> {order.shippingAddress}</p>
                      <p><strong className="text-slate-800">Payment:</strong> {order.paymentMethod}</p>
                    </div>

                    <button
                      onClick={() => showToast('Downloading PDF invoice...')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF Invoice
                    </button>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
