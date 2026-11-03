import { useState, useEffect, useCallback } from 'react'
import type { SectionId } from '../types'

const NAV_STORAGE_KEY = 'jdev_active_section'
const VALID_SECTIONS: SectionId[] = ['home', 'about', 'projects', 'tech-stacks', 'book-call', 'contact']

function getInitialSection(): SectionId {
  if (typeof window === 'undefined') return 'home'

  // 1. Check URL hash first
  const hash = window.location.hash.replace('#', '') as SectionId
  if (VALID_SECTIONS.includes(hash)) {
    return hash
  }

  // 2. Check localStorage
  const saved = localStorage.getItem(NAV_STORAGE_KEY) as SectionId | null
  if (saved && VALID_SECTIONS.includes(saved)) {
    return saved
  }

  return 'home'
}

export function useNavigation() {
  const [activeSection, setActiveSectionState] = useState<SectionId>(getInitialSection)

  const navigateTo = useCallback((section: SectionId, pushHistory = true) => {
    if (!VALID_SECTIONS.includes(section)) return

    setActiveSectionState(section)
    localStorage.setItem(NAV_STORAGE_KEY, section)

    if (pushHistory) {
      if (window.location.hash !== `#${section}`) {
        window.history.pushState({ section }, '', `#${section}`)
      }
    }

    // Instantly reset scroll position to the top of the new section
    const contentContainer = document.getElementById('main-content-scroll')
    if (contentContainer) {
      contentContainer.scrollTop = 0
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  // Listen to browser Back/Forward (popstate & hashchange)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const stateSection = event.state?.section as SectionId | undefined
      if (stateSection && VALID_SECTIONS.includes(stateSection)) {
        setActiveSectionState(stateSection)
        localStorage.setItem(NAV_STORAGE_KEY, stateSection)
        return
      }

      const hash = window.location.hash.replace('#', '') as SectionId
      if (VALID_SECTIONS.includes(hash)) {
        setActiveSectionState(hash)
        localStorage.setItem(NAV_STORAGE_KEY, hash)
      } else {
        setActiveSectionState('home')
        localStorage.setItem(NAV_STORAGE_KEY, 'home')
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as SectionId
      if (VALID_SECTIONS.includes(hash)) {
        setActiveSectionState(hash)
        localStorage.setItem(NAV_STORAGE_KEY, hash)
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handleHashChange)

    // Ensure initial hash matches state
    const currentHash = window.location.hash.replace('#', '')
    if (currentHash !== activeSection) {
      window.history.replaceState({ section: activeSection }, '', `#${activeSection}`)
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [activeSection])

  return {
    activeSection,
    navigateTo,
  }
}

