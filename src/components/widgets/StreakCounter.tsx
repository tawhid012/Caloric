import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakCounterProps {
  days: number;
}

const StreakCounter = ({ days }: StreakCounterProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: 0.15 }}
    className="glass-card p-6 flex items-center gap-4"
  >
    <motion.div
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-12 h-12 rounded-2xl flex items-center justify-center"
      style={{
        background: "rgba(0,245,160,0.1)",
        boxShadow: "0 0 20px rgba(0,245,160,0.2)",
      }}
    >
      <Flame size={24} style={{ color: "#00F5A0" }} />
    </motion.div>
    <div>
      <p className="font-display text-3xl font-bold tracking-tight">{days}</p>
      <p className="text-xs text-secondary-custom">Day Streak</p>
    </div>
  </motion.div>
);

export default StreakCounter;
