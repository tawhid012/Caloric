import { motion } from "framer-motion";
import { Plus, ScanLine, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: Plus, label: "Add Meal", color: "#00F5A0", path: "/add" },
  { icon: ScanLine, label: "Scan Food", color: "#00D9F5", path: "/scan" },
  { icon: Mic, label: "Voice", color: "#F5A000", path: "#" },
];

const QuickAddWidget = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card p-6"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-4">
        Quick Add
      </h3>
      <div className="flex gap-3">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            onClick={() => a.path !== "#" && navigate(a.path)}
            className="flex-1 glass-card-hover p-4 flex flex-col items-center gap-2 rounded-xl"
          >
            <a.icon size={22} style={{ color: a.color }} />
            <span className="text-xs text-secondary-custom">{a.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickAddWidget;
