import { UserProfile, FoundItem, ActivityEvent, RecoveryCenter, NotificationItem, ItemReport } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Turner',
  email: 'alex.turner@nyu.edu',
  studentId: 'N-19482014',
  netId: 'NYU-99420',
  department: 'College of Arts & Science',
  classification: 'Sophomore',
  karmaCredits: 500,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  isOnline: true,
  institution: 'New York University'
};

export const INITIAL_FOUND_MATCH: FoundItem = {
  id: 'match-1',
  recordId: 'FND-7422',
  title: 'Black Bifold Wallet',
  category: 'Wallet / Acc.',
  colorTone: 'Matte Black',
  material: 'Top-grain Leather',
  identifiers: 'RFID Pass + NYU ID',
  foundLocation: '2nd Floor Study Commons',
  building: 'Bobst Central Library',
  custodian: 'Campus Safety Desk #2',
  storageLocker: 'Secure Vault Bin #B-19',
  timeAgo: '45 mins ago',
  photoUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600',
  verificationLevel: 'Serial Number Confirmed',
  matchPercentage: 89,
  holdExpiresInHours: 46,
  reportReference: 'REPORT #NYU-8821',
  reassuranceNote: "You didn't submit an image with your report. Our AI engine successfully correlated your description ('black bifold with gym tag') with metadata ingested by Safety Officer Perez. Blind claim active: PII protected until ownership verified."
};

export const INITIAL_REPORTS: ItemReport[] = [
  {
    id: 'NYU-8821',
    title: 'Black Leather Bifold Wallet',
    category: 'Wallets, Bags & Accessories',
    brand: 'Bellroy Slim Sleeve',
    color: 'Black / Dark Charcoal',
    material: 'Genuine Full-Grain Leather',
    dateLost: 'Today, Oct 14, 2024',
    timeRange: 'Between 10:00 AM - 12:30 PM',
    building: 'Bobst Central Library',
    microZone: '2nd Floor Quiet Study East, Desk Cluster #14 next to the glass atrium',
    internalIdentifiers: 'NYU Student ID ending in 4092, blue MetroCard in quick-pull tab, emergency $20 bill inside coin pocket',
    wearMarks: "Faint horizontal scuff on lower spine; embossed with faint initials 'A.K.' on bottom right corner; loose stitch on card slot.",
    photoOption: 'no-photo',
    status: 'matched',
    createdAt: '2 hrs ago',
    matchScore: 89
  },
  {
    id: 'NYU-8819',
    title: 'MacBook Air 13" (Space Gray)',
    category: 'Electronics',
    brand: 'Apple M2 2023',
    color: 'Space Gray',
    material: 'Aluminum Anodized',
    dateLost: 'Yesterday, Oct 13, 2024',
    timeRange: '4:00 PM - 6:00 PM',
    building: 'Bobst Central Library',
    microZone: 'Lower Level LL1 Tech Computer Lab',
    internalIdentifiers: 'Sticker of GitHub octocat and NYU Hackathon 2023',
    wearMarks: 'Tiny dent near USB-C left port',
    photoOption: 'no-photo',
    status: 'active',
    createdAt: 'Yesterday',
    matchScore: 52
  }
];

export const ALL_BROWSE_ITEMS: FoundItem[] = [
  INITIAL_FOUND_MATCH,
  {
    id: 'fnd-2',
    recordId: 'FND-7428',
    title: 'Sony WH-1000XM4 Headphones (Silver)',
    category: 'Electronics',
    colorTone: 'Platinum Silver',
    material: 'Synthetic Leather & Polymer',
    identifiers: 'Bluetooth ID: Alex_XM4, custom engraved case',
    foundLocation: 'Kimmel Center 4th Floor Lounge',
    building: 'Kimmel Center for University Life',
    custodian: 'Kimmel Info Desk Desk #1',
    storageLocker: 'Locker #C-04',
    timeAgo: '1 hr ago',
    photoUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600',
    verificationLevel: 'MAC Address & Serial Logged',
    matchPercentage: 78,
    holdExpiresInHours: 72,
    reportReference: 'IN-CUSTODY #KM-102',
    reassuranceNote: 'Secured inside climate-controlled electronics bin.'
  },
  {
    id: 'fnd-3',
    recordId: 'FND-7419',
    title: 'Hydro Flask 32oz Wide Mouth (Olive)',
    category: 'Bottles & Mugs',
    colorTone: 'Olive Green',
    material: 'Stainless Steel / Silicone boot',
    identifiers: 'Yellow Yosemite sticker, dented bottom rim',
    foundLocation: 'Paulson Center Gymnasium Bench #3',
    building: 'Paulson Center',
    custodian: 'Athletics Equipment Desk',
    storageLocker: 'Bin #ATH-12',
    timeAgo: '3 hrs ago',
    photoUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    verificationLevel: 'Visual Inspection Verified',
    matchPercentage: 65,
    holdExpiresInHours: 96,
    reportReference: 'IN-CUSTODY #PL-889',
    reassuranceNote: 'Sanitized and stored in athletics safe depot.'
  },
  {
    id: 'fnd-4',
    recordId: 'FND-7415',
    title: 'Brass Dorm Keyring with Blue Carabiner',
    category: 'Keys',
    colorTone: 'Brass & Royal Blue',
    material: 'Metals & Anodized Aluminum',
    identifiers: '3 brass keys + purple fob #F-412',
    foundLocation: 'Courant Institute Warren Weaver Hall Hallway 3A',
    building: 'Courant Institute',
    custodian: 'Courant Facility Operations',
    storageLocker: 'Key Locker #08',
    timeAgo: '4 hrs ago',
    photoUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600',
    verificationLevel: 'Key Bitting Matrix Scanned',
    matchPercentage: 91,
    holdExpiresInHours: 120,
    reportReference: 'IN-CUSTODY #CR-331',
    reassuranceNote: 'Restricted high-security custody hold.'
  },
  {
    id: 'fnd-5',
    recordId: 'FND-7402',
    title: 'TI-84 Plus CE Graphing Calculator (Rose Gold)',
    category: 'Electronics',
    colorTone: 'Rose Gold / White',
    material: 'Molded Plastic',
    identifiers: 'Name written in metallic sharpie inside slide cover',
    foundLocation: 'Tandon Rogers Hall Lecture Hall RH-101',
    building: 'Tandon School of Engineering',
    custodian: 'Tandon Security Desk Main',
    storageLocker: 'Vault Locker #T-02',
    timeAgo: '5 hrs ago',
    photoUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=600',
    verificationLevel: 'Serial & Internal Memory Inspected',
    matchPercentage: 74,
    holdExpiresInHours: 48,
    reportReference: 'IN-CUSTODY #TD-404',
    reassuranceNote: 'Battery charged and secured.'
  }
];

export const ACTIVITY_TIMELINE: ActivityEvent[] = [
  {
    id: 'act-1',
    title: 'Report submitted',
    description: 'Black Leather Wallet registered with NYU student credential references.',
    timestamp: 'Today 09:15 AM',
    statusColor: 'green'
  },
  {
    id: 'act-2',
    title: 'AI Neural Engine matched',
    description: 'Item #FND-7422 ingested by Central Library Security Desk.',
    timestamp: 'Today 10:30 AM',
    statusColor: 'blue'
  },
  {
    id: 'act-3',
    title: 'Verification Challenge Ready',
    description: '3 private questions generated based on RFID serial hashes.',
    timestamp: 'Today 10:48 AM',
    actionRequired: "Action pending Alex's response",
    statusColor: 'amber'
  },
  {
    id: 'act-4',
    title: 'Safe Handover Point Designated',
    description: 'Library Security Safe Point #2 reserved with automated locker code.',
    timestamp: 'Scheduled on verification',
    statusColor: 'slate'
  }
];

export const RECOVERY_CENTERS: RecoveryCenter[] = [
  {
    id: 'rc-1',
    name: 'Bobst Library Desk',
    location: 'Floor 1 • Main Lobby',
    hours: 'Open Till 11:00 PM',
    isOpen: true,
    is24x7: false,
    phone: '(212) 998-2500',
    activeLockersCount: 14
  },
  {
    id: 'rc-2',
    name: 'Kimmel Center Booth',
    location: 'Ground Floor Info Desk',
    hours: 'Open Till 9:00 PM',
    isOpen: true,
    is24x7: false,
    phone: '(212) 998-4900',
    activeLockersCount: 8
  },
  {
    id: 'rc-3',
    name: 'Campus Safety HQ',
    location: '7 Washington Place',
    hours: '24 / 7 Live',
    isOpen: true,
    is24x7: true,
    phone: '(212) 998-2222',
    activeLockersCount: 26
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High-Confidence Neural Match Found!',
    message: 'Campus Safety logged an item matching your Black Leather Wallet (89% vector similarity).',
    time: '45 mins ago',
    read: false,
    type: 'match'
  },
  {
    id: 'notif-2',
    title: 'Verification Challenge Dispatched',
    message: 'Answer 2 blind verification questions to release locker PIN at Bobst Library Safe Point #2.',
    time: '32 mins ago',
    read: false,
    type: 'handover'
  },
  {
    id: 'notif-3',
    title: 'Karma Credits +150 Awarded',
    message: 'Thank you for verifying property report accuracy on NYU Enclave.',
    time: 'Yesterday',
    read: true,
    type: 'reward'
  }
];

export const CAMPUS_BUILDINGS = [
  'Bobst Central Library',
  'Kimmel Center for University Life',
  'Paulson Center',
  'Courant Institute (Warren Weaver Hall)',
  'Tandon School of Engineering',
  'Stern School of Business (Tisch Hall)',
  'Silver Center for Arts and Science',
  'NYU Student Health Center'
];
