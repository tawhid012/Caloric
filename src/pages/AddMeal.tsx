import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;

const AddMeal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mealType, setMealType] = useState<string>("lunch");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !foodName || !calories) {
      toast.error("Please fill in food name and calories");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("food_logs").insert({
      user_id: user.id,
      meal_type: mealType,
      food_name: foodName,
      calories: parseInt(calories),
      protein: protein ? parseFloat(protein) : 0,
      carbs: carbs ? parseFloat(carbs) : 0,
      fat: fat ? parseFloat(fat) : 0,
    });
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Meal logged!");
      navigate("/");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 pb-24 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <h1 className="text-2xl font-bold text-foreground">Add Meal</h1>

        {/* Meal type pills */}
        <div className="flex gap-2 flex-wrap">
          {mealTypes.map((t) => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMealType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                mealType === t
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>

        {/* Inputs */}
        {[
          { label: "Food Name", value: foodName, set: setFoodName, type: "text", placeholder: "e.g. Grilled Chicken" },
          { label: "Calories", value: calories, set: setCalories, type: "number", placeholder: "250" },
          { label: "Protein (g)", value: protein, set: setProtein, type: "number", placeholder: "0" },
          { label: "Carbs (g)", value: carbs, set: setCarbs, type: "number", placeholder: "0" },
          { label: "Fat (g)", value: fat, set: setFat, type: "number", placeholder: "0" },
        ].map((input) => (
          <div key={input.label}>
            <label className="text-xs text-muted-foreground mb-1 block">{input.label}</label>
            <div className="glass-card px-4 py-3 rounded-2xl">
              <input
                type={input.type}
                value={input.value}
                onChange={(e) => input.set(e.target.value)}
                placeholder={input.placeholder}
                className="bg-transparent w-full outline-none text-foreground text-sm"
              />
            </div>
          </div>
        ))}

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 rounded-2xl font-semibold text-sm bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          {saving ? "Saving..." : "Log Meal"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AddMeal;
