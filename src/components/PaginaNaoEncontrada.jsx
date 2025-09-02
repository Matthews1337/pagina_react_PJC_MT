import { Link } from 'react-router-dom';

export default function PaginaNaoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4">
      <h1 className="text-6xl font-bold text-gold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Página Não Encontrada</h2>
      <p className="text-gray-400 mb-8">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold/80 transition-colors"
      >
        Voltar para página inicial
      </Link>
    </div>
  );
}