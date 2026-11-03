import React from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../../data/profileData'
import { getTechBrandIcon } from './TechBrandIcons'

export const DailyDriversTicker: React.FC = () => {
  const drivers = [...profileData.dailyDrivers, ...profileData.dailyDrivers]

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/70 dark:bg-[#0c1527]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-2.5 sm:px-4 shadow-sm overflow-hidden">
      {/* Label Box */}
      <div className="shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-200/80 dark:border-slate-800/80 pb-2 sm:pb-0 sm:pr-4">
        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
          DAILY DRIVERS
        </span>
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Tools I work with
        </span>
      </div>

      {/* Marquee Wrapper with Authentic Brand Icons */}
      <div className="relative flex-1 overflow-hidden py-1 mask-linear">
        <motion.div
          className="flex items-center gap-3 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 24,
            ease: 'linear',
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {drivers.map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 text-xs font-medium text-slate-700 dark:text-slate-300 shrink-0 hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-default"
            >
              <span className="shrink-0 flex items-center justify-center">
                {getTechBrandIcon(tool.name, 16)}
              </span>
              <span>{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
