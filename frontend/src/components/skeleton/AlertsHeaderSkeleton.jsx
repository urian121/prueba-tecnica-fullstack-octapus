export default function AlertsHeaderSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-3 grid grid-cols-12 items-center gap-3 sm:gap-4">
      <div className="col-span-5 h-4 bg-slate-200 rounded animate-pulse w-2/3" />
      <div className="col-span-2 h-4 bg-slate-200 rounded animate-pulse w-3/4" />
      <div className="col-span-2 h-4 bg-slate-200 rounded animate-pulse w-3/4" />
      <div className="col-span-2 h-4 bg-slate-200 rounded animate-pulse w-2/3 ml-auto" />
      <div className="col-span-1 h-4 bg-slate-200 rounded animate-pulse w-6 ml-auto" />
    </div>
  );
}
