import { useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import HeatmapBar from "@/components/HeatmapBar";

const roleSkillMap: Record<string, string[]> = {
  "Software Engineer": ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Docker", "AWS", "CI/CD", "REST", "GraphQL", "Agile"],
  "Data Scientist": ["Python", "SQL", "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Data Visualization", "Statistics", "Deep Learning"],
  "Frontend Developer": ["JavaScript", "TypeScript", "React", "CSS", "HTML", "Tailwind", "Vue", "Angular", "Next.js", "Responsive Design"],
  "Backend Developer": ["Node.js", "Python", "Java", "SQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "REST", "GraphQL", "Microservices"],
  "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform", "Ansible", "Monitoring", "Git", "Python"],
  "AI Engineer": ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP", "Computer Vision", "Machine Learning", "SQL", "Docker", "MLOps"],
  "Product Manager": ["Agile", "Scrum", "Data Analysis", "SQL", "User Research", "A/B Testing", "Roadmapping", "Stakeholder Management"],
  "Cybersecurity Analyst": ["Linux", "Python", "Network Security", "SIEM", "Penetration Testing", "Firewalls", "Encryption", "Compliance", "Incident Response"],
};

const SkillGap = () => {
  const [role, setRole] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [result, setResult] = useState<{ present: string[]; missing: string[]; recommended: string[] } | null>(null);

  const analyze = () => {
    const skills = userSkills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    const required = roleSkillMap[role] || [];
    const present = required.filter(r => skills.some(s => s.includes(r.toLowerCase())));
    const missing = required.filter(r => !skills.some(s => s.includes(r.toLowerCase())));
    const recommended = missing.slice(0, 5);
    setResult({ present, missing, recommended });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Skill Gap Report</h1>
        <p className="text-muted-foreground mt-1">Compare your skills against target role requirements.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Target Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select a role...</option>
            {Object.keys(roleSkillMap).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Your Skills (comma-separated)</label>
          <textarea
            className="w-full h-24 bg-secondary border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g., Python, React, SQL, Docker..."
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
          />
        </div>
        <button onClick={analyze} disabled={!role || !userSkills.trim()} className="px-8 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          Analyze Gap
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Job Match
            </h2>
            <HeatmapBar label="Match Score" value={result.present.length} maxValue={result.present.length + result.missing.length} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" /> Present Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.present.map(s => <span key={s} className="px-2.5 py-1 bg-success/10 text-success text-xs rounded-md">{s}</span>)}
                {result.present.length === 0 && <p className="text-xs text-muted-foreground">None matched</p>}
              </div>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map(s => <span key={s} className="px-2.5 py-1 bg-destructive/10 text-destructive text-xs rounded-md">{s}</span>)}
              </div>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-warning" /> Recommended
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.recommended.map(s => <span key={s} className="px-2.5 py-1 bg-warning/10 text-warning text-xs rounded-md">{s}</span>)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillGap;
