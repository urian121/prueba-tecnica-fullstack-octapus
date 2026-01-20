import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import { Inbox } from "lucide-react";
import AlertRow from "./AlertRow";
import { Outlet, useMatch } from "react-router";
import HeaderBar from "./HeaderBar";
import PaginationFooter from "./PaginationFooter";
import AlertsListSkeleton from "./skeleton/AlertsListSkeleton";
import HeaderBarSkeleton from "./skeleton/HeaderBarSkeleton";
import FiltroAlerts from "./FiltroAlerts";
import FiltroAlertsSkeleton from "./skeleton/FiltroAlertsSkeleton";
import AlertsHeaderSkeleton from "./skeleton/AlertsHeaderSkeleton";
import PaginationFooterSkeleton from "./skeleton/PaginationFooterSkeleton";

export default function GmailInbox() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ count: 0, next: null, previous: null });
  const PAGE_SIZE = 10;
  const [initialLoading, setInitialLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const isDetail = useMatch('/alerts/:id');
  const hasData = rows.length > 0;
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (isDesktop) setShowFilters(true);
    }
  }, []);

  const mapAlertsToRows = (alerts) => {
    return alerts.map((a) => ({
      id: a.id,
      title: a.title,
      severity: a.severity,
      status: a.status,
      createdAt: a.created_at,
    }));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const MIN_LOADING_MS = 200;
    const fetch = async () => {
      const start = Date.now();
      setLoading(true);
      try {
        const params = {};
        if (page) params.page = page;
        if (status) params.status = status;
        if (severity) params.severity = severity;
        if (debouncedSearch && debouncedSearch.length >= 2) params.search = debouncedSearch;
        const data = await getAlerts(params, { signal: controller.signal });
        const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setRows(mapAlertsToRows(items));
        setMeta({ count: data?.count ?? items.length, next: data?.next ?? null, previous: data?.previous ?? null });
      } catch {
        if (!controller.signal.aborted) {
          setRows([]);
          setMeta({ count: 0, next: null, previous: null });
        }
      } finally {
        const elapsed = Date.now() - start;
        const targetDelay = initialLoading ? Math.max(300, MIN_LOADING_MS) : MIN_LOADING_MS;
        if (elapsed < targetDelay) {
          await new Promise((r) => setTimeout(r, targetDelay - elapsed));
        }
        setLoading(false);
        if (initialLoading) setInitialLoading(false);
      }
    };
    fetch();
    return () => controller.abort();
  }, [page, status, severity, debouncedSearch, initialLoading]);

  return (
    <div className="min-h-screen bg-white">
      {initialLoading ? (
        <HeaderBarSkeleton />
      ) : (
        <HeaderBar
          search={search}
          onSearchChange={(val) => {
            setPage(1);
            setSearch(val);
          }}
          onToggleMenu={() => setShowFilters((v) => !v)}
          filtersCollapsed={!showFilters}
        />
      )}

      <div className="flex gap-6">
        {showFilters ? (
          <div className="fixed left-0 top-[56px] h-[calc(100vh-56px)] right-0 bg-black/20 z-20 md:hidden" onClick={() => setShowFilters(false)} />
        ) : null}
        <aside className={`block md:block fixed md:static left-0 top-[56px] md:top-0 z-30 h-[calc(100vh-56px)] md:min-h-screen shrink-0 bg-[#f8fafd] overflow-hidden transform transition-all duration-200 ease-out w-64 ${showFilters ? 'translate-x-0 md:w-64' : '-translate-x-full md:translate-x-0 md:w-16'}`}>
          {initialLoading ? (
            <FiltroAlertsSkeleton />
          ) : (
          <FiltroAlerts
            status={status}
            severity={severity}
            onChange={({ status: s, severity: v }) => {
              setPage(1);
              if (s !== undefined) setStatus(s);
              if (v !== undefined) setSeverity(v);
            }}
            collapsed={!showFilters}
          />
          )}
        </aside>
        <section className="flex-1">
          <div className="bg-white sm:px-1 py-3 min-h-[72vh]">
            {isDetail ? (
              <Outlet />
            ) : (
              <>
                {initialLoading ? (
                  <AlertsHeaderSkeleton />
                ) : hasData ? (
                  <div className="px-4 sm:px-6 py-3 text-sm font-semibold text-slate-600 grid grid-cols-12">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Severity</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Created At</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                ) : null}
                <div className="divide-y divide-slate-200">
                  {loading ? (
                    <AlertsListSkeleton rows={10} />
                  ) : !hasData ? (
                    <div className="px-4 sm:px-6 min-h-[40vh] py-20 flex flex-col items-center justify-center text-center">
                      <Inbox size={36} className="text-slate-400 mb-3" />
                      <div className="text-slate-500">No hay data</div>
                    </div>
                  ) : (
                    rows.map((row) => (
                      <AlertRow key={row.id} row={row} />
                    ))
                  )}
                </div>

                {loading ? (
                  <PaginationFooterSkeleton />
                ) : hasData ? (
                  <PaginationFooter
                    page={page}
                    count={meta.count}
                    pageSize={PAGE_SIZE}
                    hasPrev={Boolean(meta.previous)}
                    hasNext={Boolean(meta.next)}
                    onPrev={() => meta.previous && setPage((p) => Math.max(1, p - 1))}
                    onNext={() => meta.next && setPage((p) => p + 1)}
                  />
                ) : null}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
