import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Maximize2,
} from 'lucide-react'
import { GitHubIcon } from '../common/SocialIcons'
import { getTechBrandIcon } from '../common/TechBrandIcons'
import { projectsData } from '../../data/projectsData'
import type { ProjectItem } from '../../types'

interface ProjectCardProps {
  project: ProjectItem
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Infinite sliding preview loop triggers ONLY when cursor is on the preview window
  // Pauses on leave at current image, resumes smoothly on next hover
  useEffect(() => {
    if (!isHovered || isLightboxOpen || project.previewImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.previewImages.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [isHovered, isLightboxOpen, project.previewImages.length])

  // Keyboard navigation when Lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev =>
          prev === 0 ? project.previewImages.length - 1 : prev - 1
        )
      }
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => (prev + 1) % project.previewImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, project.previewImages.length])

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(prev =>
      prev === 0 ? project.previewImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => (prev + 1) % project.previewImages.length)
  }

  return (
    <div className="bg-white/80 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-7 shadow-sm hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 w-full group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Generous Interactive Carousel Preview Window (6 cols on desktop for wider, uncropped view) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-800 bg-slate-950 cursor-pointer shadow-inner group/preview transition-all"
          >
            {/* Window Titlebar */}
            <div className="absolute top-0 left-0 right-0 h-7 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-20 flex items-center justify-between px-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                {project.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">
                  {currentImageIndex + 1} / {project.previewImages.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLightboxOpen(true)
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="View full screenshot"
                >
                  <Maximize2 size={12} />
                </button>
              </div>
            </div>

            {/* Sliding Image Preview with 100% Uncropped Full-Frame View */}
            <div className="pt-7 w-full h-full relative overflow-hidden flex items-center justify-center bg-slate-950">
              {/* Ambient Blurred Backdrop to smoothly fill any frame borders with image-colored tones */}
              <img
                src={project.previewImages[currentImageIndex]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.previewImages[currentImageIndex]}
                  alt={`${project.title} Preview ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative z-10 w-full h-full object-contain select-none drop-shadow-md"
                />
              </AnimatePresence>

              {/* Click to expand pill on hover */}
              <div className="absolute top-9 right-3 z-20 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono font-semibold text-slate-200 border border-white/20 shadow-lg">
                  <Maximize2 size={10} />
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>

            {/* Carousel Arrows on Hover */}
            <div
              className={`absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none transition-opacity duration-200 z-20 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                onClick={handlePrevImage}
                aria-label="Previous preview"
                className="pointer-events-auto p-2 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors shadow-md"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Next preview"
                className="pointer-events-auto p-2 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors shadow-md"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full z-20">
              {project.previewImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImageIndex === idx
                      ? 'w-4 bg-blue-500'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comprehensive Project Information & Authentic Brand Tech Stack (6 cols on desktop) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div>
            {/* Meta Row: Project Index, Category, KPI Badge, Live Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Project 0{index + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                  <Zap size={13} className="text-emerald-500" />
                  <span>{project.kpi.label}: {project.kpi.value}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={12} className="text-blue-500" />
                  <span>Verified</span>
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mt-3.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                {project.tagline}
              </p>
              {/* Full Detailed Description (No cutting off / line-clamp-2) */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Technologies Used (OFFICIAL BRAND SVG ICON + NAME) */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                Tech Stack Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:border-blue-500/50 transition-all"
                  >
                    <span className="shrink-0 flex items-center justify-center">
                      {getTechBrandIcon(tech, 16)}
                    </span>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links & Key Performance Stat */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{project.stats}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* GitHub Repo (Only rendered if public repository exists) */}
              {project.githubUrl && project.githubUrl !== '#' ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
                >
                  <GitHubIcon size={15} />
                  <span>Source Code</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 font-medium text-xs border border-slate-200/60 dark:border-slate-700/60">
                  <Lock size={13} className="text-slate-400" />
                  <span>Private Vault</span>
                </span>
              )}

              {/* Live Preview Button */}
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-20 pb-3 border-b border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Project 0{index + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                • Screenshot 0{currentImageIndex + 1} of 0{project.previewImages.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25"
              >
                <span>Open Live Demo</span>
                <ExternalLink size={13} />
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close fullscreen view"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage: 100% Crisp & Uncropped */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 sm:my-4 w-full max-w-6xl mx-auto overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Prev / Next Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={project.previewImages[currentImageIndex]}
              alt={`${project.title} Full Screenshot ${currentImageIndex + 1}`}
              className="max-h-[72vh] sm:max-h-[78vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
            />

            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Lightbox Bottom Thumbnails & Controls */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-6xl mx-auto pt-2.5 border-t border-white/10 z-20"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 custom-scrollbar">
              {project.previewImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    currentImageIndex === idx
                      ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/30'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline">Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[10px]">ESC</kbd> to close, arrow keys to navigate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))]

  // Filter projects by category and search term
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter =
      activeFilter === 'All' || project.category === activeFilter

    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Featured Projects &amp; Applications
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Spacious individual project showcases with verified tech stack architectures, live KPI telemetry, and full engineering details.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/80 dark:bg-[#0c1527]/85 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs ${
              activeFilter === category
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                : 'bg-white/80 dark:bg-[#0c1527]/85 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 1 Project Per Line Layout (Single-Column Showcase with Full Information) */}
      <div className="flex flex-col gap-6 w-full">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white/60 dark:bg-[#0c1527]/60 border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No projects match your search criteria.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All')
                setSearchQuery('')
              }}
              className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
