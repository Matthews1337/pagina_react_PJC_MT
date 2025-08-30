import React from "react";
import { FaLinkedin, FaGithub } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white p-4 text-center mt-auto">
      <p className="mb-2 text-gray-400">Desenvolvido por: Matheus Fonseca</p>
      <div className="flex justify-center items-center gap-6">
        
        <a 
          href="https://www.linkedin.com/in/matheus-fonseca1337/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 hover:text-gold transition duration-300"
        >
          <FaLinkedin size={24} /> 
          <span>Linkedin</span>
        </a>
        
        <a 
          href="https://github.com/Matthews1337" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 hover:text-gold transition duration-300"
        >
          <FaGithub size={24} /> 
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}