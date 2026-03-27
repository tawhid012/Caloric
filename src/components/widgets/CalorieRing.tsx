import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CalorieRingProps {
  consumed: number;
  goal: number;
}

const CalorieRing = ({ consumed, goal }: CalorieRingProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  const radius = 100;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-8 flex flex-col items-center col-span-full md:col-span-1"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-6">
        Daily Calories
      </h3>

      <div className="relative w-[240px] h-[240px]">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5A0" />
              <stop offset="100%" stopColor="#00D9F5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background ring */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress ring */}
          <motion.circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="url(#gradient-accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            filter="url(#glow)"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-display text-5xl font-bold tracking-tight"
            style={{ color: "#00F5A0" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {consumed}
          </motion.span>
          <span className="text-secondary-custom text-sm mt-1">
            of {goal} kcal
          </span>
        </div>
      </div>

      <div className="flex gap-8 mt-6">
        <div className="text-center">
          <p className="text-secondary-custom text-xs uppercase tracking-wider">Consumed</p>
          <p className="font-display text-lg font-semibold mt-1">{consumed}</p>
        </div>
        <div className="w-px bg-white/10" />
        <div className="text-center">
          <p className="text-secondary-custom text-xs uppercase tracking-wider">Remaining</p>
          <p className="font-display text-lg font-semibold mt-1">{remaining}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CalorieRing;
