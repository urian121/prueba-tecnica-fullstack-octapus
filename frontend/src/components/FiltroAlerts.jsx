import { useState } from "react";
import { Filter, AlertTriangle, TrendingUp, MinusCircle, TrendingDown, Menu, LockOpen, Loader, CheckCircle } from "lucide-react";
const itemBase = "w-full flex items-center gap-2 px-3 py-2.5 rounded-full text-sm hover:bg-slate-100 hover:cursor-pointer transition-colors";

function FiltroItem({ label, active, onClick, Icon, collapsed }) {
  const base = collapsed
    ? "w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 hover:cursor-pointer transition-colors"
    : itemBase;
  return (
    <button onClick={onClick} title={label} aria-label={label} className={`${base} ${active ? "bg-[#c2e7ff]" : ""}`}>
      {Icon ? <Icon size={collapsed ? 18 : 16} className="text-slate-600" /> : null}
      {collapsed ? null : <span className={`truncate ${active ? 'font-semibold' : ''}`}>{label}</span>}
    </button>
  );
}

export default function FiltroAlerts({ status, severity, onChange, collapsed = false }) {
  const [activeGroup, setActiveGroup] = useState("severity");
  const isActive = (type, value) => {
    if (type === "severity_all") return severity === null && activeGroup === "severity";
    if (type === "status_all") return status === null && activeGroup === "status";
    if (type === "severity") return severity === value;
    if (type === "status") return status === value;
    return false;
  };

  return (
    <div className={collapsed ? "py-2 flex flex-col items-center gap-2" : "p-2"}>
      {collapsed ? null : <div className="mb-2 px-2 text-xs font-semibold text-slate-600">Severidad</div>}
      <div className={collapsed ? "flex flex-col items-center gap-2" : "space-y-1"}>
        <FiltroItem collapsed={collapsed} Icon={Filter} label="All Severities" active={isActive("severity_all")} onClick={() => { setActiveGroup("severity"); onChange({ severity: null, status: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={AlertTriangle} label="Critical" active={isActive("severity", "critical")} onClick={() => { setActiveGroup("severity"); onChange({ severity: "critical", status: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={TrendingUp} label="High" active={isActive("severity", "high")} onClick={() => { setActiveGroup("severity"); onChange({ severity: "high", status: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={MinusCircle} label="Medium" active={isActive("severity", "medium")} onClick={() => { setActiveGroup("severity"); onChange({ severity: "medium", status: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={TrendingDown} label="Low" active={isActive("severity", "low")} onClick={() => { setActiveGroup("severity"); onChange({ severity: "low", status: null }); }} />
      </div>

      {collapsed ? null : <div className="mt-4 mb-2 px-2 text-xs font-semibold text-slate-600">Estado</div>}
      <div className={collapsed ? "mt-2 flex flex-col items-center gap-2" : "space-y-1"}>
        <FiltroItem collapsed={collapsed} Icon={Menu} label="All Statuses" active={isActive("status_all")} onClick={() => { setActiveGroup("status"); onChange({ status: null, severity: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={LockOpen} label="Open" active={isActive("status", "open")} onClick={() => { setActiveGroup("status"); onChange({ status: "open", severity: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={Loader} label="In Progress" active={isActive("status", "in_progress")} onClick={() => { setActiveGroup("status"); onChange({ status: "in_progress", severity: null }); }} />
        <FiltroItem collapsed={collapsed} Icon={CheckCircle} label="Closed" active={isActive("status", "closed")} onClick={() => { setActiveGroup("status"); onChange({ status: "closed", severity: null }); }} />
      </div>
    </div>
  );
}
