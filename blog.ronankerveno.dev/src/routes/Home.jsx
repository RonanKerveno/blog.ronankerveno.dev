import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { directus } from "../services/directus";
import ArticlePreview from "../components/ArticlePreview";
import IntroBanner from "../components/IntroBanner";
import TagFilter from "../components/TagFilter";

export default function Home() {
  // On utilise les hooks de react-router-dom pour récupérer la location et la fonction de navigation
  const location = useLocation();
  const navigate = useNavigate();

  // On cherche un éventuel tag initial depuis le state de la location
  const initialTagId = location.state?.selectedTagId;
  const selectedTagId = initialTagId ? initialTagId: null
  // Si un tag initial est présent on le charge dans un tableau, sinon on charge un tableau vide
  const initialSelectedTags = initialTagId ? [initialTagId] : [];

  // On déclare les états pour les articles, les catégories et les catégories sélectionnées
  const [articles, setArticles] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);

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
          return selectedTags.every((tag) =>
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

  // On recupère les catégories depuis l'API
  useEffect(() => {
    async function fetchTags() {
      const query = {
        fields: ['*', 'tags_id.*'],
      };
      const response = await directus.items('tags').readByQuery(query);
      setTags(response.data);
    }

    fetchTags();
  }, []);

  // On gère le clic sur une catégorie dans le filtre ou dans l'aperçu d'un article
  function handleTagClick(tagId, fromPreview = false) {
    // On cherche l'index de la catégorie dans les catégories sélectionnées
    const tagIndex = selectedTags.findIndex((tag) => tag === tagId);
  
    // Si la catégorie n'est pas déjà sélectionnée, on l'ajoute
    if (tagIndex === -1) {
      setSelectedTags([...selectedTags, tagId]);
    } else if (!fromPreview) { // Si la catégorie est déjà sélectionnée et le clic ne vient pas d'un aperçu d'article, on la retire
      const newselectedTags = [...selectedTags];
      newselectedTags.splice(tagIndex, 1);
      setSelectedTags(newselectedTags);
    }
  }
  
  // Rendu de Home
  return (
    <>
      {/* Composant pour afficher la bannière d'introduction */}
      <IntroBanner />
      <section>
        {/* Composant pour afficher le filtre de catégorie et les catégories sélectionnées */}
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
        {/* Affichage des aperçus des articles */}
        <div className="grid grid-cols-3 gap-5">
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
