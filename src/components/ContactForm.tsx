import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { motion } from "motion/react";

interface ContactFormProps {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export default function ContactForm({ email, phone, location, linkedin, github }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, text: "All fields except subject are required." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ success: true, text: data.message || "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to submit message");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus({ success: false, text: err.message || "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Visual coordinates card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div>
          <span className="text-amber-500 text-xs font-semibold tracking-wider font-mono uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Let's Collaborate
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-100 mt-3">
            Contact Information
          </h3>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            I am open to machine learning projects, web integrations, remote internships, and conversations on AI architectures. Please reach out!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#111827] text-amber-500 shrink-0 border border-[#1F2937]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium font-sans">Email Address</span>
              <p className="text-slate-200 text-sm select-all font-mono">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#111827] text-amber-500 shrink-0 border border-[#1F2937]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium font-sans">Phone Support</span>
              <p className="text-slate-200 text-sm select-all font-mono">+{phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#111827] text-amber-500 shrink-0 border border-[#1F2937]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium font-sans">Permanent Location</span>
              <p className="text-slate-200 text-sm font-sans">{location}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1F2937]">
          <span className="text-xs font-bold text-gray-500 tracking-wider font-mono uppercase block mb-3">
            Connect Worldwide
          </span>
          <div className="flex items-center gap-3">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-slate-900 text-gray-300 hover:text-amber-500 border border-[#1F2937] hover:border-amber-500/40 rounded-xl text-xs transition-all font-semibold"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-slate-900 text-gray-300 hover:text-amber-500 border border-[#1F2937] hover:border-amber-500/40 rounded-xl text-xs transition-all font-semibold"
            >
              <Github className="w-4 h-4 text-slate-200" />
              GitHub Repo
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main interactive form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-2xl p-6 md:p-8"
      >
        <h4 className="text-lg font-bold text-slate-100 mb-6 font-display flex items-center gap-2">
          Send a Secure Message
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide font-mono">
                Your Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Steve Jobs"
                className="w-full bg-[#111827]/80 text-[#E5E7EB] text-sm px-3.5 py-2.5 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide font-mono">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="steve@apple.com"
                className="w-full bg-[#111827]/80 text-[#E5E7EB] text-sm px-3.5 py-2.5 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide font-mono">
              Subject Line
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Collaboration Proposal / Greeting"
              className="w-full bg-[#111827]/80 text-[#E5E7EB] text-sm px-3.5 py-2.5 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide font-mono">
              Message Content *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your email proposal, or greeting here..."
              className="w-full bg-[#111827]/80 text-[#E5E7EB] text-sm px-3.5 py-3 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans resize-none"
            />
          </div>

          {status && (
            <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs ${
              status.success 
                ? "bg-amber-950/20 border border-amber-900/40 text-amber-500" 
                : "bg-red-950/20 border border-red-900/40 text-red-400"
            }`}>
              {status.success ? <CheckCircle2 className="w-4.5 h-4.5 shrink-0" /> : <AlertCircle className="w-4.5 h-4.5 shrink-0" />}
              <span className="leading-normal">{status.text}</span>
            </div>
          )}

          <button
            type="submit"
            id="submit-contact-form"
            disabled={isSubmitting}
            className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all focus:outline-none disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Dispatch Message
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
