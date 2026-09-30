import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RotateCcw, Search, X, Check } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, MOCK_CATEGORIES } from '../services/api';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Synchronize query params
    setSelectedCategory(searchParams.get('category') || 'All Categories');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await fetchProducts({
        category: selectedCategory,
        search: searchQuery,
        maxPrice,
        minRating,
        sortBy
      });
      setProducts(res.data);
      setLoading(false);
    };
    loadProducts();
  }, [selectedCategory, searchQuery, maxPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setMaxPrice(1000);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div>
          <h1 className="text-3xl font-black">All Products</h1>
          <p className="text-slate-400 text-xs mt-1">
            Browse our complete catalog of electronics, modern fashion, and luxury home items
          </p>
        </div>

        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/10"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filter Container */}
        <aside className="hidden lg:block space-y-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" /> Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Search Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
            <div className="space-y-1">
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.name && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-500">Max Price</label>
              <span className="font-bold text-indigo-600">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Rating</label>
            <div className="space-y-1 text-xs font-medium text-slate-600">
              {[4, 3, 0].map((stars) => (
                <label key={stars} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === stars}
                    onChange={() => setMinRating(stars)}
                    className="accent-indigo-600"
                  />
                  <span>{stars === 0 ? 'All Ratings' : `${stars}★ & above`}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Catalog Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting Bar */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-xs">
            <span className="text-slate-500">
              Active Filters: <strong className="text-slate-800">{selectedCategory}</strong>
              {searchQuery && <span> • "{searchQuery}"</span>}
            </span>

            <div className="flex items-center gap-2">
              <label className="text-slate-500 font-medium">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid Component */}
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Products;
