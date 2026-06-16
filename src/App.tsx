import React, { useState, useEffect } from "react";
import { ProfileData, Project } from "./types";
import ContactForm from "./components/ContactForm";
import AdminPanel from "./components/AdminPanel";
import AIAssistant from "./components/AIAssistant";
import { 
  Bot, Code2, GraduationCap, Award, MapPin, 
  Mail, Phone, Shield, ArrowUpRight, CheckCircle2, 
  Terminal, Sparkles, Filter, Github, Linkedin, Loader2,
  ChevronRight, BrainCircuit, Code, Database, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const aiBg = "/src/assets/images/ai_analytics_amber_bg_1781595408800.jpg";

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAdminConsole, setShowAdminConsole] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile from Express backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdated = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-slate-300 font-sans">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-mono tracking-wider text-slate-400">Loading Malleswari's Database...</p>
      </div>
    );
  }

  // Filter projects by category
  const filteredProjects = activeCategory === "all" 
    ? profile.projects 
    : profile.projects.filter(p => p.category === activeCategory);

  // Helper mapping categories to labels
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "ml": return "Machine Learning";
      case "web": return "Web Application";
      case "nlp": return "Natural Language / Chatbots";
      default: return "Full Stack Project";
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-grid-pattern text-[#E5E7EB] flex flex-col selection:bg-amber-500/30 selection:text-amber-300 font-sans">
      
      {/* Dynamic Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1F2937] px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1F2937] flex items-center justify-center text-amber-500 font-mono text-sm font-bold group-hover:scale-105 transition-transform">
              BM
            </div>
            <div>
              <span className="font-bold text-slate-100 font-display text-sm tracking-tight block">Malleswari</span>
              <span className="text-[10px] text-gray-400 font-mono block leading-none">AI & DS Engineer</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-amber-500 transition-colors">Qualifications</a>
            <a href="#projects" className="hover:text-amber-500 transition-colors">Project Portfolio ({profile.projects.length})</a>
            <a href="#experience" className="hover:text-amber-500 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Contact Form</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowAdminConsole(!showAdminConsole);
                if (!showAdminConsole) {
                  setTimeout(() => {
                    document.getElementById("admin-controls-anchor")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] border border-[#1F2937] rounded-lg text-xs font-semibold text-gray-300 hover:text-amber-500 hover:border-amber-500/20 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              {showAdminConsole ? "Hide Terminal" : "Developer Tools"}
            </button>
            <a
              href="#contact"
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full text-xs transition-transform cursor-pointer"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-12 md:py-20 lg:py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text branding */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-semibold font-mono uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> AI & Data Science Specialist
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-slate-100 select-none">
                Bandaru <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Malleswari
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                B.Tech Student in <span className="text-amber-500 font-bold">Artificial Intelligence & Data Science</span>, machine learning engineer, and full-stack integration developer.
              </p>
            </div>

            <p className="text-slate-400 text-sm max-w-xl leading-relaxed select-all">
              {profile.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs">
              <span className="flex items-center gap-1 bg-[#111827] border border-[#1F2937] px-3 py-1.5 rounded-lg text-slate-300 font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> AP, India
              </span>
              <a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 bg-[#111827] hover:bg-slate-900 hover:border-amber-500/20 transition-all border border-[#1F2937] px-3 py-1.5 rounded-lg text-slate-300 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-amber-500" /> {profile.email}
              </a>
              <a 
                href={`tel:${profile.phone}`}
                className="flex items-center gap-1.5 bg-[#111827] hover:bg-slate-900 hover:border-amber-500/20 transition-all border border-[#1F2937] px-3 py-1.5 rounded-lg text-slate-300 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" /> +91 {profile.phone}
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto h-11 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/10 cursor-pointer transition-all"
              >
                Explore My Portfolio
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto h-11 px-6 bg-[#111827] hover:bg-slate-900 text-slate-300 hover:text-slate-100 border border-[#1F2937] rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Majestic futuristic canvas overlay rendering our generated nodes graphic asset */}
          <div className="lg:col-span-5 relative w-full h-[320px] md:h-[380px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-[#1F2937]">
            <div className="absolute inset-0 bg-slate-950/40 z-10 transition-opacity pointer-events-none" />
            
            {/* Visual background image generated by assistant */}
            <img 
              src={aiBg} 
              alt="Neural Networks Illustration" 
              className="absolute inset-0 w-full h-full object-cover select-none filter brightness-[0.75] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />

            {/* Quick overlay cards overlaying on top of graphics */}
            <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2.5">
              <div className="glass-effect rounded-2xl p-4.5 border border-[#1F2937]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Training</span>
                  <span className="text-xs font-semibold text-slate-100 font-display">Deep FMML IIIT Hyderabad Credentials</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="glass-effect rounded-xl p-2.5 border border-[#1F2937]/40">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Total CGPA</span>
                  <span className="text-base font-bold text-amber-500 font-display">7.84 / 10.0</span>
                </div>
                <div className="glass-effect rounded-xl p-2.5 border border-[#1F2937]/40">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">B.Tech Graduation</span>
                  <span className="text-base font-bold text-amber-500/90 font-display">May 2027</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Biography & Key Stats Section */}
      <section id="about" className="py-16 bg-[#111827]/30 border-y border-[#1F2937] px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto animate-fade-in">
            <span className="text-amber-500 text-[10px] font-mono tracking-wider uppercase font-bold">
              Background Summary
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100">
              Personal Credentials
            </h3>
            <p className="text-[#9CA3AF] text-xs">
              Specialized in python applications, machine learning workflows, and responsive full-stack architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Biography details */}
            <div className="lg:col-span-2 glass-effect rounded-2xl p-6 md:p-8 space-y-4">
              <h4 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
                Biography Statement
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                As a Bachelor of Technology student in Artificial Intelligence and Data Science at Kakinada Institute of Engineering and Technology, I explore the intersections of database indexing, automated algorithmic systems, and frontend frameworks. 
                <br/><br/>
                Through my Machine Learning Internship at IIIT Hyderabad remote, I gained structured training in statistical modeling, Scikit-learn validation pipelines, and complex dataset manipulation. I build scalable applications, deploying Node/Express and dynamic Python routines. Let's engineer the future together!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1F2937]">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-100 text-xs">AI & ML Pipelines</h5>
                    <p className="text-gray-400 text-[10px]">Data analysis & engineering</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-100 text-xs">Full-Stack Routines</h5>
                    <p className="text-gray-400 text-[10px]">Robust Node & Python APIs</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-100 text-xs">Dynamic Databases</h5>
                    <p className="text-gray-400 text-[10px]">MySQL, MongoDB & JSON storage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic highlights box */}
            <div className="glass-effect rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-amber-500/10 hover:border-amber-500/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-500 pb-2 border-b border-[#1F2937]">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-bold text-slate-100 text-sm font-display">Education Summary</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  {profile.education.map((edu, idx) => (
                    <div key={edu.id || idx} className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-mono block">{edu.date}</span>
                      <p className="font-semibold text-slate-100 leading-tight">{edu.degree}</p>
                      <p className="text-gray-400 text-[11px]">{edu.institution}</p>
                      <span className="inline-block bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded text-[10px] font-bold mt-1 border border-amber-500/10">
                        {edu.gradeLabel}: {edu.gradeValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F2937] mt-4">
                <span className="text-[10px] text-amber-500 font-mono tracking-wide uppercase font-bold">
                  Primary Location Focus
                </span>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Andhra Pradesh, India (willing to relocate)
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section id="skills" className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto animate-fade-in">
            <span className="text-amber-500 text-[10px] font-mono tracking-wider uppercase font-bold">
              Skill Inventory
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100">
              Technical Skill Matrix
            </h3>
            <p className="text-gray-400 text-xs">
              Malleswari is equipped with standard enterprise languages, analytical python libraries and web capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {profile.skills.map((category) => (
              <div 
                key={category.id} 
                className="glass-effect rounded-2xl p-5 border border-[#1F2937] hover:border-amber-500/20 hover:bg-[#111827]/40 transition-all flex flex-col space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20">
                    {category.id === "lang" && <Code className="w-4 h-4" />}
                    {category.id === "frontend" && <Compass className="w-4 h-4" />}
                    {category.id === "backend" && <Database className="w-4 h-4" />}
                    {category.id === "ai-ml" && <BrainCircuit className="w-4 h-4" />}
                    {category.id === "tools" && <Terminal className="w-4 h-4" />}
                  </div>
                  <h4 className="font-bold font-display text-xs text-[#E5E7EB] min-h-[16px] flex items-center">
                    {category.name}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 bg-[#111827] text-gray-300 rounded-lg text-[10.5px] border border-[#1F2937] hover:text-amber-500 hover:border-amber-500/20 transition- colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dynamic Projects Showcase */}
      <section id="projects" className="py-16 bg-[#111827]/10 border-t border-[#1F2937] px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4 border-b border-[#1F2937]">
            <div className="space-y-1.5 animate-fade-in">
              <span className="text-amber-500 text-[10px] font-mono tracking-wider uppercase font-bold block">
                Feature Work
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100">
                Engineering Projects ({profile.projects.length})
              </h3>
              <p className="text-gray-400 text-xs">
                Filter her real, database-backed projects below. Use her Developer Tools above to dynamically seed more!
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeCategory === "all" 
                    ? "bg-amber-500 text-slate-950 font-bold" 
                    : "bg-[#111827] border border-[#1F2937] text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => setActiveCategory("ml")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeCategory === "ml" 
                    ? "bg-amber-500 text-slate-950 font-bold" 
                    : "bg-[#111827] border border-[#1F2937] text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                Machine Learning
              </button>
              <button
                onClick={() => setActiveCategory("nlp")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeCategory === "nlp" 
                    ? "bg-amber-500 text-slate-950 font-bold" 
                    : "bg-[#111827] border border-[#1F2937] text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                Natural Language / AI
              </button>
              <button
                onClick={() => setActiveCategory("web")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeCategory === "web" 
                    ? "bg-amber-500 text-slate-950 font-bold" 
                    : "bg-[#111827] border border-[#1F2937] text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                Web Integrations
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center text-gray-500 glass-effect rounded-2xl border border-[#1F2937]">
                <Compass className="w-10 h-10 mx-auto stroke-1 stroke-gray-500 mb-2 animate-spin" />
                <p className="font-semibold">No projects match select pipeline filter.</p>
                <p className="text-[11px] mt-1 text-gray-500">Seed one under Developer Zone tools!</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-effect rounded-2xl p-6 border border-[#1F2937] hover:border-amber-500/20 transition-all flex flex-col justify-between space-y-6 hover:shadow-xl hover:shadow-amber-500/[0.01]"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-amber-500 font-mono tracking-wider uppercase block font-bold">
                          {getCategoryLabel(project.category)}
                        </span>
                        <h4 className="text-lg font-bold font-display text-slate-100 mt-0.5 leading-tight">
                          {project.title}
                        </h4>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-[#111827] border border-[#1F2937] px-2.5 py-1 rounded-full shrink-0 font-mono">
                        {project.date}
                      </span>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed">
                      {project.description}
                    </p>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-gray-500 font-mono tracking-wider block mb-2">
                        Key Accomplishments
                      </span>
                      <ul className="space-y-2 text-xs text-gray-400">
                        {project.bulletPoints.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#111827] border border-[#1F2937] text-gray-300 text-[10px] rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-amber-500 transition-colors uppercase font-mono text-[10.5px]"
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub Code
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Professional Internship Experience */}
      <section id="experience" className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto animate-fade-in">
            <span className="text-amber-500 text-[10px] font-mono tracking-wider uppercase font-bold">
              Professional Timeline
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100">
              Work Experience & Qualifications
            </h3>
            <p className="text-gray-400 text-xs">
              Summary of her active training programs and completed internship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline element */}
            <div className="lg:col-span-8 space-y-6">
              {profile.experiences.map((exp, idx) => (
                <div 
                  key={exp.id || idx} 
                  className="glass-effect rounded-2xl p-6 md:p-8 border-l-2 border-l-amber-500 border border-[#1F2937] relative space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 animate-fade-in">
                    <div>
                      <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest font-bold">
                        {exp.company}
                      </span>
                      <h4 className="text-md font-bold text-slate-100 font-display mt-0.5">
                        {exp.role}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono bg-[#111827] border border-[#1F2937] px-3 py-1 rounded-full text-gray-400 w-fit shrink-0">
                      {exp.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> {exp.location}
                  </p>

                  <div className="space-y-2 text-xs">
                    {exp.bulletPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex gap-2 items-start text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#1F2937] max-w-full flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold mr-1 font-mono">Tools used:</span>
                    {exp.techUsed.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-[#111827] border border-[#1F2937] text-[10px] text-gray-300 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Side credentials card listing Certifications to match PDF */}
            <div className="lg:col-span-4 glass-effect rounded-2xl p-6 md:p-8 border border-[#1F2937] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937] text-amber-500">
                <Award className="w-5 h-5" />
                <h5 className="font-bold text-slate-100 text-sm font-display">
                  Professional Certifications
                </h5>
              </div>

              <div className="divide-y divide-[#1F2937]">
                {profile.certifications.map((c, idx) => (
                  <div key={c.id || idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <h6 className="font-bold text-[#E5E7EB] text-xs">
                      {c.name}
                    </h6>
                    <p className="text-gray-400 text-[10.5px] font-mono">
                      Issued by: {c.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Mail Contact Form - visitor trigger point */}
      <section id="contact" className="py-16 bg-[#111827]/30 border-t border-[#1F2937] px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-xl mx-auto animate-fade-in">
            <span className="text-amber-500 text-[10px] font-mono tracking-wider uppercase font-bold">
              Get in Touch
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100">
              Interactive Mail Room
            </h3>
            <p className="text-gray-400 text-xs">
              Send a dynamic message or job offer straight into her full-stack platform database.
            </p>
          </div>

          <ContactForm 
            email={profile.email}
            phone={profile.phone}
            location={profile.location}
            linkedin={profile.linkedin}
            github={profile.github}
          />
        </div>
      </section>

      {/* Developer Control Room Hidden Station */}
      <AnimatePresence>
        {showAdminConsole && (
          <section id="admin-controls-anchor" className="py-12 bg-[#0A0A0A] border-t border-[#1F2937] px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <Shield className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold font-display text-slate-100">
                  Node Database Administration Console
                </h3>
                <p className="text-gray-400 text-xs">
                  Review contact submissions or insert dynamic skills/projects here.
                </p>
              </div>

              <AdminPanel onProfileUpdated={handleProfileUpdated} />
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-10 px-4 border-t border-[#1F2937] text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Bandaru Malleswari. Dynamic Full-stack Personal Portfolio.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowAdminConsole(true);
                setTimeout(() => {
                  document.getElementById("admin-controls-anchor")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hover:text-amber-500 font-mono text-[10.5px] transition-colors"
            >
              Developer Access Login
            </button>
            <span>•</span>
            <span className="text-amber-500 font-mono text-[10.5px]">B.Tech AI & Data Science 2027</span>
          </div>
        </div>
      </footer>

      {/* Gemini AI Bot helper */}
      <AIAssistant />
    </div>
  );
}
