import React, { useState } from 'react';
import { Search, X, ShieldCheck, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { ALL_BROWSE_ITEMS, CAMPUS_BUILDINGS } from '../data/mockData';
import { ScreenType } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectFoundItem: (itemId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectFoundItem
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = ALL_BROWSE_ITEMS.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.recordId.toLowerCase().includes(query.toLowerCase()) ||
    item.building.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl border border-[#1a1a1a] max-w-2xl w-full overflow-hidden text-[#a0a0a0]">
        {/* Search input bar */}
        <div className="p-4 border-b border-[#1a1a1a] flex items-center space-x-3 bg-[#0a0a0a]">
          <Search className="w-5 h-5 text-[#777] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search items by keyword, locker ID, building (e.g. 'wallet', 'Bobst', 'Sony')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-white placeholder-[#555] bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#777] hover:text-white hover:bg-[#161616] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-[#1a1a1a]">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFoundItem(item.id);
                  onNavigate('browse');
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-[#111] cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover border border-[#1a1a1a] shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-blue-400">#{item.recordId}</span>
                      <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-[#777] mt-0.5">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#555]" />
                        <span>{item.building}</span>
                      </span>
                      <span>•</span>
                      <span>Locker {item.storageLocker}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-500/40">
                    {item.matchPercentage}% Match
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#555] group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#777]">
              No matching items currently indexed in campus custody.
            </div>
          )}
        </div>

        {/* Quick Footer Links */}
        <div className="p-3 bg-[#0e0e0e] border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#777]">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#aaa]">Quick suggestions:</span>
            <button
              onClick={() => setQuery('Bobst')}
              className="px-2 py-0.5 bg-[#161616] border border-[#222] rounded hover:border-[#333] text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"
            >
              Bobst
            </button>
            <button
              onClick={() => setQuery('Wallet')}
              className="px-2 py-0.5 bg-[#161616] border border-[#222] rounded hover:border-[#333] text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"
            >
              Wallet
            </button>
            <button
              onClick={() => setQuery('Headphones')}
              className="px-2 py-0.5 bg-[#161616] border border-[#222] rounded hover:border-[#333] text-[#a0a0a0] hover:text-white transition-colors cursor-pointer"
            >
              Headphones
            </button>
          </div>

          <button
            onClick={() => { onNavigate('browse'); onClose(); }}
            className="text-blue-400 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View All Custody Items</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
