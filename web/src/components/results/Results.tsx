"use client";

import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { VoteResult } from "@/components/types/types";
import BarGraph from "./BarGraph";
import { resultsData } from "@/app/data/results";
import { ELECTION_CONTRACT_CONFIG } from "@/constants/config";
import ResultsRow from "./ResultsRow";
// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export default function Results({
  electionContractAddress,
}: {
  electionContractAddress: string;
}) {
  console.log("electionContractAddress", electionContractAddress);

  const { data: candidates } = useReadContract({
    ...ELECTION_CONTRACT_CONFIG,
    address: electionContractAddress as `0x${string}`,
    functionName: "getCandidates",
  });

  console.log("getCandidates", candidates);

  const totalVotes = candidates?.reduce((acc: number, candidate: any) => {
    return acc + Number(candidate.totalVotes);
  }, 0);

  return (
    <div className="min-w-[300px]">
      {candidates?.length === 0 ? (
        <p className="text-center text-gray-400">
          No votes have been cast yet.
        </p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-xs uppercase text-gray-400 font-normal">
                Candidate
              </th>
              <th className="text-xs uppercase text-gray-400 font-normal">
                Votes
              </th>
              <th className="text-xs uppercase text-gray-400 font-normal text-right">
                Percent
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates?.map((candidate: any, index: number) => (
              <ResultsRow
                key={index}
                candidate={candidate}
                totalVotes={totalVotes}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
