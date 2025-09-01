import { useState, useEffect } from 'react';
import { obterEstatisticas } from "../service/ConsultaPessoasService"; 

export default function PainelEstatisticas() {

  const [estatisticas, setEstatisticas] = useState(null);

  useEffect(() => {
    async function fetchEstatisticas() {
      const data = await obterEstatisticas();
      setEstatisticas(data);
    }
    fetchEstatisticas();
  }, []); 

  if (!estatisticas) {
    return null;
  }


  return (
    <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mb-8 text-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-md min-w-[200px]">
        <p className="text-sm text-gray-400 uppercase tracking-wider">Pessoas Desaparecidas</p>
        <p className="text-4xl font-bold text-red-500">{estatisticas.quantPessoasDesaparecidas}</p>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md min-w-[200px]">
        <p className="text-sm text-gray-400 uppercase tracking-wider">Pessoas Encontradas</p>
        <p className="text-4xl font-bold text-green-500">{estatisticas.quantPessoasEncontradas}</p>
      </div>
    </div>
  );
}