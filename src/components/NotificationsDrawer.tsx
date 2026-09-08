import { NotificationItem, ScreenType } from '../types';
import { Bell, X, Sparkles, ShieldCheck, Check, Clock } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onMarkAllRead: () => void;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onMarkAllRead,
}: NotificationsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Campus Alerts & Matches</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold"
              >
                Mark read
              </button>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-100 max-h-[calc(100vh-120px)] overflow-y-auto">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectNotification(item);
                  onClose();
                }}
                className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                  !item.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    {item.type === 'match' ? (
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400 font-mono">
          CampusFind Live Push Node #NYU-99420
        </div>
      </div>
    </div>
  );
}
