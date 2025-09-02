import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

import PaginaPessoas from './PaginaPessoas';
import { obterPessoas } from '../service/ConsultaPessoasService';

// Mock do serviço de API
vi.mock('../service/ConsultaPessoasService');

// Mock Data
const mockPessoasMultiPage = {
  content: [{ id: 1, nome: 'Matheus Fonseca', idade: 28, ultimaOcorrencia: {} }],
  totalPages: 3,
};

const mockPessoasVazio = {
  content: [],
  totalPages: 0,
};

// Componente Wrapper para fornecer o contexto do Router
const TestWrapper = ({ children, initialEntries = ['/lista_pessoas'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/lista_pessoas" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('Testes para PaginaPessoas', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('deve renderizar os cards de pessoas em uma chamada bem-sucedida', async () => {
    obterPessoas.mockResolvedValue(mockPessoasMultiPage);
    render(<PaginaPessoas />, { wrapper: TestWrapper });

    // Verifica se o nome da pessoa do mock aparece na tela
    expect(await screen.findByText('Matheus Fonseca')).toBeInTheDocument();
  });

  test('deve chamar a API com o parâmetro de página correto ao clicar em "Próxima"', async () => {
    obterPessoas.mockResolvedValue(mockPessoasMultiPage);
    render(<PaginaPessoas />, { wrapper: TestWrapper });
    
    // Espera o carregamento inicial
    await screen.findByText('Matheus Fonseca');

    const botaoProxima = screen.getByRole('button', { name: /próxima/i });
    await userEvent.click(botaoProxima);

    await waitFor(() => {
      // A primeira chamada é com paginaApi = 0. A segunda, com paginaApi = 1.
      expect(obterPessoas).toHaveBeenCalledWith(1, 12, '', 0, 0);
    });
  });

  test('deve exibir a mensagem "Nenhuma pessoa encontrada" quando a API retorna uma lista vazia', async () => {
    obterPessoas.mockResolvedValue(mockPessoasVazio);
    render(<PaginaPessoas />, { wrapper: TestWrapper });

    // Verifica se a mensagem de feedback para lista vazia é exibida
    expect(await screen.findByText(/Nenhuma pessoa encontrada/i)).toBeInTheDocument();
  });
});