import React from 'react';
import { ShieldCheck, Lock, Award, HeartHandshake, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#777] border-t border-[#1a1a1a] text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">Campus<span className="text-blue-500">Find</span></span>
            </div>
            <p className="text-xs leading-relaxed text-[#777]">
              Autonomous AI property recovery network connecting students, safety officers, and facility custodians across 18 campus buildings.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All 4 Recovery Hubs Live & Synchronized</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Campus Protocol</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Zero-Knowledge Blind Verification</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">FERPA & Student Identity Safeguards</li>
              <li className="hover:text-white transition-colors cursor-pointer">Smart Locker PIN Auto-Generation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Autonomous Spatial Proximity Clues</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custodian Sweep Logs</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Participating Depots</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>Bobst Library Desk</span>
                <span className="text-emerald-400 text-[11px] font-mono">Open till 11PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kimmel Center Booth</span>
                <span className="text-emerald-400 text-[11px] font-mono">Open till 9PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Campus Safety HQ (7 Wash Pl)</span>
                <span className="text-blue-400 text-[11px] font-mono">24/7 Live</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Paulson Athletics Safe Bin</span>
                <span className="text-[#555] text-[11px] font-mono">Open till 10PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Safety Contact */}
          <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] space-y-3">
            <div className="flex items-center space-x-2 text-white text-xs font-bold">
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Campus Safety Dispatch</span>
            </div>
            <p className="text-xs text-[#777]">
              For immediate emergency assistance or urgent recovery of vital medication or passports:
            </p>
            <div className="text-base font-mono font-bold text-white tracking-wide">
              (212) 998-2222
            </div>
            <div className="text-[11px] text-[#555]">Available 24 hours, 7 days a week</div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#555] gap-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Engineered for University Campuses</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Over 480 Items Reunited This Semester</span>
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} CampusFind. All student records protected under FERPA § 99.31.
          </div>
        </div>
      </div>
    </footer>
  );
};
