import { useState } from "react";
import axios from "../api/axios";

export default function SweetSearch({ onResults }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const search = async () => {
    const res = await axios.get("/sweets/search", {
      params: {
        name,
        category,
        minPrice,
        maxPrice
      }
    });
    onResults(res.data);
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h4 className="text-2xl font-bold text-gray-800">Search Sweets</h4>
      </div>

      {/* Search Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Name Input */}
        <div className="relative">
          <input
            placeholder="Sweet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white placeholder-gray-400 text-gray-800"
          />
          <span className="absolute right-3 top-3.5 text-pink-400">🍭</span>
        </div>

        {/* Category Input */}
        <div className="relative">
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white placeholder-gray-400 text-gray-800"
          />
          <span className="absolute right-3 top-3.5 text-pink-400">🏷️</span>
        </div>

        {/* Min Price Input */}
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500 font-medium">₹</span>
          <input
            placeholder="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white placeholder-gray-400 text-gray-800"
          />
        </div>

        {/* Max Price Input */}
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500 font-medium">₹</span>
          <input
            placeholder="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white placeholder-gray-400 text-gray-800"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={search}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search Sweets
      </button>
    </div>
  );
}