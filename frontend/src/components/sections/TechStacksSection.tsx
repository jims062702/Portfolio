import React from 'react'
import {
  Layers,
  Server,
  Wrench,
  Cloud,
} from 'lucide-react'
import { techStacksData } from '../../data/techStacksData'
import { getTechBrandIcon } from '../common/TechBrandIcons'
import type { TechItem } from '../../types'

interface TechMarqueeStreamProps {
  title: string
  subtitle: string
  items: TechItem[]
  direction: 'left' | 'right'
  icon: React.ElementType
  accentColor: string
}

const TechMarqueeStream: React.FC<TechMarqueeStreamProps> = ({
  title,
  subtitle,
  items,
  direction,
  icon: HeaderIcon,
  accentColor,
}) => {
  const streamClass = direction === 'left' ? 'marquee-stream-left' : 'marquee-stream-right'

  return (
    <div
      className="bg-white/80 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden select-none"
    >
      {/* Category Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-3 border-b border-slate-200/60 dark:border-slate-800/70">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-2xl border"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              borderColor: `${accentColor}30`,
            }}
          >
            <HeaderIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                {items.length} Technologies
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        
      </div>

      {/* Marquee Wrapper with Mask Fading Edges & Scoped Hover */}
      <div className="relative overflow-hidden py-1.5 mask-linear tech-marquee-stream-track">
        <div className={`${streamClass} flex w-max items-center`}>
          {/* Group 1: Items */}
          <div className="flex items-center gap-3.5 pr-3.5 shrink-0">
            {items.map((tech, idx) => (
              <div
                key={`g1-${tech.name}-${idx}`}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500 hover:shadow-lg transition-all shrink-0 cursor-default group/item"
              >
                {/* Real Authentic Tech Brand SVG */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-xs shrink-0 group-hover/item:scale-105 transition-transform">
                  {getTechBrandIcon(tech.name, 22)}
                </div>

                {/* Name & Difficulty / Experience */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-blue-500 transition-colors">
                    {tech.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs">
                    <span
                      className={`font-semibold ${
                        tech.level === 'Expert'
                          ? 'text-blue-600 dark:text-blue-400'
                          : tech.level === 'Advanced'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      {tech.level}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {tech.experience}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2: Exact duplicate for mathematical 0% to -50% infinite seamless loop */}
          <div className="flex items-center gap-3.5 pr-3.5 shrink-0" aria-hidden="true">
            {items.map((tech, idx) => (
              <div
                key={`g2-${tech.name}-${idx}`}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500 hover:shadow-lg transition-all shrink-0 cursor-default group/item"
              >
                {/* Real Authentic Tech Brand SVG */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-xs shrink-0 group-hover/item:scale-105 transition-transform">
                  {getTechBrandIcon(tech.name, 22)}
                </div>

                {/* Name & Difficulty / Experience */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-blue-500 transition-colors">
                    {tech.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs">
                    <span
                      className={`font-semibold ${
                        tech.level === 'Expert'
                          ? 'text-blue-600 dark:text-blue-400'
                          : tech.level === 'Advanced'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      {tech.level}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {tech.experience}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const TechStacksSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Tools, Languages &amp; Frameworks
        </h1>
        
      </div>

      {/* 4 Categorized Infinite Auto-scrolling Marquee Streams */}
      <div className="space-y-6">
        {/* Row 1: Frontend (Continuous Scroll LEFT) */}
        <TechMarqueeStream
          title="Frontend Development"
          subtitle="Modern reactive UI, type-safety, and motion physics"
          items={techStacksData.frontend}
          direction="left"
          icon={Layers}
          accentColor="#0284c7"
        />

        {/* Row 2: Backend & Persistence (Continuous Scroll RIGHT) */}
        <TechMarqueeStream
          title="Backend & Persistence"
          subtitle="Scalable microservices, RESTful APIs, and relational indexing"
          items={techStacksData.backend}
          direction="right"
          icon={Server}
          accentColor="#10b981"
        />

        {/* Row 3: Developer Tools & Workflow (Continuous Scroll LEFT) */}
        <TechMarqueeStream
          title="Developer Tools & Workflow"
          subtitle="Containerization, Git-flow, CI/CD, and design handoffs"
          items={techStacksData.tools}
          direction="left"
          icon={Wrench}
          accentColor="#8b5cf6"
        />

        {/* Row 4: DevOps, Cloud & Architecture (Continuous Scroll RIGHT) */}
        <TechMarqueeStream
          title="DevOps, Cloud & Architecture"
          subtitle="Cloud deployments, Web Security, Linux shell, and optimization"
          items={techStacksData.others}
          direction="right"
          icon={Cloud}
          accentColor="#f59e0b"
        />
      </div>
    </div>
  )
}
