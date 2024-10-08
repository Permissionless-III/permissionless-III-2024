"use client";

import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { VoteResult } from "@/components/types/types";
import BarGraph from "./BarGraph";
import { resultsData } from "@/app/data/results";
// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export default function Results() {
  const [results, setResults] = useState<VoteResult[]>([]);

  // const { data, isError, isLoading } = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "getVoteResults",
  // });

  useEffect(() => {
    if (resultsData) {
      // Assuming the contract returns an array of objects with option and votes
      setResults(resultsData);
    }
  }, [resultsData]);

  // const maxVotes = Math.max(...data.map(item => item.votes));

  // const percentageFormatter = (value: number): string =>
  //   `${((value / maxVotes) * 100).toFixed(1)}%`;

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  const getPercentage = (votes: number): string => {
    const totalVotes = results.reduce((acc, curr) => acc + curr.votes, 0);
    return `${((votes / totalVotes) * 100).toFixed(1)}%`;
  };

  return (
    <div className="min-w-[300px]">
      {results.length === 0 ? (
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
            {results?.map((result: VoteResult) => (
              <>
                <tr>
                  <td className="pt-4 font-medium">{result.option}</td>
                  <td className="pt-3">{result.votes}</td>
                  <td className="pt-3 font-medium text-right">
                    {getPercentage(result.votes)}
                  </td>
                </tr>
                <tr>
                  <td className="text-xs text-gray-400 leading-none">
                    {result?.option}
                  </td>
                  <td colSpan={2}>
                    <div
                      className="h-[10px] bg-primary-500"
                      style={{ width: `${getPercentage(result.votes)}` }}
                    ></div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        // <BarGraph data={results} />
      )}
    </div>
  );
}
