import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './Loader';
import { LayoutGrid, Grid3X3, List, PackageSearch } from 'lucide-react';

export const ProductGrid = ({ products = [], loading = false, title = null }) => {
  const [columns, setColumns] = useState(4); // 3 or 4 cols or 'list'

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm my-6 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No products found</h3>
        <p className="text-slate-500 text-sm max-w-md">
          We couldn't find any products matching your current filters or search term. Try resetting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header bar with count and layout switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          {title && <h2 className="text-xl font-bold text-slate-900">{title}</h2>}
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{products.length}</span> items
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
          <button
            onClick={() => setColumns(3)}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              columns === 3 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="3 Columns"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setColumns(4)}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all hidden md:block ${
              columns === 4 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="4 Columns"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div
        className={`grid gap-6 ${
          columns === 3
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
