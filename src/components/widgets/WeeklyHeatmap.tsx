import { motion } from "framer-motion";

interface HeatmapDay {
  day: string;
  value: number; // 0-1 consistency
}

interface WeeklyHeatmapProps {
  data: HeatmapDay[];
}

const WeeklyHeatmap = ({ data }: WeeklyHeatmapProps) => {
  const getColor = (v: number) => {
    if (v >= 0.9) return "#00F5A0";
    if (v >= 0.7) return "rgba(0,245,160,0.6)";
    if (v >= 0.4) return "rgba(0,245,160,0.3)";
    if (v > 0) return "rgba(0,245,160,0.12)";
    return "rgba(255,255,255,0.05)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="glass-card p-6"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-4">
        Weekly Consistency
      </h3>
      <div className="flex gap-2 justify-between">
        {data.map((d, i) => (
          <motion.div
            key={d.day}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <div
              className="w-9 h-9 rounded-lg transition-all"
              style={{
                backgroundColor: getColor(d.value),
                boxShadow: d.value >= 0.9 ? "0 0 12px rgba(0,245,160,0.4)" : "none",
              }}
            />
            <span className="text-xs text-muted-custom">{d.day}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyHeatmap;
