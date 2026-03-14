import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Code, Briefcase, Award, Layout, Search, Zap, FileText, AlertTriangle } from "lucide-react";

const cards = [
  {
    icon: GraduationCap, title: "Education Guide",
    explanation: "List degrees in reverse chronological order. Include institution, degree, major, and graduation date.",
    example: "B.S. Computer Science, MIT, May 2023 | GPA: 3.8/4.0",
    bestPractice: "Include relevant coursework only if you're a recent graduate.",
    tip: "Recruiters spend 2 seconds on education — make it scannable.",
  },
  {
    icon: Code, title: "Skills Guide",
    explanation: "Group skills by category: Languages, Frameworks, Tools, Platforms.",
    example: "Languages: Python, JavaScript, TypeScript | Frameworks: React, Django | Tools: Docker, Git",
    bestPractice: "Only list skills you can discuss confidently in an interview.",
    tip: "Match skills to the job description keywords for ATS optimization.",
  },
  {
    icon: Briefcase, title: "Projects Guide",
    explanation: "Describe projects with context, technology, and measurable impact.",
    example: "Built a real-time chat app using React and WebSocket, supporting 500+ concurrent users.",
    bestPractice: "Use the STAR method: Situation, Task, Action, Result.",
    tip: "Unique projects stand out more than common tutorial clones.",
  },
  {
    icon: Briefcase, title: "Experience Guide",
    explanation: "Focus on achievements, not responsibilities. Use action verbs and quantify results.",
    example: "Reduced API response time by 40% by implementing Redis caching layer.",
    bestPractice: "Start each bullet with a strong action verb (Led, Built, Optimized).",
    tip: "Quantified achievements are 3x more impactful to recruiters.",
  },
  {
    icon: Award, title: "Certification Guide",
    explanation: "Include relevant industry certifications with issuing body and date.",
    example: "AWS Solutions Architect Associate — Amazon Web Services, Jan 2024",
    bestPractice: "Only include certifications relevant to your target role.",
    tip: "Certifications can compensate for lack of formal education in some fields.",
  },
  {
    icon: Layout, title: "Portfolio Guide",
    explanation: "Link to a clean, professional portfolio showcasing your best 3-5 projects.",
    example: "Portfolio: johndoe.dev | GitHub: github.com/johndoe",
    bestPractice: "Ensure all links are working and projects are deployed.",
    tip: "A live demo is worth 1000 lines of code on a resume.",
  },
  {
    icon: Search, title: "ATS Optimization Guide",
    explanation: "Use standard section headings, avoid tables/graphics, and include keywords from the job description.",
    example: "Use 'Experience' not 'Where I've Worked'. Use 'Skills' not 'My Toolbox'.",
    bestPractice: "Submit in PDF format with machine-readable text (not scanned images).",
    tip: "75% of resumes are rejected by ATS before a human sees them.",
  },
  {
    icon: Zap, title: "Action Verb Guide",
    explanation: "Replace weak verbs with powerful action verbs to convey impact.",
    example: "Weak: Worked on → Strong: Engineered, Architected, Spearheaded",
    bestPractice: "Vary your verbs — don't start every bullet with 'Developed'.",
    tip: "Action verbs signal leadership and initiative to recruiters.",
  },
  {
    icon: FileText, title: "Resume Formatting Guide",
    explanation: "Use clean fonts (11-12pt), consistent spacing, and clear visual hierarchy.",
    example: "Font: Calibri 11pt | Margins: 0.5-1 inch | Length: 1 page (entry) or 2 pages (senior)",
    bestPractice: "Use bold for headers, consistent bullet style, and ample white space.",
    tip: "A cluttered resume signals poor communication skills.",
  },
  {
    icon: AlertTriangle, title: "Common Resume Mistakes",
    explanation: "Avoid generic objectives, typos, irrelevant info, and excessive length.",
    example: "Bad: 'Seeking a challenging position' → Good: Skip the objective, add a strong summary.",
    bestPractice: "Proofread 3 times and have someone else review before submitting.",
    tip: "58% of resumes contain typos — instant rejection for many recruiters.",
  },
];

const KnowledgeHub = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Resume Knowledge Hub</h1>
        <p className="text-muted-foreground mt-1">Expert guides to build a winning resume.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <card.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{card.explanation}</p>
            <div className="bg-secondary rounded-lg p-3 mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Example</p>
              <p className="text-xs text-foreground" style={{ fontFamily: "var(--font-mono)" }}>{card.example}</p>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground"><strong className="text-foreground">Best Practice:</strong> {card.bestPractice}</p>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-3.5 h-3.5 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground"><strong className="text-foreground">Recruiter Tip:</strong> {card.tip}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeHub;
