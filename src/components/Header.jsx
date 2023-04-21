import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Hamburger from 'hamburger-react'
import logo from "../assets/logo.svg";

export default function Header() {
  // On définit l'état (state) pour stocker la valeur de la recherche
  const [searchQuery, setSearchQuery] = useState('');
  // On définit l'état (state) pour gérer la visibilité du champ de recherche (boolean)
  const [searchVisible, setSearchVisible] = useState(false);
  // On définit l'état pour gérer la visibilité du menu déroulant mobile (boolean)
  const [menuOpen, setMenuOpen] = useState(false);
  // On défini le Hook pour naviguer vers la page de recherche
  const navigate = useNavigate();
  // On défini la référence au champ de recherche
  const searchInputRef = useRef();
  // On utilise le hook location
  const location = useLocation();

  // useEffect lié à l'url en cours (location).
  useEffect(() => {
    // Quand ma location change (changement de page)
    // Je réinitialise le champ de recherche et ferme le menu
    setSearchQuery('');
    setSearchVisible(false);
    setMenuOpen(false);
  }, [location]);

  // Gestion de la recherche soumise par le form.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Si la valeur de la recherche n'est pas vide
    if (searchQuery.trim()) {
      // On redirige vers la page de recherche avec la valeur encodée dans l'URL
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
    // On force la fermeture du clavier (utile sur mobile)
    e.target.elements[0].blur();
  };

  // Gestion du changement de la valeur de la recherche (actualisation en temps réél)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
          {/* Logo et slogan */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-auto my-2 mr-2 lg:transform lg:transition-transform lg:duration-300 hover:scale-110 hover:rotate-3 cursor-pointer"
              onClick={() => {
                // On navigue vers Home en indiquant que le lien est interne à Home, pour forcer la réinitialistion des filtres
                // quand le logo est cliqué depuis Home.
                navigate('/', { state: { fromHome: true }, });
              }}
            />
            {/* Slogan */}
            <div className="hidden min-[330px]:block w-2/5 sm:w-auto font-bold text-xl">Web Dev & Linux</div>
          </div>
          {/* Menu déroulant pour les liens de navigation sur les petits écrans */}
          <div className="lg:hidden">
            {/* Composant fournit par hamburger-react */}
            <Hamburger
              // Etat d'ouverture (boolean)
              toggled={menuOpen}
              // Actions liées au clic (isOpen est un state boolean fournit par le composant)
              toggle={(isOpen) => {
                setMenuOpen(isOpen);
                setSearchVisible(isOpen);
              }}
            />
          </div>
          {/* Boutons de navigation contact et loupe en vue non mobile */}
          <div className="hidden lg:block relative">
            <div className="hidden lg:flex text-lg gap-4 items-center">
              {/* Bouton contact (vue non mobile) */}
              <Link
                to="/contact"
                className="hover:text-slate-300"
              >
                Contact
              </Link>
              {/* Bouton loupe pour la recherche (vue non mobile) */}
              <button onClick={handleSearchClick}>
                <MagnifyingGlassIcon className="h-5 w-5 hover:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
        {/* Menu de navigation mobile affiché si menuOpen est true */}
        <nav
          className={`transition-all duration-300 ease-in-out ${menuOpen ? "h-auto py-3" : "h-0 py-0"
            } lg:hidden overflow-hidden`}
        >
          {/* Bouton contact (vue mobile) */}
          <Link
            to="/contact"
            className="ml-1"
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
