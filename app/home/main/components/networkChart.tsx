import React from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type NetworkChartProps = {
  data: any;
  keyString: string;
  colorToken: string;
};

export default function NetworkChart({
  data,
  keyString,
  colorToken,
}: NetworkChartProps) {
  const backgroundColor = `rgba(var(--semi-${colorToken}-0), 1)`;
  const strokeColor = `rgba(var(--semi-${colorToken}-5), 1)`;
  const fill = `url(#${colorToken})`;
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
          backgroundColor: backgroundColor,
          borderRadius: "10px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: -10, left: -10, bottom: 6 }}
          >
            <defs>
              <linearGradient id={colorToken} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.6} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={[0, "dataMax + 1"]} hide={true} />
            {/*<Tooltip />*/}
            <Area
              type="linear"
              dataKey={keyString?.toString()}
              stroke={strokeColor}
              isAnimationActive={false}
              fillOpacity={1}
              fill={fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
