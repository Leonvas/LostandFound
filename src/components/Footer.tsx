import { BrandLogo } from './BrandLogo';
import { ScreenType } from '../types';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200/90 text-slate-600 text-xs py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          {/* Left Brand info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="md" />
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-slate-900 text-base">CampusFind</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  CAMPUS V2.4
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-xs max-w-sm">
              Precision Property Recovery Platform — Connecting campus lost & found through zero-knowledge
              neural vectors and trusted recovery centers.
            </p>
          </div>

          {/* Quick Nav links */}
          <div className="flex flex-wrap gap-6 sm:gap-10 text-xs font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-blue-600 transition-colors text-left"
            >
              Home Protocol
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-blue-600 transition-colors text-left"
            >
              Live Dashboard
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className="hover:text-blue-600 transition-colors text-left"
            >
              Campus Inventory
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="hover:text-blue-600 transition-colors text-left"
            >
              Incident Dispatch Form
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NYU Protocol Operational (14ms latency)</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              FERPA & AES-256 Compliant
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} CampusFind Technologies Inc. All campus rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
