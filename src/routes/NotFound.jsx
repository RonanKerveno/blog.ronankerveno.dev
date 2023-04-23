import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import AsideLayout from "../layouts/Aside";
import logo404 from "../assets/logo-404.svg";

export default function NotFound() {
  // On utilise le Hook UseNavigate
  const navigate = useNavigate();

  // Page 404
  return (
    <>
      {/* Titre de page */}
      <Helmet>
        <title>Page non trouvée</title>
      </Helmet>
      <AsideLayout>
        <section className="lg:w-2/3 mt-5">
          <h1 className="text-4xl font-bold mb-7">Page introuvable</h1>
          <p className="font-medium text-lg mb-4">
            Oups ! Il semble que la page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <p className="mb-24">
            Vous pouvez revenir à la page d'accueil ou lancer une recherche.
          </p>
          {/* Icône animée */}
          <img
            src={logo404}
            alt="Erreur 404"
            className="animate-bounce cursor-pointer"
            onClick={() => {
              navigate('/', { state: { fromHome: true }, });
            }}
          />
        </section>
      </AsideLayout>
    </>
  );
}
