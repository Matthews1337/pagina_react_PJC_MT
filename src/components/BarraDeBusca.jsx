import React, { useState } from "react";

export default function BarraDeBusca({ onSearch }) {
  const [termo, setTermo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(termo);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center justify-center mb-8 w-full px-4"
    >
      <div className="flex w-full max-w-lg">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Procurar por nome..."
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-gold text-white font-medium rounded-r-lg hover:bg-gold/90 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}