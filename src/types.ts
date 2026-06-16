export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  bulletPoints: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "all" | "ml" | "web" | "nlp";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  bulletPoints: string[];
  techUsed: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
  gradeLabel: string;
  gradeValue: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}
