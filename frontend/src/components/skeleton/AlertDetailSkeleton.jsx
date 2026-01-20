export default function AlertDetailSkeleton() {
  const items = Array.from({ length: 5 });
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 py-3 border-b flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-5 w-20 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4">
        <div className="h-7 bg-slate-200 rounded animate-pulse w-3/5 mb-2" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-44 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((_, i) => (
          <div key={i} className="px-4 sm:px-6 py-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="mt-1 h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-4 w-4 rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              </div>
              <div className="flex-shrink-0">
                <div className="h-5 w-12 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
