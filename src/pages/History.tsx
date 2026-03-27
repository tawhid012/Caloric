import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const History = () => (
  <div className="min-h-screen px-4 py-8 pb-24 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-foreground mb-6">History</h1>
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
        <Clock size={40} className="text-muted-foreground mb-3" />
        <p className="text-muted-foreground text-sm">Your food logs will appear here once you start tracking.</p>
      </div>
    </motion.div>
  </div>
);

export default History;
