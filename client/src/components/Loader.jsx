import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ fullScreen = false, text = 'Loading catalog...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 border border-slate-100">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-slate-700 font-medium text-sm">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <span className="text-slate-500 text-sm font-medium">{text}</span>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col space-y-3">
      <div className="w-full h-48 bg-slate-200 rounded-xl" />
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-5 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-slate-200 rounded w-1/4" />
        <div className="h-9 bg-slate-200 rounded-lg w-10" />
      </div>
    </div>
  );
};

export default Loader;
