import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface GoalProgressBarProps {
  current: number;
  start: number;
  goal: number;
  unit?: string;
}

const GoalProgressBar = ({ current, start, goal, unit = "kg" }: GoalProgressBarProps) => {
  const totalChange = Math.abs(goal - start);
  const currentChange = Math.abs(current - start);
  const pct = Math.min((currentChange / totalChange) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Target size={16} style={{ color: "#00F5A0" }} />
        <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase">
          Weight Goal
        </h3>
      </div>
      <div className="flex justify-between text-xs text-muted-custom mb-2">
        <span>{start}{unit}</span>
        <span className="font-display font-semibold text-sm" style={{ color: "#00F5A0" }}>
          {current}{unit}
        </span>
        <span>{goal}{unit}</span>
      </div>
      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #00F5A0, #00D9F5)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-custom mt-2 text-center">
        {pct.toFixed(0)}% to goal
      </p>
    </motion.div>
  );
};

export default GoalProgressBar;
