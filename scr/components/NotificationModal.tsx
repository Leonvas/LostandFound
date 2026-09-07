import React from 'react';
import { Bell, X, CheckCheck, Sparkles, KeyRound, Check } from 'lucide-react';
import { NotificationItem, ScreenType } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenVerificationModal: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNavigate,
  onOpenVerificationModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/70 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl border border-[#1a1a1a] max-w-md w-full overflow-hidden mt-12 sm:mr-6 text-[#a0a0a0]">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#0e0e0e]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#161616] border border-[#222] text-blue-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Campus Alerts</h3>
              <p className="text-[11px] text-[#777]">Autonomous Neural Dispatch Updates</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#777] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-[#1a1a1a] max-h-96 overflow-y-auto">
          {notifications.map(item => (
            <div 
              key={item.id}
              className={`p-4 transition-colors ${!item.read ? 'bg-[#0e1520]' : 'hover:bg-[#111]'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${
                    item.type === 'match' 
                      ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30' 
                      : item.type === 'handover' 
                      ? 'bg-blue-950/50 text-blue-400 border-blue-500/30' 
                      : 'bg-amber-950/50 text-amber-400 border-amber-500/30'
                  }`}>
                    {item.type === 'match' && <Sparkles className="w-3.5 h-3.5" />}
                    {item.type === 'handover' && <KeyRound className="w-3.5 h-3.5" />}
                    {item.type === 'reward' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                    <p className="text-xs text-[#a0a0a0] mt-1 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-[#666] mt-1.5 inline-block font-mono">{item.time}</span>
                  </div>
                </div>
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                )}
              </div>

              {item.type === 'match' && (
                <div className="mt-3 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenVerificationModal();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    View Match & Verify
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('dashboard');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#222] hover:bg-[#202020] text-[#ccc] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Open Dashboard
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
