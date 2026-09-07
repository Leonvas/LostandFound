import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  QrCode, 
  MapPin, 
  Clock, 
  AlertCircle,
  Copy,
  Check,
  Building2,
  Sparkles
} from 'lucide-react';
import { FoundItem } from '../types';

interface VerificationModalProps {
  item: FoundItem;
  isOpen: boolean;
  onClose: () => void;
  onVerifiedSuccess: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  item,
  isOpen,
  onClose,
  onVerifiedSuccess
}) => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  if (!isOpen) return null;

  const handleAutofillHints = () => {
    setQ1('A.K.');
    setQ2('4092');
    setErrorMsg('');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      const cleanQ1 = q1.trim().toUpperCase().replace(/\./g, '');
      const cleanQ2 = q2.trim();

      // Check if matches Alex's wallet hints (A.K. or AK, and 4092)
      if ((cleanQ1 === 'AK' || cleanQ1 === 'A K') && cleanQ2 === '4092') {
        setIsUnlocked(true);
        onVerifiedSuccess();
      } else {
        setErrorMsg('Authentication mismatch: One or more responses do not match the encrypted custodian record.');
      }
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText('8821-NYU');
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl border border-[#1a1a1a] max-w-xl w-full overflow-hidden text-[#a0a0a0]">
        {/* Header */}
        <div className="bg-[#0e0e0e] text-white p-5 flex items-center justify-between border-b border-[#1a1a1a]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#222] flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold tracking-tight text-white">Zero-Knowledge Blind Claim Challenge</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950/50 text-emerald-400 border border-emerald-500/40">
                  {item.matchPercentage}% Match
                </span>
              </div>
              <p className="text-xs text-[#777]">Custody Item #{item.recordId} • {item.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#777] hover:text-white hover:bg-[#161616] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {!isUnlocked ? (
            <div>
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-5 text-xs text-[#a0a0a0] leading-relaxed">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center space-x-1.5 text-white">
                    <KeyRound className="w-4 h-4 text-blue-400" />
                    <span>FERPA Zero-Knowledge Protocol</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleAutofillHints}
                    className="text-[11px] text-blue-400 underline hover:text-blue-300 font-semibold cursor-pointer"
                  >
                    Quick-Fill Alex's Hints
                  </button>
                </div>
                To safeguard student possessions against unauthorized claims, the AI generated 2 challenge questions based on unpublicized item properties noted by Safety Officer Perez.
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Question 1: What initials are embossed on the bottom corner?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., A.K."
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 text-sm font-medium outline-none transition-all"
                  />
                  <span className="text-[11px] text-[#555]">Hint: Emblazoned with faint gold stamping (from your original report: 'A.K.')</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Question 2: What are the last 4 digits of the university ID card inside?
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="e.g., 4092"
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 text-sm font-mono tracking-widest outline-none transition-all"
                  />
                  <span className="text-[11px] text-[#555]">Hint: Last 4 digits of your student card (from your report: '4092')</span>
                </div>

                {errorMsg && (
                  <div className="flex items-center space-x-2 text-xs font-semibold text-red-400 bg-red-950/30 p-3 rounded-xl border border-red-500/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#777] hover:text-white hover:bg-[#111] rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-xl shadow-xs transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Evaluating Neural Hash...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Verify Ownership & Unlock Locker</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-950/50 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Ownership Confirmed 100%</h4>
                <p className="text-xs text-[#777] mt-0.5">
                  Both private identifiers match custodian logs. Custodian Safe Point #2 has authorized locker release.
                </p>
              </div>

              {/* Handover Pass Box */}
              <div className="bg-[#111] text-white rounded-xl p-5 border border-[#1a1a1a] relative overflow-hidden shadow-lg">
                <div className="flex items-start justify-between border-b border-[#1a1a1a] pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">Official Release Token</span>
                    <div className="text-sm font-bold text-white mt-0.5">{item.title}</div>
                    <div className="text-xs text-[#777]">Vault Location: {item.storageLocker}</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center text-black">
                    <QrCode className="w-full h-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777]">Locker PIN Code</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider">8821-NYU</span>
                      <button
                        onClick={handleCopy}
                        className="p-1 rounded hover:bg-[#1a1a1a] text-[#777] hover:text-white transition-colors cursor-pointer"
                        title="Copy PIN"
                      >
                        {copiedPin ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777]">Reservation Window</span>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#a0a0a0] mt-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>46 Hours Remaining</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#161616] border border-[#222] rounded-lg p-3 text-xs flex items-center space-x-2 text-[#a0a0a0]">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span><strong className="text-white">Bobst Library Desk:</strong> Floor 1 Main Lobby. Tap your NYU Card or enter PIN at Locker #B-19.</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+100 Karma Credits Added to Alex's Profile</span>
                </span>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                >
                  Done & View Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
