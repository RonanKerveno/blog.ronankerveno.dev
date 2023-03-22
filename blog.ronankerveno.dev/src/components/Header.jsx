import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white mb-5">
      <nav className="w-2/3 mx-auto flex justify-between items-center">
        <div className='flex items-center gap-3'>
          <a href="/">
            <img src={logo} alt="Logo" className="h-16 w-auto m-2"/>
          </a>
          <div className="ml-2 font-bold text-xl">Web Dev & Linux</div>
        </div>
        <div className="flex text-lg gap-3 items-center">
          Recherche <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
      </nav>
    </header>
  );
}