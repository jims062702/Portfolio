import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  User,
  Clock,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'
import type { SectionId } from '../../types'

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  quickLinks?: { label: string; sectionId: SectionId }[]
}

interface JavionChatbotProps {
  onNavigate: (section: SectionId) => void
}

const STORAGE_KEY = 'javion_chat_session_v1'
const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24 hours
const SPAM_BUFFER_SECONDS = 15

// Predefined quick questions with instant answers
const PREDEFINED_QUESTIONS = [
  {
    question: 'Why did you call Javion?',
    preview: 'Why Javion?',
  },
  {
    question: 'Tell me about Barangay Natumolan MIS',
    preview: 'Natumolan MIS',
  },
  {
    question: 'Tell me about Remotasks Shift & Hours Automator',
    preview: 'Remotasks App',
  },
  {
    question: 'Tell me about Memorikey Smart Keychain',
    preview: 'Memorikey Vault',
  },
  {
    question: 'Tell me about TCC Class Scheduler',
    preview: 'TCC Scheduler',
  },
  {
    question: 'Who is James Gasang?',
    preview: 'Background & Bio',
  },
  {
    question: 'What are James’ featured projects?',
    preview: 'Top Projects',
  },
  {
    question: 'What tech stacks does he use?',
    preview: 'Skills & Tools',
  },
  {
    question: 'What is his academic background?',
    preview: 'BSIT & College',
  },
  {
    question: 'How can I hire or book a call?',
    preview: 'Book Consultation',
  },
  {
    question: 'How to contact James securely?',
    preview: 'Contact Info',
  },
]

// Animated greetings cycling beside the launcher icon
const BADGE_GREETINGS = [
  "Hi! I am Javion. Your AI chatbot made by James Gasang.",
  "Why did I call Javion? Click to discover my story!",
  "Ask me anything about James' projects, skills, or background!",
  "Looking to collaborate? I can help you schedule a call with James!",
]

export const JavionChatbot: React.FC<JavionChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [bubbleState, setBubbleState] = useState<'dots' | 'text'>('text')
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [showBadge, setShowBadge] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize messages with 24-hour expiration check
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const now = Date.now()
        if (
          parsed.timestamp &&
          now - parsed.timestamp < ONE_DAY_MS &&
          Array.isArray(parsed.messages) &&
          parsed.messages.length > 0
        ) {
          return parsed.messages
        } else {
          // Expired after 24 hours
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (err) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    // Default welcome message
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: `Hello! I'm **Javion**, your dedicated AI portfolio assistant crafted by **James Gasang**.\n\nI'm here to answer any questions about James' projects, full-stack skills, BSIT studies, or how to collaborate with him. Feel free to choose a quick topic below or type your inquiry!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickLinks: [
          { label: 'View Projects', sectionId: 'projects' },
          { label: 'Book a Call', sectionId: 'book-call' },
        ],
      },
    ]
  })

  // Save to localStorage with current timestamp whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          messages,
        })
      )
    }
  }, [messages])

  // Alternating typing dots and text animation for the launcher speech bubble
  // (Matches media_1793701980293_a5dc5f5f.png & media_1793701957243_79ef18cc.png)
  useEffect(() => {
    if (isOpen || !showBadge) return

    let timeoutId: ReturnType<typeof setTimeout>

    if (bubbleState === 'text') {
      // Display current greeting text for 4.5 seconds, then transition to typing dots
      timeoutId = setTimeout(() => {
        setBubbleState('dots')
      }, 4500)
    } else {
      // Display typing dots for 1.3 seconds, then cycle to next greeting text
      timeoutId = setTimeout(() => {
        setGreetingIndex(prev => (prev + 1) % BADGE_GREETINGS.length)
        setBubbleState('text')
      }, 1300)
    }

    return () => clearTimeout(timeoutId)
  }, [bubbleState, isOpen, showBadge])

  // 15-second spam cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [isOpen])

  // Clear chat history
  const handleClearChat = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat history cleared! I'm **Javion**, James Gasang's portfolio AI assistant. How can I assist you with James' work today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  // Pure frontend portfolio-strict intelligence engine
  const generateBotResponse = (userPrompt: string): { text: string; links?: { label: string; sectionId: SectionId }[]; isUnrecognized?: boolean } => {
    const p = userPrompt.toLowerCase().trim()

    // 0. Greetings & Friendly openers
    if (
      p === 'hi' ||
      p === 'hello' ||
      p === 'hey' ||
      p.startsWith('hi ') ||
      p.startsWith('hello ') ||
      p.startsWith('hey ') ||
      p.includes('kamusta') ||
      p.includes('kumusta') ||
      p.includes('good morning') ||
      p.includes('good evening')
    ) {
      return {
        text: `Hello! Great to meet you! I'm **Javion**, James Gasang's AI assistant. What would you like to explore about James' projects, skills, or background today?`,
        links: [
          { label: 'View Projects', sectionId: 'projects' },
          { label: 'Explore Tech Stacks', sectionId: 'tech-stacks' },
        ],
        isUnrecognized: false,
      }
    }

    // 0.1 Thanks & Polite closers
    if (
      p.includes('thank') ||
      p.includes('salamat') ||
      p === 'ok' ||
      p === 'cool' ||
      p === 'great' ||
      p === 'awesome' ||
      p.includes('goodbye') ||
      p.includes('bye')
    ) {
      return {
        text: `You're very welcome! Feel free to book an intro call with James or send a direct message whenever you're ready to collaborate. Have an awesome day!`,
        links: [
          { label: 'Book a Call', sectionId: 'book-call' },
          { label: 'Contact James', sectionId: 'contact' },
        ],
        isUnrecognized: false,
      }
    }

    // 0.2 Special AI Identity & Name Query: "Why did you call Javion?"
    if (
      p.includes('why did you call javion') ||
      p.includes('why call javion') ||
      p.includes('why javion') ||
      p.includes('why is your name javion') ||
      p.includes('why are you named javion') ||
      p.includes('why the name javion') ||
      p.includes('name javion') ||
      p.includes('meaning of javion')
    ) {
      return {
        text: `**James-inspired, elegant AI identity.**\n\nThe name **Javion** fuses **"James"** (the creator) with a forward-looking digital persona. It signifies elevated intelligence, speed, and software engineering precision.\n\nCreated directly by **James Gasang**, Javion embodies a polished conversational agent dedicated to navigating recruiters, clients, and collaborators through James' full-stack projects, system architectures, and technical capabilities.`,
        links: [
          { label: 'Explore Projects', sectionId: 'projects' },
          { label: 'View Tech Stacks', sectionId: 'tech-stacks' },
          { label: 'Read James’ Story', sectionId: 'about' },
        ],
        isUnrecognized: false,
      }
    }

    // 1. Identity & Who is James Gasang / Age / Birthday / Location
    if (
      p.includes('who is') ||
      p.includes('about james') ||
      p.includes('who are you') ||
      p.includes('age') ||
      p.includes('birthday') ||
      p.includes('born') ||
      p.includes('location') ||
      p.includes('where is')
    ) {
      return {
        text: `**James Gasang** is a **Full Stack AI Developer & UI/UX Engineer** from the **Philippines** (available worldwide for remote work).\n\n• **Age & Birthday:** 24 years old (born June 27, 2002)\n• **Current Status:** 4th-Year BSIT Student at Tagoloan Community College\n• **Experience:** 3+ years architecting web applications, high-performance APIs, and AI-driven interfaces.\n• **Role:** Lead Back-End & Full-Stack Developer for major institutional capstones.`,
        links: [{ label: 'Read Full Story', sectionId: 'about' }],
        isUnrecognized: false,
      }
    }

    // 2. Academic / School / Degree / BSIT / Tagoloan Community College
    if (
      p.includes('education') ||
      p.includes('college') ||
      p.includes('school') ||
      p.includes('bsit') ||
      p.includes('degree') ||
      p.includes('student') ||
      p.includes('tagoloan') ||
      p.includes('academic') ||
      p.includes('capstone')
    ) {
      return {
        text: `James is currently a graduating **4th-Year BSIT (Bachelor of Science in Information Technology)** student at **Tagoloan Community College** in Misamis Oriental, Philippines.\n\nHe serves as the **Lead Back-End & Full-Stack Developer** for their department capstone proposal, having designed robust relational database schemas and scalable server architectures.`,
        links: [{ label: 'View About Section', sectionId: 'about' }],
        isUnrecognized: false,
      }
    }

    // 3.0 Barangay Natumolan MIS Capstone Project (Specific Inquiries)
    if (
      p.includes('natumolan') ||
      p.includes('barangay') ||
      p.includes('mis') ||
      p.includes('capstone')
    ) {
      return {
        text: `**Barangay Natumolan MIS** is James Gasang's flagship capstone project!\n\n**Description:**\nA comprehensive management information system designed as a capstone project to transition the local government unit from manual, paper-based workflows to a fully automated digital platform. It streamlines various community services including Certificate issuance, Appointment scheduling, Case Settlements, and more.\n\n• **Tech Stack Architecture:** React, TypeScript, Vite, Tailwind CSS, Laravel, MySQL, Python, and Cloudinary.\n• **Live Demo:** [barangaynatumolan.tech](https://barangaynatumolan.tech)\n• **Source Code:** [github.com/jims062702/Barangay_Natumolan](https://github.com/jims062702/Barangay_Natumolan)`,
        links: [{ label: 'View Project in Portfolio', sectionId: 'projects' }],
        isUnrecognized: false,
      }
    }

    // 3.0b Remotasks Shift & Hours Automator (Specific Inquiries)
    if (
      p.includes('remotasks') ||
      p.includes('remo') ||
      p.includes('attendance') ||
      p.includes('shift')
    ) {
      return {
        text: ` **Remotasks Shift & Hours Automator** (Project 02) is a specialized operations platform engineered by James Gasang!\n\n**Description:**\nBuilt to replace a fragile Google Forms and Sheets workflow that failed to accurately calculate overnight shifts spanning across two calendar days. Features robust server-side rule enforcement to automatically compute working hours instead of manual typing, eliminating tracking errors for Remotasks tasks and schedules.\n\n• **Tech Stack Architecture:** React, TypeScript, Vite, Tailwind CSS, Laravel, Docker, Postgres.\n• **Live Demo:** [remoattendancebeamo.vercel.app](https://remoattendancebeamo.vercel.app)\n• **Source Code:** [github.com/jims062702/remo-attendance-frontend](https://github.com/jims062702/remo-attendance-frontend)`,
        links: [{ label: 'View in Portfolio', sectionId: 'projects' }],
        isUnrecognized: false,
      }
    }

    // 3.0c Memorikey Smart Keychain (Specific Inquiries)
    if (
      p.includes('memorikey') ||
      p.includes('keychain') ||
      p.includes('vault')
    ) {
      return {
        text: ` **Memorikey Smart Keychain** (Project 03) is a physical-to-digital cloud vault engineered by James Gasang!\n\n**Description:**\nA physical-to-digital bridge that connects your everyday keys to a secure cloud gallery. Designed as a personal, PIN-protected cloud vault for graduation celebrations, family milestones, and cherished life moments, merging handcrafted physical keychains with dynamic digital storage.\n\n• **Tech Stack Architecture:** HTML, CSS, JavaScript, PHP, MySQL, Cloudinary.\n• **Live Demo:** [memorikey.infinityfree.io](https://memorikey.infinityfree.io)\n• **Source Code:** Private Client Repository`,
        links: [{ label: 'View in Portfolio', sectionId: 'projects' }],
        isUnrecognized: false,
      }
    }

    // 3.0d TCC Class Scheduler (Specific Inquiries)
    if (
      p.includes('tcc') ||
      p.includes('cor') ||
      p.includes('class schedule') ||
      p.includes('scheduler')
    ) {
      return {
        text: `📅 **TCC Class Scheduler** (Project 04) is a productivity web and mobile app built by James Gasang!\n\n**Description:**\nA productivity web and mobile tool built to eliminate the hassle of checking printed Certificates of Registration. By simply uploading a COR, the system automatically parses and generates a structured, real-time class schedule.\n\n• **Tech Stack Architecture:** React, TypeScript, Vite, Tailwind CSS, and Flutter.\n• **Live Demo:** [tccclassscheduler.vercel.app](https://tccclassscheduler.vercel.app)\n• **Source Code:** [github.com/jims062702/TCC-SCHEDULER-APP-LANDINGPAGE](https://github.com/jims062702/TCC-SCHEDULER-APP-LANDINGPAGE)`,
        links: [{ label: 'View in Portfolio', sectionId: 'projects' }],
        isUnrecognized: false,
      }
    }

    // 3.1 Projects & Portfolio Work
    if (
      p.includes('project') ||
      p.includes('built') ||
      p.includes('portfolio')
    ) {
      return {
        text: `James has built **4 flagship software systems**:\n\n1. **Barangay Natumolan MIS** – Comprehensive LGU digital governance platform streamlining certificates, appointments, and settlements (React, TypeScript, Vite, Tailwind CSS, Laravel, MySQL, Python, Cloudinary).\n   • Live: barangaynatumolan.tech\n   • Repo: github.com/jims062702/Barangay_Natumolan\n2. **Remotasks Shift & Hours Automator** – Automated overnight shift & attendance tracking suite with server-side rule enforcement (React, TypeScript, Vite, Tailwind CSS, Laravel, Docker, Postgres).\n   • Live: remoattendancebeamo.vercel.app\n   • Repo: github.com/jims062702/remo-attendance-frontend\n3. **Memorikey Smart Keychain** – Physical-to-digital PIN-protected cloud vault for cherished milestones (HTML, CSS, JavaScript, PHP, MySQL, Cloudinary).\n   • Live: memorikey.infinityfree.io\n4. **TCC Class Scheduler** – Productivity tool parsing COR to generate structured class schedules (React, TypeScript, Vite, Tailwind CSS, Flutter).\n   • Live: tccclassscheduler.vercel.app\n   • Repo: github.com/jims062702/TCC-SCHEDULER-APP-LANDINGPAGE`,
        links: [{ label: 'Explore All Projects', sectionId: 'projects' }],
        isUnrecognized: false,
      }
    }

    // 4. Flutter & React Native (Mobile Frameworks)
    if (
      p.includes('flutter') ||
      p.includes('react native') ||
      p.includes('mobile') ||
      p.includes('ios') ||
      p.includes('android') ||
      p.includes('dart')
    ) {
      return {
        text: `Yes! James engineers multi-platform mobile applications using **Flutter (Dart)** and **React Native (TypeScript)**.\n\nHe delivers smooth 60fps native gestures, cross-platform state synchronization, custom widgets, and offline persistence for both iOS and Android.`,
        links: [{ label: 'View Mobile Stacks', sectionId: 'tech-stacks' }],
        isUnrecognized: false,
      }
    }

    // 5. Google Auth & Facebook Auth (Authentication & Security)
    if (
      p.includes('google auth') ||
      p.includes('facebook auth') ||
      p.includes('oauth') ||
      p.includes('auth') ||
      p.includes('login') ||
      p.includes('jwt') ||
      p.includes('social login') ||
      p.includes('meta login')
    ) {
      return {
        text: `James has extensive experience implementing robust identity and authentication flows, notably **Google Auth (OAuth 2.0 & Google Identity Services)** and **Facebook Auth (Meta Login SDK)**.\n\nHis implementations include JWT session security, Row-Level Security (RLS), permission scopes, and CSRF protection.`,
        links: [{ label: 'View Backend & Security', sectionId: 'tech-stacks' }],
        isUnrecognized: false,
      }
    }

    // 6. Hostinger Web Hosting & VPS Hosting
    if (
      p.includes('hostinger') ||
      p.includes('vps') ||
      p.includes('hosting') ||
      p.includes('server') ||
      p.includes('deploy') ||
      p.includes('nginx')
    ) {
      return {
        text: `James manages production web and server infrastructure utilizing **Hostinger Web Hosting** for optimized web apps and **Hostinger VPS Hosting (Linux / Ubuntu / Debian)**.\n\nHe configures Docker containers, Nginx reverse proxies, SSL certificates, automated deployments, and DNS management.`,
        links: [{ label: 'View Cloud & Hosting', sectionId: 'tech-stacks' }],
        isUnrecognized: false,
      }
    }

    // 7. General Tech Stacks & Skills
    if (
      p.includes('tech') ||
      p.includes('stack') ||
      p.includes('skill') ||
      p.includes('react') ||
      p.includes('typescript') ||
      p.includes('node') ||
      p.includes('laravel') ||
      p.includes('mysql') ||
      p.includes('rasa') ||
      p.includes('cloudinary') ||
      p.includes('database') ||
      p.includes('postgres') ||
      p.includes('docker') ||
      p.includes('tailwind') ||
      p.includes('vite') ||
      p.includes('next') ||
      p.includes('tools')
    ) {
      return {
        text: `Here is a breakdown of James Gasang's core technical stack:\n\n• **Frontend & Mobile:** React 19, TypeScript, Next.js 15, Tailwind CSS, Framer Motion, React Native, Flutter, Vite, Zustand.\n• **Backend & Databases:** Laravel (PHP MVC), MySQL, Python, Node.js, Express.js, PostgreSQL, Prisma ORM, Google Auth, Facebook Auth, MongoDB, Supabase, REST & GraphQL.\n• **AI, Media & Cloud:** Python AI Pipelines, Cloudinary Media Cloud, Docker, Git & GitHub, VS Code, Postman, Figma.\n• **Hosting & Ops:** Hostinger Web & VPS Hosting, Vercel, Netlify, Linux/Bash, AWS Services.`,
        links: [{ label: 'View Interactive Stacks', sectionId: 'tech-stacks' }],
        isUnrecognized: false,
      }
    }

    // 8. Booking a Call / Hiring / Rates / Availability
    if (
      p.includes('hire') ||
      p.includes('book') ||
      p.includes('call') ||
      p.includes('meeting') ||
      p.includes('schedule') ||
      p.includes('freelance') ||
      p.includes('available') ||
      p.includes('consultation') ||
      p.includes('rate') ||
      p.includes('work with')
    ) {
      return {
        text: `James is **currently available** for freelance projects, contract roles, and full-time remote developer positions worldwide!\n\nYou can easily book a 1-on-1 consultation or project kickoff call directly through the interactive scheduler in the portfolio.`,
        links: [
          { label: 'Book a Call Now', sectionId: 'book-call' },
          { label: 'Send Direct Message', sectionId: 'contact' },
        ],
        isUnrecognized: false,
      }
    }

    // 9. Contact / Email / Socials / LinkedIn / GitHub / Facebook
    if (
      p.includes('contact') ||
      p.includes('email') ||
      p.includes('message') ||
      p.includes('reach') ||
      p.includes('linkedin') ||
      p.includes('github') ||
      p.includes('facebook') ||
      p.includes('social')
    ) {
      return {
        text: `You can reach James through several direct channels:\n\n• **Contact Form:** Use the secure form in the portfolio (James' personal email is strictly protected behind secure server handlers).\n• **LinkedIn:** linkedin.com/in/james-gasang-805ab2448\n• **GitHub:** github.com/jims062702\n• **Facebook:** facebook.com/james.gasangii.3`,
        links: [{ label: 'Go to Contact Form', sectionId: 'contact' }],
        isUnrecognized: false,
      }
    }

    // 10. What is Javion?
    if (p.includes('javion') || p.includes('what are you') || p.includes('chatbot') || p.includes('ai')) {
      return {
        text: `I am **Javion**, an AI portfolio concierge engineered specifically by James Gasang!\n\nMy purpose is to guide recruiters, clients, and visitors through James' background, showcase his technical capabilities, and facilitate bookings and collaborations. All my data runs securely in the client without external data leaks.`,
        isUnrecognized: false,
      }
    }

    // 11. Strict Deflection for Off-Topic / Unrecognized inquiries -> Triggers 15-second buffer!
    return {
      text: `I didn't quite catch that, or this question is outside the scope of **James Gasang's portfolio**.\n\n **A 15-second anti-spam buffer is now active.** Once it finishes, please feel free to ask about James' projects, tech stacks, or collaboration details!`,
      links: [
        { label: 'Explore Projects', sectionId: 'projects' },
        { label: 'View Tech Stacks', sectionId: 'tech-stacks' },
      ],
      isUnrecognized: true,
    }
  }

  // Handle sending a message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim()
    if (!text) return
    if (cooldown > 0) return // Buffer active
    if (text.length > 500) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: now,
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate smart cognitive response delay (400 - 800ms)
    setTimeout(() => {
      const response = generateBotResponse(text)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickLinks: response.links,
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)

      // Tsaka lang mag-buffer ng 15 seconds kapag HINDI maintindihan ang nilagay sa chatbot or off-topic
      if (response.isUnrecognized) {
        setCooldown(SPAM_BUFFER_SECONDS)
      } else {
        setCooldown(0)
      }
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chatbot Launcher: Side-by-Side Horizontal Layout with Animated Speech Bubble and Pointed Tail */}
      {/* Matches user designs in media_1793701980293_a5dc5f5f.png & media_1793701957243_79ef18cc.png */}
      <div className="fixed bottom-20 lg:bottom-7 right-3 sm:right-7 z-40 flex items-center gap-3 select-none">
        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer group"
            >
              {/* Dark Speech Bubble Container */}
              <div className="relative bg-[#181a29]/95 dark:bg-[#121626]/95 backdrop-blur-xl border border-white/15 dark:border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl px-4 py-3 sm:px-5 sm:py-3.5 max-w-[calc(100vw-5.5rem)] sm:max-w-[340px] flex items-center transition-all group-hover:border-blue-400/50">
                {/* Dismiss button on top left of the bubble */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowBadge(false)
                  }}
                  className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Dismiss greeting"
                  aria-label="Dismiss greeting"
                >
                  <X size={10} />
                </button>

                {/* Alternating Content: 3 Animated Typing Dots vs Greeting Text */}
                <AnimatePresence mode="wait">
                  {bubbleState === 'dots' ? (
                    <motion.div
                      key="dots"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 py-1 px-2"
                    >
                      <motion.span
                        animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 rounded-full bg-slate-500 shadow-xs"
                      />
                      <motion.span
                        animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs"
                      />
                      <motion.span
                        animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-white shadow-xs"
                      />
                    </motion.div>
                  ) : (
                    <motion.p
                      key={`text-${greetingIndex}`}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs sm:text-[13px] text-white font-semibold leading-snug tracking-wide drop-shadow-xs"
                    >
                      {BADGE_GREETINGS[greetingIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Pointed Triangle Tail on the Right Edge pointing towards the Avatar */}
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0
                             border-t-[7px] border-t-transparent
                             border-b-[7px] border-b-transparent
                             border-l-[8px] border-l-[#181a29]/95 dark:border-l-[#121626]/95
                             pointer-events-none drop-shadow-xs"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Avatar Trigger Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            if (!showBadge) setShowBadge(true)
          }}
          aria-label="Toggle Javion AI Assistant"
          className="relative group p-1 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center justify-center"
        >
          {/* Authentic Javion AI Avatar */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-900 shadow-md">
            <img
              src="/images/javion-ai-avatar.jpg"
              alt="Javion AI Chatbot"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Active green pulse dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
        </button>
      </div>

      {/* Main Interactive Chatbot Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 lg:bottom-8 right-4 sm:right-7 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] bg-white dark:bg-[#0a1120] border border-slate-200/90 dark:border-slate-800/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Top Modal Header */}
            <div className="p-4 bg-slate-50/90 dark:bg-[#0c1527]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-900 shadow-sm shrink-0">
                  <img
                    src="/images/javion-ai-avatar.jpg"
                    alt="Javion Avatar"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Javion AI
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                      Portfolio Bot
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">24h session memory</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Clear Chat & Close */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation history (Saved for 24 hours)"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Predefined Quick Questions Strip (Horizontal Scrollable Pills) */}
            <div className="px-3 py-2 bg-slate-100/70 dark:bg-[#070d18]/60 border-b border-slate-200/60 dark:border-slate-800/60 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
                Topics:
              </span>
              {PREDEFINED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.question)}
                  disabled={cooldown > 0}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/50 shadow-2xs whitespace-nowrap shrink-0 transition-all disabled:opacity-50"
                >
                  {q.preview}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 min-w-0 w-full ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Bot Avatar Icon */}
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl overflow-hidden bg-slate-900 border border-blue-500/30 shrink-0 mt-0.5">
                      <img
                        src="/images/javion-ai-avatar.jpg"
                        alt="Javion"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble - completes whole words before wrapping to next line */}
                  <div
                    className={`min-w-0 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-800/80 rounded-tl-none'
                    }`}
                  >
                    <div className="min-w-0 break-words [overflow-wrap:anywhere] whitespace-pre-wrap font-normal">
                      {msg.text.split('\n').map((line, lIdx) => {
                        // Very light markdown bold parser
                        const parts = line.split(/(\*\*.*?\*\*)/g)
                        return (
                          <div key={lIdx} className={`min-w-0 break-words [overflow-wrap:anywhere] ${line === '' ? 'h-2' : ''}`}>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-bold">
                                    {p.slice(2, -2)}
                                  </strong>
                                )
                              }
                              return <span key={pIdx}>{p}</span>
                            })}
                          </div>
                        )
                      })}
                    </div>

                    {/* Quick navigation links inside message */}
                    {msg.quickLinks && msg.quickLinks.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap gap-1.5">
                        {msg.quickLinks.map((link, lkIdx) => (
                          <button
                            key={lkIdx}
                            onClick={() => {
                              onNavigate(link.sectionId)
                              setIsOpen(false)
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={11} />
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1 text-right font-mono ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* User Icon */}
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing animation indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] font-mono">Javion is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Spam Buffer Footer */}
            <div className="p-3 bg-slate-50/90 dark:bg-[#0c1527]/90 border-t border-slate-200/80 dark:border-slate-800/80 shrink-0">
              {/* Spam buffer countdown warning if active */}
              {cooldown > 0 && (
                <div className="mb-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="animate-spin text-amber-500" />
                    <span>Anti-spam buffer active</span>
                  </span>
                  <span className="font-mono">Wait {cooldown}s</span>
                </div>
              )}

              {/* Text Input Row */}
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  maxLength={500}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={cooldown > 0}
                  placeholder={
                    cooldown > 0
                      ? `Please wait ${cooldown}s before sending...`
                      : 'Ask Javion about James (e.g. skills, projects)...'
                  }
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 transition-colors disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800/50"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || cooldown > 0}
                  className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Character Limit Counter (500 max) & Disclaimer */}
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
                <span>Answers based strictly on James Gasang's portfolio</span>
                <span
                  className={`font-mono font-semibold ${
                    inputValue.length >= 450 ? 'text-amber-500' : 'text-slate-400'
                  }`}
                >
                  {inputValue.length}/500
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
