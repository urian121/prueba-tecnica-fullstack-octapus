// Importando las funciones de utilidad para generar las clases de los badges
import { getSeverityClasses, getStatusClasses } from "../utils/badges";
import { formatDateDay } from "../utils/date";
import { Link } from "react-router";
import { Eye } from "lucide-react";

export default function AlertRow({ row }) {
  return (
    <div className="px-4 sm:px-6 py-3 hover:bg-slate-50 min-w-[640px] md:min-w-0">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-5 text-sm truncate min-w-[200px]">{row.title}</div>
        <div className="col-span-2 min-w-[100px]">
          <span className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap ${getSeverityClasses(row.severity)}`}>
            {row.severity?.toUpperCase()}
          </span>
        </div>
        <div className="col-span-2 min-w-[100px]">
          <span className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap ${getStatusClasses(row.status)}`}>
            {row.status?.replace("_", " ").toUpperCase()}
          </span>
        </div>
        <div className="col-span-2 text-slate-600 text-sm text-right min-w-[120px] whitespace-nowrap">
          {formatDateDay(row.createdAt)}
        </div>
        <div className="col-span-1 text-right min-w-[80px]">
          <Link to={`/alerts/${row.id}`} className="group inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline underline-offset-2">
            <Eye size={14} className="text-blue-600 group-hover:text-black transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
