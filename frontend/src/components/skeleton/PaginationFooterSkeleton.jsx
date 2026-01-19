export default function PaginationFooterSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-3 flex items-center justify-end">
      <div className="flex items-center gap-2">
        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
        <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
