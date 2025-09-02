import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect } from 'vitest';

import PaginaPessoas from './components/PaginaPessoas';
import PaginaNaoEncontrada from './components/PaginaNaoEncontrada';

// Simulando o componente App que define as rotas
const App = () => (
  <Routes>
    <Route path="/lista_pessoas" element={<PaginaPessoas />} />
    <Route path="*" element={<PaginaNaoEncontrada />} />
  </Routes>
);

describe('Testes de Roteamento', () => {
  test('deve renderizar a página 404 para uma rota inexistente', () => {
    // Renderizamos o App dentro do MemoryRouter, apontando para uma rota que não existe
    render(
      <MemoryRouter initialEntries={['/rota-qualquer-que-nao-existe']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Página Não Encontrada')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});