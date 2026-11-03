import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  Printer,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  MapPin,
} from 'lucide-react'
import { profileData } from '../../data/profileData'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const resumeText = `JAMES GASANG - RESUME / CURRICULUM VITAE
Full-Stack Developer & UI/UX Engineer
Location: ${profileData.location}
Status: ${profileData.academicStatus}

SUMMARY:
Passionate 4th-year IT student and Full-Stack Frontend Engineer with 3+ years of experience architecting high-performance web applications using React, TypeScript, Next.js, Node.js, and cloud ecosystems.

CORE COMPETENCIES:
- Frontend: React 19, TypeScript, Next.js, Tailwind CSS, Framer Motion, Vite
- Backend: Node.js, Express, PostgreSQL, Prisma ORM, REST & GraphQL
- Tools: Docker, Git & GitHub, Figma, VS Code, Linux/Bash

PROJECT HIGHLIGHTS:
- ApexFlow Cloud ERP: Real-time analytics, RBAC, Sub-45ms query latency
- Pulse AI Studio: LLM canvas, streaming markdown, token telemetry
- Nexus Commerce Hub: High-velocity headless store with 99/100 Lighthouse score

CERTIFICATIONS:
- Meta Front-End Developer Professional Certificate (Meta & Coursera)
- AWS Certified Cloud Practitioner (Amazon Web Services)
- Google Cybersecurity & IT Automation Certificate (Google)
- IBM Full-Stack Software Developer Specialization (IBM)`

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'James_Gasang_Resume.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            {/* Header Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  CV
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    James Gasang — Curriculum Vitae
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Updated 2026 • Verified Document
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  title="Download Resume"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
                <button
                  onClick={handlePrint}
                  title="Print Resume"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Document Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
              {/* Header Info */}
              <div className="pb-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {profileData.role}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-rose-500" />
                      {profileData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap size={13} className="text-emerald-500" />
                      {profileData.academicStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    🟢 Available for Hire
                  </span>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-blue-500" />
                  <span>Professional Summary</span>
                </h4>
                <p className="leading-relaxed">
                  Passionate 4th-year BSIT undergraduate and Full Stack AI Developer & UI/UX Engineer with 3+ years of experience building scalable, production-ready web platforms. Specialized in React, TypeScript, Next.js, AI integrations, and modern UI engineering with rigorous performance optimization and accessible design systems.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-emerald-500" />
                  <span>Education</span>
                </h4>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">
                        Bachelor of Science in Information Technology (BSIT)
                      </h5>
                      <p className="text-slate-500 text-[11px]">Tagoloan Community College • Major in Web Systems & Software Engineering</p>
                    </div>
                    <span className="font-mono text-[11px] text-blue-500 font-semibold">
                      2022 — Present (4th Year)
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
                    Lead Back-End & Full-Stack Developer for Institutional Capstone Initiatives
                  </p>
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <Code2 size={14} className="text-purple-500" />
                  <span>Technical Arsenal</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Frontend</span>
                    <span className="text-[11px] text-slate-500 leading-snug">
                      React 19, TypeScript, Next.js, Tailwind CSS, Framer Motion, Vite, Zustand
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Backend</span>
                    <span className="text-[11px] text-slate-500 leading-snug">
                      Node.js, Express, PostgreSQL, Prisma ORM, REST APIs, GraphQL
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Tools & Cloud</span>
                    <span className="text-[11px] text-slate-500 leading-snug">
                      Docker, Git/GitHub, Linux/Bash, AWS Cloud, Vercel, Supabase, Figma
                    </span>
                  </div>
                </div>
              </div>

              {/* Certifications Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-500" />
                  <span>Featured Industry Certifications</span>
                </h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <strong>Meta:</strong> Front-End Developer Professional Certificate (Coursera)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <strong>AWS:</strong> AWS Certified Cloud Practitioner
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <strong>Google:</strong> Cybersecurity & IT Automation Certificate
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
