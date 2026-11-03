export type SectionId = 
  | 'home' 
  | 'about' 
  | 'projects' 
  | 'tech-stacks' 
  | 'book-call' 
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  badge?: string;
}

export interface ProjectKPI {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'Cloud & API' | 'Interactive UX';
  previewImages: string[];
  techStack: string[];
  demoUrl: string;
  githubUrl?: string;
  featured?: boolean;
  kpi: ProjectKPI;
  stats?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  category: 'Frontend' | 'Backend' | 'Cloud / DevOps' | 'Cybersecurity' | 'Fundamentals';
  badgeColor: string;
  skills: string[];
  summary: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'others';
  icon: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  experience: string;
  description: string;
  featured?: boolean;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  date: string;
  timeSlot: string;
  meetingType: string;
  projectBrief: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  serviceInterest: string;
  message: string;
}

