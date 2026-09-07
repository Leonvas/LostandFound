import React from 'react';
import { 
  PlusCircle, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  KeyRound, 
  Lock, 
  Coins, 
  RotateCcw,
  Layers,
  ChevronRight,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { UserProfile, FoundItem, ItemReport, ScreenType } from '../types';
import { RECOVERY_CENTERS, ACTIVITY_TIMELINE } from '../data/mockData';

interface DashboardScreenProps {
  user: UserProfile;
  activeReports: ItemReport[];
  foundMatch: FoundItem;
  onNavigate: (screen: ScreenType) => void;
  onOpenVerificationModal: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  activeReports,
  foundMatch,
  onNavigate,
  onOpenVerificationModal
}) => {
  const [dispatchAlert, setDispatchAlert] = React.useState(false);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#050505] text-[#a0a0a0]">
      
      {/* Welcome Banner */}
      <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Autonomous Dispatch • Bobst Cluster #4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-[#a0a0a0] max-w-2xl leading-relaxed">
            Let's get your belongings back. You have <strong className="text-blue-400 font-bold">1 high-confidence match</strong> pending your zero-knowledge blind verification.
          </p>
        </div>

        {/* Dual Hero Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10">
          <button
            onClick={() => onNavigate('report-lost')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2.5 group cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <div className="text-left">
              <div>I Lost Something</div>
              <div className="text-[10px] text-blue-200 font-normal leading-none mt-0.5">Avg 1.8 mins flow</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('report-lost')}
            className="px-5 py-3 rounded-xl bg-[#111] hover:bg-[#161616] active:scale-98 text-white font-bold text-sm border border-[#1a1a1a] transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <div>I Found Something</div>
              <div className="text-[10px] text-emerald-400 font-normal leading-none mt-0.5">+150 Karma Credits</div>
            </div>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777]">Active Reports</span>
            <div className="w-8 h-8 rounded-xl bg-[#111] border border-[#1a1a1a] text-blue-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {activeReports.length} <span className="text-xs font-semibold text-[#555]">items tracking</span>
          </div>
          <p className="text-xs text-[#777] mt-1 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Black Leather Wallet</span>
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777]">Possible Matches</span>
            <div className="w-8 h-8 rounded-xl bg-[#111] border border-[#1a1a1a] text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            2 <span className="text-xs font-semibold text-[#555]">candidates</span>
          </div>
          <p className="text-xs text-emerald-400 mt-1 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>1 High Confidence (89%)</span>
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777]">Returned Items</span>
            <div className="w-8 h-8 rounded-xl bg-[#111] border border-[#1a1a1a] text-purple-400 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            3 <span className="text-xs font-semibold text-[#555]">resolved</span>
          </div>
          <p className="text-xs text-[#777] mt-1 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Recovery Track</span>
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777]">Karma Credits</span>
            <div className="w-8 h-8 rounded-xl bg-[#111] border border-[#1a1a1a] text-amber-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            ₹{user.karmaCredits} <span className="text-xs font-semibold text-[#555]">pts</span>
          </div>
          <p className="text-xs text-[#777] mt-1 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Redeemable at Campus Cafe</span>
          </p>
        </div>
      </div>

      {/* Main Content Grid: Match List (Left) + Activity & Recovery Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Possible Matches for Your Items */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center space-x-2">
                <span>Possible Matches for Your Items</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-bold">2 Active</span>
              </h2>
              <p className="text-xs text-[#777] mt-0.5">
                AI cross-references location vectors, custodian logs, and physical descriptions
              </p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>Browse all</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary High-Confidence Match Card */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-7 border border-[#1a1a1a] shadow-xl relative overflow-hidden">
            {/* Top Match Badge Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1a1a1a] pb-4 mb-5">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950/40 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{foundMatch.matchPercentage}% Match Found</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#555]">
                  {foundMatch.reportReference}
                </span>
              </div>

              <div className="text-xs text-[#777] flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-[#a0a0a0]">Hold expires in {foundMatch.holdExpiresInHours} hours</span>
              </div>
            </div>

            {/* Match Details Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Wallet Photo asset */}
              <div className="md:col-span-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1a] shadow-xs bg-[#111] aspect-4/3">
                  <img
                    src={foundMatch.photoUrl}
                    alt={foundMatch.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold border border-[#222]">
                    Found Asset #{foundMatch.recordId}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-black/80 backdrop-blur-xs text-[#ccc] text-[10px] font-semibold truncate border border-[#222]">
                    Vault Bin: {foundMatch.storageLocker}
                  </div>
                </div>
              </div>

              {/* Match Metadata */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white leading-snug">
                    {foundMatch.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#777] mt-1">
                    <span className="flex items-center space-x-1 text-[#a0a0a0] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#555]" />
                      <span>{foundMatch.foundLocation} • {foundMatch.building}</span>
                    </span>
                    <span>•</span>
                    <span className="font-medium text-blue-400">Logged {foundMatch.timeAgo}</span>
                  </div>
                </div>

                {/* Attribute tags */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[10px] uppercase font-bold text-[#555]">Category</div>
                    <div className="font-bold text-white truncate">{foundMatch.category}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[10px] uppercase font-bold text-[#555]">Color Tone</div>
                    <div className="font-bold text-white truncate">{foundMatch.colorTone}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[10px] uppercase font-bold text-[#555]">Material</div>
                    <div className="font-bold text-white truncate">{foundMatch.material}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[10px] uppercase font-bold text-[#555]">Custodian</div>
                    <div className="font-bold text-white truncate">{foundMatch.custodian}</div>
                  </div>
                </div>

                {/* Reassurance note for photo-free reporting */}
                <div className="p-3.5 rounded-xl bg-[#111] border border-blue-500/30 text-xs text-[#a0a0a0] leading-relaxed">
                  <div className="flex items-center space-x-1.5 font-bold text-blue-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Photo-Optional System Reassurance</span>
                  </div>
                  {foundMatch.reassuranceNote}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#777] hover:text-white hover:bg-[#111] rounded-xl transition-colors text-center cursor-pointer"
                  >
                    Not Mine (Dismiss)
                  </button>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={onOpenVerificationModal}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>View Match & Verify</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Secondary Candidate: MacBook Air */}
          <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs hover:border-[#262626] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#777] shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white">MacBook Air 13" (Space Gray)</h4>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/40 text-amber-400 border border-amber-500/30">
                      52% Match Candidate
                    </span>
                  </div>
                  <p className="text-xs text-[#777] mt-0.5">
                    Logged in Bobst Basement Tech Lab • Flagged 3 hours ago
                  </p>
                  <div className="text-[11px] text-[#555] mt-1">
                    Matching model detected. Serial number verification challenge required.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('browse')}
                className="px-4 py-2 rounded-xl border border-[#1a1a1a] bg-[#111] hover:bg-[#161616] text-[#a0a0a0] hover:text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
              >
                Inspect Serial Registry
              </button>
            </div>
          </div>

          {/* Interactive Campus Recovery Radar / Perimeter */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <h3 className="text-sm font-extrabold text-white">Campus Recovery Perimeter & Radar</h3>
              </div>
              <span className="text-xs text-[#555] font-mono">18 Enclave Nodes Live</span>
            </div>

            <div className="relative bg-[#050505] rounded-xl p-6 overflow-hidden text-[#a0a0a0] border border-[#1a1a1a]">
              {/* Radar Grid Graphic */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] space-y-1">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                    <span>BOBST NODE</span>
                    <span className="font-mono">LOCKER #B-19</span>
                  </div>
                  <div className="text-sm font-bold text-white">Your Wallet Held Here</div>
                  <div className="text-[11px] text-[#777]">Custodian Officer Perez on duty</div>
                </div>

                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] space-y-1">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-bold">
                    <span>KIMMEL DEPOT</span>
                    <span className="font-mono">8 LOCKERS</span>
                  </div>
                  <div className="text-sm font-bold text-white">Main Info Desk</div>
                  <div className="text-[11px] text-[#777]">Open until 9:00 PM tonight</div>
                </div>

                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] space-y-1">
                  <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
                    <span>CAMPUS HQ</span>
                    <span className="font-mono">24/7 DEPOT</span>
                  </div>
                  <div className="text-sm font-bold text-white">7 Washington Place</div>
                  <div className="text-[11px] text-[#777]">Emergency dispatch & secure safe</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#777]">
                <span>Spatial telemetry synced across NYU Washington Square & Downtown Brooklyn</span>
                <span className="text-emerald-400 font-mono font-bold">99.8% System Uptime</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Activity Timeline & Recovery Centers */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Activity Timeline Card */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <h3 className="text-sm font-extrabold text-white">Activity Timeline</h3>
              <span className="text-[11px] text-blue-400 font-bold">Live Stream</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1a1a1a]">
              {ACTIVITY_TIMELINE.map(event => (
                <div key={event.id} className="relative">
                  <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full ring-4 ring-[#0a0a0a] ${
                    event.statusColor === 'green' ? 'bg-emerald-500' :
                    event.statusColor === 'blue' ? 'bg-blue-600' :
                    event.statusColor === 'amber' ? 'bg-amber-500 animate-pulse' :
                    'bg-[#222]'
                  }`} />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{event.title}</h4>
                      <span className="text-[10px] text-[#555] font-mono">{event.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#777] mt-1 leading-relaxed">{event.description}</p>
                    
                    {event.actionRequired && (
                      <button
                        onClick={onOpenVerificationModal}
                        className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
                      >
                        <span>{event.actionRequired}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Centers Status Card */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <h3 className="text-sm font-extrabold text-white">Recovery Centers</h3>
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Open Now</span>
              </span>
            </div>

            <div className="space-y-3">
              {RECOVERY_CENTERS.map(rc => (
                <div key={rc.id} className="p-3.5 rounded-xl bg-[#111] border border-[#1a1a1a] hover:border-[#262626] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{rc.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rc.is24x7 
                        ? 'bg-purple-950/60 text-purple-400 border border-purple-800' 
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    }`}>
                      {rc.hours}
                    </span>
                  </div>
                  <div className="text-xs text-[#777] flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#555]" />
                    <span>{rc.location}</span>
                  </div>
                  <div className="text-[11px] text-[#555] mt-1 flex items-center justify-between">
                    <span>{rc.activeLockersCount} Lockers active</span>
                    <span className="font-mono text-[#777]">{rc.phone}</span>
                  </div>
                </div>
              ))}
            </div>

            {dispatchAlert ? (
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-xs text-blue-300">
                <span className="font-bold block">Campus Safety Dispatch Hotline:</span>
                <span className="font-mono text-sm block mt-0.5">(212) 998-2222</span>
                <span className="text-[11px] text-[#777] block mt-0.5">Officers on 24/7 duty at 7 Washington Place.</span>
              </div>
            ) : (
              <button
                onClick={() => setDispatchAlert(true)}
                className="w-full py-2.5 rounded-xl border border-[#1a1a1a] bg-[#111] hover:bg-[#161616] text-[#a0a0a0] hover:text-white font-bold text-xs transition-colors text-center cursor-pointer"
              >
                Contact Campus Safety Dispatch
              </button>
            )}
          </div>

          {/* Zero-Trust Security Protocol Box */}
          <div className="bg-[#0a0a0a] text-[#a0a0a0] rounded-2xl p-6 border border-blue-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Zero-Trust Claim Handover</span>
            </div>
            <h4 className="text-sm font-bold text-white">How Pickups Work</h4>
            <p className="text-xs text-[#777] leading-relaxed">
              Property is never released without your verification question confirmation. Once answered, you receive a dynamic QR pass and smart locker PIN to retrieve your item directly from the library safety depot.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
