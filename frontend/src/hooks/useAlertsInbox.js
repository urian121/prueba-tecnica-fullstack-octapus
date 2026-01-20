import { useEffect, useMemo, useState } from "react"
import { getAlerts } from "../services/api"

// Hook para centralizar el estado y la lógica del Inbox de alertas
export default function useAlertsInbox() {
  // Estado principal: lista, meta, carga, filtros, búsqueda y paginación
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState({ count: 0, next: null, previous: null })
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const [status, setStatus] = useState(null)
  const [severity, setSeverity] = useState(null)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const hasData = rows.length > 0

  // Mostrar filtros por defecto en desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches
      if (isDesktop) setShowFilters(true)
    }
  }, [])

  // Normaliza estructura de la API a filas renderizables
  const mapAlertsToRows = useMemo(
    () => (alerts) =>
      alerts.map((a) => ({
        id: a.id,
        title: a.title,
        severity: a.severity,
        status: a.status,
        createdAt: a.created_at,
      })),
    []
  )

  // Debounce de búsqueda (350ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 350)
    return () => clearTimeout(t)
  }, [search])

  // Carga de alertas con control de skeleton mínimo y cancelación
  useEffect(() => {
    const controller = new AbortController()
    const MIN_LOADING_MS = 200
    const fetch = async () => {
      const start = Date.now()
      setLoading(true)
      try {
        const params = {}
        if (page) params.page = page
        if (status) params.status = status
        if (severity) params.severity = severity
        if (debouncedSearch && debouncedSearch.length >= 2) params.search = debouncedSearch
        const data = await getAlerts(params, { signal: controller.signal })
        const items = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : []
        setRows(mapAlertsToRows(items))
        setMeta({
          count: data?.count ?? items.length,
          next: data?.next ?? null,
          previous: data?.previous ?? null,
        })
      } catch {
        if (!controller.signal.aborted) {
          setRows([])
          setMeta({ count: 0, next: null, previous: null })
        }
      } finally {
        const elapsed = Date.now() - start
        const targetDelay = initialLoading ? Math.max(300, MIN_LOADING_MS) : MIN_LOADING_MS
        if (elapsed < targetDelay) {
          await new Promise((r) => setTimeout(r, targetDelay - elapsed))
        }
        setLoading(false)
        if (initialLoading) setInitialLoading(false)
      }
    }
    fetch()
    return () => controller.abort()
  }, [page, status, severity, debouncedSearch, initialLoading, mapAlertsToRows])

  // Handlers: búsqueda, filtros, menú y paginación
  const onSearchChange = (val) => {
    setPage(1)
    setSearch(val)
  }

  const onFiltersChange = ({ status: s, severity: v }) => {
    setPage(1)
    if (s !== undefined) setStatus(s)
    if (v !== undefined) setSeverity(v)
  }

  const toggleFiltersMenu = () => setShowFilters((v) => !v)
  const closeFiltersMenu = () => setShowFilters(false)

  const onPrevPage = () => meta.previous && setPage((p) => Math.max(1, p - 1))
  const onNextPage = () => meta.next && setPage((p) => p + 1)

  return {
    rows,
    meta,
    loading,
    initialLoading,
    hasData,
    page,
    pageSize: PAGE_SIZE,
    status,
    severity,
    search,
    showFilters,
    onSearchChange,
    onFiltersChange,
    toggleFiltersMenu,
    closeFiltersMenu,
    onPrevPage,
    onNextPage,
  }
}
