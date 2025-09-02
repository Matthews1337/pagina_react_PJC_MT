import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';

import PaginaDetalhesPessoa from './PaginaDetalhesPessoa';

// Mock da pessoa que a API deve retornar
const mockPessoaDetalhes = {
  id: 1,
  nome: 'Matheus Fonseca',
  idade: 28,
  sexo: 'Masculino',
  ultimaOcorrencia: {
    dtDesaparecimento: '2025-01-15T00:00:00',
    localDesaparecimentoConcat: 'Centro, Cuiabá',
  },
};

// Mock do 'fetch' global
global.fetch = vi.fn();

const TestWrapper = ({ children }) => (
  // Precisamos de uma rota que aceite o parâmetro :id
  <MemoryRouter initialEntries={['/pessoa/1']}>
    <Routes>
      <Route path="/pessoa/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('Testes para PaginaDetalhesPessoa', () => {

  test('deve exibir o estado de "Carregando..." e depois os detalhes da pessoa', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPessoaDetalhes),
    });

    render(<PaginaDetalhesPessoa />, { wrapper: TestWrapper });

    // Verifica o estado de loading
    expect(screen.getByText('Carregando...')).toBeInTheDocument();

    // Aguarda e verifica se o nome da pessoa apareceu
    expect(await screen.findByText('Matheus Fonseca')).toBeInTheDocument();
    expect(screen.getByText('28 anos')).toBeInTheDocument();
    expect(screen.getByText('Centro, Cuiabá')).toBeInTheDocument();
  });

  test('deve exibir uma mensagem de erro se a chamada à API falhar', async () => {
    fetch.mockResolvedValue({ ok: false });

    render(<PaginaDetalhesPessoa />, { wrapper: TestWrapper });
    
    // Aguarda e verifica se a mensagem de erro é exibida
    expect(await screen.findByText(/Erro: Não foi possível carregar os dados da pessoa./i)).toBeInTheDocument();
  });
});