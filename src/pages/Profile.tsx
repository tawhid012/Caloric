import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const infoRows = profile
    ? [
        { label: "Goal", value: profile.goal?.replace(/^\w/, (c: string) => c.toUpperCase()) },
        { label: "Weight", value: profile.weight ? `${profile.weight} kg` : "—" },
        { label: "Height", value: profile.height ? `${profile.height} cm` : "—" },
        { label: "Activity", value: profile.activity_level?.replace(/_/g, " ") },
        { label: "Daily Target", value: profile.calorie_target ? `${profile.calorie_target} kcal` : "—" },
      ]
    : [];

  return (
    <div className="min-h-screen px-4 py-8 pb-24 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

        {/* User info */}
        <div className="glass-card p-5 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">
              {profile?.name?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <p className="text-foreground font-semibold">{profile?.name || "User"}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
        </div>

        {/* Info rows */}
        <div className="glass-card divide-y divide-white/5">
          {infoRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm text-foreground font-medium flex items-center gap-1">
                {row.value || "—"}
                <ChevronRight size={14} className="text-muted-foreground" />
              </span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="w-full mt-6 glass-card p-4 rounded-2xl flex items-center justify-center gap-2 text-destructive text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
