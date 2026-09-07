import { useState, FormEvent } from 'react';
import { FoundItemAsset } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  X,
  Lock,
  Sparkles,
  KeyRound,
  QrCode,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  foundItem: FoundItemAsset;
  onVerificationSuccess: (itemId: string) => void;
}

export function VerificationModal({
  isOpen,
  onClose,
  foundItem,
  onVerificationSuccess,
}: VerificationModalProps) {
  const [q1, setQ1] = useState('4092');
  const [q2, setQ2] = useState('A.K.');
  const [q3, setQ3] = useState('Yes, $20 bill in coin pocket');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setVerificationError(null);
    setIsVerifying(true);

    // Simulate cryptographic zero-knowledge challenge check
    setTimeout(() => {
      if (q1.trim().endsWith('4092')) {
        setIsVerified(true);
        setIsVerifying(false);
        onVerificationSuccess(foundItem.id);
      } else {
        setIsVerifying(false);
        setVerificationError(
          'Verification hash mismatch. Please review your answers against your registered report.'
        );
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Zero-Knowledge Blind Verification</h3>
              <p className="text-[11px] text-slate-400">Claim Handover for {foundItem.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isVerified ? (
          <form onSubmit={handleVerify} className="p-6 space-y-5">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Campus safety intake officers marked 3 secret descriptors without publishing them.
                Answering correctly will instantly unlock your electronic handover token.
              </p>
            </div>

            {verificationError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{verificationError}</span>
              </div>
            )}

            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                1. What are the last 4 digits of the student ID or dorm pass stored in the card slot?
              </label>
              <input
                type="text"
                required
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="e.g. 4092"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <span className="text-[10px] text-slate-400">Cryptographically salted & hashed</span>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                2. Are there any engraved initials or monograms on the exterior leather?
              </label>
              <input
                type="text"
                required
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
                placeholder="e.g. A.K."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                3. What hidden emergency items or specific currency are concealed inside?
              </label>
              <input
                type="text"
                required
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
                placeholder="e.g. Emergency $20 bill, transit voucher"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isVerifying}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Cryptographic Tokens...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Ownership Claim</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS STATE: Digital Claim Pass & Smart Locker Retrieval Code */
          <div className="p-6 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Claim Confirmed • 100% Match
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 mt-2">
                Ownership Verified Successfully!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Your credentials have been authenticated. Your item is staged for immediate contactless
                pickup.
              </p>
            </div>

            {/* Smart Locker PIN Box */}
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-xs">
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span className="font-bold">Smart Locker Release Pass</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">VAULT BIN #B-19</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    One-Time Retrieval PIN
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-white tracking-widest mt-0.5">
                    839 • 210
                  </div>
                </div>

                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Bobst Central Library Floor 1 Main Lobby Desk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Valid for pickup until tomorrow 11:00 PM</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-all"
            >
              Done — Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
