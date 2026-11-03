import { Layout } from './components/layout/Layout'
import { HomeSection } from './components/sections/HomeSection'
import { AboutSection } from './components/sections/AboutSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { TechStacksSection } from './components/sections/TechStacksSection'
import { BookCallSection } from './components/sections/BookCallSection'
import { ContactSection } from './components/sections/ContactSection'
import type { SectionId } from './types'

export function App() {
  const renderSection = (activeSection: SectionId, onNavigate: (section: SectionId) => void) => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={onNavigate} />
      case 'about':
        return <AboutSection />
      case 'projects':
        return <ProjectsSection />
      case 'tech-stacks':
        return <TechStacksSection />
      case 'book-call':
        return <BookCallSection />
      case 'contact':
        return <ContactSection />
      default:
        return <HomeSection onNavigate={onNavigate} />
    }
  }

  return (
    <Layout>
      {(activeSection, onNavigate) => renderSection(activeSection, onNavigate)}
    </Layout>
  )
}

export default App
