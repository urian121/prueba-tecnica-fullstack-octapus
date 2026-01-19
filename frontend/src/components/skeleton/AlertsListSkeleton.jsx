export default function AlertsListSkeleton({ rows = 10 }) {
  const items = Array.from({ length: rows });
  return (
    <div className="animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="px-4 sm:px-6 py-4">
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-5">
              <div className="h-4 bg-slate-200 rounded w-3/5" />
            </div>
            <div className="col-span-2">
              <div className="h-5 bg-slate-200 rounded-full w-12" />
            </div>
            <div className="col-span-2">
              <div className="h-5 bg-slate-200 rounded-full w-20" />
            </div>
            <div className="col-span-2 text-right">
              <div className="ml-auto h-4 bg-slate-200 rounded w-16" />
            </div>
            <div className="col-span-1 text-right">
              <div className="ml-auto h-4 bg-slate-200 rounded w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
