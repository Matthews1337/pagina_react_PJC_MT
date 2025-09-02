import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import FormularioAtualizacao from './FormularioAtualizacao';

// Mock do 'fetch' global
global.fetch = vi.fn();

describe('Testes para FormularioAtualizacao', () => {

  test('deve preencher o formulário e submeter os dados corretamente', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });

    render(<FormularioAtualizacao pessoaId={1} ocorrenciaId={10} />);

    // Preenche os campos
    const inputObservacao = screen.getByPlaceholderText('Digite aqui qualquer informação relevante...');
    const botaoSubmit = screen.getByRole('button', { name: /Atualizar Dados/i });
    
    await userEvent.type(inputObservacao, 'Nova informação sobre o caso.');
    await userEvent.click(botaoSubmit);

    // Verifica se a API foi chamada
    expect(fetch).toHaveBeenCalled();

    // Verifica se a mensagem de sucesso é exibida
    expect(await screen.findByText('Dados atualizados com sucesso!')).toBeInTheDocument();
  });
});