import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/ScrollToTop"
import AsideLayout from "../layouts/Aside";
import logo404 from "../assets/logo-404.svg";

export default function NotFound() {
  const navigate = useNavigate();

  // Affichage de la page 404
  return (
    <AsideLayout>
      <section className="lg:w-2/3 mt-5">
        <h1 className="text-4xl font-bold mb-7">Page introuvable</h1>
        <p className="font-medium text-lg mb-4">
          Oops ! Il semble que la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <p className="mb-14">
          Vous pouvez revenir à la page d'accueil ou lancer une recherche.
        </p>
        <img
          src={logo404}
          alt="Erreur 404"
          className="w-40 animate-bounce cursor-pointer"
          onClick={() => {
            scrollToTop();
            navigate('/', { state: { fromHome: true }, });
          }}
        />
      </section>
    </AsideLayout>
  );
}
