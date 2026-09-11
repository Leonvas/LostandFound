import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { HandHeart, X, Camera, MapPin, Building, Award, CheckCircle2, ArrowRight, Upload, Loader2 } from 'lucide-react';
import { uploadItemPhoto } from '../lib/uploadPhoto';

interface FoundReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (item: any) => void;
}

export function FoundReportModal({ isOpen, onClose, onSuccess }: FoundReportModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [location, setLocation] = useState('Bobst Library');
  const [customBuilding, setCustomBuilding] = useState('');
  const [room, setRoom] = useState('4th Floor Study Room');
  const [handoverPref, setHandoverPref] = useState('front_desk');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Photo upload state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setPhotoError(null);
    setPhotoFileName(file.name);
    setIsUploadingPhoto(true);

    try {
      const url = await uploadItemPhoto(file, 'found');
      setPhotoUrl(url);
    } catch (err) {
      console.error('Photo upload failed:', err);
      setPhotoError('Could not upload that photo. Please try again.');
      setPhotoFileName(null);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    setPhotoFileName(null);
    setPhotoError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const building = location === 'Other' ? customBuilding.trim() : location;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccess({
        id: `FND-NYU-${Math.floor(7500 + Math.random() * 500)}`,
        name: title || 'Found Item',
        category,
        color: color.trim() || undefined,
        material: material.trim() || undefined,
        building,
        location: `${building} - ${room}`,
        custodian: handoverPref,
        photoUrl: photoUrl || undefined,
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
                  <option value="Other">Other (type your own)</option>
                </select>
              </div>
            </div>

            {location === 'Other' && (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Building Name</label>
                <input
                  type="text"
                  required
                  value={customBuilding}
                  onChange={(e) => setCustomBuilding(e.target.value)}
                  placeholder="e.g. Stern School of Business"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Colour</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Black, Navy Blue"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Leather, Aluminium"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
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

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Add a Photo (optional)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/heic,image/heif"
                className="hidden"
                onChange={handlePhotoFileChange}
              />

              {photoUrl ? (
                <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 flex items-center gap-3">
                  <img
                    src={photoUrl}
                    alt="Found item preview"
                    className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-700 truncate">
                      {photoFileName || 'Photo uploaded'}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">Uploaded successfully</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="w-full border border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col items-center gap-1 cursor-pointer disabled:opacity-60"
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      <span className="text-xs font-semibold text-slate-700">Uploading photo…</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">Click to select a photo</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG or HEIC up to 15MB</span>
                    </>
                  )}
                </button>
              )}

              {photoError && <div className="text-[11px] text-red-600 font-medium mt-1.5">{photoError}</div>}
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
                disabled={isSubmitting || isUploadingPhoto}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging Found Asset...</span>
                  </>
                ) : (
                  <>
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
