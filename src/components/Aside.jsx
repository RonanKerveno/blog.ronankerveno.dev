import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { directus } from '../services/directus';
import { Link } from 'react-router-dom';
import { useFetchTags } from "../hooks/useFetchTags";
import config from '../config';
import authorPic from "../assets/RK.jpg";
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { FaTag } from 'react-icons/fa';

// Composant Aside pour l'affichage des infos supplémentaires
export default function Aside() {
  // Hooks UseNavigate et useLocation
  const navigate = useNavigate();
  const location = useLocation();

  // On surveille l'url et on met le slug dans une variable si elle en contient.
  const currentSlug = location.pathname.match(/\/article\/([^/]+)/)?.[1];

  // On utilise un hook personnalisé pour récupérer les tags
  const tags = useFetchTags();

  // State gérant la liste des derniers articles.
  const [latestArticles, setLatestArticles] = useState([]);

  // UseEffect chargeant la liste des artcicles au démarrage
  useEffect(() => {
    // Fonction pour récupérer les derniers articles depuis l'API
    async function fetchLatestArticles() {
      // On affiche 3 artciles mon on n'en recupère 4 articles au cas ou l'article
      // en cours d'affichage fait partie de la liste des plus récents.
      const response = await directus.items("articles").readByQuery({
        fields: ["*", "user_created.*"],
        limit: 4,
        sort: "-date_created",
      });
      setLatestArticles(response.data);
    }
    fetchLatestArticles()
  }, []);

  return (
    <aside className="lg:w-[26%] xl:w-[23%] lg:flex-shrink-0">

      {/* Carte d'identification de l'auteur */}
      <section className="mb-10 lg:mt-4 bg-slate-100 p-2 rounded-lg">
        {/* Photo et présentation */}
        <div className="flex gap-4 mb-2 border-b-2 pb-2">
          <img src={authorPic} alt="RK" className="h-16 rounded-xl" />
          <div className="lg:text-sm">
            <p className="font-medium mb-1">Ronan Kerveno</p>
            <p className="text-sm lg:text-xs">Neo Web dev et Linuxien convaincu</p>
          </div>
        </div>
        {/* Liens de l'auteur */}
        <div className="flex justify-between pr-7 lg:pr-0 p-1 lg:p-0">
          {/* Site web de l'auteur */}
          <div className="lg:text-xs">
            <a
              href="https://ronankerveno.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-500 underline underline-offset-2 lg:no-underline"
            >
              ronankerveno.dev
            </a>
          </div>
          {/* Github de l'auteur */}
          <a
            href="https://github.com/RonanKerveno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-500 text-2xl lg:text-sm min-[1180px]:text-base"
          >
            <FaGithub />
          </a>
          {/* Linkedin de l'auteur */}
          <a
            href="https://www.linkedin.com/in/ronankerveno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-500 text-2xl lg:text-sm min-[1180px]:text-base"
          >
            <FaLinkedin />
          </a>
          {/* Contacter l'auteur */}
          <Link
            to="/contact"
            className="hover:text-slate-500 text-2xl lg:text-sm min-[1180px]:text-base"
          >
            <SiMinutemailer />
          </Link>
        </div>
      </section>

      {/* Affichage des derniers articles */}
      <section className="mb-10">
        <h2 className="text-xl lg:text-lg font-semibold mb-4">Derniers articles</h2>
        {latestArticles &&
          latestArticles
            // On retire l'article de la liste si son slug matche avec l'url.
            .filter((latestArticle) => latestArticle.slug !== currentSlug)
            // On recupère les 3 premiers articles de la liste.
            .slice(0, 3)
            .map((latestArticle) => (
              <div key={latestArticle.id} className="mb-2">
                {/* On crée un lien vers la page de l'article en utilisant son slug */}
                <Link
                  to={`/article/${latestArticle.slug}`}
                  className="flex gap-2"
                >
                  {/* Thumbnail de l'article */}
                  <img
                    src={`${config.ASSETS_URL}/${latestArticle.thumbnail}`}
                    alt="Description"
                    className='rounded-lg mb-2 w-1/2 transform transition-transform duration-300 hover:scale-105'
                  />
                  {/* Titre de l'article */}
                  <div
                    className="mb-2 py-4 lg:py-0 lg:text-xs min-[1180px]:text-sm text-slate-800 font-medium hover:text-slate-500"
                  >
                    {latestArticle.title}
                  </div>
                </Link>
              </div>
            ))}
      </section>

      {/* Affichage de tous les tags */}
      <section>
        <h2 className="text-xl lg:text-lg font-semibold mb-4">Tous les tags</h2>
        <div className="flex flex-wrap">
          {tags &&
            tags.map((tag) => (
              <div key={tag.id} className="mb-4 lg:mb-2 mr-5">
                <button
                  // Au clic sur le tag on redirige vers le Home en exportant l'id du tag pour activer le filtrage par tag.
                  onClick={() => {
                    navigate('/', {
                      state: { selectedTagId: tag.id },
                    });
                  }}
                  className="flex gap-1 items-center text-slate-900 hover:text-slate-500 lg:font-medium lg:text-sm min-[1180px]:text-base"
                >
                  <FaTag className="lg:text-sm" /> {tag.name}
                </button>
              </div>
            ))}
        </div>
      </section>
    </aside>
  );
}
