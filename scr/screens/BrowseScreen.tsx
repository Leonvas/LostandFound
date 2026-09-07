import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  KeyRound, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Filter
} from 'lucide-react';
import { FoundItem, ScreenType } from '../types';
import { ALL_BROWSE_ITEMS, CAMPUS_BUILDINGS } from '../data/mockData';

interface BrowseScreenProps {
  onSelectFoundItem: (itemId: string) => void;
  onOpenVerificationModal: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const BrowseScreen: React.FC<BrowseScreenProps> = ({
  onSelectFoundItem,
  onOpenVerificationModal,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('All');

  const categories = [
    'All',
    'Wallet / Acc.',
    'Electronics',
    'Keys',
    'Bottles & Mugs'
  ];

  const filteredItems = ALL_BROWSE_ITEMS.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.foundLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesBuilding = 
      selectedBuilding === 'All' || item.building === selectedBuilding;

    return matchesSearch && matchesCategory && matchesBuilding;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#050505] text-[#a0a0a0]">
      
      {/* Top Banner */}
      <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-[#1a1a1a] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 mb-1">
            <span>University Custody Catalog</span>
            <span>•</span>
            <span className="text-[#777]">Secured In Safe Lockers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Browse Items in Campus Custody
          </h1>
          <p className="text-xs text-[#777] mt-1">
            Found items logged by campus safety officers and facility staff awaiting student verification.
          </p>
        </div>

        <button
          onClick={() => onNavigate('report-lost')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm self-start md:self-auto cursor-pointer"
        >
          + Can't Find Yours? Report Lost
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0a0a0a] rounded-2xl p-4 sm:p-5 border border-[#1a1a1a] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#555]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by keyword, asset tag (e.g. FND-7422), or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#111] border border-[#1a1a1a] text-white placeholder:text-[#555] focus:border-blue-500 font-medium outline-none"
            />
          </div>

          {/* Building dropdown */}
          <div className="w-full md:w-64">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#111] border border-[#1a1a1a] text-white focus:border-blue-500 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Campus Buildings</option>
              {CAMPUS_BUILDINGS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1a1a1a]">
          <span className="text-xs font-bold text-[#555] mr-2 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#111] text-[#a0a0a0] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Items in Custody */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] shadow-xs hover:border-[#2a2a2a] transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Image & Asset Tag */}
            <div>
              <div className="relative h-48 bg-[#111] overflow-hidden">
                <img
                  src={item.photoUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#050505]/80 backdrop-blur-xs text-white text-[11px] font-bold border border-[#1a1a1a]">
                  #{item.recordId}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-500/40 text-[11px] font-extrabold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{item.matchPercentage}% Correlation</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-extrabold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs text-[#a0a0a0]">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#555] shrink-0" />
                    <span className="font-medium text-white">{item.foundLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-[#555] shrink-0" />
                    <span>{item.building}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#555] shrink-0" />
                    <span>Locker: <strong className="text-white">{item.storageLocker}</strong> ({item.custodian})</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111] border border-[#1a1a1a] text-[11px] text-[#777]">
                  <strong className="text-[#a0a0a0]">Verification Protocol:</strong> {item.verificationLevel}
                </div>
              </div>
            </div>

            {/* Card Footer Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  onSelectFoundItem(item.id);
                  onOpenVerificationModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Claim Item & Verify Ownership</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
