import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para pegar o ID da URL
import ImagemComFallback from './ImagemComFallback'; // 1. Importe o novo componente

export default function PaginaDetalhesPessoa() {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://abitus-api.geia.vip/v1/pessoas/${id}`);
        if (!response.ok) {
          throw new Error('Não foi possível carregar os dados da pessoa.');
        }
        const data = await response.json();
        setPessoa(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPessoa(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-xl text-white">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-xl text-red-500">Erro: {error}</div>;
  }

  if (!pessoa) {
    return <div className="text-center mt-10 text-xl text-white">Pessoa não encontrada.</div>;
  }

  const { dataLocalizacao, encontradoVivo } = pessoa.ultimaOcorrencia || {};
  const isEncontrado = (encontradoVivo === true) || (encontradoVivo === false && dataLocalizacao != null);

  let statusInfo = {
    texto: 'Desaparecido',
    cor: 'bg-red-500',
    detalhes: 'Ainda não localizado(a).'
  };

  if (isEncontrado) {
    statusInfo.texto = 'Encontrado';
    statusInfo.cor = 'bg-green-600';
    
    let detalhesEncontrado = '';
    if (encontradoVivo === true) {
      detalhesEncontrado = 'Localizado(a) com vida';
    } else {
      detalhesEncontrado = 'Localizado(a) sem vida';
    }

    if (dataLocalizacao) {
      const dataFormatada = new Date(dataLocalizacao).toLocaleDateString('pt-BR');
      detalhesEncontrado += ` em ${dataFormatada}.`;
    }
    
    statusInfo.detalhes = detalhesEncontrado;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-gold hover:underline mb-8 inline-block">&larr; Voltar para a lista</Link>
        
        <div className="bg-gray-950 p-6 rounded-xl shadow-lg md:flex md:gap-8">
          {/* <div className="md:w-1/3 text-center">
            <img 
              src={pessoa.urlFoto} 
              alt={pessoa.nome} 
              className="w-full h-auto object-cover rounded-lg mb-4 mx-auto" 
            />
          </div> */}
          <div className="md:w-1/3 text-center">
            <ImagemComFallback
              src={pessoa.urlFoto}
              alt={pessoa.nome}
              className="w-full h-auto object-cover rounded-lg mb-4 mx-auto"
            />
          </div>
          
          <div className="md:w-2/3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
                <span className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${statusInfo.cor} mb-2`}>
                    {statusInfo.texto}
                </span>
                <h1 className="text-4xl font-bold text-gold">{pessoa.nome}</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <p><span className="font-semibold text-gray-400">Idade:</span> {pessoa.idade} anos</p>
              <p><span className="font-semibold text-gray-400">Sexo:</span> {pessoa.sexo}</p>

              <p className="md:col-span-2">
                <span className="font-semibold text-gray-400">Status:</span> 
                {' '}{statusInfo.detalhes}
              </p>
              
              {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
                <p className="md:col-span-2">
                  <span className="font-semibold text-gray-400">Data do Desaparecimento:</span> 
                  {' '}{new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')}
                </p>
              )}

              <p className="md:col-span-2">
                <span className="font-semibold text-gray-400">Local do Desaparecimento:</span> 
                {' '}{pessoa.ultimaOcorrencia?.localDesaparecimentoConcat ?? 'Não informado'}
              </p>

              <p className="md:col-span-2">
                <span className="font-semibold text-gray-400">Vestimentas:</span> 
                {' '}{pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido ?? 'Não informado'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

