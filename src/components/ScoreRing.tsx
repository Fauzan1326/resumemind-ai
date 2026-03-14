import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  size?: number;
  label?: string;
  className?: string;
}

const ScoreRing = ({ score, maxScore, size = 120, label, className = "" }: ScoreRingProps) => {
  const percentage = (score / maxScore) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return "hsl(var(--success))";
    if (percentage >= 50) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--border))"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-mono)" }}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ {maxScore}</span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
    </div>
  );
};

export default ScoreRing;
