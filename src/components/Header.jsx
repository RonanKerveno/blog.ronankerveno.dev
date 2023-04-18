import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { scrollToTop } from "../utils/scrollToTop"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Hamburger from 'hamburger-react'
import logo from "../assets/logo.svg";

export default function Header() {
  // On définit l'état (state) pour stocker la valeur de la recherche
  const [searchQuery, setSearchQuery] = useState('');
  // On définit l'état (state) pour gérer la visibilité du champ de recherche
  const [searchVisible, setSearchVisible] = useState(false);
  // On définit l'état pour gérer la visibilité du menu déroulant mobile
  const [menuOpen, setMenuOpen] = useState(false);
  // On défini le Hook pour naviguer vers la page de recherche
  const navigate = useNavigate();
  // On défini la référence au champ de recherche
  const searchInputRef = useRef();


  // Gestion de la recherche soumise par le form.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Si la valeur de la recherche n'est pas vide
    if (searchQuery.trim()) {
      // On redirige vers la page de recherche avec la valeur encodée dans l'URL
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      // On masque le champ de recherche et on ferme le menu déroulant.
      handleNavClick();
    }
  };

  // Gestion du changement de la valeur de la recherche (actualisation en temps réél)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavClick = () => {
    setSearchQuery('');
    setSearchVisible(false);
    setMenuOpen(false);
    scrollToTop();
  };

  // Clic sur la loupe
  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
    setMenuOpen(!menuOpen)
    // Focus sur champ de recherche pour pouvoir saisir directement.
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Rendu du header
  return (
    <header className="bg-slate-900 text-white mb-8">
      <div className="w-[94%] xl:w-[1230px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-5">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-auto my-2 mr-2 lg:transform lg:transition-transform lg:duration-300 hover:scale-110 hover:rotate-3 cursor-pointer"
              onClick={() => {
                handleNavClick();
                navigate('/', { state: { fromHome: true }, });
              }}
            />
            <div className="hidden min-[330px]:block w-2/5 sm:w-auto font-bold text-xl">Web Dev & Linux</div>
          </div>
          {/* Menu déroulant pour les liens de navigation sur les petits écrans */}
          <div className="lg:hidden">
            <Hamburger
              toggled={menuOpen}
              toggle={(isOpen) => {
                setMenuOpen(isOpen);
                setSearchVisible(isOpen);
              }}
            />
          </div>
          <div className="hidden lg:block relative">
            <div className="hidden lg:flex text-lg gap-4 items-center">
              <Link
                to="/contact"
                className="hover:text-slate-300"
                onClick={handleNavClick}
              >
                Contact
              </Link>
              <button onClick={handleSearchClick}>
                <MagnifyingGlassIcon className="h-5 w-5 hover:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
        {/* Afficher le menu de navigation mobile si menuOpen est true */}
        <nav
          className={`transition-all duration-300 ease-in-out ${menuOpen ? "h-auto py-3" : "h-0 py-0"
            } lg:hidden overflow-hidden`}
        >
          <Link
            to="/contact"
            className="ml-1"
            onClick={handleNavClick}
          >
            Contact
          </Link>
        </nav>
        {/* Champ de recherche, masqué par défaut */}
        <form
          onSubmit={handleSearchSubmit}
          className={`mb-2 transition-all ease-in-out ${searchVisible ? "h-auto py-3 mt-3" : "h-0 py-0 mt-0"
            } lg:flex items-center overflow-hidden`}
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Recherche"
            className="w-2/3 md:w-1/2 lg:w-1/3 text-slate-800 rounded-md px-1.5 py-1 ml-1"
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-400 text-white py-1 px-2 rounded-md text-sm ml-2"
          >
            OK
          </button>
        </form>
      </div>
    </header>
  );
};
