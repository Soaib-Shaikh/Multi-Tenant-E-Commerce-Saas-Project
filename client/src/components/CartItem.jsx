import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link to={`/products/${item.id}`} className="shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{item.category}</span>
          <Link to={`/products/${item.id}`} className="block">
            <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors truncate">
              {item.name}
            </h4>
          </Link>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            {item.selectedColor && (
              <span className="flex items-center gap-1">
                Color:
                <span
                  className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                  style={{ backgroundColor: item.selectedColor }}
                />
              </span>
            )}
            {item.selectedSize && (
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600">
                {item.selectedSize}
              </span>
            )}
          </div>
          <div className="mt-1 text-xs text-slate-500 sm:hidden">
            ${item.price.toFixed(2)} each
          </div>
        </div>
      </div>

      {/* Right Controls: Quantity & Subtotal */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg transition-colors"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg transition-colors"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[80px]">
          <p className="text-base font-bold text-slate-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            ${item.price.toFixed(2)} / ea
          </p>
        </div>

        {/* Delete */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
