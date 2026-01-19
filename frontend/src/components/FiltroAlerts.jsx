import { useState } from "react";
import { Filter, AlertTriangle, TrendingUp, MinusCircle, TrendingDown, Menu, LockOpen, Loader, CheckCircle } from "lucide-react";
const itemBase = "w-full flex items-center gap-2 px-3 py-2.5 rounded-full text-sm hover:bg-slate-100 hover:cursor-pointer transition-colors";

function FiltroItem({ label, active, onClick, Icon }) {
  return (
    <button onClick={onClick} className={`${itemBase} ${active ? "bg-[#c2e7ff]" : ""}`}>
      {Icon ? <Icon size={16} className="text-slate-600" /> : null}
      <span className="truncate">{label}</span>
    </button>
  );
}

export default function FiltroAlerts({ status, severity, onChange }) {
  const [allFocus, setAllFocus] = useState("severity");
  const isActive = (type, value) => {
    if (type === "status") return status === value;
    if (type === "severity") return severity === value;
    if (type === "all_severity") return severity === null && allFocus === "severity";
    if (type === "all_status") return status === null && allFocus === "status";
    return false;
  };

  return (
    <div className="p-2">
      <div className="mb-2 px-2 text-xs font-semibold text-slate-600">Severidad</div>
      <div className="space-y-1">
        <FiltroItem Icon={Filter} label="All Severities" active={isActive("all_severity", null)} onClick={() => { setAllFocus("severity"); onChange({ status: null, severity: null }); }} />
        <FiltroItem Icon={AlertTriangle} label="Critical" active={isActive("severity", "critical")} onClick={() => onChange({ status: null, severity: "critical" })} />
        <FiltroItem Icon={TrendingUp} label="High" active={isActive("severity", "high")} onClick={() => onChange({ status: null, severity: "high" })} />
        <FiltroItem Icon={MinusCircle} label="Medium" active={isActive("severity", "medium")} onClick={() => onChange({ status: null, severity: "medium" })} />
        <FiltroItem Icon={TrendingDown} label="Low" active={isActive("severity", "low")} onClick={() => onChange({ status: null, severity: "low" })} />
      </div>

      <div className="mt-4 mb-2 px-2 text-xs font-semibold text-slate-600">Estado</div>
      <div className="space-y-1">
        <FiltroItem Icon={Menu} label="All Statuses" active={isActive("all_status", null)} onClick={() => { setAllFocus("status"); onChange({ status: null, severity: null }); }} />
        <FiltroItem Icon={LockOpen} label="Open" active={isActive("status", "open")} onClick={() => onChange({ status: "open", severity: null })} />
        <FiltroItem Icon={Loader} label="In Progress" active={isActive("status", "in_progress")} onClick={() => onChange({ status: "in_progress", severity: null })} />
        <FiltroItem Icon={CheckCircle} label="Closed" active={isActive("status", "closed")} onClick={() => onChange({ status: "closed", severity: null })} />
      </div>
    </div>
  );
}
