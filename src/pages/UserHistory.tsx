import { motion } from "framer-motion";
import { History as HistoryIcon, FileText } from "lucide-react";

const UserHistory = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">History</h1>
        <p className="text-muted-foreground mt-1">View your past resume analyses and results.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-12 text-center">
        <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">No History Yet</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Your analysis history will appear here once you start analyzing resumes. Enable Lovable Cloud to persist your data.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Analyses are stored locally in this session</span>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
