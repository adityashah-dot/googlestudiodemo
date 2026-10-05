import React from 'react';
import { PhoneCall, Search } from 'lucide-react';

interface FloatingActionsProps {
  onOpenCounselorModal: () => void;
  onOpenTrackModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenCounselorModal,
  onOpenTrackModal,
}) => {
  return (
    <aside
      aria-label="Quick admissions assistance"
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2"
    >
      {/* Counselor Help Floating Button */}
      <button
        type="button"
        onClick={onOpenCounselorModal}
        className="px-3.5 py-2.5 bg-white text-slate-900 border border-slate-300 rounded-full shadow-md hover:shadow-lg text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Request counselor callback"
      >
        <PhoneCall className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        <span className="hidden sm:inline">Counselor Help</span>
      </button>

      {/* Track Application Status Floating Button */}
      <button
        type="button"
        onClick={onOpenTrackModal}
        className="px-3.5 py-2.5 bg-slate-900 text-white rounded-full shadow-md hover:shadow-lg text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-950"
        aria-label="Track submitted application status"
      >
        <Search className="w-3.5 h-3.5 text-amber-400" />
        <span>Track Status</span>
      </button>
    </aside>
  );
};
