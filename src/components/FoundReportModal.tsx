import { useState, FormEvent } from 'react';
import { HandHeart, X, Camera, MapPin, Building, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface FoundReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (item: any) => void;
}

export function FoundReportModal({ isOpen, onClose, onSuccess }: FoundReportModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('Bobst Library');
  const [room, setRoom] = useState('4th Floor Study Room');
  const [handoverPref, setHandoverPref] = useState('front_desk');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccess({
        id: `FND-NYU-${Math.floor(7500 + Math.random() * 500)}`,
        name: title || 'Found Item',
        category,
        location: `${location} - ${room}`,
        custodian: handoverPref,
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Turn in a Found Item</h3>
              <p className="text-[11px] text-slate-400">Earn +150 Karma Credits for good citizenship</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                What item did you find? *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Blue Hydro Flask, Silver AirPods Case"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Wallets & Purses">Wallets & Purses</option>
                  <option value="Keys">Keys</option>
                  <option value="Bottles & Mugs">Bottles & Mugs</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books & Notebooks">Books & Notebooks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Campus Building</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="Bobst Central Library">Bobst Library</option>
                  <option value="Kimmel Center">Kimmel Center</option>
                  <option value="Silver Center">Silver Center</option>
                  <option value="Courant Institute">Courant Institute</option>
                  <option value="Campus Safety HQ">Campus Safety HQ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Specific Room / Desk</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. 2nd floor quiet room desk 12"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Handover / Custody Method
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setHandoverPref('front_desk')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    handoverPref === 'front_desk'
                      ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">Staff Desk Deposit</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Hand over to front desk guard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setHandoverPref('smart_locker')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    handoverPref === 'smart_locker'
                      ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">24/7 Smart Locker</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Drop in automated vault bin</div>
                </button>
              </div>
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
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging Found Asset...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Claim Karma</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank you for helping campus!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              You've been credited <strong>+150 Karma points</strong>. Staff has been alerted to
              intake the item into secure vault custody.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
