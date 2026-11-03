import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackgroundBlobs } from './BackgroundBlobs'
import { CustomCursor } from './CustomCursor'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { JavionChatbot } from '../common/JavionChatbot'
import { useNavigation } from '../../hooks/useNavigation'
import { useTheme } from '../../hooks/useTheme'
import type { SectionId } from '../../types'

interface LayoutProps {
  children: (activeSection: SectionId, navigateTo: (section: SectionId) => void) => React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeSection, navigateTo } = useNavigation()
  const { theme, toggleTheme } = useTheme()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Guarantee that whenever the user navigates to any section, it defaults to the top immediately
  React.useEffect(() => {
    const scrollContainer = document.getElementById('main-content-scroll')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [activeSection])

  return (
    <div className="relative h-screen lg:min-h-screen bg-slate-50 dark:bg-[#050b14] text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row font-sans transition-colors duration-300 antialiased selection:bg-blue-500 selection:text-white overflow-hidden lg:overflow-x-hidden">
      {/* Background Animated Blobs & Rotating Geometric Orbits */}
      <BackgroundBlobs />

      {/* Hardware-Accelerated Interactive Custom Cursor for Desktop POV */}
      <CustomCursor />

      {/* Left Persistent / Collapsible Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Top Header (Permanently Sticky) & Mobile App Bottom Navigation Bar */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area: flex-1 min-h-0 ensures mobile header stays pinned and main scrolls independently */}
      <main
        id="main-content-scroll"
        className="relative z-10 flex-1 min-h-0 lg:h-screen overflow-y-auto px-4 sm:px-8 lg:px-12 pt-4 lg:pt-10 pb-28 lg:pb-12 custom-scrollbar"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="w-full"
          >
            {children(activeSection, navigateTo)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Javion AI Interactive Portfolio Chatbot with Floating Cycling Greeting */}
      <JavionChatbot onNavigate={navigateTo} />
    </div>
  )
}
