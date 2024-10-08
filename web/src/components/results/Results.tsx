"use client";

import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { VoteResult } from "../types/types";
import BarGraph from "./BarGraph";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

const data = [
  { option: "Candidate 1", votes: 1 },
  { option: "Candidate 2", votes: 2 },
];

export default function Results() {
  const [results, setResults] = useState<VoteResult[]>([]);

  // const { data, isError, isLoading } = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "getVoteResults",
  // });

  useEffect(() => {
    if (data) {
      // Assuming the contract returns an array of objects with option and votes
      setResults(data);
    }
  }, [data]);

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div className="min-w-[300px]">
      <h2>Voting Results</h2>
      {results.length === 0 ? (
        <p>No votes have been cast yet.</p>
      ) : (
        <BarGraph data={results} />
      )}
    </div>
  );
}
