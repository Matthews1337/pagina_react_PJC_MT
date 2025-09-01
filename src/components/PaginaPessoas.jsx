import React, { useEffect, useState } from "react";
import { obterPessoas } from "../service/ConsultaPessoasService";
import Paginacao from "../components/Paginacao";
// import BarraDeBusca from "../components/BarraDeBusca";
import CardPessoa from "../components/CardPessoa";
import { useSearchParams } from 'react-router-dom';
import PainelEstatisticas from '../components/PainelEstatisticas';
import fotoPJCMT from "../assets/BRASAO_PJCMT_2.png";
import Filtros from '../components/Filtros';


export default function PaginaPessoas() {
  const [searchParams, setSearchParams] = useSearchParams();


  const paginaUrl = parseInt(searchParams.get('page') || '1', 10);
  const nomeUrl = searchParams.get('nome') || "";
  const idadeInicialUrl = searchParams.get('idadeInicial') || "";
  const idadeFinalUrl = searchParams.get('idadeFinal') || "";
  const paginaApi = paginaUrl - 1;

  const [pessoas, setPessoas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await obterPessoas(
          paginaApi, 
          12, 
          nomeUrl, 
          parseInt(idadeInicialUrl || '0'), 
          parseInt(idadeFinalUrl || '0')   
        ); 
        setPessoas(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Erro ao carregar pessoas:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, [paginaApi, nomeUrl, idadeInicialUrl, idadeFinalUrl]); 

  
  const handleAplicarFiltros = (filtros) => {
    const novosParams = {
      nome: filtros.nome,
      idadeInicial: filtros.idadeInicial,
      idadeFinal: filtros.idadeFinal,
      page: '1', 
    };
    
   
    Object.keys(novosParams).forEach(key => {
      if (!novosParams[key]) {
        delete novosParams[key];
      }
    });

    setSearchParams(novosParams);
  };

  const handlePageChange = (novaPaginaApi) => {
    const novaPaginaUrl = novaPaginaApi + 1;
    setSearchParams(prevParams => {
      prevParams.set('page', novaPaginaUrl.toString());
      return prevParams;
    });
  };

  return (
    <div className="p-8 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-gold/90 mb-6 text-center">
        Polícia Judiciária Civil de Mato Grosso
      </h1>
      <img src={fotoPJCMT} alt="Brasão PJCMT" className="mx-auto mb-6" width="100" height="100" />
      <PainelEstatisticas />

      
      <Filtros
        onAplicarFiltros={handleAplicarFiltros}
        valoresIniciais={{
          nome: nomeUrl,
          idadeInicial: idadeInicialUrl,
          idadeFinal: idadeFinalUrl
        }}
      />

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
        <Paginacao 
          page={paginaApi}
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}