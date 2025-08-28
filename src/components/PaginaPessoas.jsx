import React, { useEffect, useState } from "react";
import { obterPessoas } from "../service/consultaPessoasService";
import Paginacao from "../components/Paginacao";
import BarraDeBusca from "../components/BarraDeBusca";
import CardPessoa from "../components/CardPessoa";


export default function PaginaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await obterPessoas(pagina, 12, nome); 
        setPessoas(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Erro ao carregar pessoas:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, [pagina, nome]);

  return (
    <div className="p-8 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-gold/90 mb-6 text-center">
        Lista de Pessoas Desaparecidas
      </h1>
      <BarraDeBusca onSearch={(termo) => { 
        setNome(termo); 
        setPagina(0); 
      }} />

      {loading ? (
        <p className="text-center text-gray-600">Carregando...</p>
      ) : (
        <>
          {pessoas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pessoas.map((pessoa) => (
                <CardPessoa key={pessoa.id} pessoa={pessoa} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-6">
              Nenhuma pessoa encontrada ❗
            </p>
          )}
        </>
      )}

      
      <div className="mt-8">
        <Paginacao page={pagina} totalPages={totalPages} onPageChange={setPagina} />
      </div>
    </div>
  );
}