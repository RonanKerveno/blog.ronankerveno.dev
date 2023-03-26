import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { directus } from '../services/directus';
import { Link } from 'react-router-dom';
import config from '../config';
import authorPic from "../assets/RK.jpg";
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { FaTag } from 'react-icons/fa';

// Composant Aside pour l'affichage des infos supplémentaires
export default function Aside() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchLatestArticles();
    fetchTags();
  }, []);

  return (
    <aside className="w-1/5 p-2">
      <section className="mb-10 mt-2 bg-slate-100 p-2 rounded-lg">
        <div className="flex gap-4 mb-2 border-b-2 pb-2">
          <img src={authorPic} alt="RK" className="h-16 rounded-xl" />
          <div className="text-sm">
            <p className='font-medium mb-1'>Ronan Kerveno</p>
            <p className="text-xs">Neo Web dev et Linuxien convaincu</p>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="text-xs">
            <a
              href="https://ronankerveno.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-500"
              title="Mon site web"
            >
              ronankerveno.dev
            </a>
          </div>
          <a
            href="https://github.com/RonanKerveno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-500"
            title="Mon GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ronankerveno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-500"
            title="Mon LinkedIn"
          >
            <FaLinkedin />
          </a>
          <Link to="/contact" className="hover:text-slate-500">
            <SiMinutemailer title="Formulaire de contact" />
          </Link>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Derniers articles</h2>
        {latestArticles &&
          latestArticles.map((latestArticle) => (
            <div key={latestArticle.id} className="mb-2">
              {/* On crée un lien vers la page de l'article en utilisant son slug */}
              <Link to={`/article/${latestArticle.slug}`} className="flex gap-2">
                {/* Thumbnail de l'article */}
                <img
                  src={`${config.ASSETS_URL}/${latestArticle.thumbnail}`}
                  alt="Description"
                  className='rounded-lg mb-2 w-1/2 h-auto transform transition-transform duration-300 hover:scale-105'
                  title="Voir l'article"
                />
                {/* Titre de l'article */}
                <div
                  className="mb-2 text-sm text-slate-800 font-medium"
                  title="Voir l'article"
                >
                  {latestArticle.title}
                </div>
              </Link>
            </div>
          ))}
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-4">Catégories</h2>
        {tags &&
          tags.map((tag) => (
            <div key={tag.id} className="mb-2">
              <button
                onClick={() => {
                  navigate('/', {
                    state: { selectedTagId: tag.id },
                  });
                }}
                className="flex gap-2 items-center text-slate-900 font-medium"
              >
                <FaTag className="text-sm" /> {tag.name}
              </button>
            </div>
          ))}
      </section>
    </aside>
  );
}
