import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Award,
  ShieldCheck,
  Clock,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { profileData, calculateAge } from '../../data/profileData'
import { VerifiedBadge } from '../common/VerifiedBadge'

export const AboutSection: React.FC = () => {
  const currentAge = calculateAge(profileData.birthDate)

  // Carousel images for the left-side showcase
  const carouselImages = [
    {
      src: '/images/about-me-1.jpg',
      alt: 'James Gasang defending Capstone Project at Tagoloan Community College',
      caption: 'Tagoloan Community College • Capstone Back-End Developer',
      subcaption: 'Bachelor of Science in Information Technology (BSIT)',
    },
    {
      src: '/images/about-me-2.jpg',
      alt: 'James Gasang campus environment',
      caption: 'James Gasang • Software Engineering & Innovation',
      subcaption: 'Full Stack AI Developer & UI/UX Engineer',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Automatic carousel cycling every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isHovered, carouselImages.length])

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % carouselImages.length)
  }

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto pb-16">
      {/* Section Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Architecting Modern Full-Stack &amp; AI Web Experiences
        </h1>
        
      </div>

      {/* Unified Master Bio Card: Full-Height Photo Carousel on Left + Rich Narrative on Right inside ONE Container */}
      <div className="relative overflow-hidden bg-white/80 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-7 lg:p-9 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Full-Height Edge-to-Edge Photo Carousel (5 cols on desktop) */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-5 relative w-full h-full min-h-[520px] sm:min-h-[580px] lg:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-lg border border-slate-200/70 dark:border-slate-800 group select-none flex flex-col justify-between"
          >
            {/* Full-Height Background Image Transition */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={carouselImages[currentIndex].src}
                alt={carouselImages[currentIndex].alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
              />
            </AnimatePresence>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 pointer-events-none" />

            {/* Floating Top Pill Overlay */}
            <div className="relative z-10 m-3.5 sm:m-4 px-3.5 py-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wide">
                  James Gasang
                </span>
                <VerifiedBadge size="sm" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/80 text-white font-bold border border-blue-400/40 shadow-xs">
                BSIT • 4th Year
              </span>
            </div>

            {/* Prev / Next Interactive Navigation Arrows */}
            <div className="absolute inset-y-0 left-2.5 z-20 flex items-center">
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110 opacity-70 group-hover:opacity-100 shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2.5 z-20 flex items-center">
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110 opacity-70 group-hover:opacity-100 shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Floating Bottom Info & Indicator Dots Overlay */}
            <div className="relative z-10 m-3.5 sm:m-4 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-blue-600 text-white shadow-xs">
                  Photo 0{currentIndex + 1} of 0{carouselImages.length}
                </span>
                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? 'w-6 bg-blue-400'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-white drop-shadow-sm leading-snug">
                  {carouselImages[currentIndex].caption}
                </h4>
                <p className="text-xs text-slate-300 drop-shadow-sm mt-0.5">
                  {carouselImages[currentIndex].subcaption}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Paragraph & Identity Badges (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 py-1">
            {/* Header Row */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800/70">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                    Biographical Profile
                  </span>
                  
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Full Stack AI Developer &amp; UI/UX Engineer</span>
                </div>
              </div>

              {/* Narrative Paragraph */}
              <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  Hello! I am <strong className="text-slate-900 dark:text-white font-semibold">James Gasang</strong>, a <strong className="text-slate-900 dark:text-white font-semibold">{currentAge}-year-old</strong> developer born on <strong className="text-slate-900 dark:text-white font-semibold">June 27, 2002</strong>, based in the <strong className="text-slate-900 dark:text-white font-semibold">Philippines</strong> and collaborating with clients and teams worldwide on a remote basis.
                </p>
                <p>
                  Currently in my <strong className="text-slate-900 dark:text-white font-semibold">4th year pursuing a Bachelor of Science in Information Technology (BSIT)</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Tagoloan Community College</strong>, I have served as the <strong className="text-blue-600 dark:text-blue-400 font-semibold">Lead Back-End &amp; Full-Stack Developer</strong> across multiple institutional capstone projects and production-grade web systems.
                </p>
                <p>
                  Over the past <strong className="text-slate-900 dark:text-white font-semibold">3+ years of intense coding and architecture</strong>, I have focused on fusing modern frontend engineering with resilient backend distributed infrastructures. My stack encompasses <strong className="text-slate-900 dark:text-white font-semibold">React 19, TypeScript, Next.js, Tailwind CSS, and Framer Motion</strong> for responsive 60fps user experiences, synchronized with <strong className="text-slate-900 dark:text-white font-semibold">Node.js, Express, PostgreSQL, Prisma, Docker, and Cloud ecosystems</strong> on the server side.
                </p>
                <p>
                  Beyond standard web development, I actively specialize in <strong className="text-blue-600 dark:text-blue-400 font-semibold">AI integration and modern interactive agents</strong>—crafting tailored contextual assistants (such as Javion AI), automating complex workflows, and elevating traditional user interfaces into predictive, intelligent web products.
                </p>
              </div>

              {/* Identity Badges / Key Attributes Matrix */}
              <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/70">
                
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/80">
                  <MapPin size={13} className="text-rose-500" />
                  <span>Philippines • Worldwide Remote</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200/70 dark:border-blue-900/60">
                  <Terminal size={13} />
                  <span>Tagoloan Community College</span>
                </span>
                
              </div>
            </div>

            {/* Work Philosophy Card */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Core Engineering Philosophy</span>
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Great software balances technical elegance with user empathy. Every millisecond of latency saved, every resilient database transaction, and every subtle 60fps animation adds up to an unforgettable digital product."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates & Industry Credentials Section: COMING SOON */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Award size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Certificates &amp; Industry Credentials
                </h2>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Verified accreditations, certifications, and technical badges
              </p>
            </div>
          </div>
        </div>

        {/* Sleek Coming Soon Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-[#0c1527]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-sm">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          {/* Luminous Credential Seal */}
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-blue-500/20 to-indigo-500/20 border-2 border-amber-500/30 flex items-center justify-center shadow-lg">
              <Lock size={32} className="text-amber-500" />
            </div>
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-blue-600 text-white shadow-md">
              <ShieldCheck size={16} />
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Credentials Showcase is Coming Soon
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Official certification badges and credential verification IDs from Meta, AWS, Google, and IBM are currently undergoing catalog verification and will be published here soon.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
              <Clock size={13} className="text-amber-500" />
              <span>Under Verification</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/50">
              <ShieldCheck size={13} />
              <span>Accredited Modules</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
