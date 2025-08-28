import React, { useState } from "react";

function CampoBusca({ onBuscar }) {
  const [valor, setValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor.trim() !== "") {
      onBuscar(valor); // 🔥 dispara callback para o pai
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 mb-6"
    >
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Digite o nome..."
        className="w-72 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </form>
  );
}

export default CampoBusca;
