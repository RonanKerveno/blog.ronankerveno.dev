import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { directus } from "../services/directus";
import { useFetchTags } from "../hooks/useFetchTags";
import { Helmet } from 'react-helmet-async';
import defaultTitle from "../utils/defaultTitle";
import ArticlePreview from "../components/ArticlePreview";
import IntroBanner from "../components/IntroBanner";
import TagFilter from "../components/TagFilter";

export default function Home() {
  // On utilise les hooks de react-router-dom pour récupérer la location et la fonction de navigation
  const location = useLocation();
  const navigate = useNavigate();

  // On cherche un éventuel tag initial depuis le state de la location
  const initialTagId = location.state?.selectedTagId;
  const selectedTagId = initialTagId ? initialTagId : null
  // Si un tag initial est présent on le charge dans un tableau, sinon on charge un tableau vide
  const initialSelectedTags = initialTagId ? [initialTagId] : [];

  // On déclare les états pour les articles, les catégories et les catégories sélectionnées
  const [articles, setArticles] = useState(null);
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  const tagNb = selectedTags.length;
  // On utilise un hook personnalisé pour récupérer les tags
  const tags = useFetchTags();
  // On déclare l'état pour déclencher le scroll
  const [scrollToArticleList, setscrollToArticleList] = useState(false);

  // On crée une référence pour la barre de filtre
  const articleListRef = useRef(null);

  // On scrolle vers la barre de filtrage quand un filtre est activé ou quand on clique sur un tag à partir d'un ArticlePreview
  useEffect(() => {
    if (articleListRef.current && scrollToArticleList) {
      // On ajoute un setTimeout pour que le rendu des nouveaux articles se fasse avant le scroll
      const timer = setTimeout(() => {
        articleListRef.current.scrollIntoView({ behavior: "smooth" });
        setscrollToArticleList(false);
      }, 100);

      // Cleanup du timer
      return () => clearTimeout(timer);
    }
  }, [scrollToArticleList]);

  // On récupère les articles avec le filtre des tags sélectionnés et le tri par date de création décroissante
  useEffect(() => {
    async function fetchData() {
      const query = {
        fields: [
          "*",
          "user_created.*",
          "tags.tags_id.*",
        ],
        sort: "-date_created",
      };

      // On applique un filtre basé sur le tag sélectionné, s'il y en a un
      if (selectedTagId) {
        query.filter = { "tags": { "tags_id": { "_eq": selectedTagId } } };
      }

      // On recupère les articles depuis l'API
      const response = await directus.items("articles").readByQuery(query);

      // On filtre les articles selon les tags sélectionnés
      if (selectedTags.length > 0) {
        const filteredArticles = response.data.filter((article) => {
          return selectedTags.some((tag) =>
            article.tags.some((articleTag) => articleTag.tags_id.id === tag)
          );
        });
        setArticles(filteredArticles);
      } else {
        setArticles(response.data);
      }

    }

    fetchData();
  }, [selectedTagId, selectedTags]);

  // On met à jour la location lorsque le tag sélectionné change, pour réinitialiser l'état
  useEffect(() => {
    if (location.state?.selectedTagId) {
      // On remplace la location actuelle par la même URL mais avec un état mis à jour
      navigate('/', { state: { selectedTagId: null }, replace: true });
    }
  }, [location.state?.selectedTagId, navigate]);

  // On réinitialise les filtres lorsque la page est appelée depuis le lien interne.
  useEffect(() => {
    if (location.state?.fromHome) {
      setSelectedTags([]);
      navigate('/', { state: { fromHome: false }, replace: true });
    }
  }, [location.state?.fromHome, navigate]);


  // On gère le clic sur une catégorie dans le filtre ou dans l'aperçu d'un article
  function handleTagClick(tagId, fromPreview = false) {
    if (fromPreview) {
      // Si le clic vient d'un aperçu d'article on remplace les tags sélectionnés par le tag cliqué
      setSelectedTags([tagId]);
      // Et on lance le scroll
      setscrollToArticleList(true);
    } else {
      // On cherche l'index de la catégorie dans les catégories sélectionnées
      const tagIndex = selectedTags.findIndex((tag) => tag === tagId);

      // Si la catégorie n'est pas déjà sélectionnée, on l'ajoute
      if (tagIndex === -1) {
        setSelectedTags([...selectedTags, tagId]);
      } else { // Si la catégorie est déjà sélectionnée, on la retire
        const newselectedTags = [...selectedTags];
        newselectedTags.splice(tagIndex, 1);
        setSelectedTags(newselectedTags);
      }
    }
  }

  // Rendu de Home
  return (
    <>
      <Helmet>
        <title>{defaultTitle}</title>
      </Helmet>
      {/* Composant pour afficher la bannière d'introduction */}
      <IntroBanner />
      <section>
        <div ref={articleListRef} className="flex justify-center items-center py-4">
          <div className="border-b border-gray-400 flex-grow mr-4"></div>
          <h1 className="font-bold text-2xl">Liste des articles</h1>
          <div className="border-b border-gray-400 flex-grow ml-4"></div>
        </div>
        {/* Composant pour afficher le filtre de catégorie et les catégories sélectionnées */}
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
        <div
          className={`text-center mb-4 transition-all duration-300 ease-in-out ${tagNb > 0 ? 'opacity-100 max-h-[5rem] pb-2' : 'opacity-0 max-h-0 py-0'
            } overflow-hidden`}
        >
          <div className="font-medium">
            {tagNb === 0 ? (
              "Filtre désactivé"
            ) : (
              <>
                Filtre actif sur{' '}
                <span className="font-bold">{tagNb}</span>{' '}
                {tagNb === 1 ? 'tag' : 'tags'}{' '}
                <button
                  className="bg-slate-800 text-sm text-slate-100 py-1 px-3 rounded"
                  onClick={() => setSelectedTags([])}
                >
                  Réinitialiser
                </button>
              </>
            )}
          </div>
        </div>
        {/* Affichage des aperçus des articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles &&
            articles.map((article) => (
              // Composant pour afficher un aperçu d'article avec les catégories sélectionnées et la fonction handleTagClick
              <ArticlePreview
                key={article.id}
                article={article}
                handleTagClick={handleTagClick}
              />
            ))}
        </div>
      </section>
    </>
  );

}
