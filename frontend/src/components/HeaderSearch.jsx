import { Search } from "lucide-react";

export default function HeaderSearch({ placeholder = "Buscar alertas por título", value, onChange }) {
  return (
    <div className="hidden md:block relative max-w-[560px] sm:max-w-[680px]">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        className="w-full pl-12 pr-4 py-2.5 bg-[#e9eef6] rounded-full text-sm placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
