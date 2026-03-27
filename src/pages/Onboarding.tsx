import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    icon: Flame,
    title: "Track Every Bite",
    description: "AI-powered calorie tracking that feels effortless. Snap a photo or scan a barcode.",
    color: "#00F5A0",
  },
  {
    icon: Target,
    title: "Hit Your Goals",
    description: "Personalized targets based on your body, activity level, and ambitions.",
    color: "#00D9F5",
  },
  {
    icon: Zap,
    title: "Build Streaks",
    description: "Stay consistent with daily streaks, insights, and a dashboard that motivates.",
    color: "#F5A000",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 transition-all duration-700"
        style={{ backgroundColor: slides[current].color }}
      />

      {/* Dots */}
      <div className="flex gap-2 mb-12">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              backgroundColor: i === current ? slides[current].color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
            style={{ background: `${slides[current].color}15` }}
          >
            {(() => {
              const Icon = slides[current].icon;
              return <Icon size={36} style={{ color: slides[current].color }} />;
            })()}
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            {slides[current].title}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {slides[current].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-16 w-full max-w-sm flex flex-col gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={next}
          className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-colors"
          style={{
            background: slides[current].color,
            color: "#0B0F14",
          }}
        >
          {current < slides.length - 1 ? "Next" : "Get Started"}
          <ArrowRight size={18} />
        </motion.button>

        {current < slides.length - 1 && (
          <button
            onClick={() => navigate("/auth")}
            className="text-muted-foreground text-sm py-2"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
