import { useState, FormEvent } from 'react';
import { ShieldCheck, KeyRound, CheckCircle2, QrCode, Search, RefreshCw, AlertCircle } from 'lucide-react';

export function AdminPortal() {
  const [pinInput, setPinInput] = useState('');
  const [pinResult, setPinResult] = useState<string | null>(null);

  const handleTestPin = (e: FormEvent) => {
    e.preventDefault();
    if (pinInput.replace(/[^0-9]/g, '') === '839210') {
      setPinResult('SUCCESS: Locker #B-19 UNLOCKED. Custody transferred to Alex (Node #NYU-99420).');
    } else {
      setPinResult('ERROR: Invalid or expired PIN. Please verify claimant identification card.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      <div className="border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold mb-2">
            STAFF DISPATCH CONSOLE
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Safety Desk Terminal
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Station: Bobst Library Security Safe Point #2 • Operator: Officer Perez (Badge #3104)
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Vault Protocol Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Locker Release PIN validator */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <KeyRound className="w-5 h-5 text-blue-600" />
            <span>Smart Locker Terminal</span>
          </div>
          <p className="text-xs text-slate-500">
            Enter the student's 6-digit one-time retrieval PIN to release holding bin.
          </p>

          <form onSubmit={handleTestPin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Claimant Retrieval PIN
              </label>
              <input
                type="text"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Try: 839-210"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono tracking-widest text-slate-900 font-bold focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[10px] text-slate-400">
                Alex's verified test PIN is 839-210
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm"
            >
              Verify & Release Locker
            </button>
          </form>

          {pinResult && (
            <div
              className={`p-3 rounded-xl text-xs font-medium ${
                pinResult.startsWith('SUCCESS')
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {pinResult}
            </div>
          )}
        </div>

        {/* Vault Locker Bay Status */}
        <div className="md:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Bobst Secure Storage Vault Lockers (Floor 1)</span>
            </div>
            <span className="text-xs font-mono text-slate-500">12 / 16 Utilized</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>BIN #B-19</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1 font-medium">Black Leather Wallet</div>
              <div className="text-[10px] text-blue-700 font-semibold mt-1">Claim Active (Alex)</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>BIN #B-20</span>
                <span className="text-[9px] bg-slate-200 px-1 rounded">HELD</span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1">Keys w/ Blue Lanyard</div>
              <div className="text-[10px] text-slate-400 mt-1">Held 4 days</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>BIN #B-21</span>
                <span className="text-[9px] bg-slate-200 px-1 rounded">HELD</span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1">Sony WH-1000XM4</div>
              <div className="text-[10px] text-slate-400 mt-1">Held 1 day</div>
            </div>

            <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-white flex flex-col justify-center items-center text-center text-slate-400">
              <span className="font-bold text-slate-600">BIN #B-22</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Vacant / Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
