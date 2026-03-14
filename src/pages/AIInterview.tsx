import { useState } from "react";
import { motion } from "framer-motion";
import { User, Send, Bot } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";

const personas = [
  { id: "bigtech", label: "Big Tech Recruiter", prompt: "As a FAANG recruiter, I focus on system design, algorithms, and leadership." },
  { id: "startup", label: "Startup Founder", prompt: "As a startup founder, I look for scrappiness, breadth, and speed of execution." },
  { id: "hr", label: "HR Manager", prompt: "As an HR manager, I evaluate cultural fit, communication, and growth potential." },
  { id: "tech", label: "Technical Interviewer", prompt: "As a technical interviewer, I deep-dive into architecture, code quality, and problem solving." },
];

const generateQuestions = (persona: string, resumeText: string): string[] => {
  const skills = resumeText.match(/\b(Python|Java|JavaScript|React|Node\.js|SQL|Docker|AWS|TensorFlow|Machine Learning|Deep Learning|Kubernetes|GraphQL|REST)\b/gi) || [];
  const projects = resumeText.split("\n").filter(l => l.length > 20).slice(0, 3);
  const uniqueSkills = [...new Set(skills.map(s => s.trim()))];

  const base = [
    "Tell me about yourself and what excites you about this role.",
    `I see you have experience with ${uniqueSkills.slice(0, 3).join(", ") || "various technologies"}. Which one are you most proficient in and why?`,
  ];

  if (persona === "bigtech") {
    base.push("How would you design a distributed system that handles millions of requests per second?");
    base.push("Describe a time you had to make a difficult technical tradeoff.");
    if (projects[0]) base.push(`Regarding "${projects[0].slice(0, 60)}..." — what was the most challenging technical decision?`);
  } else if (persona === "startup") {
    base.push("How do you prioritize when everything is urgent?");
    base.push("Tell me about something you built from scratch with limited resources.");
    base.push("How do you handle ambiguity in product requirements?");
  } else if (persona === "hr") {
    base.push("Describe a conflict you had with a teammate and how you resolved it.");
    base.push("Where do you see yourself in 3 years?");
    base.push("What kind of work environment brings out your best work?");
  } else {
    base.push(`How would you implement a caching layer for a ${uniqueSkills[0] || "web"} application?`);
    base.push("Walk me through how you debug a production issue.");
    base.push("What's your approach to writing testable code?");
  }

  return base;
};

const AIInterview = () => {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeQuestion, setActiveQuestion] = useState(0);

  const startInterview = () => {
    if (!selectedPersona || !resumeText.trim()) return;
    const qs = generateQuestions(selectedPersona, resumeText);
    setQuestions(qs);
    setActiveQuestion(0);
    setAnswers({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">AI Interview</h1>
        <p className="text-muted-foreground mt-1">Practice interviews with AI recruiter personas.</p>
      </motion.div>

      {questions.length === 0 ? (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6">
            <label className="text-sm font-medium text-foreground block mb-3">Select Interviewer</label>
            <div className="grid grid-cols-2 gap-3">
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedPersona === p.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-secondary hover:border-primary/30"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.prompt}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <label className="text-sm font-medium text-foreground block mb-2">Upload or Paste Your Resume</label>
            <FileUploadZone
              onTextExtracted={(text) => setResumeText(text)}
              showTextarea
              textareaValue={resumeText}
              onTextareaChange={setResumeText}
              textareaPlaceholder="Or paste your resume text here..."
              compact
            />
          </div>
          <button onClick={startInterview} disabled={!selectedPersona || !resumeText.trim()} className="px-8 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            Start Interview
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuestion(i)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeQuestion === i ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Q{i + 1}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{personas.find(p => p.id === selectedPersona)?.label}</p>
                <p className="text-sm text-foreground">{questions[activeQuestion]}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full h-28 bg-secondary border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Type your answer..."
                  value={answers[activeQuestion] || ""}
                  onChange={(e) => setAnswers({ ...answers, [activeQuestion]: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setQuestions([])} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Restart
              </button>
              {activeQuestion < questions.length - 1 && (
                <button onClick={() => setActiveQuestion(activeQuestion + 1)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-medium">
                  Next <Send className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterview;
