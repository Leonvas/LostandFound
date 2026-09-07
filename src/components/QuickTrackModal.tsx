import { useState, useEffect } from 'react';
import { Search, X, MapPin, ArrowRight, ShieldCheck, CreditCard, Laptop, Key, Sparkles } from 'lucide-react';
import { ALL_CAMPUS_ITEMS, INITIAL_LOST_REPORT } from '../data/mockData';
import { ScreenType } from '../types';

interface QuickTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: any) => void;
}

export function QuickTrackModal({ isOpen, onClose, onSelectItem }: QuickTrackModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = ALL_CAMPUS_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase()) ||
      item.foundLocation.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-4 pt-20 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search report # (e.g. NYU-8821), item name, or building..."
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-100">
          {/* Quick link to your own active report */}
          <div
            onClick={() => {
              onSelectItem(INITIAL_LOST_REPORT);
              onClose();
            }}
            className="p-3 rounded-xl hover:bg-blue-50/60 cursor-pointer flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{INITIAL_LOST_REPORT.name}</span>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    YOUR REPORT
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    89% MATCH
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Bobst Central Library • {INITIAL_LOST_REPORT.id}</span>
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectItem(item);
                onClose();
              }}
              className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                  {item.category.includes('Electronics') ? (
                    <Laptop className="w-4 h-4" />
                  ) : item.category.includes('Key') ? (
                    <Key className="w-4 h-4" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>
                      {item.building} • {item.foundLocation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                  {item.storageLocker}
                </span>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              No campus items found matching "{query}". Try searching by building name or serial code.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Press ESC to close</span>
          <span className="font-mono">CampusFind Global Directory</span>
        </div>
      </div>
    </div>
  );
}
