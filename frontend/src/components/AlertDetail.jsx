import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Twitter, Linkedin, Instagram, Globe, Bot } from 'lucide-react';
import useAlertDetail from '../hooks/useAlertDetail';
import { formatDate } from '../utils/date';
import { getStatusClasses, getSeverityFilledClasses } from '../utils/badges';
import PaginationFooter from './PaginationFooter';
import PaginationFooterSkeleton from './skeleton/PaginationFooterSkeleton';
import AlertDetailSkeleton from './skeleton/AlertDetailSkeleton';

export default function AlertDetail() {
  const { id } = useParams();
  const { alert, evidences, loading, evLoading, evPage, evMeta, pageSize, setEvPage, toggleReviewed } = useAlertDetail(id, 5);

  const getStatusColor = (status) => getStatusClasses(status);

  const getSourceIcon = (source) => {
    switch(source) {
      case 'twitter': return <Twitter size={18} className="text-blue-500" />;
      case 'linkedin': return <Linkedin size={18} className="text-blue-600" />;
      case 'instagram': return <Instagram size={18} className="text-pink-500" />;
      case 'web': return <Globe size={18} className="text-slate-600" />;
      case 'agent': return <Bot size={18} className="text-purple-600" />;
      default: return <Circle size={18} />;
    }
  };


  if (loading) return <AlertDetailSkeleton />;
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">
          <ArrowLeft size={20} />
          Back to alerts
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full ${getStatusColor(alert?.status)}`}>{alert?.status?.replace('_', ' ').toUpperCase()}</span>
          <span className={`px-2.5 py-1 rounded-full text-white ${getSeverityFilledClasses(alert?.severity)}`}>{alert?.severity?.toUpperCase()}</span>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">{alert?.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2"><span className="font-semibold">ID:</span> #{alert?.id}</span>
          <span>•</span>
          <span className="flex items-center gap-2"><span className="font-semibold">Created:</span> {alert?.created_at ? formatDate(alert.created_at) : ""}</span>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {evLoading ? (
          Array.from({ length: pageSize }).map((_, i) => (
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
          ))
        ) : evidences.map((evidence) => (
          <div key={evidence.id} className="px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-4 text-sm">
              <button onClick={() => toggleReviewed(evidence.id)} className="mt-1 flex-shrink-0">
                {evidence.is_reviewed ? (
                  <CheckCircle className="text-green-500" size={18} />
                ) : (
                  <Circle className="text-slate-300 hover:text-slate-400" size={18} />
                )}
              </button>
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 text-sm">
                  {getSourceIcon(evidence.source)}
                  <span className="font-semibold text-slate-700 capitalize">{evidence.source}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{formatDate(evidence.created_at)}</span>
                  {evidence.is_reviewed && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-green-600 font-medium">✓ Reviewed</span>
                    </>
                  )}
                </div>
                <p className={`text-sm text-slate-700 ${evidence.is_reviewed ? 'line-through opacity-60' : ''}`}>{evidence.summary}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">#{evidence.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {evLoading ? (
        <PaginationFooterSkeleton />
      ) : evMeta.count > 0 ? (
        <PaginationFooter
          page={evPage}
          count={evMeta.count}
          pageSize={pageSize}
          hasPrev={Boolean(evMeta.previous)}
          hasNext={Boolean(evMeta.next)}
          onPrev={() => evMeta.previous && setEvPage((p) => Math.max(1, p - 1))}
          onNext={() => evMeta.next && setEvPage((p) => p + 1)}
        />
      ) : null}
    </div>
  );
}
