import { motion } from "framer-motion";
import { Camera, ScanLine } from "lucide-react";

const Scan = () => (
  <div className="min-h-screen px-4 py-8 pb-24 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-foreground mb-6">Scan Food</h1>
      <div className="space-y-4">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-full glass-card p-6 rounded-2xl flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Camera size={28} className="text-primary" />
          </div>
          <span className="text-foreground font-medium text-sm">Take a Photo</span>
          <span className="text-muted-foreground text-xs">AI will identify your food</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-full glass-card p-6 rounded-2xl flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
            <ScanLine size={28} className="text-accent" />
          </div>
          <span className="text-foreground font-medium text-sm">Scan Barcode</span>
          <span className="text-muted-foreground text-xs">Instant nutrition data</span>
        </motion.button>
      </div>
    </motion.div>
  </div>
);

export default Scan;
