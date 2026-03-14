import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  Target,
  BarChart3,
  MessageSquare,
  Palette,
  BookOpen,
  History,
  Brain,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Resume Analyzer", icon: FileSearch, path: "/analyzer" },
  { label: "Skill Gap Report", icon: Target, path: "/skill-gap" },
  { label: "Market Benchmark", icon: BarChart3, path: "/benchmark" },
  { label: "AI Interview", icon: MessageSquare, path: "/interview" },
  { label: "Template Studio", icon: Palette, path: "/templates" },
  { label: "Knowledge Hub", icon: BookOpen, path: "/knowledge" },
  { label: "History", icon: History, path: "/history" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight">ResumeMind</h1>
            <p className="text-xs text-muted-foreground">AI Intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-primary shadow-glow"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card rounded-lg p-3">
          <p className="text-xs font-medium text-foreground">Pro Tip</p>
          <p className="text-xs text-muted-foreground mt-1">Upload your resume to get AI-powered insights</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
