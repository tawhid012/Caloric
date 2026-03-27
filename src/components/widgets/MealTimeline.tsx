import { motion } from "framer-motion";
import { Coffee, Sun, Moon } from "lucide-react";

interface MealEntry {
  name: string;
  calories: number;
}

interface MealTimelineProps {
  breakfast: MealEntry[];
  lunch: MealEntry[];
  dinner: MealEntry[];
}

const mealMeta = [
  { key: "breakfast" as const, label: "Breakfast", Icon: Coffee },
  { key: "lunch" as const, label: "Lunch", Icon: Sun },
  { key: "dinner" as const, label: "Dinner", Icon: Moon },
];

const MealTimeline = ({ breakfast, lunch, dinner }: MealTimelineProps) => {
  const meals = { breakfast, lunch, dinner };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="glass-card p-6"
    >
      <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-5">
        Today's Meals
      </h3>
      <div className="space-y-4">
        {mealMeta.map(({ key, label, Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Icon size={14} style={{ color: "#00F5A0" }} />
              </div>
              {i < 2 && <div className="w-px flex-1 bg-white/10 mt-1" />}
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm font-medium mb-1">{label}</p>
              {meals[key].length > 0 ? (
                meals[key].map((item) => (
                  <div key={item.name} className="flex justify-between text-xs text-secondary-custom">
                    <span>{item.name}</span>
                    <span className="font-display font-medium">{item.calories} kcal</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-custom">No meals logged</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MealTimeline;
