import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from "../services/directus";
import { Helmet } from 'react-helmet-async';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ArticlePreview from "../components/ArticlePreview";

// Page des résultats de Recherche
export default function Search() {
  // On récupère le paramètre 'query' de l'URL
  const { query } = useParams();
  // On initialise l'état (state) des articles
  const [articles, setArticles] = useState([]);
  // On définit l'état (state) pour stocker la valeur de la recherche
  const [searchValue, setSearchValue] = useState('');
  // On utilise le hook useNavigate
  const navigate = useNavigate();

  // On gère le clic sur une catégorie dans l'aperçu d'un article.
  // On va charger la page Home en passant la variable tagId.
  function handleTagClick(tagId) {
    navigate('/', {
      state: { selectedTagId: tagId },
    });
  }

  // Recherche des articles dans l'API
  useEffect(() => {
    async function fetchData(searchQuery) {

      // On lance la recherche (Note : _icontains permet d'ignorer la casse)
      const response = await directus.items("articles").readByQuery({
        fields: [
          "*",
          "user_created.*",
          "tags.tags_id.*",
        ],
        sort: "-date_created",
        filter: {
          _or: [
            { title: { _icontains: `%${searchQuery}%` } },
            { excerpt: { _icontains: `%${searchQuery}%` } },
            { content: { _icontains: `%${searchQuery}%` } },
            { tags: { tags_id: { name: { _icontains: `%${searchQuery}%` } } } },
          ],
        },
      });

      // On met à jour l'état (state) des articles avec les données récupérées
      setArticles(response.data);
    }

    if (query) {
      const searchQuery = decodeURIComponent(query);
      setSearchValue(searchQuery);
      fetchData(searchQuery);
    }
  }, [query]);

  // Gestion de la recherche soumise par le form.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Si la valeur de la recherche n'est pas vide
    if (searchValue.trim()) {
      navigate(`/search/${encodeURIComponent(searchValue.trim())}`);
    }
    // On force la fermeture du clavier (utile sur mobile)
    e.target.elements[0].blur();
  };

  // Gestion du changement de la valeur de la recherche (actualisation en temps réél)
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Rendu de la page de recherche, on utilise le composant ArticlePreview pour afficher les articles trouvés.
  return (
    <>
      <Helmet>
        <title>Résultats de recherche</title>
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold mb-5">Résultats de recherche</h2>
        {/* Ajout d'un champ de recherche intégré à la page pour plus d'ergonomie */}
        <form
          onSubmit={handleSearchSubmit}
          className="mb-10 flex justify-between items-center gap-1 border-2 rounded-md md:w-1/2 lg:w-1/3"
        >
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Recherche"
            className="text-slate-800 px-2 py-1 focus:outline-none flex-grow w-0"
          />
          <button
            type="submit"
            className="text-slate-200 hover:bg-slate-700 p-1 pb-1.5 border-2 rounded-md bg-slate-800"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
        {/* Affichage des résultats (previews d'articles) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticlePreview
                key={article.id}
                article={article}
                handleTagClick={handleTagClick}
              />
            ))
          ) : (
            <div className="col-span-3">
              <p>Aucun résultat trouvé pour : {decodeURIComponent(query)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
