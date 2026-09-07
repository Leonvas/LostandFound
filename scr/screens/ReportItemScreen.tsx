import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Clock, 
  Calendar, 
  Camera, 
  FileText, 
  Tag, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Building2, 
  AlertCircle,
  Upload,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { ItemReport, ScreenType } from '../types';
import { CAMPUS_BUILDINGS } from '../data/mockData';

interface ReportItemScreenProps {
  onSubmitReport: (report: ItemReport) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ReportItemScreen: React.FC<ReportItemScreenProps> = ({
  onSubmitReport,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [title, setTitle] = useState('Black Leather Bifold Wallet');
  const [category, setCategory] = useState('Wallets, Bags & Accessories');
  const [brand, setBrand] = useState('Bellroy Slim Sleeve');
  const [color, setColor] = useState('Black / Charcoal');
  const [material, setMaterial] = useState('Full-grain Leather');
  const [internalIdentifiers, setInternalIdentifiers] = useState(
    'NYU Student ID ending in 4092, blue MetroCard in quick-pull tab, emergency $20 bill inside coin pocket'
  );
  const [wearMarks, setWearMarks] = useState(
    "Faint horizontal scuff on lower spine; embossed with faint initials 'A.K.' on bottom right corner; loose stitch on card slot."
  );

  // Where & When
  const [dateLost, setDateLost] = useState('2024-10-14');
  const [timeRange, setTimeRange] = useState('Between 10:00 AM - 12:30 PM');
  const [building, setBuilding] = useState('Bobst Central Library');
  const [microZone, setMicroZone] = useState('2nd Floor Quiet Study East, Desk Cluster #14 next to the glass atrium');

  // Photo option
  const [photoOption, setPhotoOption] = useState<'upload' | 'no-photo'>('no-photo');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Wallets, Bags & Accessories',
    'Electronics & Laptops',
    'Keys & Keyfobs',
    'ID Cards & Badges',
    'Bottles & Mugs',
    'Clothing & Apparel'
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as any);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReport: ItemReport = {
      id: `NYU-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      brand,
      color,
      material,
      dateLost: 'Today, ' + dateLost,
      timeRange,
      building,
      microZone,
      internalIdentifiers,
      wearMarks,
      photoOption,
      photoUrl: uploadedFile || undefined,
      status: 'matched',
      createdAt: 'Just now',
      matchScore: 92
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitReport(newReport);
    }, 900);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 bg-[#050505] text-[#a0a0a0]">
      {/* Top Title Banner */}
      <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#111] text-blue-400 border border-[#1a1a1a]">
                Incident Dispatch Form
              </span>
              <span>•</span>
              <span className="text-[#777]">Autonomous Neural Correlation Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tell us what you lost
            </h1>
            <p className="text-xs text-[#777] mt-1">
              Even without a photo, our multi-vector AI matches spatial coordinates, custodian logs, and physical descriptions.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FERPA & Identity Encrypted</span>
          </div>
        </div>

        {/* 4-Step Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { num: 1, label: 'Item Details' },
            { num: 2, label: 'Where & When' },
            { num: 3, label: 'Photo (Optional)' },
            { num: 4, label: 'Review & Dispatch' }
          ].map(step => (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num as any)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-2.5 ${
                currentStep === step.num
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : currentStep > step.num
                  ? 'bg-[#111] text-emerald-400 border-emerald-500/30'
                  : 'bg-[#111] text-[#666] border-[#1a1a1a]'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === step.num
                  ? 'bg-white/20 text-white'
                  : currentStep > step.num
                  ? 'bg-emerald-950 text-emerald-400'
                  : 'bg-[#161616] text-[#666]'
              }`}>
                {currentStep > step.num ? '✓' : step.num}
              </div>
              <span className="text-xs font-bold truncate">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Primary Specifications */}
        {currentStep === 1 && (
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                1. Primary Specifications
              </h2>
              <p className="text-xs text-[#777]">Provide physical attributes for AI vector matching.</p>
            </div>

            {/* Category Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-2">
                Category Taxonomy
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-[#111] text-[#a0a0a0] border-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Item Common Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Black Leather Bifold Wallet"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Brand / Manufacturer
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Bellroy, Apple, Hydro Flask"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Color & Tone
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Matte Black / Dark Charcoal"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Material Composition
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Full-grain Leather, Anodized Metal"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>
            </div>

            {/* Zero-Knowledge Private Identifiers */}
            <div className="pt-4 border-t border-[#1a1a1a] space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Zero-Knowledge Blind Verification Elements (Kept Strictly Private)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a0a0a0] mb-1">
                  Internal Items & Hidden Identifiers
                </label>
                <textarea
                  rows={2}
                  value={internalIdentifiers}
                  onChange={(e) => setInternalIdentifiers(e.target.value)}
                  placeholder="e.g. Student ID ending in 4092, specific key fob color, receipt inside pocket..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
                <span className="text-[11px] text-[#555] mt-1 block">
                  These details will NOT be shown publicly. They form the basis of the blind claim challenge questions.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a0a0a0] mb-1">
                  Wear Marks, Monograms & Scratches
                </label>
                <textarea
                  rows={2}
                  value={wearMarks}
                  onChange={(e) => setWearMarks(e.target.value)}
                  placeholder="e.g. Initials 'A.K.' stamped in gold, small scratch near zipper..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>

              {/* AI Confidence Meter */}
              <div className="p-4 rounded-xl bg-[#111] border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Semantic Engine Confidence Meter</div>
                    <div className="text-[11px] text-blue-400">3 distinct markers parsed: Card ID Suffix, Monogram Initials, Bifold Architecture</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-blue-400 font-mono">94%</span>
                  <div className="text-[10px] text-[#555] uppercase font-bold">Vector Quality</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Where & When</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Where & When */}
        {currentStep === 2 && (
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                2. Where & When Did You Last Have It?
              </h2>
              <p className="text-xs text-[#777]">
                Correlates location telemetry with custodian sweep schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Date Lost
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={dateLost}
                    onChange={(e) => setDateLost(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white focus:border-blue-500 font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                  Estimated Time Range
                </label>
                <input
                  type="text"
                  required
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  placeholder="e.g. Between 10:00 AM - 12:30 PM"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                Campus Building
              </label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white focus:border-blue-500 font-medium outline-none cursor-pointer"
              >
                {CAMPUS_BUILDINGS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#777] uppercase tracking-wider mb-1">
                Sub-Location or Specific Micro-Zone
              </label>
              <input
                type="text"
                required
                value={microZone}
                onChange={(e) => setMicroZone(e.target.value)}
                placeholder="e.g. 2nd Floor Quiet Study East, Desk Cluster #14 next to the glass atrium"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
              />
            </div>

            {/* Microzone interactive badge banner */}
            <div className="p-4 rounded-xl bg-[#111] border border-emerald-500/30 flex items-start space-x-3 text-xs text-[#a0a0a0]">
              <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Selected: {building} — 2nd Floor East Atrium</span>
                <p className="text-[11px] text-[#777] mt-0.5 leading-relaxed">
                  Swept by facility staff every 2 hours • Last custodian sweep logged: <strong className="text-white">42 minutes ago</strong>.
                  High probability of safe storage intake.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-bold text-[#777] hover:text-white cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Photo Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Photo Selection */}
        {currentStep === 3 && (
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                3. Photo Selection (Optional)
              </h2>
              <p className="text-xs text-[#777]">
                You do NOT need a photo to submit or find your item. Our AI matches purely on descriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option B: No Photo */}
              <div
                onClick={() => setPhotoOption('no-photo')}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all space-y-3 ${
                  photoOption === 'no-photo'
                    ? 'border-blue-500 bg-[#111] shadow-sm'
                    : 'border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#0a0a0a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#1a1a1a] text-blue-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {photoOption === 'no-photo' && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">No Photo — Continue with Description</h3>
                  <p className="text-xs text-[#777] mt-1 leading-relaxed">
                    Semantic Match Engine activated. Uses your physical description and location coordinates.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1a1a1a] flex items-center space-x-1.5 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Optimal 4/4 Vectors: Dimensions, Wear, Proximity, Time</span>
                </div>
              </div>

              {/* Option A: Upload Photo */}
              <div
                onClick={() => setPhotoOption('upload')}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all space-y-3 ${
                  photoOption === 'upload'
                    ? 'border-blue-500 bg-[#111] shadow-sm'
                    : 'border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#0a0a0a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#1a1a1a] text-purple-400 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  {photoOption === 'upload' && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">Upload an Existing Photo</h3>
                  <p className="text-xs text-[#777] mt-1 leading-relaxed">
                    If you have a past photo of the item, drop it here for visual embeddings.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1a1a1a] text-[11px] text-[#555]">
                  Accepts JPG, PNG, WEBP (Max 10MB)
                </div>
              </div>
            </div>

            {photoOption === 'upload' && (
              <div className="border-2 border-dashed border-[#1a1a1a] rounded-xl p-8 text-center bg-[#111]">
                <Upload className="w-8 h-8 text-[#555] mx-auto mb-2" />
                <p className="text-xs font-bold text-white">Drag & drop item photo here, or click to browse</p>
                <p className="text-[11px] text-[#555] mt-1">Image metadata is stripped to protect student privacy</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="hidden"
                  id="photo-file"
                />
                <label
                  htmlFor="photo-file"
                  className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#161616] border border-[#2a2a2a] text-xs font-bold text-white hover:bg-[#202020] cursor-pointer shadow-xs"
                >
                  Choose File
                </label>
                {uploadedFile && (
                  <div className="mt-3 text-xs text-emerald-400 font-bold flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Image loaded successfully</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-bold text-[#777] hover:text-white cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Review & Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Dispatch */}
        {currentStep === 4 && (
          <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                4. Review & Dispatch to Enclave
              </h2>
              <p className="text-xs text-[#777]">
                Confirm your details before activating the campus neural correlation engine.
              </p>
            </div>

            <div className="bg-[#111] rounded-xl p-5 border border-[#1a1a1a] divide-y divide-[#1a1a1a] text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#777] font-medium">Item Name:</span>
                <span className="font-bold text-white">{title}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#777] font-medium">Category:</span>
                <span className="font-bold text-white">{category}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#777] font-medium">Location:</span>
                <span className="font-bold text-white text-right">{building} — {microZone}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#777] font-medium">Time Window:</span>
                <span className="font-bold text-white">{timeRange}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#777] font-medium">Matching Mode:</span>
                <span className="font-bold text-blue-400">
                  {photoOption === 'no-photo' ? 'Semantic AI Multi-Vector' : 'Visual + Semantic Multi-Vector'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111] border border-blue-500/30 text-xs text-[#a0a0a0] flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Upon dispatch, CampusFind immediately checks all 18 security lockers, intake bins, and custodian reports across NYU.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-bold text-[#777] hover:text-white cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-sm shadow-md flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Dispatching & Indexing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Submit Lost Report & Correlate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
