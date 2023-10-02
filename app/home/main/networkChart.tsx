"use client";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import React from "react";

type NetworkChartProps = {
  data: any;
  keyString: string;
};

export default function NetworkChart({ data, keyString }: NetworkChartProps) {
  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "rgba(var(--semi-blue-0), 1)",
          borderRadius: "10px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: -10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgba(var(--semi-blue-5), 1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="rgba(var(--semi-blue-5), 1)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            {/*<YAxis />*/}
            {/*<Tooltip />*/}
            <Area
              type="linear"
              dataKey={keyString?.toString()}
              stroke="rgba(var(--semi-blue-5), 1)"
              isAnimationActive={false}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
