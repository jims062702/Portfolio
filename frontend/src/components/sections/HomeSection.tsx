import React, { useState } from 'react'
import {
  ArrowUpRight,
  ExternalLink,
  Code2,
  Layers,
  Award,
  CheckCircle2,
  Zap,
  FileText,
  Lock,
} from 'lucide-react'
import { profileData } from '../../data/profileData'
import { projectsData } from '../../data/projectsData'
import { DailyDriversTicker } from '../common/DailyDriversTicker'
import { ResumeModal } from '../common/ResumeModal'
import type { SectionId } from '../../types'

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  // Flagship projects for the interactive vertical scrolling KPI card
  const showcaseProjects = projectsData.slice(0, 4)
  const [isReelActive, setIsReelActive] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Top Banner Headline with Responsive Side-by-Side Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Hire & Freelance Projects</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {profileData.tagline}
          </h1>
          <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
            {profileData.subtagline}
          </p>
        </div>

        {/* Top Right Action Buttons: Resume / CV + Get in touch (Responsive layout) */}
        <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {/* Resume Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-all border border-slate-300/80 dark:border-slate-700 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText size={16} className="text-blue-500" />
            <span>Resume / CV</span>
          </button>

          {/* Get in touch Button */}
          <button
            onClick={() => onNavigate('contact')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in touch</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      {/* Daily Drivers Marquee Ticker */}
      <DailyDriversTicker />

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-1">
        {/* Featured Projects Showcase KPI Reel (Full-Width Flagship Card) */}
        {/* Infinite scroll triggers ONLY when cursor is directly hovering over the preview window, pauses in place on leave, resumes on hover */}
        <div className="lg:col-span-12 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/40 transition-all">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Code2 size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Featured Projects Showcase
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                    4 Live Flagship Apps
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Continuous conveyor stream: Project 1 through 4 in an uninterrupted infinite reel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
              >
                Explore All Projects <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Project Details & Smooth Vertical Preview Window */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-4">
            {/* Left side info (4 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-wide uppercase mb-2 border border-blue-500/20">
                  <Zap size={13} className="text-blue-500" />
                  <span>Interactive Live Stream</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                  Production Full-Stack &amp; Interactive UX
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Hover directly over the project window to activate continuous vertical scrolling. When your cursor leaves, it pauses right on that project and smoothly resumes when re-hovered.
                </p>
              </div>

              {/* Flagship KPI Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Query Latency</span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">&lt; 45ms</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Deployment Status</span>
                  <span className="text-sm font-extrabold text-emerald-500">100% Live</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Flagship Projects</span>
                  <span className="text-sm font-extrabold text-indigo-500">4 Architecture Builds</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Code Quality</span>
                  <span className="text-sm font-extrabold text-emerald-500">99.9% Uptime</span>
                </div>
              </div>

              {/* Action button */}
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore All Flagship Projects</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Right side: Auto-scrolling Vertical Preview Window (7 cols) */}
            {/* Native CSS animation: pauses in place on leave, resumes on hover; 4 projects seamlessly connected */}
            <div
              onMouseEnter={() => setIsReelActive(true)}
              onMouseLeave={() => setIsReelActive(false)}
              onClick={() => setIsReelActive(prev => !prev)}
              className="vertical-reel-container lg:col-span-7 relative h-72 sm:h-80 md:h-[370px] rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner group/window cursor-pointer"
            >
              {/* Clean Window Bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-20 flex items-center justify-between px-3.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider uppercase">
                  Flagship Projects Stream (Continuous Loop)
                </span>
                <ExternalLink size={12} className="text-slate-400" />
              </div>

              {/* Infinite Continuous Vertical Reel */}
              <div className="pt-8 w-full h-full overflow-hidden relative">
                {/* Gradient Top & Bottom Overlays for smooth edge blend */}
                <div className="absolute top-8 left-0 right-0 h-6 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />

                <div className={`vertical-infinite-reel flex flex-col w-full ${isReelActive ? 'is-running' : ''}`}>
                  {/* Group 1: Projects 1 through 4 */}
                  <div className="flex flex-col gap-3.5 pb-3.5 px-3.5 shrink-0">
                    {showcaseProjects.map((proj, idx) => (
                      <div
                        key={`g1-${proj.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate('projects')
                        }}
                        className="p-3 sm:p-3.5 rounded-xl bg-slate-900/95 hover:bg-slate-900 border border-slate-800/90 hover:border-blue-500/60 transition-all shadow-md shrink-0 flex flex-col gap-2.5 cursor-pointer group/card"
                      >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Project 0{idx + 1}
                            </span>
                            <h5 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[150px] sm:max-w-[200px] group-hover/card:text-blue-400 transition-colors">
                              {proj.title}
                            </h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                              {proj.category}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              {proj.kpi.value}
                            </span>
                          </div>
                        </div>

                        {/* Preview image */}
                        <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center">
                          <img
                            src={proj.previewImages[0]}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30 pointer-events-none"
                            aria-hidden="true"
                          />
                          <img
                            src={proj.previewImages[0]}
                            alt={proj.title}
                            className="relative z-10 w-full h-full object-contain group-hover/card:scale-102 transition-transform duration-300"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-10" />
                          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 z-20">
                            <span className="truncate max-w-[220px] font-medium text-slate-200">
                              {proj.tagline}
                            </span>
                          </div>
                        </div>

                        {/* Tech Stack Pills & Arrow */}
                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex flex-wrap gap-1">
                            {proj.techStack.slice(0, 3).map(tech => (
                              <span
                                key={tech}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/40"
                              >
                                {tech}
                              </span>
                            ))}
                            {proj.techStack.length > 3 && (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                +{proj.techStack.length - 3}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-blue-400 group-hover/card:text-blue-300 flex items-center gap-0.5">
                            <span>Inspect</span>
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Group 2: Exact duplicate of Projects 1 through 4 immediately connected right below Project 4 */}
                  <div className="flex flex-col gap-3.5 pb-3.5 px-3.5 shrink-0" aria-hidden="true">
                    {showcaseProjects.map((proj, idx) => (
                      <div
                        key={`g2-${proj.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate('projects')
                        }}
                        className="p-3 sm:p-3.5 rounded-xl bg-slate-900/95 hover:bg-slate-900 border border-slate-800/90 hover:border-blue-500/60 transition-all shadow-md shrink-0 flex flex-col gap-2.5 cursor-pointer group/card"
                      >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Project 0{idx + 1}
                            </span>
                            <h5 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[150px] sm:max-w-[200px] group-hover/card:text-blue-400 transition-colors">
                              {proj.title}
                            </h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                              {proj.category}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              {proj.kpi.value}
                            </span>
                          </div>
                        </div>

                        {/* Preview image */}
                        <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center">
                          <img
                            src={proj.previewImages[0]}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30 pointer-events-none"
                            aria-hidden="true"
                          />
                          <img
                            src={proj.previewImages[0]}
                            alt={proj.title}
                            className="relative z-10 w-full h-full object-contain group-hover/card:scale-102 transition-transform duration-300"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-10" />
                          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 z-20">
                            <span className="truncate max-w-[220px] font-medium text-slate-200">
                              {proj.tagline}
                            </span>
                          </div>
                        </div>

                        {/* Tech Stack Pills & Arrow */}
                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex flex-wrap gap-1">
                            {proj.techStack.slice(0, 3).map(tech => (
                              <span
                                key={tech}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/40"
                              >
                                {tech}
                              </span>
                            ))}
                            {proj.techStack.length > 3 && (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                +{proj.techStack.length - 3}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-blue-400 group-hover/card:text-blue-300 flex items-center gap-0.5">
                            <span>Inspect</span>
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Credentials Teaser (COMING SOON) */}
        <div
          onClick={() => onNavigate('about')}
          className="lg:col-span-4 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Award size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Credentials</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-500">Under official verification</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="my-5 flex items-center justify-center">
            <div className="relative w-28 h-28 rounded-full border-4 border-amber-500/20 dark:border-amber-500/30 flex items-center justify-center p-2 bg-gradient-to-b from-amber-500/5 to-transparent">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center text-center p-1">
                <Lock size={22} className="text-amber-500 mb-0.5" />
                <span className="text-[10px] font-bold tracking-tight text-slate-800 dark:text-slate-200 uppercase">
                  Accredited
                </span>
                <span className="text-[8px] font-mono text-amber-500">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
            <span className="text-xs text-slate-500">Industry Certifications</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Details ↗
            </span>
          </div>
        </div>

        {/* Card 4: Services & Capabilities (4 cols on desktop) */}
        <div
          onClick={() => onNavigate('tech-stacks')}
          className="lg:col-span-4 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Services</h4>
                <p className="text-xs text-slate-500">Full-Stack & Frontend</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="my-3 flex flex-col gap-2">
            {[
              { label: 'High-Performance Web Apps', id: '01' },
              { label: 'Responsive React & Next.js Frontends', id: '02' },
              { label: 'RESTful & GraphQL Backend APIs', id: '03' },
              { label: 'UI/UX Design Systems & Motion', id: '04' },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-blue-500 shrink-0" />
                  <span className="truncate">{srv.label}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{srv.id}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
            <span className="text-xs text-slate-500">Tailored Client Solutions</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Tech Specs ↗
            </span>
          </div>
        </div>

        {/* Card 5: Performance & Quick Stats KPI (4 cols on desktop) */}
        <div
          onClick={() => onNavigate('book-call')}
          className="lg:col-span-4 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">KPI Highlights</h4>
                <p className="text-xs text-slate-500">Fast, Reliable, Scalable</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            {profileData.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-center flex flex-col items-center justify-center"
              >
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {st.value}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {st.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
            <span className="text-xs text-slate-500">Ready to build your next app?</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Schedule Call ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
