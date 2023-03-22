import config from '../config';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';

// Composant ArticlePreview pour afficher un aperçu d'un article avec ses catégories. Possibilité de filtrer par catégorie
export default function ArticlePreview({ article, handleTagClick }) {
  // On formate la date de création de l'article en utilisant la bibliothèque moment.js
  const createdDate = moment(article.date_created).format('DD MMMM YYYY');

  return (
    <div>
      {/* On crée un lien vers la page de l'article en utilisant son slug */}
      <Link to={`/article/${article.slug}`}>
        {/* Thumbnail de l'article */}
        <img src={`${config.ASSETS_URL}/${article.thumbnail}`} alt="Description" className='rounded-lg mb-2' />
        {/* Titre de l'article */}
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
      </Link>
      {/* Catégories (tags) de l'article */}
      <div className="flex gap-1 mb-2">
        {article.tags && article.tags.map((tag) => (
          <div key={tag.tags_id.id}>
            {/* Bouton pour chaque catégorie, qui déclenche la fonction handleCategoryClick */}
            <button
              onClick={() => handleTagClick(tag.tags_id.id, true)}
              className="rounded bg-slate-800 p-1.5 text-xs text-white"
            >
              {tag.tags_id.name}
            </button>
          </div>
        ))}
      </div>
      {/* Afficher l'extrait de l'article */}
      <p className="text-slate-600 text-sm my-2">{article.excerpt}</p>
      {/* Afficher la date de création de l'article */}
      <p className="text-sm">{createdDate}</p>
    </div>
  );
}
