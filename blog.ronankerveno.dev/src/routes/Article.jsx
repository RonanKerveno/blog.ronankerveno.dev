import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import ArticleView from "../components/ArticleView";

// Composant Article pour afficher les détails d'un article
export default function Article() {
  // Utiliser le hook useParams pour récupérer le slug de l'article à partir de l'URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // Déclarer l'état pour l'article
  const [article, setArticle] = useState(null);

  // Récupérer l'article correspondant au slug depuis l'API Directus
  useEffect(() => {
    async function fetchData() {
      const response = await directus.items("articles").readByQuery({
        fields: [
          "*",
          "user_created.*",
          "tags.tags_id.*",
        ],
        filter: { "slug": { "_eq": slug } },
      });

      // Si l'article n'est pas trouvé, naviguer vers la page 404
      if (response.data.length === 0) {
        navigate('/not-found', { replace: true });
      } else {
        setArticle(response.data[0]);
      }
    }

    fetchData();
  }, [navigate, slug]);

  return (
    <section>
      {/* Afficher l'article si celui-ci existe */}
      {article && (
        <ArticleView
          key={article.id}
          article={article}
          onTagClick={(tagId) => {
            // Naviguer vers la page d'accueil avec le tag sélectionné
            navigate('/', {
              state: { selectedTagData: { id: tagId } },
            });
          }}
        />
      )}
    </section>
  );

}
