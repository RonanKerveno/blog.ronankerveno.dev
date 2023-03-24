// Page Article gérant l'affichage de l'article séléctionné.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import ArticleView from "../components/ArticleView";

export default function Article() {
  // On se sert du hook useParams pour récupérer le slug de l'article à partir de l'URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // On déclare l'état (state) pour l'article, les derniers articles et les tags
  const [article, setArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [tags, setTags] = useState([]);

  // Fonction pour récupérer les derniers articles depuis l'API
  async function fetchLatestArticles() {
    const response = await directus.items("articles").readByQuery({
      fields: ["*", "user_created.*"],
      limit: 3,
      sort: "-date_created",
    });
    setLatestArticles(response.data);
  }

  // Fonction pour récupérer les tags depuis l'API
  async function fetchTags() {
    const response = await directus.items("tags").readByQuery({
      fields: ["*", "tags_id.*"],
    });
    setTags(response.data);
  }

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
    fetchLatestArticles(); // On appelle la fonction pour récupérer les dernier articles
    fetchTags(); // On appelle la fonction pour récupérer les tags
  }, [navigate, slug]);

  return (
    <div className="flex justify-center gap-10">
      <section className="w-3/5">
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
      <aside className="w-fit">
        <h2>Derniers articles</h2>
        {latestArticles &&
          latestArticles.map((latestArticle) => (
            <div key={latestArticle.id} className="mb-2">
              <a
                href={`/article/${latestArticle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/article/${latestArticle.slug}`);
                }}
              >
                {latestArticle.title}
              </a>
            </div>
          ))}
        <h2>Catégories</h2>
        {tags &&
          tags.map((tag) => (
            <div key={tag.id} className="mb-2">
              <button
                onClick={() => {
                  navigate('/', {
                    state: { selectedTagId: tag.id },
                  });
                }}
              >
                {tag.name}
              </button>
            </div>
          ))}
      </aside>
    </div>
  );
}

