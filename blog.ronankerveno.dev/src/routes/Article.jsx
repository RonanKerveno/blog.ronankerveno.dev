// Page Article gérant l'affichage de l'article séléctionné.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import ArticleView from "../components/ArticleView";
import Aside from "../components/Aside";

export default function Article() {
  // On se sert du hook useParams pour récupérer le slug de l'article à partir de l'URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // On déclare l'état (state) pour l'article, les derniers articles et les tags
  const [article, setArticle] = useState(null);

  // On récupère l'article correspondant au slug depuis l'API
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

    fetchData(); // Récupération des données de lartcile visé
  }, [navigate, slug]);

  return (
    <div className="flex justify-center gap-16">
      <section className="w-3/5 p-4">
        {article && (
          <ArticleView
            key={article.id}
            article={article}
            onTagClick={(tagId) => {
              navigate('/', {
                state: { selectedTagId: tagId },
              });
            }}
          />
        )}
      </section>
      <Aside />
    </div>
  );
}

