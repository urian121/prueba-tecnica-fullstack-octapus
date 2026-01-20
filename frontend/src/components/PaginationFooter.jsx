import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationFooter({ page, count, pageSize, hasPrev, hasNext, onPrev, onNext }) {
  // Etiqueta tipo "inicio-fin de total" calculada con page y pageSize
  const label = count === 0 ? "0-0 de 0" : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, count)} de ${count}`;

  return (
    <div className="px-4 sm:px-6 py-3 flex items-center justify-end">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>{label}</span>
        {/* Botones prev/next: deshabilitados si no hay página anterior/siguiente */}
        <button
          onClick={hasPrev ? onPrev : undefined}
          className={`h-8 w-8 rounded-full flex items-center justify-center ${hasPrev ? "hover:bg-slate-100 hover:cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={hasNext ? onNext : undefined}
          className={`h-8 w-8 rounded-full flex items-center justify-center ${hasNext ? "hover:bg-slate-100 hover:cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
