import React from "react";
import { VoteResult } from "../types/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function BarGraph({ data }: { data: VoteResult[] }) {
  const maxVotes = Math.max(...data.map(item => item.votes));

  const percentageFormatter = (value: number): string =>
    `${((value / maxVotes) * 100).toFixed(1)}%`;

  return (
    <ResponsiveContainer width="100%" height={data ? data.length * 50 : 200}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" horizontal={false} /> */}
        <XAxis type="number" hide />
        <YAxis
          dataKey="option"
          type="category"
          width={100}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="votes" fill="#8dd1c1" barSize={30}>
          <LabelList dataKey="votes" position="right" />
          <LabelList
            dataKey="votes"
            position="insideRight"
            fill="#ffffff"
            formatter={percentageFormatter}
          />
        </Bar>{" "}
      </BarChart>
    </ResponsiveContainer>
  );
}
