import { motion } from "framer-motion";
import { FileSearch, Target, BarChart3, MessageSquare, Upload, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";

const quickActions = [
  { label: "Analyze Resume", icon: FileSearch, path: "/analyzer", color: "gradient-primary" },
  { label: "Skill Gap Report", icon: Target, path: "/skill-gap", color: "gradient-accent" },
  { label: "Market Benchmark", icon: BarChart3, path: "/benchmark", color: "gradient-primary" },
  { label: "AI Interview", icon: MessageSquare, path: "/interview", color: "gradient-accent" },
];

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to ResumeMind AI — your career intelligence hub.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Upload} label="Resumes Analyzed" value={0} subtext="Upload to get started" />
        <StatCard icon={TrendingUp} label="Avg Score" value="—" subtext="No data yet" />
        <StatCard icon={Target} label="Skills Matched" value="—" subtext="No data yet" />
        <StatCard icon={BarChart3} label="ATS Score" value="—" subtext="No data yet" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={action.path}
                className="glass-card rounded-xl p-5 flex flex-col items-center gap-3 hover:shadow-glow transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-8 text-center">
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Get Started</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Upload your resume to unlock AI-powered analysis, scoring, and career insights.
        </p>
        <Link
          to="/analyzer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <FileSearch className="w-4 h-4" />
          Analyze Resume
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
