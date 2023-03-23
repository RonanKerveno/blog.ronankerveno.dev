import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import logo from "../assets/logo.svg";

export default function Header() {
  // On défini l'état (state) pour stocker la valeur de la recherche
  const [searchQuery, setSearchQuery] = useState('');
  // On défini l'état (state) pour gérer la visibilité du champ de recherche
  const [searchVisible, setSearchVisible] = useState(false);
  // On défini le Hook pour naviguer vers la page de recherche
  const navigate = useNavigate();

  // Gestion de la recherche soumise par le form.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Si la valeur de la recherche n'est pas vide
    if (searchQuery.trim()) {
      // On redirige vers la page de recherche avec la valeur encodée dans l'URL
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      // On masque le champ de recherche
      setSearchVisible(false);
    }
  };

  // Gestion du changement de la valeur de la recherche (actualisation en temps réél)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Basculer de la visibilité du champ de recherche
  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  // Gestion de l'appui sur une touche du clavier dans le champ de recherche
  const handleKeyDown = (e) => {
    // Si la touche appuyée est "Escape"
    if (e.key === 'Escape') {
      // Masquer le champ de recherche
      setSearchVisible(false);
    }
  };

  // Rendu du header
  return (
    <header className="bg-slate-900 text-white mb-8">
      <nav className="w-2/3 mx-auto flex justify-between items-center">
        <div className='flex items-center gap-3'>
          <a href="/">
            <img src={logo} alt="Logo" className="h-16 w-auto m-2" />
          </a>
          <div className="ml-2 font-bold text-xl">Web Dev & Linux</div>
        </div>
        <div className="relative">
          {searchVisible && (
            <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded-md shadow-md">
              <form onSubmit={handleSearchSubmit} className="flex text-lg gap-3 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Recherche"
                  className="rounded-md p-1"
                  onKeyDown={handleKeyDown}
                />
                <button type="submit" className="bg-slate-900 text-white py-1 px-2 rounded-md text-sm">
                  OK
                </button>
              </form>
            </div>
          )}
          <div className="flex text-lg gap-4 items-center">
            <a href="/contact">Contact</a>
            <button onClick={toggleSearchVisibility}>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
