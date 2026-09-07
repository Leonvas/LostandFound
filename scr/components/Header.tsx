import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  PlusCircle, 
  ChevronDown, 
  LogOut, 
  UserPlus, 
  LayoutDashboard, 
  Sparkles, 
  Compass, 
  FileText,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { ScreenType, UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  user,
  notifications,
  onOpenNotifications,
  onOpenSearch,
  onSignOut
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
      {/* Top Enclave Identity Ribbon */}
      <div className="bg-[#050505] text-[#777] text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#1a1a1a]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">Campus SSO Enclave Active</span>
          </div>
          <span className="text-[#333]">|</span>
          <span className="hidden sm:inline text-[#777]">FERPA & Zero-Knowledge Custody Protocol</span>
          <span className="text-[#333] hidden sm:inline">|</span>
          <span className="hidden md:inline text-[#555]">Node: NYU-Bobst-Cluster-04 (14ms latency)</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Bobst Desk: Open</span>
          </div>
          <span className="text-[#333]">|</span>
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors text-[11px] text-[#777]"
          >
            System Status
          </button>
          <span className="text-[#333]">|</span>
          <span className="text-[11px] text-[#555]">Safety 24/7: (212) 998-2222</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">Campus<span className="text-blue-500">Find</span></span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#111] text-blue-400 border border-[#1a1a1a]">NYU</span>
                </div>
                <p className="text-[11px] text-[#555] font-medium leading-none -mt-0.5">Autonomous Property Recovery</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  currentScreen === 'dashboard'
                    ? 'bg-[#111] text-white border border-[#1a1a1a] shadow-xs'
                    : 'text-[#777] hover:text-white hover:bg-[#111]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => onNavigate('browse')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  currentScreen === 'browse'
                    ? 'bg-[#111] text-white border border-[#1a1a1a] shadow-xs'
                    : 'text-[#777] hover:text-white hover:bg-[#111]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Browse Custody</span>
              </button>

              <button
                onClick={() => onNavigate('report-lost')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  currentScreen === 'report-lost'
                    ? 'bg-[#111] text-white border border-[#1a1a1a] shadow-xs'
                    : 'text-[#777] hover:text-white hover:bg-[#111]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Incident Dispatch</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  currentScreen === 'home'
                    ? 'bg-[#111] text-white border border-[#1a1a1a] shadow-xs'
                    : 'text-[#777] hover:text-white hover:bg-[#111]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Overview & AI</span>
              </button>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-3">
            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0a0a0a] text-[#777] hover:bg-[#111] hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#555]" />
              <span>Search locker / item ID...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#111] text-[10px] text-[#777] font-mono border border-[#1a1a1a]">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative w-9 h-9 rounded-full border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#111] transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0a0a0a]"></span>
              )}
            </button>

            {/* "+ Report Item" Primary CTA */}
            <button
              onClick={() => onNavigate('report-lost')}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Report Item</span>
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-1 pl-2 pr-2.5 rounded-full border border-[#1a1a1a] hover:border-[#222] hover:bg-[#111] transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#1a1a1a]"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0a0a0a]" />
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-white leading-tight">{user.name}</div>
                  <div className="text-[10px] text-[#555]">{user.classification}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#555]" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0a0a0a] shadow-2xl border border-[#1a1a1a] py-2 z-50 text-[#a0a0a0] animate-in fade-in duration-150"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-[#1a1a1a]">
                    <p className="text-[11px] text-[#555] uppercase tracking-wider font-semibold">University SSO Active</p>
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-[#777] truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-[#111] p-2 rounded-xl border border-[#1a1a1a]">
                      <span className="text-[#777]">Student Karma:</span>
                      <span className="font-bold text-emerald-400">₹{user.karmaCredits} pts</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { onNavigate('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#a0a0a0] hover:text-white hover:bg-[#111] flex items-center space-x-2.5 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#555]" />
                      <span>My Reports & Matches</span>
                    </button>

                    <button
                      onClick={() => { onNavigate('report-lost'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#a0a0a0] hover:text-white hover:bg-[#111] flex items-center space-x-2.5 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-[#555]" />
                      <span>Report Lost Item</span>
                    </button>

                    <button
                      onClick={() => { onNavigate('browse'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#a0a0a0] hover:text-white hover:bg-[#111] flex items-center space-x-2.5 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-[#555]" />
                      <span>University Custody Lockers</span>
                    </button>

                    <button
                      onClick={() => { onNavigate('register'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-blue-400 hover:text-blue-300 hover:bg-[#111] flex items-center space-x-2.5 border-t border-[#1a1a1a] cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4 text-blue-500" />
                      <span>Switch to Register View</span>
                    </button>

                    <button
                      onClick={() => { onSignOut(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-[#111] flex items-center space-x-2.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out / Switch to Login Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick View Bar to directly navigate to all screens easily */}
        <div className="py-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs overflow-x-auto scrollbar-none gap-2">
          <div className="flex items-center space-x-1 shrink-0 text-[#777] font-medium">
            <span className="text-[10px] uppercase tracking-widest text-[#555] font-bold mr-1">App Screens:</span>
            <button
              onClick={() => onNavigate('login')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'login' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              1. Login Page
            </button>
            <button
              onClick={() => onNavigate('register')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'register' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              2. Student Registration
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              3. Main Dashboard
            </button>
            <button
              onClick={() => onNavigate('report-lost')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'report-lost' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              4. Incident Dispatch Form
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'browse' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              5. Custody Locker Catalog
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${currentScreen === 'home' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-[#111] hover:text-white text-[#777]'}`}
            >
              6. CampusFind Showcase
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#555] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Zero-Knowledge Blind Verification Activated</span>
          </div>
        </div>
      </div>
    </header>
  );
};
