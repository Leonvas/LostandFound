import { FoundItemAsset } from '../types';

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