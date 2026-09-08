import { MATCH_MATRIX_VECTORS } from '../data/mockData';
import { Sparkles, X, ShieldCheck, Cpu, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface MatchMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToVerify: () => void;
}

export function MatchMatrixModal({ isOpen, onClose, onProceedToVerify }: MatchMatrixModalProps) {
  if (!isOpen) return null;

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
                <h3 className="font-bold text-sm sm:text-base">Neural Match Matrix Inspector</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                  89% CONFIDENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Correlating Report #LOST-NYU-8821 ↔ Found Asset #FND-NYU-7422
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
          {/* Summary Box */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold block text-sm mb-0.5">
                Deterministic Multi-Vector Evaluation
              </span>
              <p className="text-slate-600 text-[11px]">
                Matching achieved without camera photo by computing 14 physical, temporal, and
                micro-spatial cosine similarities.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-blue-700 font-mono">14 / 14</div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Vectors Aligned
              </span>
            </div>
          </div>

          {/* Vectors Breakdown List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Primary Vector Correlations
            </h4>

            <div className="space-y-2.5">
              {MATCH_MATRIX_VECTORS.map((vec) => (
                <div
                  key={vec.attribute}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs hover:bg-white hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>{vec.attribute}</span>
                      {vec.isPrivacyPreserved && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                          <Lock className="w-2.5 h-2.5" />
                          Zero-Knowledge
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">Weight: {vec.weight}</span>
                      <span className="font-mono font-bold text-emerald-600">{vec.score}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white/70 p-2 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-semibold">
                        Your Stated Vector:
                      </span>
                      <span className="font-medium text-slate-800">{vec.lostValue}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-semibold">
                        Campus Ingest Vector:
                      </span>
                      <span className="font-medium text-slate-800">{vec.foundValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FERPA protected audit hash</span>
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
