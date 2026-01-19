import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Twitter, Linkedin, Instagram, Globe, Bot } from 'lucide-react';
import { getAlertById, getAlertEvidences, updateEvidenceReview } from '../services/api';

export default function AlertDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [evidences, setEvidences] = useState([]);
  const formatDate = (v) => {
    try {
      return new Date(v).toLocaleString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return v ?? "";
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const detail = await getAlertById(id);
        setAlert(detail);
        const ev = await getAlertEvidences(id, 1);
        const items = Array.isArray(ev?.results) ? ev.results : Array.isArray(ev) ? ev : [];
        setEvidences(items);
      } catch {
        setAlert(null);
        setEvidences([]);
      }
    };
    fetch();
  }, [id]);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

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

  const toggleReviewed = async (evidenceId) => {
    const current = evidences.find(e => e.id === evidenceId);
    if (!current) return;
    const next = !current.is_reviewed;
    setEvidences(evidences.map(e => e.id === evidenceId ? { ...e, is_reviewed: next } : e));
    try {
      await updateEvidenceReview(evidenceId, next);
    } catch {
      setEvidences(evidences.map(e => e.id === evidenceId ? { ...e, is_reviewed: !next } : e));
    }
  };

  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 py-3 border-b flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium">
          <ArrowLeft size={20} />
          Back to alerts
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full border ${getStatusColor(alert?.status)}`}>{alert?.status?.replace('_', ' ').toUpperCase()}</span>
          <span className={`px-2.5 py-1 rounded-full text-white ${getSeverityColor(alert?.severity)}`}>{alert?.severity?.toUpperCase()}</span>
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
        {evidences.map((evidence) => (
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
    </div>
  );
}
