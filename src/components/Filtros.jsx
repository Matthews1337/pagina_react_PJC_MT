import { useState } from 'react';

export default function Filtros({ valoresIniciais, onAplicarFiltros }) {
  const [nome, setNome] = useState(valoresIniciais.nome || '');
  const [idadeMin, setIdadeMin] = useState(valoresIniciais.idadeInicial || '');
  const [idadeMax, setIdadeMax] = useState(valoresIniciais.idadeFinal || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAplicarFiltros({
      nome,
      idadeInicial: idadeMin,
      idadeFinal: idadeMax,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-950 border-gold p-4 rounded-lg mb-8 flex flex-wrap items-end gap-4">
      
      <div className="flex-grow">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Procurar por nome..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-gold focus:border-gold"
          
        />
      </div>

      <div className="flex-grow sm:flex-grow-0">
        <label htmlFor="idadeMin" className="block text-sm font-medium text-gray-400 mb-1">Idade Mín.</label>
        <input
          type="number"
          id="idadeMin"
          placeholder="Ex: 18"
          min="0"
          value={idadeMin}
          onChange={(e) => setIdadeMin(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-gold focus:border-gold"
        />
      </div>

      <div className="flex-grow sm:flex-grow-0">
        <label htmlFor="idadeMax" className="block text-sm font-medium text-gray-400 mb-1">Idade Máx.</label>
        <input
          type="number"
          id="idadeMax"
          placeholder="Ex: 60"
          min="0"
          value={idadeMax}
          onChange={(e) => setIdadeMax(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-gold focus:border-gold"
        />
      </div>
      
      
      <button type="submit" className="bg-gold px-5 py-2 rounded-md text-white font-medium hover:bg-gold/90 transition h-10">
        Aplicar Filtros
      </button>
    </form>
  );
}