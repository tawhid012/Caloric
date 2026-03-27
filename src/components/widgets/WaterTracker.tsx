import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

interface WaterTrackerProps {
  current: number;
  goal: number;
  onAdd: () => void;
}

const WaterTracker = ({ current, goal, onAdd }: WaterTrackerProps) => {
  const pct = Math.min((current / goal) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6 flex flex-col items-center"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-4">
        Water
      </h3>

      <div className="relative w-20 h-32 rounded-full border border-white/10 overflow-hidden bg-white/5 mb-4">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-full"
          style={{
            background: "linear-gradient(to top, #00D9F5, #00F5A0)",
            opacity: 0.7,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Droplets size={20} className="text-foreground/60" />
        </div>
      </div>

      <p className="font-display text-lg font-semibold">
        {current}
        <span className="text-muted-custom text-sm font-normal">/{goal}ml</span>
      </p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={onAdd}
        className="mt-3 px-5 py-2 rounded-full text-sm font-medium glass-card-hover"
        style={{ color: "#00D9F5" }}
      >
        + 250ml
      </motion.button>
    </motion.div>
  );
};

export default WaterTracker;
