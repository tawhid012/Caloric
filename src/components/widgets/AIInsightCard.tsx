import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AIInsightCardProps {
  message: string;
}

const AIInsightCard = ({ message }: AIInsightCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="glass-card p-6 flex items-start gap-4"
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: "rgba(0,245,160,0.1)" }}
    >
      <Sparkles size={18} style={{ color: "#00F5A0" }} />
    </div>
    <div>
      <h3 className="text-secondary-custom text-xs font-medium tracking-wider uppercase mb-1">
        AI Insight
      </h3>
      <motion.p
        className="text-sm leading-relaxed"
        style={{ color: "#A0A8B0" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {message}
      </motion.p>
    </div>
  </motion.div>
);

export default AIInsightCard;
