import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import ScoreRing from "@/components/ScoreRing";
import HeatmapBar from "@/components/HeatmapBar";

const industryData: Record<string, string[]> = {
  "AI Engineer": ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP", "SQL", "Docker", "MLOps", "Computer Vision", "Machine Learning"],
  "Software Engineer": ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Docker", "AWS", "CI/CD", "REST"],
  "Data Scientist": ["Python", "SQL", "Machine Learning", "TensorFlow", "Statistics", "Pandas", "Data Visualization", "R", "Deep Learning", "Big Data"],
  "Frontend Developer": ["JavaScript", "TypeScript", "React", "CSS", "HTML", "Tailwind", "Vue", "Next.js", "Figma", "Testing"],
  "Backend Developer": ["Node.js", "Python", "Java", "SQL", "PostgreSQL", "Docker", "REST", "GraphQL", "Redis", "Microservices"],
};

const MarketBenchmark = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState<{ industry: string[]; candidate: string[]; missing: string[]; score: number } | null>(null);

  const benchmark = () => {
    const userSkills = skills.split(",").map(s => s.trim()).filter(Boolean);
    const ind = industryData[role] || [];
    const matched = ind.filter(i => userSkills.some(u => u.toLowerCase().includes(i.toLowerCase())));
    const miss = ind.filter(i => !userSkills.some(u => u.toLowerCase().includes(i.toLowerCase())));
    const score = Math.round((matched.length / ind.length) * 100);
    setResult({ industry: ind, candidate: matched, missing: miss, score });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Market Benchmark</h1>
        <p className="text-muted-foreground mt-1">Compare your profile against industry standards.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Target Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">Select a role...</option>
            {Object.keys(industryData).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Your Skills (comma-separated)</label>
          <textarea className="w-full h-24 bg-secondary border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g., Python, TensorFlow, SQL..." value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <button onClick={benchmark} disabled={!role || !skills.trim()} className="px-8 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          Run Benchmark
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card rounded-xl p-6 flex items-center gap-8">
            <ScoreRing score={result.score} maxScore={100} size={120} label="Competitiveness" />
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Target: {role}</h3>
              </div>
              <HeatmapBar label="Skill Coverage" value={result.candidate.length} maxValue={result.industry.length} />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{result.candidate.length} of {result.industry.length} industry skills matched</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Industry Average Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.industry.map(s => <span key={s} className="px-2.5 py-1 bg-secondary text-xs text-secondary-foreground rounded-md">{s}</span>)}
              </div>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Your Matched Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.candidate.map(s => <span key={s} className="px-2.5 py-1 bg-success/10 text-success text-xs rounded-md">{s}</span>)}
                {result.candidate.length === 0 && <p className="text-xs text-muted-foreground">None matched</p>}
              </div>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Missing Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map(s => <span key={s} className="px-2.5 py-1 bg-destructive/10 text-destructive text-xs rounded-md">{s}</span>)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MarketBenchmark;
