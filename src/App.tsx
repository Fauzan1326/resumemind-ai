import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import ResumeAnalyzer from "@/pages/ResumeAnalyzer";
import SkillGap from "@/pages/SkillGap";
import MarketBenchmark from "@/pages/MarketBenchmark";
import AIInterview from "@/pages/AIInterview";
import TemplateStudio from "@/pages/TemplateStudio";
import KnowledgeHub from "@/pages/KnowledgeHub";
import UserHistory from "@/pages/UserHistory";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/benchmark" element={<MarketBenchmark />} />
            <Route path="/interview" element={<AIInterview />} />
            <Route path="/templates" element={<TemplateStudio />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/history" element={<UserHistory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
