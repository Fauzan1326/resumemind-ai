import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, User, Mail, Phone, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Star, Hash } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";
import ScoreRing from "@/components/ScoreRing";
import HeatmapBar from "@/components/HeatmapBar";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: string[];
  skills: string[];
  experience: string[];
  projects: string[];
  certifications: string[];
  achievements: string[];
  keywords: string[];
}

interface ResumeScores {
  overall: number;
  clarity: number;
  keywords: number;
  projects: number;
  ats: number;
  formatting: number;
  impact: number;
}

const extractResumeData = (text: string): ResumeData => {
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/[\+]?[\d\s\-().]{10,}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const name = lines[0] || "Unknown";

  const extractSection = (headers: string[]): string[] => {
    const items: string[] = [];
    let capturing = false;
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (headers.some(h => lower.includes(h))) { capturing = true; continue; }
      if (capturing) {
        if (/^[A-Z]{2,}/.test(line) && line.length < 40 && !line.includes("•") && !line.includes("-")) break;
        if (line.length > 3) items.push(line.replace(/^[-•*]\s*/, ""));
      }
    }
    return items.slice(0, 10);
  };

  const skillKeywords = text.match(/\b(Python|Java|JavaScript|TypeScript|React|Node\.js|SQL|Docker|AWS|Azure|TensorFlow|PyTorch|Git|Linux|C\+\+|Go|Rust|Kubernetes|MongoDB|PostgreSQL|Redis|GraphQL|REST|HTML|CSS|Flutter|Swift|Kotlin|Vue|Angular|Django|Flask|Spring|Express|Next\.js|Tailwind|Firebase|GCP|CI\/CD|Agile|Scrum|Machine Learning|Deep Learning|NLP|Computer Vision|Data Science|DevOps|Microservices|API|Blockchain)\b/gi) || [];

  return {
    name,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0]?.trim() || "",
    linkedin: linkedinMatch?.[0] || "",
    github: githubMatch?.[0] || "",
    education: extractSection(["education", "academic", "degree", "university"]),
    skills: [...new Set(skillKeywords.map(s => s.trim()))],
    experience: extractSection(["experience", "work history", "employment", "professional"]),
    projects: extractSection(["project", "portfolio"]),
    certifications: extractSection(["certification", "certificate", "licensed"]),
    achievements: extractSection(["achievement", "award", "honor", "accomplishment"]),
    keywords: [...new Set(skillKeywords.map(s => s.toLowerCase()))],
  };
};

const scoreResume = (data: ResumeData, text: string): ResumeScores => {
  const hasActionVerbs = /\b(developed|built|designed|implemented|created|led|managed|optimized|improved|launched|engineered|architected|deployed|automated|reduced|increased)\b/gi;
  const actionVerbCount = (text.match(hasActionVerbs) || []).length;
  const hasNumbers = (text.match(/\d+%|\d+x|\$\d+/g) || []).length;

  const clarity = Math.min(10, Math.round((data.education.length > 0 ? 2 : 0) + (data.experience.length > 0 ? 3 : 0) + (data.skills.length > 3 ? 3 : data.skills.length) + (actionVerbCount > 3 ? 2 : 1)));
  const keywords = Math.min(10, Math.round(data.skills.length * 0.7));
  const projects = Math.min(10, data.projects.length * 2.5);
  const formatting = Math.min(10, (data.email ? 2 : 0) + (data.phone ? 1 : 0) + (data.linkedin ? 2 : 0) + (data.education.length > 0 ? 2 : 0) + (data.experience.length > 0 ? 3 : 0));
  const impact = Math.min(10, actionVerbCount * 0.8 + hasNumbers * 1.5);
  const ats = Math.min(10, keywords * 0.5 + formatting * 0.3 + (data.skills.length > 5 ? 2 : 1));
  const overall = Math.round((clarity + keywords + projects + ats + formatting + impact) / 6 * 10) / 10;

  return { overall, clarity, keywords: Math.round(keywords * 10) / 10, projects: Math.round(projects * 10) / 10, ats: Math.round(ats * 10) / 10, formatting: Math.round(formatting * 10) / 10, impact: Math.round(impact * 10) / 10 };
};

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [scores, setScores] = useState<ResumeScores | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);


  const analyze = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const data = extractResumeData(resumeText);
      const sc = scoreResume(data, resumeText);
      setResumeData(data);
      setScores(sc);
      setIsAnalyzing(false);
    }, 1500);
  };

  const contactFields = resumeData ? [
    { icon: User, label: "Name", value: resumeData.name },
    { icon: Mail, label: "Email", value: resumeData.email },
    { icon: Phone, label: "Phone", value: resumeData.phone },
    { icon: Linkedin, label: "LinkedIn", value: resumeData.linkedin },
    { icon: Github, label: "GitHub", value: resumeData.github },
  ] : [];

  const sections = resumeData ? [
    { icon: GraduationCap, label: "Education", items: resumeData.education },
    { icon: Code, label: "Skills", items: resumeData.skills },
    { icon: Briefcase, label: "Experience", items: resumeData.experience },
    { icon: Star, label: "Projects", items: resumeData.projects },
    { icon: Award, label: "Certifications", items: resumeData.certifications },
    { icon: Hash, label: "Keywords", items: resumeData.keywords },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Resume Analyzer</h1>
        <p className="text-muted-foreground mt-1">Upload your resume for AI-powered analysis and scoring.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <FileUploadZone
              onTextExtracted={(text) => setResumeText(text)}
              showTextarea
              textareaValue={resumeText}
              onTextareaChange={setResumeText}
            />
          </div>
          <button
            onClick={analyze}
            disabled={!resumeText.trim() || isAnalyzing}
            className="px-8 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {resumeData && scores && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Scores */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Resume Score</h2>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <ScoreRing score={scores.overall} maxScore={10} size={140} label="Overall" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <ScoreRing score={scores.clarity} maxScore={10} size={80} label="Clarity" />
                  <ScoreRing score={scores.keywords} maxScore={10} size={80} label="Keywords" />
                  <ScoreRing score={scores.projects} maxScore={10} size={80} label="Projects" />
                  <ScoreRing score={scores.ats} maxScore={10} size={80} label="ATS" />
                  <ScoreRing score={scores.formatting} maxScore={10} size={80} label="Format" />
                  <ScoreRing score={scores.impact} maxScore={10} size={80} label="Impact" />
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resume Heatmap</h2>
              <div className="space-y-3">
                <HeatmapBar label="Skills" value={resumeData.skills.length} maxValue={15} delay={0} />
                <HeatmapBar label="Projects" value={resumeData.projects.length} maxValue={5} delay={0.1} />
                <HeatmapBar label="Experience" value={resumeData.experience.length} maxValue={8} delay={0.2} />
                <HeatmapBar label="Keywords" value={resumeData.keywords.length} maxValue={15} delay={0.3} />
                <HeatmapBar label="ATS Compliance" value={Math.round(scores.ats * 10)} maxValue={100} delay={0.4} />
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Extracted Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contactFields.map((field) => (
                  <div key={field.label} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <field.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      <p className="text-sm text-foreground truncate">{field.value || "Not found"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.label} className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{section.label}</h3>
                    <span className="text-xs text-muted-foreground ml-auto" style={{ fontFamily: "var(--font-mono)" }}>
                      {section.items.length}
                    </span>
                  </div>
                  {section.items.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {section.items.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 bg-secondary text-xs text-secondary-foreground rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No data extracted</p>
                  )}
                </div>
              ))}
            </div>

            {/* ATS Result */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">ATS Compatibility</h2>
              <div className="flex items-center gap-4">
                <ScoreRing score={Math.round(scores.ats * 10)} maxScore={100} size={100} label="ATS Score" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {scores.ats >= 6 ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {scores.ats >= 6 ? "Likely ATS Pass" : "Likely ATS Reject — Improve keywords & structure"}
                    </span>
                  </div>
                  {scores.ats < 6 && (
                    <p className="text-xs text-muted-foreground">Consider adding more relevant keywords and ensuring clear section headings.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeAnalyzer;
