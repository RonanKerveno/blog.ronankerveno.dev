import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop"
import logoReact from "../assets/react-logo.svg";
import logoDirectus from "../assets/directus-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white text-sm py-4">
      <div className="w-[94%] xl:w-[1230px] mx-auto flex flex-col gap-7 md:flex-row justify-between items-center">
        <div>
          Propulsé par{' '}
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-slate-300 font-semibold"
          >
            React
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={logoReact} alt="Logo React" className="h-7 w-auto inline" />
          </a>
          et{' '}
          <a
            href="https://directus.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-slate-300 font-semibold"
          >
            Directus
          </a>
          <a href="https://directus.io" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={logoDirectus} alt="Logo Directus" className="h-7 w-auto inline" />
          </a>
        </div>
        <div>
          <Link
            to="/politique-confidentialite"
            className="text-white underline hover:text-slate-300"
            onClick={scrollToTop}
          >
            Politique de confidentialité
          </Link>
        </div>
        <div>
          &copy; {currentYear} <a
            href="https://ronankerveno.dev" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-slate-300">
            Ronan Kerveno
          </a>
        </div>
      </div>
    </footer>
  );
}
