import { motion } from "framer-motion";

interface MacroData {
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fat: { current: number; goal: number };
}

const MacroSplitCard = ({ protein, carbs, fat }: MacroData) => {
  const macros = [
    { label: "Protein", ...protein, color: "#00F5A0" },
    { label: "Carbs", ...carbs, color: "#00D9F5" },
    { label: "Fat", ...fat, color: "#F5A000" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-5">
        Macros
      </h3>
      <div className="space-y-4">
        {macros.map((macro, i) => {
          const pct = Math.min((macro.current / macro.goal) * 100, 100);
          return (
            <div key={macro.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-secondary-custom">{macro.label}</span>
                <span className="font-display font-semibold">
                  {macro.current}
                  <span className="text-muted-custom text-xs font-normal">
                    /{macro.goal}g
                  </span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: macro.color,
                    boxShadow: `0 0 10px ${macro.color}40`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MacroSplitCard;
