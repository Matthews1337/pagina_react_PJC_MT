import React from "react";
import semPerfil from "../assets/sem_perfil.jpg";
import { Link } from 'react-router-dom';
import { useState } from 'react'; // Importe useState
import ImagemComFallback from './ImagemComFallback';


export default function CardPessoa({ pessoa }) {
  const { dataLocalizacao, encontradoVivo } = pessoa.ultimaOcorrencia || {};
  const isEncontrado = (encontradoVivo === true) || (encontradoVivo === false && dataLocalizacao != null);

  const statusTexto = isEncontrado ? 'Encontrado' : 'Desaparecido';
  const statusCor = isEncontrado ? 'bg-green-600' : 'bg-red-600';

  return (
    <Link to={`/pessoa/${pessoa.id}`} className="block">
      <div className="bg-gray-950 p-6 rounded-xl shadow-md h-full hover:shadow-xl hover:border hover:border-gold transition">
        <div className="relative mb-4">
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${statusCor} z-10`}>
            {statusTexto}
          </span>
          
          <ImagemComFallback
            src={pessoa.urlFoto}
            alt={pessoa.nome}
            className="w-full h-48 object-contain rounded-md"
          />
        </div>

        <h2 className="text-xl font-semibold text-gold/90 mb-2">
          {pessoa.nome}
        </h2>
        <p className="text-white text-sm">
          <span className="font-medium text-gray-500">Sexo:</span> {pessoa.sexo ?? "—"}
        </p>
        <p className="text-white text-sm">
          <span className="font-medium text-gray-500">Idade:</span> {pessoa.idade ?? "—"}
        </p>
        <p className="text-white text-sm">
          <span className="font-medium text-gray-500">Local do desaparecimento:</span>{" "}
          {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat ?? "Não informado"}
        </p>
      </div>
    </Link>
  );
}