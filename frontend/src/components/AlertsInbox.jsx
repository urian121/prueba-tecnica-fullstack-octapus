import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
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
    const fetch = async () => {
      setLoading(true);
      setRows([]);
      try {
        const params = {};
        if (page) params.page = page;
        if (status) params.status = status;
        if (severity) params.severity = severity;
        if (search && search.trim().length >= 2) params.search = search.trim();
        const data = await getAlerts(params);
        const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setRows(mapAlertsToRows(items));
        setMeta({ count: data?.count ?? items.length, next: data?.next ?? null, previous: data?.previous ?? null });
      } catch {
        setRows([]);
        setMeta({ count: 0, next: null, previous: null });
      } finally {
        await new Promise((r) => setTimeout(r, 300));
        setLoading(false);
        if (initialLoading) setInitialLoading(false);
      }
    };
    fetch();
  }, [page, status, severity, search]);

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
        />
      )}

      <div className="flex gap-6">
        <aside className="shrink-0 w-64 bg-[#f8fafd] min-h-screen">
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
          />
          )}
        </aside>
        <section className="flex-1">
          <div className="bg-white sm:px-1 py-3 min-h-[72vh]">
            {useMatch('/alerts/:id') ? (
              <Outlet />
            ) : (
              <>
                {initialLoading ? (
                  <AlertsHeaderSkeleton />
                ) : (
                  <div className="px-4 sm:px-6 py-3 text-sm font-semibold text-slate-600 grid grid-cols-12">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Severity</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Created At</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                )}
                <div className="divide-y divide-slate-200">
                  {loading ? (
                    <AlertsListSkeleton rows={10} />
                  ) : (
                    rows.map((row) => (
                      <AlertRow key={row.id} row={row} />
                    ))
                  )}
                </div>

                {loading ? (
                  <PaginationFooterSkeleton />
                ) : (
                  <PaginationFooter
                    page={page}
                    count={meta.count}
                    pageSize={PAGE_SIZE}
                    hasPrev={Boolean(meta.previous)}
                    hasNext={Boolean(meta.next)}
                    onPrev={() => meta.previous && setPage((p) => Math.max(1, p - 1))}
                    onNext={() => meta.next && setPage((p) => p + 1)}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
