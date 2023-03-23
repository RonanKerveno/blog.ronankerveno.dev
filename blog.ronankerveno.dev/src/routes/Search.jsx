import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { directus } from "../services/directus";
import ArticlePreview from "../components/ArticlePreview";

export default function Search() {
  // On récupère le paramètre 'query' de l'URL
  const { query } = useParams();
  // On initialise l'état (state) des articles
  const [articles, setArticles] = useState([]);

  // Fonction de récupération de données lors du montage du composant ou lorsque la valeur de 'query' change
  useEffect(() => {
    async function fetchData() {
      // On décode le paramètre 'query' pour obtenir la chaîne de recherche
      const searchQuery = decodeURIComponent(query);

      // On lance la recherche sur l'API (Note : _icontains permet d'ignorer la casse)
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

    fetchData();
  }, [query]);


  // Rendu de la page de recherche, on utilise le composant ArticlePreview pour afficher les articles trouvés.
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-5">Résultats de recherche pour : {decodeURIComponent(query)}</h2>
      <div className="grid grid-cols-3 gap-5">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticlePreview key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-3">
            <p>Aucun résultat trouvé pour : {decodeURIComponent(query)}</p>
          </div>
        )}
      </div>
    </div>

  );
}
