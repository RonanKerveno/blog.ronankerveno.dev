import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import ArticleView from "../components/ArticleView";

// Composant Article gérant l'affichage de l'article séléctionné
export default function Article() {
  // On se sert du hook useParams pour récupérer le slug de l'article à partir de l'URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // On déclare l'état (state) pour l'article
  const [article, setArticle] = useState(null);

  // On recuềre l'article correspondant au slug depuis l'API
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

      // Si l'article n'est pas trouvé, on redirige vers la route 404
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
      {/* On affiche l'article s'il existe en appelant le composant ArticleView */}
      {article && (
        <ArticleView
          key={article.id}
          article={article}
          onTagClick={(tagId) => {
            // Au clic sur le tag on charge la page d'accueil avec le filtre du tag sélectionné
            navigate('/', {
              state: { selectedTagId: tagId },
            });
          }}
        />
      )}
    </section>
  );

}
