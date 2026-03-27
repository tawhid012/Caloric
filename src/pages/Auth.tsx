import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold gradient-text tracking-tight">Calynix</h1>
        <p className="text-muted-foreground text-sm mt-2">Your AI nutrition companion</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm space-y-4"
      >
        {/* Email */}
        <div className="glass-card flex items-center gap-3 px-4 py-3">
          <Mail size={18} className="text-muted-foreground" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Password */}
        <div className="glass-card flex items-center gap-3 px-4 py-3">
          <Lock size={18} className="text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          <button onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAuth}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-semibold text-sm bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
        </motion.button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-muted-foreground text-sm py-2"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </motion.div>
    </div>
  );
};

export default Auth;
