import React from 'react';
import { VoteResult } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BarGraph({ data }: { data: VoteResult[] }) {

  return (
    <BarChart width={400} height={200} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="option" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="votes" fill="#8884d8" />
    </BarChart>
  )
}