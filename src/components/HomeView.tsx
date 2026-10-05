import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Download,
  CheckCircle,
  ChevronRight,
  Headphones,
} from 'lucide-react';

interface HomeViewProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

const TRENDING_FILTERS = [
  'NAAC A++ Only',
  'Under ₹1 Lakh Total',
  'Zero-Cost EMI',
  '100% Online Exam',
];

const HERO_METRICS = [
  { value: '50+', label: 'Entitled Universities' },
  { value: '180+', label: 'Recognized Degrees' },
  { value: '5,00,000+', label: 'Students Guided', tone: 'text-[#115eaf]' },
  { value: '100%', label: 'Zero-Cost EMI Options', tone: 'text-emerald-700' },
];

const DEGREE_CATEGORIES = ["Master's (PG)", "Bachelor's (UG)", 'Executive Tracks'] as const;

const DEGREE_CARDS = [
  {
    title: 'Online MBA',
    subtitle: 'Master of Business Administration',
    duration: '2 Years • 4 Sems',
    badge: 'High Placement Rate',
    badgeTone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    rows: [
      { label: 'Specializations:', value: '19+ (Data, Finance, Marketing, HR)' },
      { label: 'Avg Career CTC:', value: '₹7.2 - 14.5 LPA', tone: 'text-[#115eaf] font-semibold' },
    ],
    price: '₹18,500',
    explore: 'Explore 28 Unis',
  },
  {
    title: 'Online MCA',
    subtitle: 'Master of Computer Applications',
    duration: '2 Years • 4 Sems',
    badge: 'AI & Cloud Ready',
    badgeTone: 'text-purple-700 bg-purple-50 border-purple-200',
    rows: [
      { label: 'Specializations:', value: 'AI, Cloud, Full-Stack, Cyber' },
      { label: 'Avg Career CTC:', value: '₹6.5 - 16.0 LPA', tone: 'text-[#115eaf] font-semibold' },
    ],
    price: '₹22,000',
    explore: 'Explore 22 Unis',
  },
  {
    title: 'Online BBA',
    subtitle: 'Bachelor of Business Administration',
    duration: '3 Years • 6 Sems',
    badge: 'Entry Degree',
    badgeTone: 'text-blue-700 bg-blue-50 border-blue-200',
    rows: [
      { label: 'Specializations:', value: 'Digital Marketing, Finance, HR' },
      { label: 'Eligibility:', value: '10+2 with 50% Any Stream' },
    ],
    price: '₹14,000',
    explore: 'Explore 19 Unis',
  },
  {
    title: 'Online BCA',
    subtitle: 'Bachelor of Computer Applications',
    duration: '3 Years • 6 Sems',
    badge: 'Tech Career Starter',
    badgeTone: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    rows: [
      { label: 'Core Tracks:', value: 'Full-Stack, Python, Cloud' },
      { label: 'Practical Labs:', value: '100% Virtual Cloud Sandbox', tone: 'text-emerald-700 font-medium' },
    ],
    price: '₹15,000',
    explore: 'Explore 17 Unis',
  },
  {
    title: 'Online B.Com / M.Com',
    subtitle: 'Commerce & Corporate Finance',
    duration: 'UG & PG Available',
    badge: 'ACCA & US CMA Options',
    badgeTone: 'text-amber-800 bg-amber-50 border-amber-200',
    rows: [
      { label: 'Accounting Certs:', value: 'Integrated ACCA 9-Paper Exemption' },
      { label: 'Govt Exam Validity:', value: '100% Valid (UPSC/Banking)', tone: 'text-emerald-700 font-medium' },
    ],
    price: '₹12,000',
    explore: 'Explore 15 Unis',
  },
  {
    title: 'Online BA / MA',
    subtitle: 'Humanities & Social Sciences',
    duration: 'UG & PG Tracks',
    badge: 'Affordable Fee',
    badgeTone: 'text-slate-700 bg-slate-100 border-slate-300',
    rows: [
      { label: 'Disciplines:', value: 'Journalism, English, Public Policy' },
      { label: 'Best For:', value: 'Civil Services Aspirants' },
    ],
    price: '₹11,000',
    explore: 'Explore 14 Unis',
  },
];

const FEATURED_UNIS = [
  {
    id: 'lpu-online',
    name: 'Lovely Professional University',
    short: 'LPU Online',
    naac: 'NAAC A++ (3.68 CGPA)',
    rank: 'NIRF #31',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,40,000' },
      { label: 'EMI Starts:', value: '₹4,950/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Exam Mode:', value: '100% Home AI Proctored' },
      { label: 'Learning:', value: 'Live Lectures + LMS' },
    ],
  },
  {
    id: 'amity-online',
    name: 'Amity University',
    short: 'Amity Online',
    naac: 'NAAC A+',
    rank: 'NIRF Top 35',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,65,000' },
      { label: 'EMI Starts:', value: '₹5,833/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Ranking:', value: 'QS Online MBA Top 10 Asia' },
      { label: 'Campus LMS:', value: 'beSocial Academic App' },
    ],
  },
  {
    id: 'cu-online',
    name: 'Chandigarh University',
    short: 'CU Online',
    naac: 'NAAC A+',
    rank: 'QS World Ranked',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,35,000' },
      { label: 'EMI Starts:', value: '₹4,500/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Special Inclusions:', value: 'Harvard Certifications' },
      { label: 'Placement Drives:', value: '300+ Recruiters' },
    ],
  },
  {
    id: 'manipal-online',
    name: 'Manipal University Jaipur',
    short: 'Online Manipal',
    naac: 'NAAC A+ (3.59 CGPA)',
    rank: 'Legacy 70+ Yrs',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,75,000' },
      { label: 'EMI Starts:', value: '₹5,200/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Content Partner:', value: 'Coursera Access' },
      { label: 'Equivalence:', value: 'Global WES Recognized' },
    ],
  },
];

type CompareCell = { text: string; tone?: string; badge?: boolean };

const COMPARE_ROWS: { param: string; cells: CompareCell[] }[] = [
  {
    param: 'UGC-DEB Statutory Entitlement',
    cells: [
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'NAAC Accreditation Grade',
    cells: [
      { text: 'A++ (3.68 CGPA)', badge: true },
      { text: 'A+', badge: true },
      { text: 'A+', badge: true },
      { text: 'A+ (3.59 CGPA)', badge: true },
    ],
  },
  {
    param: 'NIRF University Ranking',
    cells: [
      { text: 'Rank #31' },
      { text: 'Top 35 Band' },
      { text: 'Top 40 Band' },
      { text: 'Top 60 Band' },
    ],
  },
  {
    param: 'Total 2-Year Program Fees',
    cells: [
      { text: '₹1,40,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,65,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,35,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,75,000', tone: 'font-bold text-[#000f22]' },
    ],
  },
  {
    param: 'Monthly 0-Cost EMI Option',
    cells: [
      { text: '₹4,950 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,833 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹4,500 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,200 / month', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'Examination Methodology',
    cells: [
      { text: '100% Remote AI Web-Cam' },
      { text: '100% Remote Proctored' },
      { text: 'Online LMS Exam' },
      { text: 'Remote Web Proctored' },
    ],
  },
  {
    param: 'Global WES Recognition (Canada/US)',
    cells: [
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
    ],
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onOpenApply, onOpenHelpDesk }) => {
  const navigate = useNavigate();
  const [degreeTab, setDegreeTab] = useState<(typeof DEGREE_CATEGORIES)[number]>("Master's (PG)");
  const [lead, setLead] = useState({ phone: '', email: '', degree: 'Online MBA' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-[17px] space-y-[17px]">
      {/* Hero */}
      <section className="bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            UGC-DEB • AICTE • NAAC A++ ACCREDITED UNIVERSITIES
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#000f22] tracking-tight leading-tight">
            Discover, Compare &amp; Enroll in India's Top Online Universities
          </h1>
          <p className="text-[#43474d] text-[15px] md:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Find government-recognized online degrees designed for working professionals with zero-cost EMI and 100% remote proctored exams.
          </p>

          <div className="mt-6 bg-[#f0f4f8] rounded-xl border border-[#c4c6ce]/60 p-[17px] shadow-sm text-left">
            <form
              className="grid grid-cols-1 md:grid-cols-12 gap-[17px] items-center"
              onSubmit={(e) => {
                e.preventDefault();
                navigate('/universities');
              }}
            >
              <div className="md:col-span-4 bg-white rounded-lg border border-[#c4c6ce] px-3 py-2">
                <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                  Select Degree
                </label>
                <select
                  className="w-full bg-transparent border-0 p-0 text-[14px] text-[#111c2d] font-medium focus:ring-0 cursor-pointer"
                  defaultValue="Online MBA (Master of Business)"
                >
                  <option>Online MBA (Master of Business)</option>
                  <option>Online MCA (Computer Applications)</option>
                  <option>Online BBA (Bachelor of Business)</option>
                  <option>Online BCA (Computer Science)</option>
                  <option>Online M.Com / B.Com</option>
                  <option>Online MA / BA</option>
                </select>
              </div>
              <div className="md:col-span-4 bg-white rounded-lg border border-[#c4c6ce] px-3 py-2">
                <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                  Budget Per Semester
                </label>
                <select
                  className="w-full bg-transparent border-0 p-0 text-[14px] text-[#111c2d] font-medium focus:ring-0 cursor-pointer"
                  defaultValue="Any Budget (₹12,000 - ₹50,000)"
                >
                  <option>Any Budget (₹12,000 - ₹50,000)</option>
                  <option>Under ₹15,000 / semester</option>
                  <option>₹15,000 - ₹25,000 / semester</option>
                  <option>₹25,000 - ₹40,000 / semester</option>
                  <option>Premium Tier (&gt; ₹40,000 / sem)</option>
                </select>
              </div>
              <div className="md:col-span-4 flex items-center">
                <button
                  type="button"
                  onClick={() => navigate('/universities')}
                  className="w-full h-[46px] rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  Explore 50+ Universities
                </button>
              </div>
            </form>
            <div className="mt-[17px] pt-[17px] border-t border-[#c4c6ce]/40 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="text-[#43474d] font-medium mr-1">Trending Filters:</span>
              {TRENDING_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => scrollTo('universities')}
                  className="cursor-pointer bg-white px-2.5 py-1 rounded-md border border-[#c4c6ce]/70 text-[#111c2d] hover:border-[#115eaf] hover:text-[#115eaf] transition-colors font-medium"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[17px] pt-4">
            {HERO_METRICS.map((m) => (
              <div key={m.label} className="p-3 bg-[#f0f4f8]/60 rounded-lg border border-[#c4c6ce]/50 text-center">
                <div className={`text-xl md:text-2xl font-bold ${m.tone || 'text-[#000f22]'}`}>{m.value}</div>
                <div className="text-[12px] text-[#43474d] font-normal">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Degree programs */}
      <section id="degrees" className="bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-[17px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[#c4c6ce]/40 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#000f22]">Popular Online Degree Programs</h2>
            <p className="text-[13px] text-[#43474d] font-normal mt-0.5">
              Approved under UGC Section 22 with equivalence to conventional regular degrees.
            </p>
          </div>
          <div className="inline-flex p-1 bg-[#f0f4f8] rounded-lg border border-[#c4c6ce]/50 text-[12px] font-semibold">
            {DEGREE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDegreeTab(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  degreeTab === cat ? 'bg-[#115eaf] text-white shadow-sm' : 'text-[#43474d] hover:text-[#111c2d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-[17px]">
          {DEGREE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg border border-[#c4c6ce] hover:border-[#115eaf] transition-all hover:shadow-md p-[17px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    {card.duration}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22]">{card.title}</h3>
                <p className="text-[12px] text-[#43474d] font-normal mt-1">{card.subtitle}</p>
                <div className="mt-3 py-2 border-y border-[#c4c6ce]/40 text-[12px] space-y-1">
                  {card.rows.map((r) => (
                    <div key={r.label} className="flex justify-between text-[#43474d] gap-2">
                      <span>{r.label}</span>
                      <span className={`text-right ${r.tone || 'font-medium text-[#000f22]'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#43474d] block">Starts from</span>
                  <span className="text-[15px] font-bold text-[#000f22]">
                    {card.price} <span className="text-[11px] font-normal text-[#43474d]">/ sem</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('universities')}
                  className="px-3 py-1.5 rounded-md bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors"
                >
                  {card.explore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured universities */}
      <section id="universities" className="bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-[17px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[#c4c6ce]/40 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="text-2xl font-bold text-[#000f22]">Featured NAAC A++ / A+ Online Universities</h2>
            </div>
            <p className="text-[13px] text-[#43474d] font-normal mt-0.5">
              Strictly ranked and entitled under UGC ODL &amp; Online Regulations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/universities')}
            className="text-[12px] font-semibold text-[#115eaf] hover:underline flex items-center gap-1"
          >
            View All 50+ Universities
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[17px] mt-[17px]">
          {FEATURED_UNIS.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-lg border border-[#c4c6ce] hover:border-[#115eaf] transition-all hover:shadow-md p-[17px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{u.rank}</span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22]">{u.name}</h3>
                <p className="text-[12px] text-[#115eaf] font-medium mt-0.5">{u.short}</p>
                <div className="mt-3 space-y-1.5 text-[12px] bg-[#f0f4f8]/50 p-2.5 rounded border border-[#c4c6ce]/30">
                  {u.rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-[#43474d]">{r.label}</span>
                      <span className={`text-right ${r.tone || 'font-medium text-[#000f22]'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(`/universities/${u.id}`)}
                  className="w-full py-2 rounded-md bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors"
                >
                  View Details &amp; Apply
                </button>
                <button
                  type="button"
                  onClick={onOpenHelpDesk}
                  className="w-full py-1.5 rounded-md border border-[#74777e] text-[12px] font-medium text-[#43474d] hover:bg-slate-50 flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison matrix */}
      <section id="compare" className="bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-[17px]">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#000f22]">Statutory Equivalence &amp; University Comparison Matrix</h2>
          <p className="text-[13px] text-[#43474d] font-normal mt-0.5">
            Transparent comparison of key approval parameters, total budget, and examination criteria.
          </p>
        </div>
        <div className="overflow-x-auto border border-[#c4c6ce] rounded-lg">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#f0f4f8] text-[#000f22] border-b border-[#c4c6ce] font-semibold">
                <th className="p-3">Comparison Parameter</th>
                <th className="p-3 text-[#115eaf]">LPU Online</th>
                <th className="p-3 text-[#115eaf]">Amity Online</th>
                <th className="p-3 text-[#115eaf]">CU Online</th>
                <th className="p-3 text-[#115eaf]">Manipal Jaipur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c6ce]/60 font-normal">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.param} className="hover:bg-slate-50/50">
                  <td className="p-3 font-medium text-[#111c2d]">{row.param}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`p-3 ${cell.tone || 'text-[#43474d] font-medium'}`}>
                      {cell.badge ? (
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                          {cell.text}
                        </span>
                      ) : cell.tone === 'text-emerald-700 font-semibold' || cell.tone === 'text-emerald-700' ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {cell.text}
                        </span>
                      ) : (
                        cell.text
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Counselling */}
      <section id="counselling" className="bg-[#0b2540] text-white rounded-xl shadow-md p-[17px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[17px] items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[11px] font-semibold">
              <Headphones className="w-3.5 h-3.5" />
              1-ON-1 EXPERT CAREER ADVICE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              Confused Between 50+ Universities? Speak with an Unbiased Academic Expert
            </h2>
            <p className="text-[14px] text-white/80 font-normal max-w-xl">
              Our educational counselors evaluate your career background, eligibility, and budget to find your ideal UGC-DEB entitled degree. Free service with 0 processing charges.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[12px] text-white/80 font-normal">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Zero Processing Fee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> No Spam Guarantee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Scholarship Pre-Evaluation
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white text-[#111c2d] rounded-lg p-[17px] shadow-sm">
            <h3 className="text-base font-bold text-[#000f22] mb-1">Request Free Call Back</h3>
            <p className="text-[12px] text-[#43474d] font-normal mb-3">
              Response guaranteed within 15 minutes during working hours.
            </p>
            {!leadSubmitted ? (
              <form
                className="space-y-[17px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeadSubmitted(true);
                }}
              >
                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="flex rounded-md border border-[#c4c6ce] overflow-hidden">
                    <span className="bg-slate-100 text-slate-700 px-3 py-2 text-[13px] font-medium border-r border-[#c4c6ce] flex items-center">
                      +91
                    </span>
                    <input
                      className="w-full border-0 px-3 py-2 text-[14px] focus:ring-1 focus:ring-[#115eaf] outline-none"
                      placeholder="98765 43210"
                      required
                      type="tel"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Your Email Address
                  </label>
                  <input
                    className="w-full rounded-md border border-[#c4c6ce] px-3 py-2 text-[14px] focus:ring-1 focus:ring-[#115eaf] outline-none"
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Target Degree / Program
                  </label>
                  <select
                    className="w-full rounded-md border border-[#c4c6ce] px-3 py-2 text-[13px] font-medium focus:ring-1 focus:ring-[#115eaf] outline-none bg-white"
                    value={lead.degree}
                    onChange={(e) => setLead({ ...lead, degree: e.target.value })}
                  >
                    <option>Online MBA</option>
                    <option>Online MCA</option>
                    <option>Online BBA / BCA</option>
                    <option>Online M.Com / B.Com</option>
                    <option>Executive Program</option>
                  </select>
                </div>
                <button
                  className="w-full py-2.5 rounded-md bg-[#115eaf] hover:bg-[#084a8c] text-white text-[13px] font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.99]"
                  type="submit"
                >
                  Connect with Advisor
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-[#43474d]/80 font-normal">
                  By submitting, you consent to receive university guidelines over phone/WhatsApp.
                </p>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold mb-1">Request Submitted</h3>
                <p className="text-xs text-[#43474d]">
                  An advisor will contact you shortly about {lead.degree}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
