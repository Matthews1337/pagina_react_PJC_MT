import api from "./api";


// export async function obterPessoas(pagina = 0, porPagina = 10, nome = "") {
//   let url = `https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?pagina=${pagina}&porPagina=${porPagina}`;
  
//   if (nome) {
//     url += `&nome=${encodeURIComponent(nome)}`;
//   }

//   const resposta = await api.get(url);
//   return resposta.data;
// }

export async function obterPessoas(
  pagina = 0, 
  porPagina = 12, 
  nome = "", 
  faixaIdadeInicial = 0, 
  faixaIdadeFinal = 0
) {
  let url = `https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?pagina=${pagina}&porPagina=${porPagina}`;
  
  if (nome) {
    url += `&nome=${encodeURIComponent(nome)}`;
  }

  // Adiciona os parâmetros de idade à URL se eles forem fornecidos e maiores que 0
  if (faixaIdadeInicial > 0) {
    url += `&faixaIdadeInicial=${faixaIdadeInicial}`;
  }

  if (faixaIdadeFinal > 0) {
    url += `&faixaIdadeFinal=${faixaIdadeFinal}`;
  }

  const resposta = await api.get(url);
  return resposta.data;
}


export async function obterPessoasPorNome(nome) {
    let nome_tratado = nome.replace(" ", "%20").toLowerCase();
    let url = `https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?nome=${nome_tratado}`
    const response = await api.get(url);
    return response.data;
}

export async function obterPessoasPorNomeEFaixaEtaria(nome, faixaIdadeInicial, faixaIdadeFinal) {
    let url = `https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?nome=${nome}&faixaIdadeInicial=${faixaIdadeInicial}&faixaIdadeFinal=${faixaIdadeFinal}&pagina=0&porPagina=10`
    const response = await api.get(url);
    return response.data;
}

export async function obterEstatisticas() {
  const url = 'https://abitus-api.geia.vip/v1/pessoas/aberto/estatistico';
  try {
    const resposta = await api.get(url);
    return resposta.data; 
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return { quantPessoasDesaparecidas: 0, quantPessoasEncontradas: 0 };
  }
}