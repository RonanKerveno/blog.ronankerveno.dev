import config from '../config';
import Markdown from './Markdown';
import moment from 'moment';
import 'moment/locale/fr';

export default function ArticleView({ article, onTagClick }) {
  // On formate la date de création de l'article avec Moment.js pour qu'elle soit lisible
  const createdDate = moment(article.date_created).format('DD MMMM YYYY');
  const updatedDate = moment(article.date_updated).format('DD MMMM YYYY');

  return (
    <article>
      <h1 className="font-bold text-4xl mb-5">{article.title}</h1>
      {/* Affichez la date de création de l'article */}
      <p className=' text-sm mb-2'>
        Publié le <span className="font-medium">{createdDate}</span>
        {article.date_updated && (
          <>.
            Mis à jour le <span className="font-medium">{updatedDate}</span>.
          </>
        )}
      </p>
      <img src={`${config.ASSETS_URL}/${article.thumbnail}`} alt="Description" className="mb-2" />
      {/* Affichez les tags de l'article sous forme de boutons cliquables */}
      <div className="flex gap-1 mb-7">
        {article.tags &&
          article.tags
            .sort((a, b) => a.tags_id.name.localeCompare(b.tags_id.name))
            .map((tag) => (
              <div key={tag.tags_id.id}>
                <button
                  onClick={() => onTagClick && onTagClick(tag.tags_id.id)}
                  className="rounded bg-black hover:bg-slate-600 p-1.5 text-xs text-white"
                >
                  {tag.tags_id.name}
                </button>
              </div>
            ))}
      </div>
      {/* Affichez le contenu de l'article avec le composant Markdown */}
      <Markdown
        markdown={{ content: article.content }}
        className="max-w-none prose prose-pre:p-0 prose-pre:bg-[#111B27]"
      />
    </article>
  );
}
