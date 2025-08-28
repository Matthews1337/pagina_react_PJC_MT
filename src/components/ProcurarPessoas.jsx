import React, { useEffect, useState } from "react";
import { obterPessoasPorNome } from "../service/consultaPessoasService";

function ProcurarPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const dados = await obterPessoasPorNome();
        setPessoas(dados);
      } catch (err) {
        setError("Erro ao carregar pessoas");
      } finally {
        setLoading(false);
      }
    }
    carregarPessoas();
  }, []);

  if (loading)
    return <p className="text-blue-500 text-center">Carregando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-8 bg-grey-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Lista de Pessoas Desaparecidas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pessoas.map((pessoa) => (
          <div
            key={pessoa.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img src={pessoa.urlFoto} alt="" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {pessoa.nome}
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Idade:</span> {pessoa.idade ?? "—"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Local do desaparecimento:</span> {pessoa.ultimaOcorrencia.localDesaparecimentoConcat ?? "Não informado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPessoas;
