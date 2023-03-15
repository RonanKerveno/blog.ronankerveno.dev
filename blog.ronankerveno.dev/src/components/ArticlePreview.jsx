import config from '../config';
import moment from 'moment';
import 'moment/locale/fr';


export default function ArticlePreview({ article, onTagClick }) {
  const createdDate = moment(article.date_created).format('DD MMMM YYYY');

  return (
    <div>
      <img src={`${config.ASSETS_URL}/${article.thumbnail}`} alt="Description" />
      <h2>{article.title}</h2>
          {article.tags && article.tags.map((tag) => (
            <div key={tag.tags_id.id}>
              <button onClick={() => onTagClick(tag.tags_id.id, tag.tags_id.name)}>
                {tag.tags_id.name}
              </button>
            </div>
          ))}
      <p>{article.excerpt}</p>
      <p>{createdDate}</p>
    </div>
  );
}