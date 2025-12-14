import axios from "../api/axios";

export default function SweetCard({ sweet }) {
  const purchase = async () => {
    await axios.post(`/sweets/${sweet._id}/purchase`, { quantity: 1 });
    alert("Purchased!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 hover:scale-105 transform w-64 h-80 flex flex-col">
      {/* Top Section - Name & Icon */}
      <div className="flex-shrink-0 mb-4">
        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-4xl">🍬</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 text-center line-clamp-2">
          {sweet.name}
        </h3>
      </div>

      {/* Middle Section - Price & Stock */}
      <div className="flex-grow flex flex-col justify-center gap-3">
        {/* Price */}
        <div className="text-center">
          <div className="inline-flex items-baseline gap-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full shadow-md">
            <span className="text-lg font-bold">₹{sweet.price}</span>
          </div>
        </div>

        {/* Stock Badge */}
        <div className="flex justify-center">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold ${
            sweet.quantity === 0 
              ? 'bg-red-100 text-red-700' 
              : sweet.quantity < 10 
              ? 'bg-amber-100 text-amber-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              sweet.quantity === 0 
                ? 'bg-red-500' 
                : sweet.quantity < 10 
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}></span>
            {sweet.quantity === 0 ? 'Out of Stock' : `${sweet.quantity} Available`}
          </span>
        </div>
      </div>

      {/* Bottom Section - Purchase Button */}
      <div className="flex-shrink-0 mt-auto">
        <button
          disabled={sweet.quantity === 0}
          onClick={purchase}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 text-sm ${
            sweet.quantity === 0
              ? 'bg-gray-300 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-md hover:shadow-lg active:scale-95'
          }`}
        >
          {sweet.quantity === 0 ? '✕ Unavailable' : '🛒 Purchase Now'}
        </button>
      </div>
    </div>
  );
}