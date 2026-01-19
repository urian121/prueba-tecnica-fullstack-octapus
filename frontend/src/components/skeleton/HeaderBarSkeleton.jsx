export default function HeaderBarSkeleton() {
  return (
    <header className="sticky top-0 z-20 bg-[#f8fafd]">
      <div className="px-3 sm:px-6 py-3 flex items-center gap-3">
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="ml-23 flex-1">
          <div className="h-10 bg-slate-200 rounded-full animate-pulse max-w-[560px] sm:max-w-[680px]" />
        </div>
        <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-slate-200">
          <div className="h-full w-full bg-slate-200 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
