import { useState } from 'react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';
import { Search, Plus, Bell, ChevronDown, ShieldCheck, Award, LogOut } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickTrack: () => void;
  unreadCount?: number;
  onToggleNotifications: () => void;
}

export function Navbar({
  currentScreen,
  onNavigate,
  onOpenQuickTrack,
  unreadCount = 3,
  onToggleNotifications,
}: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: { id: ScreenType; label: string; badge?: number }[] = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'browse', label: 'Browse Items' },
    { id: 'reports', label: 'My Reports' },
    { id: 'match-hub', label: 'AI Match Hub' },
    { id: 'dashboard', label: 'Notifications', badge: unreadCount },
    { id: 'admin', label: 'Admin Portal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <BrandLogo size="lg" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                CampusFind
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                CAMPUS V2.4
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium leading-none">
              Lost today. Found tomorrow.
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-600">
          {navItems.map((item) => {
            const isNotifications = item.label === 'Notifications';
            const isActive =
              !isNotifications &&
              (currentScreen === item.id ||
                (item.id === 'reports' && currentScreen === 'reports') ||
                (item.id === 'match-hub' && currentScreen === 'match-hub'));

            if (isNotifications) {
              return (
                <button
                  key={item.label}
                  onClick={onToggleNotifications}
                  className="relative px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5"
                >
                  <span>Notifications</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full inline-flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            }

            return (
              <button
                key={item.id + item.label}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Report CTA, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Quick Track Input */}
          <button
            onClick={onOpenQuickTrack}
            className="hidden md:flex items-center gap-2 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200/80 px-2.5 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            title="Quick item search"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-normal">Quick track...</span>
            <kbd className="bg-white border border-slate-200 text-slate-400 text-[10px] px-1.5 py-0.5 rounded shadow-2xs font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile notification trigger */}
          <button
            onClick={onToggleNotifications}
            className="xl:hidden relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            title="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Report Item Primary CTA */}
          <button
            id="nav-report-item-btn"
            onClick={() => onNavigate('report')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:shadow-blue-500/20 active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Report Item</span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-slate-100 transition-colors group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {CURRENT_USER.name}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium leading-none">
                  Online
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{CURRENT_USER.name}</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      NYU .EDU SSO
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    node #nyu-99420
                  </div>
                </div>

                <div className="px-3.5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Karma Balance</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {CURRENT_USER.karmaPoints} pts
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Student Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reports');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <span>My 1 Active Report</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <span>Campus Safety Staff View</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out (NYU NetID)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
