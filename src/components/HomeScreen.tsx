import { ScreenType, LostItemReport, FoundItemAsset } from '../types';
import {
  Sparkles,
  CameraOff,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
  KeyRound,
  Building2,
  Smile,
  ArrowRight,
  Plus,
  HandHeart,
  Lock,
  Cpu,
  Fingerprint,
  Coffee,
  ExternalLink,
  MapPin,
  Clock,
  Radio,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenReportModal: () => void;
  onOpenFoundModal: () => void;
  onInspectMatrix: () => void;
  lostReport: LostItemReport;
  foundItem: FoundItemAsset;
}

export function HomeScreen({
  onNavigate,
  onOpenReportModal,
  onOpenFoundModal,
  onInspectMatrix,
  lostReport,
  foundItem,
}: HomeScreenProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-10 sm:pt-16 max-w-5xl mx-auto text-center px-4">
        {/* Live Protocol Active Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-800 shadow-2xs mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="tracking-wide uppercase text-[11px] font-bold">
            Live Campus Protocol Active
          </span>
          <span className="text-blue-300">|</span>
          <span className="text-blue-700 font-medium">Over 480 Items Restored</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
          Lost something{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-700 to-indigo-600">
            on campus?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          CampusFind uses Machine Learning Algorithms to connect lost and found items — even when you don't have a photo. Built
          for instant student peace of mind.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          <button
            onClick={onOpenReportModal}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Report Lost Item</span>
          </button>

          <button
            onClick={onOpenFoundModal}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200/90 font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-2xs transition-all hover:border-blue-300 hover:text-blue-600 text-sm sm:text-base cursor-pointer"
          >
            <HandHeart className="w-5 h-5 text-blue-600 stroke-[2]" />
            <span>I Found Something</span>
          </button>
        </div>

        {/* Trust Badges Row */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <CameraOff className="w-4 h-4 text-blue-600" />
            <span>Photo optional</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Privacy protected</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Campus verified</span>
          </div>
        </div>
      </section>

      {/* 2. LIVE NEURAL MATCHING ENGINE SHOWCASE (Matching Image 4) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Top Bar of Engine */}
          <div className="bg-slate-50/80 px-4 sm:px-6 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-900">Ml Modal</span>
              <span className="bg-slate-200/80 text-slate-700 font-mono text-[11px] px-2 py-0.5 rounded">
                
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-1.5">
                <span>Processing latency:</span>
                <span className="font-mono font-bold text-emerald-600">14ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-slate-700">Active Link Verified</span>
              </div>
            </div>
          </div>

          {/* Body: 3-Column Interactive Match Layout */}
          <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Card: Lost Item (You) */}
            <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Lost Item (You)
                </span>
                <span className="text-[11px] text-slate-500">{lostReport.reportedAt}</span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-200/90 flex items-center justify-center text-slate-600 shrink-0">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{lostReport.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span>Near Central Library, East Wing</span>
                  </p>
                </div>
              </div>

              {/* Attributes Table */}
              <div className="space-y-2 text-xs border-t border-slate-200/70 pt-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Photo Status:</span>
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <CameraOff className="w-3 h-3 text-slate-400" />
                    No photo uploaded
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Identifiers:</span>
                  <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                    RFID Dorm Pass, Student ID #4092
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Owner Privacy:</span>
                  <span className="font-medium text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Fully Anonymized
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>RECORD ID</span>
                <span>{lostReport.id}</span>
              </div>
            </div>

            {/* Center Bridge: Neural Engine Frequency Wave & Match Metric */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center px-2 py-2">
              {/* Match Score Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-sm px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                <Sparkles className="w-4 h-4" />
                <span>89% Match Found</span>
              </div>

              {/* Soundwave/Neural Frequency bars */}
              <div className="flex items-center justify-center gap-1 h-8 my-2 px-4 py-1 bg-blue-50/60 rounded-xl border border-blue-100/80 w-full max-w-xs">
                {[
                  'h-3',
                  'h-5',
                  'h-7',
                  'h-4',
                  'h-6',
                  'h-8',
                  'h-5',
                  'h-7',
                  'h-4',
                  'h-6',
                  'h-3',
                ].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1.5 ${h} bg-blue-600 rounded-full transition-all duration-300 animate-pulse`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  ></span>
                ))}
              </div>

              <div className="text-[12px] font-semibold text-slate-800 mt-2">
                Calculated from 14 shared attributes
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-snug">
                Spatial delta &lt; 85 meters • Matching bi-fold shape • Timestamp alignment (1 hr
                window)
              </p>

              <button
                onClick={onInspectMatrix}
                className="mt-4 bg-slate-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-xs hover:shadow hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Inspect Match Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Card: Found Item (Campus Safety) */}
            <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Found Item (Campus Safety)
                </span>
                <span className="text-[11px] text-slate-500">{foundItem.foundTimeAgo}</span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
                  <img
                    src={foundItem.photoUrl}
                    alt={foundItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-0.5">
                    <span className="text-[7px] text-white font-mono bg-black/60 px-0.5 rounded">
                      #FND
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{foundItem.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>2nd Floor Study Commons Desk</span>
                  </p>
                </div>
              </div>

              {/* Attributes Table */}
              <div className="space-y-2 text-xs border-t border-slate-200/70 pt-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Custodian:</span>
                  <span className="font-medium text-slate-800">{foundItem.custodian}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Storage Locker:</span>
                  <span className="font-mono font-semibold text-slate-800 bg-slate-200/80 px-1.5 py-0.5 rounded text-[11px]">
                    {foundItem.storageLocker}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Verification Level:</span>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Serial Number Confirmed
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>RECORD ID</span>
                <span>{foundItem.id}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE PROTECTION (4 Cards) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-2">
            Comprehensive Protection
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Everything you need to get it back
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Engineered with precision for modern college campuses. No fragmented social media posts,
            zero public phone number exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">AI-Powered Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Matches natural descriptions, complex physical attributes, spatial building grids,
              timing cadences, and photos when available.
            </p>
            <button
              onClick={onInspectMatrix}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all"
            >
              <span>Adaptive vector scoring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <CameraOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Photo Optional</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              No photo? Describe unique markings, contents, or scratch positions and our semantic NLP
              engine resolves item links seamlessly.
            </p>
            <button
              onClick={() => onNavigate('report')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all"
            >
              <span>Semantic attribute parsing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Secure Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Automated private ownership prompt matrices eliminate impersonation, false claims, and
              dishonest custody transfers.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all"
            >
              <span>Blind verification questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Safe Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Coordinate returns exclusively through vetted 24/7 student service counters, library
              frontdesks, or authenticated campus safety hubs.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all"
            >
              <span>Designated safe points</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. LINEAR STEP BY STEP: How CampusFind Works */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-2">
            Linear Step by Step
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            How CampusFind works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From loss report to handover in 5 automated, confidential checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
              Step 01
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Report</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Log item traits, rough coordinates, and timestamp. Photo entirely optional.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
              Step 02
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Match</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Neural engine continuously scans campus repositories & peer deposits.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
              Step 03
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Verify</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Answer unique hidden security tokens to definitively prove rightful ownership.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
              Step 04
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Handover</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Collect safely from university staff or coordinated safe checkpoint.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Smile className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
              Step 05
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Returned</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Case closed with signed campus token & optional finder gratitude badge.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL GRADE SAFETY */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Narrative & Big Stat Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-2">
                Institutional Grade Safety
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Engineered specifically for university boundaries.
              </h2>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                Public forums and social channels cause harassment and theft. CampusFind is integrated
                with single-sign-on (SSO) to protect student identity while maximizing recovery speed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200/80">
              <div>
                <div className="text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  98.4%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Identity verification rate
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600 tracking-tight tabular-nums">
                  &lt; 4 hrs
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Average median recovery
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Security Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
                <span className="text-blue-600">🎓</span>
                <span>College-only community</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Requires authenticated university email domain (.edu). Zero public or unauthorized
                guest account access.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
                <span className="text-blue-600">🔒</span>
                <span>Privacy-first channels</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct phone numbers and addresses are strictly concealed behind end-to-end encrypted
                proxy messaging.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
                <span className="text-blue-600">🛡️</span>
                <span>Cryptographic proofs</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tamper-proof item claims backed by timestamp hashes to prevent double-claiming and
                erroneous disposals.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
                <Coffee className="w-4 h-4 text-blue-600" />
                <span>Optional appreciation rewards</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank honest finders with campus coffee vouchers or dining credits handled via
                frictionless micro-escrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER (Matching Image 4) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-linear-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-3">
              Instant University Dispatch
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Ready to find what you lost?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Join thousands of students and campus staff in keeping our academic community honest,
              connected, and secure.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenReportModal}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-blue-500/30 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Report an Item</span>
              </button>

              <button
                onClick={() => onNavigate('browse')}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse 142 Items in Custody</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
