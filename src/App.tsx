import { useState, useEffect } from 'react';
import { ScreenType, LostItemReport, FoundItemAsset, NotificationItem } from './types';
import { RECOVERY_CENTERS, NOTIFICATIONS, CURRENT_USER } from './data/mockData';
import { adaptFoundItem } from './lib/adaptItems';
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

const API_BASE = 'http://localhost:8000';

// Placeholder shapes so screens that assume a report/match always exists
// don't crash before any real data comes in. All fields blank — no fake
// wallet/MacBook data — these just prevent undefined.property crashes.
const EMPTY_LOST_REPORT: LostItemReport = {
  id: '',
  name: '',
  category: '',
  color: '',
  brand: '',
  material: '',
  dateLost: '',
  timeRange: '',
  building: '',
  subLocation: '',
  geoPin: { lat: 0, lng: 0 },
  internalIdentifiers: '',
  wearMarks: '',
  hasPhoto: false,
  reportedAt: '',
  status: 'scanning',
};

const EMPTY_FOUND_ITEM: FoundItemAsset = {
  id: '',
  name: '',
  category: '',
  color: '',
  material: '',
  foundLocation: '',
  foundTimeAgo: '',
  custodian: '',
  storageLocker: '',
  verificationLevel: '',
  photoUrl: '',
  identifiersPreview: '',
  status: 'in_custody',
  building: '',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [lostReports, setLostReports] = useState<LostItemReport[]>([]);
  const [foundItem, setFoundItem] = useState<FoundItemAsset | null>(null);
  const [secondaryItem, setSecondaryItem] = useState<FoundItemAsset | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Modals state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyTargetItem, setVerifyTargetItem] = useState<FoundItemAsset | null>(null);
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

  // Handle New Lost Item Report — posts to Supabase via FastAPI, then reacts
  // to whatever the real matching function found (if anything).
  const handleCreateReport = async (reportData: Partial<LostItemReport>) => {
    const res = await fetch(`${API_BASE}/lost-reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: reportData.name,
        category: reportData.category,
        color: reportData.color,
        brand: reportData.brand,
        material: reportData.material,
        date_lost: reportData.dateLost,
        time_range: reportData.timeRange,
        building: reportData.building,
        sub_location: reportData.subLocation,
        internal_identifiers: reportData.internalIdentifiers,
        wear_marks: reportData.wearMarks,
        has_photo: reportData.hasPhoto || false,
      }),
    });

    if (!res.ok) {
      showToast('Something went wrong submitting your report.');
      return;
    }

    const { report, matches } = await res.json();
    const topMatch = matches?.[0];
    // Trigram similarity score is 0-1; 0.3 is a reasonable "worth surfacing" floor — tune as you see real data.
    const hasStrongMatch = !!topMatch && topMatch.match_score > 0.3;

    const newReport: LostItemReport = {
      id: report.id,
      name: report.name,
      category: report.category || '',
      color: report.color || '',
      brand: report.brand || '',
      material: report.material || '',
      dateLost: report.date_lost || '',
      timeRange: report.time_range || '',
      building: report.building || '',
      subLocation: report.sub_location || '',
      geoPin: { lat: 40.7295, lng: -73.9972 },
      internalIdentifiers: report.internal_identifiers || '',
      wearMarks: report.wear_marks || '',
      hasPhoto: report.has_photo || false,
      reportedAt: 'Just now',
      status: hasStrongMatch ? 'match_found' : 'scanning',
      matchConfidence: hasStrongMatch ? Math.round(topMatch.match_score * 100) : undefined,
      matchedItemId: hasStrongMatch ? topMatch.id : undefined,
    };

    setLostReports((prev) => [newReport, ...prev]);

    if (hasStrongMatch) {
      setFoundItem(adaptFoundItem(topMatch));
      if (matches[1]) setSecondaryItem(adaptFoundItem(matches[1]));

      const newNotif: NotificationItem = {
        id: `n-${Date.now()}`,
        title: `Match Found (${newReport.matchConfidence}%)`,
        description: `Your reported ${newReport.name} matched a found item${
          newReport.building ? ` near ${newReport.building}` : ''
        }.`,
        time: 'Just now',
        read: false,
        type: 'match',
        actionScreen: 'dashboard',
      };
      setNotifications((prev) => [newNotif, ...prev]);
      showToast(`Report registered! A ${newReport.matchConfidence}% match was found.`);
    } else {
      showToast(`Report registered. We'll notify you if a match turns up.`);
    }
  };

  // Handle Found Item submission — posts to Supabase, and checks (server-side)
  // whether it matches any open lost report.
  const handleFoundItemSubmit = async (item: any) => {
    const res = await fetch(`${API_BASE}/found-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        found_location: item.location,
      }),
    });

    if (!res.ok) {
      showToast('Something went wrong saving your found item.');
      return;
    }

    const { matches } = await res.json();
    CURRENT_USER.karmaPoints += 150;

    if (matches?.length) {
      showToast(`Found item logged! It may match an existing lost report. +150 Karma Credits.`);
    } else {
      showToast(`Found item logged! +150 Karma Credits added to your NYU NetID.`);
    }
  };

  // Handle Ownership Verification success
  const handleVerificationSuccess = (itemId: string) => {
    setFoundItem((prev) => (prev ? { ...prev, status: 'claimed' } : prev));
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
            lostReport={lostReports[0] ?? EMPTY_LOST_REPORT}
            foundItem={foundItem ?? EMPTY_FOUND_ITEM}
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
            lostReport={lostReports[0] ?? EMPTY_LOST_REPORT}
            foundItem={foundItem ?? EMPTY_FOUND_ITEM}
            secondaryItem={secondaryItem ?? EMPTY_FOUND_ITEM}
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
            foundItem={foundItem ?? EMPTY_FOUND_ITEM}
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
        foundItem={verifyTargetItem ?? EMPTY_FOUND_ITEM}
        onVerificationSuccess={handleVerificationSuccess}
      />

      <MatchMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
        onProceedToVerify={() => {
          if (foundItem) {
            setVerifyTargetItem(foundItem);
            setIsVerifyModalOpen(true);
          }
        }}
        lostReport={lostReports[0] ?? null}
        foundItem={foundItem}
        matchScore={lostReports[0]?.matchConfidence ?? 0}
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
          if (foundItem && (item.id === foundItem.id || item.matchedItemId)) {
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
