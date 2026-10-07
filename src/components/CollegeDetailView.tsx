import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { OverviewView } from './OverviewView';
import { AdmissionView } from './AdmissionView';
import { ScholarshipsView } from './ScholarshipsView';
import { CoursesAndFeesView } from './CoursesAndFeesView';
import { AmityOnlineView } from './AmityOnlineView';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import type { Course } from '../types';

type LpuSection = 'overview' | 'courses' | 'admission' | 'scholarships' | 'lms';

interface CollegeDetailViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: (course?: Course) => void;
  onOpenHelpDesk: () => void;
  onOpenEmi: (courseId?: string) => void;
  onOpenLms: () => void;
}

// Slugs that have a full profile page. Everything else is covered by the
// All Universities directory at /universities.
const SLUG_ALIASES: Record<string, string> = {
  lpu: 'lpu-online',
  'lpu-online': 'lpu-online',
  'lovely-professional-university': 'lpu-online',
  amity: 'amity-online',
  'amity-online': 'amity-online',
  'amity-university-online': 'amity-online',
};

const LPU_TABS: { id: Exclude<LpuSection, 'lms'>; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'grid_view' },
  { id: 'courses', label: 'Courses', icon: 'menu_book' },
  { id: 'admission', label: 'Admission', icon: 'school' },
  { id: 'scholarships', label: 'Scholarships', icon: 'workspace_premium' },
];

const parseSection = (value: string | null): LpuSection => {
  if (value === 'courses' || value === 'admission' || value === 'scholarships' || value === 'lms') return value;
  return 'overview';
};

export const CollegeDetailView: React.FC<CollegeDetailViewProps> = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  onOpenEmi,
  onOpenLms,
}) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const normalizedSlug = slug.toLowerCase();

  const collegeId = SLUG_ALIASES[normalizedSlug] || normalizedSlug;
  const college = DEGREEFYD_LPU_API.onlineUniversities.find((c) => c.id === collegeId);
  const [lpuSection, setLpuSection] = useState<LpuSection>(() => parseSection(searchParams.get('section')));

  useEffect(() => {
    setLpuSection(parseSection(searchParams.get('section')));
  }, [searchParams]);

  if (!college) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f9f9ff]">
        <h1 className="text-8xl font-black text-[#115eaf]/20 mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000f22] mb-3">University Not Found</h2>
        <p className="text-[#43474d] mb-8 max-w-md">
          We couldn't find the online university you're looking for. It may have been removed or the link might be broken.
        </p>
        <Link
          to="/universities"
          className="px-6 py-3 bg-[#115eaf] text-white text-sm font-semibold rounded-xl hover:bg-[#004689] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Universities
        </Link>
      </div>
    );
  }

  // Amity University Online — dedicated profile page (has its own tabs)
  if (collegeId === 'amity-online') {
    return (
      <AmityOnlineView
        onOpenApply={onOpenApply}
        onOpenBrochure={() => onOpenBrochure()}
        onOpenHelpDesk={onOpenHelpDesk}
      />
    );
  }

  const handleTabClick = (tab: LpuSection) => {
    if (tab === 'lms') {
      onOpenLms();
      return;
    }
    setLpuSection(tab);
    if (tab === 'overview') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ section: tab }, { replace: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // LPU Online section navigation
  const universityNavigation = (
    <div className="sticky top-[68px] z-30 bg-white border-b border-[#e7eeff] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LPU_TABS.map((tab) => {
              const isActive = lpuSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                    isActive
                      ? 'bg-[#115eaf] text-white font-semibold'
                      : 'text-[#43474d] font-medium hover:bg-[#f0f3ff] hover:text-[#115eaf]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleTabClick('lms')}
            className="shrink-0 flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">devices</span>
              <span>LMS Portal</span>
            </button>
          </div>
        </div>
      </div>
  );

  return (
    <div>
      {/* Section Content */}
      {lpuSection === 'overview' && (
        <OverviewView
          onSelectCourse={onSelectCourse}
          onOpenApply={onOpenApply}
          onOpenBrochure={onOpenBrochure}
          onOpenHelpDesk={onOpenHelpDesk}
          universityNavigation={universityNavigation}
        />
      )}

      {lpuSection === 'courses' && (
        <CoursesAndFeesView
          onSelectCourse={onSelectCourse}
          onOpenApply={onOpenApply}
          onOpenBrochure={onOpenBrochure}
          onOpenEmi={onOpenEmi}
          onOpenHelpDesk={onOpenHelpDesk}
          universityNavigation={universityNavigation}
        />
      )}

      {lpuSection === 'admission' && (
        <AdmissionView
          onSelectCourse={onSelectCourse}
          onOpenApply={onOpenApply}
          onOpenBrochure={() => onOpenBrochure()}
          onOpenHelpDesk={onOpenHelpDesk}
          onOpenEmi={() => onOpenEmi()}
          universityNavigation={universityNavigation}
        />
      )}

      {lpuSection === 'scholarships' && (
        <ScholarshipsView
          onOpenApply={onOpenApply}
          onOpenHelpDesk={onOpenHelpDesk}
          universityNavigation={universityNavigation}
        />
      )}
    </div>
  );
};
