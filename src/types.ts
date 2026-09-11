export type ScreenType = 'home' | 'dashboard' | 'report' | 'reports' | 'match-hub' | 'admin';

export interface LostItemReport {
  id: string;
  name: string;
  category: string;
  color: string;
  brand: string;
  material: string;
  dateLost: string;
  timeRange: string;
  building: string;
  subLocation: string;
  geoPin: { lat: number; lng: number };
  internalIdentifiers: string;
  wearMarks: string;
  hasPhoto: boolean;
  photoUrl?: string;
  reportedAt: string;
  status: 'scanning' | 'match_found' | 'verified' | 'returned';
  matchConfidence?: number;
  matchedItemId?: string;
}

export interface FoundItemAsset {
  id: string;
  name: string;
  category: string;
  color: string;
  material: string;
  foundLocation: string;
  foundTimeAgo: string;
  custodian: string;
  storageLocker: string;
  verificationLevel: string;
  photoUrl: string;
  identifiersPreview: string;
  status: 'in_custody' | 'pending_verification' | 'claimed' | 'returned';
  building: string;
  matchedReportId?: string;
  matchScore?: number;
  rawAttributes?: {
    cardIdSuffix?: string;
    monogram?: string;
    bifoldArchitecture?: boolean;
    currencyType?: string;
  };
}

// One row from the backend's /dashboard/matches endpoint (find_all_open_matches()).
// Real data — not the fabricated single lost/found pair the dashboard used to assume.
export interface DashboardMatch {
  lost_report_id: string;
  lost_name: string;
  lost_category: string | null;
  lost_building: string | null;
  lost_reported_at: string | null;
  found_item_id: string;
  found_name: string;
  found_category: string | null;
  found_building: string | null;
  found_photo_url: string | null;
  found_at: string | null;
  match_score: number; // 0-1, from pg_trgm-weighted similarity
}

export interface AttributeMatchVector {
  attribute: string;
  lostValue: string;
  foundValue: string;
  score: number;
  weight: string;
  isPrivacyPreserved: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'match' | 'dispatch' | 'system';
  actionScreen?: ScreenType;
}

export interface RecoveryCenter {
  id: string;
  name: string;
  location: string;
  hours: string;
  isOpen: boolean;
  phone: string;
  activeLockers: number;
}