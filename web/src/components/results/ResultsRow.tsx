"use client";

import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { VoteResult } from "@/components/types/types";
import BarGraph from "./BarGraph";
import { resultsData } from "@/app/data/results";
import { ELECTION_CONTRACT_CONFIG } from "@/constants/config";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export default function ResultsRow({
  candidate,
  totalVotes,
}: {
  candidate: { name: string; description: string; totalVotes: BigInt };
  totalVotes: number;
}) {
  const votes = Number(candidate.totalVotes);

  const getPercentage = (votes: number): string => {
    return `${((votes / totalVotes) * 100).toFixed(1)}%`;
  };

  console.log("c", candidate);

  return (
    <>
      <tr>
        <td className="pt-4 font-medium">{candidate.name}</td>
        <td className="pt-3">{votes}</td>
        <td className="pt-3 font-medium text-right">{getPercentage(votes)}</td>
      </tr>
      <tr>
        <td className="text-xs text-gray-400 leading-none">
          {candidate?.description}
        </td>
        <td colSpan={2}>
          <div
            className="h-[10px] bg-primary-500"
            style={{ width: `${getPercentage(votes)}` }}
          ></div>
        </td>
      </tr>
    </>
  );
}
