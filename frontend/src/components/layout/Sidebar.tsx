import React from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  User,
  LayoutGrid,
  Cpu,
  Calendar,
  Mail,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'
import { FacebookIcon, LinkedInIcon, GitHubIcon } from '../common/SocialIcons'
import { profileData } from '../../data/profileData'
import { VerifiedBadge } from '../common/VerifiedBadge'
import { SpotlightAvatar } from '../common/SpotlightAvatar'
import { useVisitorCounter } from '../../hooks/useVisitorCounter'
import type { SectionId } from '../../types'

interface SidebarProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
  theme: 'dark' | 'light'
  onToggleTheme: (event?: React.MouseEvent) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { formattedVisits } = useVisitorCounter()

  const navItems: { id: SectionId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About me', icon: User },
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'tech-stacks', label: 'Tech stacks', icon: Cpu },
    { id: 'book-call', label: 'Book a Call', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 h-screen sticky top-0 z-40 transition-all duration-300 select-none ${
        isCollapsed ? 'w-24 px-3' : 'w-80 px-6'
      } py-6 bg-white/85 dark:bg-[#070d18]/90 backdrop-blur-xl border-r border-slate-200/90 dark:border-slate-800/80 shadow-lg justify-between overflow-y-auto`}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center w-full">
        {/* Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="self-end mb-1 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}

        {/* Profile Image with Spotlight Lens Reveal */}
        <div className="relative group mt-1">
          {/* Outer Ambient Glow Ring */}
          <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 opacity-25 group-hover:opacity-70 blur-md transition-opacity duration-500 pointer-events-none" />

          <SpotlightAvatar
            sizeClassName={isCollapsed ? 'w-16 h-16' : 'w-44 h-44'}
            roundedClassName="rounded-[28px]"
            spotlightRadius={isCollapsed ? 32 : 56}
          />
        </div>

        {/* Name, Verification Badge & BSIT Degree Badge */}
        {!isCollapsed && (
          <div className="mt-4 text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 justify-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {profileData.name}
              </h2>
              <VerifiedBadge size="md" />
            </div>

            {/* BSIT Academic Badge */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-semibold shadow-xs">
              <GraduationCap size={13} className="text-blue-500" />
              <span>BSIT • 4th Year</span>
            </div>

            {/* Handle & Live Analytics Counter: @jdev • [Total Visits Counter] */}
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                {profileData.handle}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-700 dark:text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {formattedVisits}
              </span>
            </div>
          </div>
        )}

        {/* Social Links & Theme Toggle */}
        <div
          className={`flex items-center gap-2 mt-4 pb-2 ${
            isCollapsed ? 'flex-col' : 'justify-center w-full'
          }`}
        >
          {/* Facebook */}
          <a
            href={profileData.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Profile"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <FacebookIcon size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <LinkedInIcon size={18} />
          </a>

          {/* GitHub */}
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <GitHubIcon size={18} />
          </a>

          {/* Dark / Light Mode Toggle with Circular Ripple Expansion */}
          <button
            onClick={(e) => onToggleTheme(e)}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full my-3 border-t border-slate-200/90 dark:border-slate-800/80" />

        {/* Navigation Items */}
        <nav className="w-full flex flex-col gap-1.5">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={item.label}
                className={`relative flex items-center gap-3.5 w-full px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                {/* Active Indicator Accent on Left */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 dark:bg-blue-500 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <Icon
                  size={19}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />

                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {/* Subtle active dot */}
                {isActive && !isCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500/50" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      {!isCollapsed && (
        <div className="w-full pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f172a]/70 border border-slate-200/60 dark:border-slate-800/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Open to Opportunities
            </span>
          </div>
          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} James Gasang. All rights reserved.
          </p>
        </div>
      )}
    </aside>
  )
}
