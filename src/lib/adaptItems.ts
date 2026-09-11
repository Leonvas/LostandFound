import { FoundItemAsset, LostItemReport } from '../types';

export function adaptFoundItem(row: any): FoundItemAsset {
  return {
    id: row.id,
    name: row.name,
    category: row.category ?? 'Uncategorized',
    color: row.color ?? '',
    material: row.material ?? '',
    foundLocation: row.found_location ?? '',
    foundTimeAgo: row.found_at ? new Date(row.found_at).toLocaleString() : '',
    custodian: row.custodian ?? 'Campus Front Desk',
    storageLocker: row.storage_locker ?? 'Unassigned',
    verificationLevel: row.verification_level ?? 'Pending Review',
    photoUrl: row.photo_url || 'https://placehold.co/400x300?text=No+Photo',
    identifiersPreview: row.identifiers_preview ?? '',
    status: row.status ?? 'in_custody',
    building: row.building ?? '',
    matchedReportId: row.matched_report_id ?? undefined,
    matchScore: row.match_score ?? undefined,
  };
}

export function adaptLostReport(row: any): LostItemReport {
  return {
    id: row.id,
    name: row.name,
    category: row.category ?? '',
    color: row.color ?? '',
    brand: row.brand ?? '',
    material: row.material ?? '',
    dateLost: row.date_lost ?? '',
    timeRange: row.time_range ?? '',
    building: row.building ?? '',
    subLocation: row.sub_location ?? '',
    geoPin: { lat: 0, lng: 0 },
    internalIdentifiers: row.internal_identifiers ?? '',
    wearMarks: row.wear_marks ?? '',
    hasPhoto: row.has_photo ?? false,
    photoUrl: row.photo_url ?? undefined,
    reportedAt: row.reported_at ? new Date(row.reported_at).toLocaleString() : '',
    status: row.status ?? 'scanning',
    matchConfidence: row.match_confidence ?? undefined,
    matchedItemId: row.matched_item_id ?? undefined,
  };
}