import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, ArrowLeft, MessageSquare } from 'lucide-react';
import { fetchProductById, fetchProducts } from '../services/api';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, showToast } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const res = await fetchProductById(id);
        const prodData = res.data;
        setProduct(prodData);
        setSelectedImage(prodData.image);
        if (prodData.colors?.length) setSelectedColor(prodData.colors[0]);
        if (prodData.sizes?.length) setSelectedSize(prodData.sizes[0]);

        // Fetch related products in same category
        const relRes = await fetchProducts({ category: prodData.category });
        setRelatedProducts(relRes.data.filter(p => p.id !== id).slice(0, 4));
      } catch (err) {
        showToast('Product not found', 'error');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, selectedSize);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: 'You (Verified Customer)',
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      text: reviewText
    };

    setProduct(prev => ({
      ...prev,
      reviewsCount: prev.reviewsCount + 1,
      reviews: [newRev, ...(prev.reviews || [])]
    }));

    setReviewText('');
    showToast('Thank you! Your review has been published.');
  };

  if (loading) return <Loader fullScreen text="Loading product details..." />;

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="space-y-12">
      
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
      </Link>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm aspect-square flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>

          {/* Thumbnails list */}
          {product.gallery?.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden bg-slate-50 shrink-0 transition-all ${
                    selectedImage === imgUrl ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Spec Details Column */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">{product.category}</span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">In Stock ({product.stock} left)</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 leading-tight">{product.name}</h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through font-normal">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Save {product.discount}%</span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-b border-slate-100 py-3">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Color:</label>
                <div className="flex items-center gap-3">
                  {product.colors.map((colorHex, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(colorHex)}
                      style={{ backgroundColor: colorHex }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === colorHex ? 'ring-4 ring-indigo-500/30 scale-110 border-indigo-600' : 'border-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Size:</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Picker & Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white text-slate-600 rounded-xl transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white text-slate-600 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted ? 'bg-rose-50 text-rose-500 border-rose-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-md"
            >
              Buy Now Express Checkout
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <Truck className="w-5 h-5 text-indigo-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-800">Free Express Shipping</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <RotateCcw className="w-5 h-5 text-indigo-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-800">30-Day Easy Returns</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <ShieldCheck className="w-5 h-5 text-indigo-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-800">2 Year Official Warranty</p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Section: Description, Specs, Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'description' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'description' && (
          <div className="text-xs text-slate-600 leading-relaxed space-y-3">
            <p>{product.description}</p>
            <p>
              Crafted from premium quality materials engineered for longevity. Each unit undergoes strict quality assurance before shipment.
            </p>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && product.specs && (
          <div className="divide-y divide-slate-100 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-800">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Submit Review */}
            <form onSubmit={handleAddReview} className="bg-slate-50 p-4 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" /> Write a Review
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-4 h-4 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                Submit Review
              </button>
            </form>

            {/* List Reviews */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rev.author}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 pt-1">{rev.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No reviews written yet. Be the first to review!</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
