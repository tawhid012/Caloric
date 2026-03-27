import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ScanLine, Plus, Clock, UserCircle } from "lucide-react";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/scan", icon: ScanLine, label: "Scan" },
  { path: "/add", icon: Plus, label: "Add", isCenter: true },
  { path: "/history", icon: Clock, label: "History" },
  { path: "/profile", icon: UserCircle, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="glass-card mx-auto max-w-md flex items-center justify-around py-2 px-2 rounded-2xl"
        style={{ boxShadow: "0 -4px 30px rgba(0,0,0,0.4)" }}
      >
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <motion.button
                key={tab.path}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(tab.path)}
                className="w-12 h-12 rounded-xl flex items-center justify-center -mt-5 bg-primary shadow-lg"
                style={{ boxShadow: "0 4px 20px rgba(0,245,160,0.4)" }}
              >
                <Icon size={22} className="text-primary-foreground" />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={tab.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors relative"
            >
              <Icon
                size={20}
                className={active ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] ${active ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
