import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discount > 0 && (
          <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist & Quick View Floating Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`p-2 rounded-full backdrop-blur-md shadow-md transition-transform active:scale-95 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 border border-rose-200'
              : 'bg-white/80 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          className="p-2 bg-white/80 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-full backdrop-blur-md shadow-md transition-transform active:scale-95 hidden group-hover:flex"
          title="Quick view product"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium text-indigo-600">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <span className="text-base font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
