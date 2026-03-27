import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DynamicGreeting from "@/components/widgets/DynamicGreeting";
import CalorieRing from "@/components/widgets/CalorieRing";
import MacroSplitCard from "@/components/widgets/MacroSplitCard";
import WaterTracker from "@/components/widgets/WaterTracker";
import QuickAddWidget from "@/components/widgets/QuickAddWidget";
import WeeklyHeatmap from "@/components/widgets/WeeklyHeatmap";
import AIInsightCard from "@/components/widgets/AIInsightCard";
import MealTimeline from "@/components/widgets/MealTimeline";
import GoalProgressBar from "@/components/widgets/GoalProgressBar";
import StreakCounter from "@/components/widgets/StreakCounter";
import MiniAnalytics from "@/components/widgets/MiniAnalytics";

const mockHeatmap = [
  { day: "Mon", value: 0.95 },
  { day: "Tue", value: 0.8 },
  { day: "Wed", value: 1 },
  { day: "Thu", value: 0.6 },
  { day: "Fri", value: 0.9 },
  { day: "Sat", value: 0.3 },
  { day: "Sun", value: 0 },
];

const mockAnalytics = [
  { day: "Mon", calories: 1850 },
  { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1950 },
  { day: "Thu", calories: 2200 },
  { day: "Fri", calories: 1800 },
  { day: "Sat", calories: 2400 },
  { day: "Sun", calories: 1700 },
];

const Index = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayProtein, setTodayProtein] = useState(0);
  const [todayCarbs, setTodayCarbs] = useState(0);
  const [todayFat, setTodayFat] = useState(0);
  const [water, setWater] = useState(0);
  const [meals, setMeals] = useState<{ breakfast: any[]; lunch: any[]; dinner: any[] }>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  useEffect(() => {
    if (!user) return;

    // Load profile
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => setProfile(data));

    // Load today's food logs
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("food_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("logged_at", today)
      .then(({ data }) => {
        if (!data) return;
        setTodayCalories(data.reduce((s, f) => s + (f.calories || 0), 0));
        setTodayProtein(data.reduce((s, f) => s + (Number(f.protein) || 0), 0));
        setTodayCarbs(data.reduce((s, f) => s + (Number(f.carbs) || 0), 0));
        setTodayFat(data.reduce((s, f) => s + (Number(f.fat) || 0), 0));
        setMeals({
          breakfast: data.filter((f) => f.meal_type === "breakfast").map((f) => ({ name: f.food_name, calories: f.calories })),
          lunch: data.filter((f) => f.meal_type === "lunch").map((f) => ({ name: f.food_name, calories: f.calories })),
          dinner: data.filter((f) => f.meal_type === "dinner").map((f) => ({ name: f.food_name, calories: f.calories })),
        });
      });

    // Load today's water
    supabase
      .from("water_logs")
      .select("amount_ml")
      .eq("user_id", user.id)
      .eq("logged_at", today)
      .then(({ data }) => {
        setWater(data?.reduce((s, w) => s + w.amount_ml, 0) || 0);
      });
  }, [user]);

  const handleAddWater = async () => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("water_logs").insert({
      user_id: user.id,
      amount_ml: 250,
      logged_at: today,
    });
    setWater((w) => Math.min(w + 250, 3000));
  };

  const calorieGoal = profile?.calorie_target || 2200;
  const name = profile?.name || "there";

  return (
    <div className="min-h-screen px-4 py-8 pb-24 md:px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DynamicGreeting name={name} />

        <CalorieRing consumed={todayCalories} goal={calorieGoal} />
        <div className="flex flex-col gap-5">
          <MacroSplitCard
            protein={{ current: todayProtein, goal: 150 }}
            carbs={{ current: todayCarbs, goal: 250 }}
            fat={{ current: todayFat, goal: 70 }}
          />
          <StreakCounter days={12} />
        </div>

        <QuickAddWidget />
        <WaterTracker current={water} goal={3000} onAdd={handleAddWater} />

        <AIInsightCard
          message={
            todayCalories < calorieGoal * 0.5
              ? `You've only logged ${todayCalories} kcal today. Don't forget to track your meals!`
              : `You're at ${Math.round((todayCalories / calorieGoal) * 100)}% of your daily goal. Keep it up!`
          }
        />
        <GoalProgressBar current={profile?.weight || 78} start={85} goal={72} />

        <WeeklyHeatmap data={mockHeatmap} />
        <MiniAnalytics data={mockAnalytics} />

        <div className="col-span-full">
          <MealTimeline {...meals} />
        </div>
      </div>
    </div>
  );
};

export default Index;
