import useAlertsInbox from "../hooks/useAlertsInbox";
import { Inbox } from "lucide-react";
import AlertRow from "./AlertRow";
import { Outlet, useMatch } from "react-router";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import PaginationFooter from "./PaginationFooter";
import AlertsListSkeleton from "./skeleton/AlertsListSkeleton";
import HeaderBarSkeleton from "./skeleton/HeaderBarSkeleton";
import FiltroAlerts from "./FiltroAlerts";
import FiltroAlertsSkeleton from "./skeleton/FiltroAlertsSkeleton";
import AlertsHeaderSkeleton from "./skeleton/AlertsHeaderSkeleton";
import PaginationFooterSkeleton from "./skeleton/PaginationFooterSkeleton";

export default function GmailInbox() {
  const {
    rows,
    meta,
    loading,
    initialLoading,
    hasData,
    page,
    pageSize,
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
  } = useAlertsInbox();
  const isDetail = useMatch('/alerts/:id');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {initialLoading ? (
        <HeaderBarSkeleton />
      ) : (
        <HeaderBar
          search={search}
          onSearchChange={onSearchChange}
          onToggleMenu={toggleFiltersMenu}
          filtersCollapsed={!showFilters}
        />
      )}

      <div className="flex gap-6">
        {showFilters ? (
          <div className="fixed left-0 top-[56px] h-[calc(100vh-56px)] right-0 bg-black/20 z-20 md:hidden" onClick={closeFiltersMenu} />
        ) : null}
        <aside className={`block md:block fixed md:static left-0 top-[56px] md:top-0 z-30 h-[calc(100vh-56px)] md:min-h-screen shrink-0 bg-[#f8fafd] overflow-hidden transform transition-all duration-200 ease-out w-64 ${showFilters ? 'translate-x-0 md:w-64' : '-translate-x-full md:translate-x-0 md:w-16'}`}>
          {initialLoading ? (
            <FiltroAlertsSkeleton />
          ) : (
          <FiltroAlerts
            status={status}
            severity={severity}
            onChange={(payload) => {
              onFiltersChange(payload);
              if (isDetail) navigate('/');
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
                    pageSize={pageSize}
                    hasPrev={Boolean(meta.previous)}
                    hasNext={Boolean(meta.next)}
                    onPrev={onPrevPage}
                    onNext={onNextPage}
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
