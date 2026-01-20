export default function AlertsHeaderSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-3 text-sm font-semibold text-slate-600 grid grid-cols-12 min-w-[640px] md:min-w-0">
      <div className="col-span-5 min-w-[200px] h-4 bg-slate-200 rounded animate-pulse" />
      <div className="col-span-2 min-w-[100px] h-4 bg-slate-200 rounded animate-pulse" />
      <div className="col-span-2 min-w-[100px] h-4 bg-slate-200 rounded animate-pulse" />
      <div className="col-span-2 text-right min-w-[120px] h-4 bg-slate-200 rounded animate-pulse ml-auto" />
      <div className="col-span-1 text-right min-w-[80px] h-4 bg-slate-200 rounded animate-pulse ml-auto" />
    </div>
  );
}
