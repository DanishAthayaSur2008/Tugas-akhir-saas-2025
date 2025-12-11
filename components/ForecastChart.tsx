"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: {
    date: string;
    max: number;
    min: number;
  }[];
};

export default function ForecastChart({ data }: Props) {
  return (
    <div className="panel mt-6">
      <h2 className="text-xl font-semibold mb-4">7-Day Temperature Forecast</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={["auto", "auto"]}
            label={{
              value: "°C",
              position: "insideLeft",
              angle: -90,
              style: { textAnchor: "middle" }
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="max"
            name="Max Temp"
            stroke="#dc2626"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="min"
            name="Min Temp"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
