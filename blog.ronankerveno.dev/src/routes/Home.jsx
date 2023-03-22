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

  // Récupérer les données du tag initial depuis le state de la location, s'il existe.
  const initialTag = location.state?.selectedTagData;

  // Initialise selectedTags en fonction de initialTag
  const initialSelectedTags = initialTag ? [{ id: initialTag.id, name: initialTag.name }] : [];

  // Déclarer les états pour les articles, le tag sélectionné, les catégories et les catégories sélectionnées.
  const [articles, setArticles] = useState(null);
  const selectedTagData = initialTag || { id: null, name: null };
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);

  // Récupérer les articles avec le filtre des tags sélectionnés et le tri par date de création décroissante
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

      // Appliquer un filtre basé sur le tag sélectionné, s'il y en a un
      if (selectedTagData.id) {
        query.filter = { "tags": { "tags_id": { "_eq": selectedTagData.id } } };
      }

      // Récupérer les articles depuis l'API
      const response = await directus.items("articles").readByQuery(query);

      // Filtrer les articles selon les tags sélectionnés
      if (selectedTags.length > 0) {
        const filteredArticles = response.data.filter((article) => {
          return selectedTags.every((tag) =>
            article.tags.some((articleTag) => articleTag.tags_id.id === tag.id)
          );
        });
        setArticles(filteredArticles);
      } else {
        setArticles(response.data);
      }
    }

    fetchData();
  }, [selectedTagData.id, selectedTags]);

  // Mettre à jour la location lorsque le tag sélectionné change, pour réinitialiser l'état
  useEffect(() => {
    if (location.state?.selectedTagData) {
      // Remplacer la location actuelle par la même URL, mais avec un état mis à jour
      navigate('/', { state: { selectedTagData: null }, replace: true });
    }
  }, [location.state?.selectedTagData, navigate]);

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    async function fetchtags() {
      const query = {
        fields: ['*', 'tags_id.*'],
      };
      const response = await directus.items('tags').readByQuery(query);
      setTags(response.data);
    }

    fetchtags();
  }, [initialTag]);

  // Fonction pour gérer le clic sur une catégorie dans le filtre ou dans l'aperçu d'un article
  function handleTagClick(tagId, tagName, fromPreview = false) {
    // Trouver l'index de la catégorie dans les catégories sélectionnées
    const tagIndex = selectedTags.findIndex(
      (tag) => tag.id === tagId
    );

    // Si la catégorie correspond à selectedTagData et qu'elle n'est pas déjà dans les catégories sélectionnées, on l'ajoute.
    if (selectedTagData.id === tagId && tagIndex === -1) {
      setSelectedTags([...selectedTags, { id: tagId, name: tagName }]);
    } else if (tagIndex === -1) { // Si la catégorie n'est pas déjà sélectionnée, on l'ajoute
      setSelectedTags([...selectedTags, { id: tagId, name: tagName }]);
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
        {/* Composant pour afficher le filtre de catégorie avec les catégories récupérées et les catégories sélectionnées */}
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
        {/* Grille pour afficher les aperçus des articles */}
        <div className="grid grid-cols-3 gap-5">
          {articles &&
            articles.map((article) => (
              // Composant pour afficher un aperçu d'article avec les catégories sélectionnées et la fonction handleTagClick
              <ArticlePreview
                key={article.id}
                article={article}
                selectedTags={selectedTags}
                handleTagClick={handleTagClick}
              />
            ))}
        </div>
      </section>
    </>
  );

}
