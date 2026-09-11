import { useState } from 'react';
import { ScreenType, LostItemReport, FoundItemAsset, RecoveryCenter, DashboardMatch } from '../types';
import { CURRENT_USER } from '../data/mockData';
import {
  ShieldCheck,
  Plus,
  HandHeart,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Radio,
  Building,
  ExternalLink,
  ChevronRight,
  Laptop,
  CreditCard,
  Sliders,
  Phone,
  HelpCircle,
  Eye,
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenReportModal: () => void;
  onOpenFoundModal: () => void;
  onOpenVerifyModal: (foundItem: FoundItemAsset) => void;
  onInspectMatrix: (match: DashboardMatch) => void;
  lostReport: LostItemReport;
  foundItem: FoundItemAsset;
  secondaryItem: FoundItemAsset;
  recoveryCenters: RecoveryCenter[];
  stats: { active_reports: number; possible_matches: number; returned_items: number };
  matches: DashboardMatch[];
}

export function DashboardScreen({
  onNavigate,
  onOpenReportModal,
  onOpenFoundModal,
  onOpenVerifyModal,
  onInspectMatrix,
  lostReport,
  foundItem,
  secondaryItem,
  recoveryCenters,
  stats,
  matches,
}: DashboardScreenProps) {
  const [activeBeacon, setActiveBeacon] = useState('bobst');

  const hour = new Date().getHours();
const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Real, sorted matches from find_all_open_matches() — highest score first.
  const sortedMatches = [...matches].sort((a, b) => b.match_score - a.match_score);
  const topMatch = sortedMatches[0];
  const topMatchPct = topMatch ? Math.round(topMatch.match_score * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
           {timeGreeting}, {CURRENT_USER.name} 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {sortedMatches.length > 0 ? (
              <>
                Let's get your belongings back. You have{' '}
                <strong className="text-emerald-700 font-bold">
                  {sortedMatches.length} possible {sortedMatches.length === 1 ? 'match' : 'matches'}
                </strong>{' '}
                {topMatch && `(top score ${topMatchPct}%) `}pending review.
              </>
            ) : (
              "No possible matches yet — we'll surface one here as soon as a found item's description lines up with an open report."
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200/80 shadow-2xs rounded-xl px-3.5 py-2 text-xs flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-700">Live Autonomous Dispatch</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-slate-500">Bobst Cluster #4</span>
          </div>
        </div>
      </div>

      {/* Two Action Cards (I Lost Something / I Found Something) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: I Lost Something */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <span>● Report in progress</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">I Lost Something</h3>
            <p className="text-xs text-slate-500">
              Report a missing item instantly. Avg 1.8 mins flow with zero photo requirement.
            </p>
          </div>
          <button
            onClick={onOpenReportModal}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span> Report Lost Item</span>
          </button>
        </div>

        {/* Card 2: I Found Something */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">I Found Something</h3>
            <p className="text-xs text-slate-500">
              Report an item you found on campus.
            </p>
          </div>
          <button
            onClick={onOpenFoundModal}
            className="bg-slate-900 hover:bg-black active:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <HandHeart className="w-4 h-4 text-emerald-400" />
            <span>Report Found Item</span>
          </button>
        </div>
      </div>

      {/* Top 4-Metric Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Active Reports</span>
            <Radio className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {stats.active_reports}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 truncate">
            Item tracking: {lostReport.name}
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-2xs relative overflow-hidden">
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Possible Matches</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 tabular-nums">
            {stats.possible_matches}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {topMatch ? `Top score: ${topMatchPct}%` : 'No matches yet'}
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Returned Items</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {CURRENT_USER.returnedItemsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Resolved (100% claim rate)</div>
        </div>
      </div>

      {/* Main 2-Column Content (Left 2/3, Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (8 cols): MATCH CARDS & RECOVERY MAP */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Possible Matches for Your Items</h2>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Live AI Scan
              </span>
            </div>
            <button
              onClick={() => topMatch && onInspectMatrix(topMatch)}
              disabled={!topMatch}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Filter criteria</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* REAL POSSIBLE MATCHES — from find_all_open_matches(), refreshed live via
              Supabase realtime / polling in App.tsx. No hardcoded scores or narrative. */}
          {sortedMatches.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-sm">No possible matches right now</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                As soon as a found item's description overlaps with an open lost report, it'll
                show up here automatically — no refresh needed.
              </p>
            </div>
          )}

          {sortedMatches.map((m, idx) => {
            const pct = Math.round(m.match_score * 100);
            const isTop = idx === 0;
            const isHighConfidence = m.match_score >= 0.3;

            return (
              <div
                key={`${m.lost_report_id}-${m.found_item_id}`}
                className={
                  isTop && isHighConfidence
                    ? 'bg-white border-2 border-emerald-500/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 relative'
                    : 'bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
                }
              >
                {isTop && isHighConfidence ? (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{m.lost_name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {m.lost_building ? `Lost near ${m.lost_building}` : 'Location not specified'}
                            {' • '}
                            Possible match: <span className="font-semibold text-slate-700">{m.found_name}</span>
                            {m.found_building ? ` (found at ${m.found_building})` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{pct}% Match</span>
                      </div>
                    </div>

                    {m.found_photo_url && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center gap-4">
                        <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                          <img src={m.found_photo_url} alt={m.found_name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Matched on description similarity (name, category, color, material, and
                          location) — not on this photo yet. Open the match to compare fields
                          side-by-side before verifying.
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => onInspectMatrix(m)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                      >
                        Compare Fields
                      </button>
                      <button
                        type="button"
                        onClick={() => onInspectMatrix(m)}
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span>View Match & Verify</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{m.lost_name}</h4>
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {pct}% Match Candidate
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Possible match: {m.found_name}
                          {m.found_building ? ` • Found at ${m.found_building}` : ''}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onInspectMatrix(m)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 shrink-0 cursor-pointer"
                    >
                      Compare Fields
                    </button>
                  </>
                )}
              </div>
            );
          })}

          {/* CAMPUS RECOVERY PERIMETER MAP / TELEMETRY CARD */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Campus Recovery Perimeter Telemetry
                </h3>
                <p className="text-xs text-slate-500">
                  Live telemetry from 8 student lockers & 3 official security safe-points
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-time Beacon Active
              </span>
            </div>

            {/* Stylized NYU Campus Map Stage */}
            <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 flex flex-col justify-between text-white">
              {/* Map Grid Pattern background */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(#3B82F6 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              ></div>

              {/* Map Beacons / Hotspots */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 text-[11px]">
                  SECTOR 2: WASHINGTON SQ SOUTH
                </span>
                <span className="font-mono text-emerald-400 text-[11px]">
                  SYNC: 14MS LATENCY
                </span>
              </div>

              {/* Interactive nodes */}
              <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                <div
                  onClick={() => setActiveBeacon('bobst')}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    activeBeacon === 'bobst'
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg ring-1 ring-blue-400'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Bobst Command</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">Vault Bin #B-19 Active</div>
                  <div className="text-[9px] text-blue-300 font-mono mt-0.5">Coords: 40.7295, -73.9972</div>
                </div>

                <div
                  onClick={() => setActiveBeacon('kimmel')}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    activeBeacon === 'kimmel'
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg ring-1 ring-blue-400'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Kimmel Desk</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">8 Lockers Online</div>
                  <div className="text-[9px] text-blue-300 font-mono mt-0.5">Coords: 40.7299, -73.9978</div>
                </div>

                <div
                  onClick={() => setActiveBeacon('safety')}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    activeBeacon === 'safety'
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg ring-1 ring-blue-400'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Safety HQ</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">24/7 Vault Reserve</div>
                  <div className="text-[9px] text-blue-300 font-mono mt-0.5">Coords: 40.7288, -73.9959</div>
                </div>
              </div>

              {/* Map Footer Bar */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span>Selected: Bobst Central Library Safe Point #2</span>
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline">
                  View Full Screen Radar →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): ACTIVITY TIMELINE & RECOVERY CENTERS */}
        <div className="lg:col-span-4 space-y-6">
          {/* ACTIVITY TIMELINE (Matching Image 8!) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Activity Timeline</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">NODE-LIVE</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Event 1 */}
              <div className="relative flex items-start gap-3 pl-7">
                <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Report submitted</div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    Black Leather Wallet registered with NYU student credential references.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">Today 09:15 AM</span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-3 pl-7">
                <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></span>
                <div>
                  <div className="text-xs font-bold text-slate-800">AI Neural Engine matched</div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    Item #FND-7422 ingested by Central Library Security Desk.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">Today 10:30 AM</span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-start gap-3 pl-7">
                <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white animate-pulse"></span>
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5">
                  <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                    <span>Verification Challenge Ready</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-bold">
                      ACTION
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                    3 private questions generated based on RFID serial hashes. Action pending Alex's
                    response.
                  </p>
                  <button
                    onClick={() => onOpenVerifyModal(foundItem)}
                    className="mt-2 text-[11px] font-bold text-amber-900 underline hover:text-amber-950 cursor-pointer"
                  >
                    Answer Challenge Questions →
                  </button>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative flex items-start gap-3 pl-7 opacity-60">
                <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
                <div>
                  <div className="text-xs font-bold text-slate-700">
                    Safe Handover Point Designated
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    Library Security Safe Point #2 reserved with automated locker code. Scheduled on
                    verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RECOVERY CENTERS LIST */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Recovery Centers</h3>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                NYU Main
              </span>
            </div>

            <div className="space-y-3">
              {recoveryCenters.map((center) => (
                <div
                  key={center.id}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{center.name}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                      {center.hours}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{center.location}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1 border-t border-slate-200/60">
                    <span>{center.activeLockers} Smart Lockers</span>
                    <span className="text-blue-600 font-medium">{center.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZERO TRUST CLAIM HANDOVER PROMISE */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Trust Claim Handover</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Property is never released without verification question confirmation and authorized
              RFID student tap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}