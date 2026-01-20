import { useEffect, useState } from 'react'
import { getAlertById, getAlertEvidences, updateEvidenceReview } from '../services/api'

export default function useAlertDetail(id, pageSize = 5) {
  const [alert, setAlert] = useState(null)
  const [evidences, setEvidences] = useState([])
  const [loading, setLoading] = useState(true)
  const [evLoading, setEvLoading] = useState(false)
  const [evPage, setEvPage] = useState(1)
  const [evMeta, setEvMeta] = useState({ count: 0, next: null, previous: null })

  // Carga paginada de evidencias con control de skeleton mínimo y meta
  const loadEvidences = async (page) => {
    const MIN_LOADING_MS = 250
    const start = Date.now()
    setEvLoading(true)
    try {
      const ev = await getAlertEvidences(id, page, pageSize)
      const items = Array.isArray(ev?.results) ? ev.results : Array.isArray(ev) ? ev : []
      setEvidences(items)
      setEvMeta({ count: ev?.count ?? evMeta.count, next: ev?.next ?? null, previous: ev?.previous ?? null })
    } catch {
      setEvidences([])
      setEvMeta({ count: 0, next: null, previous: null })
    } finally {
      const elapsed = Date.now() - start
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed))
      }
      setEvLoading(false)
    }
  }

  // Carga inicial: obtiene detalle y primera página de evidencias
  useEffect(() => {
    const fetch = async () => {
      const MIN_LOADING_MS = 350
      const start = Date.now()
      setLoading(true)
      try {
        const detail = await getAlertById(id)
        setAlert(detail)
        const ev = await getAlertEvidences(id, 1, pageSize)
        const items = Array.isArray(ev?.results) ? ev.results : Array.isArray(ev) ? ev : []
        setEvidences(items)
        setEvMeta({ count: ev?.count ?? items.length, next: ev?.next ?? null, previous: ev?.previous ?? null })
        setEvPage(1)
      } catch {
        setAlert(null)
        setEvidences([])
        setEvMeta({ count: 0, next: null, previous: null })
        setEvPage(1)
      } finally {
        const elapsed = Date.now() - start
        if (elapsed < MIN_LOADING_MS) {
          await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed))
        }
        setLoading(false)
      }
    }
    if (id) fetch()
  }, [id, pageSize])

  // Paginación: al cambiar evPage se trae la página correspondiente de evidencias
  useEffect(() => {
    if (!loading && id) loadEvidences(evPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evPage])

  // Toggle optimista del estado "is_reviewed" con rollback si la API falla
  const toggleReviewed = async (evidenceId) => {
    const current = evidences.find(e => e.id === evidenceId)
    if (!current) return
    const next = !current.is_reviewed
    setEvidences(evidences.map(e => e.id === evidenceId ? { ...e, is_reviewed: next } : e))
    try {
      await updateEvidenceReview(evidenceId, next)
    } catch {
      setEvidences(evidences.map(e => e.id === evidenceId ? { ...e, is_reviewed: !next } : e))
    }
  }

  return { alert, evidences, loading, evLoading, evPage, evMeta, pageSize, setEvPage, toggleReviewed }
}
