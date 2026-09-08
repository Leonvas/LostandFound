import { useState, useEffect } from 'react';
import { ScreenType, LostItemReport, FoundItemAsset, NotificationItem } from './types';
import {
  INITIAL_LOST_REPORT,
  INITIAL_FOUND_ITEM,
  SECONDARY_MATCH_CANDIDATE,
  RECOVERY_CENTERS,
  NOTIFICATIONS,
  CURRENT_USER,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ReportScreen } from './components/ReportScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { BrowseItemsScreen } from './components/BrowseItemsScreen';
import { MyReportsScreen } from './components/MyReportsScreen';
import { AdminPortal } from './components/AdminPortal';
import { VerificationModal } from './components/VerificationModal';
import { MatchMatrixModal } from './components/MatchMatrixModal';
import { FoundReportModal } from './components/FoundReportModal';
import { QuickTrackModal } from './components/QuickTrackModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [lostReports, setLostReports] = useState<LostItemReport[]>([INITIAL_LOST_REPORT]);
  const [foundItem, setFoundItem] = useState<FoundItemAsset>(INITIAL_FOUND_ITEM);
  const [secondaryItem, setSecondaryItem] = useState<FoundItemAsset>(SECONDARY_MATCH_CANDIDATE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Modals state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyTargetItem, setVerifyTargetItem] = useState<FoundItemAsset>(INITIAL_FOUND_ITEM);
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Keyboard shortcut for Quick Track
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickTrackOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle New Lost Item Report
  const handleCreateReport = (reportData: Partial<LostItemReport>) => {
    const newReport: LostItemReport = {
      id: `LOST-NYU-${Math.floor(8820 + Math.random() * 100)}`,
      name: reportData.name || 'Personal Item',
      category: reportData.category || 'Accessories',
      color: reportData.color || 'Dark',
      brand: reportData.brand || 'Custom',
      material: reportData.material || 'Standard',
      dateLost: reportData.dateLost || 'Today',
      timeRange: reportData.timeRange || '10:00 AM - 12:00 PM',
      building: reportData.building || 'Bobst Central Library',
      subLocation: reportData.subLocation || 'Main Floor',
      geoPin: { lat: 40.7295, lng: -73.9972 },
      internalIdentifiers: reportData.internalIdentifiers || '',
      wearMarks: reportData.wearMarks || '',
      hasPhoto: reportData.hasPhoto || false,
      reportedAt: 'Just now',
      status: 'match_found',
      matchConfidence: 89,
      matchedItemId: 'FND-NYU-7422',
    };

    setLostReports([newReport, ...lostReports]);

    // Add match notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'Neural Engine Match Found (89%)',
      description: `Your reported ${newReport.name} matched Found Item #FND-NYU-7422 at Bobst Library!`,
      time: 'Just now',
      read: false,
      type: 'match',
      actionScreen: 'dashboard',
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`Lost item report ${newReport.id} registered! Live neural match found (89%).`);
  };

  // Handle Found Item submission
  const handleFoundItemSubmit = (item: any) => {
    CURRENT_USER.karmaPoints += 150;
    showToast(`Found item logged! +150 Karma Credits added to your NYU NetID.`);
  };

  // Handle Ownership Verification success
  const handleVerificationSuccess = (itemId: string) => {
    setFoundItem((prev) => ({
      ...prev,
      status: 'claimed',
    }));
    setLostReports((prev) =>
      prev.map((r) => (r.matchedItemId === itemId ? { ...r, status: 'verified' } : r))
    );
    showToast('Ownership 100% verified! Smart Locker Bin #B-19 unlocked for pickup.');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FF] text-[#0B1C30]">
      {/* Top Navbar (Persistent Across Screens) */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          if (screen === 'match-hub') {
            setIsMatrixModalOpen(true);
          } else {
            setCurrentScreen(screen);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickTrack={() => setIsQuickTrackOpen(true)}
        unreadCount={unreadNotificationsCount}
        onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReportModal={() => {
              setCurrentScreen('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFoundModal={() => setIsFoundModalOpen(true)}
            onInspectMatrix={() => setIsMatrixModalOpen(true)}
            lostReport={lostReports[0]}
            foundItem={foundItem}
          />
        )}

        {currentScreen === 'report' && (
          <ReportScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitReport={handleCreateReport}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReportModal={() => {
              setCurrentScreen('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFoundModal={() => setIsFoundModalOpen(true)}
            onOpenVerifyModal={(item) => {
              setVerifyTargetItem(item);
              setIsVerifyModalOpen(true);
            }}
            onInspectMatrix={() => setIsMatrixModalOpen(true)}
            lostReport={lostReports[0]}
            foundItem={foundItem}
            secondaryItem={secondaryItem}
            recoveryCenters={RECOVERY_CENTERS}
          />
        )}

        {currentScreen === 'browse' && (
          <BrowseItemsScreen
            onSelectFoundItem={(item) => {
              setVerifyTargetItem(item);
              setIsVerifyModalOpen(true);
            }}
            onOpenReportModal={() => {
              setCurrentScreen('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'reports' && (
          <MyReportsScreen
            reports={lostReports}
            foundItem={foundItem}
            onOpenReportModal={() => {
              setCurrentScreen('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVerifyModal={(item) => {
              setVerifyTargetItem(item);
              setIsVerifyModalOpen(true);
            }}
            onInspectMatrix={() => setIsMatrixModalOpen(true)}
          />
        )}

        {currentScreen === 'admin' && <AdminPortal />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(screen) => setCurrentScreen(screen)} />

      {/* Modals */}
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        foundItem={verifyTargetItem}
        onVerificationSuccess={handleVerificationSuccess}
      />

      <MatchMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
        onProceedToVerify={() => {
          setVerifyTargetItem(foundItem);
          setIsVerifyModalOpen(true);
        }}
      />

      <FoundReportModal
        isOpen={isFoundModalOpen}
        onClose={() => setIsFoundModalOpen(false)}
        onSuccess={handleFoundItemSubmit}
      />

      <QuickTrackModal
        isOpen={isQuickTrackOpen}
        onClose={() => setIsQuickTrackOpen(false)}
        onSelectItem={(item) => {
          setCurrentScreen('dashboard');
          if (item.id === foundItem.id || item.matchedItemId) {
            setVerifyTargetItem(foundItem);
            setIsVerifyModalOpen(true);
          }
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onSelectNotification={(item) => {
          if (item.actionScreen) {
            setCurrentScreen(item.actionScreen);
          }
          setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
          );
        }}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm max-w-md">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex-1 font-medium">{toastMessage}</div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

