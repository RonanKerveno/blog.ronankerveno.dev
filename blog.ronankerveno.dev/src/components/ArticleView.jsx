import config from '../config';
import Markdown from './Markdown';
import moment from 'moment';
import 'moment/locale/fr';

export default function ArticleView({ article, onTagClick }) {
  // On formate la date de création de l'article avec Moment.js pour qu'elle soit lisible
  const createdDate = moment(article.date_created).format('DD MMMM YYYY');

  return (
    <article>
      <h1 className="font-bold text-2xl mb-5">{article.title}</h1>
      <img src={`${config.ASSETS_URL}/${article.thumbnail}`} alt="Description" />
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
    </article>
  );
}
