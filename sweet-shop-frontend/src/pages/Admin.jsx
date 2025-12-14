import { useState } from "react";
import axios from "../api/axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addSweet = async () => {
    await axios.post("/sweets", {
      name,
      category,
      price,
      quantity
    });
    alert("Sweet added");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-gray-600 mt-1">Add new sweets to your inventory</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sweet Name
              </label>
              <div className="relative">
                <input
                  placeholder="e.g., Gulab Jamun"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-800"
                />
                <span className="absolute left-4 top-3.5 text-2xl">🍬</span>
              </div>
            </div>

            {/* Category Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <input
                  placeholder="e.g., Traditional"
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-800"
                />
                <span className="absolute left-4 top-3.5 text-2xl">🏷️</span>
              </div>
            </div>

            {/* Price and Quantity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-600 font-semibold">₹</span>
                  <input
                    placeholder="100"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-xl">📦</span>
                  <input
                    placeholder="50"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={addSweet}
              className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Sweet to Inventory
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-purple-800">
              Fill in all the details to add a new sweet to your shop. Make sure to set the correct price and stock quantity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}