const Item = () => (
  <div className="w-full flex items-center gap-2 px-3 py-2.5 rounded-full">
    <div className="h-4 w-4 rounded-full bg-slate-200 animate-pulse" />
    <div className="h-4 flex-1 bg-slate-200 rounded animate-pulse" />
  </div>
);

export default function FiltroAlertsSkeleton() {
  return (
    <div className="p-2">
      <div className="mb-2 px-2">
        <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="space-y-1">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>

      <div className="mt-4 mb-2 px-2">
        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="space-y-1">
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
