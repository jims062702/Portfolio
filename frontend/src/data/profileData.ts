export const profileData = {
  name: 'James Gasang',
  handle: '@jdev',
  tagline: 'Build it once. Run it forever.',
  subtagline: 'I turn complex problems into elegant, scalable web applications with delightful user experiences.',
  role: 'Full Stack AI Developer & UI/UX Engineer',
  birthDate: '2002-06-27',
  location: 'Philippines • Available Worldwide (Remote)',
  academicStatus: '4th-Year BSIT Student',
  gpa: 'Lead Back-End & Full-Stack Developer',
  socialLinks: {
    facebook: 'https://www.facebook.com/james.gasangii.3',
    linkedin: 'https://www.linkedin.com/in/james-gasang-805ab2448',
    github: 'https://github.com/jims062702',
  },
  stats: [
    { label: 'Projects Built', value: '24+' },
    { label: 'Happy Collaborators', value: '18+' },
    { label: 'Modern Tech Stacks', value: '15+' },
    { label: 'Code Quality Rating', value: '99.9%' },
  ],
  dailyDrivers: [
    { name: 'React 19', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'Tailwind CSS', color: '#38BDF8' },
    { name: 'Framer Motion', color: '#EC4899' },
    { name: 'Vite', color: '#646CFF' },
    { name: 'Node.js', color: '#22C55E' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'Figma', color: '#F24E1E' },
  ],
  bioHighlights: [
    {
      title: 'Current Status',
      value: '4th-Year Undergrad',
      description: 'Graduating senior pursuing BS in Information Technology with emphasis on Web Systems & Software Engineering.',
    },
    {
      title: 'Real-world Experience',
      value: '3+ Years Coding',
      description: 'Hands-on background building production SPAs, REST APIs, enterprise dashboards, and headless applications.',
    },
    {
      title: 'Engineering Philosophy',
      value: 'Performance First',
      description: 'Zero bloat, accessible semantic markup, 60fps Framer Motion transitions, and clean maintainable TypeScript.',
    },
  ],
}

export function calculateAge(birthDateString: string): number {
  const birthDate = new Date(birthDateString)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

