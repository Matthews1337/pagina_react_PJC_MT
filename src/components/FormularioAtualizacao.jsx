import { useState } from 'react';


export default function FormularioAtualizacao({ pessoaId, ocorrenciaId }) {

  const [informacao, setInformacao] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [arquivoAnexo, setArquivoAnexo] = useState(null); 
  const [descricaoAnexo, setDescricaoAnexo] = useState(''); 
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivoAnexo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting', message: 'Enviando...' });

 
    const formData = new FormData();

    formData.append('informacao', informacao);
    formData.append('data', data);
    formData.append('ocoId', ocorrenciaId || 0);

    if (arquivoAnexo) {
      formData.append('descricao', descricaoAnexo);

      formData.append('files', arquivoAnexo); 
    }
    try {
      const url = `https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta de erro do servidor:', errorText);
        throw new Error(`Erro do servidor: ${response.status} - ${response.statusText}`);
      }

      setStatus({ state: 'success', message: 'Dados atualizados com sucesso!' });
      setInformacao('');
      setArquivoAnexo(null);
      setDescricaoAnexo('');
      document.getElementById('anexo').value = '';

    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-950 p-6 rounded-xl shadow-lg mt-8 w-full">
      <h3 className="text-2xl font-bold text-gold mb-4">Adicionar Informação</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-400 mb-1">Data da Informação</label>
          <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-gold focus:border-gold" />
        </div>
        <div>
          <label htmlFor="informacao" className="block text-sm font-medium text-gray-400 mb-1">Observação</label>
          <textarea id="informacao" rows="4" value={informacao} onChange={(e) => setInformacao(e.target.value)} placeholder="Digite aqui qualquer informação relevante..." required className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-gold focus:border-gold"></textarea>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <label htmlFor="descricaoAnexo" className="block text-sm font-medium text-gray-400 mb-1">Descrição do Anexo</label>
          <input id="descricaoAnexo" type="text" value={descricaoAnexo} onChange={(e) => setDescricaoAnexo(e.target.value)} placeholder="Ex: Foto enviada por familiar" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-gold focus:border-gold" />
        </div>
        <div>
          <label htmlFor="anexo" className="block text-sm font-medium text-gray-400 mb-1">Anexar Foto</label>
          <input id="anexo" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30" />
        </div>
      </div>
      
      <button type="submit" disabled={status.state === 'submitting'} className="bg-gold p-2 rounded-xl shadow-lg mt-6 w-full text-white font-bold hover:bg-gold/90 disabled:bg-gray-500 disabled:cursor-not-allowed transition">
        {status.state === 'submitting' ? 'Enviando...' : 'Atualizar Dados'}
      </button>

      {status.state === 'success' && <p className="mt-4 text-center text-green-400">{status.message}</p>}
      {status.state === 'error' && <p className="mt-4 text-center text-red-400">{status.message}</p>}
    </form>
  );
}