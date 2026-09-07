import { useState } from 'react';
import { ALL_CAMPUS_ITEMS } from '../data/mockData';
import { FoundItemAsset } from '../types';
import { Search, Filter, MapPin, Building, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface BrowseItemsScreenProps {
  onSelectFoundItem: (item: FoundItemAsset) => void;
  onOpenReportModal: () => void;
}

export function BrowseItemsScreen({ onSelectFoundItem, onOpenReportModal }: BrowseItemsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Electronics', 'Wallet / Acc.', 'Keys', 'Bottles & Mugs'];
  const buildings = ['all', 'Bobst Central Library', 'Kimmel Center', 'Silver Center', 'Campus Safety HQ'];

  const filtered = ALL_CAMPUS_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesBuilding = selectedBuilding === 'all' || item.building === selectedBuilding;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.foundLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBuilding && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Campus Inventory Registry
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Items in Custody
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            142 items currently secured across 3 authorized campus dispatch centers and smart lockers.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <span>Can't find your item? Report It</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, item name, or asset ID..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="all">All Campus Buildings</option>
              {buildings.filter((b) => b !== 'all').map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold self-center mr-1 text-[11px]">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo Thumbnail */}
              <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-slate-900/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    {item.id}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    In Custody
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.building} • {item.foundLocation}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Custodian</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate block">
                      {item.custodian}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Holding Locker</span>
                    <span className="font-mono font-semibold text-blue-700 text-[11px] block">
                      {item.storageLocker}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0">
              <button
                onClick={() => onSelectFoundItem(item)}
                className="w-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Check If It's Yours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
