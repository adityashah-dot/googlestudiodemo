import React, { useState } from 'react';
import {
  BadgeCheck,
  Star,
  MapPin,
  Calendar,
  Users,
  Download,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  PhoneCall,
} from 'lucide-react';
import { DEGREEFYD_LPU_API } from '../data/apiData';

interface AmityOnlineViewProps {
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
}

type AmityTab = 'overview' | 'courses' | 'admission' | 'scholarships' | 'placements';

const AMITY = DEGREEFYD_LPU_API.onlineUniversities.find((u) => u.id === 'amity-online')!;

const AMITY_TABS: { id: AmityTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: BadgeCheck },
  { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
  { id: 'admission', label: 'Admission', icon: GraduationCap },
  { id: 'scholarships', label: 'Scholarships', icon: Award },
  { id: 'placements', label: 'Placements', icon: Briefcase },
];

const HIGHLIGHTS = [
  { label: 'Establishment Year', value: '2005 (Amity Education Group)' },
  { label: 'Institution Type', value: 'Private UGC-DEB Entitled' },
  { label: 'Campus Location', value: 'Sector 125, Noida, Uttar Pradesh' },
  { label: 'Accreditation', value: 'NAAC A+ Grade (High CGPA)' },
  { label: 'Examination Format', value: '100% Home Online Proctored' },
  { label: 'Global Recognition', value: 'WES (USA & Canada), QAA (UK)' },
  { label: 'Industry Partners', value: 'KPMG, TCS iON, HCLTech, Paytm' },
  { label: 'Official Portal', value: 'amityonline.com' },
];

const COURSES = [
  { name: 'Online MBA', note: 'QS #1 in India • 14 Specializations', duration: '2 Years (4 Sems)', eligibility: 'Graduation with min 40% aggregate', fee: '₹1,65,000 – ₹2,50,000' },
  { name: 'Online MCA', note: 'Cloud Computing, AI & Data Science', duration: '2 Years (4 Sems)', eligibility: 'BCA/CS/B.Sc/B.Tech or Maths at 10+2', fee: '₹1,40,000 – ₹2,10,000' },
  { name: 'Online BBA', note: 'Digital Marketing, Finance, HR', duration: '3 Years (6 Sems)', eligibility: 'Pass 10+2 / HSC in any stream', fee: '₹1,20,000 – ₹1,80,000' },
  { name: 'Online BCA', note: 'Full-Stack, Software Dev & Cyber', duration: '3 Years (6 Sems)', eligibility: 'Pass 10+2 / HSC in any stream', fee: '₹1,25,000 – ₹1,85,000' },
  { name: 'Online B.Com / M.Com', note: 'Accounting, Banking, Corporate Finance', duration: '3 Yrs / 2 Yrs', eligibility: "10+2 for B.Com / Bachelor's for M.Com", fee: '₹90,000 – ₹1,30,000' },
  { name: 'Online BA / MA', note: 'Journalism, English, Economics, Psychology', duration: '3 Yrs / 2 Yrs', eligibility: "10+2 for BA / Bachelor's for MA", fee: '₹80,000 – ₹1,20,000' },
];

const ADMISSION_STEPS = [
  { num: '1', title: 'Online Registration', desc: 'Fill profile with academic information on the online portal.' },
  { num: '2', title: 'Upload Documents', desc: 'Upload 10th/12th/Grad mark sheets, Photo & Govt ID (Aadhaar/Passport).' },
  { num: '3', title: 'Pay Application Fee', desc: '₹1,100 application charge via UPI, Net Banking or Card.' },
  { num: '4', title: 'LMS Activation', desc: 'Verification in 7–10 days followed by student portal credentials.' },
];

const IMPORTANT_DATES = [
  { event: 'Application Cycle Start Date', date: 'January 2026 (Active)' },
  { event: 'Last Date to Apply (Spring/Summer Batches)', date: 'March – April 2026' },
  { event: 'Document Review & Verification', date: 'Ongoing (Rolling within 48-72 hrs)' },
  { event: 'Semester Induction & Orientation', date: 'April / July 2026 (as per intake)' },
  { event: 'Semester End-Term Examination', date: 'June / December 2026 (100% Remote Proctored)' },
];

const PLACEMENT_STATS = [
  { value: '₹20 LPA', label: 'Highest Package' },
  { value: '90%', label: 'Placement Rate' },
  { value: '500+', label: 'Hiring Partners' },
  { value: '3,000+', label: 'Job Opportunities' },
];

const RECRUITER_LOGOS: { name: string; src: string }[] = [
  { name: 'TCS', src: '/logos/tcs.jpg' },
  { name: 'Amazon', src: '/logos/amazon.jpg' },
  { name: 'Cognizant', src: '/logos/cognizant.jpg' },
  { name: 'Deloitte', src: '/logos/deloitte.jpg' },
  { name: 'Wipro', src: '/logos/wipro.jpg' },
  { name: 'Infosys', src: '/logos/infosys.png' },
  { name: 'Tech Mahindra', src: '/logos/techmahindra.jpg' },
  { name: 'Capgemini', src: '/logos/capgemini.png' },
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
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface CompactCounsellingFormProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  cta?: string;
  form: { name: string; phone: string; course: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string; course: string }>>;
  formSubmitted: boolean;
  setFormSubmitted: (v: boolean) => void;
  submittedNote?: string;
}

const CompactCounsellingForm: React.FC<CompactCounsellingFormProps> = ({
  title = 'Get Free Academic Counselling',
  subtitle = 'Connect with an accredited senior advisor for verified fee waivers and eligibility screening.',
  badge = 'Advisory Desk 2026',
  cta = 'Connect with Advisor',
  form,
  setForm,
  formSubmitted,
  setFormSubmitted,
  submittedNote,
}) => (
  <div className="bg-white rounded-xl border border-[#e7eeff] p-4 shadow-xs">
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <span className="text-[10px] font-semibold text-[#74777e] uppercase tracking-wider">{badge}</span>
    </div>
    <h3 className="text-sm font-bold text-[#000f22] leading-snug">{title}</h3>
    <p className="text-[11px] text-[#74777e] mt-0.5 mb-2.5 leading-snug">{subtitle}</p>
    {!formSubmitted ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormSubmitted(true);
        }}
        className="space-y-2"
      >
        <div>
          <label className="block text-[10px] text-[#000f22] font-medium mb-0.5">Your Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-2.5 py-1.5 border border-[#e7eeff] rounded-lg text-[11px] outline-none focus:ring-1 focus:ring-[#115eaf] focus:border-[#115eaf]"
          />
        </div>
        <div>
          <label className="block text-[10px] text-[#000f22] font-medium mb-0.5">Mobile Number (WhatsApp) *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-2.5 py-1.5 border border-[#e7eeff] rounded-lg text-[11px] outline-none focus:ring-1 focus:ring-[#115eaf] focus:border-[#115eaf]"
          />
        </div>
        <div>
          <label className="block text-[10px] text-[#000f22] font-medium mb-0.5">Target Degree</label>
          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            className="w-full px-2.5 py-1.5 border border-[#e7eeff] rounded-lg text-[11px] outline-none focus:ring-1 focus:ring-[#115eaf] focus:border-[#115eaf] bg-white"
          >
            <option>Online MBA</option>
            <option>Online MCA</option>
            <option>Online BBA</option>
            <option>Online BCA</option>
            <option>Online B.Com / M.Com</option>
            <option>Online BA / MA</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#115eaf] hover:bg-[#004689] text-white rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
        >
          {cta}
          <ArrowRight className="w-3 h-3" />
        </button>
        <p className="text-[10px] text-[#74777e] text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          100% Free & confidential. No spam guaranteed.
        </p>
      </form>
    ) : (
      <div className="text-center py-4">
        <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
        <h3 className="text-xs font-bold mb-0.5">Request Submitted</h3>
        <p className="text-[11px] text-[#43474d] leading-snug">
          {submittedNote || `An advisor will call you within 15 minutes about ${form.course} at Amity Online.`}
        </p>
      </div>
    )}
  </div>
);

const SCHOLARSHIPS = [
  { category: 'Merit-Based Scholarship', discount: '20% Waiver', eligibility: 'Minimum 85% aggregate in qualifying exam' },
  { category: 'Defence Personnel & Veterans', discount: '20% Waiver', eligibility: 'Armed Forces & Paramilitary (min 2 yrs service)' },
  { category: 'Divyaang (Specially Abled)', discount: '20% Waiver', eligibility: 'Valid disability certificate as per government norms' },
  { category: 'Amity University Alumni', discount: '20% Waiver', eligibility: 'Alumni of any Amity campus globally' },
  { category: 'Sports Achievement (CHAMPS)', discount: '30% to 100%', eligibility: 'State, national, or international medalists' },
  { category: 'Upfront Full Fee Payment', discount: '8% to 12% Off', eligibility: 'Discount on one-time complete program payment' },
];

const REVIEWS = [
  {
    name: 'Ved Prakash',
    role: 'Online MCA Learner',
    quote: 'I was unable to balance my IT job while studying, but Online Siksha and Amity Online made it seamless. The curriculum enhanced my cloud architecture skills and opened senior developer roles.',
  },
  {
    name: 'Shivraj Jain',
    role: 'Online MBA (Finance)',
    quote: "Online Siksha guided me to choose the distance learning program that matched my ambitions. Today I am able to work confidently in the corporate finance sector with Amity's MBA.",
  },
];

const FAQS = [
  {
    q: 'Is Amity University Online UGC and DEB recognized?',
    a: 'Yes, Amity University Online degrees are entitled by the University Grants Commission - Distance Education Bureau (UGC-DEB), holding NAAC A+ accreditation and AICTE approval.',
  },
  {
    q: 'Does the degree mention "Online" or "Distance Mode"?',
    a: 'No. In accordance with UGC guidelines, the degree certificate does not differentiate mode of delivery. It holds exact parity with an on-campus degree for employment and examinations.',
  },
  {
    q: 'How are semester examinations conducted?',
    a: 'All examinations are conducted 100% online from home using remote AI and live human proctoring on scheduled weekend slots.',
  },
  {
    q: 'Is the degree accepted for Canadian and US immigration (WES)?',
    a: 'Yes. Amity University Online degrees are evaluated by World Education Services (WES) and accepted for express entry PR pathways and postgraduate study across the USA, UK, and Canada.',
  },
];

// ——— Admission 2026 page content ———
const ADMISSION_HIGHLIGHTS: { label: string; value: React.ReactNode }[] = [
  { label: 'University Name', value: 'Amity University Online' },
  { label: 'Established Year', value: 'Part of Amity Education Group (est. 1995, Online 2005)' },
  { label: 'Accreditations & Badges', value: 'NAAC A+ Grade, WASC (USA), QAA (UK)' },
  { label: 'Statutory Recognition', value: <span className="text-emerald-700 font-medium">UGC-DEB & AICTE Approved (Govt. & Overseas Valid)</span> },
  { label: 'Learning Delivery Mode', value: '100% Online with Virtual Classrooms & Amigo LMS' },
  { label: 'Admission Selection Basis', value: <span className="text-[#115eaf] font-semibold">Direct Merit-Based (Marks in qualifying 10+2 / Graduation)</span> },
  { label: 'Application Registration Fee', value: '₹1,100 (Non-refundable digital review charge)' },
  { label: 'Official Portal', value: <span className="text-[#115eaf] font-medium">amityonline.com</span> },
];

const ADMISSION_DATES = [
  { event: 'Application Form Release', session: 'January Batch', timeline: 'November 17, 2025', tone: '' },
  { event: 'Last Date to Apply (Phase 1)', session: 'January Batch', timeline: 'February 28, 2026 (Extended March)', tone: '' },
  { event: 'July Batch Application Open', session: 'July Batch (Active)', timeline: 'April 2026', tone: 'blue' },
  { event: 'July Batch Final Deadline', session: 'July Batch', timeline: 'August 31, 2026 (Rolling Late Entry)', tone: 'amber' },
  { event: 'Document Review & Verification', session: 'All Applicants', timeline: 'Within 5–7 days of online submission', tone: 'emerald' },
  { event: 'Introduction & LMS Onboarding', session: 'Enrolled Students', timeline: 'Within 15 days of admission confirmation', tone: '' },
  { event: 'Classes & Live Lectures Start', session: 'July Batch', timeline: 'September 2026', tone: '' },
];

const ELIGIBILITY_ROWS = [
  { program: 'Online MBA', note: '19+ Industry Specializations', eligibility: 'Graduation in any stream with min 40% aggregate marks', selection: 'Merit-Based' },
  { program: 'Online MCA', note: 'Cloud, AI & Software Engineering', eligibility: "BCA/B.Sc CS/IT or Bachelor's with Maths at 10+2 / Graduation", selection: 'Merit-Based' },
  { program: 'Online BBA', note: '3 Years (6 Semesters)', eligibility: 'Pass Class 12 / HSC or equivalent exam from recognized board', selection: 'Merit-Based' },
  { program: 'Online BCA', note: 'Full-Stack & Cloud Computing', eligibility: 'Pass Class 12 with Mathematics or Statistics preference', selection: 'Merit-Based' },
  { program: 'Online B.Com / M.Com', note: 'Accounting, Fintech & Taxation', eligibility: "10+2 for B.Com / Bachelor's in Commerce or Allied for M.Com", selection: 'Merit-Based' },
  { program: 'Online BA / MA', note: 'JMC, English, Public Policy, Liberal Arts', eligibility: "10+2 for BA / Bachelor's degree in any discipline for MA", selection: 'Merit-Based' },
  { program: 'Online M.Sc (Data Science)', note: 'Advanced Analytics & AI', eligibility: 'Graduation in Science, Maths, Statistics, or Computer Science', selection: 'Profile Review' },
];

const APPLY_STEPS = [
  {
    num: '01',
    title: 'Register & Choose Degree',
    desc: 'Visit the official portal at amityonline.com. Enter basic contact credentials (name, email, WhatsApp mobile number). Select desired course level (UG, PG, or Certificate) and specialization.',
  },
  {
    num: '02',
    title: 'Upload Academic Scans',
    desc: 'Provide Class 10th & 12th marks. For PG courses, attach graduation marksheets. Upload scanned clear digital copy of valid government ID (Aadhaar/PAN/Passport) and recent photograph.',
  },
  {
    num: '03',
    title: 'Pay Application Fee',
    desc: 'Submit the non-refundable registration fee of ₹1,100 online via UPI, Net Banking, Credit Card, or Debit Card. The admission committee reviews documents within 5 to 7 working days.',
  },
  {
    num: '04',
    title: 'Enrollment & LMS Access',
    desc: 'Receive official Admission Offer Letter with unique Student Enrollment ID. Choose fee payment structure (Semester-wise or Zero-Cost EMI). Instant login credentials issued for the Amigo digital LMS.',
  },
];

const DOCUMENTS = [
  { title: 'Class 10th Certificate:', desc: 'Marksheet & passing certificate for Date of Birth verification' },
  { title: 'Class 12th Certificate:', desc: 'Marksheet & passing certificate from recognized board (CBSE/ICSE/State)' },
  { title: 'Graduation Marksheets:', desc: 'All semester marksheets and provisional / final degree (for PG courses)' },
  { title: 'Government Identity Proof:', desc: 'Aadhaar Card (front & back), Passport, Voter ID, or PAN Card' },
  { title: 'Passport Photograph:', desc: 'Recent colored passport photo with white background' },
  { title: 'Category / Special Concession:', desc: 'Disability certificate (Divyaang) or Defence service proof (if applicable)' },
];

const ADMISSION_SCHOLARSHIP_CARDS = [
  { title: 'Merit Scholarship', discount: '20% Waiver', desc: 'Minimum 85% aggregate in previous qualifying board or degree exam.' },
  { title: 'Amity Alumni', discount: '20% Waiver', desc: 'Past graduates of Amity University on-campus or distance programs.' },
  { title: 'Defence & Veterans', discount: '20% Waiver', desc: 'Active or retired armed forces personnel with minimum 2 years service.' },
  { title: 'Divyaang (Specially Abled)', discount: '20% Waiver', desc: 'Recognized certificate with minimum 40% benchmark disability norm.' },
  { title: 'Sports Excellence (CHAMPS Scheme)', discount: '30% to 100% Waiver', desc: 'State, National, or International recognized sports medalists & participating players.', wide: true },
];

const ADVANCE_DISCOUNTS = [
  { title: 'Full UG Upfront', desc: 'Complete 3-year fee in single advance', badge: '12% Off', dark: true },
  { title: 'Full PG Upfront', desc: 'Complete 2-year fee in single advance', badge: '8% Off', dark: true },
  { title: 'Annual Advance', desc: 'Annual fee instead of per-semester EMI', badge: '5% Off', dark: false },
];

const ADMISSION_REVIEWS = [
  { initials: 'SK', name: 'Sameer Kumar', role: 'Online BCA Student', quote: 'The admission team helped me at every step. Document upload and approval took less than 48 hours. I really enjoy the flexible proctored exam schedule.', tone: 'blue' },
  { initials: 'MM', name: 'Md Mobarak', role: 'Online MBA Student', quote: 'The study material is very clear and helpful. Zero-cost monthly EMI made it easy to finance without any agent commission or hidden costs.', tone: 'emerald' },
  { initials: 'AG', name: 'Aniket Giri', role: 'Online BCA Student', quote: "I joined through Online Siksha's counsellor recommendation. The digital portal makes daily study tracking and weekend live doubt sessions very simple.", tone: 'amber' },
  { initials: 'DS', name: 'Devyanshu Sesodia', role: 'Online BBA Student', quote: 'The university gives great support for the portal. They delivered printed books right to my home address within two weeks of admission.', tone: 'purple' },
];

const ADMISSION_FAQS = [
  {
    q: 'Is the Amity Online degree valid for government jobs and UPSC?',
    a: 'Yes. All degree programs have statutory UGC-DEB entitlement. Under UGC Open and Distance Learning Regulations, online degrees from entitled institutions hold 100% equivalence to conventional regular campus degrees for all government examinations, UPSC, SSC, state PSCs, and public sector employment.',
  },
  {
    q: 'Can I join Amity Online without taking CAT, MAT or an entrance exam?',
    a: "Yes. Standard admission is direct and merit-based on your percentage in the previous qualifying examination (10+2 for UG, Bachelor's for PG). Entrance exams are not mandatory unless qualifying marks fall below statutory minimum thresholds.",
  },
  {
    q: 'Are examinations conducted online or offline at campus centers?',
    a: 'All term-end examinations are conducted 100% online in a secure remote proctored format. Students can take tests comfortably from their home or office using a webcam-enabled laptop or PC.',
  },
  {
    q: 'Does the degree mention the word "Online" or "Distance"?',
    a: 'As per UGC Gazette notifications, the degree certificate awarded is identical to the conventional degree and states "Bachelor of Business Administration" or "Master of Business Administration" without derogatory mode disclaimers.',
  },
  {
    q: 'Does Amity University Online provide physical printed textbooks?',
    a: 'Yes. In addition to 24/7 digital LMS e-books and recorded video modules, printed study materials are delivered straight to your registered home postal address upon enrollment confirmation.',
  },
];

// ——— Courses & Fees 2026 page content ———
const COURSE_CARDS = [
  {
    level: 'Postgraduate • 2 Years',
    title: 'Online MBA (Master of Business Administration)',
    desc: 'Dual specializations in Marketing, Finance, HR, Data Analytics, Digital Marketing & Operations with KPMG & TCS iON masterclasses.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation (min 40% Marks)',
    fee: '₹1,90,000 – ₹2,50,000',
    emi: '₹5,833 / month',
    badge: 'QS Asia Top 10',
  },
  {
    level: 'Postgraduate • 2 Years',
    title: 'Online MCA (Master of Computer Applications)',
    desc: 'Specializations in Cloud Architecture, AI & Machine Learning, Big Data Analytics, and Full Stack Web Application Engineering.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'BCA / B.Sc / Math at 10+2',
    fee: '₹1,50,000 – ₹1,70,000',
    emi: '₹4,500 / month',
  },
  {
    level: 'Undergraduate • 3 Years',
    title: 'Online BBA (Bachelor of Business Administration)',
    desc: 'Core tracks in Digital Marketing, Retail Management, International Business, Human Resources, and Banking Operations.',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 Any Stream (Passed)',
    fee: '₹1,50,000 – ₹1,80,000',
    emi: '₹3,800 / month',
  },
  {
    level: 'Undergraduate • 3 Years',
    title: 'Online BCA (Bachelor of Computer Applications)',
    desc: 'Applied computer applications curriculum covering Python, Cloud Infrastructure, Database Design, and Full Stack Development.',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 with Maths / Computer',
    fee: '₹1,50,000 – ₹1,80,000',
    emi: '₹3,800 / month',
  },
  {
    level: 'Undergraduate • 3 Years',
    title: 'Online B.Com (Bachelor of Commerce)',
    desc: 'Specialized in FinTech, Financial Accounting, Auditing, Corporate Law, and Taxation for modern financial environments.',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 Any Stream (Passed)',
    fee: '₹99,000 – ₹1,20,000',
    emi: '₹2,500 / month',
  },
  {
    level: 'Postgraduate • 2 Years',
    title: 'Online M.Com (Financial Management)',
    desc: 'Advanced studies in International Trade, Investment Banking, Stock Markets, Corporate Governance, and Portfolio Evaluation.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.Com / BBA / Allied Degree',
    fee: '₹1,20,000 – ₹1,60,000',
    emi: '₹3,200 / month',
  },
];

const FEE_UG = [
  { name: 'Online BBA (Business Administration)', sems: '6 Sems', total: '₹1,50,000 – ₹1,80,000', perSem: '₹25,000 – ₹30,000' },
  { name: 'Online BCA (Computer Applications)', sems: '6 Sems', total: '₹1,50,000 – ₹1,80,000', perSem: '₹25,000 – ₹30,000' },
  { name: 'Online B.Com (Bachelor of Commerce)', sems: '6 Sems', total: '₹99,000 – ₹1,20,000', perSem: '₹16,500 – ₹20,000' },
  { name: 'Online BA (Journalism / Economics)', sems: '6 Sems', total: '₹99,000 – ₹1,30,000', perSem: '₹16,500 – ₹21,600' },
];

const FEE_PG = [
  { name: 'Online MBA (Master of Business Administration)', sems: '4 Sems', total: '₹1,90,000 – ₹2,50,000', perSem: '₹47,500 – ₹62,500' },
  { name: 'Online MCA (Computer Applications)', sems: '4 Sems', total: '₹1,50,000 – ₹1,70,000', perSem: '₹37,500 – ₹42,500' },
  { name: 'Online M.Com (Financial Management)', sems: '4 Sems', total: '₹1,20,000 – ₹1,60,000', perSem: '₹30,000 – ₹40,000' },
  { name: 'Online MA (Psychology / English)', sems: '4 Sems', total: '₹1,30,000 – ₹1,60,000', perSem: '₹32,500 – ₹40,000' },
];

const COURSE_ADMISSION_DATES = [
  { milestone: 'Application Form Release', jan: 'November 2025', jul: 'April 2026', status: 'Completed', tone: 'emerald' },
  { milestone: 'Last Date to Apply', jan: 'March 2026', jul: 'September 2026', status: 'Closing Soon', tone: 'amber' },
  { milestone: 'Document Verification', jan: 'Within 5–7 days of submission', jul: 'Within 5–7 days of submission', status: 'Active', tone: 'blue' },
  { milestone: 'Session Commencement', jan: 'Late January 2026', jul: 'Mid July 2026', status: 'Upcoming', tone: 'slate' },
];

const LMS_FEATURES = [
  { title: 'Live Interactive Classes', desc: 'Real-time faculty sessions with interactive Q&A, guest lectures by corporate CXOs, and industry case studies.' },
  { title: 'Recorded Video Lectures', desc: '24/7 video vault on the Amigo LMS portal so working professionals can balance job commitments and learning.' },
  { title: 'E-books & Digital Material', desc: 'Comprehensive downloadable digital library resources, case analyses, and curated reading materials at zero extra cost.' },
  { title: 'Online Discussion Forums', desc: 'Global peer networking via the beSocial community platform, peer study circles, and collaborative projects.' },
  { title: 'Remote Proctored Exams', desc: 'Appear for end-term examinations comfortably from your home computer with AI-supervised remote proctoring security.' },
  { title: 'Dedicated Academic Mentors', desc: 'Personal student success coordinators for scheduling assistance, assignment guidance, and corporate placement prep.' },
];

const COURSE_REVIEWS = [
  { initials: 'RV', name: 'Rahul Verma', role: 'Online MBA Graduate', quote: 'A flexible schedule helps me manage job and studies together seamlessly. The live case discussions with senior industry faculty gave me direct insights I apply daily at work.', tone: 'blue' },
  { initials: 'SK', name: 'Sneha Kapoor', role: 'Online BBA Learner', quote: 'Study material is easy to understand and LMS works smoothly. The mobile app makes it so convenient to revisit recorded sessions even while commuting.', tone: 'emerald' },
  { initials: 'AM', name: 'Arjun Malhotra', role: 'Online MCA Learner', quote: 'Amity online provides recorded lectures, they are very helpful to understand syllabus and complete practical coding assignments at my own pace.', tone: 'indigo' },
  { initials: 'NS', name: 'Neha Singh', role: 'Online BA Learner', quote: 'Faculties are supportive and response time is quick. Whenever I raised a query regarding exams or submissions, the mentor resolved it within hours.', tone: 'amber' },
];

const COURSE_FAQS = [
  {
    q: 'What courses are available at Amity University Online?',
    a: 'Amity University Online offers MBA, BBA, BCA, MCA, M.Com, BA, and MA along with multiple certificate and diploma courses across management, commerce, arts, and information technology.',
  },
  {
    q: 'Is Amity University Online degree valid for government and MNC jobs?',
    a: 'Yes, Amity University Online offers UGC-DEB entitled online degree courses with NAAC A+ accreditation. As per UGC regulations, online degrees from entitled universities hold complete statutory equivalence with on-campus conventional degrees for UPSC, PSU, state government jobs, corporate recruitments, and higher education.',
  },
  {
    q: 'Is there any entrance exam required for Amity Online admission?',
    a: "No, most programs at Amity University Online admit candidates purely based on merit in the qualifying examination (Class 12th for UG programs and Bachelor's Degree for PG programs). National entrance exams like CAT, MAT, or JEE are not mandatory.",
  },
  {
    q: 'Are EMI options and installment payment facilities available?',
    a: 'Yes, students can pay semester-wise or opt for Zero-Cost Monthly EMI schemes through major credit cards, debit cards, and partner education fintechs. Additional fee waivers of 5% to 12% are offered for full one-time or annual upfront payments.',
  },
  {
    q: 'Does Amity University Online provide placement support?',
    a: 'Yes, Amity University provides dedicated virtual placement assistance, skill enhancement workshops, CV building sessions, mock interview clinics, and direct job drives with 500+ corporate hiring partners including TCS iON, KPMG, HCLTech, and Deloitte.',
  },
];

// ——— Scholarships 2026 page content ———
const SCHOLARSHIP_METRICS = [
  { label: 'Maximum Waiver', value: 'Up to 100%', sub: 'Sports Excellence (CHAMPS)' },
  { label: 'Merit Scholarship', value: '20% Waiver', sub: 'Min 85% in qualifying exam' },
  { label: 'Defence & Alumni', value: '20% Waiver', sub: 'Armed forces & Amity alumni' },
  { label: 'Upfront Payment', value: '8% – 12% Off', sub: 'Full program fee discount' },
];

const SCHOLARSHIP_CATEGORIES = [
  {
    group: 'Merit & Category Waivers',
    tone: 'blue' as const,
    items: [
      { title: 'Merit Scholarship', discount: '20% Waiver', desc: 'Minimum 85% aggregate in previous qualifying board or degree exam.' },
      { title: 'Amity Alumni', discount: '20% Waiver', desc: 'Past graduates of Amity University on-campus or distance programs.' },
      { title: 'Defence & Veterans', discount: '20% Waiver', desc: 'Active or retired armed forces personnel with minimum 2 years service.' },
      { title: 'Divyaang (Specially Abled)', discount: '20% Waiver', desc: 'Recognized certificate with minimum 40% benchmark disability norm.' },
      { title: 'Sports Excellence (CHAMPS Scheme)', discount: '30% to 100% Waiver', desc: 'State, National, or International recognized sports medalists & participating players.', wide: true },
    ],
  },
  {
    group: 'Advance Payment Discounts',
    tone: 'emerald' as const,
    items: [
      { title: 'Full UG Upfront', discount: '12% Off', desc: 'Complete 3-year fee in single advance payment.', dark: true },
      { title: 'Full PG Upfront', discount: '8% Off', desc: 'Complete 2-year fee in single advance payment.', dark: true },
      { title: 'Annual Advance', discount: '5% Off', desc: 'Annual fee instead of per-semester billing.', dark: false },
    ],
  },
];

const SCHOLARSHIP_ELIGIBILITY = [
  { program: 'Online MBA', fee: '₹1,90,000 – ₹2,50,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '8% Off' },
  { program: 'Online MCA', fee: '₹1,50,000 – ₹1,70,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '8% Off' },
  { program: 'Online BBA', fee: '₹1,50,000 – ₹1,80,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '12% Off' },
  { program: 'Online BCA', fee: '₹1,50,000 – ₹1,80,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '12% Off' },
  { program: 'Online B.Com', fee: '₹99,000 – ₹1,20,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '12% Off' },
  { program: 'Online M.Com', fee: '₹1,20,000 – ₹1,60,000', merit: '20% (≥85%)', defence: '20%', sports: 'Up to 100%', upfront: '8% Off' },
];

const SCHOLARSHIP_FAQS = [
  {
    q: 'How do I check my scholarship eligibility at Amity Online?',
    a: 'Submit your highest qualification percentage and category details through the counselling form. An advisor verifies certificates and applies the eligible waiver during document scrutiny at admission.',
  },
  {
    q: 'Can I combine multiple scholarships?',
    a: 'No. Only one category scholarship can be availed per student. Advance payment discounts may apply separately depending on the payment structure chosen.',
  },
  {
    q: 'Is the sports scholarship available for all online programs?',
    a: 'Yes. The CHAMPS sports excellence scheme offers 30% to 100% tuition waiver for recognised state, national, or international medalists across eligible online UG and PG programs.',
  },
  {
    q: 'Are defence personnel scholarships applicable to working professionals?',
    a: 'Yes. Active or retired armed forces and paramilitary personnel with minimum 2 years of service receive a 20% tuition fee waiver on Amity Online programs.',
  },
  {
    q: 'When is the scholarship amount adjusted?',
    a: 'Scholarship concessions are applied directly during first-semester document scrutiny and reflected in the official fee invoice before enrolment confirmation.',
  },
];

export const AmityOnlineView: React.FC<AmityOnlineViewProps> = ({
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
}) => {
  const [activeTab, setActiveTab] = useState<AmityTab>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', phone: '', course: 'Online MBA' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabClick = (tab: AmityTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center gap-2 text-xs text-[#43474d] space-x-2 font-medium flex-wrap">
            <span>Home</span>
            <span className="text-[#74777e]">/</span>
            <span>Online Universities</span>
            <span className="text-[#74777e]">/</span>
            <span className="text-[#000f22] font-bold">Amity University Online</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col sm:flex-row gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white border border-[#e7eeff] rounded-xl p-1.5 flex items-center justify-center shadow-xs">
                {AMITY.logoImage ? (
                  <img
                    src={AMITY.logoImage}
                    alt="Amity University Online Crest"
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <span className="text-lg font-bold text-[#115eaf]">AMITY</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#f0f3ff] border border-[#d5e3ff] text-[#43474d] text-[11px] font-medium">
                    NAAC A+ Accredited
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#f0f3ff] border border-[#d5e3ff] text-[#43474d] text-[11px] font-medium">
                    NIRF Rank #32
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#000f22] tracking-tight mb-2">
                  Amity University Online
                </h1>
                <p className="text-sm text-[#43474d] leading-relaxed mb-3 max-w-2xl">
                  Amity University Online is India's first UGC recognised university to offer fully online degree and certification programmes. It is a part of the reputed Amity Education Group. AUO has more than 2,50,000 learners and over 6,000 faculty experts. The university offers 185 courses across 14 streams, including Management, Information Technology, Commerce, and Arts &amp; Humanities. Amity University Online popular courses include MBA, BCA, MCA, and MCom are designed according to current industry needs. Its courses are approved by UGC-DEB with NAAC A+ accreditation. Amity Online MBA is the only online MBA in India ranked by QS World Rankings 2024.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#43474d]">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                    <strong className="font-semibold text-[#000f22]">4.7 / 5</strong> Verified Reviews
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#74777e]" />
                    Established 2005 (Private)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#74777e]" />
                    Noida, Uttar Pradesh
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    1,60,000+ Enrolled Students
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="mt-[15px] rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src="/images/campusamity.png"
                  alt="Amity University Online Campus"
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-[10px]">
                <button
                  onClick={onOpenBrochure}
                  className="w-full py-2.5 px-3 border border-[#c4c6ce] bg-white text-[#000f22] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#f0f3ff] transition-all"
                >
                  <Download className="w-4 h-4" />
                  Brochure
                </button>
                <button
                  onClick={() => onOpenApply()}
                  className="w-full py-2.5 px-3 bg-[#0b2540] hover:bg-[#000f22] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky section tabs */}
      <div className="sticky top-20 z-30 bg-white border-y border-[#e7eeff] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {AMITY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#115eaf] text-white'
                      : 'text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========== OVERVIEW — full page from source HTML ========== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Highlights */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                      University Overview
                    </span>
                    <h2 className="text-xl font-bold text-[#000f22] mt-0.5">
                      Amity University Online Highlights 2026
                    </h2>
                  </div>
                  <span className="text-xs text-[#74777e]">Updated Session 2026-27</span>
                </div>
                <p className="text-sm text-[#43474d] leading-relaxed mb-5">
                  Amity University Online offers programs across multiple disciplines with academic rigor matching its on-campus counterparts. It operates with full statutory equivalence under University Grants Commission (UGC) regulations for employment and higher studies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {HIGHLIGHTS.map((h) => (
                    <div key={h.label} className="bg-[#f9f9ff] p-3.5 rounded-xl border border-[#e7eeff] flex justify-between items-center gap-3">
                      <span className="text-[#74777e]">{h.label}</span>
                      <strong className="font-semibold text-[#000f22] text-right">{h.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <h3 className="text-xs font-bold text-[#0b2540] uppercase tracking-wider mb-2">
                    Latest Admissions & Academic Notice (2026)
                  </h3>
                  <ul className="text-xs text-[#43474d] space-y-1.5">
                    <li className="flex gap-2">
                      <span className="text-[#115eaf] font-bold">•</span>
                      <span>The university conducts <strong>two admission sessions each year (January and July)</strong> with rolling online document verification.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#115eaf] font-bold">•</span>
                      <span>Specialized corporate-aligned tracks introduced with <strong>KPMG</strong> (Finance & Analytics) and <strong>TCS iON</strong> (Cloud & AI computing).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#115eaf] font-bold">•</span>
                      <span>Access to <strong>beSocial</strong>: Amity's virtual student community platform for masterclasses, alumni networking, and global peer cohorts.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Courses & Fees */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                      Academic Programs
                    </span>
                    <h2 className="text-xl font-bold text-[#000f22] mt-0.5">
                      Amity University Online Courses & Fees 2026
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-medium text-[#115eaf]">
                    Flexible Semester & Zero-Cost EMI Plans
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-4 max-w-3xl">
                  Programs are delivered through Amity's proprietary digital LMS with recorded lectures, weekly live interactions with faculty experts, and personalized academic mentors. Total fees range between ₹50,000 to ₹2,50,000.
                </p>
                <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mb-4">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#f0f3ff] border-b border-[#d5e3ff] text-[#43474d] font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3.5">Program Name</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3">Eligibility</th>
                        <th className="py-2.5 px-3">Total Tuition Fee</th>
                        <th className="py-2.5 px-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff] text-[#43474d]">
                      {COURSES.map((c) => (
                        <tr key={c.name} className="hover:bg-[#f9f9ff] transition-colors">
                          <td className="py-2.5 px-3.5">
                            <div className="font-semibold text-[#000f22]">{c.name}</div>
                            <div className="text-[11px] text-[#115eaf]">{c.note}</div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">{c.duration}</td>
                          <td className="py-2.5 px-3">{c.eligibility}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#000f22] whitespace-nowrap">{c.fee}</td>
                          <td className="py-2.5 px-3.5 text-right">
                            <button
                              onClick={() => onOpenApply()}
                              className="px-3 py-1 bg-[#f0f3ff] hover:bg-[#115eaf] hover:text-white rounded-md text-[11px] font-medium transition-all"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-xs text-[#43474d] flex flex-col md:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-[#000f22]">Available Payment Modes:</span> Semester-wise installments, Upfront Annual Fee (5% off), One-time Full Payment (8–12% off), or 0% Interest EMI via credit cards and education fintechs.
                  </div>
                  <button
                    onClick={onOpenBrochure}
                    className="px-3.5 py-2 bg-[#0b2540] hover:bg-[#000f22] text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                  >
                    Download Complete Fee PDF
                  </button>
                </div>
              </section>

              {/* Admission */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                  Enrollment Roadmap
                </span>
                <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-2">
                  Amity University Online Admission Process 2026
                </h2>
                <p className="text-sm text-[#43474d] leading-relaxed mb-5">
                  Admissions to Amity Online degrees are 100% online, merit-based, and hassle-free. No physical presence is required at any time for admission, classes, or examinations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {ADMISSION_STEPS.map((s) => (
                    <div key={s.num} className="bg-[#f9f9ff] p-4 rounded-xl border border-[#e7eeff]">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-[#115eaf] flex items-center justify-center font-bold text-xs mb-2">{s.num}</div>
                      <div className="text-xs font-semibold text-[#000f22] mb-1">{s.title}</div>
                      <p className="text-[11px] text-[#74777e] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3">
                  Tentative Admission Schedule (2026 Academic Calendar)
                </h3>
                <div className="overflow-hidden rounded-xl border border-[#e7eeff] text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-[#e7eeff]">
                      {IMPORTANT_DATES.map((d, i) => (
                        <tr key={d.event} className={i % 2 === 0 ? 'bg-[#f9f9ff]' : ''}>
                          <td className="py-2.5 px-4 font-medium text-[#74777e] w-1/2">{d.event}</td>
                          <td className="py-2.5 px-4 font-semibold text-[#000f22]">{d.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Placements */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                      Career ROI & Recruitment
                    </span>
                    <h2 className="text-xl font-bold text-[#000f22] mt-0.5">
                      Amity University Online Placements (₹20 LPA Record)
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-md">
                    90% Placement Assistance
                  </span>
                </div>
                <p className="text-sm text-[#43474d] leading-relaxed mb-5">
                  The dedicated Virtual Career Placement Cell hosts digital recruitment drives, CV building workshops, 1-on-1 mock interviews, and corporate internships with over 500 hiring partners across India and overseas.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {PLACEMENT_STATS.map((s) => (
                    <div key={s.label} className="bg-[#f9f9ff] p-4 rounded-xl border border-[#e7eeff] text-center">
                      <div className="text-2xl font-bold text-[#0b2540]">{s.value}</div>
                      <div className="text-xs text-[#74777e] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-semibold text-[#43474d] uppercase tracking-wider mb-2">
                  Key Corporate Recruiters
                </div>
                <RecruiterScroll />
              </section>

              {/* Scholarships */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                  Financial Support
                </span>
                <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-2">
                  Amity University Online Scholarships & Concessions
                </h2>
                <p className="text-sm text-[#43474d] leading-relaxed mb-4">
                  Amity University provides structured tuition waivers to deserving candidates, working professionals, defence families, and alumni.
                </p>
                <div className="overflow-hidden rounded-xl border border-[#e7eeff] text-xs mb-3">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f0f3ff] border-b border-[#d5e3ff] text-[#000f22] font-semibold">
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Tuition Discount</th>
                        <th className="py-3 px-4">Eligibility Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff] text-[#43474d]">
                      {SCHOLARSHIPS.map((s) => (
                        <tr key={s.category} className="hover:bg-[#f9f9ff]">
                          <td className="py-2.5 px-4 font-semibold text-[#000f22]">{s.category}</td>
                          <td className="py-2.5 px-4 text-emerald-700 font-semibold">{s.discount}</td>
                          <td className="py-2.5 px-4">{s.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-[#74777e]">
                  *Note: Only one scholarship benefit can be applied per candidate; subject to verification of official certificates during admission.
                </p>
              </section>

              {/* Examinations & Degree Equivalency */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                  Accreditation & Certificate
                </span>
                <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-4">
                  Examinations & Degree Equivalency
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3 text-xs text-[#43474d] leading-relaxed">
                    <p>
                      <strong className="text-[#000f22] font-semibold">100% Remote Proctored Examinations:</strong>{' '}
                      Students take all end-term examinations from home on weekends. The AI-proctored system guarantees seamless identity verification and anti-cheating protocols without requiring visits to testing centers.
                    </p>
                    <p>
                      <strong className="text-[#000f22] font-semibold">Statutory Equivalence (UGC-DEB):</strong>{' '}
                      Under UGC Open and Distance Learning regulations, the degree certificate does{' '}
                      <strong className="text-[#000f22]">NOT</strong> mention "Online" or "Distance" on the core title. It carries identical legal standing to an on-campus degree for:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[#000f22]">
                      <li>UPSC Civil Services & State Public Service Commissions</li>
                      <li>Central & State Government recruitments</li>
                      <li>MNC corporate employment worldwide</li>
                      <li>Higher education (Ph.D., Master's in US, UK, Canada)</li>
                    </ul>
                  </div>
                  <div className="bg-[#f9f9ff] border border-[#e7eeff] rounded-xl p-4 text-center">
                    <div className="aspect-[4/3] bg-white border border-[#e7eeff] rounded-lg overflow-hidden shadow-xs">
                      <img
                        src="/images/sampleamity.png"
                        alt="Amity University Online Sample Degree Certificate"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-[#000f22] text-sm">Amity University Degree Certificate</div>
                      <div className="text-[11px] text-[#74777e] mt-1">UGC-DEB • NAAC A+ • Ministry of Education Approved</div>
                      <div className="mt-2 inline-flex px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-full border border-emerald-200">
                        Equal to Conventional Campus Degree
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                  Learner Feedback
                </span>
                <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-4">
                  What Students Say About Amity Online
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="bg-[#f9f9ff] p-4 rounded-xl border border-[#e7eeff]">
                      <div className="flex gap-0.5 text-amber-500 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#43474d] italic leading-relaxed mb-2">"{r.quote}"</p>
                      <div className="text-xs font-semibold text-[#000f22]">{r.name}</div>
                      <div className="text-[11px] text-[#74777e]">{r.role}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">
                  Frequently Asked Questions
                </span>
                <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-4">
                  Amity University Online FAQs
                </h2>
                <div className="space-y-2">
                  {FAQS.map((f, i) => (
                    <div key={i} className="bg-[#f9f9ff] rounded-xl border border-[#e7eeff] overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[#000f22]">{f.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#115eaf] shrink-0 transition-transform ${
                            openFaq === i ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-3 text-xs text-[#43474d] leading-relaxed">{f.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar — counselling + compare (overview only) */}
            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-40">
              <CompactCounsellingForm
                form={form}
                setForm={setForm}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
              />

              <div className="bg-white rounded-xl border border-[#e7eeff] p-4 shadow-xs">
                <div className="text-[10px] font-semibold text-[#74777e] uppercase tracking-wider mb-0.5">
                  Direct Alternatives
                </div>
                <h4 className="text-xs font-bold text-[#000f22] mb-2">Compare With Similar UGC Universities</h4>
                <div className="space-y-2 text-[11px]">
                  {[
                    { name: 'LPU Online', meta: 'NAAC A++ • ₹1.40L (MBA)', id: 'lpu-online' },
                    { name: 'Chandigarh Univ (CU Online)', meta: 'QS #1 Private • ₹1.35L', id: 'cu-online' },
                    { name: 'Manipal University Jaipur', meta: 'NAAC A+ (3.59) • ₹1.75L', id: 'manipal-online' },
                  ].map((u) => (
                    <div key={u.id} className="p-2.5 bg-[#f9f9ff] rounded-lg border border-[#e7eeff] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#000f22]">{u.name}</div>
                        <div className="text-[10px] text-[#74777e]">{u.meta}</div>
                      </div>
                      <a href={`/universities/${u.id}`} className="text-[10px] text-[#115eaf] font-semibold hover:underline">
                        Compare →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ========== COURSES & FEES 2026 — full page from source HTML ========== */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-12">
              {/* Course catalog */}
              <section>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">2026 Academic Catalog</span>
                    <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                      Amity University Online Courses and Fees 2026
                    </h2>
                    <p className="text-[#43474d] text-sm mt-1">
                      UGC-DEB approved undergraduate and postgraduate online degree programs with flexible learning and career-focused specializations.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#43474d] bg-[#f0f3ff] px-3 py-1.5 rounded-lg shrink-0 border border-[#d5e3ff]">
                    <span>Updated: Jan 2026</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
                  {['All Programs (185+)', 'Management (MBA, BBA)', 'IT & Software (MCA, BCA)', 'Commerce (B.Com, M.Com)', 'Arts & Humanities (BA, MA)'].map((f, i) => (
                    <button
                      key={f}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-colors ${
                        i === 0
                          ? 'bg-[#0b2540] text-white shadow-sm'
                          : 'bg-white border border-[#c4c6ce] text-[#43474d] hover:bg-[#f9f9ff]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {COURSE_CARDS.map((c) => (
                    <div
                      key={c.title}
                      className="bg-white rounded-2xl border border-[#e7eeff] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group hover:border-[#115eaf]/50"
                    >
                      {c.badge && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-100 text-[#115eaf] text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                            {c.badge}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="text-[#115eaf] w-6 h-6" />
                          <span className="text-xs text-[#74777e] uppercase tracking-wider font-bold">{c.level}</span>
                        </div>
                        <h3 className="text-lg text-[#000f22] font-bold group-hover:text-[#115eaf] transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed">{c.desc}</p>
                        <div className="mt-4 pt-3 border-t border-[#e7eeff] space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[#74777e]">Duration:</span>
                            <span className="font-semibold text-[#000f22]">{c.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#74777e]">Eligibility:</span>
                            <span className="font-semibold text-[#000f22]">{c.eligibility}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#74777e]">Total Program Fee:</span>
                            <span className="font-bold text-[#0b2540] text-sm">{c.fee}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-3 border-t border-[#e7eeff]">
                        <div className="flex items-center justify-between mb-3 bg-[#f9f9ff] px-3 py-1.5 rounded-lg border border-[#e7eeff]/60">
                          <span className="text-xs text-[#43474d]">Zero-Cost EMI from</span>
                          <span className="text-sm font-bold text-[#115eaf]">{c.emi}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={onOpenBrochure}
                            className="w-full py-2 rounded-lg border border-[#c4c6ce] text-xs font-semibold text-[#43474d] hover:bg-[#f9f9ff] transition-colors"
                          >
                            View Syllabus
                          </button>
                          <button
                            onClick={() => onOpenApply()}
                            className="w-full py-2 rounded-lg bg-[#115eaf] hover:bg-[#004689] text-white text-xs font-semibold transition-colors"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fee tables */}
              <section>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Institutional Transparency</span>
                  <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                    Amity University Online Fee Structure 2026
                  </h2>
                  <p className="text-[#43474d] text-sm mt-1">
                    Standard university fee schedule inclusive of LMS access, digital e-books, Harvard content access, and remote proctored examination charges.
                  </p>
                </div>

                {/* UG table */}
                <div className="bg-white rounded-2xl border border-[#e7eeff] overflow-hidden shadow-sm mb-6">
                  <div className="bg-[#f9f9ff] px-5 py-3.5 border-b border-[#e7eeff] flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#000f22]">Undergraduate (UG) Online Degrees</h3>
                    <span className="text-xs text-[#74777e] font-semibold bg-white px-2.5 py-1 rounded border border-[#e7eeff]">
                      Duration: 3 Years (6 Semesters)
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#e7eeff] bg-[#f9f9ff]/50 text-xs font-semibold text-[#74777e] uppercase">
                          <th className="py-3.5 px-5">Program Name</th>
                          <th className="py-3.5 px-4">Semesters</th>
                          <th className="py-3.5 px-4">Total Course Fees (Approx)</th>
                          <th className="py-3.5 px-4">Per Semester Fee</th>
                          <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e7eeff]">
                        {FEE_UG.map((r) => (
                          <tr key={r.name} className="hover:bg-[#f9f9ff]/60 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-[#0b2540]">{r.name}</td>
                            <td className="py-3.5 px-4 text-[#43474d]">{r.sems}</td>
                            <td className="py-3.5 px-4 font-bold text-[#000f22]">{r.total}</td>
                            <td className="py-3.5 px-4 text-[#115eaf] font-semibold">{r.perSem}</td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => onOpenApply()}
                                className="text-[#115eaf] font-semibold hover:underline text-xs"
                              >
                                Apply
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PG table */}
                <div className="bg-white rounded-2xl border border-[#e7eeff] overflow-hidden shadow-sm mb-6">
                  <div className="bg-[#f9f9ff] px-5 py-3.5 border-b border-[#e7eeff] flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#000f22]">Postgraduate (PG) Online Degrees</h3>
                    <span className="text-xs text-[#74777e] font-semibold bg-white px-2.5 py-1 rounded border border-[#e7eeff]">
                      Duration: 2 Years (4 Semesters)
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#e7eeff] bg-[#f9f9ff]/50 text-xs font-semibold text-[#74777e] uppercase">
                          <th className="py-3.5 px-5">Program Name</th>
                          <th className="py-3.5 px-4">Semesters</th>
                          <th className="py-3.5 px-4">Total Course Fees (Approx)</th>
                          <th className="py-3.5 px-4">Per Semester Fee</th>
                          <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e7eeff]">
                        {FEE_PG.map((r) => (
                          <tr key={r.name} className="hover:bg-[#f9f9ff]/60 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-[#0b2540]">{r.name}</td>
                            <td className="py-3.5 px-4 text-[#43474d]">{r.sems}</td>
                            <td className="py-3.5 px-4 font-bold text-[#000f22]">{r.total}</td>
                            <td className="py-3.5 px-4 text-[#115eaf] font-semibold">{r.perSem}</td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => onOpenApply()}
                                className="text-[#115eaf] font-semibold hover:underline text-xs"
                              >
                                Apply
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment banner */}
                <div className="bg-gradient-to-r from-[#0b2540] to-[#0f345a] rounded-2xl p-6 text-white shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs mb-1">
                        <span>Institutional Financial Aid & EMI Assistance</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold">Flexible Payment Options & Zero Burden Plans</h4>
                      <p className="text-xs text-[#b1c8eb] mt-1 max-w-xl leading-relaxed">
                        Pay semester-wise, opt for 0% interest monthly EMIs via credit/debit cards, or get up to 5%-12% concessions on full upfront or annual payments.
                      </p>
                    </div>
                    <button
                      onClick={onOpenHelpDesk}
                      className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-[#0b2540] font-semibold text-xs sm:text-sm hover:bg-[#e7eeff] transition-colors"
                    >
                      Check EMI Eligibility
                    </button>
                  </div>
                </div>
              </section>

              {/* Admission dates */}
              <section>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Academic Calendar</span>
                  <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                    Amity University Online Admission Dates 2026
                  </h2>
                  <p className="text-[#43474d] text-sm mt-1">
                    Amity University Online conducts multiple admission cycles across the year for its online degree and diploma courses.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-[#e7eeff] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#e7eeff] bg-[#f9f9ff] font-semibold text-xs text-[#0b2540] uppercase">
                          <th className="py-3.5 px-5">Admission Milestone</th>
                          <th className="py-3.5 px-4">January 2026 Session</th>
                          <th className="py-3.5 px-4">July 2026 Session</th>
                          <th className="py-3.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e7eeff]">
                        {COURSE_ADMISSION_DATES.map((d) => (
                          <tr key={d.milestone} className="hover:bg-[#f9f9ff]/50">
                            <td className="py-3.5 px-5 font-semibold text-[#0b2540]">{d.milestone}</td>
                            <td
                              className={`py-3.5 px-4 ${
                                d.tone === 'amber' ? 'font-bold text-[#115eaf]' : 'text-[#43474d]'
                              }`}
                            >
                              {d.jan}
                            </td>
                            <td className="py-3.5 px-4 text-[#43474d]">{d.jul}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  d.tone === 'emerald'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : d.tone === 'amber'
                                      ? 'bg-amber-100 text-amber-900 animate-pulse'
                                      : d.tone === 'blue'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-[#f0f3ff] text-[#43474d]'
                                }`}
                              >
                                {d.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* LMS */}
              <section>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Tech-Driven Pedagogy</span>
                  <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                    Amity University Online Learning System
                  </h2>
                  <p className="text-[#43474d] text-sm mt-1">
                    Amity University Online empowers learners with its modern digital Learning Management System (LMS) accessible anywhere, anytime.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {LMS_FEATURES.map((f) => (
                    <div
                      key={f.title}
                      className="bg-white p-5 rounded-2xl border border-[#e7eeff] shadow-sm hover:border-[#115eaf] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#115eaf] flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-[#000f22]">{f.title}</h4>
                      <p className="text-xs text-[#43474d] mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Course reviews */}
              <section>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Learner Feedback</span>
                    <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                      Amity University Online Student Reviews
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.7 / 5 Overall Rating</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COURSE_REVIEWS.map((r) => (
                    <div key={r.name} className="bg-white p-5 rounded-2xl border border-[#e7eeff] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm ${
                              r.tone === 'blue'
                                ? 'bg-[#115eaf]'
                                : r.tone === 'emerald'
                                  ? 'bg-emerald-600'
                                  : r.tone === 'indigo'
                                    ? 'bg-indigo-600'
                                    : 'bg-amber-600'
                            }`}
                          >
                            {r.initials}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-[#000f22]">{r.name}</h5>
                            <span className="text-xs text-[#74777e]">{r.role}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500 text-xs gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#43474d] leading-relaxed italic">"{r.quote}"</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Course FAQs */}
              <section>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Frequently Asked Questions</span>
                  <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                    Amity University Online Courses FAQs
                  </h2>
                </div>
                <div className="space-y-3">
                  {COURSE_FAQS.map((f, i) => (
                    <div
                      key={i}
                      className={`bg-white p-4 rounded-xl border transition-all ${
                        openFaq === i ? 'border-[#115eaf]' : 'border-[#e7eeff]'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-sm font-semibold text-[#000f22] flex items-center justify-between cursor-pointer text-left gap-3"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#115eaf] transition-transform shrink-0 ${
                            openFaq === i ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <p className="text-xs text-[#43474d] mt-2.5 pt-2.5 border-t border-[#e7eeff] leading-relaxed">
                          {f.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Courses sidebar */}
            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-40">
              <CompactCounsellingForm
                title="Get Free Academic Counselling"
                subtitle="Connect with an accredited senior education advisor for unbiased guidance on approved programs and fee waivers."
                badge="Academic Session 2026–27 Open"
                form={form}
                setForm={setForm}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
              />

              <div className="bg-white p-4 rounded-xl border border-[#e7eeff] shadow-sm">
                <h4 className="text-xs font-bold text-[#000f22] mb-2">Compare With Similar Universities</h4>
                <div className="space-y-2">
                  {[
                    { name: 'LPU Online', meta: 'NAAC A++ • ₹1.40L (MBA)', id: 'lpu-online' },
                    { name: 'Chandigarh University (CU)', meta: 'QS #1 Private • ₹1.35L', id: 'cu-online' },
                    { name: 'Manipal University Jaipur', meta: 'NAAC A+ (3.59) • ₹1.75L', id: 'manipal-online' },
                  ].map((u) => (
                    <div
                      key={u.id}
                      className="p-2.5 rounded-lg border border-[#e7eeff] bg-[#f9f9ff]/50 hover:border-[#c4c6ce] transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-xs text-[#0b2540]">{u.name}</div>
                        <div className="text-[11px] text-[#74777e]">{u.meta}</div>
                      </div>
                      <a
                        href={`/universities/${u.id}`}
                        className="text-xs text-[#115eaf] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        Compare
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ========== ADMISSION 2026 — full page from source HTML ========== */}
        {activeTab === 'admission' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Admission Highlights */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#000f22]">
                      Amity University Online Admission Highlights 2026
                    </h2>
                    <p className="text-xs text-[#74777e] mt-0.5">
                      Summary of entitlement, accreditation, and admission format
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#f0f3ff] text-[#43474d]">
                    Session 2026-27
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-5">
                  Amity University Online provides quality, flexible education to over 2,00,000 global learners. With a <strong>NAAC A+ grade</strong> and NIRF Top 35 standing, all degrees hold 100% statutory equivalence under UGC-DEB regulations. Admissions are strictly merit-based on previous academic examination marks with <strong>no mandatory entrance examination</strong> required for standard qualifying students.
                </p>
                <div className="overflow-hidden border border-[#e7eeff] rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#f0f3ff] text-[#000f22] font-semibold border-b border-[#d5e3ff]">
                      <tr>
                        <th className="py-3 px-4">Particulars</th>
                        <th className="py-3 px-4">Official Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {ADMISSION_HIGHLIGHTS.map((h, i) => (
                        <tr key={h.label} className={i % 2 === 0 ? '' : 'bg-[#f9f9ff]/60'}>
                          <td className="py-3 px-4 font-medium text-[#43474d]">{h.label}</td>
                          <td className="py-3 px-4 text-[#000f22] font-semibold">{h.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Important Dates */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#000f22]">
                      Amity University Online Admission Important Dates 2026
                    </h2>
                    <p className="text-xs text-[#74777e] mt-0.5">
                      Bi-annual admission calendar: January Session & July Session
                    </p>
                  </div>
                  <button
                    onClick={onOpenHelpDesk}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#115eaf] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition shrink-0"
                  >
                    Keep Me Notified
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-4">
                  Candidates must adhere to the official admissions cycle to avoid registration delays. Both January and July academic cycles run on rolling verification schedules.
                </p>
                <div className="overflow-hidden border border-[#e7eeff] rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#f0f3ff] text-[#000f22] font-semibold border-b border-[#d5e3ff]">
                      <tr>
                        <th className="py-3 px-4">Event Milestone</th>
                        <th className="py-3 px-4">Session Target</th>
                        <th className="py-3 px-4">Tentative Timeline 2026</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {ADMISSION_DATES.map((d, i) => (
                        <tr
                          key={d.event}
                          className={
                            d.tone === 'amber'
                              ? 'bg-amber-50/40'
                              : i % 2 === 0
                                ? ''
                                : 'bg-[#f9f9ff]/60'
                          }
                        >
                          <td
                            className={`py-3 px-4 font-medium ${
                              d.tone === 'amber' ? 'text-amber-900' : 'text-[#43474d]'
                            }`}
                          >
                            {d.event}
                          </td>
                          <td
                            className={`py-3 px-4 ${
                              d.tone === 'blue'
                                ? 'text-[#115eaf] font-medium'
                                : d.tone === 'amber'
                                  ? 'text-amber-900 font-semibold'
                                  : 'text-[#43474d]'
                            }`}
                          >
                            {d.session}
                          </td>
                          <td
                            className={`py-3 px-4 ${
                              d.tone === 'amber'
                                ? 'text-amber-900 font-bold'
                                : d.tone === 'emerald'
                                  ? 'text-emerald-700 font-medium'
                                  : d.tone === 'blue'
                                    ? 'text-[#000f22] font-semibold'
                                    : 'text-[#43474d]'
                            }`}
                          >
                            {d.timeline}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-blue-900">
                  <span>Need help planning your application around exam schedules?</span>
                  <button
                    onClick={onOpenHelpDesk}
                    className="font-semibold text-[#115eaf] underline hover:text-blue-800 text-left sm:text-right"
                  >
                    Speak to Senior Advisor
                  </button>
                </div>
              </section>

              {/* Eligibility */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#000f22]">
                    Amity University Online Eligibility & Selection Criteria 2026
                  </h2>
                  <p className="text-xs text-[#74777e] mt-0.5">
                    Minimum qualifying benchmarks across Undergraduate and Postgraduate degrees
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-4">
                  Undergraduate programs require a recognized 10+2 certificate. Postgraduate programs require a bachelor's degree with a minimum of 40% aggregate marks. There is <strong>no CAT, MAT, or national entrance test</strong> required for direct general admissions.
                </p>
                <div className="overflow-x-auto border border-[#e7eeff] rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[580px]">
                    <thead className="bg-[#f0f3ff] text-[#000f22] font-semibold border-b border-[#d5e3ff]">
                      <tr>
                        <th className="py-3 px-4">Online Degree Program</th>
                        <th className="py-3 px-4">Eligibility Criteria (General)</th>
                        <th className="py-3 px-4">Selection Method</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {ELIGIBILITY_ROWS.map((row, i) => (
                        <tr key={row.program} className={i % 2 === 0 ? '' : 'bg-[#f9f9ff]/60'}>
                          <td className="py-3.5 px-4 font-semibold text-[#0b2540]">
                            {row.program}
                            <span className="block text-[11px] font-normal text-[#74777e]">{row.note}</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#43474d]">{row.eligibility}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                row.selection === 'Merit-Based'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-purple-50 text-purple-700 border-purple-200'
                              }`}
                            >
                              {row.selection}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => onOpenApply()}
                              className="text-xs text-[#115eaf] font-semibold hover:underline"
                            >
                              Apply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Application Process */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#000f22]">
                    Amity University Online Admission & Application Process 2026
                  </h2>
                  <p className="text-xs text-[#74777e] mt-0.5">Entirely web-based, streamlined digital workflow</p>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-5">
                  The admission journey is 100% digital from initial registration to student ID generation. You do not need to visit the physical Noida campus.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {APPLY_STEPS.map((s) => (
                    <div
                      key={s.num}
                      className="p-5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff]/50 hover:border-[#115eaf] transition"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#115eaf] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {s.num}
                        </span>
                        <h3 className="font-bold text-[#000f22] text-sm">{s.title}</h3>
                      </div>
                      <p className="text-xs text-[#43474d] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-[#0b2540] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm">Need guided end-to-end application filing?</div>
                    <div className="text-xs text-[#b1c8eb] mt-0.5">
                      Our certified education advisors assist with document verification and scholarship application.
                    </div>
                  </div>
                  <button
                    onClick={onOpenHelpDesk}
                    className="px-5 py-2 rounded-lg bg-amber-400 text-[#0b2540] font-semibold text-xs hover:bg-amber-300 transition shrink-0"
                  >
                    Get Application Assistance
                  </button>
                </div>
              </section>

              {/* Documents */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#000f22]">
                    Amity University Online Documents Required for Admission
                  </h2>
                  <p className="text-xs text-[#74777e] mt-0.5">
                    Keep digital scans (JPEG/PDF under 2MB) ready before beginning
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-4">
                  Failure to provide authentic and legible scanned copies can cause admission delays. All certificates undergo digital scrutiny against statutory boards.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {DOCUMENTS.map((d) => (
                    <div
                      key={d.title}
                      className="flex items-start gap-2.5 p-3 rounded-lg border border-[#e7eeff] bg-[#f9f9ff]/60"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-[#000f22]">{d.title}</strong>
                        <span className="text-[#43474d] block text-xs">{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scholarships (admission page version) */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#000f22]">
                      Amity University Online Scholarship 2026
                    </h2>
                    <p className="text-xs text-[#74777e] mt-0.5">
                      Direct tuition fee concessions & payment discounts applied at enrollment
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    Up to 100% Waivers
                  </span>
                </div>
                <p className="text-xs text-[#43474d] leading-relaxed mb-4">
                  Merit scholarships, defence concessions, alumni benefits, and advance fee discounts are applied directly during first-semester document scrutiny.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-[#74777e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf]" />
                      Merit & Category Waivers
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {ADMISSION_SCHOLARSHIP_CARDS.map((s) => (
                        <div
                          key={s.title}
                          className={`p-3 rounded-xl border bg-[#f9f9ff]/60 hover:bg-[#f9f9ff] transition flex flex-col justify-between ${
                            s.wide ? 'sm:col-span-2 border-emerald-200/80 bg-emerald-50/30' : 'border-[#e7eeff]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`font-semibold text-xs ${s.wide ? 'text-[#000f22]' : 'text-[#000f22]'}`}>
                              {s.title}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 border ${
                                s.wide
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  : 'bg-blue-50 text-[#115eaf] border-blue-200'
                              }`}
                            >
                              {s.discount}
                            </span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${s.wide ? 'text-[#43474d]' : 'text-[#74777e]'}`}>
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#74777e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Advance Payment Discounts
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ADVANCE_DISCOUNTS.map((d) => (
                        <div
                          key={d.title}
                          className="p-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff]/60 hover:bg-[#f9f9ff] transition flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="font-semibold text-xs text-[#000f22]">{d.title}</div>
                            <div className="text-[11px] text-[#74777e] mt-0.5">{d.desc}</div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${
                              d.dark
                                ? 'bg-[#0b2540] text-white'
                                : 'bg-[#f0f3ff] text-[#000f22] border border-[#e7eeff]'
                            }`}
                          >
                            {d.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-[#e7eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#74777e]">
                  <span className="italic">
                    *Note: Only one category scholarship can be availed per student. Valid certificates required during registration.
                  </span>
                  <button
                    onClick={onOpenHelpDesk}
                    className="text-[#115eaf] font-semibold hover:underline shrink-0 text-left sm:text-right"
                  >
                    Check My Concession Eligibility →
                  </button>
                </div>
              </section>

              {/* Admission testimonials */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#000f22]">
                    What Learners Say About Admission & Support
                  </h2>
                  <p className="text-xs text-[#74777e] mt-0.5">
                    Real feedback from currently enrolled undergraduate and postgraduate students
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADMISSION_REVIEWS.map((r) => (
                    <div
                      key={r.name}
                      className="p-4 rounded-xl bg-[#f9f9ff] border border-[#e7eeff]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            r.tone === 'blue'
                              ? 'bg-blue-100 text-[#115eaf]'
                              : r.tone === 'emerald'
                                ? 'bg-emerald-100 text-emerald-800'
                                : r.tone === 'amber'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {r.initials}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#000f22]">{r.name}</div>
                          <div className="text-[11px] text-[#74777e]">{r.role}</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#43474d] italic">"{r.quote}"</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Admission FAQs */}
              <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#000f22]">Amity Online Admission FAQs 2026</h2>
                  <p className="text-xs text-[#74777e] mt-0.5">
                    Clear answers regarding approvals, degree validity, and examination formats
                  </p>
                </div>
                <div className="space-y-2">
                  {ADMISSION_FAQS.map((f, i) => (
                    <div key={i} className="border border-[#e7eeff] rounded-xl p-4 bg-white open:bg-[#f9f9ff]/50">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-center font-semibold text-xs sm:text-sm text-[#000f22] text-left gap-3"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#74777e] shrink-0 transition-transform ${
                            openFaq === i ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <p className="mt-3 text-xs sm:text-sm text-[#43474d] leading-relaxed">{f.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Admission sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-40">
              <div className="bg-white rounded-2xl border border-[#e7eeff] p-5 shadow-xs">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-[#115eaf] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf] animate-pulse" />
                  Academic Session 2026–27 Open
                </div>
                <h3 className="text-lg font-bold text-[#000f22]">Get Free Academic Counselling</h3>
                <p className="text-xs text-[#74777e] mt-1 leading-relaxed">
                  Connect with an accredited senior education advisor for unbiased guidance on approved programs and fee waivers.
                </p>
                {!formSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="mt-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-medium text-[#000f22] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e7eeff] focus:outline-none focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#000f22] mb-1">Mobile Number (WhatsApp) *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#e7eeff] bg-[#f9f9ff] text-[#74777e] text-xs font-medium">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-r-xl border border-[#e7eeff] focus:outline-none focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#000f22] mb-1">Target Degree *</label>
                      <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e7eeff] focus:outline-none focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] transition bg-white"
                      >
                        <option>Online MBA (19+ Specializations)</option>
                        <option>Online MCA (Cloud & AI)</option>
                        <option>Online BBA</option>
                        <option>Online BCA</option>
                        <option>Online B.Com / M.Com</option>
                        <option>Online BA / MA</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#115eaf] hover:bg-[#004689] transition flex items-center justify-center gap-1.5 mt-2"
                    >
                      Connect with Advisor
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <h3 className="text-sm font-bold mb-1">Request Submitted</h3>
                    <p className="text-xs text-[#43474d]">
                      An advisor will call you within 15 minutes about {form.course} at Amity Online.
                    </p>
                  </div>
                )}
                <div className="mt-4 pt-3 border-t border-[#e7eeff] flex items-center justify-center gap-2 text-[11px] text-[#74777e]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Free & confidential. No spam policy.
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e7eeff] p-5 shadow-xs">
                <h4 className="text-sm font-bold text-[#000f22] mb-3">Compare With Other Top Universities</h4>
                <div className="space-y-3">
                  {[
                    { name: 'LPU Online', meta: 'NAAC A++ • ₹1.40L (MBA)', id: 'lpu-online' },
                    { name: 'Chandigarh Univ (CU Online)', meta: 'QS #1 Private • ₹1.35L', id: 'cu-online' },
                    { name: 'Manipal University Jaipur', meta: 'NAAC A+ (3.59) • ₹1.75L', id: 'manipal-online' },
                  ].map((u) => (
                    <div
                      key={u.id}
                      className="p-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-[#000f22]">{u.name}</div>
                        <div className="text-[11px] text-[#74777e]">{u.meta}</div>
                      </div>
                      <a href={`/universities/${u.id}`} className="font-semibold text-[#115eaf] hover:underline">
                        Compare →
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0b2540] to-[#000f22] rounded-2xl p-5 text-white shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
                  <Download className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-base text-white">Download Admission Guide 2026</h4>
                <p className="text-xs text-[#b1c8eb] mt-1 leading-relaxed">
                  Get the full curriculum breakdown, semester fee installment options, and scholarship waiver eligibility handbook.
                </p>
                <button
                  onClick={onOpenBrochure}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0b2540] bg-amber-400 hover:bg-amber-300 transition"
                >
                  Download Complete PDF (Free)
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ========== SCHOLARSHIPS 2026 — full page ========== */}
        {activeTab === 'scholarships' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-10">
              {/* Header + metrics */}
              <section>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Financial Support 2026</span>
                    <h2 className="text-2xl sm:text-3xl text-[#000f22] font-bold tracking-tight">
                      Amity University Online Scholarships & Concessions
                    </h2>
                    <p className="text-[#43474d] text-sm mt-1 max-w-2xl">
                      Merit scholarships, defence concessions, alumni benefits, sports waivers, and advance fee discounts applied directly during first-semester document scrutiny.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    Up to 100% Waivers
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SCHOLARSHIP_METRICS.map((m) => (
                    <div key={m.label} className="bg-white p-4 rounded-xl border border-[#e7eeff] shadow-sm">
                      <span className="text-xs text-[#74777e] block uppercase tracking-wider font-medium">{m.label}</span>
                      <span className="text-xl sm:text-2xl text-[#0b2540] font-bold mt-0.5 block">{m.value}</span>
                      <span className="text-xs text-[#74777e] block mt-1">{m.sub}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scholarship categories */}
              <section>
                <div className="mb-5">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Waiver Structure</span>
                  <h3 className="text-xl sm:text-2xl text-[#000f22] font-bold tracking-tight mt-0.5">
                    Scholarship Categories & Advance Discounts
                  </h3>
                </div>
                <div className="space-y-6">
                  {SCHOLARSHIP_CATEGORIES.map((cat) => (
                    <div key={cat.group}>
                      <div className="text-[11px] font-semibold text-[#74777e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            cat.tone === 'blue' ? 'bg-[#115eaf]' : 'bg-emerald-500'
                          }`}
                        />
                        {cat.group}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {cat.items.map((item) => (
                          <div
                            key={item.title}
                            className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                              'wide' in item && item.wide
                                ? 'sm:col-span-2 border-emerald-200/80 bg-emerald-50/30'
                                : 'border-[#e7eeff] bg-[#f9f9ff]/60 hover:bg-[#f9f9ff]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-semibold text-xs text-[#000f22]">{item.title}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 border ${
                                  'dark' in item && item.dark
                                    ? 'bg-[#0b2540] text-white border-transparent'
                                    : 'wide' in item && item.wide
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                      : 'bg-blue-50 text-[#115eaf] border-blue-200'
                                }`}
                              >
                                {item.discount}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#74777e] leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-[11px] text-[#74777e]">
                  <span className="italic">
                    *Note: Only one category scholarship can be availed per student. Valid certificates required during registration.
                  </span>
                </div>
              </section>

              {/* Program-wise eligibility */}
              <section>
                <div className="mb-5">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Program-wise Matrix</span>
                  <h3 className="text-xl sm:text-2xl text-[#000f22] font-bold tracking-tight mt-0.5">
                    Scholarship Eligibility by Program
                  </h3>
                  <p className="text-[#43474d] text-sm mt-1">
                    Approximate fee ranges with applicable waiver brackets for each Amity Online degree.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-[#e7eeff] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm min-w-[640px]">
                      <thead>
                        <tr className="border-b border-[#e7eeff] bg-[#f9f9ff] text-xs font-semibold text-[#0b2540] uppercase">
                          <th className="py-3.5 px-5">Program</th>
                          <th className="py-3.5 px-4">Total Fee</th>
                          <th className="py-3.5 px-4">Merit (≥85%)</th>
                          <th className="py-3.5 px-4">Defence</th>
                          <th className="py-3.5 px-4">Sports</th>
                          <th className="py-3.5 px-4">Upfront</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e7eeff]">
                        {SCHOLARSHIP_ELIGIBILITY.map((r, i) => (
                          <tr key={r.program} className={i % 2 === 0 ? '' : 'bg-[#f9f9ff]/60'}>
                            <td className="py-3.5 px-5 font-semibold text-[#0b2540]">{r.program}</td>
                            <td className="py-3.5 px-4 font-bold text-[#000f22]">{r.fee}</td>
                            <td className="py-3.5 px-4 text-[#115eaf] font-semibold">{r.merit}</td>
                            <td className="py-3.5 px-4 text-emerald-700 font-medium">{r.defence}</td>
                            <td className="py-3.5 px-4 text-emerald-700 font-medium">{r.sports}</td>
                            <td className="py-3.5 px-4 text-[#000f22] font-medium">{r.upfront}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* How to claim */}
              <section>
                <div className="mb-5">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Process</span>
                  <h3 className="text-xl sm:text-2xl text-[#000f22] font-bold tracking-tight mt-0.5">
                    How to Claim Your Scholarship
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { num: '01', title: 'Check Eligibility', desc: 'Share your qualification marks and category (merit, defence, alumni, sports).' },
                    { num: '02', title: 'Submit Documents', desc: 'Upload valid certificates during online admission application.' },
                    { num: '03', title: 'Advisor Verification', desc: 'Senior counsellor verifies documents within 5–7 working days.' },
                    { num: '04', title: 'Fee Adjustment', desc: 'Concession applied on first-semester invoice before enrolment.' },
                  ].map((s) => (
                    <div key={s.num} className="p-4 rounded-xl border border-[#e7eeff] bg-white shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#115eaf] text-white flex items-center justify-center font-bold text-sm mb-2">
                        {s.num}
                      </div>
                      <div className="text-xs font-semibold text-[#000f22] mb-1">{s.title}</div>
                      <p className="text-[11px] text-[#74777e] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scholarship FAQs */}
              <section>
                <div className="mb-5">
                  <span className="text-xs uppercase tracking-wider text-[#115eaf] font-bold">Frequently Asked Questions</span>
                  <h3 className="text-xl sm:text-2xl text-[#000f22] font-bold tracking-tight mt-0.5">
                    Amity Online Scholarship FAQs
                  </h3>
                </div>
                <div className="space-y-2">
                  {SCHOLARSHIP_FAQS.map((f, i) => (
                    <div
                      key={i}
                      className={`bg-white p-4 rounded-xl border transition-all ${
                        openFaq === i ? 'border-[#115eaf]' : 'border-[#e7eeff]'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-sm font-semibold text-[#000f22] flex items-center justify-between cursor-pointer text-left gap-3"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#115eaf] transition-transform shrink-0 ${
                            openFaq === i ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <p className="text-xs text-[#43474d] mt-2.5 pt-2.5 border-t border-[#e7eeff] leading-relaxed">
                          {f.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Scholarship sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-40">
              <div className="bg-white p-6 rounded-2xl border border-[#e7eeff] shadow-md">
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#115eaf] border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf]" />
                    Scholarship Desk 2026–27 Open
                  </span>
                  <h3 className="text-lg font-bold text-[#000f22] mt-2">Check My Scholarship Eligibility</h3>
                  <p className="text-xs text-[#74777e] mt-1">
                    Get free waiver screening for merit, defence, alumni, sports, and upfront payment discounts.
                  </p>
                </div>
                {!formSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-[#43474d] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c4c6ce] focus:ring-2 focus:ring-[#115eaf] focus:border-[#115eaf] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#43474d] mb-1">Mobile Number (WhatsApp) *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#c4c6ce] bg-[#f9f9ff] text-[#43474d] text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-r-xl border border-[#c4c6ce] focus:ring-2 focus:ring-[#115eaf] focus:border-[#115eaf] outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#43474d] mb-1">Target Degree / Course *</label>
                      <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c4c6ce] focus:ring-2 focus:ring-[#115eaf] focus:border-[#115eaf] outline-none bg-white transition-all"
                      >
                        <option>Online MBA (2 Years)</option>
                        <option>Online MCA (2 Years)</option>
                        <option>Online BBA (3 Years)</option>
                        <option>Online BCA (3 Years)</option>
                        <option>Online B.Com / M.Com</option>
                        <option>Online BA / MA</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#115eaf] hover:bg-[#004689] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      Check My Concession Eligibility
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#74777e] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Free & confidential. No spam guaranteed.</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <h3 className="text-sm font-bold mb-1">Request Submitted</h3>
                    <p className="text-xs text-[#43474d]">
                      An advisor will call you within 15 minutes to verify scholarship eligibility for {form.course}.
                    </p>
                  </div>
                )}
                <div className="mt-5 pt-4 border-t border-[#e7eeff] space-y-2 text-xs text-[#43474d]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Zero agent commission & hidden charges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Instant syllabus & fee structure PDFs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Up to 20% scholarship eligibility screening</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e7eeff] shadow-sm">
                <h4 className="text-sm font-bold text-[#000f22] mb-3">Compare With Similar Universities</h4>
                <div className="space-y-3">
                  {[
                    { name: 'LPU Online', meta: 'NAAC A++ • ₹1.40L (MBA)', id: 'lpu-online' },
                    { name: 'Chandigarh University (CU)', meta: 'QS #1 Private • ₹1.35L', id: 'cu-online' },
                    { name: 'Manipal University Jaipur', meta: 'NAAC A+ (3.59) • ₹1.75L', id: 'manipal-online' },
                  ].map((u) => (
                    <div
                      key={u.id}
                      className="p-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff]/50 hover:border-[#c4c6ce] transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-xs text-[#0b2540]">{u.name}</div>
                        <div className="text-[11px] text-[#74777e]">{u.meta}</div>
                      </div>
                      <a
                        href={`/universities/${u.id}`}
                        className="text-xs text-[#115eaf] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        Compare
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0b2540] to-[#000f22] rounded-2xl p-5 text-white shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
                  <Download className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-base text-white">Download Scholarship Handbook 2026</h4>
                <p className="text-xs text-[#b1c8eb] mt-1 leading-relaxed">
                  Full waiver categories, eligibility certificates list, and fee concession calculation guide.
                </p>
                <button
                  onClick={onOpenBrochure}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0b2540] bg-amber-400 hover:bg-amber-300 transition"
                >
                  Download Complete PDF (Free)
                </button>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'placements' && (
          <section className="bg-white rounded-2xl border border-[#e7eeff] p-5 sm:p-6 shadow-xs">
            <span className="text-xs font-semibold text-[#115eaf] tracking-wider uppercase">Career ROI</span>
            <h2 className="text-xl font-bold text-[#000f22] mt-0.5 mb-3">Amity University Online Placements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {PLACEMENT_STATS.map((s) => (
                <div key={s.label} className="bg-[#f9f9ff] p-4 rounded-xl border border-[#e7eeff] text-center">
                  <div className="text-2xl font-bold text-[#0b2540]">{s.value}</div>
                  <div className="text-xs text-[#74777e] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="text-xs font-semibold text-[#43474d] uppercase tracking-wider mb-2">
              Key Corporate Recruiters
            </div>
            <RecruiterScroll />
          </section>
        )}

        {/* Counselling CTA — non-overview tabs only (overview has sidebar form) */}
        {activeTab !== 'overview' && (
          <section className="bg-[#0b2540] text-white rounded-2xl border border-[#314865] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold mb-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  Advisory Desk 2026
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Get Free Academic Counselling</h2>
                <p className="text-sm text-[#b1c8eb] mt-1">
                  Speak with an advisor for eligibility, scholarships and admission guidance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  onClick={onOpenHelpDesk}
                  className="px-5 py-2.5 bg-white text-[#0b2540] rounded-xl text-sm font-semibold hover:bg-[#e7eeff] transition-all"
                >
                  Talk to Counsellor
                </button>
                <button
                  onClick={() => onOpenApply()}
                  className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-sm font-semibold hover:bg-[#004689] transition-all"
                >
                  Apply to Amity Online
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
