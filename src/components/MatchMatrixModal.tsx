import { Sparkles, X, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { LostItemReport, FoundItemAsset } from '../types';

interface MatchMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToVerify: () => void;
  lostReport: LostItemReport | null;
  foundItem: FoundItemAsset | null;
  matchScore: number; // 0-100
}

// Simple, honest per-field comparison — no fabricated vectors, just what the
// matching function actually compares (name/category/color/material/building).
function compareField(label: string, lostValue: string, foundValue: string) {
  const a = (lostValue || '').trim().toLowerCase();
  const b = (foundValue || '').trim().toLowerCase();
  let score = 20;
  if (a && b) {
    if (a === b) score = 100;
    else if (a.includes(b) || b.includes(a)) score = 65;
    else score = 30;
  }
  return { label, lostValue: lostValue || '—', foundValue: foundValue || '—', score };
}

export function MatchMatrixModal({
  isOpen,
  onClose,
  onProceedToVerify,
  lostReport,
  foundItem,
  matchScore,
}: MatchMatrixModalProps) {
  if (!isOpen) return null;

  if (!lostReport || !foundItem) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center space-y-3">
          <Cpu className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900">No match to inspect yet</h3>
          <p className="text-xs text-slate-500">
            Once your report matches an item in custody, its comparison will show up here.
          </p>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const comparisons = [
    compareField('Item Name', lostReport.name, foundItem.name),
    compareField('Category', lostReport.category, foundItem.category),
    compareField('Color', lostReport.color, foundItem.color),
    compareField('Material', lostReport.material, foundItem.material),
    compareField('Building', lostReport.building, foundItem.building),
  ];

  const roundedScore = Math.round(matchScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Match Comparison</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                  {roundedScore}% MATCH
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Comparing report #{lostReport.id} ↔ found item #{foundItem.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 text-xs text-blue-950">
            <span className="font-bold block text-sm mb-0.5">Field-by-field comparison</span>
            <p className="text-slate-600 text-[11px]">
              This is what the matching engine actually compared — the overall score is a
              weighted average of these fields' text similarity.
            </p>
          </div>

          <div className="space-y-2.5">
            {comparisons.map((c) => (
              <div
                key={c.label}
                className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs hover:bg-white hover:border-blue-200 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900">{c.label}</span>
                  <span className="font-mono font-bold text-emerald-600">{c.score}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white/70 p-2 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-semibold">
                      Your Report:
                    </span>
                    <span className="font-medium text-slate-800">{c.lostValue}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-semibold">
                      Found Item:
                    </span>
                    <span className="font-medium text-slate-800">{c.foundValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Identity checked at pickup, not here</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToVerify();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <span>Verify & Claim Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
