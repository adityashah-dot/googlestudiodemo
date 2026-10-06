import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { PLACEMENT_STATS } from '../data/institutionalData';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import { INDIAN_STATES, INDIAN_STATES_CITIES } from '../data/indianLocations';
import {
  CheckCircle,
  ChevronRight,
  Download,
  ShieldCheck,
  Star,
  Laptop,
  PhoneCall,
  FileText,
  UserCheck,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronDown,
  MonitorCheck,
  Layers,
  Search,
  Clock,
  ArrowRight,
} from 'lucide-react';

const RECRUITER_LOGOS: { name: string; src: string }[] = [
  { name: 'Amazon', src: '/logos/amazon.jpg' },
  { name: 'Cognizant', src: '/logos/cognizant.jpg' },
  { name: 'TCS', src: '/logos/tcs.jpg' },
  { name: 'Infosys', src: '/logos/infosys.png' },
  { name: 'Wipro', src: '/logos/wipro.jpg' },
  { name: 'Tech Mahindra', src: '/logos/techmahindra.jpg' },
  { name: 'Capgemini', src: '/logos/capgemini.png' },
  { name: 'Deloitte', src: '/logos/deloitte.jpg' },
  { name: 'Times Internet', src: '/logos/timesinternet.jpg' },
];

const RecruiterScroll: React.FC = () => {
  const doubled = [...RECRUITER_LOGOS, ...RECRUITER_LOGOS];
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center gap-6 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="flex items-center justify-center h-16 min-w-[125px] px-3.5 bg-[#f9f9ff] border border-[#e7eeff] rounded-lg shrink-0"
          >
            <img
              src={r.src}
              alt={r.name}
              className="max-h-[34px] max-w-[100px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};


interface OverviewViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: (course?: Course) => void;
  onOpenHelpDesk: () => void;
  universityNavigation?: React.ReactNode;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  universityNavigation
}) => {
  const [counselingForm, setCounselingForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'mba',
    state: '',
    city: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [counselPanelOpen, setCounselPanelOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>('latest-news');
  const [selectedHighlightCategory, setSelectedHighlightCategory] = useState<string>('All');
  const [selectedReviewCategory, setSelectedReviewCategory] = useState<string>('All');
  const [tocOpen, setTocOpen] = useState(false);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [courseFeeSearch, setCourseFeeSearch] = useState('');
  const [blogIndex, setBlogIndex] = useState(0);
  const [blogVisible, setBlogVisible] = useState(3);
  const [openAdmissionStep, setOpenAdmissionStep] = useState<number>(0);
  const [examStep, setExamStep] = useState<number>(0);

  const EXAM_STEPS = [
    {
      title: 'Semester-Based Structure',
      description: 'Each programme follows a semester-based academic system.',
      points: [
        'The programme is divided into semesters.',
        'Fees are paid semester-wise.',
        'Every semester ends with an online examination.',
      ],
    },
    {
      title: 'Continuous Internal Assessment',
      description:
        'Evaluation is carried out through assignments, quizzes, and academic activities during the semester.',
      points: [
        'Assignments are given during the semester.',
        'Quizzes check your progress along the way.',
        'Academic activities add to your internal assessment.',
      ],
    },
    {
      title: 'End-Semester Online Examination',
      description: 'Online monitoring examinations are conducted at the end of each semester.',
      points: [
        'The exam is conducted online with monitoring.',
        'It takes place at the end of every semester.',
        'It is taken through the digital learning platform.',
      ],
    },
    {
      title: 'Result Declaration',
      description:
        'Final results are declared after evaluation. Students meeting the criteria progress to the next semester.',
      points: [
        'Results are declared after evaluation.',
        'Evaluation includes internal assessment and the end-semester exam.',
        'Students who meet the criteria move to the next semester.',
      ],
    },
  ];

  const HIGHLIGHT_CATEGORIES = ['All', 'Institution', 'Academic', 'Accreditations', 'Technology', 'Evaluation', 'Info'];

  const TOC_ITEMS = [
    { id: 'latest-news', label: '1. Latest News & Updates' },
    { id: 'highlights', label: '2. Highlights 2026' },
    { id: 'courses-fees', label: '3. LPU Online Courses and Fees 2026' },
    { id: 'eligibility-criteria', label: '4. Eligibility & Selection' },
    { id: 'admission-process', label: '5. Admission Process 2026' },
    { id: 'rankings', label: '6. Rankings & Accreditations' },
    { id: 'examination-pattern', label: '7. Examination Pattern' },
    { id: 'placements', label: '8. Placements' },
    { id: 'campus', label: '9. Campus' },
    { id: 'sample-degree', label: '10. Sample Degree' },
    { id: 'reviews-section', label: '11. Reviews & FAQs' },
    { id: 'compare-colleges', label: '12. Compare Colleges' },
    { id: 'blogs', label: '13. Blogs' },
    { id: 'related-colleges', label: '14. Related Colleges' },
  ];

  // Dynamic scrollspy to highlight active section in TOC as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive visible blog cards (3 / 2 / 1)
  useEffect(() => {
    const getVisible = () => {
      if (window.innerWidth <= 700) return 1;
      if (window.innerWidth <= 1050) return 2;
      return 3;
    };
    const onResize = () => {
      const v = getVisible();
      setBlogVisible(v);
      setBlogIndex((i) => Math.min(i, Math.max(0, DEGREEFYD_LPU_API.blogs.posts.length - v)));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCounselingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-[#43474d] space-x-2 font-medium">
            <span className="hover:text-[#115eaf] cursor-pointer">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Colleges</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Lovely Professional University Online</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Overview</span>
          </nav>
        </div>
      </div>

      {/* HERO SECTION — college-hero layout */}
      <section className="bg-white text-[#000f22] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

          {/* College Header: Logo + Title + Meta + Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <img
              src={DEGREEFYD_LPU_API.hero.logoImage}
              alt="LPU Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="min-w-0">
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {DEGREEFYD_LPU_API.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">#31 NIRF Rank</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">NAAC A++</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">UGC-DEB</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">AICTE</span>
              </div>
            </div>
          </div>

          {/* Body: location + text left; image top-aligned to location line */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4">
            <div className="lg:col-span-7 space-y-3">
              <p className="section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                {DEGREEFYD_LPU_API.location} · Private · Est. {DEGREEFYD_LPU_API.established} ·{' '}
                <span className="inline-flex items-center gap-0.5 font-bold text-[#B45309]">
                  <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                  {DEGREEFYD_LPU_API.rating}
                </span>
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.hero.description}
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.hero.heroSub}
              </p>
            </div>

            {/* Right: Campus Image — top aligned with location line; 50px to Free Apply */}
            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src={DEGREEFYD_LPU_API.hero.backgroundImage}
                  alt="Lovely Professional University Campus"
                  className="w-full h-48 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Stats + Brochure + Apply Now — same line; 100px from Free Apply edge */}
          <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">₹46K – ₹1.86L</span>
              <span className="text-[10px] text-[#74777e]">Fee Range</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#115eaf] font-sans">1 – 3 Years</span>
              <span className="text-[10px] text-[#74777e]">Duration</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">Online</span>
              <span className="text-[10px] text-[#74777e]">Semester-based</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#B45309] font-sans">90%</span>
              <span className="text-[10px] text-[#74777e]">Placement Rate</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => onOpenBrochure()}
                className="px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Brochure
              </button>
              <button
                onClick={() => onOpenApply()}
                className="px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {/* MAIN CONTENT */}
      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="space-y-8">
            {/* 1. Latest News and Updates */}
            <section id="latest-news" className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]">
              <h2 className="section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans">
                {DEGREEFYD_LPU_API.latestNews.title}
              </h2>
              <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.latestNews.description}
              </p>
              <p className="text-[11px] text-[#74777e] font-normal">
                {DEGREEFYD_LPU_API.latestNews.date} · {DEGREEFYD_LPU_API.latestNews.author}
              </p>
            </section>

            {/* 2. Highlights Table 2026 */}
            <section id="highlights" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-[#f0f3ff] text-[#115eaf] text-xs font-normal border border-[#d5e3ff]">
                    Official Facts 2026
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                    LPU Online Highlights 2026
                  </h2>
                </div>
                <button
                  onClick={() => onOpenBrochure()}
                  className="px-4 py-2 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Factsheet</span>
                </button>
              </div>

              <p className="section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed">
                {DEGREEFYD_LPU_API.highlightsIntro}
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mt-[18px]">
                {HIGHLIGHT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedHighlightCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedHighlightCategory === cat
                        ? 'bg-[#115eaf] text-white border-[#115eaf]'
                        : 'bg-[#f0f3ff] text-[#43474d] border-[#e7eeff] hover:border-[#115eaf]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Highlights Table */}
              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-4 font-bold">Particulars</th>
                      <th className="py-3 px-4 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {(() => {
                      const filtered = DEGREEFYD_LPU_API.highlightsTable.filter(
                        (row) =>
                          selectedHighlightCategory === 'All' || row.category === selectedHighlightCategory
                      );
                      const visible = highlightsExpanded ? filtered : filtered.slice(0, 8);
                      return visible.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                          <td className="py-2.5 px-4 font-normal text-[#000f22]">
                            {row.label}
                          </td>
                          <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>

              {(() => {
                const filtered = DEGREEFYD_LPU_API.highlightsTable.filter(
                  (row) =>
                    selectedHighlightCategory === 'All' || row.category === selectedHighlightCategory
                );
                return filtered.length > 8 && (
                <button
                  onClick={() => setHighlightsExpanded(!highlightsExpanded)}
                  className="w-full py-2 bg-[#f0f3ff] text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-bold hover:bg-[#e7eeff] transition-all mt-[18px]"
                >
                  {highlightsExpanded ? 'Show Less' : 'Show More Highlights'}
                </button>
                );
              })()}

              {/* CTA */}
              <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
                <p className="text-sm font-normal text-[#2d3137] leading-relaxed">
                  Unlock Full College Insights to Choose the Right Program for Your Future
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => onOpenBrochure()}
                    className="px-4 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Brochure
                  </button>
                  <button
                    onClick={() => onOpenApply()}
                    className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Apply Now
                  </button>
                </div>
              </div>
            </section>

            {/* 3. Courses & Fees 2026 */}
            <section id="courses-fees" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-bold text-[#000f22] font-sans">
                  LPU Online Courses and Fees 2026
                </h2>
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.coursesFees.intro}
                </p>
              </div>

              {/* Search */}
              <div className="relative mt-[18px]">
                <input
                  type="text"
                  value={courseFeeSearch}
                  onChange={(e) => setCourseFeeSearch(e.target.value)}
                  placeholder={DEGREEFYD_LPU_API.coursesFees.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm text-[#000f22] font-normal placeholder:text-[#74777e] focus:outline-none focus:border-[#115eaf] focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e]" />
              </div>

              {/* Fee Table */}
              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-2 px-3 font-bold">Degree</th>
                      <th className="py-2 px-3 font-bold">Duration</th>
                      <th className="py-2 px-3 font-bold">Avg. Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.coursesFees.table
                      .filter((c) =>
                        c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())
                      )
                      .map((c) => (
                        <tr key={c.degree} className="bg-white hover:bg-[#f9f9ff] transition-colors">
                          <td className="py-2 px-3 align-top">
                            <button
                              onClick={() => {
                                const course = COURSES_DATA.find((x) => x.id === c.courseId);
                                if (course) onSelectCourse(course);
                              }}
                              className="block text-left text-xs sm:text-[13px] font-normal text-[#115eaf] hover:text-[#004689] hover:underline transition-colors"
                            >
                              {c.degree}
                            </button>
                            <span className="block text-[10px] text-[#74777e] font-normal leading-tight">{c.specializations}</span>
                          </td>
                          <td className="py-2 px-3 text-[#43474d] font-normal align-top whitespace-nowrap">{c.duration}</td>
                          <td className="py-2 px-3 text-[#115eaf] font-normal align-top whitespace-nowrap">{c.avgFees}</td>
                        </tr>
                      ))}
                    {DEGREEFYD_LPU_API.coursesFees.table.filter((c) =>
                      c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())
                    ).length === 0 && (
                      <tr className="bg-white">
                        <td colSpan={3} className="py-6 text-center text-xs text-[#74777e] font-normal">No programmes match your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#74777e] font-normal mt-[18px]">
                {courseFeeSearch
                  ? `Showing ${DEGREEFYD_LPU_API.coursesFees.table.filter((c) => c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())).length} out of ${DEGREEFYD_LPU_API.coursesFees.table.length} Degrees`
                  : DEGREEFYD_LPU_API.coursesFees.showing}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-[18px]">
                <button className="px-5 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all">
                  {DEGREEFYD_LPU_API.coursesFees.roiCalculator}
                </button>
                <button
                  onClick={() => onOpenBrochure()}
                  className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  {DEGREEFYD_LPU_API.coursesFees.viewFeeStructure}
                </button>
              </div>
            </section>

            {/* 3. Eligibility and Selection Criteria (From API) */}
            <section id="eligibility-criteria" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#f0f3ff] text-[#115eaf] text-xs font-normal border border-[#d5e3ff]">
                  Admission Criteria
                </span>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Eligibility and Selection Criteria
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1" />
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University provides a range of online undergraduate and postgraduate programs. The
                  eligibility criteria depend on the course level, and admission is generally based on academic
                  qualifications and document verification. To be eligible for admission, candidates are required to fill
                  out the online application form, upload the required documents, and pay the program fee. Check the below
                  criteria for LPU online eligibility and selection:
                </p>
              </div>

              {/* Column Header (desktop only) */}
              <div
                aria-hidden="true"
                className="hidden md:grid grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 px-3.5 py-2 border-b-2 border-[#000f22] text-xs font-bold text-[#43474d] mt-[18px]"
              >
                <span>Course</span>
                <span>Eligibility</span>
                <span>Selection Process</span>
              </div>

              {/* Criteria List */}
              <ul className="list-none">
                {DEGREEFYD_LPU_API.eligibilityMatrix.map((row, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 gap-y-1 items-center px-3.5 py-[11px] border-b border-[#e7eeff] border-l-[3px] border-l-transparent hover:bg-[#f9f9ff] hover:border-l-[#115eaf] transition-colors"
                  >
                    <div className="text-[14.5px] font-medium leading-[1.35] text-[#000f22]">{row.course}</div>

                    <div className="text-[13.5px] leading-[1.45] text-[#43474d]">
                      <span className="md:hidden block text-xs font-semibold text-[#74777e] mb-0.5">Eligibility</span>
                      {row.eligibility}
                    </div>

                    <div className="md:justify-self-start text-xs font-normal leading-[1.35] text-[#115eaf] bg-[#f0f3ff] border border-[#d5e3ff] px-2.5 py-[3px] rounded-[6px]">
                      <span className="md:hidden block text-[10px] font-medium text-[#74777e] mb-0.5">Selection Process</span>
                      {row.selection}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Admission Process 2026 (Accordion) */}
            <section id="admission-process" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#f0f3ff] text-[#115eaf] text-xs font-normal border border-[#d5e3ff]">
                  Admission Flow
                </span>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Admission Process 2026
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1" />
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University Online follows a simple and transparent online university admission
                  process. Admission to online degree courses is based on academic eligibility criteria specified for each
                  programme. Candidates can apply for LPU online admission 2026 without visiting the campus. Check the
                  below step-by-step Lovely Professional University Online admission process 2026:
                </p>
              </div>

              {/* Process List */}
              <div className="mt-[18px] flex flex-col gap-3">
                {[
                  {
                    title: 'Online Registration',
                    description:
                      'Visit the Lovely Professional University Online official portal and register using personal details such as name, email ID and mobile number. Login credentials are generated after successful registration.',
                  },
                  {
                    title: 'Application Form Submission',
                    description:
                      'Fill out the online application form by selecting the desired programme and entering personal and academic details.',
                  },
                  {
                    title: 'Document Upload',
                    description:
                      'Upload scanned copies of academic documents, identity proof, and photographs as part of the application process.',
                  },
                  {
                    title: 'Eligibility Verification',
                    description:
                      'The university verifies eligibility based on academic qualifications and programme guidelines.',
                  },
                  {
                    title: 'Fee Payment and Admission Confirmation',
                    description:
                      'Admission is confirmed after fee payment. Roll number and LMS login are issued to the student.',
                  },
                ].map((step, i) => {
                  const isOpen = openAdmissionStep === i;
                  const stepNo = String(i + 1).padStart(2, '0');
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-[52px_minmax(0,1fr)] sm:grid-cols-[78px_minmax(0,1fr)] gap-2.5 sm:gap-[18px] ${i < 4 ? 'relative' : ''}`}
                    >
                      {/* Step number */}
                      <div className="relative flex justify-center">
                        {i < 4 && (
                          <span
                            aria-hidden="true"
                            className={`absolute top-[52px] sm:top-[68px] bottom-[-12px] w-px ${isOpen ? 'bg-[#115eaf]/40' : 'bg-[#e7eeff]'}`}
                          />
                        )}
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-label={`Open Step ${stepNo}`}
                          onClick={() => setOpenAdmissionStep(isOpen ? -1 : i)}
                          className={`relative z-[2] w-[52px] h-[52px] sm:w-[68px] sm:h-[68px] rounded-[10px] sm:rounded-[12px] border text-[10px] sm:text-xs font-bold cursor-pointer transition-all duration-200 ${
                            isOpen
                              ? 'bg-[#115eaf] border-[#115eaf] text-white'
                              : 'bg-white border-[#d5e3ff] text-[#43474d] hover:border-[#115eaf] hover:-translate-y-px'
                          }`}
                        >
                          STEP {stepNo}
                        </button>
                      </div>

                      {/* Content */}
                      <div
                        className={`rounded-[12px] border bg-white overflow-hidden transition-all duration-200 ${
                          isOpen ? 'border-[#d5e3ff] shadow-[0_5px_18px_rgba(7,29,65,0.06)]' : 'border-[#e7eeff]'
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenAdmissionStep(isOpen ? -1 : i)}
                          className="w-full flex items-center justify-between gap-[15px] px-4 sm:px-5 py-[15px] sm:py-[18px] border-0 bg-transparent text-left cursor-pointer"
                        >
                          <span className="text-[16px] sm:text-[19px] leading-[1.35] font-medium text-[#000f22] font-sans">
                            {step.title}
                          </span>
                          <span
                            className={`shrink-0 w-[28px] h-[28px] sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[#d5e3ff] bg-[#f0f3ff] text-[#115eaf] leading-none transition-all duration-200 ${
                              isOpen ? 'rotate-180 bg-[#115eaf] border-[#115eaf] text-white' : 'hover:border-[#115eaf] hover:bg-white'
                            }`}
                            aria-hidden="true"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </button>

                        <div
                          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                        >
                          <div className="overflow-hidden">
                            <p className="px-4 sm:px-5 pb-[16px] sm:pb-[19px] text-[13px] sm:text-[15px] leading-[1.5] sm:leading-[1.55] text-[#43474d] font-normal">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 6. Rankings & Accreditations (From API) */}
            <section id="rankings" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-extrabold text-[#000f22] font-sans">
                  LPU Online Rankings and Accreditations
                </h2>
                <p className="section-description text-xs text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.rankingsAndAccreditations.intro}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-5 font-bold">Authority / Body</th>
                      <th className="py-3 px-5 font-bold">Recognition / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.rankingsAndAccreditations.table.map((r: { authority: string; status: string }, idx: number) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-[#f0f3ff]' : ''}>
                        <td className="py-3 px-5 font-normal text-[#000f22]">{r.authority}</td>
                        <td className="py-3 px-5 text-[#43474d] font-normal">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Examination Pattern (Interactive Module) */}
            <section id="examination-pattern" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#f0f3ff] text-[#115eaf] text-xs font-normal border border-[#d5e3ff]">
                  Evaluation
                </span>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Examination Pattern
                </h2>
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University conducts examinations for its online courses through its digital learning
                  platform. The evaluation system usually includes assignments, internal assessments, and end-term
                  examinations to evaluate students' performance during the course. Check below the Lovely Professional
                  University examination process:
                </p>
              </div>

              <div className="mt-[18px] grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] border border-[#d5e3ff] rounded-[14px] overflow-hidden shadow-xs">
                {/* Left nav */}
                <div
                  role="tablist"
                  aria-label="Examination process"
                  className="bg-gradient-to-b from-[#f0f3ff] to-[#f9f9ff] border-b md:border-b-0 md:border-r border-[#d5e3ff] p-2.5 grid grid-cols-2 md:grid-cols-1 gap-1"
                >
                  <div className="col-span-2 md:col-span-1 text-xs font-semibold text-[#43474d] px-2 pt-1.5 pb-2">
                    Examination Process
                  </div>
                  {[
                    { title: 'Semester-Based Structure', subtitle: 'Academic system' },
                    { title: 'Continuous Internal Assessment', subtitle: 'During semester' },
                    { title: 'End-Semester Online Examination', subtitle: 'End of semester' },
                    { title: 'Result Declaration', subtitle: 'After evaluation' },
                  ].map((step, i) => {
                    const isActive = examStep === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setExamStep(i)}
                        className={`flex items-center gap-2.5 w-full px-2 py-[9px] rounded-[9px] text-left cursor-pointer transition-all duration-200 ${
                          isActive
                            ? 'bg-white shadow-[0_2px_10px_rgba(17,94,175,0.18)] ring-1 ring-[#115eaf]/25'
                            : 'bg-white/40 hover:bg-white/80 hover:shadow-sm'
                        }`}
                      >
                        <span
                          className={`flex-none w-[30px] h-[30px] grid place-items-center rounded-lg border text-xs font-semibold transition-colors duration-200 ${
                            isActive
                              ? 'bg-[#115eaf] border-[#115eaf] text-white shadow-[0_2px_6px_rgba(17,94,175,0.35)]'
                              : 'bg-white/70 border-[#d5e3ff] text-[#43474d] group-hover:border-[#115eaf]'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block text-[13.5px] font-semibold leading-[1.3] truncate ${
                              isActive ? 'text-[#115eaf]' : 'text-[#000f22]'
                            }`}
                          >
                            {step.title}
                          </span>
                          <span className="block text-[11.5px] font-normal text-[#43474d] mt-px">{step.subtitle}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right content */}
                <div className="flex flex-col p-[18px] sm:p-5 sm:px-7 bg-gradient-to-br from-white via-white to-[#f0f3ff]/40">
                  <div className="flex justify-between gap-3 text-xs font-medium text-[#43474d] mb-3">
                    <span>Examination Step</span>
                    <span className="text-[#115eaf] font-semibold tabular-nums">
                      {String(examStep + 1).padStart(2, '0')} / {String(EXAM_STEPS.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1" role="tabpanel" aria-live="polite">
                    <h3 className="text-lg sm:text-[22px] font-semibold leading-[1.3] text-[#000f22] font-sans mb-2 flex items-center gap-2.5">
                      <span className="w-1 self-stretch rounded-full bg-[#115eaf]/25" aria-hidden="true" />
                      {EXAM_STEPS[examStep].title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] leading-[1.65] font-normal text-[#43474d]">
                      {EXAM_STEPS[examStep].description}
                    </p>

                    <div className="mt-[18px] mb-2 text-[13px] font-semibold text-[#000f22] flex items-center gap-2">
                      <span className="h-px w-5 bg-[#115eaf]/40" aria-hidden="true" />
                      Key points
                    </div>
                    <ul className="list-none grid gap-2">
                      {EXAM_STEPS[examStep].points.map((pt, i) => (
                        <li
                          key={i}
                          className="relative pl-[26px] text-[14px] leading-[1.55] font-normal text-[#000f22] bg-[#f9f9ff]/60 border border-[#e7eeff] rounded-lg py-1.5 pr-2.5"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[11px] w-4 h-4 rounded-full bg-[#115eaf]/15 border border-[#115eaf]/30 flex items-center justify-center"
                          >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M4.5 8.2l2.3 2.3 4.7-4.9"
                                stroke="#115eaf"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3.5 pt-3 border-t border-[#d5e3ff]">
                    <div className="flex-1 max-w-[260px]">
                      <div className="h-1.5 bg-[#e7eeff] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#115eaf] to-[#004689] transition-[width] duration-300 ease-out shadow-[0_0_6px_rgba(17,94,175,0.45)]"
                          style={{ width: `${((examStep + 1) / EXAM_STEPS.length) * 100}%` }}
                        />
                      </div>
                      <div className="mt-[5px] text-[11.5px] font-normal text-[#43474d]">
                        Step {examStep + 1} of {EXAM_STEPS.length}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setExamStep((s) => Math.max(0, s - 1))}
                        disabled={examStep === 0}
                        className="min-w-[84px] px-3 py-[7px] border border-[#d5e3ff] rounded-lg bg-white text-xs font-medium text-[#000f22] cursor-pointer transition-all hover:border-[#115eaf] hover:bg-[#115eaf]/10 hover:text-[#004689] hover:shadow-xs disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-none"
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setExamStep((s) => Math.min(EXAM_STEPS.length - 1, s + 1))}
                        disabled={examStep === EXAM_STEPS.length - 1}
                        className="min-w-[84px] px-3 py-[7px] border border-[#d5e3ff] rounded-lg bg-white text-xs font-medium text-[#000f22] cursor-pointer transition-all hover:border-[#115eaf] hover:bg-[#115eaf]/10 hover:text-[#004689] hover:shadow-xs disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-none"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Placements & Salary Stats (From API) */}
            <section id="placements" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-extrabold text-[#000f22] font-sans">
                  LPU Online Placements
                </h2>
                <p className="section-description text-xs text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.placements.intro}
                </p>
              </div>

              {/* 4 Compact Stat Tiles from API */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#115eaf] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.placementRate}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Placement Rate</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-emerald-700 font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.highestPackage}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Highest Package</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#000f22] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.hiringPartners}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Hiring Partners</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#B45309] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.internshipsCount}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Internships</span>
                </div>
              </div>

              <div className="mt-[18px]">
                <RecruiterScroll />
              </div>
            </section>

            {/* 7. Campus */}
            <section id="campus" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                  LPU Online Campus
                </h2>
                <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.campus.description}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-4 font-bold">Mode of Transport</th>
                      <th className="py-3 px-4 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.campus.travelTable.map((t, idx) => (
                      <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                        <td className="py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap">{t.mode}</td>
                        <td className="py-3.5 px-4 text-[#43474d] leading-relaxed font-normal">{t.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Campus Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <figure className="overflow-hidden rounded-xl border border-[#e7eeff] bg-[#f0f3ff]">
                  <img
                    src="/images/campusviewlpu.jpeg"
                    alt="Lovely Professional University campus view"
                    className="w-full h-44 sm:h-52 object-cover"
                    loading="lazy"
                  />
                  <figcaption className="px-3 py-2 text-[11px] text-[#43474d] bg-white border-t border-[#e7eeff]">
                    LPU Campus View — Phagwara, Punjab
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-xl border border-[#e7eeff] bg-[#f0f3ff]">
                  <img
                    src="/images/campusarealpu.jpeg"
                    alt="Lovely Professional University campus aerial view"
                    className="w-full h-44 sm:h-52 object-cover"
                    loading="lazy"
                  />
                  <figcaption className="px-3 py-2 text-[11px] text-[#43474d] bg-white border-t border-[#e7eeff]">
                    LPU Campus Aerial View
                  </figcaption>
                </figure>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 mt-[18px]">
                {DEGREEFYD_LPU_API.campus.gallery.map((g, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]">
                    {g}
                  </span>
                ))}
              </div>
            </section>

            {/* 8. UGC Sample Degree Section (From API) */}
            <section id="sample-degree" className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff]">
              {/* Top Heading Block (Placed at the top of section) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d5e3ff]/70">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-normal flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      UGC-DEB Validated & Govt Approved
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white text-[#115eaf] text-[11px] font-normal border border-[#d5e3ff]">
                      100% Equivalent
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                    LPU Online Sample Degree
                  </h2>
                </div>

                <a
                  href={DEGREEFYD_LPU_API.sampleDegree.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-semibold hover:bg-[#e0ecff] transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <span>View Full-Size Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Certificate Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-[18px]">
                <div className="md:col-span-7 space-y-3.5">
                  <p className="text-xs sm:text-sm text-[#2d3137] leading-relaxed font-normal">
                    {DEGREEFYD_LPU_API.sampleDegree.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#2d3137]">
                    <span className="p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      UPSC & PSC Eligible
                    </span>
                    <span className="p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      WES Evaluated (US & Canada)
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onOpenApply()}
                      className="px-4 py-2 bg-[#115eaf] text-white rounded-lg text-xs font-semibold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>Apply for Degree Enrollment</span>
                    </button>
                    <button
                      onClick={onOpenHelpDesk}
                      className="px-3.5 py-2 bg-white text-[#000f22] border border-[#c4c6ce] rounded-lg text-xs font-medium hover:bg-[#f0f3ff] transition-all"
                    >
                      Verify Legal Equivalence
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-2.5 group hover:shadow-lg transition-all">
                    <img 
                      src={DEGREEFYD_LPU_API.sampleDegree.imageUrl}
                      alt={DEGREEFYD_LPU_API.sampleDegree.altText}
                      className="w-full h-auto object-contain rounded group-hover:scale-102 transition-transform duration-300 max-h-64"
                    />
                    <div className="text-center pt-1.5 text-[10px] text-[#74777e] font-normal">
                      Specimen UGC-Entitled Degree Format
                    </div>
                  </div>
                </div>
              </div>
            </section>

{/* 9. Verified Reviews & FAQs */}
            <section id="reviews-section" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              {/* Header and Rating Summary Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#e7eeff]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-normal flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      4.8 / 5.0 Rating
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-normal">
                      1,400+ Verified Submissions
                    </span>
                  </div>
                  <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans mt-2">
                    LPU Online Reviews
                  </h2>
                  <p className="section-description text-xs text-[#74777e]">
                    Authentic feedback from working executives, entrepreneurs, and graduates studying on LPU e-Connect
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#f0f3ff] border border-[#d5e3ff] p-2.5 rounded-xl shrink-0">
                  <div className="text-center">
                    <span className="block text-lg font-black text-[#115eaf]">94%</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Completion Rate</span>
                  </div>
                  <div className="h-6 w-px bg-[#d5e3ff]" />
                  <div className="text-center">
                    <span className="block text-lg font-black text-[#000f22]">25,000+</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Active Learners</span>
                  </div>
                  <div className="h-6 w-px bg-[#d5e3ff]" />
                  <div className="text-center">
                    <span className="block text-lg font-black text-emerald-700">100%</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Verified Profiles</span>
                  </div>
                </div>
              </div>

              {/* Review Filter Category Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-[18px]">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['All', 'Online MBA', 'Online MCA', 'Online BBA & BCA', 'Online M.Com'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedReviewCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] ${
                        selectedReviewCategory === cat
                          ? 'bg-[#115eaf] text-white shadow-xs'
                          : 'bg-[#f0f3ff] text-[#43474d] hover:bg-[#e0ecff] hover:text-[#000f22]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-[#74777e]">
                  Showing authentic verified reviews
                </span>
              </div>

              {/* Modern Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[18px]">
                {DEGREEFYD_LPU_API.testimonials
                  .filter(t => {
                    if (selectedReviewCategory === 'All') return true;
                    if (selectedReviewCategory === 'Online MBA') return t.course.includes('MBA');
                    if (selectedReviewCategory === 'Online MCA') return t.course.includes('MCA');
                    if (selectedReviewCategory === 'Online BBA & BCA') return t.course.includes('BBA') || t.course.includes('BCA');
                    if (selectedReviewCategory === 'Online M.Com') return t.course.includes('M.Com');
                    return true;
                  })
                  .map((t, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl border border-[#e7eeff] hover:border-[#115eaf]/70 hover:shadow-md transition-all p-3 flex flex-col justify-between gap-2.5 group relative"
                    >
                      {/* Top Bar: Stars + Tag */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex text-amber-400 gap-0.5 items-center">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current text-amber-400" />
                            ))}
                            <span className="text-[10px] font-normal text-[#000f22] ml-1.5">5.0</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-normal bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]">
                            <CheckCircle className="w-2.5 h-2.5 text-[#115eaf]" />
                            {t.tag || 'Verified Learner'}
                          </span>
                        </div>

                        {/* Program Badge */}
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          <span className="font-normal text-[#115eaf] truncate">
                            {t.course}
                          </span>
                          <span className="text-[9px] text-[#74777e] shrink-0 font-normal">
                            {t.batch}
                          </span>
                        </div>

                        {/* Review Content */}
                        <div className="relative pt-0.5">
                          <p className="text-[11px] text-[#2d3137] leading-relaxed font-normal line-clamp-3">
                            "{t.text}"
                          </p>
                        </div>
                      </div>

                      {/* Student Profile Footer */}
                      <div className="pt-2 border-t border-[#f0f3ff] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#115eaf] to-[#004689] text-white flex items-center justify-center text-[10px] font-semibold shrink-0 shadow-xs">
                            {t.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-normal text-[11px] text-[#000f22] truncate block">{t.studentName}</span>
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            </div>
                            <span className="text-[10px] text-[#115eaf] font-normal truncate block leading-tight">
                              {t.profession}
                            </span>
                            <span className="text-[9px] text-[#74777e] truncate block font-normal">
                              {t.company}
                            </span>
                          </div>
                        </div>

                        <span className="text-[9px] text-[#74777e] flex items-center gap-0.5 shrink-0 font-normal">
                          <MapPin className="w-2.5 h-2.5 text-[#74777e]" />
                          <span>{t.location}</span>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Review Callout Action Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0f3ff] via-white to-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row items-center justify-between gap-3 mt-[18px]">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-sm text-[#000f22] font-sans">
                    Join 25,000+ ambitious working professionals at LPU Online
                  </h4>
                  <p className="text-xs text-[#43474d]">
                    Admissions for Spring 2026 intake are currently open. Book a 1-on-1 counseling session with our admissions team.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => onOpenApply()}
                    className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold shadow hover:bg-[#004689] active:scale-95 transition-all"
                  >
                    Apply Now 2026
                  </button>
                  <button
                    onClick={() => onOpenHelpDesk()}
                    className="px-4 py-2.5 bg-white text-[#000f22] border border-[#000f22] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all"
                  >
                    Talk to Counselor
                  </button>
                </div>
              </div>

              {/* 12 FAQs directly from API */}
              <div className="pt-3 mt-[18px] border-t border-[#e7eeff]">
                <h3 className="section-title text-xl font-bold text-[#000f22] font-sans">
                  Frequently Asked Questions (LPU Online)
                </h3>
                <div className="space-y-[12px] mt-[18px]">
                  {DEGREEFYD_LPU_API.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-[#e7eeff] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between font-medium text-xs sm:text-sm text-[#000f22] hover:text-[#115eaf] bg-white transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-[#115eaf] shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-3 text-xs text-[#43474d] bg-[#f9f9ff] border-t border-[#e7eeff] leading-relaxed">
                            <p className="pt-3 font-normal">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Compare Colleges */}
            <section id="compare-colleges" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {DEGREEFYD_LPU_API.compareSection.title}
              </h2>
              <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.compareSection.description}
              </p>
              {/* MAIN COMPARISON BOX */}
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-[#e7eeff] rounded-2xl bg-white shadow-sm mt-[18px]">

                {/* LPU COLLEGE CARD */}
                <div className="min-h-[220px] rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold">
                      Selected
                    </span>

                    <div className="flex gap-4 items-center">
                      <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={DEGREEFYD_LPU_API.hero.logoImage}
                          alt="LPU Logo"
                          className="max-w-full max-h-full object-contain p-1.5"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <h3 className="mb-1.5 text-[19px] leading-tight font-extrabold text-[#000f22] font-sans">
                          {DEGREEFYD_LPU_API.title}
                        </h3>
                        <p className="mt-[7.5px] flex items-center gap-1.5 text-sm text-[#43474d]">
                          <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                          Phagwara, Punjab
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {DEGREEFYD_LPU_API.approvals.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBrochure()}
                    className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#115eaf] bg-white text-[#115eaf] text-sm font-bold hover:bg-[#f0f3ff] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Brochure
                  </button>
                </div>

                {/* VS */}
                <div className="compare-vs flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-sm font-extrabold">
                    VS
                  </span>
                </div>

                {/* ADD COLLEGE CARD */}
                <div className="min-h-[220px] rounded-xl border border-dashed border-[#d5e3ff] bg-[#f9f9ff] p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#d5e3ff] bg-white flex items-center justify-center text-[#115eaf] text-2xl font-light mb-2.5">
                    +
                  </div>
                  <div className="add-content">
                    <h3 className="text-lg font-extrabold text-[#000f22] font-sans">
                      Add College
                    </h3>
                    <p className="mt-[7.5px] text-[13px] leading-relaxed text-[#43474d] font-normal">
                      Select another college to compare side by side.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenHelpDesk()}
                    className="w-full h-11 mt-4 rounded-lg border-none bg-[#0b2540] text-white text-sm font-bold hover:bg-[#011c37] transition-all"
                  >
                    Add College
                  </button>
                </div>
              </div>
            </section>

            {/* Blogs */}
            <section id="blogs" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#f0f3ff] text-[#115eaf] text-xs font-bold border border-[#d5e3ff]">
                    {DEGREEFYD_LPU_API.blogs.label}
                  </span>
                  <h2 className="section-title mt-2 text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                    Latest <span className="text-[#115eaf]">Blogs</span>
                  </h2>
                  <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal max-w-[850px]">
                    {DEGREEFYD_LPU_API.blogs.description}
                  </p>
                </div>
                <button
                  onClick={() => onOpenHelpDesk()}
                  className="h-11 px-5 inline-flex items-center gap-2.5 rounded-xl border border-[#0b2540] text-[#0b2540] text-sm font-bold hover:bg-[#0b2540] hover:text-white transition-all shrink-0"
                >
                  View All Blogs
                  <span className="text-[#115eaf] text-lg leading-none">→</span>
                </button>
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3 mt-[18px]">
                <button
                  onClick={() => setBlogIndex((i) => Math.max(0, i - 1))}
                  disabled={blogIndex === 0}
                  aria-label="Previous blogs"
                  className="shrink-0 w-[42px] h-[42px] rounded-full border border-[#d5e3ff] bg-white text-[#000f22] text-lg flex items-center justify-center hover:bg-[#0b2540] hover:border-[#0b2540] hover:text-white disabled:opacity-35 disabled:cursor-default transition-all"
                >
                  ←
                </button>

                <div className="w-full overflow-hidden">
                  <div
                    className="flex"
                    style={{
                      gap: '22px',
                      transform: `translateX(-${blogIndex * (100 / blogVisible)}%)`,
                      transition: 'transform .45s cubic-bezier(.4,0,.2,1)'
                    }}
                  >
                    {DEGREEFYD_LPU_API.blogs.posts.map((post, i) => (
                      <article
                        key={i}
                        className="min-w-0 overflow-hidden bg-white border border-[#e7eeff] rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                        style={{ flex: `0 0 calc((100% - ${(blogVisible - 1) * 22}px) / ${blogVisible})` }}
                      >
                        <a href="#" className="relative block h-[185px] overflow-hidden bg-[#f0f3ff]">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute left-3.5 top-3.5 px-2.5 py-1.5 rounded-[20px] bg-[#115eaf] text-white text-[11px] font-bold leading-none">
                            {post.category}
                          </span>
                        </a>
                        <div className="p-[18px]">
                          <h3 className="text-[#000f22] text-lg leading-snug font-bold font-sans">{post.title}</h3>
                          <p className="mt-[7.5px] mb-4 text-sm text-[#43474d] leading-relaxed font-normal">{post.excerpt}</p>
                          <div className="flex items-center justify-between gap-3.5">
                            <span className="flex items-center gap-1.5 text-[13px] text-[#43474d] font-normal">
                              <Clock className="w-3.5 h-3.5 text-[#74777e] shrink-0" />
                              {post.date}
                            </span>
                            <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#115eaf] hover:text-[#004689] transition-colors">
                              Read More
                              <span className="text-lg leading-none hover:translate-x-1 transition-transform">→</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBlogIndex((i) => Math.min(Math.max(0, DEGREEFYD_LPU_API.blogs.posts.length - blogVisible), i + 1))}
                  disabled={blogIndex >= DEGREEFYD_LPU_API.blogs.posts.length - blogVisible}
                  aria-label="Next blogs"
                  className="shrink-0 w-[42px] h-[42px] rounded-full border border-[#d5e3ff] bg-white text-[#000f22] text-lg flex items-center justify-center hover:bg-[#0b2540] hover:border-[#0b2540] hover:text-white disabled:opacity-35 disabled:cursor-default transition-all"
                >
                  →
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center items-center gap-[7px]">
                {Array.from({ length: Math.max(0, DEGREEFYD_LPU_API.blogs.posts.length - blogVisible) + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBlogIndex(i)}
                    aria-label={`Go to blog slide ${i + 1}`}
                    className={`h-[7px] rounded-[10px] border-none cursor-pointer transition-all ${
                      i === blogIndex ? 'w-[23px] bg-[#115eaf]' : 'w-[7px] bg-[#d5e3ff]'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* Related Colleges */}
            <section id="related-colleges" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                Related Colleges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[18px]">
                {DEGREEFYD_LPU_API.relatedColleges.map((college, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:border-[#115eaf] transition-all cursor-pointer">
                    <span className="font-bold text-xs text-[#000f22]">{college.name}</span>
                    <span className="block text-[11px] text-[#74777e] mt-1">{college.location}</span>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </div>

      {/* Floating TOC Toggle Button */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="fixed bottom-20 left-4 z-30 w-11 h-11 rounded-full bg-[#0b2540] text-white shadow-lg flex items-center justify-center hover:bg-[#115eaf] transition-colors md:bottom-6"
        aria-label="Toggle Table of Contents"
      >
        <FileText className="w-5 h-5" />
      </button>

      {/* TOC Slide-in Panel */}
      {tocOpen && (
        <div className="fixed inset-0 z-40 flex justify-start">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setTocOpen(false)} />

          {/* Panel */}
          <div className="relative w-72 max-w-[85vw] bg-white shadow-2xl h-full overflow-y-auto animate-slide-in-left">
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#115eaf]" />
                  <h3 className="font-bold text-sm text-[#000f22]">Table of Contents</h3>
                </div>
                <button
                  onClick={() => setTocOpen(false)}
                  className="w-7 h-7 rounded-lg bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors"
                >
                  <span className="text-xs font-bold">✕</span>
                </button>
              </div>

              {/* TOC Links */}
              <ul className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => { handleTocClick(e, item.id); setTocOpen(false); }}
                        className={`block px-3 py-2 rounded-lg text-xs transition-all ${
                          isActive
                            ? 'bg-[#eef4ff] text-[#115eaf] font-bold'
                            : 'text-[#475569] hover:text-[#000f22] hover:bg-[#f8faff]'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* DEB Advisor Box */}
              <div className="bg-[#0b2540] text-white rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#115eaf] text-white flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs leading-tight">UGC-DEB Expert Desk</p>
                    <p className="text-[10px] text-[#b1c8eb]">Online Siksha Advisory</p>
                  </div>
                </div>
                <p className="text-[11px] text-[#b1c8eb] leading-relaxed">
                  Need guidance on degree equivalence, govt job validity, or fee plans?
                </p>
                <button
                  onClick={() => { onOpenHelpDesk(); setTocOpen(false); }}
                  className="w-full py-2 bg-[#115eaf] text-white rounded-lg text-[11px] font-bold hover:bg-[#004689] transition-all"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Counselling FAB + Slide-up Panel (right edge, vertical center) */}
      {counselPanelOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setCounselPanelOpen(false)} />
      )}

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        {/* Slide-up Panel */}
        <div
          className={`w-72 bg-white border border-[#e7eeff] shadow-2xl rounded-2xl transition-all duration-300 ${
            counselPanelOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-3 pointer-events-none'
          }`}
        >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#d5e3ff] flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5 text-[#115eaf]" />
            </div>
            <h3 className="text-xs font-bold text-[#000f22]">Get Free Counselling</h3>
          </div>
          <button
            onClick={() => setCounselPanelOpen(false)}
            className="w-6 h-6 rounded-md bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors text-[10px] font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {!formSubmitted ? (
            <form onSubmit={handleCounselingSubmit} className="space-y-2.5">
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={counselingForm.phone}
                onChange={(e) => setCounselingForm({ ...counselingForm, phone: e.target.value })}
                placeholder="Phone Number (+91)"
                className="w-full px-3 py-2 rounded-lg border border-[#c4c6ce] text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none"
              />
              <input
                type="email"
                required
                value={counselingForm.email}
                onChange={(e) => setCounselingForm({ ...counselingForm, email: e.target.value })}
                placeholder="Email Address"
                className="w-full px-3 py-2 rounded-lg border border-[#c4c6ce] text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none"
              />
              <select
                value={counselingForm.course}
                onChange={(e) => setCounselingForm({ ...counselingForm, course: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#c4c6ce] text-[11px] text-[#000f22] focus:border-[#115eaf] outline-none cursor-pointer bg-white"
              >
                {COURSES_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-2 bg-[#115eaf] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#004689] active:scale-95 transition-all"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="py-4 text-center space-y-1.5 text-[11px] animate-in fade-in">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="font-bold text-[#000f22] block">Callback Requested!</span>
              <p className="text-[#43474d]">We will call you at +91 {counselingForm.phone} shortly.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-[10px] font-bold text-[#115eaf] hover:underline">
                Submit another enquiry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Vertical Edge Tab — "Free Apply" */}
      <button
        onClick={() => setCounselPanelOpen(!counselPanelOpen)}
        className="w-12 h-[200px] bg-[#115eaf] hover:bg-[#004689] rounded-l-2xl shadow-md flex items-center justify-center transition-colors"
      >
        <span className="block text-white text-sm font-normal whitespace-nowrap -rotate-90">
          {counselPanelOpen ? 'Close' : 'Free Apply'}
        </span>
      </button>
      </div>
    </div>
  );
};
