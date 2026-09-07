import { useState, FormEvent } from 'react';
import { ScreenType, LostItemReport } from '../types';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  CameraOff,
  Upload,
  Calendar,
  Clock,
  Building,
  MapPin,
  Check,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Save,
  HelpCircle,
} from 'lucide-react';

interface ReportScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmitReport: (report: Partial<LostItemReport>) => void;
}

export function ReportScreen({ onNavigate, onSubmitReport }: ReportScreenProps) {
  // Form State
  const [name, setName] = useState('Black Leather Bifold Wallet');
  const [category, setCategory] = useState('Wallets, Bags & Accessories');
  const [color, setColor] = useState('Black / Dark Charcoal');
  const [brand, setBrand] = useState('Bellroy Slim Sleeve');
  const [material, setMaterial] = useState('Genuine Full-Grain Leather');
  const [internalIdentifiers, setInternalIdentifiers] = useState(
    'Student ID ending in 4092, blue MetroCard in quick-pull tab, fold-out emergency $20 bill inside coin pocket.'
  );
  const [wearMarks, setWearMarks] = useState(
    "Faint horizontal scuff on lower spine; embossed with faint initials 'A.K.' on bottom right corner; loose stitch on card slot."
  );
  const [dateLost, setDateLost] = useState('Today, Oct 14, 2024');
  const [timeRange, setTimeRange] = useState('Between 10:00 AM - 12:30 PM');
  const [building, setBuilding] = useState('Bobst Central Library');
  const [subLocation, setSubLocation] = useState(
    '2nd Floor Quiet Study East, Desk Cluster #14 next to the glass atrium'
  );
  const [hasPhoto, setHasPhoto] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // In image, step 1 & 2 are in view

  const categoryPresets = [
    { label: 'Wallets & Purses', icon: '💳', value: 'Wallets, Bags & Accessories' },
    { label: 'Electronics', icon: '🎧', value: 'Electronics' },
    { label: 'Keys', icon: '🔑', value: 'Keys' },
    { label: 'ID Cards', icon: '🪪', value: 'Student Credentials & Cards' },
    { label: 'Bottles & Mugs', icon: '🥤', value: 'Drinkware & Bottles' },
    { label: 'Clothing', icon: '👕', value: 'Apparel & Accessories' },
  ];

  // Dynamic confidence calculation based on inputs
  const calculateConfidence = () => {
    let score = 50;
    if (internalIdentifiers.length > 20) score += 24;
    if (wearMarks.length > 20) score += 20;
    return Math.min(score, 94);
  };

  const confidenceScore = calculateConfidence();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitReport({
        name,
        category,
        color,
        brand,
        material,
        internalIdentifiers,
        wearMarks,
        dateLost,
        timeRange,
        building,
        subLocation,
        hasPhoto,
        photoUrl: uploadedPhotoUrl || undefined,
        status: 'match_found',
        matchConfidence: 89,
        reportedAt: 'Just now',
      });
      setIsSubmitting(false);
      onNavigate('dashboard');
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-24">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>Incident Dispatch Form</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Tell us what you lost
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          The more precise details you provide, the faster our neural spatial matching engine reunites
          you with your property.
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium mt-3 border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>FERPA & Student Identity Encrypted</span>
        </div>
      </div>

      {/* Stepper (Step 1 to Step 4) */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 mb-8 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/70 border border-blue-100">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              1
            </span>
            <div className="font-semibold text-blue-900">Item Details</div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/70 border border-blue-100">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              2
            </span>
            <div className="font-semibold text-blue-900">Where & When</div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-[10px]">
              3
            </span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-700">Photo</span>
              <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1 rounded">
                FREE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-[10px]">
              4
            </span>
            <div className="font-medium text-slate-700">Final Verification</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: PRIMARY SPECIFICATIONS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">1. Primary Specifications</h2>
              <span className="text-xs font-semibold text-slate-400">Section 1 of 4</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurate categorisation narrows the physical search radius across campus warehouses.
            </p>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Common Name <span className="text-rose-500">* Required</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Black Leather Bifold Wallet"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Category Taxonomy & Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category Taxonomy
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium mb-3"
            >
              <option value="Wallets, Bags & Accessories">Wallets, Bags & Accessories</option>
              <option value="Electronics">Electronics (Laptops, Phones, Audio)</option>
              <option value="Keys">Keys & Lockers</option>
              <option value="Student Credentials & Cards">Student Credentials & Cards</option>
              <option value="Drinkware & Bottles">Drinkware & Bottles</option>
              <option value="Apparel & Accessories">Apparel & Accessories</option>
            </select>

            {/* Category Presets Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categoryPresets.map((preset) => {
                const isSelected = category === preset.value;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setCategory(preset.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column: Color, Brand, Material */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Color Palette
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Matte Black"
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                />
                <span className="absolute left-2.5 top-3 w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-300"></span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Bellroy, Apple, Hydro Flask"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Material Composition
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Full-grain leather, Aluminum"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: ZERO-KNOWLEDGE VERIFICATION (The centerpiece of Image 6!) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1 border border-indigo-100">
                <Lock className="w-3 h-3" />
                <span>Zero-Knowledge Verification</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Anything that makes this item unique?
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">Section 2 of 4</span>
          </div>

          {/* Context Helper Card */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
            <span className="text-base shrink-0">💡</span>
            <div className="leading-relaxed">
              <strong className="font-semibold">Category Context Helper: Wallets.</strong> Since you
              selected Wallet, describing internal cards, non-standard transit passes, or hidden
              compartments guarantees a 100% indisputable claim match when picked up by Campus
              Dispatch.
            </div>
          </div>

          {/* Two Side-by-Side Verification Textareas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Internal Items & Hidden Identifiers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Internal Items & Hidden Identifiers
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Kept strictly private
                </span>
              </div>
              <textarea
                rows={4}
                value={internalIdentifiers}
                onChange={(e) => setInternalIdentifiers(e.target.value)}
                placeholder="e.g. Student ID ending in 4092, blue MetroCard in quick-pull tab, fold-out emergency $20 bill inside coin pocket."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed font-normal"
              />
              <p className="text-[11px] text-slate-500 leading-snug">
                Campus desk staff will use this to verify claimant credentials without displaying it in
                public search directories.
              </p>
            </div>

            {/* Right: Wear Marks, Monograms & Scratches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Wear Marks, Monograms & Scratches
                </label>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  Semantic Matcher
                </span>
              </div>
              <textarea
                rows={4}
                value={wearMarks}
                onChange={(e) => setWearMarks(e.target.value)}
                placeholder="e.g. Faint horizontal scuff on lower spine; embossed with faint initials 'A.K.' on bottom right corner; loose stitch on card slot."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed font-normal"
              />
              <p className="text-[11px] text-slate-500 leading-snug">
                Our image vision model maps these physical defects when intake officers process found
                objects.
              </p>
            </div>
          </div>

          {/* Semantic Engine Confidence Meter */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Semantic Engine Confidence Meter:
                </span>
                <span className="text-xs font-extrabold text-emerald-700">
                  {confidenceScore}% Confidence (High Match Capability)
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                3 distinct markers parsed: Card ID Suffix, Monogram Initials, Bifold Architecture
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHERE & WHEN (Section 3 of 4) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                3. Where & When Did You Last Have It?
              </h2>
              <span className="text-xs font-semibold text-slate-400">Section 3 of 4</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enables immediate building custodian dispatches and geo-fenced log comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date Lost
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dateLost}
                  onChange={(e) => setDateLost(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Estimated Time Range
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                />
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campus Building
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                />
                <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Sub-Location or Specific Micro-Zone
              </label>
              <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
                Edit Pin (Lat: 40.7295° N, Long: 73.9972° W)
              </span>
            </div>
            <input
              type="text"
              value={subLocation}
              onChange={(e) => setSubLocation(e.target.value)}
              placeholder="e.g. 2nd Floor Quiet Study East, Desk Cluster #14 next to the glass atrium"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
            />
          </div>

          {/* Visual Campus Location Card (Bobst Atrium) */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-slate-900 text-white shadow-2xs h-48 sm:h-56">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
              alt="Bobst Central Library Atrium"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent p-4 sm:p-5 flex flex-col justify-end">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-blue-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Selected: Bobst Central Library — 2nd Floor East Atrium</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Swept by facility staff every 2 hours • Last custodian sweep: 42 mins ago
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>Zone Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: NO CAMERA REQUIRED • PHOTO (OPTIONAL) (Section 4 of 4) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Top Banner */}
          <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">
                No Camera Required
              </div>
              <h3 className="text-lg font-bold tracking-tight">
                Zero Friction: Don't have a photo? No problem!
              </h3>
              <p className="text-xs text-blue-100 max-w-xl mt-1 leading-relaxed">
                Most people don't photograph their keys or everyday items. Just describe your item above
                and let CampusFind's deterministic multi-point vector engine match it automatically.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/30 border border-blue-400/40 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-100 shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>87% Found Without Photos</span>
            </div>
          </div>

          {/* Two Selectable Cards (Option A vs Option B) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A: Upload Photo */}
            <div
              onClick={() => setHasPhoto(true)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                hasPhoto
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">Option A: Upload a Photo</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Optional Visual Boost
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Drag and drop a reference image or receipt from your device.
                </p>

                <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-slate-700">PNG, JPG or HEIC up to 15MB</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Click to browse device</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                Visual vectors will run asynchronously upon submit
              </div>
            </div>

            {/* Option B: No Photo (RECOMMENDED) */}
            <div
              onClick={() => setHasPhoto(false)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                !hasPhoto
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">
                    Option B: No Photo — Continue with Description
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  CampusFind will use your deep semantic text, physical attributes, spatial
                  coordinates, and timestamp matching to locate candidate items.
                </p>

                {/* 4 Checkmarks */}
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Physical Dimensions</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Wear Pattern Clues</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Spatial Proximity (50m)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Time Window Overlap</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-emerald-700 font-semibold mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Verification Confidence Score:</span>
                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">
                  Optimal (4/4 vectors)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR (Matching Image 6) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 max-w-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong className="text-slate-700 font-semibold">Privacy Protected:</strong> Your
              confidential descriptors, private card numbers, and secret markings are never published
              publicly on the student directory. Active Encryption AES-256.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-all hover:shadow-blue-500/25 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Dispatching Neural Query...</span>
                </>
              ) : (
                <>
                  <span>Submit Lost Report</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
