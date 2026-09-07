import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  KeyRound, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  Layers, 
  Building2, 
  Lock, 
  Clock, 
  Check, 
  Award
} from 'lucide-react';
import { ScreenType } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenVerificationModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenVerificationModal
}) => {
  return (
    <div className="min-h-screen space-y-16 pb-16 bg-[#050505] text-[#a0a0a0]">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] text-blue-400 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>CampusFind v3.4 Production • NYU Enclave Active</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Find what you lost. <br />
            <span className="text-blue-500">Help someone find theirs.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed max-w-2xl mx-auto">
            CampusFind uses AI to connect lost and found items — even when you don't have a photo. Built for university grounds, lecture halls, and dorms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('report-lost')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Report Lost Item</span>
            </button>

            <button
              onClick={() => onNavigate('browse')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0a0a0a] hover:bg-[#111] active:scale-98 text-white font-bold text-sm border border-[#1a1a1a] shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#777]" />
              <span>Browse 142 Items in Custody</span>
            </button>
          </div>
        </div>

        {/* Neural Matching Engine v2.4 Live Stream Box */}
        <div className="mt-14 max-w-4xl mx-auto bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1a1a1a] pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Neural Matching Engine v2.4 Live Stream
              </span>
              <span className="text-xs font-mono text-[#555]">Stream ID: CF-9924-NYU</span>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-[#777]">
              <span className="text-blue-400 font-bold">&lt; 14ms latency</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Active Link Verified</span>
            </div>
          </div>

          {/* Node Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* Left Node */}
            <div className="md:col-span-3 p-4 rounded-xl bg-[#111] border border-[#1a1a1a] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#777]">
                <span>REPORTED LOST</span>
                <span className="text-white font-mono">Today 10:14 AM</span>
              </div>
              <div className="text-base font-extrabold text-white">Bifold Leather Wallet</div>
              <p className="text-xs text-[#777]">Bobst Library Floor 5 • No photo attached</p>
              <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 font-semibold pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>3 Semantic Descriptors Parsed</span>
              </div>
            </div>

            {/* Central Connection */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
              <div className="px-2.5 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/40 text-xs font-black shadow-xs whitespace-nowrap">
                89% Match Found
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 my-2 hidden md:block"></div>
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>

            {/* Right Node */}
            <div className="md:col-span-3 p-4 rounded-xl bg-[#111] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>FOUND & SECURED IN BIN</span>
                <span className="text-emerald-400 font-mono">Today 10:45 AM</span>
              </div>
              <div className="text-base font-extrabold text-white">Secured Student ID N1489****</div>
              <p className="text-xs text-[#777]">Safety Desk Locker #04 • Officer Perez</p>
              <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted Locker Code Ready</span>
              </div>
            </div>
          </div>

          {/* Action button inside stream card */}
          <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#555]">
              Cross-correlation: Spatial Proximity &lt; 85m • Timestamp Alignment • Texture Vector
            </span>
            <button
              onClick={onOpenVerificationModal}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Inspect Match Matrix & Verify</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Engineered for Campus Recovery
          </h2>
          <p className="text-xs text-[#777] mt-1">
            Built specifically around student routines, lecture halls, and facilities protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] text-blue-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">AI-Powered Matching</h3>
            <p className="text-xs text-[#777] leading-relaxed">
              Multi-vector correlation links items based on subtle wear marks, micro-zone location tags, and timestamp alignment.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Photo-Optional</h3>
            <p className="text-xs text-[#777] leading-relaxed">
              Never be blocked because you didn't snap a photo of your keys or wallet beforehand. Natural language is all you need.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] text-indigo-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Secure Verification</h3>
            <p className="text-xs text-[#777] leading-relaxed">
              Zero-knowledge challenges protect item identity. Only the rightful owner who knows hidden traits can claim it.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] text-purple-400 flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Safe Handover</h3>
            <p className="text-xs text-[#777] leading-relaxed">
              Pick up directly from campus security lockers or staffed library desks with automated QR tokens and PIN codes.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Linear Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0a0a0a] text-[#a0a0a0] rounded-2xl p-8 sm:p-12 shadow-xl border border-[#1a1a1a]">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">Autonomous Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How CampusFind Works</h2>
            <p className="text-xs text-[#777]">From the moment an item goes missing to the minute it's back in your hands.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Report', desc: 'Describe what you lost with location and wear traits.' },
              { step: '02', title: 'Match', desc: 'AI compares spatial coordinates against custodian logs.' },
              { step: '03', title: 'Verify', desc: 'Answer 2 blind verification questions.' },
              { step: '04', title: 'Handover', desc: 'Receive digital smart locker PIN & pickup pass.' },
              { step: '05', title: 'Returned', desc: 'Item safely retrieved and karma credits awarded.' }
            ].map((s) => (
              <div key={s.step} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 relative">
                <div className="text-xs font-mono font-black text-blue-400 mb-2">{s.step}</div>
                <div className="text-sm font-bold text-white mb-1">{s.title}</div>
                <div className="text-xs text-[#777] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a]">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">480+</div>
            <div className="text-xs font-bold text-white mt-1">Student Belongings Reunited</div>
            <div className="text-[11px] text-[#555]">This semester across 18 halls</div>
          </div>
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a]">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">&lt; 4 hrs</div>
            <div className="text-xs font-bold text-white mt-1">Median Recovery Time</div>
            <div className="text-[11px] text-[#555]">From report to locker PIN</div>
          </div>
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a]">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">98.4%</div>
            <div className="text-xs font-bold text-white mt-1">Verified Return Rate</div>
            <div className="text-[11px] text-[#555]">Zero false claims recorded</div>
          </div>
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1a1a1a]">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs font-bold text-white mt-1">FERPA Enclave Compliant</div>
            <div className="text-[11px] text-[#555]">Protected student records</div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#0a0a0a] text-white rounded-2xl p-8 sm:p-12 border border-blue-500/30 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to find what you lost?</h2>
          <p className="text-xs text-[#777] max-w-lg mx-auto">
            Log in with your university credentials to submit an incident or claim items held in safe custody lockers.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('report-lost')}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
            >
              Report an Item
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 rounded-xl bg-[#111] hover:bg-[#161616] text-[#a0a0a0] hover:text-white font-bold text-xs transition-colors border border-[#1a1a1a] cursor-pointer"
            >
              View My Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
