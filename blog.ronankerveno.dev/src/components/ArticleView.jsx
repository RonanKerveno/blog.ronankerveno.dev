import config from '../config';
import { Link } from 'react-router-dom';
import Markdown from './Markdown';
import moment from 'moment';
import 'moment/locale/fr';

export default function ArticleView({ article, onTagClick }) {
  // Formatez la date de création de l'article avec Moment.js pour qu'elle soit lisible
  const createdDate = moment(article.date_created).format('DD MMMM YYYY');

  return (
    <>
      {/* Ajoutez un lien vers l'article lui-même avec une image et le titre */}
      <Link to={`/article/${article.slug}`}>
        <img src={`${config.ASSETS_URL}/${article.thumbnail}`} alt="Description" />
        <h2>{article.title}</h2>
      </Link>
      {/* Affichez les tags de l'article sous forme de boutons cliquables */}
      {article.tags && article.tags.map((tag) => (
        <div key={tag.tags_id.id}>
          <button onClick={() => onTagClick && onTagClick(tag.tags_id.id)}>
            {tag.tags_id.name}
          </button>
        </div>
      ))}
      {/* Affichez la date de création de l'article */}
      <p>{createdDate}</p>
      {/* Affichez le contenu de l'article avec le composant Markdown */}
      <Markdown markdown={{ content: article.content }} />
    </>
  );
}
