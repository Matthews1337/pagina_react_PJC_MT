import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 

const PaginaPessoas = lazy(() => import('./components/PaginaPessoas'));
const PaginaDetalhesPessoa = lazy(() => import('./components/PaginaDetalhesPessoa'));


const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
    Carregando...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<PaginaPessoas />} />
          <Route path="/pessoa/:id" element={<PaginaDetalhesPessoa />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;