import React, { useState, useEffect } from "react";
import { 
  Terminal, ShieldCheck, Mail, Calendar, Eye, Trash2, 
  Sparkles, RefreshCw, Layers, Plus, Save, AlertCircle, 
  CheckCircle, FolderPlus, HelpCircle
} from "lucide-react";
import { ProfileData, Project, ContactMessage } from "../types";
import { motion } from "motion/react";

interface AdminPanelProps {
  onProfileUpdated: (updatedProfile: ProfileData) => void;
}

export default function AdminPanel({ onProfileUpdated }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  // Project creation form state
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    date: "",
    description: "",
    bulletPoints: ["", ""],
    techStack: ["", ""],
    githubUrl: "",
    category: "ml"
  });

  // Load Admin Data on authentication override
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const pRes = await fetch("/api/profile");
      const pData = await pRes.json();
      setProfile(pData);
      
      const mRes = await fetch("/api/messages");
      const mData = await mRes.json();
      setMessages(mData);
    } catch (err) {
      console.error("Error loading admin stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "malleswari2027") {
      setIsAuthenticated(true);
      setErrorMsg("");
      fetchAdminData();
    } else {
      setErrorMsg("Incorrect access passcode. Hint: her graduation year, e.g. malleswari2027");
    }
  };

  // Mark message as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, { method: "PATCH" });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
      }
    } catch (err) {
      console.error("Failed to mark message as read", err);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  // Reset entirely to seed data
  const handleResetProfile = async () => {
    if (!confirm("This will reset any custom added projects, reverting to her default PDF resume state. Continue?")) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile);
        onProfileUpdated(data.profile);
        setSuccessMsg("Profile and AI companion trained back to default seeds!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Failed to reset profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding project fields
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !profile) {
      alert("Project Title and Description are required.");
      return;
    }

    // Clean up empty fields
    const bulletPointsCleaned = (newProject.bulletPoints || []).filter(b => b.trim() !== "");
    const techStackCleaned = (newProject.techStack || []).filter(t => t.trim() !== "");

    const finalProject: Project = {
      id: "p-" + Date.now(),
      title: newProject.title,
      date: newProject.date || "Just Added",
      description: newProject.description,
      bulletPoints: bulletPointsCleaned.length > 0 ? bulletPointsCleaned : ["Successfully loaded project stats into portfolio database."],
      techStack: techStackCleaned.length > 0 ? techStackCleaned : ["Python", "JavaScript"],
      githubUrl: newProject.githubUrl || "https://github.com/Malleswari570",
      category: newProject.category as any || "all"
    };

    const updatedProfile = {
      ...profile,
      projects: [finalProject, ...profile.projects]
    };

    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile)
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile);
        onProfileUpdated(data.profile);
        
        // Reset local form
        setNewProject({
          title: "",
          date: "",
          description: "",
          bulletPoints: ["", ""],
          techStack: ["", ""],
          githubUrl: "",
          category: "ml"
        });
        
        setSuccessMsg(`Project "${finalProject.title}" successfully saved. The AI assistant can now answer questions about it!`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Failed to update projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="admin-control" className="w-full">
      {!isAuthenticated ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto glass-effect rounded-2xl p-6 border border-slate-800 text-center space-y-5"
        >
          <div className="mx-auto w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center animate-pulse">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold font-display text-slate-100">
              Developer Control Room
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Enter the passcode to manage messages, dynamically seed new projects, and update AI parameters.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="password"
                placeholder="Access Passcode (Graduation year style)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-center bg-[#111827] text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <span className="text-[10px] text-gray-500 font-mono inline-block mt-1">
                Passcode hint: <code className="text-amber-500 font-bold">malleswari2027</code>
              </span>
            </div>

            {errorMsg && (
              <div className="text-[11px] text-red-400 font-medium flex items-center gap-1.5 justify-center bg-red-950/10 py-1.5 rounded-lg border border-red-900/20">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" /> Initialize Connection
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Top Banner Control */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-[#111827]/40 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-amber-500 font-mono tracking-wider uppercase block font-bold">
                  Root Connection Verified
                </span>
                <h4 className="text-md font-bold text-slate-100 font-display">
                  Dynamic Node Database Management
                </h4>
                <p className="text-xs text-gray-450">
                  Write directly to her JSON database and train her generative bot instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchAdminData}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] hover:bg-slate-900 text-gray-300 hover:text-white rounded-lg text-xs transition-colors border border-[#1F2937] font-semibold cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} /> Sync Database
              </button>
              <button
                onClick={handleResetProfile}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 hover:bg-red-950/45 text-red-350 rounded-lg text-xs transition-transform border border-red-900/30 font-semibold cursor-pointer"
              >
                Reset Default seeds
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 bg-[#111827] text-gray-400 hover:text-white border border-[#1F2937] hover:bg-[#1F2937] text-xs rounded-lg cursor-pointer"
              >
                Lock Terminal
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-500 flex items-start gap-2.5 text-xs">
              <CheckCircle className="w-4.5 h-4.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Grid Layout of Admin Functions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Form to dynamically append projects to her resume */}
            <div className="glass-effect rounded-2xl p-6 border border-[#1F2937] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]">
                <FolderPlus className="w-5 h-5 text-amber-500" />
                <h5 className="font-bold text-slate-100 text-sm font-display">
                  Dynamic Project Seeder
                </h5>
              </div>

              <form onSubmit={handleAddProject} className="space-y-4 text-xs text-slate-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sales Forecast Predictor"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Date / Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. May 2026 – June 2026"
                      value={newProject.date}
                      onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Summary Description *</label>
                  <textarea
                    required
                    placeholder="Short description summarizing what this project does..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 h-16 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Technology Tag 1</label>
                    <input
                      type="text"
                      placeholder="e.g. PyTorch"
                      value={newProject.techStack?.[0]}
                      onChange={(e) => {
                        const copy = [...(newProject.techStack || [])];
                        copy[0] = e.target.value;
                        setNewProject({ ...newProject, techStack: copy });
                      }}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Technology Tag 2</label>
                    <input
                      type="text"
                      placeholder="e.g. Node.js"
                      value={newProject.techStack?.[1]}
                      onChange={(e) => {
                        const copy = [...(newProject.techStack || [])];
                        copy[1] = e.target.value;
                        setNewProject({ ...newProject, techStack: copy });
                      }}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">GitHub Demo Link</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-450 font-medium mb-1 uppercase tracking-wide text-[10px] font-mono">Category Layer</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full bg-[#111827] text-slate-100 px-3 py-2.5 rounded-lg border border-[#1F2937] focus:outline-none"
                    >
                      <option value="ml">Machine Learning (ML)</option>
                      <option value="web">Web Application (Web)</option>
                      <option value="nlp">Natural Language & Chat (NLP)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-450 font-medium uppercase tracking-wide text-[10px] font-mono">Core accomplishments / Details (Bulletpoints)</label>
                  <input
                    type="text"
                    required
                    placeholder="Bullet point 1: Designed custom mathematical architectures to predict outcomes."
                    value={newProject.bulletPoints?.[0]}
                    onChange={(e) => {
                      const copy = [...(newProject.bulletPoints || [])];
                      copy[0] = e.target.value;
                      setNewProject({ ...newProject, bulletPoints: copy });
                    }}
                    className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Bullet point 2 (Optional): Performed deep statistical visualizations and metric audits."
                    value={newProject.bulletPoints?.[1]}
                    onChange={(e) => {
                      const copy = [...(newProject.bulletPoints || [])];
                      copy[1] = e.target.value;
                      setNewProject({ ...newProject, bulletPoints: copy });
                    }}
                    className="w-full bg-[#111827] text-slate-100 px-3 py-2 rounded-lg border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Seed Project Into DB
                </button>
              </form>
            </div>

            {/* Message logs panel */}
            <div className="glass-effect rounded-2xl p-6 border border-[#1F2937] flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#1F2937] shrink-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <h5 className="font-bold text-slate-100 text-sm font-display">
                    Visitor Inbound Mailroom
                  </h5>
                </div>
                <span className="text-[10px] font-mono bg-[#111827] px-2.5 py-1 rounded-full text-amber-500 border border-[#1F2937] font-bold">
                  {messages.length} Messages Logged
                </span>
              </div>

              {/* Message scroll list */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1 text-xs">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                    <Mail className="w-10 h-10 stroke-1 stroke-gray-500 mb-2" />
                    <p className="font-bold">No messages in database.</p>
                    <p className="text-[10px] text-gray-500 mt-1">Submit a test message via the Contact form!</p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div 
                      key={m.id} 
                      className={`p-3.5 rounded-xl border transition-all ${
                        m.isRead 
                          ? "bg-slate-950/25 border-[#1F2937] text-gray-400" 
                          : "bg-slate-900 border-[#1F2937] text-slate-200 ring-1 ring-amber-500/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-bold text-[#E5E7EB] block text-xs">{m.name}</span>
                          <span className="text-gray-400 font-mono text-[10px]">{m.email}</span>
                        </div>
                        <div className="text-right text-[10px] text-gray-500">
                          <span className="flex items-center gap-1 font-mono"><Calendar className="w-3" /> {new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 bg-[#111827] px-2.5 py-2 rounded border border-[#1F2937]/40 font-serif leading-relaxed text-slate-300">
                        <span className="font-bold block text-slate-300 font-sans text-[10.5px] border-b border-[#1F2937] pb-1 mb-1">Obj: {m.subject}</span>
                        {m.message}
                      </div>

                      <div className="mt-3 flex items-center justify-end gap-2 text-[10px]">
                        {!m.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(m.id)}
                            className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-500 font-bold hover:bg-amber-500/20 transition-colors cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="p-1 px-1.5 text-red-400 hover:bg-red-950/20 rounded hover:text-red-300 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
