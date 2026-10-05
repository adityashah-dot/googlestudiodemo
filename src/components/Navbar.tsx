import React, { useState } from 'react';
import { TabType } from '../types';
import { Headphones, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenApply: () => void;
  onOpenHelpDesk: () => void;
  onOpenLms: () => void;
}

const GLOBAL_LINKS: { tab: TabType; label: string; badge?: string }[] = [
  { tab: 'universities', label: 'Universities' },
  { tab: 'degrees', label: 'Degree Explorer' },
  { tab: 'compare', label: 'Compare Matrix' },
  { tab: 'scholarships', label: 'Scholarships 2026', badge: 'NEW' },
  { tab: 'nirf', label: 'NIRF Rankings' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApply,
  onOpenHelpDesk,
  onOpenLms,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-[#c4c6ce]/40">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-3">
        {/* Brand */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0"
        >
          <img
            src="/logo.svg"
            alt="Online Siksha - Higher Education Gateway"
            className="h-10 w-auto sm:h-11"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px] min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GLOBAL_LINKS.map((link) => {
            const isActive =
              activeTab === link.tab ||
              (link.tab === 'universities' && activeTab === 'overview') ||
              (link.tab === 'degrees' && activeTab === 'courses');
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-150 shrink-0 pb-1 border-b-2 ${
                  isActive
                    ? 'text-[#115eaf] border-[#115eaf] font-semibold'
                    : 'text-[#43474d] border-transparent hover:text-[#115eaf]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenHelpDesk}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[13px] font-semibold transition-all duration-150 active:scale-95 shadow-sm shadow-[#115eaf]/20"
          >
            Get Free Counselling
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenApply}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[#000f22] hover:bg-[#f0f3ff] text-xs sm:text-sm font-semibold transition-colors"
          >
            <Headphones className="w-4 h-4 text-[#115eaf]" />
            <span>Help Desk</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#43474d] hover:bg-[#f0f3ff]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e7eeff] px-4 pt-2 pb-6 space-y-2 shadow-lg max-h-[75vh] overflow-y-auto">
          {GLOBAL_LINKS.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleNavClick(link.tab)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeTab === link.tab ? 'bg-[#f0f3ff] text-[#115eaf] font-semibold' : 'text-[#43474d]'
              }`}
            >
              <span className="flex items-center gap-2">
                {link.label}
                {link.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                    {link.badge}
                  </span>
                )}
              </span>
            </button>
          ))}

          <div className="pt-2 border-t border-[#e7eeff] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpDesk();
              }}
              className="w-full py-2.5 rounded-lg bg-[#115eaf] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              Get Free Counselling
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-2.5 rounded-lg border border-[#c4c6ce] text-[#000f22] text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Headphones className="w-4 h-4 text-[#115eaf]" />
              Help Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
