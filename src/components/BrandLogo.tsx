interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const dimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${dimensions} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <rect width="100" height="100" rx="28" fill="#1D4ED8" />
        <rect width="100" height="100" rx="28" fill="url(#logo_grad)" />
        <path
          d="M50 20C34.536 20 22 32.536 22 48C22 65.5 44 83 50 86C56 83 78 65.5 78 48C78 32.536 65.464 20 50 20Z"
          fill="#3B82F6"
        />
        <circle cx="50" cy="45" r="14" fill="#FFFFFF" />
        <path
          d="M44 42V39C44 35.6863 46.6863 33 50 33C53.3137 33 56 35.6863 56 39V42"
          stroke="#1D4ED8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect x="42.5" y="41.5" width="15" height="11" rx="2.5" fill="#1D4ED8" />
        <circle cx="50" cy="46" r="1.2" fill="#FFFFFF" />
        <path d="M50 47.2V49.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

        <defs>
          <linearGradient id="logo_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
