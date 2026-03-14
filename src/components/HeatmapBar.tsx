import { motion } from "framer-motion";

interface HeatmapBarProps {
  label: string;
  value: number;
  maxValue: number;
  delay?: number;
}

const HeatmapBar = ({ label, value, maxValue, delay = 0 }: HeatmapBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
          {value}/{maxValue}
        </span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default HeatmapBar;
