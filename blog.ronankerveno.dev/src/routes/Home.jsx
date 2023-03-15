import React, { useState, useEffect } from "react";
import { directus } from "../services/directus";
import ArticlePreview from "../components/ArticlePreview";

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [selectedTagData, setSelectedTagData] = useState({ id: null, name: null });

  useEffect(() => {
    async function fetchData() {
      const query = {
        fields: [
          "*",
          "user_created.*",
          "tags.tags_id.*",
        ],
        sort: "-date_created",
        ...(selectedTagData.id ? { filter: { "tags": { "tags_id": { "_eq": selectedTagData.id } } } } : {}),
      };
      const response = await directus.items("articles").readByQuery(query);
      setArticles(response.data);
    }

    fetchData();
  }, [selectedTagData.id]);

  return (
    <main>
      <section>
        {selectedTagData.name && (
            <>
              <h2>Articles de la catégorie {selectedTagData.name}</h2>
              <button onClick={() => setSelectedTagData({ id: null, name: null })}>
                Effacer le filtre
              </button>
            </>
          )}
        <div>
          {articles && articles.map((article) => (
            <ArticlePreview
              key={article.id}
              article={article}
              onTagClick={(tagId, tagName) => setSelectedTagData({ id: tagId, name: tagName })}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
