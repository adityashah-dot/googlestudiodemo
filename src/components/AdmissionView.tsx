import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import { 
  CheckCircle, 
  ChevronRight, 
  Download, 
  Clock, 
  Calendar, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  PhoneCall, 
  ArrowRight,
  Award,
  Laptop
} from 'lucide-react';

interface AdmissionViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
  onOpenEmi: () => void;
  universityNavigation?: React.ReactNode;
}

export const AdmissionView: React.FC<AdmissionViewProps> = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  onOpenEmi,
  universityNavigation
}) => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackCourse, setCallbackCourse] = useState('mba');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [showAllEligibility, setShowAllEligibility] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
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
            <span className="text-[#000f22] font-bold">Admission 2026</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* HERO SECTION & SESSION CLOSING ALERT BENTO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="overview">
          {/* Left Column: Authority & Program Details */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e7eeff] p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="space-y-4">
              {/* Verification Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f3ff] text-xs text-[#115eaf] font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-[#115eaf]" />
                  UGC-DEB Entitled Program
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-[#D97706]" />
                  NAAC A++ Graded University
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e7eeff] text-[#000f22] text-xs font-normal">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  WES Recognized Worldwide
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#000f22] tracking-tight font-sans">
                LPU Online Admission Process 2026
              </h1>

              <p className="text-sm sm:text-base text-[#43474d] max-w-2xl leading-relaxed">
                {DEGREEFYD_LPU_API.admissionProcess.intro}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenApply()}
                  className="bg-[#115eaf] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#004689] active:scale-95 transition-all shadow flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Start Online Application</span>
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="bg-white border border-[#0b2540] text-[#0b2540] px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#f0f3ff] transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#115eaf]" />
                  <span>Download Admission Guide</span>
                </button>
                <button
                  onClick={onOpenEmi}
                  className="bg-[#f0f3ff] text-[#115eaf] px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#e7eeff] transition-all flex items-center gap-1"
                >
                  <span>Check No-Cost EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Institutional Trust Indicator Strip */}
            <div className="pt-6 mt-6 border-t border-[#e7eeff] flex flex-wrap items-center justify-between gap-4 text-xs text-[#43474d]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                <span>NIRF Rank #31 Among Top Universities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                <span>AICTE Approved MCA & MBA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                <span>100% Online Exam Proctoring</span>
              </div>
            </div>
          </div>

          {/* Right Column: Urgent Notice Session Closing Card */}
          <div className="lg:col-span-4 bg-[#0b2540] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#115eaf]/30 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold tracking-wide uppercase">
                <Clock className="w-3.5 h-3.5" />
                <span>Session Closing Soon</span>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-bold text-white font-sans">
                  Spring 2026 Batch Enrollment
                </h2>
                <p className="text-xs text-[#b1c8eb] mt-[7.5px] leading-relaxed">
                  Admissions for the Spring 2026 intake are currently open. Complete your online registration and document submission early to secure your early bird tuition grant.
                </p>
              </div>

              {/* Schedule Highlights Box */}
              <div className="my-5 bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#b1c8eb]">Registration Deadline:</span>
                  <span className="font-bold text-white">31st March 2026 (Ongoing)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#b1c8eb]">Grant Eligibility:</span>
                  <span className="font-bold text-[#ffdcc3]">Up to 20% Early Bird Grant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#b1c8eb]">LMS Seat Allocation:</span>
                  <span className="font-bold text-emerald-400">Within 24 Hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onOpenApply()}
                className="w-full bg-[#115eaf] text-white hover:bg-[#004689] transition-all py-3 rounded-xl text-center text-xs sm:text-sm font-bold block shadow active:scale-95"
              >
                Reserve My Seat Today
              </button>
              <p className="text-[11px] text-center text-[#768dad]">
                100% government-recognized degree valid for jobs & higher studies
              </p>
            </div>
          </div>
        </section>

        {universityNavigation}

        {/* ADMISSION HIGHLIGHTS METRIC RIBBON (4 Columns) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e7eeff] p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#115eaf] shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#74777e] block uppercase tracking-wider font-normal">Program Mode</span>
              <span className="text-base font-bold text-[#000f22] font-sans">100% Online</span>
            </div>
          </div>

          <div className="bg-white border border-[#e7eeff] p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#115eaf] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#74777e] block uppercase tracking-wider font-normal">Selection</span>
              <span className="text-base font-bold text-[#000f22] font-sans">Merit-Based</span>
            </div>
          </div>

          <div className="bg-white border border-[#e7eeff] p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#115eaf] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#74777e] block uppercase tracking-wider font-normal">Entrance Test</span>
              <span className="text-base font-bold text-[#000f22] font-sans">Exempt / Merit</span>
            </div>
          </div>

          <div className="bg-white border border-[#e7eeff] p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#115eaf] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#74777e] block uppercase tracking-wider font-normal">Reg Fee</span>
              <span className="text-base font-bold text-[#000f22] font-sans">₹600 Only</span>
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP ADMISSION PROCESS 2026 (From API: Section 4) */}
        <section className="page-section">
          <div className="text-left max-w-3xl">
            <span className="text-xs font-bold text-[#115eaf] uppercase tracking-wider block">
              Official Admission Flow
            </span>
            <h2 className="section-title text-2xl sm:text-3xl font-semibold text-[#000f22] font-sans">
              Step-by-step admission process 2026
            </h2>
            <p className="section-description text-xs sm:text-sm text-[#43474d]">
              Check the below step-by-step Lovely Professional University Online admission process 2026:
            </p>
          </div>

          <div className="relative mt-[18px]">
            <div className="hidden md:block absolute top-[28px] left-10 right-10 h-[2px] bg-gradient-to-r from-[#e7eeff] via-[#115eaf]/30 to-[#e7eeff]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {DEGREEFYD_LPU_API.admissionProcess.steps.map((st, i, arr) => (
                <div key={st.stepNum} className="relative group">
                  <div className="bg-white border border-[#e7eeff] p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#115eaf] transition-all h-full z-10 relative group-hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#115eaf] to-[#004689] opacity-0 group-hover:opacity-100 rounded-t-2xl transition-opacity" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-full bg-[#f0f3ff] text-[#115eaf] font-extrabold text-lg flex items-center justify-center shadow-sm group-hover:bg-[#115eaf] group-hover:text-white transition-colors border-[4px] border-white ring-1 ring-[#e7eeff] group-hover:ring-[#115eaf]/50">
                        0{st.stepNum}
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-[15px] text-[#000f22] font-sans mb-2 group-hover:text-[#115eaf] transition-colors">{st.title}</h3>
                    <p className="mt-[7.5px] text-xs sm:text-sm text-[#43474d] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block absolute top-[22px] -right-[15px] z-20 text-[#115eaf]/40">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY & SELECTION CRITERIA TABLE (From API: Section 3) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-[#e7eeff] pb-4">
            <div className="text-left">
              <span className="text-xs font-bold text-[#115eaf] uppercase tracking-wider block">Admission Criteria</span>
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                LPU Online Eligibility and Selection Criteria
              </h2>
            </div>
            <button
              onClick={onOpenHelpDesk}
              className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1"
            >
              <span>Need Free Eligibility Assessment?</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            Lovely Professional University provides a range of online undergraduate and postgraduate programs. The eligibility criteria depend on the course level, and admission is generally based on academic qualifications and document verification. To be eligible for admission, candidates are required to fill out the online application form, upload the required documents, and pay the program fee. Check the below table for LPU online eligibility and selection criteria:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0b2540] text-white">
                  <th className="py-3 px-4 font-bold">Course</th>
                  <th className="py-3 px-4 font-bold">Eligibility</th>
                  <th className="py-3 px-4 font-bold">Selection Process</th>
                  <th className="py-3 px-4 font-bold text-right">Tuition Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {(showAllEligibility
                  ? DEGREEFYD_LPU_API.eligibilityMatrix
                  : DEGREEFYD_LPU_API.eligibilityMatrix.slice(0, 4)
                ).map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22]">
                      {item.course}
                      <span className="block text-[11px] font-normal text-[#74777e]">{item.duration}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d] max-w-xs">{item.eligibility}</td>
                    <td className="py-3.5 px-4 text-[#115eaf] font-normal">{item.selection}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#000f22]">
                      {item.feeSem} <span className="text-[11px] font-normal text-[#74777e]">/sem</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {DEGREEFYD_LPU_API.eligibilityMatrix.length > 4 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllEligibility(!showAllEligibility)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#115eaf] hover:underline"
              >
                {showAllEligibility
                  ? 'Show Less'
                  : `Show All ${DEGREEFYD_LPU_API.eligibilityMatrix.length} Programs`}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllEligibility ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </section>

        {/* IMPORTANT DATES TABLE (From API: Section 11) */}
<section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-[#e7eeff]">
            <div>
              <span className="text-xs font-bold text-[#115eaf] uppercase tracking-wider block">Important Dates</span>
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                LPU Online Admission 2026 Dates
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#43474d]">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Intake 2026 Active</span>
            </div>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            Lovely Professional University releases admission dates for its online programs on the official website. Students must complete the application before the deadline and submit required documents such as DEB ID and academic certificates during admission. Check the table below for LPU admission dates:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f0f3ff] text-[#000f22] font-bold">
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Event</th>
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Important Date</th>
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {DEGREEFYD_LPU_API.importantDates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#115eaf]" />
                      <span>{item.event}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d]">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-[#d5e3ff] text-[#004689]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
<p className="text-xs text-[#74777e] italic mt-[18px]">
            Note: Dates are tentative and may be updated by the university. Please refer to the official website or speak to a counselor for the latest information.
          </p>
        </section>

        {/* SCHOLARSHIPS (From API) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div>
            <span className="text-xs font-bold text-[#115eaf] uppercase tracking-wider block">Fee Support</span>
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              LPU Online Scholarships
            </h2>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            {DEGREEFYD_LPU_API.scholarships.description}
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0b2540] text-white">
                  <th className="py-3 px-4 font-bold">Scholarship / Benefit</th>
                  <th className="py-3 px-4 font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {DEGREEFYD_LPU_API.scholarships.items.map((s, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22] align-top">
                      {s.title}
                      <span className="block mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-normal bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]">
                        {s.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d] leading-relaxed">{s.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#74777e] italic mt-[18px]">
            Note: {DEGREEFYD_LPU_API.scholarships.note}
          </p>
        </section>

        {/* EXAMINATION PATTERN (From API) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div>
            <span className="text-xs font-bold text-[#115eaf] uppercase tracking-wider block">Evaluation</span>
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              LPU Online Examination Pattern
            </h2>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            {DEGREEFYD_LPU_API.examinationPattern.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[18px]">
            {DEGREEFYD_LPU_API.examinationPattern.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#115eaf] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-xs text-[#000f22]">{step.title}</h3>
                  <p className="text-[11px] text-[#43474d] leading-relaxed mt-[7.5px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTS REQUIRED & DEB ID */}
        <section className="page-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="card lg:col-span-4 bg-[#0b2540] text-white rounded-2xl shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#b1c8eb] uppercase tracking-wider block">
              Verification Guide
            </span>
            <h2 className="section-title text-xl sm:text-2xl font-bold font-sans">
              Essential Documents for Digital Scrutiny
            </h2>
            <p className="section-description text-xs text-[#b1c8eb] leading-relaxed">
              Ensure all uploaded documents are colored scanned copies of original certificates in PDF or JPEG format (under 5MB).
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#ffdcc3] font-bold">
                <CheckCircle className="w-4 h-4 text-[#ffdcc3]" />
                <span>Is DEB ID Required for LPU Online Admission?</span>
              </div>
              <p className="text-[11px] text-[#b1c8eb]">
                Yes, DEB ID is required for LPU Online admission. The DEB ID (Distance Education Bureau ID) is a unique ID required for students applying to UGC-approved online and distance learning programs in India.
              </p>
            </div>
          </div>

          <div className="card lg:col-span-8 bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    10th Marksheet & Certificate
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">Proof of Date of Birth and Parent's names validation.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    12th Class Marksheet
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">From CBSE, ICSE, or recognized State Education Board for UG.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    Graduation Degree / Marksheets
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdcc3] text-[#6e3900]">For PG Tracks</span>
                </div>
                <p className="text-[#74777e]">All semester marksheets + provisional/original degree certificate.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    Valid Government Photo ID
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">Aadhaar Card, Passport, Voter ID, or Driving License scan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INSTANT COUNSELING CALLBACK BANNER */}
        <section className="page-section card bg-[#0b2540] text-white rounded-2xl border border-[#314865] relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#115eaf] text-white text-xs font-bold uppercase tracking-wide">
                <PhoneCall className="w-3.5 h-3.5" />
                1-on-1 Academic Counseling
              </span>
              <h2 className="section-title text-2xl sm:text-3xl font-extrabold font-sans">
                Have Questions About Document Eligibility or Grants?
              </h2>
              <p className="section-description text-xs sm:text-sm text-[#b1c8eb] max-w-2xl leading-relaxed">
                Speak directly with Online Siksha university counselors for transcript pre-screening, scholarship estimation, and instant enrollment support.
              </p>
            </div>

            {/* Quick Callback Form */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl text-[#000f22] shadow-lg space-y-3">
              <h3 className="font-bold text-sm text-[#000f22] font-sans">Request Instant Callback</h3>
              {!callbackSubmitted ? (
                <form onSubmit={handleCallbackSubmit} className="space-y-2.5 text-xs">
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="Mobile Number (+91)"
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  />
                  <select
                    value={callbackCourse}
                    onChange={(e) => setCallbackCourse(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  >
                    {COURSES_DATA.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-[#115eaf] text-white h-10 rounded-xl font-bold hover:bg-[#004689] active:scale-95 transition-all shadow flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Talk to Expert Counselor</span>
                  </button>
                  <span className="text-[10px] text-[#74777e] text-center block">
                    Average response time: &lt; 15 minutes
                  </span>
                </form>
              ) : (
                <div className="py-4 text-center space-y-2 text-xs">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <span className="font-bold text-[#000f22] block">Callback Requested!</span>
                  <p className="text-[#43474d]">
                    We will call you at +91 {callbackPhone} shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
