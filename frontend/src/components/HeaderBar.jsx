import avatar from "/imgs/perfil-urian.jpg";
import logo from "/imgs/logo.png";
import HeaderSearch from "./HeaderSearch";

export default function HeaderBar({ search, onSearchChange }) {
  return (
    <header className="sticky top-0 z-20 bg-[#f8fafd]">
      <div className="px-3 sm:px-6 py-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          Evidence Inbox
        </span>
        <div className="ml-10 flex-1">
          <HeaderSearch value={search} onChange={(e) => onSearchChange?.(e.target.value)} placeholder="Buscar alertas por título" />
        </div>
        <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-slate-200">
          <img src={avatar} alt="Perfil" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
