import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/api';

export const SearchBar = ({ onSearch = null, placeholder = "Search headphones, watches, fashion..." }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const matches = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(matches);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectSuggestion = (product) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/products/${product.id}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-sm rounded-full border border-slate-200/80 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setSuggestions([]); setIsOpen(false); }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Auto Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Suggestions
          </div>
          <div className="divide-y divide-slate-50">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectSuggestion(item)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 cursor-pointer transition-colors group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-lg bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">{item.category}</p>
                </div>
                <span className="text-xs font-bold text-slate-900">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-center py-2.5 text-xs font-semibold text-indigo-600 bg-indigo-50/40 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1"
          >
            See all results for "{query}" <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
