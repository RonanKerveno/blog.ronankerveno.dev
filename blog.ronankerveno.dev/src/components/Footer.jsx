import { Link } from "react-router-dom";
import logoReact from "../assets/react-logo.svg";
import logoDirectus from "../assets/directus-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white text-sm py-4">
      <div className="w-2/3 mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          Propulsé par{' '}
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold"
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
            className="text-white font-semibold"
          >
            Directus
          </a>
          <a href="https://directus.io" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={logoDirectus} alt="Logo Directus" className="h-7 w-auto inline" />
          </a>
        </div>
        <div className="mb-4 sm:mb-0">
          <Link to="/politique-confidentialite" className="text-white underline">
            Politique de confidentialité
          </Link>
        </div>
        <div>
          &copy; {currentYear} <a 
            href="https://ronankerveno.dev" target="_blank" rel="noopener noreferrer" className="font-semibold">
            Ronan Kerveno
          </a>
        </div>
      </div>
    </footer>
  );
}
