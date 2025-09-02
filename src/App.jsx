import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 

const PaginaPessoas = lazy(() => import('./components/PaginaPessoas'));
const PaginaDetalhesPessoa = lazy(() => import('./components/PaginaDetalhesPessoa'));
const PaginaNaoEncontrada = lazy(() => import('./components/PaginaNaoEncontrada'));
import Footer from './components/Footer';


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
          <Route path="/lista_pessoas" element={<PaginaPessoas />} />
          <Route path="/pessoa/:id" element={<PaginaDetalhesPessoa />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
export default App;