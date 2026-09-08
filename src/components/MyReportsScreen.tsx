import { LostItemReport, FoundItemAsset } from '../types';
import { CreditCard, MapPin, Clock, Sparkles, Plus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MyReportsScreenProps {
  reports: LostItemReport[];
  foundItem: FoundItemAsset;
  onOpenReportModal: () => void;
  onOpenVerifyModal: (item: FoundItemAsset) => void;
  onInspectMatrix: () => void;
}

export function MyReportsScreen({
  reports,
  foundItem,
  onOpenReportModal,
  onOpenVerifyModal,
  onInspectMatrix,
}: MyReportsScreenProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Student Case Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Incident Reports</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track active investigations, AI match scoring, and safe recovery holding periods.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Incident Report</span>
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border-2 border-blue-500/80 rounded-2xl p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{report.name}</h3>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {report.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reported {report.reportedAt} • {report.building} ({report.subLocation})
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{report.matchConfidence || 89}% Match Found</span>
              </div>
            </div>

            {/* Ingested Match Note */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Matched with Campus Safety Item #{foundItem.id}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Found at {foundItem.foundLocation}. Custodian hold active at {foundItem.storageLocker}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onInspectMatrix}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  View Matrix
                </button>
                <button
                  onClick={() => onOpenVerifyModal(foundItem)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Verify Ownership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
