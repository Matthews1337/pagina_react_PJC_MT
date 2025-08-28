import React from "react";

export default function Paginacao({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className={`px-4 py-2 rounded-lg font-medium transition 
          ${page === 0 
            ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
            : "bg-gold text-white hover:bg-gold/90"
          }`}
      >
        Anterior
      </button>

      
      <span className="text-gray-500 font-medium">
        Página <span className="font-bold">{page + 1}</span> de {totalPages}
      </span>

      
      <button
        disabled={page + 1 >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-4 py-2 rounded-lg font-medium transition 
          ${(page + 1 >= totalPages) 
            ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
            : "bg-gold text-white hover:bg-gold/90"
          }`}
      >
        Próxima 
      </button>
    </div>
  );
}