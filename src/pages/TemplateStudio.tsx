import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Download, Edit3 } from "lucide-react";

const templates = [
  { id: "swe", title: "Software Developer", color: "from-blue-500 to-cyan-500" },
  { id: "ds", title: "Data Scientist", color: "from-purple-500 to-pink-500" },
  { id: "be", title: "Backend Developer", color: "from-green-500 to-emerald-500" },
  { id: "fe", title: "Frontend Developer", color: "from-orange-500 to-yellow-500" },
  { id: "cyber", title: "Cybersecurity Analyst", color: "from-red-500 to-rose-500" },
  { id: "cloud", title: "Cloud Engineer", color: "from-sky-500 to-indigo-500" },
  { id: "pm", title: "Product Manager", color: "from-violet-500 to-purple-500" },
  { id: "ba", title: "Business Analyst", color: "from-teal-500 to-green-500" },
  { id: "devops", title: "DevOps Engineer", color: "from-amber-500 to-orange-500" },
  { id: "mobile", title: "Mobile Developer", color: "from-pink-500 to-rose-500" },
  { id: "ml", title: "ML Engineer", color: "from-indigo-500 to-blue-500" },
  { id: "qa", title: "QA Engineer", color: "from-lime-500 to-green-500" },
  { id: "arch", title: "Solutions Architect", color: "from-cyan-500 to-teal-500" },
  { id: "tic", title: "Technical Writer", color: "from-slate-500 to-gray-500" },
  { id: "tic2", title: "UX Designer", color: "from-fuchsia-500 to-pink-500" },
];

interface ResumeFields {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  experience: string;
  projects: string;
  certifications: string;
  achievements: string;
}

const emptyFields: ResumeFields = {
  name: "", email: "", phone: "", education: "", skills: "", experience: "", projects: "", certifications: "", achievements: "",
};

const TemplateStudio = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [fields, setFields] = useState<ResumeFields>(emptyFields);

  const selectedTemplate = templates.find(t => t.id === selected);

  const updateField = (key: keyof ResumeFields, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Resume Template Studio</h1>
        <p className="text-muted-foreground mt-1">Choose from 15 ATS-friendly templates and customize.</p>
      </motion.div>

      {!selected ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(t.id)}
              className="glass-card rounded-xl p-4 text-center hover:shadow-glow transition-all group"
            >
              <div className={`w-full h-24 rounded-lg bg-gradient-to-br ${t.color} opacity-80 group-hover:opacity-100 transition-opacity mb-3 flex items-center justify-center`}>
                <Palette className="w-8 h-8 text-foreground/80" />
              </div>
              <p className="text-xs font-medium text-foreground">{t.title}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" /> Edit: {selectedTemplate?.title}
              </h2>
              <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-foreground">
                ← Back to templates
              </button>
            </div>
            <div className="glass-card rounded-xl p-5 space-y-3">
              {(Object.keys(fields) as Array<keyof ResumeFields>).map(key => (
                <div key={key}>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                    {key}
                  </label>
                  {["education", "skills", "experience", "projects", "certifications", "achievements"].includes(key) ? (
                    <textarea
                      className="w-full h-20 bg-secondary border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder={`Enter ${key}...`}
                      value={fields[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  ) : (
                    <input
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder={`Enter ${key}...`}
                      value={fields[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Preview</h2>
            <div className="bg-foreground/95 text-background rounded-xl p-8 min-h-[600px] shadow-card" style={{ fontFamily: "var(--font-display)" }}>
              <div className={`h-1.5 rounded-full bg-gradient-to-r ${selectedTemplate?.color} mb-6`} />
              <h2 className="text-2xl font-bold">{fields.name || "Your Name"}</h2>
              <p className="text-sm opacity-70 mt-1">{[fields.email, fields.phone].filter(Boolean).join(" • ") || "email@example.com • +1 234 567 890"}</p>
              
              {fields.education && (
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Education</h3>
                  <p className="text-sm whitespace-pre-line">{fields.education}</p>
                </div>
              )}
              {fields.skills && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {fields.skills.split(",").map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs rounded bg-background/10">{s.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
              {fields.experience && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Experience</h3>
                  <p className="text-sm whitespace-pre-line">{fields.experience}</p>
                </div>
              )}
              {fields.projects && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Projects</h3>
                  <p className="text-sm whitespace-pre-line">{fields.projects}</p>
                </div>
              )}
              {fields.certifications && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Certifications</h3>
                  <p className="text-sm whitespace-pre-line">{fields.certifications}</p>
                </div>
              )}
              {fields.achievements && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Achievements</h3>
                  <p className="text-sm whitespace-pre-line">{fields.achievements}</p>
                </div>
              )}
            </div>
            <button className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateStudio;
