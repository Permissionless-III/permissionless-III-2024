"use client";

import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { Election } from "../types/types";
import { electionsData } from "@/app/data/elections";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export default function Elections() {
  const [elections, setElections] = useState<Election[]>([]);

  // const { data, isError, isLoading } = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "getVoteResults",
  // });

  useEffect(() => {
    if (electionsData) {
      // Assuming the contract returns an array of objects with option and votes
      setElections(electionsData);
    }
  }, [elections]);

  const handleElectionClick = (election: Election) => {
    console.log(election);
  }

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div>
      <h2>Elections</h2>
      {elections.length === 0 ? (
        <p>No elections have been created yet.</p>
      ) : (
        <>
          {elections.map((election) => (
            <div className="flex py-1">
              <button className="bg-blue-100 p-4 rounded-md " key={election.id}
                onClick={(e) => handleElectionClick(election)}>
                <div>ID: {election.id}, Description: {election.description}</div>
              </button>
            </div>
          ))}
        </>
      )
      }
    </div >
  );
}
