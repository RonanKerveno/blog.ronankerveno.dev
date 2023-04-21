// Page Article gérant l'affichage de l'article séléctionné.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import { Helmet } from 'react-helmet-async';
import defaultTitle from "../utils/defaultTitle";
import ArticleView from "../components/ArticleView";
import AsideLayout from "../layouts/Aside";

export default function Article() {
  // On se sert du hook useParams pour récupérer le slug de l'article à partir de l'URL
  const { slug } = useParams();
  // On utilise le hook useNavigate
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

    fetchData(); // Récupération des données de l'article visé
  }, [navigate, slug]);

  return (
    <>
      {/* Titre de page dynamique */}
      <Helmet>
        <title>{article ? article.title : defaultTitle}</title>
      </Helmet>
      <AsideLayout>
        {/* <section className="px-0 lg:w-2/3 xl:px-9 lg:py-4"> */}
        <section className="lg:w-2/3 lg:px-9 mb-4">
          {article && (
            <>
              <ArticleView
                key={article.id}
                article={article}
                onTagClick={(tagId) => {
                  navigate('/', {
                    state: { selectedTagId: tagId },
                  });
                }}
              />
            </>
          )}
        </section>
      </AsideLayout>
    </>
  );
}

