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
} from 'lucide-react'
import { profileData } from '../../data/profileData'
import { VerifiedBadge } from '../common/VerifiedBadge'
import { SpotlightAvatar } from '../common/SpotlightAvatar'
import { useVisitorCounter } from '../../hooks/useVisitorCounter'
import type { SectionId } from '../../types'

interface MobileNavProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
  theme: 'dark' | 'light'
  onToggleTheme: (event?: React.MouseEvent) => void
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const { formattedVisits } = useVisitorCounter()

  const navItems: { id: SectionId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'tech-stacks', label: 'Stacks', icon: Cpu },
    { id: 'book-call', label: 'Book', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  return (
    <>
      {/* Mobile Top Header: Pure Branding with Interactive Spotlight Avatar (Prominent Size & Permanently Sticky) */}
      <header className="lg:hidden shrink-0 sticky top-0 z-40 w-full bg-white/92 dark:bg-[#070d18]/95 backdrop-blur-2xl border-b border-slate-200/90 dark:border-slate-800/80 px-4 py-3 sm:py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <SpotlightAvatar
            sizeClassName="w-16 h-16 sm:w-18 sm:h-18"
            roundedClassName="rounded-2xl"
            spotlightRadius={32}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                {profileData.name}
              </span>
              <VerifiedBadge size="sm" />
              <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full text-[10px] border border-blue-500/20">
                BSIT
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {profileData.handle}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono text-emerald-500 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>{formattedVisits}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Dark / Light Mode Switcher with Circular Expansion */}
        <button
          onClick={(e) => onToggleTheme(e)}
          aria-label="Toggle theme"
          className="p-3 rounded-2xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:text-amber-500 transition-colors shadow-sm"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </header>

      {/* Mobile App Bottom Navigation Bar (iOS / Android Style) */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/92 dark:bg-[#070d18]/96 backdrop-blur-2xl border-t border-slate-200/90 dark:border-slate-800/80 px-2 py-1.5 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] safe-area-bottom"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-2xl transition-all duration-200 select-none ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {/* Active Pill Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-bottom-nav-active"
                    className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl border border-blue-500/25 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                <Icon
                  size={20}
                  className={`relative z-10 transition-transform ${
                    isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'scale-100'
                  }`}
                />

                <span
                  className={`relative z-10 text-[10px] tracking-tight mt-0.5 leading-none transition-all ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>

                {/* Micro Dot for Active State */}
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5 shadow-sm shadow-blue-500/50" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
