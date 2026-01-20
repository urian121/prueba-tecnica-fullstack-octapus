import avatar from "/imgs/perfil-urian.jpg";
import logo from "/imgs/logo.png";
import HeaderSearch from "./HeaderSearch";
import { Menu } from "lucide-react";

export default function HeaderBar({ search, onSearchChange, onToggleMenu, filtersCollapsed = false }) {
  return (
    <header className="sticky top-0 z-20 bg-[#f8fafd]">
      <div className="px-3 sm:px-2 py-3 flex items-center gap-3">
        <button
          type="button"
          aria-label="Abrir menú"
          className={`inline-flex items-center justify-center h-11 w-11 rounded-full hover:bg-gray-200 hover:cursor-pointer transition-colors ${filtersCollapsed ? 'bg-gray-200' : ''}`}
          onClick={onToggleMenu}
        >
          <Menu size={25} />
        </button>
        <span className="inline-flex items-center gap-2 text-sm sm:text-lg md:text-xl font-semibold text-slate-800">
          <a href="/" className="block h-8 w-auto">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </a>
          Evidence Inbox
        </span>
        <div className="ml-5 flex-1">
          <HeaderSearch value={search} onChange={(e) => onSearchChange?.(e.target.value)} placeholder="Buscar alertas por título" />
        </div>
        <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-slate-200">
          <img src={avatar} alt="Perfil" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
