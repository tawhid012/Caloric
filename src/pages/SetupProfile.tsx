import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { User, Ruler, Target, Activity, ArrowRight, ArrowLeft } from "lucide-react";

type FormData = {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  goal: string;
  activity_level: string;
};

const calculateCalories = (data: FormData): number => {
  const w = parseFloat(data.weight);
  const h = parseFloat(data.height);
  const a = parseInt(data.age);
  // Mifflin-St Jeor
  let bmr = data.gender === "female"
    ? 10 * w + 6.25 * h - 5 * a - 161
    : 10 * w + 6.25 * h - 5 * a + 5;
  const multipliers: Record<string, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
  };
  let tdee = bmr * (multipliers[data.activity_level] || 1.55);
  if (data.goal === "lose") tdee -= 500;
  if (data.goal === "gain") tdee += 300;
  return Math.round(tdee);
};

const steps = [
  { title: "About You", icon: User, fields: ["name", "age", "gender"] },
  { title: "Your Body", icon: Ruler, fields: ["weight", "height"] },
  { title: "Your Goal", icon: Target, fields: ["goal"] },
  { title: "Activity", icon: Activity, fields: ["activity_level"] },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const goalOptions = [
  { value: "lose", label: "Lose Weight", emoji: "🔥" },
  { value: "maintain", label: "Maintain", emoji: "⚖️" },
  { value: "gain", label: "Gain Muscle", emoji: "💪" },
];

const activityOptions = [
  { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { value: "light", label: "Light", desc: "1-3 days/week" },
  { value: "moderate", label: "Moderate", desc: "3-5 days/week" },
  { value: "active", label: "Active", desc: "6-7 days/week" },
  { value: "very_active", label: "Very Active", desc: "Intense daily" },
];

const SetupProfile = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "", age: "", gender: "", weight: "", height: "", goal: "", activity_level: "",
  });
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const update = (key: keyof FormData, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const canProceed = () => {
    const fields = steps[step].fields;
    return fields.every((f) => form[f as keyof FormData].trim() !== "");
  };

  const handleFinish = async () => {
    if (!user) return;
    setSaving(true);
    const calorieTarget = calculateCalories(form);
    const { error } = await supabase
      .from("profiles")
      .update({
        name: form.name,
        age: parseInt(form.age),
        gender: form.gender,
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        goal: form.goal,
        activity_level: form.activity_level,
        calorie_target: calorieTarget,
        onboarding_complete: true,
      })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile");
      console.error(error);
    } else {
      navigate("/");
    }
    setSaving(false);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleFinish();
  };

  const renderOption = (value: string, label: string, selected: boolean, onClick: () => void, extra?: string) => (
    <motion.button
      key={value}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`glass-card p-4 rounded-2xl text-left transition-all ${
        selected ? "border-primary/50 bg-primary/10" : ""
      }`}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      {extra && <span className="block text-xs text-muted-foreground mt-0.5">{extra}</span>}
    </motion.button>
  );

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Progress */}
      <div className="flex gap-2 mb-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{
              background: i <= step ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-8">Step {step + 1} of {steps.length}</p>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">{steps[step].title}</h2>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Name</label>
                <div className="glass-card px-4 py-3 rounded-2xl">
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Alex"
                    className="bg-transparent w-full outline-none text-foreground text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Age</label>
                <div className="glass-card px-4 py-3 rounded-2xl">
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="25"
                    className="bg-transparent w-full outline-none text-foreground text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {genderOptions.map((o) =>
                    renderOption(o.value, o.label, form.gender === o.value, () => update("gender", o.value))
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
                <div className="glass-card px-4 py-3 rounded-2xl">
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    placeholder="70"
                    className="bg-transparent w-full outline-none text-foreground text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Height (cm)</label>
                <div className="glass-card px-4 py-3 rounded-2xl">
                  <input
                    type="number"
                    value={form.height}
                    onChange={(e) => update("height", e.target.value)}
                    placeholder="175"
                    className="bg-transparent w-full outline-none text-foreground text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {goalOptions.map((o) =>
                renderOption(o.value, `${o.emoji} ${o.label}`, form.goal === o.value, () => update("goal", o.value))
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {activityOptions.map((o) =>
                renderOption(o.value, o.label, form.activity_level === o.value, () => update("activity_level", o.value), o.desc)
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setStep(step - 1)}
            className="glass-card px-6 py-4 rounded-2xl"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={next}
          disabled={!canProceed() || saving}
          className="flex-1 py-4 rounded-2xl font-semibold text-sm bg-primary text-primary-foreground disabled:opacity-30 flex items-center justify-center gap-2"
        >
          {saving ? "Saving..." : step < steps.length - 1 ? "Continue" : "Finish Setup"}
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export default SetupProfile;
