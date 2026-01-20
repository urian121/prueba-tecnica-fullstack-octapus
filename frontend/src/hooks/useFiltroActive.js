import { useState } from "react"

export default function useFiltroActive({ status, severity }) {
  // Controla el grupo activo del filtro (severity | status)
  const [activeGroup, setActiveGroup] = useState("severity")

  // Determina si un item debe mostrarse activo según filtros y grupo actual
  const isActive = (type, value) => {
    if (type === "severity_all") return severity === null && activeGroup === "severity"
    if (type === "status_all") return status === null && activeGroup === "status"
    if (type === "severity") return severity === value
    if (type === "status") return status === value
    return false
  }

  // API del hook para consumo en el componente
  return { activeGroup, setActiveGroup, isActive }
}
