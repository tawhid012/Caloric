import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

interface DataPoint {
  day: string;
  calories: number;
}

interface MiniAnalyticsProps {
  data: DataPoint[];
}

const MiniAnalytics = ({ data }: MiniAnalyticsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="glass-card p-6"
  >
    <h3 className="text-secondary-custom text-sm font-medium tracking-wider uppercase mb-4">
      Last 7 Days
    </h3>
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F5A0" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00F5A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              background: "rgba(11,15,20,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#00F5A0"
            strokeWidth={2}
            fill="url(#calGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default MiniAnalytics;
