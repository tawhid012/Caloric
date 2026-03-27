import { motion } from "framer-motion";

interface DynamicGreetingProps {
  name: string;
}

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
};

const DynamicGreeting = ({ name }: DynamicGreetingProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="col-span-full"
  >
    <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
      {getGreeting()},{" "}
      <span className="gradient-text">{name}</span>
    </h1>
    <p className="text-secondary-custom text-sm mt-1">Let's crush your goals today.</p>
  </motion.div>
);

export default DynamicGreeting;
